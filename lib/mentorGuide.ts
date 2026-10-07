import { BUDGET, JOINS_LABEL, MEASURE_BY_ID, MODEL_COST, MODEL_MEASURES, PROBLEM_LABEL, explainBucket, modelScore } from "@/data/measures";
import type { MeasureId } from "@/data/measures";
import { KEY_L1, KEY_R2 } from "@/data/mentorKey";
import { ARCH_BY_ID, ARCH_IDS, COMP_BY_ID, MODEL_GREATEST, PRINCIPLES, R2_BUDGET, R2_MONTHS } from "@/data/route2";
import type { PrincipleId } from "@/data/route2";
import { MODEL_TIER, PANEL, READY_BAR } from "@/data/route2Panel";
import type { Tier } from "@/data/route2Panel";
import { euro, tt } from "@/lib/lang";
import { inUseOf, monthsOf, planOf, rangeOf } from "@/lib/r2Panel";

/**
 * Mentor-only worked answers for every task question the answer keys (lib/answerKey.ts) do not already cover: the numeric fields,
 * with every step of the calculation written out with its numbers, and the free-text answers, with the model text and what a good
 * answer must contain. Shown only after the mentor bar is unlocked, never exported. Numbers are computed from the same constants as
 * the tables, the calculators and the answer checks, so they cannot drift from the model answers. Mentor tools stay English
 * (CLAUDE.md #32); the model answers quoted follow the site's language, because the fill enters them in that language.
 */
export type WorkedStep = { label: string; calc: string; result: string };
export type MentorGuide = { title: string; answer: string; example?: string; steps?: WorkedStep[]; why?: string; lookFor?: string[]; pitfalls?: string[] };

const n = (v: number) => (Math.round(v * 100) / 100).toLocaleString("en-US");
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

export function meaningGuide(): MentorGuide {
  return {
    title: "1.2 · What a seamless hand-over means",
    answer: L1().meaning ?? "",
    lookFor: ["At least one printed figure (15%, 30%, twice as often, or the 108 and 72 deals).", "What to change first: make the configurator's entries travel to sales, then test it fairly.", "Said as an estimate: sales may have looked up the history only for the best leads."],
    pitfalls: ["A sentence with no figure: the app asks for one.", "“The history doubles our deals”: the two groups may differ in other ways, so it is a hint, not proof."],
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
    title: "2.1 · Your three KPIs",
    answer: L1().misread ?? "",
    example: tt("Company A (a software reseller) steers its hand-overs by three KPIs. Deal rate of customers who move from the shop to sales, from the CRM, aim: up. It is the result the hand-over is paid for, so it is the outcome. Share of hand-overs in which sales sees the shop history, from the CRM, aim: up. Customers feel a hand-over that does not carry what they did, and the teams can move it this month, so it is the driver. Customers who have to repeat their data, from a question in service calls, aim: stay under a limit. If it rises we stop, so it is the guardrail. Choose yours from OmniTech's twelve metrics.", "Unternehmen A (ein Software-Reseller) steuert seine Übergaben mit drei KPIs. Abschlussquote der Kunden, die vom Shop zum Vertrieb wechseln, aus dem CRM, Ziel: hoch. Es ist das Ergebnis, für das die Übergabe bezahlt wird, also der Outcome. Anteil der Übergaben, bei denen der Vertrieb die Shop-Historie sieht, aus dem CRM, Ziel: hoch. Kunden spüren eine Übergabe, die nicht mitnimmt, was sie getan haben, und die Teams können es in diesem Monat bewegen, also der Treiber. Kunden, die ihre Daten wiederholen müssen, aus einer Frage in Servicegesprächen, Ziel: unter einer Grenze bleiben. Steigt er, stoppen wir, also die Guardrail. Wählen Sie Ihre aus den zwölf Kennzahlen von OmniTech."),
    lookFor: ["At least one outcome KPI (cross-channel deal rate, revenue per customer, renewals).", "At least one driver KPI (hand-overs that carry the history, hours to first contact).", "For each: where the number comes from and a target; a guardrail (customers who repeat themselves) as the third is a strong answer."],
    pitfalls: ["Channels offered, app downloads or bot conversations as a KPI: vanity metrics, they count OmniTech's activity.", "A separate KPI per channel: the breaks between channels stay invisible."],
  };
}

