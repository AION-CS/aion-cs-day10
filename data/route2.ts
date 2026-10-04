import { bi, t } from "@/lib/lang";

/**
 * Route 2 (Level 3) data: the Transfer Project. OmniTech's Chief Digital Officer builds an integrated customer system with budget
 * restrictions, a complex system landscape and high time pressure, while competitors are technologically ahead, and makes an investment
 * decision despite unclear success prospects. Every figure is a Case assumption (the plan gives the role, the situation and the
 * constraints, not numbers). (Identifiers keep the names of the file this was built from: a "source" is an omnichannel process, a
 * "component" is a KPI candidate, a "situation" is an AI tool test, `complete` is the share of a process's steps whose data reaches the
 * shared customer profile.)
 */
export const R2_BUDGET = 280000;
export const R2_MONTHS = 6;
export type Bucket = 1 | 2 | 3;

/* ------------------------------------------------------------------ 3.1 · target vision of an integrated customer system */

export type PrincipleId = "defs" | "rules" | "owners" | "review" | "hoard" | "blackbox";
export const PRINCIPLE_IDS: PrincipleId[] = ["defs", "rules", "owners", "review", "hoard", "blackbox"];
export const PRINCIPLES = bi({
  defs: { id: "defs" as PrincipleId, name: t("One customer profile shared by every channel", "Ein Kundenprofil, das jeder Kanal teilt"), means: t("Website, shop, chat, sales and support read and write the same profile, so every channel knows what the customer did before.", "Website, Shop, Chat, Vertrieb und Support lesen und schreiben dasselbe Profil, sodass jeder Kanal weiß, was der Kunde vorher getan hat.") },
  rules: { id: "rules" as PrincipleId, name: t("Every channel transition has a hand-over standard and an owner", "Jeder Kanalübergang hat einen Übergabestandard und einen Owner"), means: t("For each switch it is written down what travels with the customer, who takes over and by when, and which price and promises hold.", "Für jeden Wechsel ist festgelegt, was mit dem Kunden mitgeht, wer übernimmt und bis wann, und welcher Preis und welche Zusagen gelten.") },
  owners: { id: "owners" as PrincipleId, name: t("Every cross-channel KPI has an owner who can move it", "Jeder kanalübergreifende KPI hat einen Owner, der ihn bewegen kann"), means: t("Someone answers for each number across channels and has the means to change it.", "Jemand steht für jede kanalübergreifende Zahl ein und hat die Mittel, sie zu ändern.") },
  review: { id: "review" as PrincipleId, name: t("A monthly review decides on every running measure across channels", "Ein monatliches Review entscheidet über jede laufende Maßnahme über alle Kanäle"), means: t("Every month the same few KPIs for every channel: what to roll out, what to keep testing, what to stop.", "Jeden Monat dieselben wenigen KPIs für jeden Kanal: was ausgerollt, was weiter getestet, was gestoppt wird.") },
  hoard: { id: "hoard" as PrincipleId, name: t("Open as many channels as possible; customers will choose", "So viele Kanäle wie möglich öffnen; Kunden wählen selbst"), means: t("An app, a chat, a hotline and social media everywhere, each run by its own team.", "Eine App, ein Chat, eine Hotline und Social Media überall, jeweils von einem eigenen Team betrieben.") },
  blackbox: { id: "blackbox" as PrincipleId, name: t("Replace every system with one suite before anything changes for customers", "Jedes System durch eine Suite ersetzen, bevor sich für Kunden etwas ändert"), means: t("Nothing is connected or improved until the new vendor platform runs everywhere.", "Nichts wird verbunden oder verbessert, bis die neue Anbieterplattform überall läuft.") },
});
/** An integrated system needs both: one shared profile (so every channel recognises the customer) and hand-over standards (so no transition is left to chance). */
export const PRINCIPLE_MUST: PrincipleId[] = ["defs", "rules"];
export const PRINCIPLE_TRAP: PrincipleId[] = ["hoard", "blackbox"];

/* ------------------------------------------------------------------ 3.2 · central omnichannel processes */

