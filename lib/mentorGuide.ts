import { FORECAST, PILOT } from "@/data/forecast";
import type { FigureId } from "@/data/forecast";
import { BUDGET, JOINS_LABEL, MEASURE_BY_ID, MODEL_COST, MODEL_MEASURES, PROBLEM_LABEL, explainBucket, modelScore } from "@/data/measures";
import type { MeasureId } from "@/data/measures";
import { KEY_L1, KEY_R2 } from "@/data/mentorKey";
import { ARCH_BY_ID, COMP_BY_ID, MODEL_ARCH, MODEL_GREATEST, MODEL_TRIGGER, OWNERS, OWNER_ACCEPT, PRINCIPLES, R2_BUDGET } from "@/data/route2";
import type { ArchId, PrincipleId } from "@/data/route2";
import { euro } from "@/lib/lang";

/**
 * Mentor-only worked answers for every task question the answer keys (lib/answerKey.ts) do not already cover: the numeric fields,
 * with every step of the calculation written out with its numbers, and the free-text answers, with the model text and what a good
 * answer must contain. Shown only after the mentor bar is unlocked, never exported. Numbers are computed from the same constants as
 * the tables, the calculators and the answer checks, so they cannot drift from the model answers. Mentor tools stay English
 * (CLAUDE.md #32); the model answers quoted follow the site's language, because the fill enters them in that language.
 */
export type WorkedStep = { label: string; calc: string; result: string };
export type MentorGuide = { title: string; answer: string; steps?: WorkedStep[]; why?: string; lookFor?: string[]; pitfalls?: string[] };

const n = (v: number) => (Math.round(v * 100) / 100).toLocaleString("en-US");
const n3 = (v: number) => (Math.round(v * 1000) / 1000).toLocaleString("en-US");
const L1 = () => KEY_L1();
const R2 = () => KEY_R2();

/* ------------------------------------------------------------------ Route 1 */

export function extraInsightGuide(): MentorGuide {
  return {
    title: "1.1 · A weakness of your own",
    answer: L1().extraInsight ?? "",
    why: "A weakness names a moment in the journey, what goes wrong there today, and which principle it breaks (transition, recognition, consistency).",
    lookFor: ["A concrete moment between two channels (a switch, a hand-over, a second contact).", "What goes wrong today: a wait, a repeated question, two different answers.", "What it costs the customer (“so …”)."],
    pitfalls: ["A channel with a problem of its own (“the hotline is slow”): ask what breaks between channels.", "A technology wish (“we need an app”): ask which break it would fix."],
  };
}

export function figureGuide(id: FigureId): MentorGuide {
  const v = PILOT.variant;
  const c = PILOT.control;
  if (id === "F1")
    return {
      title: "1.2 · F1 Deal rate with the history",
      answer: n(FORECAST.f1),
      steps: [
        { label: "Deals ÷ hand-overs", calc: `${v.orders} ÷ ${v.sent}`, result: n(v.orders / v.sent) },
        { label: "× 100", calc: `${n(v.orders / v.sent)} × 100`, result: `${n(FORECAST.f1)}%` },
      ],
      why: "Both numbers come from the rows where sales saw the online history: of 240 hand-overs, 72 became deals.",
      pitfalls: [`Share left as a fraction (0.3 instead of 30): ${n(v.orders / v.sent)}.`, `Rows without the history used: ${n(FORECAST.controlRate)}.`, `All deals over all hand-overs: ${n(((v.orders + c.orders) / (v.sent + c.sent)) * 100)}.`],
    };
  if (id === "F2")
    return {
      title: "1.2 · F2 Lift",
      answer: n(FORECAST.f2),
      steps: [
        { label: "Deal rate without the history", calc: `${c.orders} ÷ ${c.sent} × 100`, result: `${n(FORECAST.controlRate)}%` },
        { label: "Lift = F1 ÷ that rate", calc: `${n(FORECAST.f1)} ÷ ${n(FORECAST.controlRate)}`, result: n(FORECAST.f2) },
      ],
      why: "Hand-overs in which sales saw the history closed twice as often as those that started from zero.",
      pitfalls: [`Subtracted instead of divided (30 − 15): ${n(FORECAST.f1 - FORECAST.controlRate)}.`, `Divided the deals (72 ÷ 108): ${n(72 / 108)} — the groups are not the same size, so the counts must become rates first.`, `Divided the hand-overs (720 ÷ 240): 3.`],
    };
  const diff = (FORECAST.f1 - FORECAST.controlRate) / 100;
  return {
    title: "1.2 · F3 Extra revenue a year",
    answer: n(FORECAST.f3),
    steps: [
      { label: "Difference between the two rates, as a share of one", calc: `(${n(FORECAST.f1)} − ${n(FORECAST.controlRate)}) ÷ 100`, result: n3(diff) },
      { label: "Extra deals a year", calc: `${n(PILOT.yearly)} × ${n3(diff)}`, result: n(PILOT.yearly * diff) },
      { label: "× average deal value", calc: `${n(PILOT.yearly * diff)} × ${n(PILOT.order)}`, result: euro(FORECAST.f3) },
    ],
    why: "Only the deals the history adds on top of starting from zero are extra: 300 more deals a year at €1,200 each.",
    pitfalls: [`All deals at the rate with the history counted as extra (2,000 × 0.30 × 1,200): ${n(PILOT.yearly * 0.3 * PILOT.order)}.`, `Difference not turned into a share (2,000 × 15 × 1,200): ${n(PILOT.yearly * 15 * PILOT.order)}.`, `Last year's 240 hand-overs used instead of a year's 2,000 journeys: ${n(240 * diff * PILOT.order)}.`],
  };
}

