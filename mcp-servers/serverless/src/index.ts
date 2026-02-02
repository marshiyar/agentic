#!/usr/bin/env node

/**
 * Serverless MCP Server
 *
 * Two tools for Claude Code:
 *   - discover: What serverless functions exist in this project?
 *   - invoke: Call a function by name, route to correct service
 *
 * Supports: Supabase Edge Functions, Modal
 * Does NOT replicate CLIs/SDKs — just awareness and invocation.
 */

import { config } from "@dotenvx/dotenvx";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { readdir, stat, readFile } from "fs/promises";
import { execSync } from "child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "../../..");

config({ path: resolve(projectRoot, ".env.local") });

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// =============================================================================
// Discovery
// =============================================================================

interface FunctionInfo {
  name: string;
  service: "supabase" | "modal";
  path?: string;
  endpoint?: string;
}

async function discoverSupabaseFunctions(): Promise<FunctionInfo[]> {
  const functions: FunctionInfo[] = [];
  const functionsDir = resolve(projectRoot, "supabase/functions");

  try {
    const entries = await readdir(functionsDir);
    for (const entry of entries) {
      const entryPath = resolve(functionsDir, entry);
      const stats = await stat(entryPath);
      if (stats.isDirectory() && !entry.startsWith("_")) {
        const supabaseUrl = process.env.SUPABASE_URL || process.env.EXPO_PUBLIC_SUPABASE_URL;
        functions.push({
          name: entry,
          service: "supabase",
          path: `supabase/functions/${entry}`,
          endpoint: supabaseUrl ? `${supabaseUrl}/functions/v1/${entry}` : undefined,
        });
      }
    }
  } catch (e) {
    // No supabase/functions directory
  }

  return functions;
}

async function discoverModalFunctions(): Promise<FunctionInfo[]> {
  const functions: FunctionInfo[] = [];

  // Check for modal apps via CLI
  try {
    const output = execSync("modal app list --json 2>/dev/null", {
      encoding: "utf-8",
      timeout: 10000,
    });
    const apps = JSON.parse(output);
    for (const app of apps) {
      functions.push({
        name: app.name || app.app_id,
        service: "modal",
        endpoint: app.web_url,
      });
    }
  } catch (e) {
    // Modal CLI not available or no apps
  }

  // Also scan for Python files with Modal decorators
  try {
    const modalDir = resolve(projectRoot, "modal");
    const entries = await readdir(modalDir);
    for (const entry of entries) {
      if (entry.endsWith(".py")) {
        const content = await readFile(resolve(modalDir, entry), "utf-8");
        if (content.includes("@app.") || content.includes("@stub.") || content.includes("modal.")) {
          const name = entry.replace(".py", "");
          // Don't duplicate if already found via CLI
          if (!functions.find(f => f.name === name)) {
            functions.push({
              name,
              service: "modal",
              path: `modal/${entry}`,
            });
          }
        }
      }
    }
  } catch (e) {
    // No modal directory
  }

  return functions;
}

async function discoverAll(): Promise<FunctionInfo[]> {
  const [supabase, modal] = await Promise.all([
    discoverSupabaseFunctions(),
    discoverModalFunctions(),
  ]);
  return [...supabase, ...modal];
}

// =============================================================================
// Invocation
// =============================================================================

async function invokeSupabase(
  name: string,
  payload: unknown,
  endpoint?: string
): Promise<{ result: unknown; status: number }> {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.EXPO_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY/SUPABASE_ANON_KEY");
  }

  const url = endpoint || `${supabaseUrl}/functions/v1/${name}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${supabaseKey}`,
    },
    body: JSON.stringify(payload),
  });

  const contentType = response.headers.get("content-type");
  const result = contentType?.includes("application/json")
    ? await response.json()
    : await response.text();

  return { result, status: response.status };
}

async function invokeModal(
  name: string,
  payload: unknown,
  endpoint?: string
): Promise<{ result: unknown; status: number }> {
  if (!endpoint) {
    // Try to get endpoint from modal app list
    try {
      const output = execSync(`modal app list --json 2>/dev/null`, {
        encoding: "utf-8",
        timeout: 10000,
      });
      const apps = JSON.parse(output);
      const app = apps.find((a: { name?: string; app_id?: string }) =>
        a.name === name || a.app_id === name
      );
      if (app?.web_url) {
        endpoint = app.web_url;
      }
    } catch (e) {
      // Fall through to error
    }
  }

  if (!endpoint) {
    throw new Error(`No endpoint found for Modal function '${name}'. Deploy with a web_endpoint or provide endpoint directly.`);
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const contentType = response.headers.get("content-type");
  const result = contentType?.includes("application/json")
    ? await response.json()
    : await response.text();

  return { result, status: response.status };
}

// =============================================================================
// MCP Server
// =============================================================================

const server = new Server(
  {
    name: "serverless-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "discover",
        description: "Discover serverless functions in this project (Supabase edge functions, Modal apps)",
        inputSchema: {
          type: "object",
          properties: {
            service: {
              type: "string",
              description: "Filter by service (optional)",
              enum: ["supabase", "modal"],
            },
          },
        },
      },
      {
        name: "invoke",
        description: "Invoke a serverless function by name",
        inputSchema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Function name",
            },
            service: {
              type: "string",
              description: "Service (supabase or modal). Auto-detected if omitted.",
              enum: ["supabase", "modal"],
            },
            payload: {
              type: "object",
              description: "Request payload (optional)",
            },
            endpoint: {
              type: "string",
              description: "Override endpoint URL (optional)",
            },
          },
          required: ["name"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "discover": {
        const { service } = args as { service?: "supabase" | "modal" };
        let functions = await discoverAll();

        if (service) {
          functions = functions.filter(f => f.service === service);
        }

        return {
          content: [{
            type: "text",
            text: JSON.stringify({
              functions,
              count: functions.length,
              by_service: {
                supabase: functions.filter(f => f.service === "supabase").length,
                modal: functions.filter(f => f.service === "modal").length,
              },
            }, null, 2),
          }],
        };
      }

      case "invoke": {
        const { name: fnName, service, payload = {}, endpoint } = args as {
          name: string;
          service?: "supabase" | "modal";
          payload?: unknown;
          endpoint?: string;
        };

        // Auto-detect service if not provided
        let targetService = service;
        if (!targetService) {
          const functions = await discoverAll();
          const fn = functions.find(f => f.name === fnName);
          if (fn) {
            targetService = fn.service;
          } else {
            throw new Error(`Function '${fnName}' not found. Run discover first or specify service.`);
          }
        }

        const result = targetService === "supabase"
          ? await invokeSupabase(fnName, payload, endpoint)
          : await invokeModal(fnName, payload, endpoint);

        return {
          content: [{
            type: "text",
            text: JSON.stringify({
              function: fnName,
              service: targetService,
              ...result,
            }, null, 2),
          }],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: JSON.stringify({
          error: error instanceof Error ? error.message : String(error),
        }, null, 2),
      }],
      isError: true,
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Serverless MCP server running");
}

main().catch(console.error);
