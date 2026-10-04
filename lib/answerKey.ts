import { LEVEL_LABEL, LINES } from "@/data/ladder";
import { CHURN_TRUTH, CUSTOMERS, CUST_BY_ID, KNOWN_LABEL, PICK_WHY, VALUABLE_TRUTH } from "@/data/forecast";
import { AB, AB_PARTS, MEANINGS, MEANING_TRUTH, MEASURE_TRUTH, PATTERNS, PATTERN_IDS, PMEASURES, RECORDS, RISK_LABEL, TRUTH_COUNTS, TRUTH_LEFT, UNCERTAINTIES, riskOf } from "@/data/patterns";
import { BUDGET, JOINS_LABEL, MEASURES, MODEL_COST, MODEL_MEASURES, PROBLEM_LABEL, explainBucket, modelScore } from "@/data/measures";
import {
  ACTION_LABEL,
  ARCH_BY_ID,
  ARCH_IDS,
  COMPS,
  COMP_BY_ID,
  CRIT_IDS,
  DECISIONS,
  KPIS,
  LOGIC_OWNER_LABEL,
  MODEL_COMPS,
  MODEL_DECISION,
  MODEL_GREATEST,
  OWNER_ACCEPT_LOGIC,
  PRINCIPLES,
  PRINCIPLE_IDS,
  PRINCIPLE_MUST,
  R2_BUDGET,
  SITUATIONS,
  SOURCES,
  USE_LABEL,
  actionOf,
  maxRating,
  useOf,
} from "@/data/route2";
import type { ArchId } from "@/data/route2";
import { MODEL_ARCH, MODEL_TIER, PANEL, TIER_LABEL } from "@/data/route2Panel";
import { planOf, rangeOf } from "@/lib/r2Panel";
import { MODEL_ORDER } from "@/data/mentorKey";
import { euro } from "@/lib/lang";

/**
 * Mentor-only answer keys for the exercises where the learner picks from fixed options. Each key gives the expected answer and a
 * reason per option, including why each rejected option is rejected, plus a teaching note wherever more than one answer defends.
 * Never exported and never shown to a learner. Mentor tools stay in English (CLAUDE.md #32); the option labels they quote follow the
 * site's language.
 */
export type AnswerKeyOption = { label: string; expected: boolean; why: string };
export type AnswerKeyBlock = { title: string; expected: string; options: AnswerKeyOption[]; teachingNote?: string };

const B = ["—", "Low", "Mid", "High"];

/* ------------------------------------------------------------------ Route 1 */

export function sortKey(): AnswerKeyBlock {
  return {
    title: "Block 1.1 · Transition, recognition or consistency",
    expected: LINES.map((r, i) => `${i + 1} → ${LEVEL_LABEL[r.truth]}`).join(" · "),
    options: LINES.flatMap((r, i) => [
      { label: `Idea ${i + 1} → ${LEVEL_LABEL[r.truth]}`, expected: true, why: r.why },
      ...(Object.entries(r.rejected) as [keyof typeof LEVEL_LABEL, string][]).map(([tag, why]) => ({ label: `Idea ${i + 1} → ${LEVEL_LABEL[tag]}`, expected: false, why })),
    ]),
    teachingNote:
      "Three of each. The traps are weakness 4 (a call happens, so the hand-over worked; what fails is what sales knows: recognition) and weakness 6 (the banner is the same for everyone, but the fault is that the site does not know a customer: recognition, not consistency). Ask “does anyone take over?”, then “do they know what happened before?”, then “do two channels say different things?”.",
  };
}

