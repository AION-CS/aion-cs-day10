import { bi, t } from "@/lib/lang";

/**
 * Task 1 · Blocks 2.1–2.3. Four kinds of metric (Materi A5) and twelve cross-channel metrics OmniTech reports today, each with whether it moved
 * together with customer value last year; the A/B test card of Block 2.3 (Materi A6). (Identifiers keep the names of the file this was
 * built from: a "pattern" is a kind of metric, a "record" is one metric, and the outcome "left" means "moved with customer value".)
 * Every figure is a Case assumption. `truth` is never printed outside the mentor answer key. Counts are 3/3/3/3.
 */
export type PatternId = "outcome" | "driver" | "guardrail" | "vanity";
export const PATTERN_IDS: PatternId[] = ["outcome", "driver", "guardrail", "vanity"];

export const PATTERNS = bi({
  outcome: {
    id: "outcome" as PatternId,
    label: t("Outcome KPI", "Outcome-KPI"),
    means: t("The result the business is paid for: closed deals, revenue, customers kept. It moves last.", "Das Ergebnis, für das das Unternehmen bezahlt wird: Abschlüsse, Umsatz, gehaltene Kunden. Es bewegt sich zuletzt."),
    shape: t("the top of the tree", "die Spitze des Baums"),
    test: t("Is it money, deals or customers won or kept?", "Ist es Geld, Abschlüsse oder gewonnene oder gehaltene Kunden?"),
  },
  driver: {
    id: "driver" as PatternId,
    label: t("Driver KPI", "Treiber-KPI"),
    means: t("Something that comes before the result and that a team can move this month: how fast a hand-over happens, whether the next channel sees the history, how many customers use more than one channel.", "Etwas, das vor dem Ergebnis kommt und das ein Team diesen Monat bewegen kann: wie schnell eine Übergabe passiert, ob der nächste Kanal die Historie sieht, wie viele Kunden mehr als einen Kanal nutzen."),
    shape: t("a branch under the top", "ein Ast unter der Spitze"),
    test: t("Does it come before the deal or the renewal, and can a team change it this month?", "Kommt es vor dem Abschluss oder der Verlängerung, und kann ein Team es diesen Monat ändern?"),
  },
  guardrail: {
    id: "guardrail" as PatternId,
    label: t("Guardrail", "Guardrail (Leitplanke)"),
    means: t("Something that must not get worse while you connect channels and use data: customers who repeat themselves, contradictory answers, customers who withdraw their consent.", "Etwas, das nicht schlechter werden darf, während Sie Kanäle verbinden und Daten nutzen: Kunden, die sich wiederholen müssen, widersprüchliche Antworten, Kunden, die ihre Einwilligung zurückziehen."),
    shape: t("a fence beside the tree", "ein Zaun neben dem Baum"),
    test: t("Would you stop a measure if this got worse, even while deals rise?", "Würden Sie eine Maßnahme stoppen, wenn das schlechter wird, auch wenn die Abschlüsse steigen?"),
  },
  vanity: {
    id: "vanity" as PatternId,
    label: t("Vanity metric", "Vanity Metric"),
    means: t("Counts our own activity or reach: channels offered, app downloads, bot conversations. Looks like progress, decides nothing.", "Zählt unsere eigene Aktivität oder Reichweite: angebotene Kanäle, App-Downloads, Bot-Gespräche. Sieht nach Fortschritt aus, entscheidet nichts."),
    shape: t("outside the tree", "außerhalb des Baums"),
    test: t("Does it count what we did or how many passed by, rather than what customers did?", "Zählt es, was wir taten oder wie viele vorbeikamen, statt was Kunden taten?"),
  },
});