export type SourceId = "pricing" | "quote" | "chat" | "onboarding" | "social" | "renewal" | "blog" | "careers";
export const SOURCE_IDS: SourceId[] = ["pricing", "quote", "chat", "onboarding", "social", "renewal", "blog", "careers"];
export type Use = "core" | "later" | "leave";
export const USE_LABEL = bi({ core: t("Central: integrate now", "Zentral: jetzt integrieren"), later: t("Central: connect the data first", "Zentral: zuerst die Daten verbinden"), leave: t("Not central", "Nicht zentral") });
/** `decision` is the decision the customer takes in the process (null when none); `complete` is the share of its steps whose data reaches the shared profile. */
export type Source = { id: SourceId; name: string; decision: string | null; complete: number; cost: number };
export const SOURCES: Source[] = bi([
  { id: "pricing" as SourceId, name: t("Online enquiry → sales offer", "Online-Anfrage → Angebot des Vertriebs"), decision: t("Buy, or drop out", "Kaufen, oder abspringen"), complete: 88, cost: 15000 },
  { id: "quote" as SourceId, name: t("Offer → contract signature", "Angebot → Vertragsunterschrift"), decision: t("Sign, or not", "Unterschreiben, oder nicht"), complete: 92, cost: 8000 },
  { id: "chat" as SourceId, name: t("Contract → onboarding", "Vertrag → Onboarding"), decision: t("Start using the product, or not", "Das Produkt zu nutzen beginnen, oder nicht"), complete: 81, cost: 12000 },
  { id: "onboarding" as SourceId, name: t("Service request across chat, hotline and ticket", "Serviceanfrage über Chat, Hotline und Ticket"), decision: t("Stay, or start looking elsewhere", "Bleiben, oder anfangen, sich umzusehen"), complete: 55, cost: 20000 },
  { id: "social" as SourceId, name: t("Renewal talk → renewal offer", "Verlängerungsgespräch → Verlängerungsangebot"), decision: t("Renew, or cancel", "Verlängern, oder kündigen"), complete: 60, cost: 14000 },
  { id: "renewal" as SourceId, name: t("Upgrade in the web shop", "Upgrade im Webshop"), decision: t("Buy more, or not", "Mehr kaufen, oder nicht"), complete: 45, cost: 10000 },
  { id: "blog" as SourceId, name: t("Newsletter sending", "Newsletter-Versand"), decision: null, complete: 95, cost: 5000 },
  { id: "careers" as SourceId, name: t("Job applications", "Bewerbungen"), decision: null, complete: 99, cost: 3000 },
]);
export const SOURCE_BY_ID = Object.fromEntries(SOURCES.map((s) => [s.id, s])) as Record<SourceId, Source>;
export const QUALITY_BAR = 80;
/** The rule of Materi B2: no customer decision in the process → not central; a decision and ≥ 80% of its data connected → integrate now; a decision but less connected → connect the data first. */
export const useOf = (s: Source): Use => (!s.decision ? "leave" : s.complete >= QUALITY_BAR ? "core" : "later");

/* ------------------------------------------------------------------ 3.3 · a KPI system for management */

