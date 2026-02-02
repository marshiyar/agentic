# The Stack

Personal momentum machine. Maximum velocity across all projects.

## Philosophy

No infrastructure decisions. No deploy pipelines. No container management. No static workflows.

Features live at the edge, not in app code. The app is a thin render layer. Claude Code orchestrates everything.

Traditional enterprise: infrastructure → guardrails → workflows → approvals → slow.

This: capabilities + Claude Code + judgment → ship.

## The Stack

| Layer | Service | Why |
|-------|---------|-----|
| Database | Supabase | DB, auth, Vault, storage, realtime, cron, edge functions |
| Compute | Modal | Python, GPU, notebooks, heavy compute |
| AI APIs | OpenAI, Gemini, Voyage | Via multimodel MCP |
| Client | EAS | Native + web, Cloudflare in front |
| Web-only | Vercel / Cloudflare / Netlify | If no native needed |

## What You Skip

- AWS/Azure/GCP console
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
| Python / GPU / heavy compute | Modal |
| External AI queries | Multimodel MCP |
| Rendering | EAS / Vercel |

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

Two MCPs. Claude Code is the end user.

| MCP | Tools | Purpose |
|-----|-------|---------|
| `multimodel` | query_openai, query_gemini, query_modal, embed_voyage, parallel_query | AI model APIs |
| `serverless` | discover, invoke | Edge functions and serverless across Supabase + Modal |

**Why this works:**

- MCP tools are structural constraints — I use what exists instead of improvising
- CLAUDE.md is advisory — I might follow it, might not
- Two thin MCPs prevent throwaway scripts without recreating SDKs/CLIs

**What MCPs don't do:**

- Deploy (use CLI)
- Manage cron (use CLI/dashboard)
- Replicate SDK features

## Have

- [x] `mcp-servers/multimodel/` — Query OpenAI, Gemini, Voyage from Claude Code
- [x] `mcp-servers/serverless/` — Discover and invoke functions across Supabase + Modal
- [x] `supabase/get_api_key.sql` — Vault function for secure key access
- [x] `USE-AS-GLOBAL-CLAUDE.md` — Development standards
- [x] `scaffold-lib.sh` — React Native + Supabase /lib structure

## Need

- [ ] Add Modal as provider to multimodel MCP
- [ ] Modal setup docs — API key, minimal config
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
