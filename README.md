# Retention Lab · Day 10

**Customer Retention & Buying Behaviour in B2B IT Sales · Module 5, Day 2 of 2.**
*Designing and strategically developing seamless customer experiences: omnichannel, AI tools and integrated systems.*
A self-study companion: study material with twelve live instruments, two tasks and two working documents, in **English and German**
(EN | DE in the top bar, `../CLAUDE.md` #32). It carries the shared standards `../CLAUDE.md` #1 to #28, the two-route form of #30
and the German version of #32 and, since the retrofit of 2026-10-03, #33 to #46 (see “Retrofit” below). Route 2 follows #47 since 2026-10-04 (see “Route 2 redesign” below).

The case company is **OmniTech Solutions GmbH** (the plan's case study): *channels work in isolation, customer experience
inconsistent, AI potential unused*, €250,000 and six months. The plan's Level 1 scenario (a customer starts online, switches to sales
and later to support; information gets lost) is OmniTech's journey. Route 2 puts the learner in the Chief Digital Officer's chair:
systems not integrated, customer experience inconsistent, competitors technologically ahead, a restricted budget (€280,000, Case
assumption), a complex system landscape, high time pressure, and an investment decision despite unclear success prospects.

This repo was bootstrapped from `day9` (chrome, primitives, store pattern, tokens, the language machinery) and its content was
replaced. Nothing of LiveConnect remains in the visible content; several data identifiers keep earlier names (e.g. `CUSTOMERS` holds
the eight transitions, `PILOT` the hand-overs with and without the history, the tag ids `respond/personal/learn` mean
transition/recognition/consistency), and each file's header comment says what they hold now.

> **Before you push:** this folder has a fresh local `git init` and no remote. Create the `aion-cs-day10` repository and set the
> remote first (`../CLAUDE.md` #17). Nothing was committed or pushed.

## Routes

| Route | Content | Export |
|---|---|---|
| `/route-1/` **Levels 1 + 2** | **Materi A**: seven cards, 60 min (A1 omnichannel versus multichannel, A2 a seamless experience: consistency, recognition and transitions, A3 critical transitions and where AI tools can build on them, A4 what a seamless hand-over is worth: deal rate, lift and extra revenue, A5 KPIs across channels: outcome, driver, guardrail, vanity, A6 testing across channels and reading trends, A7 AI tools and priorities: integration × effect × scalability). **Task 1, Omnichannel Analysis**: *Part 1 · Understand the omnichannel experience:* 1.1 tag nine weaknesses in one journey by the principle each breaks and name one of your own, 1.2 what a seamless hand-over is worth (F1–F3 and a sentence), 1.3 two critical transitions, two where AI can build on the data, three improvements with their advantage for customers, 1.4 coaching reflection. *Part 2 · Make it measurable and choose:* 2.1 tag twelve cross-channel metrics by kind, 2.2 link to value, meaning and use per kind, uncertainties, your three KPIs, 2.3 design a fair A/B test of a hand-over card, 2.4 choose, score and order three of six measures (including A chatbots and B predictive analytics). | `1-{name}-day10-l1l2-omnichannel-file.html` |
| `/route-2/` **Level 3** | **Materi B**: five cards, 60 min (B1 the target vision of an integrated customer system, B2 central omnichannel processes: the decision first, then the data, B3 a cross-channel KPI system: four tests, B4 selecting and integrating AI tools: roll out, keep testing, stop, B5 an investment decision under unclear prospects, and the roadmap). **Task 2, Omnichannel Strategy Memo**, one decision frame (#47): a live control panel, **Step A** (Block 3.5, the architecture: each of eight items Now / After data is ready / Not now, a two-sentence vision, what the plan gives and what it costs) and **Step B** (Block 3.6, the investment decision despite unclear prospects, why, what you will watch and when you would stop), then four folded Optional blocks, “Go deeper”: 3.1 three principles, 3.2 integrate now / connect the data first / not central for eight processes, 3.3 three KPIs rated on four tests and the greatest lever, 3.4 roll out / keep testing / stop and who acts for six AI tool tests. The memo assembles below the answers. | `2-{name}-day10-l3-omnichannel-memo.html` |

Minutes: Materi A 60 + Task 1 65, Materi B 60 + Task 2 50. All in `lib/routes.ts`.

## German version (CLAUDE.md #32)

Same machinery as Days 5–9: `lib/lang.ts`, `lib/i18n.tsx`, `ui.lang` in the persisted store. Common terms stay English in German
sentences (Omnichannel, Multichannel, Customer Journey, Touchpoint, Predictive Analytics, Chatbot, Roadmap, KPI, Guardrail, Uplift, Lift,
Owner, Tripwire…); explanations are German, formal "Sie". Where German practitioners use the German word, the German word is used and
the glossary entry says so (Übergabe, Wiedererkennung, Konsistenz, Kundenprofil, Abschlussquote, Schnittstelle, Systemlandschaft).
Mentor tools stay English; file names and the deliverable names stay English.

## Stack

Next.js 14 App Router · TypeScript strict · Tailwind (CS tokens) · Zustand + `persist` (key `cs-d10-v1`, version 1, `skipHydration` +
`StoreHydrator`, deep `mergeDefaults`) · static export. No animation, drag-and-drop, PDF or chart library.

```bash
npm install
npm run dev          # http://localhost:3000 (the parent launch config uses port 3010)
npm run typecheck
npm run verify:calc  # re-derives every figure and rule, and runs the mentor fill in both languages (295 checks)
npm run build        # writes the static site to out/  (stop `npm run dev` first)
```

## What is in the data

- `ladder.ts`: nine weaknesses along one journey (3 seamless transition, 3 recognition, 3 consistency) with tests, pair tests, clue,
  reason and rejected principles.
- `forecast.ts`: last year's hand-overs from online to sales (Case assumption). Deal rate = deals ÷ hand-overs × 100; lift = rate with
  the history ÷ rate without; extra revenue = channel-switching journeys a year × (rate with − rate without, as a share) × deal value.
  72 ÷ 240 = **F1 30%**; 30 ÷ 15 = **F2 2**; 2,000 × 0.15 × €1,200 = **F3 €360,000**. Worked example of A4 (Weser Systemhaus): 25%,
  10%, 2.5, €120,000. Also the eight transitions of 1.3 (critical: configurator → sales, offer → chat; AI can build: contract →
  onboarding, tickets → renewal talk; traps: the newsletter and the social media complaint, many drop out but no decision; the renewal
  talk, a decision but only 12% drop out; chatbot → hotline, 22% and nothing travels, no decision).
- `patterns.ts`: four kinds of metric with tests and pair tests; twelve cross-channel metrics (3 each; moved with value: outcome 3,
  driver 2, guardrail 1, vanity 0); the link rule; meaning and use per kind; seven uncertainties (four real); the A/B test card (four
  parts, one fair option each, plus hypothesis and decision rule).
- `measures.ts`: six measures (2026-10-07, was nine; same change as Day 9's of 2026-10-05). Each price is the sum of printed parts (set-up, a licence for the six months, days or hours × a rate); weeks until it is in use. Integration follows from what it connects to (all channels and the CRM 3, one other system 2, stand-alone 1).
  One customer profile (€80,000, 27), hand-over standard (€25,000, 18), predictive analytics (€50,000, 18): €155,000 of €250,000. The others: chatbot (A, €40,000, 12: useful AI, but it sees only the ticket system), customer app (€90,000, 6: one more channel that connects to nothing), one omnichannel suite (€180,000, 30 weeks, 6: in use only after the six months; with the profile and the hand-over standard €35,000 over).
  Block 2.4 no longer asks which problems each measure answers: `PlanPicture` shows it (a problem is lit only if a chosen measure answers it and has working time left inside the 24 weeks) plus a 24-week bar per measure. Personalised offers (C), the per-channel dashboards and the hotline staff were dropped. Persist version 4 drops them from old blobs.
- `route2.ts`: six principles, eight processes (rule: does the customer decide in it? does ≥ 80% of its data reach the profile?),
  eight KPI candidates with printed facts and limits, six AI tool tests (rule: uplift ≥ 10% and ≥ 100 conversions → roll out; uplift ≥
  3% → keep testing; else stop), eight roadmap items (model €240,000 of €280,000; the all-in-one suite is a black box and in use only
  after 30 weeks; the stand-alone app adds an island), owners, triggers, three decisions, KPIs and the board's month-3 challenge.

## Mentor bar

The first element on every page. Enter `muchson123` once and every model answer of Routes 1 and 2 fills in (plus a participant name if
empty and every calculator part), so each export downloads straight away. The same unlock shows the answer keys (1.1, 1.3 picks, 2.1,
2.2 rows and uncertainties, 2.3 test card, 2.4 measures and order, 3.1–3.6) and a worked answer for every other question (F1–F3 as
step tables with pitfalls, every free text with what to look for). Client-side convenience gate, not security; a reload locks it.

## Notes on deviations from the brief and the shared rules

1. **Two routes (CLAUDE.md #30).** The plan's Level 1 Task 1 (weaknesses in the process, critical transitions, three improvement
   approaches, advantages for customers), Level 1 Task 2 (evaluate A chatbots, B predictive analytics, C personalised offers by benefit,
   prioritise them, risks, data needed) and the Level 2 case study (OmniTech: channels and touchpoints, breaks, an omnichannel strategy,
   AI tools, a KPI and optimisation system) run on one company. Mapping: weaknesses 1.1; critical transitions 1.3a; improvements and
   advantages 1.3c (“so …” = the advantage for the customer); breaks and value of fixing them 1.2; AI tools A/B/C evaluated and
   prioritised 2.4 (benefit = effect, data needed = what each connects to, printed per measure); risks of the data behind the figures
   2.2; where AI can build 1.3b and Materi A3; KPI and optimisation system 2.1–2.3. The coaching focus and reflection are Block 1.4. The
   Level 3 transfer project's five items are 3.1 to 3.5; the additional requirement (an investment decision despite unclear success
   prospects) is 3.6.
2. **The evaluation "Integration × Effect × Scalability"** from the plan is the score of Block 2.4. Integration is derived from what each
   measure is printed to connect to, so it can be checked; effect and scalability are judged.
3. **Task 1 is 65 minutes** (the A/B test card is its own block, as on Days 8 and 9).
4. **Level 1 Task 2 asks for the risks and data needs of each AI tool.** They are taught in Materi A3 (a table of what each tool needs)
   and A7 (benefit, data, risk), printed on each measure card ("connects to"), and asked for in the order justification of Block 2.4;
   there is no separate field for them.
5. **Every figure beyond the brief is a Case assumption**: the journey, the hand-over figures, the transitions, the metrics, the costs
   and weeks, the Route 2 budget (€280,000), the connected-data shares, the uplifts, the KPI baselines and the board's challenge. The
   brief gives €250,000 and six months.
6. **German by the user's standing request (#32)**; English stays the default.
7. **Not built as a Friday capstone (#29)**: the request did not name Day 10 as a Friday.
8. **The plausible-range band in A6** is a standard normal approximation, shown only to make the effect of sample size visible; no task
   asks for it.
9. **Sources to re-check before teaching:** citations are given by their usual details; page ranges and editions differ between
   printings. The hand-over, deal-rate and uplift figures are illustrations, not research findings.

## Coverage: where each task block is taught

| Block | Taught in | Help while answering |
|---|---|---|
| 1.1 Transition, recognition, consistency | A1, A2 (tests, pair tests, worked sort) | Show the test questions · Check + clue · reasoning after two checks · undo/redo |
| 1.2 What a seamless hand-over is worth | A4 (the four steps on Weser) | Show where the numbers are · Show the formula + calculator · per-part clues |
| 1.3 Critical transitions, AI, improvements | A3 (decision × drop-out × what travels), A2 | Check (picks as a count, improvements floor) + clue |
| 1.4 Coaching reflection | A1, A2, A3 | Worked answers for the mentor |
| 2.1 Tag the metrics | A5 (four kinds, pair tests, KPI tree) | Show the test questions · Check + clue · reasoning after two checks · undo/redo |
| 2.2 Link, meaning, use; KPIs | A5, A6 (link rule, uses, uncertainties, trends) | Your tally · Check per row with clues · Check my choices |
| 2.3 A fair A/B test | A6 (test card, sample size) | Check per part with clue · hypothesis and rule floors |
| 2.4 Measures, scores, order | A7, A3 (matching problems, integration rule, AI tools and their data, budget) | Show the test questions · budget bar · problem coverage · Check · order check |
| 3.1 Principles | B1 | Check (shared profile and hand-over standards) + clue |
| 3.2 Processes | B2 (decision first, 80% connected rule) | Show the test questions · Check (count) + clue |
| 3.3 KPI system | B3 (four tests, limits from printed facts) | Show the test questions · Check (limits, early count) |
| 3.4 AI tools: roll out, keep testing, stop | B4 (uplift and conversions rule, owners) | Show the test questions · Check (count) + clue |
| 3.5 Step A · Architecture | B5 (the order: base, standards and people, data, AI tools; four tests; the time test) | The live panel (diagram, three bars, four tests on request, “what to change” reading) · numbers today printed in the brief |
| 3.6 Step B · Investment decision | B5 (invest now, in stages, watch one figure, say when you stop) | The decision's reading and plain hint · the watch sentence's clue kit |

## Retrofit of 2026-10-03 (the user's request: bring Days 8 to 12 up to the current rules, Route 1 first, decide without asking)

Applied from `../CLAUDE.md`: #33 to #46. Route 1 was done first, Route 2 second. Nothing was committed or pushed.

**Core and Optional (#35, #40, #44).** Route 1 has **two Core blocks, one per level** (1.1 for Level 1 and 2.4 for Level 2; 20 min of the 64) and six Optional blocks, folded and never removed
(1.2, 1.3, 1.4, 2.1, 2.2, 2.3). Route 2 has **two Core blocks** (3.5, 3.6; 19 min of the 50) and
four Optional blocks (3.1, 3.2, 3.3, 3.4). Core cards: A2 (the tests of block 1.1), A7 (block 2.4) and B5 (Route 2); Optional cards: A1, A3, A4, A5, A6, B1, B2, B3, B4. The ring, the page map
and both missing lists count Core only; an unanswered Optional block is marked as such in the exported file.

**Update 2026-10-10 (Route 1 narrowed to one Core block and one Core card per level).** Core is now Block 1.1 with card A2 (Level 1) and Block 2.4 with card A7 (Level 2); Blocks 1.3 and 2.1 and cards A1, A3 and A5 are folded Optional items (one click opens them, nothing is removed or gated). Block 1.1 now cites card A2 only, which carries the test questions it needs, so no Core block reads an Optional card (#40). The ring, the page map and the missing lists count the two Core blocks and two Core cards; `npm run verify:calc` checks it, including a Core-only fill that leaves the missing list empty. Route 2 is unchanged.

**What changed in Route 1.** Block 1.2 is read-only (the two close rates are printed, nothing is calculated, #44) and Optional; the three KPIs moved into Block 2.1;
Block 2.4 names a category for every measure, asks for a reason for each judged score, and shows the budget as a hint (#45, #38). Every measure and every
contact situation prints a scene and who does what (#46). Every interactive picture opens with “The point” and a three-step story (#36); long text sits behind
“＋ Show …” (#37); every free-text field has a clue kit and an example answer (#42, #23); two live rust notices (#34); the page map shows Core / Optional (#28).

**What changed in Route 2 (superseded on 2026-10-04 by the redesign below).** The live memo moved to the bottom with “Hide the memo” (#39); Blocks 3.1 to 3.4 became folded Optional blocks; the trigger, pickup, assumption and tripwire kits of this first pass were replaced by the panel.

**Shared mechanics.** `cs-d10-v1` persists at version 4 with a pure `migratePersisted` and a deep merge (#9); `npm run verify:calc` runs 310 checks (figures and rules, the panel's bars, tests and categories, the mentor fill and a
Core-only fill in both languages, #40 scans of the Core blocks, old version-2 blob).

### Notes on deviations (retrofit)

R1. **No video was embedded (#33).** None was searched and verified in this pass; a card without a video is not a defect (#33). The video slot stays empty (`data/videos.ts`).
R2. **No calculators (#44).** The plan names no calculation beyond the printed rates, the budget and the score formula, so the former F1–F3 calculators and “Show the formula” helps
    of Block 1.2 were removed; wherever older text above mentions them, it is superseded.
R3. **Route 1 has two Core blocks (one per level) and two Core cards (A2, A7); Route 2 keeps its two Core blocks (Step A, Step B) and one Core card (B5)** (user decision of 2026-10-10: the one-per-level idea of #48 applied to Route 1 only, so learners have time for other tasks; Route 2 stays as built). Nothing is removed: Blocks 1.3 and 2.1 and cards A1, A3 and A5 are now folded Optional items, and the exported file marks an unanswered Optional block as such.
R4. **Model answers use only printed numbers.** The mentor's KPI answer uses aims such as “up” or “stay under a limit”; the panel's bars and the memo's figures are computed from the printed costs, weeks, data shares and the budget, so each number can be found on the screen.
R5. **The Word documents (#31) were not rebuilt** in this pass and are out of date for Day 10: Core / Optional marks, “The point”, the shown numbers and the new case-brief table are missing. Rebuild them from the reviewed Markdown in `../materi-task-docx/_source/` when wanted.
R6. **German and English** are written by hand next to each other for every new text (#32); the glossary got “cost of waiting” and “halfway between today and the aim”.
R7. **Plan mapping (#44).** The plan's numbered task items and the Level 3 requirements are mapped in note 1 above; Core is drawn from them: Route 1's Core blocks answer the Task 1 items (the first tagging and the situations or opportunities) and the case study's KPI and measures items; Route 2's Core blocks are the implementation requirement (3.5) and the additional decision requirement (3.6).

### Dependency checklist (#40)

✓ = reads only Core blocks, Core cards and the case brief. An Optional item may read a Core answer; nothing reads an Optional item back.

| Item | Status | Reads from | Core-safe |
|---|---|---|---|
| **Route 1** | | | |
| 1.1 Transition, recognition or consistency? | **Core** | the brief, the block's own printed items, cards A1, A2, A3 | ✓ |
| 1.2 Read the hand-over figures: two deal rates side by side | Optional | the brief, the block's own printed items, cards A4 | self-contained |
| 1.3 Critical transitions, where AI can build, and three improvements | **Core** | the brief, the block's own printed items, cards A3 | ✓ |
| 1.4 Coaching reflection: from Level 1 to Level 2 | Optional | the brief, the block's own printed items, cards A1, A2, A3 | self-contained |
| 2.1 Tag OmniTech's twelve metrics by kind, and name your three KPIs | **Core** | the brief, the block's own printed items, cards A5 | ✓ |
| 2.2 What each kind of metric is worth, and the uncertainties in measuring | Optional | the brief, the block's own printed items, cards A5, A6 | self-contained |
| 2.3 Design a fair A/B test | Optional | the brief, the block's own printed items, cards A6 | self-contained |
| 2.4 Choose three measures, score them, put them in order | **Core** | the brief, the block's own printed items, cards A7 | ✓ |
| **Route 2** | | | |
| Case brief and “Where Route 1 left off” | — | Route 1 Core Block 2.4 (measures chosen), “the numbers today” | ✓ |
| Control panel (diagram, bars, tests) | Core | printed item facts, “the numbers today”, card B5 | ✓ |
| 3.1 The target vision of an integrated customer system | Optional | its own printed items, cards B1 | self-contained |
| 3.2 Definition of central omnichannel processes | Optional | its own printed items, cards B2 | self-contained |
| 3.3 A cross-channel KPI system | Optional | its own printed items, cards B3 | self-contained |
| 3.4 Selection and integration of AI tools, tested: roll out, keep testing or stop | Optional | its own printed items, cards B4 | self-contained |
| 3.5 Step A: the prioritised implementation architecture | **Core** | the panel, printed item cards, “the numbers today”, card B5 | ✓ |
| 3.6 Step B: an investment decision despite unclear success prospects | **Core** | own plan from Step A (quoted in the block), the panel's readings, “the numbers today”, card B5 | ✓ |
| **Cards** | | | |
| A2, A7, B5 | Core | the case (A2 carries the tests of block 1.1; A7 the rules of block 2.4) | ✓ |
| A1, A3, A4, A5, A6, B1, B2, B3, B4 | Optional | — | no Core block cites them |

## Route 2 redesign (CLAUDE.md #47, applied 2026-10-04; reference: `../day8/ROUTE2-REDESIGN.md`)

The user asked for Day 10 to get the same treatment as Day 9. Route 2 is one decision frame with a live control panel; only the form is reused from Day 8 and Day 9, the items and rules are Day 10's.

```
Materi B (five cards, 60 min; B5 rewritten: how an architecture is built)
Case brief + “the numbers today” (cost, weeks, data connected, the KPI each item moves)
Control panel · eight item cards · diagram with links that can break · three bars · four tests on request · a reading in plain words
Step A  (Core, 3.5)   each item Now / After data is ready / Not now · vision (two sentences) · what my plan gives and what I give up
Step B  (Core, 3.6)   invest now, in stages / wait until proven / buy the suite · why · what I will watch and when I would stop
Go deeper (Optional, folded): 3.1 · 3.2 · 3.3 · 3.4   (self-contained, never read by the frame)
Memo (bottom, full width, Hide) → Export
```

**Plan mapping (#44).** Day 10's Level 3 transfer project asks for: the target vision (Step A's vision box), the central omnichannel processes (the diagram's layers and the item cards; the full exercise is
Optional 3.2), the selection and integration of AI tools (the tiers, with the data test), a cross-channel KPI system (the shared profile and KPI system as the base, the **Measurable** bar, and Step B's watch sentence),
a strategic roadmap (Step A) and the additional requirement, an investment decision despite unclear success prospects (Step B and the data switch “15 points weaker”). The plan asks for no calculation beyond the
printed budget, so the learner derives no number: the bars are computed and shown.

**The panel.** Eight items: the shared customer profile and KPI system (the base), the hand-over standard and card, the chatbot on the customer profile and the predictive analytics for account managers (the AI tools),
omnichannel training, one price list and one set of promises, the all-in-one omnichannel AI suite (a black box) and a new customer app whose contact form is not connected (it names no KPI). A solid teal link works; a
dashed amber link says in words why it does not (an AI tool with no profile to read, history not carried at hand-overs, a suite with no link to the profile, an app not connected). Three bars: **Budget** (€280,000,
six months), **Measurable** (money on items that are measured, whose data is connected and that are in use within six months) and **Risk** (money on a black box, on data below 80% connected when the item starts, or on
an item in use only after the six months), the last two as ranges across the two data scenarios (as the brief says, and 15 points weaker). **Time** is derived: month in use = start month + weeks ÷ 4, rounded up; After
data is ready starts in the month the hand-over standard is in use. Four tests, hidden until asked: integration comes first; every funded item has a purpose; data is connected when an AI tool starts; it fits the budget
and the six months. Each open test gives the fact, the rule and two ways to act, never a question.

**Categories (mentor only).** The reading's wording follows three internal categories (1 safe, 2 fair, 3 clearly wrong). Only the unlocked mentor sees them (`MentorCategory`); they are never exported, never printed and
never block (#38). The model set (shared profile, hand-over standard, chatbot, training and price list Now; predictive analytics After data; suite and app Not now) reads as holding all four tests; anything else reads what to
change to get there.

**What was removed from the first pass.** Start months, owners, triggers, the pickup point, three assumptions, the tripwire and the board's challenge (the plan names none of them), the three-method numbers kit
(`lib/r2Numbers.ts`) and `SentenceKit`. B5's worked example is now a small panel on another company (Isar Datentechnik).

**Missing (#34, #38).** Only an empty field, a too-short reason, or no item Now. Labels start “Step A:” / “Step B:”. Going over the budget, an AI tool on thin data or a decision that disagrees with Step A is a reading
and a plain hint, never a missing item; the memo prints the choice, the amount over the budget and the reasons as plain facts.

### Notes on deviations (redesign)

P1. **The data prerequisite is the hand-over standard, not a tracking clean-up.** Day 9 prepares data with a clean-up item; Day 10 has no such item, and its own B2/B4 teach that hand-overs which carry the history are what
    connect the data. So “After data is ready” waits for the hand-over standard (4 weeks, in use month 2): the predictive analytics (data 60% connected) start in month 2 and are in use in month 5; the chatbot (81%) can start
    in month 1. The shared profile is the base for the integration test, not for the data test.
P2. **Time pressure is mild** with six months: only the suite (30 weeks, in use in month 9) is late. The new app (16 weeks, month 5) fails the purpose test, not the time test.
P3. **Item identifiers keep earlier names** (`chat` is the hand-over standard, `personal` the chatbot, `routing` the predictive analytics, `tracking` the price list, `relaunch` the app); `data/route2Panel.ts` says so.
P4. **Persist version 3.** The funded items of a version-2 blob become “now”; the removed fields are dropped; a deep merge fills the new ones. Tested in `verify:calc` and in the browser from an old-shape blob.
P5. **Word documents** (#31) for Route 2 are stale (they describe the old 3.5 and 3.6) and were not rebuilt.
P6. **Verified:** `tsc`, `verify:calc` (310 checks), a production build in a scratch copy served as a static export: clean `localStorage`, the panel with the model set (€240,000; 81% / 65% Measurable; 0% / 17% Risk; 4 of 4 tests,
    3 of 4 with weaker data), mentor fill, memo, DE, 390 px (no horizontal scroll), old blob, no console errors.

## Block 2.4 reshaped (2026-10-07, copied in form from Day 9)

The user said the content is the same but the way Task 1's last block is worked differs slightly from Day 9 and Day 8, and asked Day 10 to follow. Day 9 had changed Block 2.4 on 2026-10-05; Day 10 now does the same.

- **Six measures, not nine**, every price itemised on its card (“The price: €80,000 = …”). Three strong, three traps of different kinds (a good tool on one system, an added channel, a suite that is too slow).
- **No per-measure “which problems does it answer” question.** `PlanPicture` (copied from Day 9, six-month frame) shows three problem boxes (solid only if a chosen measure answers it and has working time left) and one 24-week bar per chosen measure (hatched while being built, solid once in use). It names no right answer.
- **Plain-word score anchors** for effect and scalability printed under the cards and taught in Materi A7, next to the integration rule; two new decision rules in A7 (price from parts; weeks decide whether a measure has time to work).
- **Check** now flags only integration scores that do not follow the printed connection; missing list no longer asks for problems; export lists each measure's problems from its data.
- Verified: `tsc`, `verify:calc` (318 checks incl. prices, coverage in time, an old nine-measure blob), see below for the browser check.

Notes on deviations: Q1. Personalised offers (C) named by the plan's Level 1 AI list are no longer a Block 2.4 option; chatbots (A) and predictive analytics (B) remain, and Block 1.3 and Materi A3 still teach personalised offers. Q2. The model plan costs the same €155,000 as before. Q3. Word documents (#31) are stale for Block 2.4 and Route 2.