export function pickKey(): AnswerKeyBlock {
  return {
    title: "Block 1.3a/b · Critical transitions, where AI can build",
    expected: `Critical: ${VALUABLE_TRUTH.map((c) => CUST_BY_ID[c].name).join(", ")} · AI can build on it: ${CHURN_TRUTH.map((c) => CUST_BY_ID[c].name).join(", ")}`,
    options: CUSTOMERS.map((c) => ({
      label: `${c.name} · ${c.volume}/month · ${c.leave}% drop out · decision open: ${c.decision ? "yes" : "no"} · travels: ${KNOWN_LABEL[c.known]}`,
      expected: VALUABLE_TRUTH.includes(c.id) || CHURN_TRUTH.includes(c.id),
      why: `${VALUABLE_TRUTH.includes(c.id) ? "Critical. " : CHURN_TRUTH.includes(c.id) ? "AI can build on it. " : "Neither list. "}${PICK_WHY[c.id]}`,
    })),
    teachingNote: "The traps are the newsletter and the social media complaint (many drop out, but no buying decision is open) and the renewal talk (a decision is open, but only 12% drop out, and it belongs in list b because the ticket history travels). The chatbot → hotline transition tempts too: 22% drop out and nothing travels, but no decision is open. The check reports only how many of the four picks hold.",
  };
}

export function tagKey(): AnswerKeyBlock {
  return {
    title: "Block 2.1 · Kind of metric",
    expected: RECORDS.map((o) => `${o.code} → ${PATTERNS[o.truth].label}`).join(" · "),
    options: RECORDS.flatMap((o) => [
      { label: `${o.code} → ${PATTERNS[o.truth].label}`, expected: true, why: o.why },
      ...(Object.entries(o.rejected) as [keyof typeof PATTERNS, string][]).map(([s, why]) => ({ label: `${o.code} → ${PATTERNS[s].label}`, expected: false, why })),
    ]),
    teachingNote: `${PATTERN_IDS.map((p) => `${TRUTH_COUNTS[p]} ${PATTERNS[p].label} (${TRUTH_LEFT[p]} moved with value)`).join(", ")}. M-06 (customers who use two or more channels) is the trap: it did not move with value last year, but it is still a driver; tag what a metric measures, not how it behaved. M-05 (hours to first contact) is a driver even though it measures OmniTech's speed: it comes before the deal and sales moves it. M-10 (channels offered) is vanity: more channels without integration is the multichannel trap.`,
  };
}

export function rowKey(): AnswerKeyBlock {
  return {
    title: "Block 2.2 · Link, meaning and use per kind",
    expected: PATTERN_IDS.map((p) => `${PATTERNS[p].label}: ${RISK_LABEL[riskOf(TRUTH_LEFT[p], TRUTH_COUNTS[p])!]} · ${MEANINGS.find((m) => m.id === MEANING_TRUTH[p])!.label} · ${PMEASURES.find((m) => m.id === MEASURE_TRUTH[p])!.label}`).join(" | "),
    options: PATTERN_IDS.flatMap((p) =>
      PMEASURES.map((m) => ({
        label: `${PATTERNS[p].label} → ${m.label}`,
        expected: m.id === MEASURE_TRUTH[p],
        why:
          m.id === MEASURE_TRUTH[p]
            ? `${PATTERNS[p].means} This use fits exactly that.`
            : m.id === "bonus"
              ? "A bonus on a number rewards reporting it, not moving it, and invites gaming; it fits no kind."
              : "This use fits a different kind; read what this kind tells management.",
      })),
    ),
    teachingNote: "The link is checked against the learner's own tally from 2.1, not against the reference, so a learner who mis-tagged one metric is not punished twice. With the reference tags, outcome and driver are Strong (3 and 2 of 3 moved), guardrail Partial (1 of 3), vanity None.",
  };
}

export function uncKey(): AnswerKeyBlock {
  return {
    title: "Block 2.2 · Uncertainties in the hand-over figures",
    expected: UNCERTAINTIES.filter((w) => w.real).map((w) => w.label).join(" · "),
    options: UNCERTAINTIES.map((w) => ({ label: w.label, expected: w.real, why: w.why })),
    teachingNote: "Any two of the four real uncertainties complete the block. The most important is “sales may have looked up the history only for the most promising leads”: the hand-over figures are not a fair test, which is why Block 2.3 asks for one. The three false ones are common beliefs about omnichannel; each is contradicted in the material.",
  };
}

