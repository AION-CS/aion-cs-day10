import { bi, t } from "@/lib/lang";

/**
 * Task 1 · Block 2.4. Nine measures OmniTech could fund inside €250,000 and six months (the plan's framework). Costs, weeks and what each
 * connects to are Case assumptions. What each measure does is written without naming the problem it answers, so the learner has to match
 * them (Materi A7). The score is the plan's own evaluation: Integration × Effect × Scalability. Integration follows from the printed
 * "connects to", so it is checkable; effect and scalability are the learner's judgement. (Field names keep the earlier ones: `exp` =
 * Integration, `fea` = Scalability, `eff` = Effect; `evidence` is the integration band, derived from `joins`; `targets` are the problems a
 * measure answers. The problem ids bounce/interaction/coordination now mean isolation/inconsistent/AI unused.)
 */
export type MeasureId = "unified" | "handover" | "predictive" | "chatbot" | "offers" | "app" | "suite" | "dashboards" | "hotline";
export const BUDGET = 250000;
export const MONTHS = 6;
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
    "The brief names three problems: channels that work in isolation, an inconsistent experience and unused AI potential. They call for connecting the channels (a seamless transition, recognition, consistency) and for AI tools that build on that connection. A new app, a separate dashboard or more hotline staff improves one channel on its own and connects nothing.",
    "Der Auftrag nennt drei Probleme: Kanäle, die isoliert arbeiten, ein uneinheitliches Erlebnis und ungenutztes KI-Potenzial. Sie verlangen, die Kanäle zu verbinden (nahtloser Übergang, Wiedererkennung, Konsistenz) und KI-Werkzeuge, die auf dieser Verbindung aufbauen. Eine neue App, ein separates Dashboard oder mehr Hotline-Personal verbessert einen Kanal für sich und verbindet nichts.",
  ),
});

