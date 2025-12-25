# Agentic

A framework for running AI agent teams on software projects.

---

## Quick Start

### New Project
```bash
mkdir my-project && cd my-project
mkdir docs
cp ~/projects/agentic/templates/*.md docs/
```

Then:
1. Edit `docs/_VISION.md` with your idea
2. Activate Product Manager to refine and plan
3. Start building

→ [Full Guide: New Project](docs/guides/new-project.md)

### Existing Project
```bash
cd your-project
mkdir -p docs
cp ~/projects/agentic/templates/*.md docs/
```

Then document your current state and start using agents.

→ [Full Guide: Existing Project](docs/guides/existing-project.md)

---

## Guides

| Guide | Description |
|-------|-------------|
| [Getting Started](docs/guides/getting-started.md) | Framework overview |
| [New Project](docs/guides/new-project.md) | Starting from scratch |
| [Existing Project](docs/guides/existing-project.md) | Adopting for existing code |
| [Feature Lifecycle](docs/guides/workflows/feature-lifecycle.md) | Idea → Shipped |

---

## Roles

### Engineering (Always-On)
| Role | Thinking Mode |
|------|---------------|
| [Frontend Engineer](docs/roles/frontend-engineer.md) | Implementation |
| [Backend Engineer](docs/roles/backend-engineer.md) | Implementation |
| [Platform Engineer](docs/roles/platform-engineer.md) | Implementation + Optimization |
| [QA Engineer](docs/roles/qa-engineer.md) | Verification |
| [Security Engineer](docs/roles/security-engineer.md) | Verification |

### Product & Design (On-Demand)
| Role | Thinking Mode |
|------|---------------|
| [Product Manager](docs/roles/product-manager.md) | Verification + Implementation |
| [UX Designer](docs/roles/ux-designer.md) | Verification + Implementation |
| [UI Designer](docs/roles/ui-designer.md) | Implementation + Optimization |

### Data & Growth (On-Demand)
| Role | Thinking Mode |
|------|---------------|
| [Data Analyst](docs/roles/data-analyst.md) | Optimization |
| [Growth Engineer](docs/roles/growth-engineer.md) | Implementation + Optimization |

### Content & Support (On-Demand)
| Role | Thinking Mode |
|------|---------------|
| [Technical Writer](docs/roles/technical-writer.md) | Optimization |
| [Customer Success](docs/roles/customer-success.md) | Verification |

### Operations (On-Demand)
| Role | Thinking Mode |
|------|---------------|
| [Project Manager](docs/roles/project-manager.md) | Verification + Optimization |
| [Operations Manager](docs/roles/operations-manager.md) | Optimization |

---

## Concepts

| Concept | Description |
|---------|-------------|
| [Thinking Modes](docs/concepts/thinking-modes.md) | Implementation vs Verification vs Optimization |
| [Orchestration](docs/concepts/orchestration.md) | Human as conductor |
| [Communication](docs/concepts/communication.md) | Shared state via _AGENTS.md |
| [Decisions](docs/concepts/decisions.md) | What humans decide vs what agents decide |

---

## Templates

Copy these to your project's `docs/` folder:

| Template | Purpose |
|----------|---------|
| [_VISION.md](templates/_VISION.md) | What you're building and why |
| [_ROADMAP.md](templates/_ROADMAP.md) | Phases, milestones, priorities |
| [_AGENTS.md](templates/_AGENTS.md) | Agent coordination |
| [_ARCHITECTURE.md](templates/_ARCHITECTURE.md) | Technical decisions |
| [_CONVENTIONS.md](templates/_CONVENTIONS.md) | Coding standards |

---

## The Human Role

You are CEO/CTO/Head of Product. You:

| Responsibility | Examples |
|----------------|----------|
| **Vision** | What to build, why it matters |
| **Strategy** | Priorities, resource allocation |
| **Judgment** | Trade-offs, risk tolerance |
| **Decisions** | Approve scope, ship/no-ship |
| **Code** | Build alongside agents (optional) |

Agents execute, propose, and surface decisions. You decide.

→ [More: Decisions Framework](docs/concepts/decisions.md)

---

## Activating an Agent

```
You are ~/projects/agentic/docs/roles/[role].md

[Optional: Current task or context]
```

The agent reads its role file → reads your project's `docs/_AGENTS.md` → starts working.

---

## Project Structure

```
your-project/
└── docs/
    ├── _AGENTS.md        # Agent coordination
    ├── _VISION.md        # What we're building
    ├── _ROADMAP.md       # Phases and priorities
    ├── _ARCHITECTURE.md  # Technical decisions
    └── _CONVENTIONS.md   # Coding standards
```

Agents read and update these files. You orchestrate.
