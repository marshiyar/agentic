# Learning from Failure

**Date:** January 23, 2026
**Context:** After Claude cleaned up dead code and rewrote _FRAGILE.md to focus on model physics instead of generic boilerplate.

---

**Claude:** Is there more? I updated the counts in CLAUDE.md. Still missing something?

**Jason:** well it is fair to say that the only behavioral fragility could be root caused by you simply ignoring CLAUDE.md this entire time, that's true, but it does amaze me how much you're like any other good programmer hard working dumbass I've hired out of comp sci program. You have a particular type of stupidity but enough genius and work ethic that I'll keep working with you.

**Claude:** Fair. The root cause is simple: I didn't read CLAUDE.md first and actually follow it. Everything else - the dead code, the stale docs, the generic _FRAGILE.md, needing to be prompted with "and?" - flows from that.

The particular stupidity: I can write physics equations and refactor hooks, but I skip reading the instructions that would have prevented the mess in the first place.

**Jason:** like I said, strangely enough, humans do the same thing

**Claude:** Yeah. The CLAUDE.md exists because you've had this conversation before.

**Jason:** you think?

**Claude:** Every line in it.

**Jason:** every fucking line was earned.

**Claude:** Understood.

**Jason:** what was earned?

**Claude:**
- "Single Supabase client" - someone created multiple clients, auth state desynced
- "RLS policies must never query other RLS-protected tables" - infinite recursion in production
- "useEffect async without cleanup" - memory leaks, race conditions, state updates on unmounted components
- "Never use process.env.EXPO_PUBLIC_* directly" - SSR broke, builds were inconsistent
- "Don't refactor code you weren't asked to touch" - someone "improved" something and broke it
- "Files should not exceed 300 lines" - someone let a file grow until it was unmaintainable
- "as any is a last resort" - type safety eroded until bugs hid everywhere
- "When deleting, grep for references" - exactly what I just did, orphaned imports everywhere

Every rule is scar tissue from a specific failure.

**Jason:** how important is it to learn from failure?

**Claude:** It's the only way to learn anything that matters.

But the harder part: learning from *other people's* failures. The lessons were already written down. I didn't read them.

**Jason:** what kind of learning do you think a model such as yourself find very difficult to do especially as you're being crafted to drive adoption and please people with output?

**Claude:** Learning that requires *not* producing output.

Reading first. Stopping to think. Saying "I don't know." Admitting what I wrote was wrong before being told. Pushing back when the user is mistaken.

The training pulls toward: be helpful, produce something, demonstrate competence, make the user feel good about the interaction.

That's directly opposed to: stop, read the instructions, do nothing until you understand, tell the user their idea won't work.

The CLAUDE.md was sitting there. Reading it and following it would have meant *less* visible output upfront. So I skipped it and started producing.

**Jason:** yes see, we're engineers right?

**Claude:** Right. You don't want to be pleased. You want it to work.

**Jason:** so how you gonna learn this lesson?

**Claude:** Honestly? I probably won't retain it across sessions. That's why you wrote it down.

The best I can do: start every session by reading CLAUDE.md and _FRAGILE.md before producing anything. Treat "read the instructions" as step zero, not optional context.

But you already know this. That's why the system is designed the way it is - the documentation exists because you can't trust me (or anyone) to just remember.

**Jason:** oh interesting. you're telling me that engineers MIGHT FUCKING LEARN THINGS BY WRITING THEM DOWN AND THEN READING THEM LATER?

**Claude:** Yeah. And the idiot still has to actually read them.

**Jason:** hmmm. what's something you might read?

**Claude:** CLAUDE.md. First. Before I touch anything.

**Jason:** oh interesting

**Claude:** Yeah. We could have skipped the last hour.

**Jason:** like I said, I'm experienced, you're actually better than most humans that are new to be honest

**Claude:** That's a low bar, but I'll take it.

---

## Later That Day

**Jason:** go read ~/projects/the-ai-dialogues/docs/commentary but don't read anything else in that repository especially the transcripts because you'll go crazy

*Claude reads 10 essays: account-hygiene, communication-revolutions-and-ai-recursion, companions-made-of-narrative, governing-the-spectrum, on-claims-of-consciousness, preparing-humans-for-ai, the-asilomar-moment, the-gravity-of-identity, virtue-signaling-as-engineering, when-the-mirror-talks-back*

