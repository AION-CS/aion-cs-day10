import { bi, t } from "@/lib/lang";

/**
 * Task 1 · Block 2.4. Six measures OmniTech could fund inside €250,000 and six months (the plan's framework). Costs, weeks and what each
 * connects to are Case assumptions; every price is built from parts (set-up, a licence for the months, days or hours of work) so a learner
 * sees why it is that number. What each measure does is written without naming the problem it answers, so the learner has to match
 * them (Materi A7). The score is the plan's own evaluation: Integration × Effect × Scalability. Integration follows from the printed
 * "connects to", so it is checkable; effect and scalability are the learner's judgement. (Field names keep the earlier ones: `exp` =
 * Integration, `fea` = Scalability, `eff` = Effect; `evidence` is the integration band, derived from `joins`; `targets` are the problems a
 * measure answers. The problem ids bounce/interaction/coordination now mean isolation/inconsistent/AI unused.)
 *
 * Three are strong, three are traps of different kinds: the chatbot is a good tool that sees only tickets, the app adds one more channel
 * that connects to nothing, and the suite is fully joined up on paper but is in use only after the six months.
 */
export type MeasureId = "unified" | "handover" | "predictive" | "chatbot" | "app" | "suite";
export const BUDGET = 250000;
export const MONTHS = 6;
/** The six months in weeks: the frame in which a measure has to start working. */
export const FRAME_WEEKS = MONTHS * 4;
export type Bucket = 1 | 2 | 3;

/**
 * The category printed after the weeks (CLAUDE.md #45): which of the omnichannel principles taught in Materi A1 to A3 a measure builds (a seamless transition, recognition or consistency), whether it is an AI tool, or whether it only improves one channel on its own. A fact about the measure taken from those cards' own tests, never a
 * score and never the problem it answers (that stays the learner's job).
 */
export type MeasureArea = "transition" | "recognition" | "consistency" | "ai" | "channel";
export const MEASURE_AREA_LABEL = bi({
  transition: t("Seamless transition", "Nahtloser Übergang"),
  recognition: t("Recognition", "Wiedererkennung"),
  consistency: t("Consistency", "Konsistenz"),
  ai: t("AI tool", "KI-Werkzeug"),
  channel: t("One channel on its own", "Ein Kanal für sich"),
});
export const AREA_NOTE = bi({
  v: t(
    "The brief names three problems. Each card carries a small label with what kind of measure it is (taught in Materi A1 to A3); “One channel on its own” connects nothing.",
    "Der Auftrag nennt drei Probleme. Jede Karte trägt ein kleines Etikett, was für eine Maßnahme sie ist (gelehrt in Materi A1 bis A3); „Ein Kanal für sich“ verbindet nichts.",
  ),
});

export type ProblemId = "bounce" | "interaction" | "coordination";
export const PROBLEM_IDS: ProblemId[] = ["bounce", "interaction", "coordination"];
export const PROBLEM_LABEL = bi({
  bounce: t("Channels work in isolation", "Kanäle arbeiten isoliert"),
  interaction: t("Customer experience inconsistent", "Kundenerlebnis inkonsistent"),
  coordination: t("AI potential unused", "KI-Potenzial ungenutzt"),
});
/** The three problems in everyday words, for the picture under the cards. */
export const PROBLEM_PLAIN = bi({
  bounce: t("Channels do not see each other's data", "Kanäle sehen die Daten der anderen nicht"),
  interaction: t("Customers repeat themselves and hear different things", "Kunden wiederholen sich und hören Verschiedenes"),
  coordination: t("Nothing uses AI on the customer data yet", "Nichts nutzt bisher KI auf den Kundendaten"),
});

export type Joins = "all" | "one" | "none";
export type Evidence = "fast" | "mid" | "slow";
export const bandOf = (j: Joins): Evidence => (j === "all" ? "fast" : j === "one" ? "mid" : "slow");
export const JOINS_LABEL = bi({
  all: t("all channels and the CRM", "alle Kanäle und das CRM"),
  one: t("one other system", "ein anderes System"),
  none: t("nothing: it stands alone", "nichts: steht allein"),
});
export const EVIDENCE_LABEL = bi({
  fast: t("connected to all channels and the CRM", "mit allen Kanälen und dem CRM verbunden"),
  mid: t("connected to one other system", "mit einem anderen System verbunden"),
  slow: t("stand-alone", "allein stehend"),
});
export const explainBucket = (e: Evidence): Bucket => (e === "fast" ? 3 : e === "mid" ? 2 : 1);
export const EXPLAIN_RULE = bi({
  v: t(
    "Integration follows from what the measure is printed to connect to: all channels and the CRM scores 3, one other system scores 2, nothing (it stands alone) scores 1. A measure that stands alone adds one more island, however good it is.",
    "Die Integration folgt aus dem, womit die Maßnahme laut Beschreibung verbunden ist: alle Kanäle und das CRM ergibt 3, ein anderes System ergibt 2, nichts (steht allein) ergibt 1. Eine Maßnahme, die allein steht, fügt eine weitere Insel hinzu, so gut sie auch ist.",
  ),
});