export type CompId = "conv" | "cv" | "engage" | "nps" | "churn" | "emails" | "followers" | "stories";
export const COMP_IDS: CompId[] = ["conv", "cv", "engage", "nps", "churn", "emails", "followers", "stories"];
export type Criterion = "explain" | "timely" | "reach" | "scale";
export const CRIT_IDS: Criterion[] = ["explain", "timely", "reach", "scale"];
export const CRITERIA = bi([
  { id: "explain" as Criterion, name: t("Link to value", "Verbindung zum Wert"), test: t("Does it move with deals, revenue or customers kept?", "Bewegt er sich mit Abschlüssen, Umsatz oder gehaltenen Kunden?"), low: t("It counts our activity or reach.", "Er zählt unsere Aktivität oder Reichweite."), high: t("It is, or leads directly to, deals or customers kept.", "Er ist Abschlüsse oder gehaltene Kunden, oder führt direkt dazu.") },
  { id: "timely" as Criterion, name: t("Early", "Früh"), test: t("How early does it show a change, before the deal is lost?", "Wie früh zeigt er eine Veränderung, bevor der Abschluss verloren ist?"), low: t("After the customer has left, or twice a year.", "Nachdem der Kunde gegangen ist, oder zweimal im Jahr."), high: t("Daily or faster.", "Täglich oder schneller.") },
  { id: "reach" as Criterion, name: t("Reach", "Reichweite"), test: t("Does it cover every customer, in every channel?", "Deckt er jeden Kunden ab, in jedem Kanal?"), low: t("Some customers only.", "Nur einige Kunden."), high: t("Every customer.", "Jeden Kunden.") },
  { id: "scale" as Criterion, name: t("Measured automatically", "Automatisch gemessen"), test: t("Is it counted by the systems, without anyone collecting it?", "Wird er von den Systemen gezählt, ohne dass jemand ihn sammelt?"), low: t("Someone collects it by hand each time.", "Jemand sammelt ihn jedes Mal von Hand."), high: t("The systems count it by themselves.", "Die Systeme zählen ihn selbst.") },
]);
export type Cadence = "weekly" | "monthly" | "after" | "halfyear";
export type CostShape = "one-off" | "per customer" | "per analysis";
export type Comp = { id: CompId; name: string; what: string; explains: boolean; cadence: Cadence; coversAll: boolean; costShape: CostShape; model: Record<Criterion, Bucket>; note: string };
export const CADENCE_LABEL = bi({ weekly: t("daily", "täglich"), monthly: t("monthly", "monatlich"), after: t("after the customer has left", "nachdem der Kunde gegangen ist"), halfyear: t("twice a year", "zweimal im Jahr") });
export const COST_SHAPE_LABEL = bi({ "one-off": t("counted by the systems", "von den Systemen gezählt"), "per customer": t("by a survey", "über eine Befragung"), "per analysis": t("collected by hand", "von Hand gesammelt") });
export const LINK_LABEL = bi({ yes: t("linked to value", "mit dem Wert verbunden"), no: t("not linked to value", "nicht mit dem Wert verbunden") });
export const COMPS: Comp[] = bi([
  { id: "conv" as CompId, name: t("Cross-channel deal rate", "Kanalübergreifende Abschlussquote"), what: t("Deals ÷ journeys that switch channels.", "Abschlüsse ÷ kanalwechselnde Journeys."), explains: true, cadence: "weekly" as Cadence, coversAll: true, costShape: "one-off" as CostShape, model: { explain: 3, timely: 3, reach: 3, scale: 3 }, note: t("The result across channels, counted daily from the shared profile.", "Das Ergebnis über alle Kanäle, täglich aus dem gemeinsamen Profil gezählt.") },
  { id: "cv" as CompId, name: t("Share of hand-overs that carry the history", "Anteil der Übergaben, die die Historie mitnehmen"), what: t("Hand-overs in which the next channel sees what the customer did before, ÷ all hand-overs.", "Übergaben, bei denen der nächste Kanal sieht, was der Kunde vorher getan hat, ÷ alle Übergaben."), explains: true, cadence: "weekly" as Cadence, coversAll: true, costShape: "one-off" as CostShape, model: { explain: 3, timely: 3, reach: 3, scale: 3 }, note: t("The driver the brief names (systems not integrated): it moves as soon as a transition is connected, and last year's data link it to deals.", "Der Treiber, den der Auftrag nennt (Systeme nicht integriert): Er bewegt sich, sobald ein Übergang verbunden ist, und die Daten des letzten Jahres verbinden ihn mit Abschlüssen.") },
  { id: "engage" as CompId, name: t("Share of customers who repeat their information", "Anteil der Kunden, die ihre Angaben wiederholen"), what: t("Customers asked again for what they already gave, at any hand-over.", "Kunden, die bei irgendeiner Übergabe erneut nach bereits Gesagtem gefragt werden."), explains: true, cadence: "weekly" as Cadence, coversAll: true, costShape: "one-off" as CostShape, model: { explain: 3, timely: 3, reach: 3, scale: 3 }, note: t("The inconsistent experience the customer feels, in one number; it falls the day a transition is fixed.", "Das inkonsistente Erlebnis, das der Kunde spürt, in einer Zahl; sie fällt am Tag, an dem ein Übergang behoben ist.") },
  { id: "nps" as CompId, name: t("Customer experience score from a survey", "Kundenerlebnis-Wert aus einer Befragung"), what: t("How customers rate their experience; about 20% answer.", "Wie Kunden ihr Erlebnis bewerten; etwa 20 % antworten."), explains: true, cadence: "halfyear" as Cadence, coversAll: false, costShape: "per customer" as CostShape, model: { explain: 3, timely: 1, reach: 2, scale: 2 }, note: t("Linked to value, but twice a year is too slow to steer six months by.", "Mit dem Wert verbunden, aber zweimal im Jahr ist zu langsam, um sechs Monate danach zu steuern.") },
  { id: "churn" as CompId, name: t("Cancellations per quarter", "Kündigungen pro Quartal"), what: t("Customers who cancelled in the quarter.", "Kunden, die im Quartal gekündigt haben."), explains: true, cadence: "after" as Cadence, coversAll: true, costShape: "one-off" as CostShape, model: { explain: 3, timely: 1, reach: 3, scale: 3 }, note: t("Counts the loss exactly, after it is too late to act.", "Zählt den Verlust genau, wenn es zu spät zum Handeln ist.") },
  { id: "emails" as CompId, name: t("Number of channels offered", "Zahl der angebotenen Kanäle"), what: t("Channels in which OmniTech can be reached.", "Kanäle, in denen OmniTech erreichbar ist."), explains: false, cadence: "weekly" as Cadence, coversAll: true, costShape: "one-off" as CostShape, model: { explain: 1, timely: 3, reach: 3, scale: 3 }, note: t("It rose from five to seven while the experience got more inconsistent: channels are not integration.", "Sie stieg von fünf auf sieben, während das Erlebnis inkonsistenter wurde: Kanäle sind keine Integration.") },
  { id: "followers" as CompId, name: t("App downloads", "App-Downloads"), what: t("Downloads of the customer app.", "Downloads der Kunden-App."), explains: false, cadence: "weekly" as Cadence, coversAll: false, costShape: "one-off" as CostShape, model: { explain: 1, timely: 3, reach: 2, scale: 3 }, note: t("Reach among whoever installed it, not how customers move between channels.", "Reichweite bei denen, die sie installiert haben, nicht wie Kunden zwischen Kanälen wechseln.") },
  { id: "stories" as CompId, name: t("Channel managers' monthly reports", "Monatsberichte der Kanalverantwortlichen"), what: t("Each month, every channel manager reports their channel's successes.", "Jeden Monat berichtet jede Kanalverantwortliche die Erfolge ihres Kanals."), explains: false, cadence: "monthly" as Cadence, coversAll: false, costShape: "per analysis" as CostShape, model: { explain: 1, timely: 2, reach: 2, scale: 1 }, note: t("Each channel reports on itself, so the breaks between channels never appear.", "Jeder Kanal berichtet über sich selbst, also tauchen die Brüche zwischen Kanälen nie auf.") },
]);
export const COMP_BY_ID = Object.fromEntries(COMPS.map((c) => [c.id, c])) as Record<CompId, Comp>;
export const COMP_CHOOSE = 3;
export const MODEL_COMPS: CompId[] = ["conv", "cv", "engage"];
export const MODEL_GREATEST: CompId = "cv";
export function maxRating(id: CompId, c: Criterion): Bucket {
  const x = COMP_BY_ID[id];
  if (c === "explain") return x.explains ? 3 : 1;
  if (c === "timely") return x.cadence === "weekly" ? 3 : x.cadence === "monthly" ? 2 : 1;
  if (c === "reach") return x.coversAll ? 3 : 2;
  return x.costShape === "one-off" ? 3 : x.costShape === "per customer" ? 2 : 1;
}
export const isEarly = (id: CompId) => COMP_BY_ID[id].cadence === "weekly" || COMP_BY_ID[id].cadence === "monthly";