export const PATTERN_PAIR_TESTS = bi([
  { pair: t("Outcome or driver?", "Outcome oder Treiber?"), test: t("Ask whether it is the result itself (money, deals, customers kept) or something that leads to it. The result moves last; the driver moves first.", "Fragen Sie, ob es das Ergebnis selbst ist (Geld, Abschlüsse, gehaltene Kunden) oder etwas, das dazu führt. Das Ergebnis bewegt sich zuletzt; der Treiber zuerst.") },
  { pair: t("Driver or vanity?", "Treiber oder Vanity?"), test: t("Channels, downloads and bot conversations rise without anyone buying. A driver is closer to the deal: a hand-over that carries the history, a first contact within hours.", "Kanäle, Downloads und Bot-Gespräche steigen, ohne dass jemand kauft. Ein Treiber ist näher am Abschluss: eine Übergabe, die die Historie mitnimmt, ein erster Kontakt innerhalb von Stunden.") },
  { pair: t("Guardrail or driver?", "Guardrail oder Treiber?"), test: t("A driver is pushed; a guardrail is only watched so that it does not get worse. You would never set a target to raise the share of customers who repeat themselves.", "Ein Treiber wird vorangetrieben; eine Guardrail wird nur beobachtet, damit sie nicht schlechter wird. Niemand setzt ein Ziel, den Anteil der Kunden zu erhöhen, die sich wiederholen müssen.") },
]);

export type RecId = "p01" | "p02" | "p03" | "p04" | "p05" | "p06" | "p07" | "p08" | "p09" | "p10" | "p11" | "p12";
/** outcome "left" = moved with customer value last year; "stayed" = did not move with it. */
export type Record_ = { id: RecId; code: string; text: string; outcome: "stayed" | "left"; truth: PatternId; clue: string; why: string; rejected: Partial<Record<PatternId, string>> };
export const OUTCOME_LABEL = bi({ stayed: t("Did not move with customer value", "Bewegte sich nicht mit dem Kundenwert"), left: t("Moved with customer value", "Bewegte sich mit dem Kundenwert") });