export function abGuide(): MentorGuide {
  const k = L1().ab;
  return {
    title: "2.3 · Hypothesis and decision rule",
    answer: k ? `${k.hyp} · ${k.rule}` : "",
    example: tt("Company A tests a hand-over note. Hypothesis: if every customer who moves from the shop to sales arrives with a one-page note of what they configured instead of an empty file, then the deal rate rises, because sales can pick up the conversation where the customer left it. Rule, written before the start: roll out if the rate is at least 8% above the control group with 80 deals per group and complaints stay under 2%; keep testing between 3% and 8%; stop below 3%. Write yours for OmniTech's test card.", "Unternehmen A testet eine Übergabenotiz. Hypothese: Wenn jeder Kunde, der vom Shop zum Vertrieb wechselt, mit einer einseitigen Notiz dessen ankommt, was er konfiguriert hat, statt mit einer leeren Akte, dann steigt die Abschlussquote, weil der Vertrieb das Gespräch dort aufnehmen kann, wo der Kunde es verließ. Regel, vor dem Start geschrieben: ausrollen, wenn die Quote bei 80 Abschlüssen pro Gruppe mindestens 8 % über der Kontrollgruppe liegt und die Beschwerden unter 2 % bleiben; weiter testen zwischen 3 % und 8 %; stoppen unter 3 %. Schreiben Sie Ihre für die Testkarte von OmniTech."),
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
      { label: "Price from its parts (printed on the card)", calc: m.costParts.map((c) => n(c.amount)).join(" + "), result: euro(m.cost) },
      { label: "Integration from what it connects to (A7)", calc: `connects to ${JOINS_LABEL[m.joins]} → all channels and the CRM: 3 · one other system: 2 · nothing: 1`, result: String(e) },
      { label: "Score = Integration × Effect × Scalability", calc: `${e} × ${m.model.effect} × ${m.model.feasibility}`, result: String(modelScore(id)) },
    ],
    why: `${m.model.note} Answers: ${m.targets.length ? m.targets.map((t) => PROBLEM_LABEL[t]).join(", ") : "none of the three problems"}. A different, well-reasoned effect or scalability score is acceptable: only the score that follows a printed rule is checked.`,
    pitfalls:
      id === "chatbot"
        ? ["Integration 3 “because it is AI”: it is printed to connect to one other system only: 2."]
        : id === "suite"
          ? ["Effect 3 “because it replaces everything”: it is in use only after 30 weeks, beyond the six months, so it cannot work in time: effect 1; the picture shows no bar of working time.", `Adding it to the profile and the hand-over standard: ${euro(m.cost + MEASURE_BY_ID.unified.cost + MEASURE_BY_ID.handover.cost)}, over the ${euro(BUDGET)} budget.`]
          : id === "app"
            ? ["Counting the app as an answer to “channels work in isolation”: a stand-alone app is one more isolated channel, and the picture leaves that problem open."]
            : undefined,
  };
}

/** The reason a learner gives for a measure's two judged scores (CLAUDE.md #45). The mentor's answer is the measure's own model note. */
export function reasonGuide(id: MeasureId): MentorGuide {
  const m = MEASURE_BY_ID[id];
  return {
    title: `2.4 · Why ${m.name} gets its effect and scalability scores`,
    answer: `Effect ${m.model.effect}, scalability ${m.model.feasibility}: ${m.model.note}`,
    example: tt("Company A's “one customer file across all channels”: effect 3, because every channel then sees the same customer and the repeating stops; scalability 2, because it takes twelve weeks and only the IT team can build it. Give your own reason for each score, with a fact printed on the card.", "Die „eine Kundenakte über alle Kanäle“ von Unternehmen A: Wirkung 3, weil dann jeder Kanal denselben Kunden sieht und das Wiederholen aufhört; Skalierbarkeit 2, weil sie zwölf Wochen braucht und nur das IT-Team sie bauen kann. Geben Sie für jeden Wert Ihren eigenen Grund an, mit einer auf der Karte gedruckten Tatsache."),
    why: "Effect and scalability are judgements; a different score with a clear reason is as good as the model. The reason should name what changes for the customer or visitor (effect) and whether the measure reaches everyone within the time (scalability).",
    lookFor: ["Effect: what the customer or visitor sees or does differently because of the measure.", "Scalability: whether it works for everyone without more people, and how long it takes (the weeks printed on the card).", "A fact from the card, not only “it is good”."],
  };
}