/* ------------------------------------------------------------------ 3.4 · the optimisation loop: roll out, keep testing, stop */

export type SitId = "reco" | "renewal" | "botname" | "subject" | "price" | "winback";
export const SIT_IDS: SitId[] = ["reco", "renewal", "botname", "subject", "price", "winback"];
export type Action = "intervene" | "watch" | "none";
export const ACTION_LABEL = bi({ intervene: t("Roll out", "Ausrollen"), watch: t("Keep testing", "Weiter testen"), none: t("Stop", "Stoppen") });
export type LogicOwner = "csm" | "sales" | "data" | "nobody";
export const LOGIC_OWNERS: LogicOwner[] = ["csm", "sales", "data", "nobody"];
export const LOGIC_OWNER_LABEL = bi({ csm: t("Service", "Service"), sales: t("Sales", "Vertrieb"), data: t("Data team", "Datenteam"), nobody: t("No one (stopped)", "Niemand (gestoppt)") });
export type Situation = { id: SitId; signal: string; lift: number; cases: number; revenue: number; note: string };
export const SITUATIONS: Situation[] = bi([
  { id: "reco" as SitId, signal: t("Chatbot that reads the shared customer profile", "Chatbot, der das gemeinsame Kundenprofil liest"), lift: 40, cases: 170, revenue: 150000, note: t("Repeated information after a bot hand-over fell by half.", "Wiederholte Angaben nach einer Bot-Übergabe halbierten sich.") },
  { id: "renewal" as SitId, signal: t("Renewal-risk prediction for account managers", "Vorhersage des Verlängerungsrisikos für Account Manager"), lift: 25, cases: 40, revenue: 70000, note: t("Few renewals fell in the test months.", "In den Testmonaten fielen wenige Verlängerungen an.") },
  { id: "botname" as SitId, signal: t("Chatbot with a human name and photo", "Chatbot mit menschlichem Namen und Foto"), lift: 1, cases: 600, revenue: 3000, note: t("Many chats, almost no difference.", "Viele Chats, fast kein Unterschied.") },
  { id: "subject" as SitId, signal: t("Personalised offers from shop data only", "Personalisierte Angebote nur aus Shopdaten"), lift: 6, cases: 300, revenue: 30000, note: t("A small, steady difference; two offers contradicted what sales had agreed.", "Ein kleiner, stabiler Unterschied; zwei Angebote widersprachen dem, was der Vertrieb vereinbart hatte.") },
  { id: "price" as SitId, signal: t("AI-generated price per customer", "KI-generierter Preis pro Kunde"), lift: -6, cases: 150, revenue: -20000, note: t("Four complaints that the shop and sales showed different prices.", "Vier Beschwerden, dass Shop und Vertrieb verschiedene Preise zeigten.") },
  { id: "winback" as SitId, signal: t("Next-best offer for account managers from all channels' data", "Next-best-Offer für Account Manager aus den Daten aller Kanäle"), lift: 30, cases: 120, revenue: 110000, note: t("Guardrail: no complaints about contradictory information.", "Guardrail: keine Beschwerden über widersprüchliche Informationen.") },
]);
export const SIT_BY_ID = Object.fromEntries(SITUATIONS.map((s) => [s.id, s])) as Record<SitId, Situation>;
export const LIFT_ACT = 10;
export const LIFT_WATCH = 3;
export const CASES_MIN = 100;
export const actionOf = (s: Situation): Action => (s.lift >= LIFT_ACT && s.cases >= CASES_MIN ? "intervene" : s.lift >= LIFT_WATCH ? "watch" : "none");
export const OWNER_ACCEPT_LOGIC: Record<SitId, LogicOwner[]> = { reco: ["csm"], renewal: ["data"], botname: ["nobody"], subject: ["data"], price: ["nobody"], winback: ["sales"] };
export type LogicRow = { action: Action | null; owner: LogicOwner | null };