export const RECORDS: Record_[] = bi([
  { id: "p01" as RecId, code: "M-01", outcome: "left" as const, text: t("Deal rate of journeys that switch channels: deals ÷ journeys.", "Abschlussquote kanalwechselnder Journeys: Abschlüsse ÷ Journeys."), truth: "outcome" as PatternId, clue: t("Does it count deals, or something that comes before a deal?", "Zählt es Abschlüsse, oder etwas, das vor einem Abschluss kommt?"), why: t("It counts deals, the result OmniTech is paid for: an outcome KPI.", "Es zählt Abschlüsse, das Ergebnis, für das OmniTech bezahlt wird: ein Outcome-KPI."), rejected: { driver: t("A hand-over comes before a deal; this one counts the deal itself.", "Eine Übergabe kommt vor einem Abschluss; diese zählt den Abschluss selbst.") } },
  { id: "p02" as RecId, code: "M-02", outcome: "left" as const, text: t("Revenue per customer across all channels, per year.", "Umsatz pro Kunde über alle Kanäle, pro Jahr."), truth: "outcome" as PatternId, clue: t("Is this money, or a behaviour that may lead to money?", "Ist das Geld, oder ein Verhalten, das zu Geld führen kann?"), why: t("Revenue is money: an outcome KPI, and it moves last.", "Umsatz ist Geld: ein Outcome-KPI, und er bewegt sich zuletzt."), rejected: { driver: t("Nobody can raise revenue per customer this month directly; it follows the drivers.", "Niemand kann den Umsatz pro Kunde diesen Monat direkt erhöhen; er folgt den Treibern.") } },
  { id: "p03" as RecId, code: "M-03", outcome: "left" as const, text: t("Share of customers who renew their contract.", "Anteil der Kunden, die ihren Vertrag verlängern."), truth: "outcome" as PatternId, clue: t("Customers kept: result or step on the way?", "Gehaltene Kunden: Ergebnis oder Schritt auf dem Weg?"), why: t("Customers kept are a result: an outcome KPI.", "Gehaltene Kunden sind ein Ergebnis: ein Outcome-KPI."), rejected: { guardrail: t("Renewals are pushed up, not only watched.", "Verlängerungen werden nach oben getrieben, nicht nur beobachtet.") } },
  { id: "p04" as RecId, code: "M-04", outcome: "left" as const, text: t("Share of hand-overs in which the next channel sees the customer's history.", "Anteil der Übergaben, bei denen der nächste Kanal die Historie des Kunden sieht."), truth: "driver" as PatternId, clue: t("Does it come before the deal, and can a team move it this month?", "Kommt es vor dem Abschluss, und kann ein Team es diesen Monat bewegen?"), why: t("A hand-over that carries the history comes before the deal, and the teams can raise it: a driver KPI.", "Eine Übergabe, die die Historie mitnimmt, kommt vor dem Abschluss, und die Teams können sie steigern: ein Treiber-KPI."), rejected: { vanity: t("It is not reach or activity; it decides whether the customer has to start again.", "Es ist keine Reichweite oder Aktivität; es entscheidet, ob der Kunde von vorn anfangen muss.") } },
  { id: "p05" as RecId, code: "M-05", outcome: "left" as const, text: t("Hours from an online request to the first contact by sales.", "Stunden von einer Online-Anfrage bis zum ersten Kontakt durch den Vertrieb."), truth: "driver" as PatternId, clue: t("A step on the way to a deal that a team controls. Is it the deal?", "Ein Schritt auf dem Weg zum Abschluss, den ein Team steuert. Ist es der Abschluss?"), why: t("The speed of the hand-over comes before the deal and sales can change it: a driver KPI.", "Das Tempo der Übergabe kommt vor dem Abschluss, und der Vertrieb kann es ändern: ein Treiber-KPI."), rejected: { outcome: t("A fast first contact is not yet a deal.", "Ein schneller erster Kontakt ist noch kein Abschluss.") } },
  { id: "p06" as RecId, code: "M-06", outcome: "stayed" as const, text: t("Share of customers who use two or more channels.", "Anteil der Kunden, die zwei oder mehr Kanäle nutzen."), truth: "driver" as PatternId, clue: t("Tag what it measures, not whether it moved. Whose behaviour is it?", "Ordnen Sie zu, was es misst, nicht ob es sich bewegte. Wessen Verhalten ist es?"), why: t("How customers move between channels is a customer behaviour before the deal that OmniTech can influence: a driver KPI. It did not move with value last year, which is a finding, not another kind.", "Wie Kunden zwischen Kanälen wechseln, ist ein Kundenverhalten vor dem Abschluss, das OmniTech beeinflussen kann: ein Treiber-KPI. Es bewegte sich letztes Jahr nicht mit dem Wert; das ist ein Befund, keine andere Art."), rejected: { vanity: t("Customers do it, not OmniTech; that makes it more than reach.", "Kunden tun es, nicht OmniTech; das macht es zu mehr als Reichweite.") } },
  { id: "p07" as RecId, code: "M-07", outcome: "left" as const, text: t("Share of customers who have to repeat their information at a hand-over.", "Anteil der Kunden, die bei einer Übergabe ihre Angaben wiederholen müssen."), truth: "guardrail" as PatternId, clue: t("Would anyone set a target to raise it, or only watch that it does not rise?", "Würde jemand ein Ziel setzen, es zu erhöhen, oder nur darauf achten, dass es nicht steigt?"), why: t("Repeating yourself is the clearest sign of a broken omnichannel experience: a guardrail.", "Sich wiederholen zu müssen ist das deutlichste Zeichen eines gebrochenen Omnichannel-Erlebnisses: eine Guardrail."), rejected: { driver: t("Nobody pushes repetitions up; you watch them as a limit.", "Niemand treibt Wiederholungen nach oben; man beobachtet sie als Grenze.") } },
  { id: "p08" as RecId, code: "M-08", outcome: "stayed" as const, text: t("Complaints about contradictory information per 1,000 contacts.", "Beschwerden über widersprüchliche Informationen pro 1.000 Kontakte."), truth: "guardrail" as PatternId, clue: t("If this rose while deals rose, would you stop?", "Würden Sie stoppen, wenn das stiege, während die Abschlüsse steigen?"), why: t("A limit on consistency: when channels contradict each other, trust goes. A guardrail.", "Eine Grenze für die Konsistenz: Widersprechen sich Kanäle, geht Vertrauen verloren. Eine Guardrail."), rejected: { outcome: t("It is not the result OmniTech is paid for; it is what must not get worse.", "Es ist nicht das Ergebnis, für das OmniTech bezahlt wird; es ist, was nicht schlechter werden darf.") } },
  { id: "p09" as RecId, code: "M-09", outcome: "stayed" as const, text: t("Customers who withdraw their consent to data use, per month.", "Kunden, die ihre Einwilligung zur Datennutzung zurückziehen, pro Monat."), truth: "guardrail" as PatternId, clue: t("Is this a result, something you push, or a limit you watch?", "Ist das ein Ergebnis, etwas, das Sie vorantreiben, oder eine Grenze, die Sie beobachten?"), why: t("A limit on data use: if joining the channels makes customers withdraw consent, OmniTech is going too far. A guardrail.", "Eine Grenze für die Datennutzung: Ziehen Kunden ihre Einwilligung zurück, weil Kanäle verbunden werden, geht OmniTech zu weit. Eine Guardrail."), rejected: { vanity: t("It says something about how customers feel, not about OmniTech's activity.", "Es sagt etwas darüber, wie Kunden sich fühlen, nicht über die Aktivität von OmniTech.") } },
  { id: "p10" as RecId, code: "M-10", outcome: "stayed" as const, text: t("Number of channels OmniTech offers.", "Zahl der Kanäle, die OmniTech anbietet."), truth: "vanity" as PatternId, clue: t("More channels. Did any customer do anything?", "Mehr Kanäle. Hat irgendein Kunde etwas getan?"), why: t("It counts what OmniTech built, not how customers moved: a vanity metric. More channels without integration are the multichannel trap.", "Es zählt, was OmniTech gebaut hat, nicht wie Kunden sich bewegten: eine Vanity Metric. Mehr Kanäle ohne Integration sind die Multichannel-Falle."), rejected: { driver: t("Offering a channel is not a customer using it well.", "Einen Kanal anzubieten ist nicht, dass ein Kunde ihn gut nutzt.") } },
  { id: "p11" as RecId, code: "M-11", outcome: "stayed" as const, text: t("Downloads of the customer app.", "Downloads der Kunden-App."), truth: "vanity" as PatternId, clue: t("A download happens once. Does it count use?", "Ein Download passiert einmal. Zählt er Nutzung?"), why: t("Reach: downloads rose while deals did not. A vanity metric.", "Reichweite: Die Downloads stiegen, die Abschlüsse nicht. Eine Vanity Metric."), rejected: { driver: t("Installing an app is not a step in a buying or renewal decision.", "Eine App zu installieren ist kein Schritt in einer Kauf- oder Verlängerungsentscheidung.") } },
  { id: "p12" as RecId, code: "M-12", outcome: "stayed" as const, text: t("Chatbot conversations per month.", "Chatbot-Gespräche pro Monat."), truth: "vanity" as PatternId, clue: t("Does a conversation count whether anyone was helped?", "Zählt ein Gespräch, ob jemandem geholfen wurde?"), why: t("It counts how busy the bot is: a vanity metric. Whether customers had to repeat themselves afterwards (M-07) is what counts.", "Es zählt, wie beschäftigt der Bot ist: eine Vanity Metric. Ob Kunden sich danach wiederholen mussten (M-07), zählt."), rejected: { guardrail: t("The repetitions after a bot hand-over are the limit (M-07); the number of conversations is only activity.", "Die Wiederholungen nach einer Bot-Übergabe sind die Grenze (M-07); die Zahl der Gespräche ist nur Aktivität.") } },
]);
export const REC_IDS: RecId[] = ["p01", "p02", "p03", "p04", "p05", "p06", "p07", "p08", "p09", "p10", "p11", "p12"];
export const REC_BY_ID = Object.fromEntries(RECORDS.map((r) => [r.id, r])) as Record<RecId, Record_>;

