# The Stack

Radically minimal. Maximum leverage from model improvements.

## Philosophy

No infrastructure decisions. No deploy pipelines. No container management. No static workflows.

Features live at the edge, not in app code. The app is a thin render layer. Claude Code orchestrates everything.

Traditional enterprise: infrastructure → guardrails → workflows → approvals → slow.

This: capabilities + Claude Code + judgment → ship.

## The Disintermediation Principle

Keep frontier models in the critical path. Build infrastructure that amplifies model capabilities, not replaces them.

**Traditional approach:**
Logic in code → Models explain results → New models = same results

**Model-centric approach:**
Models do reasoning → Code supports models → New models = better results

When three frontier models dropped simultaneously (Dec 2025), apps with reasoning flowing through models immediately got:
- Better equation verification
- Better analysis generation
- Better cross-validation
- Better understanding of constraints

Apps with logic baked into code got nicer explanations of the same outputs.

**Build:** MCP tools, compute infrastructure, data access
**Don't build:** Consensus algorithms, prompt management, hardcoded reasoning flows

## The Stack

| Layer | Service | Why |
|-------|---------|-----|
| Database | Supabase | DB, auth, Vault, storage, realtime, cron, edge functions |
| AI APIs | OpenAI, Gemini, Voyage | Via multimodel MCP (direct API, simple) |
| Compute | GCP | GPU/TPU, Vertex AI, Python ML, headless Claude Code |
| Client | EAS | Native + web, Cloudflare in front |
| Web-only | Vercel / Cloudflare / Netlify | If no native needed |

## Environments

| Environment | Where | Purpose |
|-------------|-------|---------|
| macOS laptop | Interactive | Development, design, testing |
| Ubuntu WSL | Local Linux | Linux-native tools, Docker, cross-platform |
| GCP headless | SSH + tmux | GPU/TPU, Vertex AI, Python ML, long-running autonomous work |

Same repo. Same `.mcp.json`. Same Claude Code. Different capabilities per environment.

## What You Skip

- AWS/Azure console
- Kubernetes
- Docker orchestration
- Infra-as-code complexity
- Static versioned DevOps workflows
- Retry infrastructure (just retry)
- Workflow engines (just figure it out)

## Where Things Live

| Need | Where |
|------|-------|
| State | Supabase |
| Cron | Supabase |
| Auth-adjacent logic | Supabase Edge Functions |
| External AI queries | Multimodel MCP |
| Rendering | EAS / Vercel |
| GPU/TPU workloads | GCP (on-demand instances) |
| Python ML | GCP headless |
| Headless Claude Code | GCP (always-on, small VM) |

## Scale / Compliance / Multi-region

Not blockers.

- Supabase: multi-region, replicates to AWS regions
- EAS: Cloudflare in front
- Vercel/Cloudflare: distributed by default
- Compliance: be actually competent at security, not theater

## What Breaks This

Nothing at reasonable scale. If you hit limits, you've won and can afford to solve it then.

---

# Capabilities

What agentic should provide. Capabilities, not frameworks.

## MCP Strategy

Claude Code is the end user. Three layers: Google official (remote + local), custom (what Google doesn't cover).

### Google Remote MCPs (Streamable HTTP, hosted by Google)

| MCP | Endpoint | Purpose |
|-----|----------|---------|
| `gcp-compute` | `compute.googleapis.com/mcp` | VM lifecycle (headless Claude Code) |
| `gcp-resources` | `cloudresourcemanager.googleapis.com/mcp` | Project discovery/management |

Auth: OAuth 2.0 via gcloud CLI. More available when needed: BigQuery, Spanner, Cloud SQL, AlloyDB, Firestore, Bigtable, Cloud Logging, Cloud Monitoring, GKE, Security Ops.

### Google Local MCPs (stdio, npm packages)

| MCP | Package | Purpose |
|-----|---------|---------|
| `gcloud` | `@google-cloud/gcloud-mcp` | Anything gcloud can do (projects, billing, APIs, IAM, DNS, etc.) |
| `observability` | `@google-cloud/observability-mcp` | Cloud Logging, Monitoring, Trace (12+ tools) |
| `gcp-storage` | `@google-cloud/storage-mcp` | GCS buckets and objects (23+ tools) |

Auth: ADC via `gcloud auth application-default login`. No local install — npx handles it.

### Custom MCPs (stdio, our code)

| MCP | Tools | Purpose |
|-----|-------|---------|
| `multimodel` | query_openai, query_gemini, embed_voyage, parallel_query | AI model APIs (direct) |
| `serverless` | discover, invoke | Edge functions (Supabase) |
| `vertex` | query_vertex, batch_predict, custom_job, job_status, list_jobs | Vertex AI generation (ADC), batch prediction, GPU/TPU jobs |

Custom servers only exist for what Google doesn't cover: non-GCP AI APIs, Supabase, and Vertex AI batch/custom jobs.

**Why this works:**

- Google official MCPs for GCP infrastructure — maintained by Google, always current
- gcloud MCP as universal fallback — anything gcloud can do, Claude Code can do
- Custom MCPs only where no official option exists
- MCP tools are structural constraints — Claude Code uses what exists instead of improvising

## Have

- [x] Google remote MCPs — Compute Engine, Resource Manager (expandable to 12 services)
- [x] Google local MCPs — gcloud, observability, storage (via npx)
- [x] `mcp-servers/multimodel/` — Query OpenAI, Gemini, Voyage from Claude Code
- [x] `mcp-servers/serverless/` — Discover and invoke Supabase edge functions
- [x] `mcp-servers/vertex/` — Vertex AI generation (ADC), batch prediction, GPU/TPU custom jobs
- [x] `supabase/get_api_key.sql` — Vault function for secure key access
- [x] `USE-AS-GLOBAL-CLAUDE.md` — Development standards
- [x] `scaffold-lib.sh` — React Native + Supabase /lib structure
- [x] Claude Code auto-memory — built-in session continuity
- [x] Built-in plugins — commit-commands, code-review, feature-dev, context7, frontend-design, etc.
- [x] Built-in plan mode — replaces custom /plan command
- [x] Built-in explore agents — replaces custom /research command

## Need

- [ ] GCP headless VM setup (see human-instructions.md)
- [ ] Supabase edge function patterns
- [ ] EAS — Native + web deployment, Cloudflare

## Maybe

- [ ] Cost tracking for AI API usage (only if budget matters)
- [ ] Response caching (only if hitting same queries)

## Principles

1. Document capabilities, not abstractions
2. Step-by-step for browser setup (dummy mode)
3. No templates that assume workflow
4. Claude Code figures out the specifics
5. Add when needed, not anticipated
