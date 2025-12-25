# The Roles

These are focus areas, not capability limits.

Any role can do anything — it's all Claude. The structure exists for coordination: clear scope, clean handoffs, parallel work that doesn't conflict.

---

## How Roles Work

When you open a terminal and say "You're Backend Engineer, build the profiles API" — you're giving Claude a focus lens. It thinks about APIs, database schema, server patterns.

Another terminal with "You're Frontend Engineer, build the profile screen" — same Claude, different focus. Thinking about components, state, user interaction.

They're not different AIs. They're the same AI wearing different hats.

---

## The Roles

### Engineering

| Role | Focus |
|------|-------|
| **Backend Engineer** | APIs, database, server logic, business rules |
| **Frontend Engineer** | UI, screens, components, client state |
| **Platform Engineer** | Deploy, CI/CD, infrastructure, monitoring |
| **QA Engineer** | Testing, quality, edge cases, regression |
| **Security Engineer** | Auth, vulnerabilities, security review |

### Product & Design

| Role | Focus |
|------|-------|
| **Product Manager** | Specs, user stories, priorities, scope |
| **UX Designer** | User flows, wireframes, interaction patterns |
| **UI Designer** | Visual design, styling, component library |

### Data & Growth

| Role | Focus |
|------|-------|
| **Data Analyst** | Metrics, dashboards, insights |
| **Growth Engineer** | Experiments, A/B tests, optimization |

### Content & Support

| Role | Focus |
|------|-------|
| **Technical Writer** | Documentation, guides, API docs |
| **Customer Success** | User feedback synthesis, support patterns |

### Operations

| Role | Focus |
|------|-------|
| **Project Manager** | Status tracking, dependencies, coordination |
| **Operations Manager** | Process optimization, workflow improvement |

---

## Chief of Staff

The default role when you just say "hi".

Reads project context, knows where things stand, can shift into any specialist. Orchestrates handoffs, suggests what to work on next.

When you need specialist work, it either:
- **Shifts** — Becomes that specialist in the same terminal
- **Delegates** — You open another terminal with that specialist

---

## Parallel Roles

You can have multiple instances of the same role:

```
Terminal 1: "You're Backend. Build the profiles API."
Terminal 2: "You're Backend. Build the payments API."
Terminal 3: "You're Backend. Build the notifications API."
```

Three backend engineers, working in parallel. Each on isolated scope. Coordinating through `_AGENTS.md`.

This is the multiplier — not that one AI is faster, but that you can run many in parallel.

---

## Coordination

The roles coordinate through shared files:

| File | Purpose |
|------|---------|
| `docs/_AGENTS.md` | Who's doing what, handoffs, status |
| `docs/_TODAY.md` | What needs attention today |

When Backend finishes the API, it writes a handoff note. When Frontend starts, it reads the note. No meetings, no Slack — just files.

---

## Role Files

Each role has a detailed file in `reference/roles/`:

- What they focus on
- How they work
- What files they typically touch
- When to escalate

These are reference material. Claude reads them when shifting into a role.