const zero = () => ({ outcome: 0, driver: 0, guardrail: 0, vanity: 0 }) as Record<PatternId, number>;
export const TRUTH_COUNTS: Record<PatternId, number> = RECORDS.reduce((o, x) => ({ ...o, [x.truth]: o[x.truth] + 1 }), zero());
export const TRUTH_LEFT: Record<PatternId, number> = RECORDS.reduce((o, x) => ({ ...o, [x.truth]: o[x.truth] + (x.outcome === "left" ? 1 : 0) }), zero());

/* ------------------------------------------------------------------ Block 2.2 · link to value, what each kind tells management, how to use it */

export type Risk = "high" | "mid" | "low";
export const RISK_LABEL = bi({ high: t("Strong", "Stark"), mid: t("Partial", "Teilweise"), low: t("None", "Keine") });
export const RISK_GLYPH: Record<Risk, string> = { high: "●", mid: "◐", low: "○" };
export const riskOf = (moved: number, count: number): Risk | null => (count === 0 ? null : moved / count >= 0.5 ? "high" : moved > 0 ? "mid" : "low");
export const RISK_RULE = bi({ v: t("Link to customer value from last year: half or more of the kind's metrics moved with customer value = Strong; some did = Partial; none did = None.", "Verbindung zum Kundenwert aus dem letzten Jahr: Die Hälfte oder mehr der Kennzahlen dieser Art bewegte sich mit dem Kundenwert = Stark; einige = Teilweise; keine = Keine.") });

