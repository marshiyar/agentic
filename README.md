# Agentic

A framework for working with AI agents like a team.

---

## The Reality

You're at your desk. You ask Claude to build an API. It starts working.

Now you're waiting.

So you open another terminal. Ask it to work on the frontend. Now two things are moving.

You open a third terminal and start a product conversation. Now *you're* working too.

**The goal: the human is always doing something productive.**

---

## What This Is

This repo gives Claude context about how to work like a team:

- **Roles** — Backend Engineer, Frontend Engineer, Product Manager, QA, etc.
- **Coordination** — Shared docs so parallel work doesn't conflict
- **Handoffs** — Explicit notes when one role finishes and another starts
- **Simple commands** — `wrap` closes out work cleanly, `status` shows state

The roles map to a real company's org chart. But unlike a real company:

- Any role can do anything (it's all Claude)
- You can run 10 of the same role in parallel
- Coordination happens through docs, not meetings
- Handoffs happen through files, not conversations

---

## Quick Start

```bash
git clone https://github.com/jasonhoffman/agentic ~/.agentic
cd ~/.agentic
claude
```

Say "hi" or "what are you building?" — it picks up from there.

---

## Parallel Work

The multiplier isn't speed — it's concurrency.

```
Terminal 1              Terminal 2              Terminal 3
─────────────────────   ─────────────────────   ─────────────────────
cd ~/project            cd ~/project            cd ~/project
claude                  claude                  claude

"You're Backend.        "You're Frontend.       "You're QA. Test
Build profiles API."    Build profile screen."  the auth flow."

[works]                 [works]                 [works]
```

Each terminal works independently. They coordinate through `docs/_AGENTS.md` — who's doing what, what's done, what's next.

Without this coordination, parallel work stomps on itself. With it, you get clean handoffs and no conflicts.

---

## The Roles

| Role | Focus |
|------|-------|
| **Chief of Staff** | Orchestration, project setup, context |
| **Product Manager** | Specs, priorities, user stories |
| **UX Designer** | User flows, wireframes |
| **UI Designer** | Visual design, styling |
| **Backend Engineer** | APIs, database, server logic |
| **Frontend Engineer** | UI, screens, components |
| **QA Engineer** | Testing, quality |
| **Security Engineer** | Security review |
| **Platform Engineer** | Deploy, CI/CD, infra |
| **Data Analyst** | Metrics, analytics |
| **Growth Engineer** | Experiments, optimization |
| **Technical Writer** | Documentation |
| **Customer Success** | User feedback |
| **Project Manager** | Status, coordination |
| **Operations Manager** | Process optimization |

These are focus areas, not capability limits. Backend can write frontend code. The structure exists for coordination, not gatekeeping.

---

## Commands

| Say | Get |
|-----|-----|
| `hi` / `morning` | Status check, pick up where you left off |
| `status` | Current state of everything |
| `today` | What needs attention |
| `wrap` | Close out work — document, commit, clean up |

Everything else is conversation.

---

## What Gets Handled Automatically

The mundane stuff people skip when moving fast:

- Update status docs → agents do it
- Write handoff notes → `wrap` does it
- Commit with good messages → `wrap` does it
- Clean up stale items → `wrap` does it
- Verify "done" means done → `wrap` does it

You say `wrap`, the hygiene happens.

---

## What You're Learning

Even as a solo founder, you're learning to run a team:

- **Delegation** — Clear scope for each terminal
- **Documentation** — So parallel work doesn't conflict
- **Handoffs** — Explicit "done, here's what you need to know"
- **Professional workflow** — The stuff real teams do

When you hire, you already know how to work this way.

---

## Reference

| Doc | What |
|-----|------|
| [AGENTS.md](AGENTS.md) | The roles |
| [TECH_STACK.md](TECH_STACK.md) | Default tech choices |
| [reference/](reference/) | Deep dives |

---

MIT License
