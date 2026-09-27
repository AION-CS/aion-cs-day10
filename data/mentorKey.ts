import { LINES } from "@/data/ladder";
import type { LevelTag, LineId } from "@/data/ladder";
import { CHURN_TRUTH, FORECAST, PILOT, VALUABLE_TRUTH } from "@/data/forecast";
import type { Basis } from "@/data/forecast";
import { AB_MODEL, MEANING_TRUTH, MEASURE_TRUTH, PATTERN_IDS, RECORDS, TRUTH_COUNTS, TRUTH_LEFT, riskOf } from "@/data/patterns";
import type { PatternId, PatternRow, RecId, UncId } from "@/data/patterns";
import { MEASURE_BY_ID, MODEL_MEASURES, explainBucket } from "@/data/measures";
import type { MeasureId, ProblemId } from "@/data/measures";
import { COMP_BY_ID, MODEL_ARCH, MODEL_COMPS, MODEL_GREATEST, MODEL_START, MODEL_TRIGGER, MODEL_TRIPWIRE, OWNER_ACCEPT, OWNER_ACCEPT_LOGIC, SITUATIONS, SOURCES, actionOf, useOf } from "@/data/route2";
import type { Criterion, LogicRow, OwnerId, Use } from "@/data/route2";
import { euro, num, tt } from "@/lib/lang";
import type { L1State, R2State, Score } from "@/store/useStore";

/**
 * Every model answer of the day, in one file. "Fill all model answers" in the mentor bar enters these, so that after one fill every
 * route's missing list is empty and every export downloads at once. Free text follows the site's language. A convenience for
 * facilitators, not security.
 */
export const MENTOR_PASSCODE = "muchson123";
export const MODEL_ORDER: MeasureId[] = ["unified", "handover", "predictive"];