/** The plain-word anchors for the two judged scores, printed under the score buttons and taught in Materi A7. */
export const EFFECT_ANCHOR = bi({
  v: t(
    "3 = it changes what most customers experience at the switches between channels. 2 = it helps, but only some customers or only indirectly. 1 = it hardly changes what customers experience.",
    "3 = Sie ändert, was die meisten Kunden bei den Wechseln zwischen den Kanälen erleben. 2 = Sie hilft, aber nur einigen Kunden oder nur indirekt. 1 = Sie ändert kaum, was Kunden erleben.",
  ),
});
export const SCALE_ANCHOR = bi({
  v: t(
    "3 = once built, it serves every customer with no extra people. 2 = it needs some extra people or cost as it grows. 1 = it grows only by adding people.",
    "3 = Einmal gebaut, dient sie jedem Kunden ohne zusätzliche Personen. 2 = Sie braucht beim Wachsen etwas mehr Personal oder Kosten. 1 = Sie wächst nur, indem man Personal ergänzt.",
  ),
});

export type CostPart = { label: string; amount: number };

export type Measure = {
  id: MeasureId;
  name: string;
  /** A short name for bars and rows. */
  short: string;
  /** In everyday words: what it is. */
  what: string;
  /** One concrete scene from OmniTech's day (CLAUDE.md #46). */
  scene: string;
  /** Who does what, and what the customer notices. */
  who: string;
  area: MeasureArea;
  basis: string;
  joins: Joins;
  evidence: Evidence;
  /** What the price is made of; `cost` is their sum. */
  costParts: CostPart[];
  cost: number;
  weeks: number;
  targets: ProblemId[];
  model: { feasibility: Bucket; effect: Bucket; note: string };
  verdict: string;
};

