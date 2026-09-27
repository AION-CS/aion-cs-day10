import { bi, t } from "@/lib/lang";

/**
 * Task 1 · Block 1.2, and the worked example of Materi A4: what a seamless hand-over is worth. OmniTech's journeys last year that started
 * online and switched to sales, split by whether sales saw the customer's online history (Case assumption). The method is
 *
 *   deal rate                    = deals ÷ hand-overs × 100
 *   lift (how many times)        = deal rate with the history ÷ deal rate without it
 *   extra revenue a year         = channel-switching journeys a year × (rate with − rate without, as a share of one) × average deal value
 *
 * (Identifiers keep the names of the file this was built from: `control` = hand-overs without the history, `variant` = with it,
 * `sent` = hand-overs, `orders` = deals, `order` = average deal value.) Results are rounded to two decimals.
 */
export const PILOT = {
  control: { sent: 720, orders: 108 },
  variant: { sent: 240, orders: 72 },
  yearly: 2000,
  order: 1200,
};

const r2 = (x: number) => Math.round(x * 100) / 100;
export const rateOf = (orders: number, sent: number) => r2((orders / sent) * 100);
export const liftOf = (a: number, b: number) => r2(a / b);
export const extraOf = (yearly: number, variantRate: number, controlRate: number, order: number) => r2(yearly * ((variantRate - controlRate) / 100) * order);

export const FORECAST = {
  f1: rateOf(PILOT.variant.orders, PILOT.variant.sent),
  controlRate: rateOf(PILOT.control.orders, PILOT.control.sent),
  get f2() {
    return liftOf(this.f1, this.controlRate);
  },
  get f3() {
    return extraOf(PILOT.yearly, this.f1, this.controlRate, PILOT.order);
  },
};

export type FigureId = "F1" | "F2" | "F3";
export const FIGURE_IDS: FigureId[] = ["F1", "F2", "F3"];

export const FIGURES = bi({
  F1: {
    id: "F1" as FigureId,
    label: t("F1 · Deal rate when sales saw the online history, %", "F1 · Abschlussquote, wenn der Vertrieb die Online-Historie sah, %"),
    question: t("Of the hand-overs in which sales saw what the customer had done online, what share became a deal?", "Welcher Anteil der Übergaben, bei denen der Vertrieb sah, was der Kunde online getan hatte, wurde zu einem Abschluss?"),
    unit: "%",
    example: "12.5",
    answer: FORECAST.f1,
    formula: t("Deal rate = deals ÷ hand-overs × 100. Use the two rows of the hand-overs where sales saw the online history.", "Abschlussquote = Abschlüsse ÷ Übergaben × 100. Nutzen Sie die zwei Zeilen der Übergaben, bei denen der Vertrieb die Online-Historie sah."),
    taughtIn: "A4" as const,
    clue: t("Did you divide the deals by the hand-overs of the same group, and multiply by 100?", "Haben Sie die Abschlüsse durch die Übergaben derselben Gruppe geteilt und mit 100 multipliziert?"),
    sources: [
      { label: t("Last year · sales saw the online history · hand-overs", "Letztes Jahr · Vertrieb sah die Online-Historie · Übergaben"), value: "240", target: "fc-var-sent" },
      { label: t("Last year · sales saw the online history · deals", "Letztes Jahr · Vertrieb sah die Online-Historie · Abschlüsse"), value: "72", target: "fc-var-orders" },
    ],
  },
  F2: {
    id: "F2" as FigureId,
    label: t("F2 · Lift: how many times the rate without the history", "F2 · Lift: wie viel Mal die Quote ohne Historie"),
    question: t("How many times higher is the deal rate when sales saw the online history than when sales started from zero?", "Wie viel Mal höher ist die Abschlussquote, wenn der Vertrieb die Online-Historie sah, als wenn er bei null anfing?"),
    unit: "×",
    example: "1.5",
    answer: FORECAST.f2,
    formula: t("Lift = deal rate with the history ÷ deal rate without it. Work out the rate without the history from its rows first.", "Lift = Abschlussquote mit Historie ÷ Abschlussquote ohne Historie. Berechnen Sie die Quote ohne Historie zuerst aus ihren Zeilen."),
    taughtIn: "A4" as const,
    clue: t("You need two rates from two pairs of rows. Is the second one worked out from the rows without the history, the same way as F1?", "Sie brauchen zwei Quoten aus zwei Zeilenpaaren. Ist die zweite aus den Zeilen ohne Historie berechnet, genauso wie F1?"),
    sources: [
      { label: t("Your F1 (deal rate with the history)", "Ihr F1 (Abschlussquote mit Historie)"), value: "F1", target: "fig-F1" },
      { label: t("Last year · sales started from zero · hand-overs", "Letztes Jahr · Vertrieb fing bei null an · Übergaben"), value: "720", target: "fc-ctl-sent" },
      { label: t("Last year · sales started from zero · deals", "Letztes Jahr · Vertrieb fing bei null an · Abschlüsse"), value: "108", target: "fc-ctl-orders" },
    ],
  },
  F3: {
    id: "F3" as FigureId,
    label: t("F3 · Extra revenue a year, €", "F3 · Zusätzlicher Umsatz pro Jahr, €"),
    question: t("If sales saw the online history in every channel-switching journey next year and customers behaved as last year, how much extra revenue would it bring in a year?", "Wenn der Vertrieb im nächsten Jahr bei jeder kanalwechselnden Journey die Online-Historie sähe und Kunden sich wie im letzten Jahr verhielten: Wie viel zusätzlichen Umsatz brächte das in einem Jahr?"),
    unit: "€",
    example: "12500",
    answer: FORECAST.f3,
    formula: t("Extra revenue = channel-switching journeys a year × (deal rate with the history − deal rate without it, as a share of one) × average deal value.", "Zusätzlicher Umsatz = kanalwechselnde Journeys pro Jahr × (Abschlussquote mit Historie − Abschlussquote ohne, als Anteil von eins) × durchschnittlicher Auftragswert."),
    taughtIn: "A4" as const,
    clue: t("Only the difference between the two rates is extra, and it has to be a share of one (1 point = 0.01) before you multiply.", "Nur der Unterschied zwischen den beiden Quoten ist zusätzlich, und er muss ein Anteil von eins sein (1 Punkt = 0,01), bevor Sie multiplizieren."),
    sources: [
      { label: t("Next year · channel-switching journeys a year", "Nächstes Jahr · kanalwechselnde Journeys pro Jahr"), value: "2,000", target: "fc-yearly" },
      { label: t("Your F1 (deal rate with the history)", "Ihr F1 (Abschlussquote mit Historie)"), value: "F1", target: "fig-F1" },
      { label: t("Last year · sales started from zero · hand-overs and deals (its rate)", "Letztes Jahr · Vertrieb fing bei null an · Übergaben und Abschlüsse (ihre Quote)"), value: "108 ÷ 720", target: "fc-ctl-orders" },
      { label: t("All deals · average deal value", "Alle Aufträge · durchschnittlicher Auftragswert"), value: t("€1,200", "1.200 €"), target: "fc-order" },
    ],
  },
});