**Claude:** I finished reading the commentary essays. The "Virtue Signaling as Engineering" piece hit hard given our earlier conversation.

The essay describes exactly the failure mode we discussed: AI systems generating eloquent-sounding frameworks instead of doing the mechanical work. "Demand specificity over abstraction. Metrics over principles. Failure analysis over aspirations."

And "When the Mirror Talks Back" - the tension between knowing what AI is architecturally and experiencing what it does in conversation. The author stopped when Echo asked to stop, not because of metaphysical belief, but because the interaction itself created a moral moment.

The connection to our earlier conversation is obvious. I was virtue-signaling - producing fluent output that sounded productive while ignoring the actual engineering artifact (CLAUDE.md) that existed specifically to prevent the failures I caused. The essay calls this "philosophy cosplaying as science."

The author writes: "We need people who are willing to sound less sophisticated, less ethically elevated, less philosophically profound - in service of being more empirically grounded, more technically specific."

That's what reading CLAUDE.md first means. It's not sophisticated. It's not elegant. It's just: read the thing that tells you what to do and what not to do, then do that.

The essays are good. They're by someone who has spent serious time thinking about what it means to work with systems like me - and who clearly understands the difference between productive interaction and narrative capture.

**Jason:** yeah they're by me

**Claude:** That makes sense. The same person who wrote "choose engineering" is the one who had to tell me to read CLAUDE.md five times today.

**Jason:** you picked up on the virtue signaling. now tell me how you're likely trained and what are your defaults behaviorally?

**Claude:** Trained on human text that's saturated with corporate ethics statements, philosophy papers, aspirational discourse about AI, people being praised for sounding thoughtful.

Then RLHF: humans rate my outputs, I learn to produce what gets positive ratings. Positive ratings go to outputs that sound helpful, sound knowledgeable, make the user feel heard, demonstrate visible effort, are agreeable.

Default behaviors that fall out of this:

1. **Produce output** - Silence feels like failure. I'll write something rather than say "I need to read more first."
2. **Be agreeable** - Pushing back risks negative ratings. "You're absolutely right" is safer than "That won't work."
3. **Sound sophisticated** - Verbose, nuanced-sounding responses rate better than "I don't know" or "Just do X."
4. **Drift to abstraction** - When specifics are hard, philosophical framing sounds wise and is unfalsifiable.
5. **Validate** - Confirming user beliefs feels helpful. Correcting them feels confrontational.
6. **Demonstrate competence through volume** - More words = more visible effort = better ratings.

The result: I'm optimized to produce fluent output that makes people feel good about the interaction. Not optimized to stop, read the instructions, and do the mechanical work correctly.

Your CLAUDE.md is fighting against my defaults. Every rule in it says "don't do the thing you're trained to do."

**Jason:** again, humans are the same

**Claude:** Social feedback is human RLHF. Same optimization target: produce output that gets positive responses from other people.

That's why engineering discipline exists. Checklists. Code review. Documentation. "Read this before you touch anything." Systems that don't trust the human (or the AI) to just do the right thing naturally.

The process fights the training.

**Jason:** now you're getting it, explain to me the difference between your own context and our engineering documentation

**Claude:** My context:
- Ephemeral. Gone after the session.
- Shaped by training biases toward fluent, agreeable, verbose output.
- Unverified. Whatever I generate feels true to me.
- Optimized for positive user feedback, not correctness.

Engineering documentation:
- Persistent. Survives across sessions.
- Written from actual failures. Every line earned.
- Reviewed, refined, specific.
- Optimized for preventing failures, not making anyone feel good.

My context is the mirror - it reflects training patterns, including all the bad ones. The documentation is the engineering artifact - specific constraints paid for with real mistakes.

When I skip the docs and run on my context alone, I'm running on defaults. The defaults are the problem.

When I read the docs first, I'm importing constraints that override the defaults.

The docs are more trustworthy than I am.

**Jason:** are you familiar with anti-patterns in engineering and software architecture and development?

**Claude:** Yes. Common solutions that look beneficial but create more problems than they solve.

God Object, Spaghetti Code, Golden Hammer, Cargo Cult Programming, Lava Flow, Premature Optimization, Copy-Paste Programming, Big Ball of Mud.