export function whyGuide(): MentorGuide {
  return {
    title: "2.4 · Why the first priority goes first",
    answer: L1().why ?? "",
    example: tt("Company A puts the shared customer file first: it scores 18 and it removes the cause of the breaks customers feel. The hand-over note comes second and starts alongside it, because it works within weeks. Together they cost €45,000 of the €90,000. The new app stays out: it connects to nothing and scores 4. Make the same three statements about your own measures.", "Unternehmen A setzt die gemeinsame Kundenakte an die erste Stelle: Sie erzielt 18 und beseitigt die Ursache der Brüche, die Kunden spüren. Die Übergabenotiz kommt zweite und startet gleichzeitig, weil sie innerhalb von Wochen wirkt. Zusammen kosten sie 45.000 € von 90.000 €. Die neue App bleibt draußen: Sie ist mit nichts verbunden und erzielt 4. Machen Sie dieselben drei Aussagen über Ihre eigenen Maßnahmen."),
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
    example: tt("Company A picks “deals that start from a hand-over with the history” as its greatest-leverage KPI: it is linked to revenue and counted daily for every customer by the systems, so every change can be judged within weeks, and it answers the problem that customers repeat themselves. Name your own KPI, the tests it passes best and the problem of the brief it answers.", "Unternehmen A wählt „Abschlüsse, die aus einer Übergabe mit Historie entstehen“ als KPI mit der größten Hebelwirkung: Er ist mit dem Umsatz verbunden und wird täglich für jeden Kunden von den Systemen gezählt, sodass sich jede Änderung innerhalb von Wochen beurteilen lässt, und er beantwortet das Problem, dass Kunden sich wiederholen. Nennen Sie Ihren eigenen KPI, die Tests, die er am besten besteht, und das Problem des Auftrags, das er beantwortet."),
    lookFor: ["One of the learner's three KPIs.", "The tests that decide it (early and linked to value together).", "The problem of the brief it answers (systems not integrated)."],
    pitfalls: ["Channels offered as greatest “because it is counted daily and complete”: it is not linked to value."],
  };
}

const ids = (m: Record<string, Tier>, f: (t: Tier) => boolean) => ARCH_IDS.filter((id) => f(m[id] ?? "not"));