export function meaningGuide(): MentorGuide {
  return {
    title: "1.2 · What a seamless hand-over means",
    answer: L1().meaning ?? "",
    lookFor: ["At least one of the learner's own figures (30%, 2 times, €360,000, or 15%).", "What to change first: the hand-over from the configurator to sales.", "Said as an estimate: sales may have looked up the history only for the best leads."],
    pitfalls: ["A sentence with no figure: the app asks for one.", "“The history makes €360,000”: the figures are not a fair test yet."],
  };
}

export function insightGuide(i: number): MentorGuide {
  const a = (L1().insights ?? [])[i];
  return {
    title: `1.3 · Improvement ${i + 1}`,
    answer: a ? `${a.basis ?? ""} · ${a.text}` : "",
    why: "Three concrete improvements for three different principles, each saying what the customer gains. The app checks only that each names a principle, is long enough and says what follows.",
    lookFor: ["A concrete change at a named transition.", "The principle it serves (transition, recognition, consistency).", "What the customer gains (“so …”): the advantage the plan asks for."],
    pitfalls: ["A goal instead of a change (“be seamless”): ask what exactly changes, where.", "Two improvements for the same principle."],
  };
}

export function reflectGuide(k: "interpret" | "causation" | "decider"): MentorGuide {
  const r = L1().reflect;
  return {
    title: k === "interpret" ? "1.4 · Why omnichannel fails, and where the breaks are" : k === "causation" ? "1.4 · Technology versus customer experience" : "1.4 · Integration first, and priorities",
    answer: r ? r[k] : "",
    lookFor:
      k === "interpret"
        ? ["Channels optimised one by one instead of the journey.", "The breaks in OmniTech's journey (configurator → sales, sales → support) and the systems not connected."]
        : k === "causation"
          ? ["Technology is a tool; the experience is whether the customer can switch without starting again.", "A new channel that does not know the others makes the experience worse."]
          : ["Integration first (profile, hand-over standard).", "AI on top of the joined data.", "Judged by a few KPIs across channels, not per channel."],
  };
}

export function misreadGuide(): MentorGuide {
  return {
    title: "2.2 · Your three KPIs",
    answer: L1().misread ?? "",
    lookFor: ["At least one outcome KPI (cross-channel deal rate, revenue per customer, renewals).", "At least one driver KPI (hand-overs that carry the history, hours to first contact).", "For each: where the number comes from and a target; a guardrail (customers who repeat themselves) as the third is a strong answer."],
    pitfalls: ["Channels offered, app downloads or bot conversations as a KPI: vanity metrics, they count OmniTech's activity.", "A separate KPI per channel: the breaks between channels stay invisible."],
  };
}

export function abGuide(): MentorGuide {
  const k = L1().ab;
  return {
    title: "2.3 · Hypothesis and decision rule",
    answer: k ? `${k.hyp} · ${k.rule}` : "",
    lookFor: ["Hypothesis: one change, the KPI expected to move, and a reason (“because …”).", "Decision rule written before the test: a threshold to roll out, a band to keep testing, a point to stop.", "A guardrail in the rule (customers who repeat themselves, contradictory information)."],
    pitfalls: ["“The card will help”: no KPI, no reason.", "A rule without numbers, or one decided after looking at the result."],
  };
}

export function scoreGuide(id: MeasureId): MentorGuide {
  const m = MEASURE_BY_ID[id];
  const e = explainBucket(m.evidence);
  return {
    title: `2.4 · ${m.name}`,
    answer: `${e} × ${m.model.effect} × ${m.model.feasibility} = ${modelScore(id)}`,
    steps: [
      { label: "Integration from what it connects to (A7)", calc: `connects to ${JOINS_LABEL[m.joins]} → all channels and the CRM: 3 · one other system: 2 · nothing: 1`, result: String(e) },
      { label: "Score = Integration × Effect × Scalability", calc: `${e} × ${m.model.effect} × ${m.model.feasibility}`, result: String(modelScore(id)) },
    ],
    why: `${m.model.note} Answers: ${m.targets.length ? m.targets.map((t) => PROBLEM_LABEL[t]).join(", ") : "none of the three problems"}.`,
    pitfalls:
      id === "chatbot" || id === "offers"
        ? ["Integration 3 “because it is AI”: it is printed to connect to one other system only: 2."]
        : id === "suite"
          ? ["Effect 3 “because it replaces everything”: it is in use only after 30 weeks, beyond the six months, so it cannot work in time: effect 1."]
          : id === "app"
            ? ["Answering “channels work in isolation”: a stand-alone app is one more isolated channel."]
            : undefined,
  };
}

