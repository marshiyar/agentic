# Wrap

The closure protocol. Say `wrap` when you're done with a piece of work.

---

## What Happens

1. **Update `_AGENTS.md`** — Mark work complete, add to "Recently Completed"
2. **Write handoff** — If another role continues, leave notes
3. **Update `_TODAY.md`** — What got done
4. **Commit** — Show what's being committed, then commit with good message
5. **Clean up** — Check for stale items, verify "done" means done
6. **Report** — Summarize what shipped

---

## Example

```
You: wrap

Agent:
Completed:
- Profiles API (4 endpoints)
- Profile screen

Committed: abc123f - "feat(profiles): add user profiles"

Handoff for Frontend:
- Endpoints at /api/profiles
- Types in lib/types.ts

Still pending:
- Password validation (not started)

Ready for: QA
```

---

## Triggers

Any of these:
- `wrap`
- `wrap it up`
- `close this out`

---

## When to Use

- After completing a feature
- End of a work session
- Before switching to different work
- Before handing off to another role

---

## Quick Version

For small changes:

```
Wrap:
- Committed: "fix: profile image upload"
- No handoffs needed
```