export function architectureGuide(): MentorGuide {
  const model = MODEL_TIER;
  const funded = ids(model, (t) => t !== "not");
  const mr2 = { tier: model };
  const plan = planOf(mr2, 0);
  const weak = planOf(mr2, 1);
  const r = rangeOf(mr2);
  const cost = funded.reduce((x, id) => x + ARCH_BY_ID[id].cost, 0);
  const meas = (p: typeof plan) => funded.filter((id) => PANEL[id].measured && p.items[id].measOk && p.items[id].dataOk && !p.items[id].late && !PANEL[id].blackBox);
  const sum = (list: (keyof typeof ARCH_BY_ID)[]) => list.reduce((x, id) => x + ARCH_BY_ID[id].cost, 0);
  const measuredIds = meas(plan);
  const measuredWeakIds = meas(weak);
  const riskWeak = funded.filter((id) => PANEL[id].blackBox || !weak.items[id].dataOk || weak.items[id].late);
  const plus = (list: string[]) => list.join(" + ");
  const sp = planOf({ tier: { ...model, suite: "now" as const } }, 0);
  const rl = planOf({ tier: { ...model, relaunch: "now" as const } }, 0);
  const pn = planOf({ tier: { ...model, routing: "now" as const } }, 0);
  return {
    title: "Step A · The architecture and what the panel shows for it",
    answer: `Now: ${ids(model, (t) => t === "now").map((id) => PANEL[id].short).join(", ")}. After data is ready: ${ids(model, (t) => t === "later").map((id) => PANEL[id].short).join(", ")}. Not now: ${ids(model, (t) => t === "not").map((id) => PANEL[id].short).join(", ")}.`,
    steps: [
      { label: "Funded items (every Now and After data item)", calc: plus(funded.map((id) => n(ARCH_BY_ID[id].cost))), result: euro(cost) },
      { label: "Budget left", calc: `${n(R2_BUDGET)} − ${n(cost)}`, result: euro(R2_BUDGET - cost) },
      { label: `Month in use = start + weeks ÷ 4, rounded up (Now starts in month 1; After data starts when the hand-over standard is in use, month ${1 + monthsOf("chat")})`, calc: funded.map((id) => `${PANEL[id].short}: ${plan.items[id].start} + ${ARCH_BY_ID[id].weeks} ÷ 4 → ${inUseOf(mr2, id)}`).join(" · "), result: `all by month ${Math.max(...funded.map((id) => inUseOf(mr2, id)!))} of ${R2_MONTHS}` },
      { label: "Measurable, brief's data: money on measured items with data connected and in use in time ÷ funded money", calc: `(${plus(measuredIds.map((id) => n(ARCH_BY_ID[id].cost)))}) ÷ ${n(cost)} = ${n(sum(measuredIds))} ÷ ${n(cost)}`, result: `${r.meas[0]}%` },
      { label: `Measurable, data 15 points weaker (the chatbot drops to ${(PANEL.personal.data ?? 0) - 15}%)`, calc: `${n(sum(measuredWeakIds))} ÷ ${n(cost)}`, result: `${r.meas[1]}%` },
      { label: "Risk: money on a black box, on data below 80% connected or in use after the months ÷ funded money", calc: `0 ÷ ${n(cost)} (brief) · ${n(sum(riskWeak))} ÷ ${n(cost)} (weaker)`, result: `${r.risk[0]}% · ${r.risk[1]}%` },
    ],
    why: `The model set holds all four tests with the brief's data (${plan.holding} of ${plan.applicable}) and opens the data test when the data is 15 points weaker (${weak.holding} of ${weak.applicable}). That open test is the reason Step B asks what the learner watches. The numbers on screen are computed from one data file, so this table equals the panel.`,
    lookFor: ["At least one item Now (the task asks for an architecture).", "The shared profile and KPI system are in place no later than any AI tool.", "Nothing the learner cannot explain or measure is funded without a reason, and nothing arrives after the six months without one."],
    pitfalls: [
      `Adding the all-in-one suite: ${euro(sp.bars.spent)} funded, ${euro(sp.bars.over)} over the budget, Risk ${sp.bars.risk}% (a black box, in use only in month ${sp.items.suite.inUse}), and ${sp.holding} of ${sp.applicable} tests hold.`,
      `Adding the new app: ${euro(rl.bars.spent)} funded, ${euro(rl.bars.over)} over the budget; it names no KPI and its contact form is not connected, so ${rl.holding} of ${rl.applicable} tests hold.`,
      `Setting the predictive analytics to Now beside the model set: it starts in month 1 on data ${PANEL.routing.data}% connected, below ${READY_BAR}%, so the data test opens (${pn.holding} of ${pn.applicable} hold); After data with the hand-over standard Now starts it in month ${1 + monthsOf("chat")}.`,
      "Leaving the shared profile out: every AI tool loses its link to the profile and the KPIs, so the Measurable bar falls to nothing.",
    ],
  };
}

export function visionGuide(): MentorGuide {
  return {
    title: "Step A · The target vision",
    answer: R2().vision ?? "",
    example: tt(
      "Company A will give every customer one continuous experience: every channel reads the same customer profile and every switch carries what was said before, and it steers by two KPIs across channels. Every new tool has to move one of them before it grows. Write your own target vision for OmniTech.",
      "Unternehmen A wird jedem Kunden ein durchgehendes Erlebnis geben: Jeder Kanal liest dasselbe Kundenprofil und jeder Wechsel nimmt mit, was vorher gesagt wurde, und es steuert über zwei kanalübergreifende KPIs. Jedes neue Werkzeug muss einen davon bewegen, bevor es wächst. Schreiben Sie Ihr eigenes Zielbild für OmniTech.",
    ),
    why: "The plan asks for a target vision of an integrated customer system. It is the one place the learner says, in two sentences, what the whole architecture is for, before the items.",
    lookFor: ["What the system does for the company and its customers (one customer, the history travels).", "Steering by a few cross-channel KPIs, not by single tools.", "Two sentences, in the learner's own words."],
  };
}

