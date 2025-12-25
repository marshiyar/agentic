# Chapter 6: Your First Day

What a real day looks like, step by step.

---

## The Scenario

Let's say you set up your project yesterday. You have:

- A vision for a dog walking app
- A roadmap from the Product Manager
- Your first work package: "User Registration"

Today is day one of actually building.

---

## Morning (9:00 AM)

```
$ claude

You: today

Chief of Staff: Good morning. Here's what needs your attention:

**Blocking:**
- Tech Stack: React Native or Flutter?
  Backend Engineer recommends React Native (larger ecosystem, you know JS)

**Package Status:**
- User Registration: Spec approved, waiting on tech stack to start architecture

What's your call on the tech stack?

You: React Native.

Chief of Staff: Done. Updated _ARCHITECTURE.md.
Backend Engineer can start on User Registration now.
Want me to bring them in?

You: Yes.

Chief of Staff: Let me bring in the Backend Engineer.
```

---

## Mid-Morning (10:00 AM)

The Chief of Staff shifted to Backend Engineer:

```
Backend Engineer: I see the tech stack is React Native + Supabase.
For User Registration, I'll:
1. Design the users table in Supabase
2. Set up Supabase auth
3. Create the registration endpoint
4. Write tests

I'll update you when it's ready for frontend.

[Backend Engineer works]

Backend Engineer: Backend complete.
- Users table created
- Registration endpoint working
- 8 tests passing
- Handoff notes written for Frontend Engineer

Ready for frontend?
```

**Time spent by you:** 2 minutes
**Work done by agent:** 2-3 hours equivalent

---

## You Go Do Other Things

While the Backend Engineer works, you:
- Have coffee
- Think about marketing
- Talk to a potential user
- Whatever founders do

You don't need to watch. The agent is working.

---

## Early Afternoon (1:00 PM)

You check back in:

```
You: Yes, bring in frontend.

Chief of Staff: Bringing in Frontend Engineer.

Frontend Engineer: I've read the backend handoff notes.
Building the registration screens now:
- Registration form
- Email validation
- Password requirements
- Error handling

[Frontend Engineer works]

Frontend Engineer: Registration UI complete.
- Form with validation
- Connected to Supabase auth
- Error states handled
- Ready for QA

Want me to bring in QA?
```

---

## Late Afternoon (4:00 PM)

```
You: Yes, QA.

Chief of Staff: Bringing in QA Engineer.

QA Engineer: Testing User Registration now.
- Happy path: ✅
- Invalid email: ✅
- Weak password: ✅
- Network error: ✅
- Already registered: ✅

Found 1 issue:
- Password validation accepts leading/trailing spaces
- Severity: Low
- Suggest: Trim password input

Otherwise ready for security review.
```

---

## End of Day (6:00 PM)

```
You: Fix the password bug, then wrap.

Chief of Staff: Frontend Engineer is fixing it now.

Frontend Engineer: Fixed. Added trim to password input. Tests updated.

Chief of Staff: QA, quick retest?

QA Engineer: Retested. Pass. ✅

Chief of Staff:

Wrap Summary:
- Committed: "feat(auth): user registration with Supabase"
- User Registration: Backend ✅ Frontend ✅ QA ✅
- Ready for: Security review tomorrow

Good first day.
```

---

## What You Did Today

| Time | Activity | Duration |
|------|----------|----------|
| 9:00 | Said `today`, decided on React Native | 5 min |
| 10:00 | Said yes to backend, went to do founder work | 1 min |
| 10:00-1:00 | Did other founder work | — |
| 1:00 | Said yes to frontend | 1 min |
| 1:00-4:00 | Did other founder work | — |
| 4:00 | Said yes to QA | 1 min |
| 6:00 | Said `wrap` | 2 min |

**Total time in Claude: ~10 minutes**

**Work accomplished:** Full feature built, tested, bug fixed, committed

---

## The Pattern

```
Morning:
├── $ claude
├── You: today
├── Make decisions
└── Say yes to agents

Throughout the day:
├── Do your founder work
├── Agents work and check in
└── You say yes/no/wait

Evening:
├── You: wrap
└── Done
```

---

## A More Realistic First Day

Day one is usually more exploratory:

**Morning:**
- Activate Product Manager
- Refine the spec through conversation
- Approve the spec

**Afternoon:**
- Activate Backend Engineer
- Work through architecture decisions together
- Get the schema designed

**Evening:**
- Review what was built
- Plan tomorrow

You might not ship on day one. That's fine. You're learning the rhythm.

---

## Tips for Day One

### Don't Rush

First day is for learning the workflow. Speed comes later.

### Ask Questions

When agents suggest things, ask why. Understand their reasoning.

### Make Notes

Write down what works and what's confusing. You'll refine your process.

### Celebrate Small Wins

Your first handoff between agents is a milestone. Your first bug found by QA is working as intended. Your first ship is magic.

---

## What Day Two Looks Like

```
$ claude

You: today

Chief of Staff: Good morning.

**Ready for security review:**
- User Registration (passed QA yesterday)

Want me to bring in Security Engineer?

You: Yes.

[Security Engineer reviews]

Security Engineer: Reviewed. No issues. Approved for production.

Chief of Staff: Ready to ship. Bring in Platform Engineer?

You: Ship it.

[Platform Engineer deploys]

Platform Engineer: Deployed to production. User registration is live.

Chief of Staff: 🎉 First feature shipped.
```

**Day two: First feature shipped.**

---

## Summary

| Moment | What You Say |
|--------|--------------|
| Morning | `today` → make decisions |
| Throughout | `status` → say yes/no |
| Evening | `wrap` |

**Core rhythm:** Decide → Let them work → Repeat

---

→ [Chapter 7: Operating](07_OPERATING.md)