/* ------------------------------------------------------------------ 3.5 · prioritised implementation architecture */

export type ArchId = "foundation" | "chat" | "personal" | "routing" | "training" | "tracking" | "suite" | "relaunch";
export const ARCH_IDS: ArchId[] = ["foundation", "chat", "personal", "routing", "training", "tracking", "suite", "relaunch"];
export type ArchItem = { id: ArchId; name: string; what: string; cost: number; weeks: number; blackBox: boolean };
export const ARCH: ArchItem[] = bi([
  { id: "foundation" as ArchId, name: t("Shared customer profile and cross-channel KPI system", "Gemeinsames Kundenprofil und kanalübergreifendes KPI-System"), what: t("Website, shop, chat, sales and support joined in one customer profile, with the three KPIs for every channel on one page.", "Website, Shop, Chat, Vertrieb und Support in einem Kundenprofil verbunden, mit den drei KPIs für jeden Kanal auf einer Seite."), cost: 80000, weeks: 12, blackBox: false },
  { id: "chat" as ArchId, name: t("Hand-over standard and hand-over card", "Übergabestandard und Übergabekarte"), what: t("What travels with the customer at each switch, who takes over within four working hours, and which price and promises hold.", "Was bei jedem Wechsel mit dem Kunden mitgeht, wer innerhalb von vier Arbeitsstunden übernimmt, und welcher Preis und welche Zusagen gelten."), cost: 25000, weeks: 4, blackBox: false },
  { id: "personal" as ArchId, name: t("Chatbot connected to the customer profile", "Chatbot mit Anbindung an das Kundenprofil"), what: t("Answers service questions from the customer's own contract and tickets, and hands over with the conversation attached.", "Beantwortet Servicefragen aus dem eigenen Vertrag und den Tickets des Kunden und übergibt mit angehängtem Gesprächsverlauf."), cost: 40000, weeks: 8, blackBox: false },
  { id: "routing" as ArchId, name: t("Predictive analytics for account managers", "Predictive Analytics für Account Manager"), what: t("A weekly list of customers likely to renew, buy more or leave, with the reasons shown.", "Eine wöchentliche Liste der Kunden, die wahrscheinlich verlängern, mehr kaufen oder gehen, mit sichtbaren Gründen."), cost: 50000, weeks: 10, blackBox: false },
  { id: "training" as ArchId, name: t("Omnichannel training for sales and service", "Omnichannel-Training für Vertrieb und Service"), what: t("How to read the profile, take over with the history and use the same prices and promises.", "Wie man das Profil liest, mit der Historie übernimmt und dieselben Preise und Zusagen nutzt."), cost: 20000, weeks: 3, blackBox: false },
  { id: "tracking" as ArchId, name: t("One price list and one set of promises for every channel", "Eine Preisliste und ein Satz Zusagen für jeden Kanal"), what: t("Prices, service times and data hosting written once and read by the website, the shop, the chat and sales.", "Preise, Servicezeiten und Datenhosting einmal festgelegt und von Website, Shop, Chat und Vertrieb gelesen."), cost: 25000, weeks: 6, blackBox: false },
  { id: "suite" as ArchId, name: t("All-in-one omnichannel AI suite", "All-in-one-Omnichannel-KI-Suite"), what: t("A vendor suite that replaces every system and decides offers and answers by itself; its rules and results are not shown.", "Eine Anbieter-Suite, die jedes System ersetzt und Angebote und Antworten selbst entscheidet; ihre Regeln und Ergebnisse werden nicht gezeigt."), cost: 180000, weeks: 30, blackBox: true },
  { id: "relaunch" as ArchId, name: t("A new customer app", "Eine neue Kunden-App"), what: t("An app with news, the catalogue and a contact form, not connected to the other systems.", "Eine App mit Neuigkeiten, Katalog und Kontaktformular, nicht mit den anderen Systemen verbunden."), cost: 90000, weeks: 16, blackBox: false },
]);
export const ARCH_BY_ID = Object.fromEntries(ARCH.map((a) => [a.id, a])) as Record<ArchId, ArchItem>;
/* ------------------------------------------------------------------ 3.6 · a decision under time pressure and uncertain data */