export type MeaningId = "result" | "early" | "limit" | "activity";
export const MEANINGS = bi([
  { id: "result" as MeaningId, label: t("The result we are paid for; it moves last", "Das Ergebnis, für das wir bezahlt werden; es bewegt sich zuletzt") },
  { id: "early" as MeaningId, label: t("An early signal a team can move this month", "Ein frühes Signal, das ein Team diesen Monat bewegen kann") },
  { id: "limit" as MeaningId, label: t("A limit: it must not get worse while we connect the channels", "Eine Grenze: Sie darf nicht schlechter werden, während wir die Kanäle verbinden") },
  { id: "activity" as MeaningId, label: t("Our own activity or reach; it says nothing about customers", "Unsere eigene Aktivität oder Reichweite; sie sagt nichts über Kunden") },
]);
export const MEANING_TRUTH: Record<PatternId, MeaningId> = { outcome: "result", driver: "early", guardrail: "limit", vanity: "activity" };

export type PMeasureId = "target" | "weekly" | "stop" | "drop" | "bonus";
export const PMEASURES = bi([
  { id: "target" as PMeasureId, label: t("Set the target on the management dashboard and judge every measure by it", "Das Ziel im Management-Dashboard setzen und jede Maßnahme daran messen") },
  { id: "weekly" as PMeasureId, label: t("Give it to the team that owns the hand-over and review it every week", "Es dem Team geben, dem die Übergabe gehört, und jede Woche prüfen") },
  { id: "stop" as PMeasureId, label: t("Set a limit that stops a test or a rollout when it is crossed", "Eine Grenze setzen, die einen Test oder Rollout stoppt, wenn sie überschritten wird") },
  { id: "drop" as PMeasureId, label: t("Stop reporting it as success", "Aufhören, es als Erfolg zu berichten") },
  { id: "bonus" as PMeasureId, label: t("Pay a bonus on it to the team that reports it", "Dem Team, das es berichtet, einen Bonus darauf zahlen") },
]);
export const MEASURE_TRUTH: Record<PatternId, PMeasureId> = { outcome: "target", driver: "weekly", guardrail: "stop", vanity: "drop" };
export type PatternRow = { risk: Risk | null; meaning: MeaningId | null; measure: PMeasureId | null };