export function abKey(): AnswerKeyBlock {
  return {
    title: "Block 2.3 · A fair A/B test",
    expected: AB_PARTS.map((k) => `${AB[k].label}: ${AB[k].options.find((o) => o.right)!.label}`).join(" | "),
    options: AB_PARTS.flatMap((k) =>
      AB[k].options.map((o) => ({
        label: `${AB[k].label} → ${o.label}`,
        expected: o.right,
        why: o.right
          ? k === "change"
            ? "One change only, so a difference can be put down to it."
            : k === "control"
              ? "Chance decides who is in which group, and both groups live through the same weeks."
              : k === "kpi"
                ? "The problem is customers lost between channels; the test is judged by deals per hand-over, not by cards opened or calls made."
                : "The size is fixed before the start, so nobody stops at a lucky moment; a full sales cycle includes customers who need longer to decide."
          : o.clue,
      })),
    ),
    teachingNote: "The check flags a wrong option per part (three options each, so naming the part does not hand over the answer), a hypothesis without “if … because …” and a rule without a number. The hypothesis and the rule are judged: look for one change, one KPI, a reason, and a rule written before the test that includes a guardrail.",
  };
}

export function measureKey(): AnswerKeyBlock {
  const rows = [...MEASURES].sort((a, b) => modelScore(b.id) - modelScore(a.id));
  return {
    title: "Block 2.4 · The three measures",
    expected: `${MODEL_MEASURES.map((id) => MEASURES.find((m) => m.id === id)!.name).join(", ")} · ${euro(MODEL_COST)} of ${euro(BUDGET)}`,
    options: rows.map((m) => ({
      label: `${m.name} · ${explainBucket(m.evidence)} × ${m.model.effect} × ${m.model.feasibility} = ${modelScore(m.id)} · ${euro(m.cost)} · ${m.weeks} weeks · connects to ${JOINS_LABEL[m.joins]} · answers ${m.targets.length ? m.targets.map((t) => PROBLEM_LABEL[t]).join(", ") : "none"}`,
      expected: MODEL_MEASURES.includes(m.id),
      why: `${m.verdict} ${m.model.note}`,
    })),
    teachingNote: `Score = Integration × Effect × Scalability. The checks look only at the problems named (a subset of the real ones, or “none” for the app, the per-channel dashboards and the hotline) and at integration, which follows from the printed “connects to”. Effect and scalability are judged; the model values are here. The model three cost ${euro(MODEL_COST)}. The chatbot (A) and the personalised offers (C) score 12: useful AI, but each sees only one other system, so customers still meet breaks. The suite scores 6: fully connected on paper, but in use only after thirty weeks.`,
  };
}

export function orderKey(): AnswerKeyBlock {
  return {
    title: "Block 2.4 · The order",
    expected: MODEL_ORDER.map((id) => MEASURES.find((m) => m.id === id)!.name).join(" → "),
    options: MODEL_ORDER.map((id, i) => ({
      label: `${i + 1}. ${MEASURES.find((m) => m.id === id)!.name} (${modelScore(id)})`,
      expected: true,
      why: i === 0 ? "Highest score (27): it connects every channel, and every other measure, including the AI, reads from it." : i === 1 ? "Fixes the two critical transitions within four weeks, where hand-overs with the history closed twice as often." : "The AI tool that needs the joined data; it starts once the profile is filling.",
    })),
    teachingNote: "The hand-over standard and predictive analytics both score 18, so either order between them defends; the model puts the hand-over second because it works in four weeks and the prediction needs the profile's data first. A learner who puts the hand-over first defends it too: it is the fastest fix; the profile then starts in parallel.",
  };
}

/* ------------------------------------------------------------------ Route 2 */

export function principleKey(): AnswerKeyBlock {
  return {
    title: "Block 3.1 · Principles of the integrated customer system",
    expected: `${PRINCIPLES[PRINCIPLE_MUST[0]].name} and ${PRINCIPLES[PRINCIPLE_MUST[1]].name}, plus a third that is not “open as many channels as possible” or “replace every system first”`,
    options: PRINCIPLE_IDS.map((c) => ({
      label: PRINCIPLES[c].name,
      expected: PRINCIPLE_MUST.includes(c) || c === "owners" || c === "review",
      why:
        c === "defs"
          ? "Required: without one shared profile, every channel meets the customer as a stranger; this is “systems not integrated”."
          : c === "rules"
            ? "Required: hand-over standards with owners are the answer to “customer experience inconsistent”."
            : c === "owners"
              ? "A good third: a KPI without someone who can move it stays a number on a screen."
              : c === "review"
                ? "A good third: one monthly review by the same KPIs for every channel is how OmniTech catches up step by step."
                : c === "hoard"
                  ? "Rejected: more channels without integration is the multichannel trap; each new channel adds a place where the journey breaks (Materi A1)."
                  : "Rejected: nothing changes for customers until the suite runs everywhere, which takes longer than the six months; the brief asks for action under time pressure.",
    })),
    teachingNote: "The check only asks for the shared profile and the hand-over standards. The third is judged; KPI owners and the monthly review both defend.",
  };
}