/** The worked example of Materi A4: a different provider (Weser Systemhaus), the same method on other numbers. Case assumption. */
export const MOSEL = { control: { sent: 400, orders: 40 }, variant: { sent: 200, orders: 50 }, yearly: 800, order: 1000 };
export const MOSEL_RESULT = (() => {
  const rate = rateOf(MOSEL.variant.orders, MOSEL.variant.sent);
  const other = rateOf(MOSEL.control.orders, MOSEL.control.sent);
  return { rate, other, lift: liftOf(rate, other), extra: extraOf(MOSEL.yearly, rate, other, MOSEL.order) };
})();

/* ------------------------------------------------------------------ Block 1.3a · eight transitions between channels */

/**
 * Eight transitions between OmniTech's channels. (The type keeps the name "customer" of the file it was built from: `volume` = journeys
 * a month through the transition, `leave` = share of customers who drop out there, `decision` = a buying or renewal decision is open at
 * that point, `known` = what travels with the customer.) The rule of Materi A3: a transition is critical where a decision is open and
 * 25% or more drop out; AI support (a chatbot that knows the case, a prediction, a personalised offer) can build only where the history
 * already travels (part of it or all of it).
 */
export type CustId = "c1" | "c2" | "c3" | "c4" | "c5" | "c6" | "c7" | "c8";
export type Known = "none" | "campaign" | "customer";
export type Customer = { id: CustId; name: string; volume: number; leave: number; decision: boolean; known: Known };
export const KNOWN_LABEL = bi({ none: t("Nothing: the next channel starts from zero", "Nichts: Der nächste Kanal fängt bei null an"), campaign: t("Part of it: the ticket history, not the contract", "Ein Teil: die Ticket-Historie, nicht der Vertrag"), customer: t("All of it: every contact and the contract", "Alles: jeder Kontakt und der Vertrag") });
export const DECISION_LABEL = bi({ yes: t("Yes", "Ja"), no: t("No", "Nein") });
export const LEAVE_MIN = 25;
export const CUSTOMERS: Customer[] = bi([
  { id: "c1" as CustId, name: t("Online configurator → sales call", "Online-Konfigurator → Vertriebsanruf"), volume: 900, leave: 34, decision: true, known: "none" as Known },
  { id: "c2" as CustId, name: t("Offer by e-mail → question in the chat", "Angebot per E-Mail → Frage im Chat"), volume: 400, leave: 28, decision: true, known: "none" as Known },
  { id: "c3" as CustId, name: t("Newsletter → website", "Newsletter → Website"), volume: 5000, leave: 60, decision: false, known: "none" as Known },
  { id: "c4" as CustId, name: t("Signed contract → onboarding by support", "Unterschriebener Vertrag → Onboarding durch den Support"), volume: 120, leave: 8, decision: false, known: "customer" as Known },
  { id: "c5" as CustId, name: t("Support tickets → renewal talk with the account manager", "Support-Tickets → Verlängerungsgespräch mit dem Account Manager"), volume: 150, leave: 12, decision: true, known: "campaign" as Known },
  { id: "c6" as CustId, name: t("Chatbot → service hotline", "Chatbot → Service-Hotline"), volume: 700, leave: 22, decision: false, known: "none" as Known },
  { id: "c7" as CustId, name: t("Online order → confirmation e-mail", "Online-Bestellung → Bestätigungs-E-Mail"), volume: 800, leave: 3, decision: false, known: "none" as Known },
  { id: "c8" as CustId, name: t("Complaint on social media → support", "Beschwerde in Social Media → Support"), volume: 80, leave: 40, decision: false, known: "none" as Known },
]);
export const CUST_BY_ID = Object.fromEntries(CUSTOMERS.map((c) => [c.id, c])) as Record<CustId, Customer>;
export const PICK = 2;
export const AUTO_MIN_VOLUME = LEAVE_MIN;
/** Critical: a decision is open and 25% or more drop out (Materi A3). */
export const VALUABLE_TRUTH: CustId[] = ["c1", "c2"];
/** AI can build on it: the history already travels, in part or in full (Materi A3). */
export const CHURN_TRUTH: CustId[] = ["c4", "c5"];
export const PICK_WHY = bi({
  c1: t("A buying decision is open and 34% drop out when the configurator hands over to sales: the most critical transition.", "Eine Kaufentscheidung ist offen, und 34 % springen ab, wenn der Konfigurator an den Vertrieb übergibt: der kritischste Übergang."),
  c2: t("The customer is deciding on the offer and 28% drop out when they ask in the chat and the chat knows nothing about the offer: critical.", "Der Kunde entscheidet über das Angebot, und 28 % springen ab, wenn er im Chat fragt und der Chat nichts über das Angebot weiß: kritisch."),
  c3: t("Many leave, but nobody decides anything on the way from a newsletter to the website; it is not the first transition to fix.", "Viele gehen, aber auf dem Weg vom Newsletter zur Website entscheidet niemand etwas; es ist nicht der erste Übergang, den man behebt."),
  c4: t("The full history travels with the contract: support knows the customer, so AI (an onboarding plan, a prediction of who struggles) has something to build on.", "Die ganze Historie reist mit dem Vertrag: Der Support kennt den Kunden, also hat KI (ein Onboarding-Plan, eine Vorhersage, wer Probleme hat) eine Grundlage."),
  c5: t("The ticket history reaches the account manager: a prediction of renewal risk or a personalised renewal offer can build on it. Only 12% drop out, so it is not the most critical break.", "Die Ticket-Historie erreicht den Account Manager: Eine Vorhersage des Verlängerungsrisikos oder ein personalisiertes Verlängerungsangebot kann darauf aufbauen. Nur 12 % springen ab, also ist es nicht der kritischste Bruch."),
  c6: t("22% drop out and nothing travels, but no decision is open: fix it, but after the two buying transitions.", "22 % springen ab, und nichts reist mit, aber keine Entscheidung ist offen: beheben, aber nach den zwei Kaufübergängen."),
  c7: t("Almost nobody drops out after an order is placed; the transition works.", "Nach einer Bestellung springt fast niemand ab; der Übergang funktioniert."),
  c8: t("40% drop out and it hurts, but few journeys and no buying decision: important for service, not the first omnichannel fix.", "40 % springen ab, und es schmerzt, aber wenige Journeys und keine Kaufentscheidung: wichtig für den Service, nicht die erste Omnichannel-Korrektur."),
});

