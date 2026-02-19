#!/usr/bin/env node

/**
 * GCP Infrastructure MCP Server
 *
 * Bootstrap and manage GCP from scratch: projects, billing, APIs,
 * Compute Engine VMs, GCS storage. Auth via Application Default Credentials.
 *
 * Optional env: GOOGLE_CLOUD_PROJECT (required for compute/storage, not for project management)
 * Optional env: GOOGLE_CLOUD_ZONE (default: us-central1-a)
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
import { Storage } from "@google-cloud/storage";
import { GoogleAuth } from "google-auth-library";

// =============================================================================
// Configuration
// =============================================================================

function getProject(): string {
  const project = process.env.GOOGLE_CLOUD_PROJECT;
  if (!project) throw new Error("GOOGLE_CLOUD_PROJECT not set");
  return project;
}

function getZone(): string {
  return process.env.GOOGLE_CLOUD_ZONE || "us-central1-a";
}

// =============================================================================
// Lazy Client Initialization
// =============================================================================

let authClient: GoogleAuth | null = null;
let storageClient: Storage | null = null;

function getAuth(): GoogleAuth {
  if (authClient) return authClient;
  authClient = new GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/cloud-platform"],
  });
  return authClient;
}

function getStorage(): Storage {
  if (storageClient) return storageClient;
  storageClient = new Storage({ projectId: getProject() });
  return storageClient;
}

// =============================================================================
// REST Helpers
// =============================================================================

async function gcpRequest(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: unknown,
): Promise<unknown> {
  const auth = getAuth();
  const client = await auth.getClient();
  const response = await client.request({ url, method, data: body });
  return response.data;
}

function computeUrl(path: string): string {
  const project = getProject();
  return `https://compute.googleapis.com/compute/v1/projects/${project}${path}`;
}

// =============================================================================
// MCP Server
// =============================================================================

const server = new Server(
  { name: "gcp-mcp", version: "1.0.0" },
  { capabilities: { tools: {} } },
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "list_projects",
        description: "List GCP projects accessible to the authenticated user",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
      {
        name: "create_project",
        description:
          "Create a new GCP project. Returns an operation — project is ready when operation completes",
        inputSchema: {
          type: "object",
          properties: {
            project_id: {
              type: "string",
              description:
                "Globally unique project ID (lowercase, hyphens, 6-30 chars, e.g. my-claude-project)",
            },
            name: {
              type: "string",
              description:
                "Display name (defaults to project_id)",
            },
          },
          required: ["project_id"],
        },
      },
      {
        name: "list_billing_accounts",
        description:
          "List billing accounts accessible to the authenticated user",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
      {
        name: "link_billing",
        description:
          "Link a billing account to a project (required before enabling paid APIs)",
        inputSchema: {
          type: "object",
          properties: {
            project_id: {
              type: "string",
              description:
                "Project ID to link billing to (defaults to GOOGLE_CLOUD_PROJECT)",
            },
            billing_account: {
              type: "string",
              description:
                "Billing account ID (e.g. XXXXXX-XXXXXX-XXXXXX or billingAccounts/XXXXXX-XXXXXX-XXXXXX)",
            },
          },
          required: ["billing_account"],
        },
      },
      {
        name: "enable_api",
        description:
          "Enable a GCP API on the project (e.g. compute.googleapis.com, aiplatform.googleapis.com)",
        inputSchema: {
          type: "object",
          properties: {
            api: {
              type: "string",
              description:
                "API service name (e.g. compute.googleapis.com, aiplatform.googleapis.com, storage.googleapis.com)",
            },
            project_id: {
              type: "string",
              description:
                "Project ID (defaults to GOOGLE_CLOUD_PROJECT)",
            },
          },
          required: ["api"],
        },
      },
      {
        name: "create_instance",
        description:
          "Create a Compute Engine VM. Defaults: e2-standard-4, Ubuntu 24.04 LTS, 50GB SSD",
        inputSchema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Instance name (e.g. claude-headless)",
            },
            zone: {
              type: "string",
              description: `Zone (default: ${getZone()})`,
            },
            machine_type: {
              type: "string",
              description: "Machine type (default: e2-standard-4)",
            },
            boot_disk_size_gb: {
              type: "number",
              description: "Boot disk size in GB (default: 50)",
            },
            startup_script: {
              type: "string",
              description:
                "Startup script to run on first boot (bash)",
            },
            accelerator_type: {
              type: "string",
              description:
                "GPU type (e.g. nvidia-tesla-t4, nvidia-l4, nvidia-a100-80gb)",
            },
            accelerator_count: {
              type: "number",
              description: "Number of GPUs (default: 1)",
            },
          },
          required: ["name"],
        },
      },
      {
        name: "list_instances",
        description: "List Compute Engine VMs with status and IPs",
        inputSchema: {
          type: "object",
          properties: {
            zone: {
              type: "string",
              description: `Zone (default: ${getZone()}). Use "-" for all zones`,
            },
          },
        },
      },
      {
        name: "instance_action",
        description: "Start, stop, or delete a Compute Engine VM",
        inputSchema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Instance name",
            },
            action: {
              type: "string",
              description: "Action to perform",
              enum: ["start", "stop", "delete"],
            },
            zone: {
              type: "string",
              description: `Zone (default: ${getZone()})`,
            },
          },
          required: ["name", "action"],
        },
      },
      {
        name: "gcs_write",
        description:
          "Write text content to a GCS object (creates bucket if needed)",
        inputSchema: {
          type: "object",
          properties: {
            bucket: {
              type: "string",
              description: "Bucket name",
            },
            path: {
              type: "string",
              description: "Object path (e.g. data/input.jsonl)",
            },
            content: {
              type: "string",
              description: "Text content to write",
            },
            create_bucket: {
              type: "boolean",
              description:
                "Create bucket if it doesn't exist (default: false)",
            },
          },
          required: ["bucket", "path", "content"],
        },
      },
      {
        name: "gcs_read",
        description: "Read a GCS object as text",
        inputSchema: {
          type: "object",
          properties: {
            bucket: {
              type: "string",
              description: "Bucket name",
            },
            path: {
              type: "string",
              description: "Object path",
            },
          },
          required: ["bucket", "path"],
        },
      },
      {
        name: "gcs_list",
        description:
          "List GCS buckets in the project, or objects in a bucket",
        inputSchema: {
          type: "object",
          properties: {
            bucket: {
              type: "string",
              description:
                "Bucket name (omit to list all buckets)",
            },
            prefix: {
              type: "string",
              description: "Object prefix filter",
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
      case "list_projects": {
        const result = await gcpRequest(
          "https://cloudresourcemanager.googleapis.com/v1/projects",
        );

        const data = result as {
          projects?: Array<{
            projectId: string;
            name: string;
            lifecycleState: string;
            projectNumber: string;
          }>;
        };

        const projects = (data.projects || []).map((p) => ({
          projectId: p.projectId,
          name: p.name,
          state: p.lifecycleState,
          projectNumber: p.projectNumber,
        }));

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(projects, null, 2),
            },
          ],
        };
      }

      case "create_project": {
        const { project_id, name: displayName } = args as {
          project_id: string;
          name?: string;
        };

        const result = await gcpRequest(
          "https://cloudresourcemanager.googleapis.com/v1/projects",
          "POST",
          {
            projectId: project_id,
            name: displayName || project_id,
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

      case "list_billing_accounts": {
        const result = await gcpRequest(
          "https://cloudbilling.googleapis.com/v1/billingAccounts",
        );

        const data = result as {
          billingAccounts?: Array<{
            name: string;
            displayName: string;
            open: boolean;
          }>;
        };

        const accounts = (data.billingAccounts || []).map((a) => ({
          id: a.name,
          displayName: a.displayName,
          open: a.open,
        }));

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(accounts, null, 2),
            },
          ],
        };
      }

      case "link_billing": {
        const { project_id, billing_account } = args as {
          project_id?: string;
          billing_account: string;
        };

        const projectId = project_id || getProject();
        const accountName = billing_account.startsWith("billingAccounts/")
          ? billing_account
          : `billingAccounts/${billing_account}`;

        const result = await gcpRequest(
          `https://cloudbilling.googleapis.com/v1/projects/${projectId}/billingInfo`,
          "PUT",
          { billingAccountName: accountName },
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

      case "enable_api": {
        const { api, project_id } = args as {
          api: string;
          project_id?: string;
        };
        const project = project_id || getProject();

        const result = await gcpRequest(
          `https://serviceusage.googleapis.com/v1/projects/${project}/services/${api}:enable`,
          "POST",
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

      case "create_instance": {
        const {
          name: instanceName,
          zone = getZone(),
          machine_type = "e2-standard-4",
          boot_disk_size_gb = 50,
          startup_script,
          accelerator_type,
          accelerator_count = 1,
        } = args as {
          name: string;
          zone?: string;
          machine_type?: string;
          boot_disk_size_gb?: number;
          startup_script?: string;
          accelerator_type?: string;
          accelerator_count?: number;
        };

        const metadata: Array<{ key: string; value: string }> = [];
        if (startup_script) {
          metadata.push({
            key: "startup-script",
            value: startup_script,
          });
        }

        const body: Record<string, unknown> = {
          name: instanceName,
          machineType: `zones/${zone}/machineTypes/${machine_type}`,
          disks: [
            {
              boot: true,
              autoDelete: true,
              initializeParams: {
                sourceImage:
                  "projects/ubuntu-os-cloud/global/images/family/ubuntu-2404-lts-amd64",
                diskSizeGb: String(boot_disk_size_gb),
                diskType: `zones/${zone}/diskTypes/pd-ssd`,
              },
            },
          ],
          networkInterfaces: [
            {
              network: "global/networks/default",
              accessConfigs: [
                {
                  name: "External NAT",
                  type: "ONE_TO_ONE_NAT",
                },
              ],
            },
          ],
          ...(metadata.length > 0 && { metadata: { items: metadata } }),
        };

        if (accelerator_type) {
          body.guestAccelerators = [
            {
              acceleratorType: `zones/${zone}/acceleratorTypes/${accelerator_type}`,
              acceleratorCount: accelerator_count,
            },
          ];
          body.scheduling = { onHostMaintenance: "TERMINATE" };
        }

        const result = await gcpRequest(
          computeUrl(`/zones/${zone}/instances`),
          "POST",
          body,
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

      case "list_instances": {
        const { zone = getZone() } = args as { zone?: string };

        let result: unknown;
        if (zone === "-") {
          result = await gcpRequest(
            computeUrl("/aggregated/instances"),
          );
        } else {
          result = await gcpRequest(
            computeUrl(`/zones/${zone}/instances`),
          );
        }

        const data = result as {
          items?: Array<{
            name: string;
            status: string;
            zone: string;
            machineType: string;
            networkInterfaces?: Array<{
              accessConfigs?: Array<{ natIP?: string }>;
            }>;
          }>;
        };

        const instances = (data.items || []).map((i) => ({
          name: i.name,
          status: i.status,
          zone: i.zone?.split("/").pop(),
          machineType: i.machineType?.split("/").pop(),
          externalIp:
            i.networkInterfaces?.[0]?.accessConfigs?.[0]?.natIP ||
            null,
        }));

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(instances, null, 2),
            },
          ],
        };
      }

      case "instance_action": {
        const {
          name: instanceName,
          action,
          zone = getZone(),
        } = args as {
          name: string;
          action: "start" | "stop" | "delete";
          zone?: string;
        };

        const method = action === "delete" ? "DELETE" : "POST";
        const path =
          action === "delete"
            ? `/zones/${zone}/instances/${instanceName}`
            : `/zones/${zone}/instances/${instanceName}/${action}`;

        const result = await gcpRequest(
          computeUrl(path),
          method,
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

      case "gcs_write": {
        const {
          bucket,
          path: objectPath,
          content,
          create_bucket = false,
        } = args as {
          bucket: string;
          path: string;
          content: string;
          create_bucket?: boolean;
        };

        const storage = getStorage();

        if (create_bucket) {
          const [exists] = await storage.bucket(bucket).exists();
          if (!exists) {
            await storage.createBucket(bucket, {
              location: getZone().replace(/-[a-z]$/, ""),
            });
          }
        }

        await storage
          .bucket(bucket)
          .file(objectPath)
          .save(content, { contentType: "text/plain" });

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  written: `gs://${bucket}/${objectPath}`,
                  bytes: Buffer.byteLength(content),
                },
                null,
                2,
              ),
            },
          ],
        };
      }

      case "gcs_read": {
        const { bucket, path: objectPath } = args as {
          bucket: string;
          path: string;
        };

        const storage = getStorage();
        const [content] = await storage
          .bucket(bucket)
          .file(objectPath)
          .download();

        return {
          content: [
            {
              type: "text",
              text: content.toString("utf-8"),
            },
          ],
        };
      }

      case "gcs_list": {
        const { bucket, prefix } = args as {
          bucket?: string;
          prefix?: string;
        };

        const storage = getStorage();

        if (!bucket) {
          const [buckets] = await storage.getBuckets();
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  buckets.map((b) => ({
                    name: b.name,
                    location: b.metadata.location,
                    storageClass: b.metadata.storageClass,
                  })),
                  null,
                  2,
                ),
              },
            ],
          };
        }

        const [files] = await storage.bucket(bucket).getFiles({
          prefix,
          maxResults: 100,
        });

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                files.map((f) => ({
                  name: f.name,
                  size: f.metadata.size,
                  updated: f.metadata.updated,
                })),
                null,
                2,
              ),
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
  console.error("GCP Infrastructure MCP server running");
}

main().catch(console.error);
