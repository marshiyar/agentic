# Agentic

A framework for working with AI agents in parallel.

---

## The Problem

You ask Claude to build something. It takes 20 minutes. You wait.

That's 20 minutes you could spend on something else.

---

## The Solution

Open multiple terminals. Give each one a clear role.

```
Terminal 1: Backend building the profiles API
Terminal 2: Tests running across the stack
Terminal 3: Documentation being updated
Terminal 4: You finding UI bugs with QA
```

Now you're filling lag time instead of waiting. When you switch between terminals, the roles help you orient instantly.

---

## What This Repo Provides

**Roles** — Backend Engineer, Frontend Engineer, QA, etc. Each terminal has a clear identity. You know what it's doing when you glance at it.

**Coordination files** — `_AGENTS.md` shows who's doing what. When you (or an agent) need to know the state, it's there.

**Handoffs** — When one role finishes, it writes notes for the next. Captures what was done and why.

**Simple commands** — `wrap` closes out work cleanly. `status` shows current state. `today` shows what needs attention.

---

## Quick Start

```bash
git clone https://github.com/jasonhoffman/agentic ~/.agentic
cd ~/.agentic
claude
```

Say "hi" or describe what you're building.

---

## How It Works

**Single terminal:**
```
You: Build the user profiles feature

Chief of Staff: Let me bring in Backend for the API.

[works as Backend]

Done. Frontend next?
```

**Multiple terminals:**
```
Terminal 1                    Terminal 2
─────────────────────────     ─────────────────────────
"You're Backend.              "You're Frontend.
Build the profiles API."      Build the profile screen."

[works for 30 min]            [works for 20 min]
```

Each terminal works independently. They coordinate through `_AGENTS.md` — who's doing what, what's done, what's blocked.

---

## Why Roles Matter

When you have 5 terminals open, each needs a clear identity.

You glance at Terminal 3: "That's QA running tests."
You glance at Terminal 1: "That's Backend on profiles."

The role isn't a capability limit — Backend can write frontend code if needed. It's a **focus context** that makes switching clean.

---

## Why `_AGENTS.md` Matters

It's the source of truth for "where are we?"

When you switch to a terminal after an hour, you need to orient. When an agent starts a session, it needs to know the state.

`_AGENTS.md` answers:
- Who's working on what right now
- What's done
- What's blocked
- Handoff notes with context

---

## Why Handoffs Capture "Why"

Not just "Profiles API done."

But: "Profiles API done. Used soft deletes because we need to restore accounts. Rate limited to 100/min based on expected traffic. Types in `lib/types.ts`."

So when you (or the next agent) pick up, you have context, not just facts.

---

## The Commands

| Say | Get |
|-----|-----|
| `hi` / `morning` | Pick up where you left off |
| `status` | Current state across all work |
| `today` | What needs attention |
| `wrap` | Close out — document, commit, clean up |

---

## The Roles

| Role | Focus |
|------|-------|
| **Chief of Staff** | Orchestration, orientation, shifting between roles |
| **Product Manager** | Specs, priorities, scope |
| **UX Designer** | User flows, wireframes |
| **UI Designer** | Visual design, styling |
| **Backend Engineer** | APIs, database, server logic |
| **Frontend Engineer** | UI, screens, components |
| **QA Engineer** | Testing, quality, edge cases |
| **Security Engineer** | Auth, vulnerabilities, review |
| **Platform Engineer** | Deploy, CI/CD, infrastructure |

Plus: Data Analyst, Growth Engineer, Technical Writer, Customer Success, Project Manager, Operations Manager.

---

## Reference

| Doc | What |
|-----|------|
| [AGENTS.md](AGENTS.md) | The roles and how they work |
| [TECH_STACK.md](TECH_STACK.md) | Default tech choices |
| [reference/](reference/) | Deep dives |

---

MIT License