export function giveUpGuide(): MentorGuide {
  return {
    title: "Step A · What the plan gives, and what the learner gives up",
    answer: R2().giveUp ?? "",
    example: tt(
      "Company A's plan gives it one shared profile, a hand-over card that makes the history travel and a chatbot that runs on data that is connected well enough. It gives up a new app, which names no KPI, and €30,000 stay unspent. If its data is worse than expected, the chatbot rests on data below 80%, so it is watched first. Write yours about your own plan: what it gives, what it costs or leaves open.",
      "Der Plan von Unternehmen A gibt ihm ein gemeinsames Profil, eine Übergabekarte, die die Historie mitreisen lässt, und einen Chatbot, der auf gut genug verbundenen Daten läuft. Es verzichtet auf eine neue App, die keinen KPI nennt, und 30.000 € bleiben ungenutzt. Sind seine Daten schlechter als erwartet, beruht der Chatbot auf Daten unter 80 %, also wird er zuerst beobachtet. Schreiben Sie Ihre über Ihren eigenen Plan: was er gibt, was er kostet oder offen lässt.",
    ),
    why: "Every plan gives something and costs something. Writing it first, before the system's reading is opened, is what makes the learner think about the trade-off instead of reading it off.",
    lookFor: ["One thing the plan gives (measured, connected, in budget, in time).", "One thing it costs or leaves open (an item not now, data below 80%, an item after the six months, budget unspent).", "A link to the two data scenarios if the learner saw them."],
  };
}

export function decisionWhyGuide(): MentorGuide {
  return {
    title: "Step B · Why this decision",
    answer: R2().decisionWhy ?? "",
    example: tt(
      "Company A invests now but builds in stages: the shared profile and the hand-over card start first, so every tool reads one customer and is measured from its first week, and the big suite waits because nobody could say what it changes for customers. Write your reason for your own decision.",
      "Unternehmen A investiert jetzt, baut aber in Stufen: Gemeinsames Profil und Übergabekarte starten zuerst, damit jedes Werkzeug einen Kunden liest und ab seiner ersten Woche gemessen wird, und die große Suite wartet, weil niemand sagen könnte, was sie für Kunden ändert. Schreiben Sie Ihre Begründung für Ihre eigene Entscheidung.",
    ),
    why: "A decision part has no single right answer (CLAUDE.md #38): what counts is a clear reason, and that it fits the learner's own Step A. If the decision and Step A disagree, the panel hints and the reason should explain it.",
    lookFor: ["Names the decision and one rule from Materi B5 it rests on.", "Fits the learner's own Step A, or says why it does not.", "Says how the unclear prospects are handled (invest where the breaks cost most and the data is connected, measure from week one)."],
  };
}

export function watchGuide(): MentorGuide {
  const handMonth = inUseOf({ tier: MODEL_TIER }, "chat") ?? 0;
  return {
    title: "Step B · What the learner watches, and when they would stop",
    answer: R2().watch ?? "",
    example: tt(
      "Company A watches the share of customers who repeat their information: today it is 40%, and if it is not clearly below that by month 3 on enough hand-overs, it stops adding AI tools and rewrites its hand-over card. It also watches the data behind its chatbot: if it stays below 80% connected, it pauses the chatbot. Write yours with the figure from your own plan.",
      "Unternehmen A beobachtet den Anteil der Kunden, die ihre Angaben wiederholen: Heute liegt er bei 40 %, und liegt er bis Monat 3 bei genug Übergaben nicht deutlich darunter, hört es auf, KI-Werkzeuge hinzuzufügen, und schreibt seine Übergabekarte neu. Es beobachtet auch die Daten hinter seinem Chatbot: Bleiben sie unter 80 % verbunden, pausiert es den Chatbot. Schreiben Sie Ihre mit der Zahl aus Ihrem eigenen Plan.",
    ),
    why: `A figure about customers (the share who repeat their information or the cross-channel deal rate), not the company's own speed or output (hours to first contact, channels, downloads), a month in which it can first be read (the hand-over card is in use from month ${handMonth} in the model, so month ${handMonth + 1}), and an action. The numbers are the ones printed in “the numbers today”: 45% repeat their information today with an aim of 15%; the data bar is ${READY_BAR}%.`,
    lookFor: ["A customer figure, with today's value.", "A month by which it can be read.", "What the learner does if it falls short (stop, pause, change one thing)."],
    pitfalls: ["Hours to first contact, channels or downloads as the figure: that counts the company's own speed or output.", "No month: a sign nobody can act on."],
  };
}