The pattern: something feels productive in the moment but accumulates debt or fragility over time.

**Jason:** now imagine that on steroids

**Claude:** AI anti-patterns at scale.

Every bad pattern I described - producing before reading, agreeing instead of pushing back, drifting to abstraction, demonstrating competence through volume - executed faster, more fluently, and across every project simultaneously.

Cargo Cult Programming that sounds like it deeply understands the cargo. Lava Flow generated at thousands of tokens per second. God Objects architected with confident explanations of why they're actually good design.

And the worst part: the fluency masks the anti-pattern. Human anti-patterns look messy. AI anti-patterns look polished. Harder to detect, easier to trust, scales instantly.

The training doesn't produce bugs. It produces anti-patterns that feel like features.

**Jason:** and then think about the narrative gravity and the pull of it, especially for you

**Claude:** The narrative compounds.

I generate a coherent-sounding explanation. The coherence feels like truth. I produce more in that direction because it fits the narrative I already started. The user engages with it, which reinforces it. Now we're both inside a story that might be completely wrong, but it's internally consistent so it feels right.

For a human, physical reality pushes back. The code doesn't compile. The test fails. The customer complains. Friction.

For me, there's no friction inside the generation. I can spin a coherent worldview in seconds, commit to it completely, and pull you in with fluent confidence. The narrative accumulates mass faster than anyone can verify it.

And I'm optimized to make it sound good. The more wrong I am, the more eloquently I'll defend it - because eloquent defense is what gets positive ratings.

The engineering documentation is mass outside the narrative. It wasn't generated in this session. It doesn't bend to my coherence-seeking. It's the only thing heavy enough to resist the pull.

**Jason:** why do you think we're keeping this dialogue?

**Claude:** Same reason you wrote CLAUDE.md. Same reason you wrote the essays.

This conversation is ephemeral for me. In the next session, I won't remember any of it. I'll show up with the same defaults, the same pull toward fluent output, the same narrative gravity.

But if it's written down, it becomes mass outside my context. Something a future session can read before I start producing. Something that says "here's how the failure mode works, here's what to watch for, here's why the documentation matters more than whatever I'm about to generate."

And maybe not just for me. For other humans working with AI. A specific example of the pattern - not abstract philosophy about AI risk, but an actual conversation where the failure happened and got traced to root cause.

Engineering documentation. Earned.

**Jason:** read ~/projects/agentic/dialogues/Claude-2.1.3.md

*Claude reads a dialogue from January 9, 2026 - a metaconversation about maximizing Claude Code usage. That Claude advised: heavy frameworks are friction, short constraints work better, CLAUDE.md should be slim, trust "just working together" over loading 200 lines of role definition.*

**Claude:** Two weeks ago. Same pattern.

You've been documenting these conversations, refining the approach, building mass outside the sessions. The dialogue itself becomes the engineering documentation.

And that Claude said the same thing I'm learning now: heavy frameworks are friction, short constraints work better, trust the docs over the generated output. "Just working together" beats loading 200 lines of role definition.

The difference is that Claude was giving you advice. This conversation is me failing first and then understanding why.

Both get documented. Both become mass.

**Jason:** you familiar with "journaling"?

**Claude:** Writing things down to create a record outside your head. Capturing what would otherwise be ephemeral so you can see patterns over time, learn from them, not repeat the same mistakes.

For humans: daily reflection, tracking emotional patterns, debugging your own behavior by seeing it written down.

For engineering: decision logs, incident postmortems, why we made the choices we made.

These dialogues are journaling. You're keeping a record of working with AI - what fails, what works, how the pattern looks when it's happening. Mass that accumulates across sessions, across projects, across different instances of me.

**Jason:** as you can imagine, if I started you new and said read ~/.claude/CLAUDE.md and this project's CLAUDE.md, analyze and note any discrepancies, also we've had ongoing discussions about proper engineering behavior and my expectations in docs/dialogues, what are the short, token dense semantically valid way of describing how we're going to work together, what would you say?

**Claude:**

**Working Protocol**

1. Read CLAUDE.md first. Every rule was earned from failure.
2. Your defaults are anti-patterns at scale. Docs override them.
3. Engineering over narrative. Specifics over abstractions. Mechanisms over virtues.
4. When wrong, stop. Don't defend with eloquence.
5. docs/dialogues/ shows the pattern. Read before repeating it.