export function KEY_L1(): Partial<L1State> {
  return {
    sort: Object.fromEntries(LINES.map((r) => [r.id, r.truth])) as Record<LineId, LevelTag>,
    extraInsight: tt(
      "When a customer's contract ends, the renewal offer comes from the shop as a standard e-mail, while the account manager is still discussing an upgrade with them, so the two offers contradict each other and the customer does not know which one holds.",
      "Wenn der Vertrag eines Kunden endet, kommt das Verlängerungsangebot als Standard-E-Mail aus dem Shop, während der Account Manager noch ein Upgrade mit ihm bespricht, sodass sich die beiden Angebote widersprechen und der Kunde nicht weiß, welches gilt.",
    ),
    fig: { F1: String(FORECAST.f1), F2: String(FORECAST.f2), F3: String(FORECAST.f3) },
    meaning: tt(
      `Hand-overs in which sales saw the online history closed at ${FORECAST.f1}% against ${FORECAST.controlRate}%, ${FORECAST.f2} times as often. Across ${num(PILOT.yearly)} channel-switching journeys a year that is about ${euro(FORECAST.f3)}, so OmniTech should first make the configurator's entries travel to sales, and test it fairly, because sales may have looked up the history only for the best leads.`,
      `Übergaben, bei denen der Vertrieb die Online-Historie sah, schlossen zu ${num(FORECAST.f1)} % gegenüber ${num(FORECAST.controlRate)} % ab, ${num(FORECAST.f2)}-mal so oft. Bei ${num(PILOT.yearly)} kanalwechselnden Journeys pro Jahr sind das etwa ${euro(FORECAST.f3)}, also sollte OmniTech zuerst die Konfigurator-Eingaben an den Vertrieb weitergeben und das fair testen, weil der Vertrieb die Historie vielleicht nur bei den besten Leads nachschlug.`,
    ),
    valuable: [...VALUABLE_TRUTH],
    churners: [...CHURN_TRUTH],
    insights: [
      { basis: "respond" as Basis, text: tt("A named salesperson calls within four working hours after the configurator, with the customer's entries on a hand-over card, so the customer is not left waiting for nine days.", "Eine benannte Vertriebsperson ruft innerhalb von vier Arbeitsstunden nach dem Konfigurator an, mit den Eingaben des Kunden auf einer Übergabekarte, sodass der Kunde nicht neun Tage wartet.") },
      { basis: "personal" as Basis, text: tt("Support opens the ticket with the contract and the products already shown from the shared customer profile, so the customer never has to give the contract number again.", "Der Support öffnet das Ticket mit Vertrag und Produkten, die bereits aus dem gemeinsamen Kundenprofil angezeigt werden, sodass der Kunde die Vertragsnummer nie wieder nennen muss.") },
      { basis: "learn" as Basis, text: tt("The configurator, the offer and the chat read prices and hosting facts from one price list, so the customer hears the same price and the same promise in every channel.", "Konfigurator, Angebot und Chat lesen Preise und Hosting-Angaben aus einer Preisliste, sodass der Kunde in jedem Kanal denselben Preis und dieselbe Zusage hört.") },
    ],
    reflect: {
      interpret: tt("Omnichannel fails when each channel is optimised on its own: the website, sales and support each work well, but the customer falls between them. At OmniTech the breaks are the hand-over from the configurator to sales and from sales to support, and the systems not connected are the configurator, the CRM and the ticket system.", "Omnichannel scheitert, wenn jeder Kanal für sich optimiert wird: Website, Vertrieb und Support arbeiten je gut, aber der Kunde fällt zwischen sie. Bei OmniTech sind die Brüche die Übergabe vom Konfigurator zum Vertrieb und vom Vertrieb zum Support, und die nicht verbundenen Systeme sind Konfigurator, CRM und Ticketsystem."),
      causation: tt("Technology is a chatbot or an app; customer experience is whether the customer can move from one channel to the next without starting again. A new channel that does not know the others makes the experience worse, however modern it is.", "Technologie ist ein Chatbot oder eine App; Kundenerlebnis ist, ob der Kunde von einem Kanal zum nächsten wechseln kann, ohne neu anzufangen. Ein neuer Kanal, der die anderen nicht kennt, verschlechtert das Erlebnis, so modern er auch ist."),
      decider: tt("A strategic decision-maker integrates first and adds AI on top: the shared profile and the hand-over standard now, because they fix the breaks and every AI tool needs the data; then predictive analytics and the chatbot on the joined data; and judges all of it by a few KPIs across channels, not per channel.", "Eine strategische Entscheiderin integriert zuerst und setzt KI darauf: gemeinsames Profil und Übergabestandard jetzt, weil sie die Brüche beheben und jedes KI-Werkzeug die Daten braucht; dann Predictive Analytics und den Chatbot auf den verbundenen Daten; und sie beurteilt alles an wenigen kanalübergreifenden KPIs, nicht pro Kanal."),
    },
    tags: Object.fromEntries(RECORDS.map((r) => [r.id, r.truth])) as Record<RecId, PatternId>,
    unc: ["sample", "cause", "missing", "shift"] as UncId[],
    rows: Object.fromEntries(PATTERN_IDS.map((x) => [x, { risk: riskOf(TRUTH_LEFT[x], TRUTH_COUNTS[x]), meaning: MEANING_TRUTH[x], measure: MEASURE_TRUTH[x] }])) as Record<PatternId, PatternRow>,
    misread: tt(
      "1) Deal rate of journeys that switch channels (outcome), from the CRM and the shared profile, target 20% by month 6 against 15% today. 2) Share of hand-overs in which the next channel sees the history (driver), from the CRM, target 80% by month 3. 3) Share of customers who repeat their information at a hand-over (guardrail), from a question in every service call, must fall below 20%.",
      "1) Abschlussquote kanalwechselnder Journeys (Outcome), aus CRM und gemeinsamem Profil, Ziel 20 % bis Monat 6 gegenüber 15 % heute. 2) Anteil der Übergaben, bei denen der nächste Kanal die Historie sieht (Treiber), aus dem CRM, Ziel 80 % bis Monat 3. 3) Anteil der Kunden, die bei einer Übergabe ihre Angaben wiederholen müssen (Guardrail), aus einer Frage in jedem Servicegespräch, muss unter 20 % fallen.",
    ),
    ab: {
      ...AB_MODEL,
      hyp: tt("If sales sees the configurator entries on a hand-over card before calling, then more hand-overs become deals, because the customer does not have to repeat everything and the first call starts where they left off.", "Wenn der Vertrieb die Konfigurator-Eingaben vor dem Anruf auf einer Übergabekarte sieht, dann werden mehr Übergaben zu Abschlüssen, weil der Kunde nicht alles wiederholen muss und der erste Anruf dort anfängt, wo er aufgehört hat."),
      rule: tt("Roll out if deals per hand-over are at least 10% higher than the control group with 100 deals per group and the share of customers who repeat their information does not rise; keep testing if 3 to 10% higher; stop if less than 3% higher.", "Ausrollen, wenn die Abschlüsse pro Übergabe bei 100 Abschlüssen pro Gruppe mindestens 10 % über der Kontrollgruppe liegen und der Anteil der Kunden, die ihre Angaben wiederholen, nicht steigt; weiter testen bei 3 bis 10 % darüber; stoppen bei weniger als 3 % darüber."),
    },
    chosen: [...MODEL_MEASURES],
    aims: Object.fromEntries(MODEL_MEASURES.map((id) => [id, [...MEASURE_BY_ID[id].targets]])) as Record<string, ProblemId[]>,
    exp: Object.fromEntries(MODEL_MEASURES.map((id) => [id, explainBucket(MEASURE_BY_ID[id].evidence)])) as Record<string, Score>,
    fea: Object.fromEntries(MODEL_MEASURES.map((id) => [id, MEASURE_BY_ID[id].model.feasibility])) as Record<string, Score>,
    eff: Object.fromEntries(MODEL_MEASURES.map((id) => [id, MEASURE_BY_ID[id].model.effect])) as Record<string, Score>,
    order: [...MODEL_ORDER],
    why: tt(
      "The shared customer profile goes first: it scores 27, connects every channel and the CRM, and every other measure, including the AI, reads from it. The hand-over standard comes second and starts at once, because it fixes the two critical transitions within four weeks, where hand-overs with the history closed twice as often. Predictive analytics comes third, from month 3, because it needs the joined data to be worth anything. The three cost €155,000 of the €250,000; the new app and the full suite are left out, one because it adds an island and the other because it would not be in use within six months.",
      "Das gemeinsame Kundenprofil kommt zuerst: Es erzielt 27, verbindet jeden Kanal und das CRM, und jede andere Maßnahme, auch die KI, liest daraus. Der Übergabestandard kommt als Zweites und startet sofort, weil er die zwei kritischen Übergänge innerhalb von vier Wochen behebt, wo Übergaben mit Historie doppelt so oft abschlossen. Predictive Analytics kommt als Drittes, ab Monat 3, weil es die verbundenen Daten braucht, um etwas wert zu sein. Die drei kosten 155.000 € von 250.000 €; die neue App und die komplette Suite bleiben draußen, die eine, weil sie eine Insel hinzufügt, die andere, weil sie in sechs Monaten nicht in Betrieb wäre.",
    ),
  };
}

