import { LINES } from "@/data/ladder";
import type { LevelTag, LineId } from "@/data/ladder";
import { CHURN_TRUTH, FORECAST, PILOT, VALUABLE_TRUTH } from "@/data/forecast";
import type { Basis } from "@/data/forecast";
import { AB_MODEL, MEANING_TRUTH, MEASURE_TRUTH, PATTERN_IDS, RECORDS, TRUTH_COUNTS, TRUTH_LEFT, riskOf } from "@/data/patterns";
import type { PatternId, PatternRow, RecId, UncId } from "@/data/patterns";
import { MEASURE_BY_ID, MODEL_MEASURES, explainBucket } from "@/data/measures";
import type { MeasureId, ProblemId } from "@/data/measures";
import { ARCH_BY_ID, COMP_BY_ID, MODEL_COMPS, MODEL_GREATEST, OWNER_ACCEPT_LOGIC, R2_BUDGET, SITUATIONS, SOURCES, actionOf, useOf } from "@/data/route2";
import { MODEL_ARCH, MODEL_TIER } from "@/data/route2Panel";
import type { Criterion, LogicRow, Use } from "@/data/route2";
import { euro, num, tt } from "@/lib/lang";
import type { L1State, R2State, Score } from "@/store/useStore";

/**
 * Every model answer of the day, in one file. "Fill all model answers" in the mentor bar enters these, so that after one fill every
 * route's missing list is empty and every export downloads at once. Free text follows the site's language. A convenience for
 * facilitators, not security.
 */
export const MENTOR_PASSCODE = "muchson123";
export const MODEL_ORDER: MeasureId[] = ["unified", "handover", "predictive"];

/** The model reason for the two judged scores of each model measure (CLAUDE.md #45): effect, scalability, and a printed fact. */
const MEASURE_REASON: Record<string, () => string> = {
  unified: () =>
    tt(
      "Effect 3: it removes the cause of both breaks customers feel, because every channel then sees the same customer. Scalability 3: once built, every channel and every customer uses it at no extra cost, although the card says 12 weeks.",
      "Wirkung 3: Sie beseitigt die Ursache beider Brüche, die Kunden spüren, weil dann jeder Kanal denselben Kunden sieht. Skalierbarkeit 3: Einmal gebaut, nutzen sie jeder Kanal und jeder Kunde ohne Zusatzkosten, auch wenn die Karte 12 Wochen nennt.",
    ),
  handover: () =>
    tt(
      "Effect 3: it fixes the two critical transitions at once, because a card and a named person travel with every customer. Scalability 3: the same standard works for every hand-over, and the card says 4 weeks.",
      "Wirkung 3: Er behebt die zwei kritischen Übergänge sofort, weil eine Karte und eine benannte Person mit jedem Kunden mitreisen. Skalierbarkeit 3: Derselbe Standard gilt für jede Übergabe, und die Karte nennt 4 Wochen.",
    ),
  predictive: () =>
    tt(
      "Effect 2: it is the AI tool that uses the joined-up data, but its effect comes through the account managers who act on it. Scalability 3: once the model runs it covers every customer, for 10 weeks of work.",
      "Wirkung 2: Es ist das KI-Werkzeug, das die verbundenen Daten nutzt, aber seine Wirkung kommt über die Account Manager, die danach handeln. Skalierbarkeit 3: Läuft das Modell einmal, deckt es jeden Kunden ab, bei 10 Wochen Arbeit.",
    ),
};