export function sourceKey(): AnswerKeyBlock {
  return {
    title: "Block 3.2 · Central omnichannel processes",
    expected: SOURCES.map((s) => `${s.name}: ${USE_LABEL[useOf(s)]}`).join(" · "),
    options: SOURCES.map((s) => ({
      label: `${s.name} → ${USE_LABEL[useOf(s)]}`,
      expected: true,
      why: !s.decision ? `No customer decision happens in it, so not central, however well connected (${s.complete}%).` : s.complete >= 80 ? `The customer decides in it (“${s.decision}”) and ${s.complete}% of its data reaches the profile: integrate now.` : `The customer decides in it (“${s.decision}”), but only ${s.complete}% of its data reaches the profile: connect the data first.`,
    })),
    teachingNote: "The newsletter is the trap: 95% connected, but no decision happens in it. The renewal talk is the other: a decision to renew or cancel, so it is central, once its data reaches the profile.",
  };
}

export function compKey(): AnswerKeyBlock {
  return {
    title: "Block 3.3 · KPIs and ratings",
    expected: `${MODEL_COMPS.map((id) => COMP_BY_ID[id].name).join(", ")}; greatest leverage: ${COMP_BY_ID[MODEL_GREATEST].name}`,
    options: COMPS.map((l) => ({
      label: `${l.name}: ${CRIT_IDS.map((c) => `${c} ${B[l.model[c]]} (max ${B[maxRating(l.id, c)]})`).join(", ")}`,
      expected: MODEL_COMPS.includes(l.id),
      why: l.note,
    })),
    teachingNote: "The check flags only a rating above what the printed facts allow and counts how many chosen KPIs show a change early. The share of hand-overs that carry the history is the model's greatest lever: High on all four and the problem the brief names. A learner who picks the deal rate defends it as the result; ask which number a team can move this month.",
  };
}

export function logicKey(): AnswerKeyBlock {
  return {
    title: "Block 3.4 · AI tools tested: roll out, keep testing or stop",
    expected: SITUATIONS.map((s) => `${s.signal}: ${ACTION_LABEL[actionOf(s)]} · ${OWNER_ACCEPT_LOGIC[s.id].map((o) => LOGIC_OWNER_LABEL[o]).join(" or ")}`).join(" | "),
    options: SITUATIONS.map((s) => ({
      label: `${s.signal} (uplift ${s.lift}%, ${s.cases} conversions)`,
      expected: true,
      why:
        actionOf(s) === "intervene"
          ? `Uplift ${s.lift}% on ${s.cases} conversions: clear and proven, guardrail intact. ${s.id === "winback" ? "Account managers act on it, so sales rolls it out." : "The chatbot is a service channel, so service rolls it out."}`
          : actionOf(s) === "watch"
            ? s.lift >= 10
              ? `Uplift ${s.lift}% looks strong, but ${s.cases} conversions are too few: keep testing; the data team runs it on.`
              : `Uplift ${s.lift}%: a small difference. Keep testing a stronger variant; the data team runs it.`
            : `Uplift ${s.lift}%: no real gain${s.lift < 0 ? ", and complaints" : ""}. Stop, so no owner.`,
    })),
    teachingNote: "The renewal-risk prediction is the trap: +25% tempts learners to roll out, but forty conversions can be chance. The chatbot with a human name is the second: six hundred conversions prove there is almost no difference, so a large sample does not rescue a tiny uplift. The AI price per customer is stopped: worse, and it breaks consistency.",
  };
}