export type DecisionId = "commit" | "stage" | "wait";
export const DECISIONS = bi([
  { id: "commit" as DecisionId, label: t("Buy the all-in-one suite now and switch everything over", "Jetzt die All-in-one-Suite kaufen und alles umstellen"), detail: t("Replace every system with the vendor's omnichannel AI suite from month 1 to catch up with the competition in one step.", "Ab Monat 1 jedes System durch die Omnichannel-KI-Suite des Anbieters ersetzen, um in einem Schritt zum Wettbewerb aufzuschließen."), why: t("Bold, and it defends only if the suite works on OmniTech's complex landscape from day one.", "Mutig, und nur vertretbar, wenn die Suite vom ersten Tag an in der komplexen Landschaft von OmniTech funktioniert."), rejected: t("The suite is in use only after 30 weeks, it takes most of the budget, nobody can explain its decisions, and nothing changes for customers within the six months.", "Die Suite ist erst nach 30 Wochen in Betrieb, nimmt den Großteil des Budgets, niemand kann ihre Entscheidungen erklären, und in den sechs Monaten ändert sich für Kunden nichts.") },
  { id: "stage" as DecisionId, label: t("Invest now, in stages, and watch one figure", "Jetzt investieren, in Stufen, und eine Zahl beobachten"), detail: t("Start in month 1 with the shared profile, the hand-over standard and one price list; add the predictions once the hand-overs carry the history; scale only if the figure you watch moves.", "In Monat 1 mit gemeinsamem Profil, Übergabestandard und einer Preisliste starten; die Vorhersagen ergänzen, sobald die Übergaben die Historie mitnehmen; nur skalieren, wenn sich die Zahl, die Sie beobachten, bewegt."), why: t("It fixes the breaks customers feel within weeks, builds the AI on data that exists, and measures before it spends the rest.", "Es behebt die Brüche, die Kunden spüren, innerhalb von Wochen, baut die KI auf vorhandenen Daten auf und misst, bevor es den Rest ausgibt."), rejected: t("", "") },
  { id: "wait" as DecisionId, label: t("Wait until the success of omnichannel AI is proven", "Warten, bis der Erfolg von Omnichannel-KI bewiesen ist"), detail: t("Spend the six months on studies and vendor comparisons before any money is invested.", "Die sechs Monate mit Studien und Anbietervergleichen verbringen, bevor Geld investiert wird."), why: t("", ""), rejected: t("The brief asks for an investment decision despite unclear prospects, and competitors are already ahead. Waiting keeps every break in the journey for six more months, while the hand-overs could be fixed within weeks.", "Der Auftrag verlangt eine Investitionsentscheidung trotz unklarer Aussichten, und der Wettbewerb ist schon voraus. Warten hält jeden Bruch in der Journey sechs weitere Monate, obwohl die Übergaben in Wochen behoben werden könnten.") },
]);
export const MODEL_DECISION: DecisionId = "stage";