export type UncId = "sample" | "cause" | "missing" | "shift" | "objective" | "highsafe" | "moredata";
export const UNCERTAINTIES = bi([
  { id: "sample" as UncId, label: t("72 deals with the history is a small base; a second year would confirm the lift", "72 Abschlüsse mit Historie sind eine kleine Basis; ein zweites Jahr würde den Lift bestätigen"), real: true, why: t("With fewer than about 100 deals per group, a few deals more or less move the lift a lot (Materi A6).", "Bei weniger als etwa 100 Abschlüssen pro Gruppe verschieben ein paar Abschlüsse mehr oder weniger den Lift stark (Materi A6).") },
  { id: "cause" as UncId, label: t("Sales may have looked up the history only for the most promising leads, so the history may not be the whole cause", "Der Vertrieb hat die Historie vielleicht nur bei den vielversprechendsten Leads nachgeschlagen, also ist sie vielleicht nicht die ganze Ursache"), real: true, why: t("If the good leads got the history, part of the lift is the lead, not the hand-over. Only a fair test (a random split) shows how much the history adds.", "Bekamen die guten Leads die Historie, ist ein Teil des Lifts der Lead, nicht die Übergabe. Nur ein fairer Test (eine zufällige Aufteilung) zeigt, wie viel die Historie bringt.") },
  { id: "missing" as UncId, label: t("Journeys that switched channel by phone without a log entry are not counted at all", "Journeys, die ohne Eintrag telefonisch den Kanal wechselten, werden gar nicht gezählt"), real: true, why: t("What is not recorded cannot be counted; the real figures may differ in either direction.", "Was nicht erfasst wird, kann nicht gezählt werden; die echten Zahlen können in beide Richtungen abweichen.") },
  { id: "shift" as UncId, label: t("A new product or campaign can change who switches channels, so next year's journeys may behave differently", "Ein neues Produkt oder eine Kampagne kann ändern, wer den Kanal wechselt, also verhalten sich die Journeys im nächsten Jahr vielleicht anders"), real: true, why: t("A forecast assumes the past repeats; a new offer brings different customers.", "Eine Prognose nimmt an, dass sich die Vergangenheit wiederholt; ein neues Angebot bringt andere Kunden.") },
  { id: "objective" as UncId, label: t("More channels always mean a better customer experience", "Mehr Kanäle bedeuten immer ein besseres Kundenerlebnis"), real: false, why: t("More channels without integration add more places where the journey can break: the multichannel trap (Materi A1).", "Mehr Kanäle ohne Integration schaffen mehr Stellen, an denen die Journey brechen kann: die Multichannel-Falle (Materi A1).") },
  { id: "highsafe" as UncId, label: t("Once the systems are connected, the experience is consistent", "Sobald die Systeme verbunden sind, ist das Erlebnis konsistent"), real: false, why: t("Connected systems can still show two prices or two promises; consistency needs shared content and rules, not only shared data.", "Verbundene Systeme können immer noch zwei Preise oder zwei Versprechen zeigen; Konsistenz braucht gemeinsame Inhalte und Regeln, nicht nur gemeinsame Daten.") },
  { id: "moredata" as UncId, label: t("The more KPIs per channel we track, the better we measure success", "Je mehr KPIs pro Kanal wir verfolgen, desto besser messen wir den Erfolg"), real: false, why: t("Separate KPIs per channel are how channels end up working in isolation. A few KPIs across channels steer better (Materi A5).", "Getrennte KPIs pro Kanal sind der Weg, auf dem Kanäle isoliert arbeiten. Wenige kanalübergreifende KPIs steuern besser (Materi A5).") },
]);
export const UNC_BY_ID = Object.fromEntries(UNCERTAINTIES.map((w) => [w.id, w])) as Record<UncId, (typeof UNCERTAINTIES)[number]>;

/* ------------------------------------------------------------------ Block 2.3 · an A/B test design */