export function architectureKey(): AnswerKeyBlock {
  const spent = MODEL_ARCH.reduce((x, id) => x + ARCH_BY_ID[id].cost, 0);
  const alt = { ...MODEL_TIER, routing: "now" as const };
  const why: Record<ArchId, string> = {
    foundation: "Now. Every AI tool reads it and is measured by it; it starts in month 1, no later than the first AI tool (the test “integration comes first”). At 12 weeks it is in use in month 4.",
    chat: "Now. €25,000 for 4 weeks: a card with the history, a named person who takes over within four working hours, one price and one set of promises. It moves the share of hand-overs that carry the history, and it puts the history into the profile the predictions read, so it is the item “After data is ready” waits for.",
    personal: "Now. The chatbot reads contract data that is 81% connected (66% if the data is weaker: it then rests on data below 80%, which is why Step B asks what the learner watches). Not now is defensible too, if the learner prefers to wait for the weaker-data case.",
    routing: "After data is ready. Its data is only 60% connected; with the hand-over standard Now it starts in month 2 and is in use in month 5, inside the six months. Now is possible too, but it starts in month 1 on data below 80% and the data test opens.",
    training: "Now. €20,000 for 3 weeks so that staff open the profile before a call and take over with the history. A defensible cut if the learner needs the room, and then the reading says so.",
    tracking: "Now. €25,000 for 6 weeks: one price list and one set of promises remove the contradictory information a chatbot or a prediction would repeat. A defensible cut, and then the reading names the cost.",
    suite: "Not now. A black box: no KPI it moves, its results are not shown, €180,000 takes the plan €140,000 over the budget, and at 30 weeks it is in use only in month 9, after the six months. Two tests open (purpose, budget and months).",
    relaunch: "Not now. An app whose contact form is not connected names no KPI and adds one more channel that knows nothing about the others; it takes 16 weeks and €90,000 would push the plan €50,000 over the budget.",
  };
  return {
    title: "Step A · The architecture: when does each item happen?",
    expected: `Model: Now ${MODEL_ARCH.filter((id) => MODEL_TIER[id] === "now").map((id) => PANEL[id].short).join(", ")} · After data ${MODEL_ARCH.filter((id) => MODEL_TIER[id] === "later").map((id) => PANEL[id].short).join(", ")} (${euro(spent)} of ${euro(R2_BUDGET)}) · Not now ${ARCH_IDS.filter((id) => MODEL_TIER[id] === "not").map((id) => PANEL[id].short).join(", ")}`,
    options: ARCH_IDS.map((id) => ({ label: `${PANEL[id].short} → ${TIER_LABEL[MODEL_TIER[id]]}`, expected: MODEL_TIER[id] !== "not", why: why[id] })),
    teachingNote: `The panel shows four tests as facts, none a verdict, and the learner decides. A different, well-reasoned set is acceptable (CLAUDE.md #38): for example the predictions Now (the data test opens, ${planOf({ tier: alt }, 0).holding} of ${planOf({ tier: alt }, 0).applicable} tests hold), the training or the price list cut to make room, or going over the budget with a reason. Doing nothing (no item Now) is incomplete, not wrong: the missing list asks for at least one. The model set holds all four tests in the brief's data and opens the data test when the data is 15 points weaker (the chatbot, ${rangeOf({ tier: MODEL_TIER }).risk[1]}% of the money at risk).`,
  };
}

export function decisionKey(): AnswerKeyBlock {
  return {
    title: "Step B · The investment decision",
    expected: DECISIONS.find((d) => d.id === MODEL_DECISION)!.label,
    options: DECISIONS.map((d) => ({ label: d.label, expected: d.id !== "wait", why: d.id === MODEL_DECISION ? d.why : d.id === "commit" ? `${d.why} ${d.rejected}` : d.rejected })),
    teachingNote: "“Buy the suite” and “Invest in stages” are both decisions, with different reasoning; the plan rejects only “Wait”, because the brief asks for an investment decision despite unclear prospects: the hand-overs can be fixed within weeks, and every break in the journey stays meanwhile. All three stay selectable. The panel shows one plain hint when the decision and Step A disagree (wait while Step A builds; buy the suite while Step A leaves it out) and the learner explains the contradiction in their reason. Push a learner who buys the suite on how a 30-week platform fits into six months, and on who at OmniTech could explain its decisions.",
  };
}