export const MEASURES: Measure[] = [];
const RAW = bi([
  {
    id: "unified" as MeasureId,
    short: t("Customer profile", "Kundenprofil"),
    name: t("One customer profile across all channels", "Ein Kundenprofil über alle Kanäle"),
    what: t(
      "One shared customer profile. Website, shop, chat, sales and support all write to it, and every channel reads from it.",
      "Ein gemeinsames Kundenprofil. Website, Shop, Chat, Vertrieb und Support schreiben hinein, und jeder Kanal liest daraus.",
    ),
    scene: t(
      "A customer who configured licences online calls support three months later. The agent sees the configurator entries, the offer and the contract on one screen.",
      "Ein Kunde, der online Lizenzen konfiguriert hat, ruft drei Monate später den Support an. Der Mitarbeiter sieht Konfigurator-Eingaben, Angebot und Vertrag auf einem Bildschirm.",
    ),
    who: t(
      "IT builds the profile over twelve weeks. Then every channel team reads from it and writes to it. The customer stops being asked for what they already told another channel.",
      "Die IT baut das Profil in zwölf Wochen. Danach liest und schreibt jedes Kanalteam darin. Der Kunde wird nicht mehr nach dem gefragt, was er einem anderen Kanal schon gesagt hat.",
    ),
    area: "recognition" as MeasureArea,
    basis: t("Connects to all channels and the CRM.", "Verbunden mit allen Kanälen und dem CRM."),
    joins: "all" as Joins,
    costParts: [
      { label: t("links to the five systems (web, shop, chat, CRM, support), 5 × €6,000", "Anbindung der fünf Systeme (Web, Shop, Chat, CRM, Support), 5 × 6.000 €"), amount: 30000 },
      { label: t("IT builds the profile, 40 days × €800", "IT baut das Profil, 40 Tage × 800 €"), amount: 32000 },
      { label: t("matching duplicate customers, 150 h × €80", "doppelte Kunden zusammenführen, 150 Std. × 80 €"), amount: 12000 },
      { label: t("profile tool licence, 6 months × €1,000", "Lizenz des Profil-Tools, 6 Monate × 1.000 €"), amount: 6000 },
    ],
    cost: 0,
    weeks: 12,
    targets: ["bounce", "interaction"] as ProblemId[],
    model: { feasibility: 3, effect: 3, note: t("It removes the cause of both breaks the customer feels: every channel sees the same customer, and says the same things about them.", "Es beseitigt die Ursache beider Brüche, die der Kunde spürt: Jeder Kanal sieht denselben Kunden und sagt dasselbe über ihn.") },
    verdict: t("A model measure: the foundation every other channel and every AI tool builds on.", "Eine Modellmaßnahme: die Grundlage, auf der jeder andere Kanal und jedes KI-Werkzeug aufbaut."),
  },
  {
    id: "handover" as MeasureId,
    short: t("Hand-over standard", "Übergabestandard"),
    name: t("Hand-over standard with a hand-over card", "Übergabestandard mit Übergabekarte"),
    what: t(
      "A rule for every switch from online to sales and from sales to support: a card with what the customer did so far goes along, a named person takes over within four working hours, and price and promises are copied, not retyped.",
      "Eine Regel für jeden Wechsel von online zum Vertrieb und vom Vertrieb zum Support: Eine Karte mit dem bisherigen Verlauf geht mit, eine benannte Person übernimmt innerhalb von vier Arbeitsstunden, und Preis und Zusagen werden übernommen, nicht neu getippt.",
    ),
    scene: t(
      "A salesperson closes a deal and passes the customer to support with a card: what was bought, what was promised, and the named person who calls within four working hours.",
      "Ein Vertriebsmitarbeiter schließt einen Abschluss und übergibt den Kunden mit einer Karte an den Support: was gekauft wurde, was versprochen wurde und die namentlich genannte Person, die innerhalb von vier Arbeitsstunden anruft.",
    ),
    who: t(
      "Sales and support agree the card once. The named person is always a person, never a queue. The customer does not tell the story again at the next step.",
      "Vertrieb und Support einigen sich einmal auf die Karte. Die genannte Person ist immer ein Mensch, nie eine Warteschlange. Der Kunde erzählt die Geschichte beim nächsten Schritt nicht noch einmal.",
    ),
    area: "transition" as MeasureArea,
    basis: t("Connects to one other system (the CRM).", "Verbunden mit einem anderen System (dem CRM)."),
    joins: "one" as Joins,
    costParts: [
      { label: t("hand-over card built into the CRM", "Übergabekarte im CRM gebaut"), amount: 9000 },
      { label: t("workshops to agree the card, 5 people × 20 h × €80", "Workshops zur Abstimmung der Karte, 5 Personen × 20 Std. × 80 €"), amount: 8000 },
      { label: t("training for sales and support, 100 h in total × €80", "Schulung für Vertrieb und Support, insgesamt 100 Std. × 80 €"), amount: 8000 },
    ],
    cost: 0,
    weeks: 4,
    targets: ["bounce", "interaction"] as ProblemId[],
    model: { feasibility: 3, effect: 3, note: t("It fixes the two critical transitions at once and works within a month; it lives in the CRM only, so integration 2.", "Es behebt die zwei kritischen Übergänge sofort und wirkt innerhalb eines Monats; es lebt nur im CRM, daher Integration 2.") },
    verdict: t("A model measure: the fastest fix for the breaks between channels.", "Eine Modellmaßnahme: die schnellste Korrektur für die Brüche zwischen Kanälen."),
  },
  {
    id: "predictive" as MeasureId,
    short: t("Predictive analytics", "Predictive Analytics"),
    name: t("Predictive analytics in sales (B)", "Predictive Analytics im Vertrieb (B)"),
    what: t(
      "A model reads the contacts from every channel. Each week it tells account managers which customers are likely to renew, buy more or leave.",
      "Ein Modell liest die Kontakte aller Kanäle. Jede Woche sagt es Account Managern, welche Kunden wahrscheinlich verlängern, mehr kaufen oder gehen.",
    ),
    scene: t(
      "On Monday an account manager opens a list of three customers who are likely to leave, built from calls, chats and orders.",
      "Am Montag öffnet ein Account Manager eine Liste von drei Kunden, die wahrscheinlich gehen, gebaut aus Anrufen, Chats und Bestellungen.",
    ),
    who: t(
      "A data team builds the model. Account managers decide what to do with each name. The customer gets a call that fits their situation.",
      "Ein Datenteam baut das Modell. Account Manager entscheiden, was sie mit jedem Namen tun. Der Kunde bekommt einen Anruf, der zu seiner Situation passt.",
    ),
    area: "ai" as MeasureArea,
    basis: t("Connects to all channels and the CRM.", "Verbunden mit allen Kanälen und dem CRM."),
    joins: "all" as Joins,
    costParts: [
      { label: t("data team builds the model, 30 days × €800", "Datenteam baut das Modell, 30 Tage × 800 €"), amount: 24000 },
      { label: t("licence for the modelling tool, 6 months × €2,500", "Lizenz des Modellierungs-Tools, 6 Monate × 2.500 €"), amount: 15000 },
      { label: t("weekly lists wired into the CRM", "wöchentliche Listen im CRM verdrahtet"), amount: 11000 },
    ],
    cost: 0,
    weeks: 10,
    targets: ["coordination"] as ProblemId[],
    model: { feasibility: 3, effect: 2, note: t("It is the AI tool that uses the joined-up data; its effect comes through the account managers who act on it, so effect 2.", "Es ist das KI-Werkzeug, das die verbundenen Daten nutzt; seine Wirkung kommt über die Account Manager, die danach handeln, daher Wirkung 2.") },
    verdict: t("A model measure: the only one that puts the unused AI potential to work on data from every channel.", "Eine Modellmaßnahme: die einzige, die das ungenutzte KI-Potenzial mit Daten aus jedem Kanal zum Einsatz bringt."),
  },
  {
    id: "chatbot" as MeasureId,
    short: t("Chatbot", "Chatbot"),
    name: t("Chatbot in customer service (A)", "Chatbot im Kundenservice (A)"),
    what: t(
      "A chatbot answers common service questions at any hour and opens a ticket for the rest.",
      "Ein Chatbot beantwortet häufige Servicefragen zu jeder Zeit und eröffnet für den Rest ein Ticket.",
    ),
    scene: t(
      "At 9 p.m. a customer asks how to add a user and gets the answer at once. A billing question becomes a ticket for the next morning.",
      "Um 21 Uhr fragt ein Kunde, wie er einen Nutzer hinzufügt, und bekommt die Antwort sofort. Eine Abrechnungsfrage wird ein Ticket für den nächsten Morgen.",
    ),
    who: t(
      "Service writes the answers once. The chatbot talks to customers. Service agents work the tickets it opens. The customer gets an answer at any hour, but the bot knows only tickets, not the contract.",
      "Der Service schreibt die Antworten einmal. Der Chatbot spricht mit den Kunden. Service-Mitarbeiter bearbeiten die Tickets, die er eröffnet. Der Kunde bekommt zu jeder Zeit eine Antwort, aber der Bot kennt nur Tickets, nicht den Vertrag.",
    ),
    area: "ai" as MeasureArea,
    basis: t("Connects to one other system (the ticket system).", "Verbunden mit einem anderen System (dem Ticketsystem)."),
    joins: "one" as Joins,
    costParts: [
      { label: t("tool set-up and link to the ticket system", "Einrichtung des Tools und Anbindung an das Ticketsystem"), amount: 18000 },
      { label: t("licence, 6 months × €2,000", "Lizenz, 6 Monate × 2.000 €"), amount: 12000 },
      { label: t("Service writes and updates the answers, 125 h × €80", "Service schreibt und pflegt die Antworten, 125 Std. × 80 €"), amount: 10000 },
    ],
    cost: 0,
    weeks: 8,
    targets: ["coordination"] as ProblemId[],
    model: { feasibility: 3, effect: 2, note: t("Useful and scalable, but it sees only tickets, not the contract or the sales history, so customers still repeat themselves at the next step.", "Nützlich und skalierbar, aber er sieht nur Tickets, nicht Vertrag oder Vertriebshistorie, also wiederholen sich Kunden beim nächsten Schritt immer noch.") },
    verdict: t("Not in the model three: 12 points. Better once it can read the shared profile.", "Nicht unter den drei Modellmaßnahmen: 12 Punkte. Besser, sobald er das gemeinsame Profil lesen kann."),
  },
  {
    id: "app" as MeasureId,
    short: t("Customer app", "Kunden-App"),
    name: t("A new customer app", "Eine neue Kunden-App"),
    what: t(
      "An app with company news, the product catalogue and a contact form.",
      "Eine App mit Firmen-Neuigkeiten, dem Produktkatalog und einem Kontaktformular.",
    ),
    scene: t(
      "A customer installs the app, reads company news and can open a contact form. The app does not show their contract or their tickets.",
      "Ein Kunde installiert die App, liest Firmen-Neuigkeiten und kann ein Kontaktformular öffnen. Die App zeigt weder seinen Vertrag noch seine Tickets.",
    ),
    who: t(
      "An agency builds the app. Nobody connects it to the CRM or the ticket system. The customer gets one more place to look, and it knows nothing about the other channels.",
      "Eine Agentur baut die App. Niemand verbindet sie mit dem CRM oder dem Ticketsystem. Der Kunde bekommt einen weiteren Ort zum Nachsehen, und er weiß nichts über die anderen Kanäle.",
    ),
    area: "channel" as MeasureArea,
    basis: t("Connects to nothing: it stands alone.", "Mit nichts verbunden: steht allein."),
    joins: "none" as Joins,
    costParts: [
      { label: t("agency designs and builds the app", "Agentur entwirft und baut die App"), amount: 70000 },
      { label: t("app store accounts, hosting and testing", "App-Store-Konten, Hosting und Tests"), amount: 12000 },
      { label: t("catalogue and news texts, 100 h × €80", "Katalog- und Nachrichtentexte, 100 Std. × 80 €"), amount: 8000 },
    ],
    cost: 0,
    weeks: 16,
    targets: [] as ProblemId[],
    model: { feasibility: 3, effect: 2, note: t("One more channel that knows nothing about the others: the multichannel trap.", "Ein weiterer Kanal, der nichts über die anderen weiß: die Multichannel-Falle.") },
    verdict: t("Rejected: 6 points. It adds a channel instead of connecting them.", "Verworfen: 6 Punkte. Sie fügt einen Kanal hinzu, statt sie zu verbinden."),
  },
  {
    id: "suite" as MeasureId,
    short: t("One suite", "Eine Suite"),
    name: t("Replace every system with one omnichannel suite", "Jedes System durch eine Omnichannel-Suite ersetzen"),
    what: t(
      "A vendor suite replaces the shop, the CRM, the ticket system and the chat at once.",
      "Eine Anbieter-Suite ersetzt Shop, CRM, Ticketsystem und Chat auf einmal.",
    ),
    scene: t(
      "For thirty weeks the shop, the CRM, the ticket system and the chat are replaced at once, and every channel runs half old and half new.",
      "Dreißig Wochen lang werden Shop, CRM, Ticketsystem und Chat auf einmal ersetzt, und jeder Kanal läuft halb alt und halb neu.",
    ),
    who: t(
      "A vendor configures and migrates. OmniTech's teams retrain and keep the business running meanwhile. Customers notice nothing until the move is finished.",
      "Ein Anbieter konfiguriert und migriert. Die Teams von OmniTech lernen um und halten währenddessen das Geschäft am Laufen. Kunden merken nichts, bis der Umzug beendet ist.",
    ),
    area: "recognition" as MeasureArea,
    basis: t("Connects to all channels and the CRM.", "Verbunden mit allen Kanälen und dem CRM."),
    joins: "all" as Joins,
    costParts: [
      { label: t("suite licences, 6 months × €10,000", "Suite-Lizenzen, 6 Monate × 10.000 €"), amount: 60000 },
      { label: t("vendor configures and migrates", "Anbieter konfiguriert und migriert"), amount: 90000 },
      { label: t("retraining and extra staff time, 375 h × €80", "Umschulung und zusätzliche Arbeitszeit, 375 Std. × 80 €"), amount: 30000 },
    ],
    cost: 0,
    weeks: 30,
    targets: ["bounce", "interaction"] as ProblemId[],
    model: { feasibility: 2, effect: 1, note: t("Fully integrated on paper, but in use only after 30 weeks, beyond the six months, and every team has to be retrained.", "Auf dem Papier voll integriert, aber erst nach 30 Wochen in Betrieb, nach den sechs Monaten, und jedes Team muss neu geschult werden.") },
    verdict: t("Rejected: 6 points. Nothing changes for customers within the six months, and it takes most of the budget.", "Verworfen: 6 Punkte. Für Kunden ändert sich in den sechs Monaten nichts, und sie nimmt den Großteil des Budgets."),
  },
]);
for (const m of RAW) {
  MEASURES.push(Object.assign(m, { evidence: bandOf(m.joins), cost: m.costParts.reduce((s, p) => s + p.amount, 0) }) as Measure);
}

export const MEASURE_BY_ID = Object.fromEntries(MEASURES.map((m) => [m.id, m])) as Record<MeasureId, Measure>;
export const MEASURE_IDS = MEASURES.map((m) => m.id);
export const CHOOSE = 3;
export const modelScore = (id: MeasureId) => {
  const m = MEASURE_BY_ID[id];
  return explainBucket(m.evidence) * m.model.feasibility * m.model.effect;
};
export const MODEL_MEASURES: MeasureId[] = ["unified", "handover", "predictive"];
export const MODEL_COST = MODEL_MEASURES.reduce((s, id) => s + MEASURE_BY_ID[id].cost, 0);

/** Weeks a measure is actually working inside the six months (0 when it only starts after them). */
export const workingWeeks = (id: MeasureId) => Math.max(0, FRAME_WEEKS - MEASURE_BY_ID[id].weeks);