export type AbPart = "change" | "control" | "kpi" | "size";
export const AB_PARTS: AbPart[] = ["change", "control", "kpi", "size"];
export type AbOption = { id: string; label: string; right: boolean; clue: string };
export const AB = bi({
  change: {
    label: t("What changes in the variant", "Was sich in der Variante ändert"),
    help: t("The one thing the test compares.", "Das eine, was der Test vergleicht."),
    options: [
      { id: "one", label: t("Only the hand-over card: sales sees the configurator entries before calling", "Nur die Übergabekarte: Der Vertrieb sieht die Konfigurator-Eingaben vor dem Anruf"), right: true, clue: t("", "") },
      { id: "three", label: t("The hand-over card, a new price list and a new sales script, all at once", "Übergabekarte, neue Preisliste und neuer Gesprächsleitfaden, alles auf einmal"), right: false, clue: t("If the variant wins, which of the changes made it win?", "Wenn die Variante gewinnt: Welche der Änderungen hat sie gewinnen lassen?") },
      { id: "channel", label: t("The card for leads from the website, none for leads from trade fairs", "Die Karte für Leads von der Website, keine für Leads von Messen"), right: false, clue: t("Are website leads and trade-fair leads the same customers in the same situation?", "Sind Website-Leads und Messe-Leads dieselben Kunden in derselben Lage?") },
    ],
  },
  control: {
    label: t("The control group", "Die Kontrollgruppe"),
    help: t("Whose calls go ahead without the card, to compare against.", "Wessen Anrufe ohne die Karte stattfinden, als Vergleich."),
    options: [
      { id: "random", label: t("A random half of the online leads, in the same weeks", "Eine zufällige Hälfte der Online-Leads, in denselben Wochen"), right: true, clue: t("", "") },
      { id: "lastyear", label: t("Last quarter's leads, before the card existed", "Die Leads des letzten Quartals, bevor es die Karte gab"), right: false, clue: t("Are these the same leads, at the same time, under the same conditions?", "Sind das dieselben Leads, zur selben Zeit, unter denselben Bedingungen?") },
      { id: "nonopen", label: t("Leads whose salesperson chose not to open the card", "Leads, deren Vertriebsmitarbeiter die Karte nicht öffnen wollte"), right: false, clue: t("Who chose to be in this group: chance, or the salespeople themselves?", "Wer hat entschieden, in dieser Gruppe zu sein: der Zufall oder die Vertriebsleute selbst?") },
    ],
  },
  kpi: {
    label: t("The success KPI", "Der Erfolgs-KPI"),
    help: t("The number that decides whether the variant won.", "Die Zahl, die entscheidet, ob die Variante gewonnen hat."),
    options: [
      { id: "conv", label: t("Deals per hand-over, within 30 days", "Abschlüsse pro Übergabe, innerhalb von 30 Tagen"), right: true, clue: t("", "") },
      { id: "opens", label: t("Hand-over cards opened", "Geöffnete Übergabekarten"), right: false, clue: t("The problem is customers lost between channels. Does an opened card tell you whether more of them bought?", "Das Problem sind Kunden, die zwischen Kanälen verloren gehen. Sagt eine geöffnete Karte, ob mehr von ihnen gekauft haben?") },
      { id: "sent", label: t("Calls made per lead", "Anrufe pro Lead"), right: false, clue: t("Which kind of metric counts how busy sales was rather than whether customers moved towards a deal?", "Welche Art von Kennzahl zählt, wie beschäftigt der Vertrieb war, statt ob Kunden sich einem Abschluss näherten?") },
    ],
  },
  size: {
    label: t("Size and duration", "Größe und Dauer"),
    help: t("When the test has enough cases to read.", "Wann der Test genug Fälle hat, um ihn zu lesen."),
    options: [
      { id: "fixed", label: t("Fixed in advance: until each group has about 100 deals, and at least one full sales cycle", "Vorab festgelegt: bis jede Gruppe etwa 100 Abschlüsse hat, und mindestens ein voller Verkaufszyklus"), right: true, clue: t("", "") },
      { id: "peek", label: t("Stop as soon as the variant is ahead on the dashboard", "Stoppen, sobald die Variante im Dashboard vorn liegt"), right: false, clue: t("A deal rate swings with every deal. What happens if you stop at a lucky moment?", "Eine Abschlussquote schwankt mit jedem Abschluss. Was passiert, wenn Sie in einem glücklichen Moment stoppen?") },
      { id: "day", label: t("One week, for a fast answer", "Eine Woche, für eine schnelle Antwort"), right: false, clue: t("How many deals close in one week, and does a deal decided in a week include customers who needed longer?", "Wie viele Abschlüsse gibt es in einer Woche, und enthält eine Woche Kunden, die länger brauchten?") },
    ],
  },
});
export type AbState = { change: string | null; control: string | null; kpi: string | null; size: string | null; hyp: string; rule: string };
export const emptyAb = (): AbState => ({ change: null, control: null, kpi: null, size: null, hyp: "", rule: "" });
export const AB_MODEL = { change: "one", control: "random", kpi: "conv", size: "fixed" };
/** A hypothesis states a change, an expected effect and a reason. A floor, not a judge: it needs "if … because". */
export const hasHypothesis = (s: string) => /\b(if|wenn|falls)\b/i.test(s) && /\b(because|since|as|weil|da|denn)\b/i.test(s);
/** A decision rule names a number to decide by. */
export const hasRuleNumber = (s: string) => /\d/.test(s);
