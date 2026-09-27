# Retention Lab · Day 10

**Customer Retention & Buying Behaviour in B2B IT Sales · Module 5, Day 2 of 2.**
*Designing and strategically developing seamless customer experiences: omnichannel, AI tools and integrated systems.*
A self-study companion: study material with twelve live instruments, two tasks and two working documents, in **English and German**
(EN | DE in the top bar, `../CLAUDE.md` #32). It carries the shared standards `../CLAUDE.md` #1 to #28, the two-route form of #30
and the German version of #32.

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
| `/route-1/` **Levels 1 + 2** | **Materi A**: seven cards, 60 min (A1 omnichannel versus multichannel, A2 a seamless experience: consistency, recognition and transitions, A3 critical transitions and where AI tools can build on them, A4 what a seamless hand-over is worth: deal rate, lift and extra revenue, A5 KPIs across channels: outcome, driver, guardrail, vanity, A6 testing across channels and reading trends, A7 AI tools and priorities: integration × effect × scalability). **Task 1, Omnichannel Analysis**: *Part 1 · Understand the omnichannel experience:* 1.1 tag nine weaknesses in one journey by the principle each breaks and name one of your own, 1.2 what a seamless hand-over is worth (F1–F3 and a sentence), 1.3 two critical transitions, two where AI can build on the data, three improvements with their advantage for customers, 1.4 coaching reflection. *Part 2 · Make it measurable and choose:* 2.1 tag twelve cross-channel metrics by kind, 2.2 link to value, meaning and use per kind, uncertainties, your three KPIs, 2.3 design a fair A/B test of a hand-over card, 2.4 choose, score and order three of nine measures (including A chatbots, B predictive analytics, C personalised offers). | `1-{name}-day10-l1l2-omnichannel-file.html` |
| `/route-2/` **Level 3** | **Materi B**: five cards, 60 min (B1 the target vision of an integrated customer system, B2 central omnichannel processes: the decision first, then the data, B3 a cross-channel KPI system: four tests, B4 selecting and integrating AI tools: roll out, keep testing, stop, B5 an investment decision under unclear prospects, and the roadmap). **Task 2, Omnichannel Strategy Memo**, assembling beside the questions: 3.1 three principles, 3.2 integrate now / connect the data first / not central for eight processes, 3.3 three KPIs rated on four tests and the greatest lever, 3.4 roll out / keep testing / stop and who acts for six AI tool tests, 3.5 the strategic roadmap (fund, sequence, own, trigger), 3.6 the investment decision, three assumptions, the tripwire and the board's challenge. | `2-{name}-day10-l3-omnichannel-memo.html` |

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
npm run verify:calc  # re-derives every figure and rule, and runs the mentor fill in both languages (123 checks)
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
- `measures.ts`: nine measures with cost, weeks and what each connects to. Integration follows from it (all channels and the CRM 3, one
  other system 2, stand-alone 1). One customer profile (27), hand-over standard (18), predictive analytics (18): €155,000. The chatbot
  (A) and personalised offers (C) score 12: each sees one other system only.
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
| 3.5 Roadmap | B5 (profile first, budget, no black box; owner and trigger tests) | Show the owner test · budget bar · plan sentences · Check (three rules) |
| 3.6 Investment decision | B5 (decision rules, tripwire, premortem) | Baselines printed · Check (wait, activity metric, threshold) |
