#!/usr/bin/env node

/**
 * Vertex AI MCP Server
 *
 * Provides tools for Vertex AI on GCP: Gemini generation, batch prediction,
 * and custom jobs (GPU/TPU). Auth via Application Default Credentials (ADC).
 *
 * Required env: GOOGLE_CLOUD_PROJECT
 * Optional env: GOOGLE_CLOUD_LOCATION (default: us-central1)
 *
 * ADC works automatically on GCP VMs. On macOS/WSL:
 *   gcloud auth application-default login
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { VertexAI } from "@google-cloud/vertexai";
import { GoogleAuth } from "google-auth-library";

// =============================================================================
// Configuration
// =============================================================================

const MODELS = {
  default: "gemini-3-pro-preview",
  available: [
    "gemini-3-pro-preview",
    "gemini-3-flash-preview",
    "gemini-2.5-pro",
    "gemini-2.5-flash",
  ],
} as const;

function getProject(): string {
  const project = process.env.GOOGLE_CLOUD_PROJECT;
  if (!project) throw new Error("GOOGLE_CLOUD_PROJECT not set");
  return project;
}

function getLocation(): string {
  return process.env.GOOGLE_CLOUD_LOCATION || "us-central1";
}

// =============================================================================
// Lazy Client Initialization
// =============================================================================

let vertexClient: VertexAI | null = null;
let authClient: GoogleAuth | null = null;

function getVertex(): VertexAI {
  if (vertexClient) return vertexClient;
  vertexClient = new VertexAI({
    project: getProject(),
    location: getLocation(),
  });
  return vertexClient;
}

function getAuth(): GoogleAuth {
  if (authClient) return authClient;
  authClient = new GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/cloud-platform"],
  });
  return authClient;
}

async function vertexApiRequest(
  path: string,
  method: "GET" | "POST" = "GET",
  body?: unknown,
): Promise<unknown> {
  const auth = getAuth();
  const client = await auth.getClient();
  const project = getProject();
  const location = getLocation();
  const url = `https://${location}-aiplatform.googleapis.com/v1/projects/${project}/locations/${location}${path}`;

  const response = await client.request({
    url,
    method,
    data: body,
  });

  return response.data;
}

// =============================================================================
// MCP Server
// =============================================================================

const server = new Server(
  { name: "vertex-mcp", version: "1.0.0" },
  { capabilities: { tools: {} } },
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "query_vertex",
        description: `Query Gemini via Vertex AI (ADC auth, no API key needed on GCP). Models: ${MODELS.available.join(", ")}`,
        inputSchema: {
          type: "object",
          properties: {
            prompt: { type: "string", description: "The prompt to send" },
            system_prompt: {
              type: "string",
              description: "Optional system instruction",
            },
            model: {
              type: "string",
              description: `Model (default: ${MODELS.default})`,
              enum: MODELS.available,
            },
          },
          required: ["prompt"],
        },
      },
      {
        name: "batch_predict",
        description: "Submit a Vertex AI batch prediction job",
        inputSchema: {
          type: "object",
          properties: {
            model: {
              type: "string",
              description:
                "Model name (e.g. gemini-3-pro-preview) or full resource name",
            },
            input_uri: {
              type: "string",
              description:
                "GCS URI for input JSONL (gs://bucket/input.jsonl)",
            },
            output_uri: {
              type: "string",
              description:
                "GCS URI prefix for output (gs://bucket/output/)",
            },
            display_name: {
              type: "string",
              description: "Job display name",
            },
          },
          required: ["model", "input_uri", "output_uri"],
        },
      },
      {
        name: "custom_job",
        description:
          "Submit a Vertex AI custom job (Python ML on GPU/TPU)",
        inputSchema: {
          type: "object",
          properties: {
            display_name: {
              type: "string",
              description: "Job display name",
            },
            container_uri: {
              type: "string",
              description: "Docker image URI",
            },
            command: {
              type: "array",
              items: { type: "string" },
              description: "Command to run",
            },
            args: {
              type: "array",
              items: { type: "string" },
              description: "Arguments",
            },
            machine_type: {
              type: "string",
              description: "Machine type (default: n1-standard-4)",
            },
            accelerator_type: {
              type: "string",
              description:
                "GPU type (e.g. NVIDIA_TESLA_T4, NVIDIA_L4, NVIDIA_A100_80GB)",
            },
            accelerator_count: {
              type: "number",
              description: "Number of GPUs (default: 1)",
            },
          },
          required: ["display_name", "container_uri"],
        },
      },
      {
        name: "job_status",
        description:
          "Check status of a Vertex AI job (batch prediction or custom)",
        inputSchema: {
          type: "object",
          properties: {
            job_name: {
              type: "string",
              description: "Full job resource name or just the job ID",
            },
            job_type: {
              type: "string",
              description: "Job type (default: custom)",
              enum: ["custom", "batch_prediction"],
            },
          },
          required: ["job_name"],
        },
      },
      {
        name: "list_jobs",
        description: "List recent Vertex AI jobs",
        inputSchema: {
          type: "object",
          properties: {
            job_type: {
              type: "string",
              description: "Job type (default: custom)",
              enum: ["custom", "batch_prediction"],
            },
            page_size: {
              type: "number",
              description: "Max results (default: 10)",
            },
          },
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "query_vertex": {
        const {
          prompt,
          system_prompt,
          model = MODELS.default,
        } = args as {
          prompt: string;
          system_prompt?: string;
          model?: string;
        };

        const vertex = getVertex();
        const generativeModel = vertex.getGenerativeModel({
          model,
          ...(system_prompt && { systemInstruction: system_prompt }),
        });

        const result = await generativeModel.generateContent({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
        });

        const response = result.response;
        const text =
          response.candidates?.[0]?.content?.parts
            ?.map((p) => p.text)
            .join("") || "";

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  content: text,
                  model,
                  usage: response.usageMetadata,
                },
                null,
                2,
              ),
            },
          ],
        };
      }

      case "batch_predict": {
        const {
          model,
          input_uri,
          output_uri,
          display_name = "batch-predict",
        } = args as {
          model: string;
          input_uri: string;
          output_uri: string;
          display_name?: string;
        };

        const project = getProject();
        const location = getLocation();
        const modelName = model.startsWith("projects/")
          ? model
          : `projects/${project}/locations/${location}/publishers/google/models/${model}`;

        const result = await vertexApiRequest(
          "/batchPredictionJobs",
          "POST",
          {
            displayName: display_name,
            model: modelName,
            inputConfig: {
              instancesFormat: "jsonl",
              gcsSource: { uris: [input_uri] },
            },
            outputConfig: {
              predictionsFormat: "jsonl",
              gcsDestination: { outputUriPrefix: output_uri },
            },
          },
        );

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case "custom_job": {
        const {
          display_name,
          container_uri,
          command,
          args: jobArgs,
          machine_type = "n1-standard-4",
          accelerator_type,
          accelerator_count = 1,
        } = args as {
          display_name: string;
          container_uri: string;
          command?: string[];
          args?: string[];
          machine_type?: string;
          accelerator_type?: string;
          accelerator_count?: number;
        };

        const workerSpec: Record<string, unknown> = {
          machineSpec: {
            machineType: machine_type,
            ...(accelerator_type && {
              acceleratorType: accelerator_type,
              acceleratorCount: accelerator_count,
            }),
          },
          replicaCount: 1,
          containerSpec: {
            imageUri: container_uri,
            ...(command && { command }),
            ...(jobArgs && { args: jobArgs }),
          },
        };

        const result = await vertexApiRequest("/customJobs", "POST", {
          displayName: display_name,
          jobSpec: {
            workerPoolSpecs: [workerSpec],
          },
        });

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case "job_status": {
        const { job_name, job_type = "custom" } = args as {
          job_name: string;
          job_type?: string;
        };

        const path = job_name.startsWith("projects/")
          ? job_name.replace(
              /^projects\/[^/]+\/locations\/[^/]+/,
              "",
            )
          : job_type === "batch_prediction"
            ? `/batchPredictionJobs/${job_name}`
            : `/customJobs/${job_name}`;

        const result = await vertexApiRequest(path);

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case "list_jobs": {
        const { job_type = "custom", page_size = 10 } = args as {
          job_type?: string;
          page_size?: number;
        };

        const endpoint =
          job_type === "batch_prediction"
            ? "/batchPredictionJobs"
            : "/customJobs";

        const result = await vertexApiRequest(
          `${endpoint}?pageSize=${page_size}`,
        );

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              error:
                error instanceof Error
                  ? error.message
                  : String(error),
            },
            null,
            2,
          ),
        },
      ],
      isError: true,
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Vertex AI MCP server running");
}

main().catch(console.error);