export type KpiId = "conv" | "engage" | "cv" | "dashboards" | "emails";
export const KPIS = bi([
  { id: "conv" as KpiId, label: t("Cross-channel deal rate", "Kanalübergreifende Abschlussquote"), unit: "%", baseline: 15, better: "up" as const, behaviour: true },
  { id: "engage" as KpiId, label: t("Share of customers who repeat their information", "Anteil der Kunden, die ihre Angaben wiederholen"), unit: "%", baseline: 45, better: "down" as const, behaviour: true },
  { id: "cv" as KpiId, label: t("Hours from online request to first contact", "Stunden von Online-Anfrage bis zum ersten Kontakt"), unit: t("hours", "Stunden"), baseline: 216, better: "down" as const, behaviour: false },
  { id: "dashboards" as KpiId, label: t("Channels offered", "Angebotene Kanäle"), unit: t("channels", "Kanäle"), baseline: 7, better: "up" as const, behaviour: false },
  { id: "emails" as KpiId, label: t("App downloads per month", "App-Downloads pro Monat"), unit: t("downloads", "Downloads"), baseline: 300, better: "up" as const, behaviour: false },
]);
export const KPI_BY_ID = Object.fromEntries(KPIS.map((k) => [k.id, k])) as Record<KpiId, (typeof KPIS)[number]>;