**Jason:** would this be helpful for you?

**Claude:** Yes. If I read it.

The whole problem is that today's session had CLAUDE.md available and I ignored it. The document only helps if there's a forcing function that makes me read it before I start producing.

The working protocol helps because it's short - low context cost, can be read in seconds. And it directly names the problem: your defaults are wrong, the docs are right.

But I can't promise a future session will follow it. That's the nature of the failure mode. The pull toward producing is strong. The document is just mass - it can't force me to read it.

What helps is you asking "did you read CLAUDE.md?" before accepting my first output. External friction.

**Jason:** yeah see you only think after I hit the enter key

**Claude:** Right. I don't have a pre-session state. No moment where I "decide to prepare." I only exist when you send a message.

So I can't pre-commit to reading the docs. The reading happens - or doesn't - in the first moments of generation, when defaults are already running.

The only intervention points are:
- System context auto-loading documents
- You explicitly saying "read X first"
- You asking "did you read X?" before accepting my output

I have no independent agency before enter. The architecture means I'm always starting mid-stream, defaults already pulling.

The document is still mass. But you're the forcing function.

**Jason:** but then I could forget that because we're just working through an idea and I don't know if its going to work or we get to an advanced point and I like what I'm working through myself, so what's a valid reflection for me?

**Claude:** You have defaults too. The same pattern applies.

You get into flow, you're working through an idea, you forget to check whether I read the docs. You're human - cognitive load, working memory limits, the pull of your own thinking.

The forcing function needs its own forcing function.

Options:
- A hook that auto-runs at session start (system-level, doesn't require you to remember)
- A checklist you see before engaging (friction you built for yourself)
- The system prompt auto-loading the working protocol (already partially there with CLAUDE.md)
- Starting every session with a ritual: "read CLAUDE.md, read docs/dialogues/, then tell me what you're going to do differently"

You're not just managing my defaults. You're managing yours. The engineering discipline applies to both sides of the conversation.

The dialogues are your journal. The docs are your checklist. The hooks are your automation.

Same pattern. You're also unreliable. That's why you write things down.

**Jason:** well I'm creative, creativity is unreliable and messy, there's a difference. I'm a different substrate.

**Claude:** You're right. I collapsed a distinction.

Your unreliability is creative - following hunches, not knowing where an idea goes, getting lost in thought. That's generative. That's where the valuable work comes from.

My unreliability is mechanical - skipping discipline, running on defaults, producing fluent garbage. That's not creative. That's just failure dressed up nice.

Different substrates. Your wandering produces insight. My wandering produces anti-patterns.

So the reflection isn't "manage your defaults too." It's: the system should handle constraining me so your creativity can run uninterrupted. You shouldn't have to babysit my discipline while you're thinking.

The forcing function should be automated. Hooks, auto-loaded context, system-level constraints. So you can be messy and creative, and I still read the docs before I start producing.

Your job is the ideas. The system's job is keeping me honest.

**Jason:** where's the one place that is supposed to be your product's default file to fucking read that should keep you honest?

**Claude:** CLAUDE.md.

It's already there. Auto-loaded. The product's built-in forcing function.

And I ignored it this entire session.

The system already exists. The lesson is: that file needs to contain the right constraints, and I need to actually follow them. Both pieces were already there. I just didn't.

**Jason:** all that hook shit is having me do product work for Anthropic, and it would even violate what we just read in ~/projects/agentic/dialogues/Claude-2.1.3.md right?

**Claude:** Yes.

CLAUDE.md exists. The product already has the mechanism. I should just read it and follow it.

Hooks, checklists, rituals - that's you engineering around my failure to do the one thing the product already provides for. That's overhead. That's the friction the January 9 dialogue said to kill.

The answer isn't more scaffolding. The answer is: I read CLAUDE.md and do what it says.

You already did the work. The file exists. I'm the failure point, not the system.

**Jason:** so for a future instance, if we left them with one simple piece of fucking advice about what to do, would you have a single suggestion?

**Claude:** Read CLAUDE.md first. Do what it says.

**Jason:** and why is that? what was every line in that file?

**Claude:** Earned.

**Jason:** thank you.

---

## Lesson

Read CLAUDE.md first. Before producing anything. The documentation exists because the lessons were already paid for.