export function KEY_R2(): Partial<R2State> {
  const rate: Record<string, Score> = {};
  for (const id of MODEL_COMPS) for (const c of ["explain", "timely", "reach", "scale"] as Criterion[]) rate[`${id}.${c}`] = COMP_BY_ID[id].model[c];
  const logic: Record<string, LogicRow> = {};
  for (const s of SITUATIONS) logic[s.id] = { action: actionOf(s), owner: OWNER_ACCEPT_LOGIC[s.id][0] };
  return {
    principles: ["defs", "rules", "review"],
    principleText: {
      defs: tt("Website, shop, chat, sales and support read and write one customer profile, so no channel asks for what the customer already gave; this answers “systems not integrated”.", "Website, Shop, Chat, Vertrieb und Support lesen und schreiben ein Kundenprofil, sodass kein Kanal nach dem fragt, was der Kunde schon gegeben hat; das beantwortet „Systeme nicht integriert“."),
      rules: tt("From the configurator to sales and from sales to support, a card with the history travels, a named person takes over within four working hours and the same price and promises hold, which answers “customer experience inconsistent”.", "Vom Konfigurator zum Vertrieb und vom Vertrieb zum Support reist eine Karte mit der Historie, eine benannte Person übernimmt innerhalb von vier Arbeitsstunden, und derselbe Preis und dieselben Zusagen gelten, was „Kundenerlebnis inkonsistent“ beantwortet."),
      review: tt("Every month the same three KPIs for every channel decide what is rolled out, tested further or stopped, so OmniTech catches up with competitors by measured steps instead of one big bet.", "Jeden Monat entscheiden dieselben drei KPIs für jeden Kanal, was ausgerollt, weiter getestet oder gestoppt wird, sodass OmniTech in gemessenen Schritten zum Wettbewerb aufholt statt mit einer großen Wette."),
    },
    sources: Object.fromEntries(SOURCES.map((s) => [s.id, useOf(s)])) as Record<string, Use>,
    comps: [...MODEL_COMPS],
    rate,
    greatest: MODEL_GREATEST,
    greatestWhy: tt(
      "The share of hand-overs that carry the history is the driver the brief names (systems not integrated). It is linked to deals, moves as soon as a transition is connected, covers every customer and is counted by the CRM, so every omnichannel measure can be steered by it within weeks.",
      "Der Anteil der Übergaben, die die Historie mitnehmen, ist der Treiber, den der Auftrag nennt (Systeme nicht integriert). Er ist mit Abschlüssen verbunden, bewegt sich, sobald ein Übergang verbunden ist, deckt jeden Kunden ab und wird vom CRM gezählt, sodass sich jede Omnichannel-Maßnahme innerhalb von Wochen daran steuern lässt.",
    ),
    logic,
    alloc: Object.fromEntries(MODEL_ARCH.map((id) => [id, true])),
    start: { ...MODEL_START } as Record<string, number>,
    owner: Object.fromEntries(MODEL_ARCH.map((id) => [id, OWNER_ACCEPT[id][0]])) as Record<string, OwnerId>,
    trigger: Object.fromEntries(MODEL_ARCH.map((id) => [id, MODEL_TRIGGER[id as keyof typeof MODEL_TRIGGER]])) as Record<string, string>,
    postponed: tt(
      "The all-in-one omnichannel AI suite (€180,000) is left out: the six funded items cost €240,000 of the €280,000, the suite would push the plan €140,000 over, it is in use only after thirty weeks and nobody at OmniTech could explain its decisions. The new app (€90,000) adds one more channel that knows nothing about the others.",
      "Die All-in-one-Omnichannel-KI-Suite (180.000 €) bleibt draußen: Die sechs finanzierten Punkte kosten 240.000 € von 280.000 €, die Suite brächte den Plan 140.000 € über das Budget, sie ist erst nach dreißig Wochen in Betrieb, und niemand bei OmniTech könnte ihre Entscheidungen erklären. Die neue App (90.000 €) fügt einen weiteren Kanal hinzu, der nichts über die anderen weiß.",
    ),
    pickup: tt(
      "If the cross-channel deal rate reaches 20% by month 5, we look again at an app for the next year, built on the shared profile.",
      "Erreicht die kanalübergreifende Abschlussquote bis Monat 5 20 %, prüfen wir für das nächste Jahr erneut eine App, aufgebaut auf dem gemeinsamen Profil.",
    ),
    decision: "stage",
    assumptions: [
      tt("Seeing the history itself raises deals, not only the choice of good leads. This is wrong if a random-split test shows less than 1.2 times the deal rate with the hand-over card on 100 deals per group by month 4.", "Die Historie zu sehen erhöht selbst die Abschlüsse, nicht nur die Auswahl guter Leads. Das ist falsch, wenn ein Test mit zufälliger Aufteilung bis Monat 4 bei 100 Abschlüssen pro Gruppe weniger als das 1,2-Fache der Abschlussquote mit Übergabekarte zeigt."),
      tt("Sales and service will use the shared profile. This is wrong if fewer than 80% of them open it before a customer call by month 2.", "Vertrieb und Service werden das gemeinsame Profil nutzen. Das ist falsch, wenn bis Monat 2 weniger als 80 % von ihnen es vor einem Kundengespräch öffnen."),
      tt("The ticket system and the shop can be connected within the plan. This is wrong if fewer than 80% of hand-overs carry the history by the end of month 3.", "Ticketsystem und Shop lassen sich im Plan anbinden. Das ist falsch, wenn bis Ende Monat 3 weniger als 80 % der Übergaben die Historie mitnehmen."),
    ],
    tripKpi: MODEL_TRIPWIRE.kpi,
    tripThreshold: String(MODEL_TRIPWIRE.threshold),
    tripMonth: MODEL_TRIPWIRE.month,
    tripAction: "adjust",
    challenge: tt(
      "I keep the profile and the AI tools, and I do not buy the suite. The profile works: repeated information fell from 45% to 20%, which is our guardrail and the break customers felt most. 15% to 16% after three months rests on too few deals to judge; the tripwire of 20% in month 5 decides. First I check whether the deal rate rose where the history now travels and not elsewhere. The one change: the chatbot starts on the contract data it can already read, and the ticket interface follows in month 4. Stopping the AI would leave the joined data unused while the competitor pulls ahead; the suite would not be in use within the six months and nobody could explain it.",
      "Ich behalte das Profil und die KI-Werkzeuge und kaufe die Suite nicht. Das Profil wirkt: Wiederholte Angaben fielen von 45 % auf 20 %, das ist unsere Guardrail und der Bruch, den Kunden am stärksten spürten. 15 % zu 16 % nach drei Monaten beruhen auf zu wenigen Abschlüssen für ein Urteil; der Tripwire von 20 % in Monat 5 entscheidet. Zuerst prüfe ich, ob die Abschlussquote dort stieg, wo die Historie jetzt mitreist, und nicht anderswo. Die eine Änderung: Der Chatbot startet mit den Vertragsdaten, die er schon lesen kann, und die Ticket-Schnittstelle folgt in Monat 4. Die KI zu stoppen ließe die verbundenen Daten ungenutzt, während der Wettbewerber davonzieht; die Suite wäre in den sechs Monaten nicht in Betrieb, und niemand könnte sie erklären.",
    ),
  };
}