export function whyGuide(): MentorGuide {
  return {
    title: "2.4 · Why the first priority goes first",
    answer: L1().why ?? "",
    steps: [
      { label: "Model plan cost", calc: MODEL_MEASURES.map((id) => n(MEASURE_BY_ID[id].cost)).join(" + "), result: euro(MODEL_COST) },
      { label: "Left of the budget", calc: `${n(BUDGET)} − ${n(MODEL_COST)}`, result: euro(BUDGET - MODEL_COST) },
    ],
    lookFor: ["The order and what decides it (the score, or the lift from 1.2).", "The cost against €250,000.", "What was left out, said as a decision (stand-alone, too slow, or no problem answered)."],
  };
}

/* ------------------------------------------------------------------ Route 2 */

export function principleTextGuide(c: PrincipleId): MentorGuide {
  return {
    title: `3.1 · ${PRINCIPLES[c].name}`,
    answer: (R2().principleText ?? {})[c] ?? PRINCIPLES[c].means,
    lookFor: ["What changes for OmniTech's teams or customers.", "Which problem of the brief it answers (systems not integrated, customer experience inconsistent, competitors ahead)."],
    pitfalls: c === "hoard" || c === "blackbox" ? ["This principle is one the key rejects; if the learner kept it, ask what a new channel knows about the others, or what changes for customers before the suite runs everywhere."] : undefined,
  };
}

export function greatestGuide(): MentorGuide {
  return {
    title: "3.3 · The KPI with the greatest leverage",
    answer: `${COMP_BY_ID[MODEL_GREATEST].name} · ${R2().greatestWhy ?? ""}`,
    lookFor: ["One of the learner's three KPIs.", "The tests that decide it (early and linked to value together).", "The problem of the brief it answers (systems not integrated)."],
    pitfalls: ["Channels offered as greatest “because it is counted daily and complete”: it is not linked to value."],
  };
}

export function triggerGuide(id: ArchId): MentorGuide {
  const model = MODEL_TRIGGER[id as keyof typeof MODEL_TRIGGER];
  return {
    title: `3.5 · ${ARCH_BY_ID[id].name}`,
    answer: model ?? "A metric, a number, a date and an action for this item.",
    why: `Owner that defends: ${OWNER_ACCEPT[id].map((o) => OWNERS[o].name).join(" or ")}.`,
    lookFor: ["A metric about the item's effect.", "A number and a month.", "An action the owner can take alone."],
  };
}

export function postponedGuide(): MentorGuide {
  const cost = MODEL_ARCH.reduce((s, id) => s + ARCH_BY_ID[id].cost, 0);
  return {
    title: "3.5 · What is left out, and the pickup point",
    answer: `${R2().postponed} · ${R2().pickup}`,
    steps: [
      { label: "Model funded items", calc: MODEL_ARCH.map((id) => n(ARCH_BY_ID[id].cost)).join(" + "), result: euro(cost) },
      { label: "Left", calc: `${n(R2_BUDGET)} − ${n(cost)}`, result: euro(R2_BUDGET - cost) },
      { label: "With the AI suite added", calc: `${n(cost)} + ${n(ARCH_BY_ID.suite.cost)}`, result: euro(cost + ARCH_BY_ID.suite.cost) },
    ],
    lookFor: ["The item named, with its cost.", "Why this one (budget, too slow, a black box, one more island).", "A pickup point with a number and a date."],
  };
}

export function assumptionGuide(i: number): MentorGuide {
  return {
    title: `3.6 · Assumption ${i + 1}`,
    answer: (R2().assumptions ?? [])[i] ?? "",
    lookFor: ["What is assumed about the data, the customers or the teams.", "The sign that would show it is wrong, with a number or a date."],
  };
}

export function challengeGuide(): MentorGuide {
  return {
    title: "3.6 · The board's challenge",
    answer: R2().challenge ?? "",
    why: "Integration works where it was built: repeated information fell from 45% to 20%, the guardrail. Three months and 15% to 16% are too little to judge deals. Keep the staged plan, start the chatbot on the data it can read; do not stop the AI or buy a suite that cannot run in time.",
    lookFor: ["What is checked first (did the deal rate rise where the history travels; is 15 to 16% based on enough deals).", "What is kept (the profile, the hand-over standard, the tripwire date).", "One change (for example: the chatbot starts on the contract data, the ticket interface follows)."],
    pitfalls: ["Stopping the AI tools: the joined data stays unused while the competitor moves ahead.", "Buying the suite: thirty weeks, a black box, and nothing changes within the six months."],
  };
}