export function KEY_L1(): Partial<L1State> {
  return {
    sort: Object.fromEntries(LINES.map((r) => [r.id, r.truth])) as Record<LineId, LevelTag>,
    extraInsight: tt(
      "When a customer's contract ends, the renewal offer comes from the shop as a standard e-mail, while the account manager is still discussing an upgrade with them, so the two offers contradict each other and the customer does not know which one holds.",
      "Wenn der Vertrag eines Kunden endet, kommt das Verlängerungsangebot als Standard-E-Mail aus dem Shop, während der Account Manager noch ein Upgrade mit ihm bespricht, sodass sich die beiden Angebote widersprechen und der Kunde nicht weiß, welches gilt.",
    ),
    meaning: tt(
      `Hand-overs in which sales saw the online history closed at ${FORECAST.f1}% against ${FORECAST.controlRate}%, ${FORECAST.f2} times as often, so OmniTech should first make the configurator's entries travel to sales, and test it fairly, because sales may have looked up the history only for the best leads.`,
      `Übergaben, bei denen der Vertrieb die Online-Historie sah, schlossen zu ${num(FORECAST.f1)} % gegenüber ${num(FORECAST.controlRate)} % ab, ${num(FORECAST.f2)}-mal so oft, also sollte OmniTech zuerst die Konfigurator-Eingaben an den Vertrieb weitergeben und das fair testen, weil der Vertrieb die Historie vielleicht nur bei den besten Leads nachschlug.`,
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
      "1) Deal rate of journeys that switch channels (outcome), from the CRM and the shared profile, aim: up, above today's rate. 2) Share of hand-overs in which the next channel sees the history (driver), from the CRM, aim: up, towards every hand-over. 3) Share of customers who repeat their information at a hand-over (guardrail), from a question in every service call, aim: down, under a limit.",
      "1) Abschlussquote kanalwechselnder Journeys (Outcome), aus CRM und gemeinsamem Profil, Ziel: hoch, über der heutigen Quote. 2) Anteil der Übergaben, bei denen der nächste Kanal die Historie sieht (Treiber), aus dem CRM, Ziel: hoch, Richtung jede Übergabe. 3) Anteil der Kunden, die bei einer Übergabe ihre Angaben wiederholen müssen (Guardrail), aus einer Frage in jedem Servicegespräch, Ziel: runter, unter eine Grenze.",
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
    reasons: Object.fromEntries(MODEL_MEASURES.map((id) => [id, MEASURE_REASON[id]()])) as Record<string, string>,
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
    tier: { ...MODEL_TIER },
    vision: tt(
      "OmniTech gives every customer one continuous experience: every channel reads one customer profile and every switch carries the history, and the company steers by three cross-channel KPIs. Every new AI tool has to move one of them before it grows, so integration and AI grow together.",
      "OmniTech gibt jedem Kunden ein durchgehendes Erlebnis: Jeder Kanal liest ein Kundenprofil und jeder Wechsel nimmt die Historie mit, und das Unternehmen steuert über drei kanalübergreifende KPIs. Jedes neue KI-Werkzeug muss einen davon bewegen, bevor es wächst, sodass Integration und KI gemeinsam wachsen.",
    ),
    giveUp: tt(
      `The plan gives me one shared profile with the KPIs, a hand-over standard that makes the history travel, one price list for every channel, trained staff, and the chatbot on contract data that is already connected. The predictions start once the hand-overs carry the history. It costs me the all-in-one suite and the new app, which name no KPI (the suite is in use only in month 9). ${euro(R2_BUDGET - MODEL_ARCH.reduce((x, id) => x + ARCH_BY_ID[id].cost, 0))} stay unspent. If the data turns out weaker, the chatbot rests on data below 80% connected, so I watch it first.`,
      `Der Plan gibt mir ein gemeinsames Profil mit den KPIs, einen Übergabestandard, der die Historie mitreisen lässt, eine Preisliste für jeden Kanal, geschulte Mitarbeitende und den Chatbot auf Vertragsdaten, die schon verbunden sind. Die Vorhersagen starten, sobald die Übergaben die Historie mitnehmen. Er kostet mich die All-in-one-Suite und die neue App, die keinen KPI nennen (die Suite ist erst in Monat 9 im Einsatz). ${euro(R2_BUDGET - MODEL_ARCH.reduce((x, id) => x + ARCH_BY_ID[id].cost, 0))} bleiben ungenutzt. Fallen die Daten schwächer aus, beruht der Chatbot auf Daten unter 80 % verbunden, also beobachte ich ihn zuerst.`,
    ),
    decision: "stage",
    decisionWhy: tt(
      "It is the investment decision the brief asks for despite unclear prospects: invest now where the breaks cost most and the data is connected, measure from the first week through the shared profile, and spend the rest as the evidence arrives. The predictions wait for the hand-overs to carry the history, and the suite and the app stay out because neither names a KPI and the suite arrives only in month 9.",
      "Es ist die Investitionsentscheidung, die der Auftrag trotz unklarer Aussichten verlangt: jetzt dort investieren, wo die Brüche am meisten kosten und die Daten verbunden sind, ab der ersten Woche über das gemeinsame Profil messen und den Rest ausgeben, wie die Evidenz kommt. Die Vorhersagen warten, bis die Übergaben die Historie mitnehmen, und Suite und App bleiben draußen, weil keine einen KPI nennt und die Suite erst in Monat 9 ankommt.",
    ),
    watch: tt(
      "I watch the share of customers who repeat their information: today it is 45%, and if it is not clearly below that by month 3 on enough hand-overs, I stop adding AI tools and rewrite the hand-over card with the sales team. I also watch the data behind the chatbot: if it stays below 80% connected, I pause it until the hand-overs carry the history.",
      "Ich beobachte den Anteil der Kunden, die ihre Angaben wiederholen: Heute liegt er bei 45 %, und liegt er bis Monat 3 bei genug Übergaben nicht deutlich darunter, höre ich auf, KI-Werkzeuge hinzuzufügen, und schreibe die Übergabekarte mit dem Vertriebsteam neu. Ich beobachte auch die Daten hinter dem Chatbot: Bleiben sie unter 80 % verbunden, pausiere ich ihn, bis die Übergaben die Historie mitnehmen.",
    ),
  };
}
