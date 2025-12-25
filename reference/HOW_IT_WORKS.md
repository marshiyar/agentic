# How It Works

The practical mechanics.

---

## The Basic Loop

You're at your desk. You open a terminal and ask Claude to do something. It starts working.

Now you're waiting.

So you open another terminal. Start something else. Now two things are moving.

You open a third terminal and have a conversation — product planning, reviewing specs, whatever. Now you're working too.

**The goal: always be doing something productive while agents work.**

---

## Why Roles Exist

Roles give Claude a focus lens:

- "You're Backend" → thinking about APIs, database, server patterns
- "You're Frontend" → thinking about components, state, user flows
- "You're QA" → thinking about edge cases, test coverage, breaking things

Same AI, different hat. The structure exists for two reasons:

1. **Focus** — Clearer thinking within a domain
2. **Coordination** — Parallel work that doesn't conflict

---

## Parallelism

The multiplier isn't speed. It's concurrency.

```
Traditional:
  1 person → 1 task → waiting → next task

Agentic:
  Terminal 1 → Backend building API
  Terminal 2 → Frontend building screen
  Terminal 3 → You discussing product

  All happening simultaneously.
```

To make this work, parallel sessions need to know about each other. That's what `_AGENTS.md` is for.

---

## Coordination Through Files

Agents don't talk to each other. They read and write files.

| File | Purpose |
|------|---------|
| `_AGENTS.md` | Who's doing what, handoffs, blockers |
| `_TODAY.md` | What needs attention today |

When Backend finishes:
1. Updates `_AGENTS.md` — "Profiles API done, ready for frontend"
2. Writes handoff note — "Endpoints: GET/POST /api/profiles, types in lib/types.ts"

When Frontend starts:
1. Reads `_AGENTS.md` — sees the handoff
2. Knows exactly where to start

No meetings. No Slack. Just files.

---

## The `wrap` Command

The mundane stuff people skip:

- Update status docs
- Write handoff notes
- Commit with good message
- Clean up stale items
- Verify done means done

You say `wrap`, all of this happens. One word, hygiene complete.

---

## What You Decide vs What Agents Decide

**You decide:**
- What to build
- What's in scope
- When to ship
- Acceptable risk

**Agents decide:**
- How to implement
- Code structure
- Library choices
- Test approach

You own the *what*. They figure out the *how*.

---

## Checkpoints

You're not involved in every step. Just key moments:

1. **Approve scope** — Before significant work starts
2. **Approve security** — Before shipping auth or sensitive features
3. **Approve ship** — When it goes live

Everything else flows without you.

---

## Single Terminal vs Multiple

**Single terminal:**
- Chief of Staff shifts between roles
- Sequential work
- You follow along

**Multiple terminals:**
- Each has a dedicated role
- Parallel work
- You orchestrate between them

Start with single. Add terminals when you have independent work that can happen in parallel.

---

## The Learning

Even as a solo founder, you're practicing team skills:

- **Delegation** — Clear scope for each terminal
- **Documentation** — So parallel work doesn't conflict
- **Handoffs** — Explicit "done, here's what you need"
- **Process** — The hygiene real teams need

When you hire, you already know how to work this way.