export type ProblemId = "bounce" | "interaction" | "coordination";
export const PROBLEM_IDS: ProblemId[] = ["bounce", "interaction", "coordination"];
export const PROBLEM_LABEL = bi({
  bounce: t("Channels work in isolation", "Kanäle arbeiten isoliert"),
  interaction: t("Customer experience inconsistent", "Kundenerlebnis inkonsistent"),
  coordination: t("AI potential unused", "KI-Potenzial ungenutzt"),
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

export type Measure = {
  id: MeasureId;
  name: string;
  what: string;
  /** One concrete scene from OmniTech's day, and who does what (CLAUDE.md #46). */
  scene: string;
  who: string;
  area: MeasureArea;
  basis: string;
  joins: Joins;
  evidence: Evidence;
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
    name: t("One customer profile across all channels", "Ein Kundenprofil über alle Kanäle"),
    what: t("Website, shop, chat, sales and support write to one shared customer profile, and every channel reads from it.", "Website, Shop, Chat, Vertrieb und Support schreiben in ein gemeinsames Kundenprofil, und jeder Kanal liest daraus."),
    scene: t("A customer who configured licences online calls support three months later, and the agent sees the configurator entries, the offer and the contract on one screen.", "Ein Kunde, der online Lizenzen konfiguriert hat, ruft drei Monate später den Support an, und der Mitarbeiter sieht Konfigurator-Eingaben, Angebot und Vertrag auf einem Bildschirm."),
    who: t("IT builds the shared profile over twelve weeks; every channel team then reads from it and writes to it.", "Die IT baut das gemeinsame Profil in zwölf Wochen; danach liest und schreibt jedes Kanalteam darin."),
    area: "recognition" as MeasureArea,
    basis: t("Connects to all channels and the CRM; in use after 12 weeks.", "Verbunden mit allen Kanälen und dem CRM; in Betrieb nach 12 Wochen."),
    joins: "all" as Joins,
    cost: 80000,
    weeks: 12,
    targets: ["bounce", "interaction"] as ProblemId[],
    model: { feasibility: 3, effect: 3, note: t("It removes the cause of both breaks the customer feels: every channel sees the same customer, and says the same things about them.", "Es beseitigt die Ursache beider Brüche, die der Kunde spürt: Jeder Kanal sieht denselben Kunden und sagt dasselbe über ihn.") },
    verdict: t("A model measure: the foundation every other channel and every AI tool builds on.", "Eine Modellmaßnahme: die Grundlage, auf der jeder andere Kanal und jedes KI-Werkzeug aufbaut."),
  },
  {
    id: "handover" as MeasureId,
    name: t("Hand-over standard with a hand-over card", "Übergabestandard mit Übergabekarte"),
    what: t("At every switch from online to sales and from sales to support, a card with what the customer did so far goes with them, a named person takes over within four working hours, and the price and promises are copied, not retyped.", "Bei jedem Wechsel von online zum Vertrieb und vom Vertrieb zum Support geht eine Karte mit dem bisherigen Verlauf mit, eine benannte Person übernimmt innerhalb von vier Arbeitsstunden, und Preis und Zusagen werden übernommen, nicht neu getippt."),
    scene: t("A salesperson closes a deal and passes the customer to support with a card: what was bought, what was promised, and the named person who calls within four working hours.", "Ein Vertriebsmitarbeiter schließt einen Abschluss und übergibt den Kunden mit einer Karte an den Support: was gekauft wurde, was versprochen wurde und die namentlich genannte Person, die innerhalb von vier Arbeitsstunden anruft."),
    who: t("Sales and support agree the card once; the named person is always a person, never a queue.", "Vertrieb und Support einigen sich einmal auf die Karte; die genannte Person ist immer ein Mensch, nie eine Warteschlange."),
    area: "transition" as MeasureArea,
    basis: t("Connects to one other system (the CRM); in use after 4 weeks.", "Verbunden mit einem anderen System (dem CRM); in Betrieb nach 4 Wochen."),
    joins: "one" as Joins,
    cost: 25000,
    weeks: 4,
    targets: ["bounce", "interaction"] as ProblemId[],
    model: { feasibility: 3, effect: 3, note: t("It fixes the two critical transitions at once and works within a month; it lives in the CRM only, so integration 2.", "Es behebt die zwei kritischen Übergänge sofort und wirkt innerhalb eines Monats; es lebt nur im CRM, daher Integration 2.") },
    verdict: t("A model measure: the fastest fix for the breaks between channels.", "Eine Modellmaßnahme: die schnellste Korrektur für die Brüche zwischen Kanälen."),
  },
  {
    id: "predictive" as MeasureId,
    name: t("Predictive analytics in sales (B)", "Predictive Analytics im Vertrieb (B)"),
    what: t("A model reads the contacts of every channel and tells account managers each week which customers are likely to renew, to buy more or to leave.", "Ein Modell liest die Kontakte aller Kanäle und sagt Account Managern jede Woche, welche Kunden wahrscheinlich verlängern, mehr kaufen oder gehen."),
    scene: t("On Monday an account manager opens a list of three customers who are likely to leave, built from calls, chats and orders.", "Am Montag öffnet ein Account Manager eine Liste von drei Kunden, die wahrscheinlich gehen, gebaut aus Anrufen, Chats und Bestellungen."),
    who: t("A data team builds the model; account managers decide what to do with each name.", "Ein Datenteam baut das Modell; Account Manager entscheiden, was sie mit jedem Namen tun."),
    area: "ai" as MeasureArea,
    basis: t("Connects to all channels and the CRM; in use after 10 weeks.", "Verbunden mit allen Kanälen und dem CRM; in Betrieb nach 10 Wochen."),
    joins: "all" as Joins,
    cost: 50000,
    weeks: 10,
    targets: ["coordination"] as ProblemId[],
    model: { feasibility: 3, effect: 2, note: t("It is the AI tool that uses the joined-up data; its effect comes through the account managers who act on it, so effect 2.", "Es ist das KI-Werkzeug, das die verbundenen Daten nutzt; seine Wirkung kommt über die Account Manager, die danach handeln, daher Wirkung 2.") },
    verdict: t("A model measure: the only one that puts the unused AI potential to work on data from every channel.", "Eine Modellmaßnahme: die einzige, die das ungenutzte KI-Potenzial mit Daten aus jedem Kanal zum Einsatz bringt."),
  },
  {
    id: "chatbot" as MeasureId,
    name: t("Chatbot in customer service (A)", "Chatbot im Kundenservice (A)"),
    what: t("A chatbot answers common service questions at any hour and opens a ticket for the rest.", "Ein Chatbot beantwortet häufige Servicefragen zu jeder Zeit und eröffnet für den Rest ein Ticket."),
    scene: t("At 9 p.m. a customer asks how to add a user and gets the answer at once; a billing question becomes a ticket for the next morning.", "Um 21 Uhr fragt ein Kunde, wie er einen Nutzer hinzufügt, und bekommt die Antwort sofort; eine Abrechnungsfrage wird ein Ticket für den nächsten Morgen."),
    who: t("Service writes the answers; the chatbot talks to customers; service agents work the tickets it opens.", "Der Service schreibt die Antworten; der Chatbot spricht mit den Kunden; Service-Mitarbeiter bearbeiten die Tickets, die er eröffnet."),
    area: "ai" as MeasureArea,
    basis: t("Connects to one other system (the ticket system); in use after 8 weeks.", "Verbunden mit einem anderen System (dem Ticketsystem); in Betrieb nach 8 Wochen."),
    joins: "one" as Joins,
    cost: 40000,
    weeks: 8,
    targets: ["coordination"] as ProblemId[],
    model: { feasibility: 3, effect: 2, note: t("Useful and scalable, but it sees only tickets, not the contract or the sales history, so customers still repeat themselves at the next step.", "Nützlich und skalierbar, aber er sieht nur Tickets, nicht Vertrag oder Vertriebshistorie, also wiederholen sich Kunden beim nächsten Schritt immer noch.") },
    verdict: t("Not in the model three: 12 points. Better once it can read the shared profile.", "Nicht unter den drei Modellmaßnahmen: 12 Punkte. Besser, sobald er das gemeinsame Profil lesen kann."),
  },
  {
    id: "offers" as MeasureId,
    name: t("Personalised offers by e-mail (C)", "Personalisierte Angebote per E-Mail (C)"),
    what: t("Customers get offers chosen from what they bought in the web shop.", "Kunden bekommen Angebote, die aus ihren Käufen im Webshop ausgewählt werden."),
    scene: t("A customer who bought backup in the web shop gets an e-mail with the archive add-on that goes with it.", "Ein Kunde, der im Webshop Backup gekauft hat, bekommt eine E-Mail mit dem dazu passenden Archiv-Add-on."),
    who: t("Marketing sets the rules; the shop's purchase data picks the offer for each customer.", "Das Marketing legt die Regeln fest; die Kaufdaten des Shops wählen für jeden Kunden das Angebot."),
    area: "ai" as MeasureArea,
    basis: t("Connects to one other system (the shop); in use after 6 weeks.", "Verbunden mit einem anderen System (dem Shop); in Betrieb nach 6 Wochen."),
    joins: "one" as Joins,
    cost: 45000,
    weeks: 6,
    targets: ["coordination"] as ProblemId[],
    model: { feasibility: 3, effect: 2, note: t("It knows the shop but not the sales talks or the support tickets, so an offer can contradict what sales just agreed.", "Es kennt den Shop, aber nicht die Vertriebsgespräche oder Support-Tickets, also kann ein Angebot dem widersprechen, was der Vertrieb gerade vereinbart hat.") },
    verdict: t("Not in the model three: 12 points. Personalisation on one channel's data can deepen the inconsistency.", "Nicht unter den drei Modellmaßnahmen: 12 Punkte. Personalisierung auf den Daten eines Kanals kann die Inkonsistenz vertiefen."),
  },
  {
    id: "app" as MeasureId,
    name: t("A new customer app", "Eine neue Kunden-App"),
    what: t("An app with news, the product catalogue and a contact form.", "Eine App mit Neuigkeiten, dem Produktkatalog und einem Kontaktformular."),
    scene: t("A customer installs the app, reads company news and can open a contact form; the app does not show their contract or their tickets.", "Ein Kunde installiert die App, liest Firmen-Neuigkeiten und kann ein Kontaktformular öffnen; die App zeigt weder seinen Vertrag noch seine Tickets."),
    who: t("An agency builds the app; nobody connects it to the CRM or the ticket system.", "Eine Agentur baut die App; niemand verbindet sie mit dem CRM oder dem Ticketsystem."),
    area: "channel" as MeasureArea,
    basis: t("Connects to nothing: it stands alone; in use after 16 weeks.", "Mit nichts verbunden: steht allein; in Betrieb nach 16 Wochen."),
    joins: "none" as Joins,
    cost: 90000,
    weeks: 16,
    targets: [] as ProblemId[],
    model: { feasibility: 3, effect: 2, note: t("One more channel that knows nothing about the others: the multichannel trap.", "Ein weiterer Kanal, der nichts über die anderen weiß: die Multichannel-Falle.") },
    verdict: t("Rejected: 6 points. It adds a channel instead of connecting them.", "Verworfen: 6 Punkte. Sie fügt einen Kanal hinzu, statt sie zu verbinden."),
  },
  {
    id: "suite" as MeasureId,
    name: t("Replace every system with one omnichannel suite", "Jedes System durch eine Omnichannel-Suite ersetzen"),
    what: t("A vendor suite replaces the shop, the CRM, the ticket system and the chat at once.", "Eine Anbieter-Suite ersetzt Shop, CRM, Ticketsystem und Chat auf einmal."),
    scene: t("For thirty weeks the shop, the CRM, the ticket system and the chat are replaced at once, and every channel runs half old and half new.", "Dreißig Wochen lang werden Shop, CRM, Ticketsystem und Chat auf einmal ersetzt, und jeder Kanal läuft halb alt und halb neu."),
    who: t("A vendor configures and migrates; OmniTech's teams retrain and keep the business running meanwhile.", "Ein Anbieter konfiguriert und migriert; die Teams von OmniTech lernen um und halten währenddessen das Geschäft am Laufen."),
    area: "recognition" as MeasureArea,
    basis: t("Connects to all channels and the CRM; in use after 30 weeks.", "Verbunden mit allen Kanälen und dem CRM; in Betrieb nach 30 Wochen."),
    joins: "all" as Joins,
    cost: 180000,
    weeks: 30,
    targets: ["bounce", "interaction"] as ProblemId[],
    model: { feasibility: 2, effect: 1, note: t("Fully integrated on paper, but in use only after 30 weeks, beyond the six months, and every team has to be retrained.", "Auf dem Papier voll integriert, aber erst nach 30 Wochen in Betrieb, nach den sechs Monaten, und jedes Team muss neu geschult werden.") },
    verdict: t("Rejected: 6 points. Nothing changes for customers within the six months, and it takes most of the budget.", "Verworfen: 6 Punkte. Für Kunden ändert sich in den sechs Monaten nichts, und sie nimmt den Großteil des Budgets."),
  },
  {
    id: "dashboards" as MeasureId,
    name: t("A separate dashboard for each channel team", "Ein eigenes Dashboard für jedes Kanalteam"),
    what: t("Web, sales, chat and support each get their own dashboard with their own KPIs.", "Web, Vertrieb, Chat und Support bekommen je ein eigenes Dashboard mit eigenen KPIs."),
    scene: t("On Monday web, sales, chat and support each report their own numbers from their own screen, and the numbers do not add up.", "Am Montag berichten Web, Vertrieb, Chat und Support jeweils ihre eigenen Zahlen von ihrem eigenen Bildschirm, und die Zahlen passen nicht zusammen."),
    who: t("Each team builds or buys its own dashboard with its own definitions.", "Jedes Team baut oder kauft sein eigenes Dashboard mit eigenen Definitionen."),
    area: "channel" as MeasureArea,
    basis: t("Connects to nothing: each dashboard stands alone; in use after 3 weeks.", "Mit nichts verbunden: Jedes Dashboard steht allein; in Betrieb nach 3 Wochen."),
    joins: "none" as Joins,
    cost: 20000,
    weeks: 3,
    targets: [] as ProblemId[],
    model: { feasibility: 3, effect: 1, note: t("It measures each channel on its own and so keeps them working in isolation.", "Es misst jeden Kanal für sich und hält sie so in ihrer Isolation.") },
    verdict: t("Rejected: 3 points. Cross-channel KPIs are what the brief needs.", "Verworfen: 3 Punkte. Kanalübergreifende KPIs sind, was der Auftrag braucht."),
  },
  {
    id: "hotline" as MeasureId,
    name: t("Three more people at the hotline", "Drei zusätzliche Personen an der Hotline"),
    what: t("The hotline gets three more staff to shorten waiting times.", "Die Hotline bekommt drei zusätzliche Mitarbeitende, um Wartezeiten zu verkürzen."),
    scene: t("A customer waits three minutes instead of eight on the hotline, but the agent still cannot see the customer's online request.", "Ein Kunde wartet an der Hotline drei statt acht Minuten, aber der Mitarbeiter sieht die Online-Anfrage des Kunden immer noch nicht."),
    who: t("HR hires three people; the hotline works as before.", "Die Personalabteilung stellt drei Personen ein; die Hotline arbeitet wie zuvor."),
    area: "channel" as MeasureArea,
    basis: t("Connects to nothing: the hotline has no access to the other systems; in use after 4 weeks.", "Mit nichts verbunden: Die Hotline hat keinen Zugriff auf die anderen Systeme; in Betrieb nach 4 Wochen."),
    joins: "none" as Joins,
    cost: 60000,
    weeks: 4,
    targets: [] as ProblemId[],
    model: { feasibility: 1, effect: 2, note: t("Shorter queues, but the new staff do not see the customer's history either, and it grows only with people.", "Kürzere Warteschlangen, aber auch die neuen Mitarbeitenden sehen die Historie des Kunden nicht, und es wächst nur mit Personal.") },
    verdict: t("Rejected: 2 points.", "Verworfen: 2 Punkte."),
  },
]);
for (const m of RAW) MEASURES.push(Object.assign(m, { evidence: bandOf(m.joins) }) as Measure);

export const MEASURE_BY_ID = Object.fromEntries(MEASURES.map((m) => [m.id, m])) as Record<MeasureId, Measure>;
export const MEASURE_IDS = MEASURES.map((m) => m.id);
export const CHOOSE = 3;
export const modelScore = (id: MeasureId) => {
  const m = MEASURE_BY_ID[id];
  return explainBucket(m.evidence) * m.model.feasibility * m.model.effect;
};
export const MODEL_MEASURES: MeasureId[] = ["unified", "handover", "predictive"];
export const MODEL_COST = MODEL_MEASURES.reduce((s, id) => s + MEASURE_BY_ID[id].cost, 0);