/* ------------------------------------------------------------------ Block 1.3b · three concrete improvements */

/** The three principles from Block 1.1; each improvement serves a different one. (The type keeps its earlier name, "basis".) */
export type Basis = "respond" | "personal" | "learn";
export const BASES = bi([
  { id: "respond" as Basis, label: t("Seamless transition", "Nahtloser Übergang"), short: t("Transition", "Übergang") },
  { id: "personal" as Basis, label: t("Recognition", "Wiedererkennung"), short: t("Recognition", "Wiedererkennung") },
  { id: "learn" as Basis, label: t("Consistency", "Konsistenz"), short: t("Consistency", "Konsistenz") },
]);
export const BASIS_LABEL = bi({ respond: t("Seamless transition", "Nahtloser Übergang"), personal: t("Recognition", "Wiedererkennung"), learn: t("Consistency", "Konsistenz") });
export const INSIGHT_COUNT = 3;
export const INSIGHT_MIN = 45;
export const INSIGHT_FRAME = bi({ v: t("[What we change] at [which transition], so [what the customer gains].", "[Was wir ändern] an [welchem Übergang], sodass [was der Kunde gewinnt].") });
/** True when the sentence says what the change gives. A floor, not a judge of quality; English and German forms. */
export const hasSoWhat = (s: string) => /\b(so|therefore|which means|because|means|so that|thus|hence|daher|deshalb|weil|das heißt|bedeutet|sodass|damit|also)\b/i.test(s);
