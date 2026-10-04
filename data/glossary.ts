import { getLang } from "@/lib/lang";

/**
 * Plain-language glossary (CLAUDE.md #19), in English and German (#32). Every technical term, abbreviation or German word that the
 * material or a task uses is an entry here. In the text it becomes a dotted link; a click opens the explanation. Written for someone
 * who is NOT an expert: short sentences, everyday words, one example where it helps.
 *
 * `match` lists every English written form; `de.match` every form the German text uses (the English term itself, with the German
 * plural or genitive forms, and German words). The German `title` keeps the English term where German practitioners use it. An
 * all-capitals match ("CRM") is matched exactly, so ordinary words never turn into links.
 */
export type GlossDe = { title?: string; match: string[]; plain: string; example?: string };
export type GlossEntry = {
  id: string;
  title: string;
  match: string[];
  exactCase?: boolean;
  plain: string;
  example?: string;
  from?: string;
  de?: GlossDe;
};

export const GLOSSARY: GlossEntry[] = [
  // --- AI, personalisation, automation ------------------------------------------------
  {
    id: "ai",
    title: "AI (artificial intelligence)",
    match: ["AI", "AI-based"],
    plain: "Software that learns patterns from data and uses them to predict or choose: which offer fits, which request is routine. Useful when its results can be measured; risky when nobody can say what it does.",
    from: "Davenport et al. 2020",
    de: { title: "KI (künstliche Intelligenz)", match: ["KI", "KI-gestützt", "KI-gestützte", "KI-gestützten", "KI-gestütztes"], plain: "Software, die Muster aus Daten lernt und damit vorhersagt oder auswählt: welches Angebot passt, welche Anfrage Routine ist. Nützlich, wenn man ihre Ergebnisse messen kann; riskant, wenn niemand sagen kann, was sie tut." },
  },
  {
    id: "tech-without-strategy",
    title: "Technology without strategy",
    match: ["technology without strategy"],
    plain: "Buying a tool first and looking for uses later. It produces activity (widgets live, features switched on) but nobody can say whether it moved a result, because no KPI was named before the money was spent.",
    from: "Davenport & Ronanki 2018",
    de: { title: "Technologie ohne Strategie", match: ["Technologie ohne Strategie"], plain: "Zuerst ein Werkzeug kaufen und später Anwendungen suchen. Das erzeugt Aktivität (live geschaltete Widgets, eingeschaltete Funktionen), aber niemand kann sagen, ob es ein Ergebnis bewegt hat, weil vor der Ausgabe kein KPI benannt wurde." },
  },
  {
    id: "personalisation",
    title: "Personalisation",
    match: ["personalisation", "personalised", "personalise", "personalising", "personalization", "personalized"],
    plain: "Treating customers differently from what each one does: showing a different product, sending a different message, or writing at a different moment. The opposite of one standard page for everyone.",
    from: "Peppers & Rogers 1993",
    de: { title: "Personalisierung", match: ["Personalisierung", "personalisiert", "personalisierte", "personalisierten", "personalisiertes", "personalisieren"], plain: "Kunden verschieden behandeln, je nachdem, was jeder tut: ein anderes Produkt zeigen, eine andere Nachricht schicken oder zu einem anderen Zeitpunkt schreiben. Das Gegenteil einer Standardseite für alle." },
  },
  {
    id: "recommendation",
    title: "Recommendation system",
    match: ["recommendation system", "recommendation systems", "recommendation engine", "recommender", "recommendations", "recommendation"],
    plain: "Software that suggests which product to show a customer, from what similar customers bought or used. The classic form is “customers who bought this also bought that”.",
    example: "Of 60 customers with Security, 33 also bought the training: Security buyers are shown the training.",
    from: "Linden et al. 2003",
    de: { title: "Recommendation System", match: ["Recommendation System", "Recommendation Systems", "Recommendation Engine", "Empfehlung", "Empfehlungen"], plain: "Software, die vorschlägt, welches Produkt einem Kunden gezeigt wird, aus dem, was ähnliche Kunden kauften oder nutzten. Die klassische Form ist „Kunden, die das kauften, kauften auch“.", example: "Von 60 Kunden mit Security kauften 33 auch die Schulung: Security-Käufern wird die Schulung gezeigt." },
  },
  {
    id: "individual-comm",
    title: "Individualised communication",
    match: ["individualised communication", "individualized communication", "individual communication"],
    plain: "Changing what you say, when you say it, or on which channel, from what this customer did. The product may stay the same; the message fits the person.",
    from: "Peppers & Rogers 1993",
    de: { title: "Individualisierte Kommunikation", match: ["individualisierte Kommunikation", "individualisierten Kommunikation"], plain: "Ändern, was Sie sagen, wann Sie es sagen oder über welchen Kanal, aus dem, was dieser Kunde getan hat. Das Produkt kann gleich bleiben; die Nachricht passt zur Person." },
  },
  {
    id: "automation",
    title: "Automation",
    match: ["automation", "automate", "automated", "automating"],
    plain: "A system does a step by itself that a person did before: it answers a question, sets a price or rearranges an offer. Full automation needs no person; assisted automation prepares the step and a person decides.",
    from: "Huang & Rust 2021",
    de: { title: "Automatisierung", match: ["Automatisierung", "automatisieren", "automatisiert", "automatisierte", "automatisierter"], plain: "Ein System erledigt selbst einen Schritt, den vorher ein Mensch machte: Es beantwortet eine Frage, setzt einen Preis oder ordnet ein Angebot neu. Volle Automatisierung braucht keinen Menschen; unterstützende Automatisierung bereitet den Schritt vor, und ein Mensch entscheidet." },
  },
  {
    id: "chatbot",
    title: "Chatbot",
    match: ["chatbot", "chatbots", "bot"],
    plain: "A program that answers customers in a chat window, day and night. Good for routine questions; it always needs a way to hand the conversation to a person.",
    from: "Adam et al. 2021",
    de: { title: "Chatbot", match: ["Chatbot", "Chatbots", "Bot"], plain: "Ein Programm, das Kunden in einem Chatfenster antwortet, Tag und Nacht. Gut für Routinefragen; es braucht immer einen Weg, das Gespräch an einen Menschen zu übergeben." },
  },
  {
    id: "dynamic-pricing",
    title: "Dynamic pricing",
    match: ["dynamic pricing", "dynamic price"],
    plain: "Prices set by a system that changes them with demand, order size, season or behaviour. In business sales it needs limits set by people, because customers compare invoices.",
    from: "den Boer 2015",
    de: { title: "Dynamic Pricing", match: ["Dynamic Pricing", "Dynamic-Pricing", "dynamischer Preis", "dynamische Preise"], plain: "Preise, die ein System mit Nachfrage, Bestellmenge, Saison oder Verhalten ändert. Im Geschäftskundenvertrieb braucht es Grenzen, die Menschen setzen, weil Kunden Rechnungen vergleichen." },
  },
  {
    id: "adaptive",
    title: "Adaptive system",
    match: ["adaptive system", "adaptive systems"],
    plain: "A system that keeps adjusting what it offers by itself, without anyone deciding each change: a start page that puts first the functions a user opens most.",
    de: { title: "Adaptives System", match: ["adaptives System", "adaptive Systeme", "adaptiven Systeme"], plain: "Ein System, das sein Angebot fortlaufend selbst anpasst, ohne dass jemand jede Änderung entscheidet: eine Startseite, die die Funktionen nach vorn stellt, die ein Nutzer am meisten öffnet." },
  },
  {
    id: "assist",
    title: "Assist (automation that prepares)",
    match: ["assist"],
    exactCase: true,
    plain: "The middle way between a machine and a person: the system finds the data, proposes an answer or a price, and a person checks and decides.",
    de: { title: "Unterstützen", match: ["unterstützen", "Unterstützen"], plain: "Der Mittelweg zwischen Maschine und Mensch: Das System sucht die Daten, schlägt eine Antwort oder einen Preis vor, und ein Mensch prüft und entscheidet." },
  },
  {
    id: "add-on",
    title: "Add-on",
    match: ["add-on", "add-ons"],
    plain: "An extra product a customer can buy on top of the main subscription, such as backup, an archive or a training.",
    de: { title: "Add-on", match: ["Add-on", "Add-ons"], plain: "Ein Zusatzprodukt, das ein Kunde zum Hauptabonnement kaufen kann, etwa Backup, ein Archiv oder eine Schulung." },
  },
  {
    id: "portal",
    title: "Customer portal",
    match: ["portal"],
    plain: "The website where a customer logs in to manage their subscription, users and settings. What customers do there is data about how they use the product.",
    de: { title: "Kundenportal", match: ["Portal", "Kundenportal", "Portaldaten", "Portal-Logins"], plain: "Die Website, auf der sich ein Kunde anmeldet, um Abonnement, Nutzer und Einstellungen zu verwalten. Was Kunden dort tun, sind Daten darüber, wie sie das Produkt nutzen." },
  },

  // --- measuring success ---------------------------------------------------------------
  {
    id: "kpi",
    title: "KPI — key performance indicator",
    match: ["KPI", "KPIs"],
    plain: "One number that shows whether something is working. A good KPI measures what customers do (buy, use, stay), not your own activity.",
    from: "Kaplan & Norton 1992",
    de: { match: ["KPI", "KPIs", "KPI-System", "KPI-Kandidat", "KPI-Kandidaten"], plain: "Eine Zahl, die zeigt, ob etwas funktioniert. Ein guter KPI misst, was Kunden tun (kaufen, nutzen, bleiben), nicht Ihre eigene Aktivität." },
  },
  {
    id: "conversion",
    title: "Conversion rate",
    match: ["conversion rate", "conversion", "conversions", "converted"],
    plain: "The share of contacts that led to the result you wanted, usually an order: orders ÷ requests (or visitors) × 100.",
    example: "96 orders from 2,000 visitors: 96 ÷ 2,000 × 100 = 4.8%.",
    from: "Provost & Fawcett 2013",
    de: { title: "Conversion Rate", match: ["Conversion Rate", "Conversion", "Conversions", "konvertierte", "konvertierte"], plain: "Der Anteil der Kontakte, die zum gewünschten Ergebnis führten, meist einer Bestellung: Bestellungen ÷ Anfragen (oder Besucher) × 100.", example: "96 Bestellungen aus 2.000 Besuchern: 96 ÷ 2.000 × 100 = 4,8 %." },
  },
  {
    id: "uplift",
    title: "Uplift",
    match: ["uplift", "uplifts"],
    plain: "How much better the new version did than the old one. As a multiple: new rate ÷ old rate; as a percentage: how much more that is.",
    example: "4.8% against 3%: 1.6 times the standard rate, an uplift of 60%.",
    from: "Provost & Fawcett 2013",
    de: { title: "Uplift", match: ["Uplift", "Uplifts"], plain: "Wie viel besser die neue Version abschnitt als die alte. Als Vielfaches: neue Rate ÷ alte Rate; in Prozent: wie viel mehr das ist.", example: "4,8 % gegenüber 3 %: das 1,6-Fache der Standardrate, ein Uplift von 60 %." },
  },
  {
    id: "pilot",
    title: "Pilot",
    match: ["pilot", "pilots"],
    plain: "A small first run of a new measure on part of the customers, to see whether it works before it reaches everyone.",
    de: { title: "Pilot", match: ["Pilot", "Piloten", "pilotieren", "Pilotwerte", "Pilotwerten"], plain: "Ein kleiner erster Durchlauf einer neuen Maßnahme mit einem Teil der Kunden, um zu sehen, ob sie wirkt, bevor sie alle erreicht." },
  },
  {
    id: "ab-test",
    title: "A/B test",
    match: ["A/B test", "A/B tests", "A/B testing", "A/B-testing"],
    plain: "Two versions shown at the same time to two groups chosen by chance: A gets the old version, B the new one. The difference in a KPI shows what the change did.",
    from: "Kohavi et al. 2020",
    de: { title: "A/B-Test", match: ["A/B-Test", "A/B-Tests", "A/B-Testing", "A/B-Testergebnisse"], plain: "Zwei Versionen, gleichzeitig an zwei zufällig gewählte Gruppen gezeigt: A bekommt die alte Version, B die neue. Der Unterschied in einem KPI zeigt, was die Änderung bewirkt hat." },
  },
  {
    id: "control-group",
    title: "Control group",
    match: ["control group", "control groups", "control"],
    exactCase: true,
    plain: "The group in a test that keeps the old version. Without it you cannot tell whether a change caused a difference or something else did.",
    de: { title: "Kontrollgruppe", match: ["Kontrollgruppe", "Kontrollgruppen", "Kontrollrate"], plain: "Die Gruppe in einem Test, die die alte Version behält. Ohne sie lässt sich nicht sagen, ob eine Änderung einen Unterschied verursacht hat oder etwas anderes." },
  },
  {
    id: "hypothesis",
    title: "Hypothesis",
    match: ["hypothesis"],
    plain: "What you expect a test to show, written before it starts: if we change this, then that KPI rises, because of this reason.",
    de: { title: "Hypothese", match: ["Hypothese"], plain: "Was ein Test zeigen soll, vor dem Start aufgeschrieben: Wenn wir dies ändern, steigt jener KPI, aus diesem Grund." },
  },
  {
    id: "sample",
    title: "Sample, sample size",
    match: ["sample", "small sample", "sample size"],
    plain: "The customers or orders a result rests on. With few of them, chance can move the result a lot; about 100 conversions per group is a common minimum before reading a test.",
    de: { title: "Stichprobe", match: ["Stichprobe", "Stichprobengröße", "Mindeststichprobe"], plain: "Die Kunden oder Bestellungen, auf denen ein Ergebnis beruht. Bei wenigen kann der Zufall das Ergebnis stark verschieben; etwa 100 Conversions pro Gruppe sind ein übliches Minimum, bevor man einen Test liest." },
  },
  {
    id: "outcome-kpi",
    title: "Outcome KPI",
    match: ["outcome KPI", "outcome KPIs", "outcome", "outcomes"],
    exactCase: true,
    plain: "A KPI that is the result itself: orders, revenue, customers kept. It moves last and is what management is judged by.",
    from: "Kaplan & Norton 1992",
    de: { title: "Outcome-KPI", match: ["Outcome-KPI", "Outcome-KPIs", "Outcome", "Outcomes"], plain: "Ein KPI, der das Ergebnis selbst ist: Bestellungen, Umsatz, gehaltene Kunden. Er bewegt sich zuletzt, und das Management wird an ihm gemessen." },
  },
  {
    id: "driver-kpi",
    title: "Driver KPI",
    match: ["driver KPI", "driver KPIs", "driver", "drivers"],
    exactCase: true,
    plain: "A customer behaviour that comes before the result and that a team can move this month: weekly use, clicks on offers, a second module in use.",
    from: "Kaplan & Norton 1992",
    de: { title: "Treiber-KPI", match: ["Treiber-KPI", "Treiber-KPIs", "Treiber"], plain: "Ein Kundenverhalten, das vor dem Ergebnis kommt und das ein Team in diesem Monat bewegen kann: wöchentliche Nutzung, Klicks auf Angebote, ein zweites Modul in Gebrauch." },
  },
  {
    id: "guardrail",
    title: "Guardrail",
    match: ["guardrail", "guardrails"],
    plain: "A metric that must not get worse while you push the result, such as complaints or chats rated “not helpful”. If it is crossed, a test or rollout stops.",
    from: "Kohavi et al. 2020",
    de: { title: "Guardrail (Leitplanke)", match: ["Guardrail", "Guardrails", "Guardrail-Kennzahlen"], plain: "Eine Kennzahl, die nicht schlechter werden darf, während Sie das Ergebnis vorantreiben, etwa Beschwerden oder als „nicht hilfreich“ bewertete Chats. Wird sie überschritten, stoppt ein Test oder Rollout." },
  },
  {
    id: "vanity",
    title: "Vanity metric",
    match: ["vanity metric", "vanity metrics", "vanity"],
    plain: "A number that looks like progress but counts your own activity or reach (visitors counted, posts published, followers) and decides nothing.",
    from: "Ries 2011",
    de: { title: "Vanity Metric", match: ["Vanity Metric", "Vanity Metrics", "Vanity"], plain: "Eine Zahl, die nach Fortschritt aussieht, aber die eigene Aktivität oder Reichweite zählt (gezählte Besucher, veröffentlichte Posts, Follower) und nichts entscheidet." },
  },
  {
    id: "engagement",
    title: "Engagement",
    match: ["engagement"],
    plain: "How actively customers use the product, for example the share who log in at least once a week. A driver: it falls before customers leave.",
    de: { title: "Engagement", match: ["Engagement"], plain: "Wie aktiv Kunden das Produkt nutzen, etwa der Anteil, der sich mindestens einmal pro Woche anmeldet. Ein Treiber: Es fällt, bevor Kunden gehen." },
  },
  {
    id: "customer-value",
    title: "Customer value",
    match: ["customer value"],
    plain: "What a customer brings in, here revenue per customer per year. An outcome KPI.",
    de: { title: "Kundenwert", match: ["Kundenwert", "Kundenwerts"], plain: "Was ein Kunde einbringt, hier der Umsatz pro Kunde und Jahr. Ein Outcome-KPI." },
  },
  {
    id: "retention-rate",
    title: "Retention rate",
    match: ["retention rate"],
    plain: "The share of customers who stay, for example who renew their contract. The mirror of the churn rate.",
    de: { title: "Retention Rate", match: ["Retention Rate"], plain: "Der Anteil der Kunden, die bleiben, etwa ihren Vertrag verlängern. Das Spiegelbild der Churn Rate." },
  },
  {
    id: "rollout",
    title: "Rollout",
    match: ["rollout", "roll out", "rolled out"],
    plain: "Giving a tested version to all customers, not just the test group.",
    de: { title: "Rollout", match: ["Rollout", "ausrollen", "ausgerollt"], plain: "Eine getestete Version allen Kunden geben, nicht nur der Testgruppe." },
  },
  {
    id: "ems",
    title: "Integration, effect, scalability",
    match: ["Integration", "Scalability", "scalability", "integration"],
    plain: "Three tests for a measure, each Low (1) to High (3), multiplied. Integration: what it connects to (all channels and the CRM 3, one other system 2, nothing 1). Effect: how much it changes for the customer. Scalability: whether it reaches every customer without extra cost.",
    example: "Integration 2 × effect 3 × scalability 3 = 18.",
    de: { title: "Integration, Wirkung, Skalierbarkeit", match: ["Integration", "Skalierbarkeit", "Wirkung"], plain: "Drei Tests für eine Maßnahme, jeweils Niedrig (1) bis Hoch (3), multipliziert. Integration: womit sie verbunden ist (alle Kanäle und das CRM 3, ein anderes System 2, nichts 1). Wirkung: wie viel sie für den Kunden ändert. Skalierbarkeit: ob sie jeden Kunden ohne Zusatzkosten erreicht.", example: "Integration 2 × Wirkung 3 × Skalierbarkeit 3 = 18." },
  },
  {
    id: "black-box",
    title: "Black box",
    match: ["black box", "black-box"],
    plain: "A system whose results you see but whose reasons you cannot. It may be right, but nobody can check it, explain it or measure what it did.",
    de: { title: "Black Box", match: ["Black Box", "Black-Box"], plain: "Ein System, dessen Ergebnisse man sieht, dessen Gründe aber nicht. Es kann stimmen, aber niemand kann es prüfen, erklären oder messen, was es bewirkt hat." },
  },
  {
    id: "gdpr",
    title: "GDPR",
    match: ["GDPR"],
    plain: "The EU's data protection law. Personal data needs a lawful basis, customers may object to direct marketing, and decisions with significant effects on a person may not be left to a machine alone.",
    from: "GDPR 2016",
    de: { title: "DSGVO (Datenschutz-Grundverordnung)", match: ["DSGVO"], plain: "Das Datenschutzgesetz der EU. Personenbezogene Daten brauchen eine Rechtsgrundlage, Kunden können der Direktwerbung widersprechen, und Entscheidungen mit erheblicher Wirkung auf eine Person dürfen nicht allein einer Maschine überlassen werden." },
  },
  {
    id: "data-driven",
    title: "Data-driven",
    match: ["data-driven", "data-based"],
    plain: "Deciding from what the records show about customers, not only from memory or feeling. Experience still matters, for the cases the data cannot explain.",
    de: { title: "Datengetrieben", match: ["datengetrieben", "datengetriebene", "datengetriebenen", "datengetriebener", "datenbasiert", "datenbasierte", "datenbasierten"], plain: "Aus dem entscheiden, was die Daten über Kunden zeigen, nicht nur aus Gedächtnis oder Gefühl. Erfahrung zählt weiter, für die Fälle, die die Daten nicht erklären." },
  },
  {
    id: "data-quality",
    title: "Data quality, data ready",
    match: ["data quality", "data ready"],
    plain: "How far data can be trusted and used. “Data ready” here is the share of the data a technology needs that is complete and clean; a model trained on gaps learns the gaps.",
    de: { title: "Datenqualität, Daten bereit", match: ["Datenqualität", "Daten bereit"], plain: "Wie weit man Daten trauen und sie nutzen kann. „Daten bereit“ ist hier der Anteil der Daten, die eine Technologie braucht, der vollständig und sauber ist; ein Modell, das auf Lücken trainiert wird, lernt die Lücken." },
  },
  {
    id: "cdo",
    title: "CDO — Chief Digital Officer",
    match: ["CDO", "Chief Digital Officer"],
    plain: "The manager who answers for how a company uses digital technology, data and AI, and who has to show what they achieve.",
    de: { match: ["CDO", "Chief Digital Officer"], plain: "Die Führungskraft, die dafür verantwortlich ist, wie ein Unternehmen digitale Technologie, Daten und KI nutzt, und die zeigen muss, was sie erreichen." },
  },

  // --- general terms kept from the course ------------------------------------------
  {
    id: "churn",
    title: "Churn, churn rate",
    match: ["churn", "churn rate", "churn rates", "churned"],
    plain: "Churn means customers leaving. The churn rate is the share who leave in a period.",
    example: "400 customers and 32 cancellations in a year: a churn rate of 8%.",
    de: { title: "Churn, Churn Rate (Abwanderungsquote)", match: ["Churn", "Churn Rate", "Churn Rates", "Abwanderung"], plain: "Churn heißt, dass Kunden gehen. Die Churn Rate ist der Anteil, der in einem Zeitraum geht.", example: "400 Kunden und 32 Kündigungen in einem Jahr: eine Churn Rate von 8 %." },
  },
  {
    id: "crm",
    title: "CRM — customer relationship management system",
    match: ["CRM"],
    plain: "The software in which a sales team records every customer and deal: contacts, notes, orders, next steps.",
    de: { title: "CRM — Customer Relationship Management", match: ["CRM", "CRM-Daten", "CRM-Notizen"], plain: "Die Software, in der ein Vertriebsteam jeden Kunden und jeden Deal festhält: Kontakte, Notizen, Bestellungen, nächste Schritte." },
  },
  {
    id: "mittelstand",
    title: "Mittelstand (mid-sized companies)",
    match: ["Mittelstand"],
    exactCase: true,
    plain: "The German word for mid-sized, often family-owned companies, the backbone of the German economy. Many have a small IT team or none.",
    de: { title: "Mittelstand", match: ["Mittelstand", "Mittelstandsunternehmen", "Mittelständler"], plain: "Mittelgroße, oft familiengeführte Unternehmen, das Rückgrat der deutschen Wirtschaft. Viele haben ein kleines oder gar kein IT-Team." },
  },
  {
    id: "onboarding",
    title: "Onboarding",
    match: ["onboarding"],
    plain: "The first weeks of a new customer, in which they set up the product and start using it. A second module in use in this time is a good sign.",
    de: { title: "Onboarding", match: ["Onboarding"], plain: "Die ersten Wochen eines neuen Kunden, in denen er das Produkt einrichtet und zu nutzen beginnt. Ein zweites Modul in dieser Zeit ist ein gutes Zeichen." },
  },
  {
    id: "tripwire",
    title: "Tripwire",
    match: ["tripwire"],
    plain: "A result agreed in advance that makes you change course: a metric, a threshold, a date and an action.",
    example: "If the closing rate is below 7% by month 3, one rule is adjusted.",
    de: { title: "Tripwire", match: ["Tripwire", "Tripwires"], plain: "Ein vorab vereinbartes Ergebnis, bei dem Sie den Kurs ändern: eine Kennzahl, ein Schwellenwert, ein Datum und eine Aktion.", example: "Liegt die Abschlussquote bis Monat 3 unter 7 %, wird eine Regel angepasst." },
  },
  {
    id: "staged",
    title: "Staged decision",
    match: ["staged", "stage it", "in stages"],
    plain: "Deciding the direction now, but committing money in steps, each released only when a checkpoint is met.",
    from: "Courtney et al. 1997",
    de: { title: "Gestufte Entscheidung", match: ["stufenweise", "gestufte", "in Stufen"], plain: "Die Richtung jetzt entscheiden, das Geld aber in Schritten binden, die jeweils erst freigegeben werden, wenn ein Kontrollpunkt erreicht ist." },
  },
  {
    id: "baseline",
    title: "Baseline",
    match: ["baseline", "baselines"],
    plain: "The value of a metric before you change anything. Without it you cannot tell whether a measure made a difference.",
    de: { title: "Baseline (Ausgangswert)", match: ["Baseline", "Ausgangswert", "Ausgangswerte"], plain: "Der Wert einer Kennzahl, bevor Sie etwas ändern. Ohne ihn können Sie nicht sagen, ob eine Maßnahme etwas bewirkt hat." },
  },
  {
    id: "owner",
    title: "Owner",
    match: ["owner", "owners"],
    plain: "The one person who can change a measure without asking anyone else, and who must act when its trigger fires.",
    de: { title: "Owner", match: ["Owner"], plain: "Die eine Person, die eine Maßnahme ändern kann, ohne jemanden zu fragen, und die handeln muss, wenn ihr Trigger auslöst." },
  },
  {
    id: "trigger",
    title: "Trigger",
    match: ["trigger", "triggers", "triggered"],
    plain: "Two uses. For a live reaction: the customer behaviour that starts it (a visitor stays on the pricing page, a quote request arrives). For a funded item: a written rule that says when the owner must act, with a metric, a number, a date and an action.",
    de: { title: "Trigger", match: ["Trigger"], plain: "Zwei Bedeutungen. Bei einer Live-Reaktion: das Kundenverhalten, das sie auslöst (ein Besucher bleibt auf der Preisseite, eine Angebotsanfrage kommt an). Bei einem finanzierten Punkt: eine schriftliche Regel, die sagt, wann der Owner handeln muss, mit Kennzahl, Zahl, Datum und Aktion." },
  },
  {
    id: "pickup",
    title: "Pickup point",
    match: ["pickup point"],
    plain: "The number and the date at which you look again at something you postponed. It turns “later” into a decision.",
    de: { title: "Pickup Point", match: ["Pickup Point"], plain: "Die Zahl und das Datum, zu dem Sie etwas Zurückgestelltes wieder ansehen. So wird aus „später“ eine Entscheidung." },
  },
  {
    id: "premortem",
    title: "Premortem",
    match: ["premortem"],
    plain: "Before a plan starts, imagine it has failed and write down why. It brings hidden assumptions into the open.",
    from: "Klein 2007",
    de: { title: "Premortem", match: ["Premortem"], plain: "Bevor ein Plan startet, stellt man sich vor, er sei gescheitert, und schreibt auf, warum. So kommen versteckte Annahmen ans Licht." },
  },
  {
    id: "no-regret",
    title: "No-regret move",
    match: ["no-regret", "no-regret move", "no-regret items"],
    plain: "A step that is right whatever the uncertain facts turn out to be. You can take it now, while you wait for the rest of the evidence.",
    example: "A shared customer profile helps whichever AI tool proves strongest later.",
    from: "Courtney et al. 1997",
    de: { title: "No-regret-Schritt", match: ["No-regret", "No-regret-Punkte", "No-regret-Schritt"], plain: "Ein Schritt, der richtig ist, egal wie die unsicheren Fakten ausfallen. Sie können ihn jetzt gehen, während Sie auf den Rest der Evidenz warten.", example: "Ein gemeinsames Kundenprofil hilft jedem KI-Werkzeug, das sich später als stärkstes erweist." },
  },
  // --- real time (Day 9) -----------------------------------------------------------------
  {
    id: "realtime",
    title: "Real time",
    match: ["real time", "real-time"],
    plain: "Reacting while the customer is still there: seconds or minutes, not the next day. A real-time system sees what a customer does as it happens and answers in that moment.",
    example: "A visitor asks about prices in the chat and gets an answer in one minute, while still on the page.",
    de: { title: "Echtzeit", match: ["Echtzeit", "Echtzeitsystem", "Echtzeitsysteme", "Echtzeit-Managementsystem", "Echtzeit-Ideen", "Echtzeit-Maßnahmen", "Echtzeit-KPI", "Echtzeit-Kennzahlen"], plain: "Reagieren, solange der Kunde noch da ist: Sekunden oder Minuten, nicht am nächsten Tag. Ein Echtzeitsystem sieht, was ein Kunde tut, während es passiert, und antwortet in diesem Moment.", example: "Ein Besucher fragt im Chat nach Preisen und bekommt in einer Minute eine Antwort, noch während er auf der Seite ist." },
  },
  {
    id: "responsetime",
    title: "Response time",
    match: ["response time", "response times", "first response time"],
    plain: "How long a customer waits for the first real answer after asking: in a chat, by phone or to a quote request. Shorter usually means more deals, because the interest is still fresh.",
    example: "A request at 10:00 answered at 10:12 has a response time of 12 minutes.",
    from: "Oldroyd et al. 2011",
    de: { title: "Response Time", match: ["Response Time", "Antwortzeit", "Antwortzeiten", "erste Antwortzeit"], plain: "Wie lange ein Kunde nach seiner Frage auf die erste echte Antwort wartet: im Chat, am Telefon oder auf eine Angebotsanfrage. Kürzer heißt meist mehr Abschlüsse, weil das Interesse noch frisch ist.", example: "Eine Anfrage um 10:00 Uhr, beantwortet um 10:12 Uhr, hat eine Antwortzeit von 12 Minuten." },
  },
  {
    id: "bounce",
    title: "Bounce rate",
    match: ["bounce rate", "bounce rates", "bounce", "bounces"],
    plain: "The share of visitors who leave after seeing only one page, without clicking anything. High on a page where people should decide, it means the page lost them.",
    example: "1,000 visitors, 620 leave at once: a bounce rate of 62%.",
    de: { title: "Bounce Rate", match: ["Bounce Rate", "Bounce Rates", "Absprungrate", "Absprungraten"], plain: "Der Anteil der Besucher, die nach nur einer Seite gehen, ohne etwas anzuklicken. Ist sie hoch auf einer Seite, auf der man entscheiden soll, hat die Seite sie verloren.", example: "1.000 Besucher, 620 gehen sofort: eine Bounce Rate von 62 %." },
  },
  {
    id: "dwell",
    title: "Dwell time",
    match: ["dwell time", "dwell times"],
    plain: "How long a visitor stays on a page. Long can mean interest or confusion, so on its own it decides little.",
    de: { title: "Verweildauer", match: ["Verweildauer"], plain: "Wie lange ein Besucher auf einer Seite bleibt. Lang kann Interesse oder Verwirrung bedeuten, deshalb entscheidet sie allein wenig." },
  },
  {
    id: "closing",
    title: "Deal rate, closing rate",
    match: ["deal rate", "deal rates", "closing rate", "closing rates"],
    plain: "The share of requests, hand-overs or offers that became a signed deal: deals ÷ requests × 100.",
    example: "50 deals from 400 hand-overs: 50 ÷ 400 × 100 = 12.5%.",
    de: { title: "Abschlussquote", match: ["Abschlussquote", "Abschlussquoten"], plain: "Der Anteil der Anfragen, Übergaben oder Angebote, die zu einem unterschriebenen Auftrag wurden: Abschlüsse ÷ Anfragen × 100.", example: "50 Abschlüsse aus 400 Übergaben: 50 ÷ 400 × 100 = 12,5 %." },
  },
  {
    id: "lift",
    title: "Lift",
    match: ["lift"],
    plain: "How many times better one group did than another: the rate of one group ÷ the rate of the other, for example deals with the history ÷ deals without it. A lift of 2 means twice as often.",
    example: "18% against 12%: 18 ÷ 12 = a lift of 1.5.",
    de: { title: "Lift", match: ["Lift"], plain: "Wie viel Mal besser eine Gruppe abschnitt als eine andere: die Quote der einen Gruppe ÷ die der anderen, etwa Abschlüsse mit Historie ÷ Abschlüsse ohne. Ein Lift von 2 heißt doppelt so oft.", example: "18 % gegenüber 12 %: 18 ÷ 12 = ein Lift von 1,5." },
  },
  {
    id: "interaction",
    title: "Interaction point",
    match: ["interaction point", "interaction points"],
    plain: "A place where the customer and the company meet: a web page, the chat, a phone call, a social media post. A touchpoint, looked at for how it is answered.",
    de: { title: "Interaktionspunkt", match: ["Interaktionspunkt", "Interaktionspunkte", "Interaktionspunkten"], plain: "Eine Stelle, an der Kunde und Unternehmen sich begegnen: eine Webseite, der Chat, ein Anruf, ein Social-Media-Post. Ein Touchpoint, betrachtet danach, wie er beantwortet wird." },
  },
  {
    id: "touchpoint",
    title: "Touchpoint",
    match: ["touchpoint", "touchpoints"],
    plain: "Any moment in which a customer comes into contact with the company: a page, an e-mail, a call, an invoice.",
    de: { title: "Touchpoint", match: ["Touchpoint", "Touchpoints"], plain: "Jeder Moment, in dem ein Kunde mit dem Unternehmen in Kontakt kommt: eine Seite, eine E-Mail, ein Anruf, eine Rechnung." },
  },
  {
    id: "feedbackloop",
    title: "Feedback loop",
    match: ["feedback loop", "feedback loops"],
    plain: "A fixed routine that looks at results and changes what you do: measure, decide, change, measure again. In real time it runs weekly, not once a year.",
    example: "Every Friday: which chat answers were rated “not helpful”? Rewrite the five worst.",
    from: "Ries 2011",
    de: { title: "Feedbackschleife", match: ["Feedbackschleife", "Feedbackschleifen", "Feedback Loop"], plain: "Eine feste Routine, die Ergebnisse ansieht und ändert, was Sie tun: messen, entscheiden, ändern, wieder messen. In Echtzeit läuft sie wöchentlich, nicht einmal im Jahr.", example: "Jeden Freitag: Welche Chat-Antworten wurden als „nicht hilfreich“ bewertet? Die fünf schlechtesten neu schreiben." },
  },
  {
    id: "callback",
    title: "Callback",
    match: ["callback", "callbacks", "call back"],
    plain: "The company calls the customer back, at a promised time, instead of the customer waiting on hold or for an e-mail.",
    de: { title: "Rückruf", match: ["Rückruf", "Rückrufe", "Rückrufs", "Rückruf-Service"], plain: "Das Unternehmen ruft den Kunden zu einer versprochenen Zeit zurück, statt dass der Kunde in der Warteschleife hängt oder auf eine E-Mail wartet." },
  },
  {
    id: "livechat",
    title: "Live chat",
    match: ["live chat", "live chats"],
    plain: "A chat window on the website where a person, or a chatbot that hands over to a person, answers questions while the visitor is on the page.",
    de: { title: "Live Chat", match: ["Live Chat", "Live-Chat", "Live-Chats"], plain: "Ein Chatfenster auf der Website, in dem ein Mensch, oder ein Chatbot, der an einen Menschen übergibt, Fragen beantwortet, während der Besucher auf der Seite ist." },
  },
  {
    id: "social",
    title: "Social media",
    match: ["social media"],
    plain: "Public platforms such as LinkedIn or Instagram where a company posts and customers comment. Reach there is not the same as customers who buy.",
    de: { title: "Social Media", match: ["Social Media", "Social-Media-Post", "Social-Media-Posts", "Social-Media-Kampagne"], plain: "Öffentliche Plattformen wie LinkedIn oder Instagram, auf denen ein Unternehmen postet und Kunden kommentieren. Reichweite dort ist nicht dasselbe wie Kunden, die kaufen." },
  },
  {
    id: "tracking",
    title: "Tracking",
    match: ["tracking", "tracked"],
    plain: "Recording what visitors and customers do (pages seen, clicks, chats) so it can be measured. On a website it needs the visitor's consent, so part of the traffic is always missing.",
    example: "If only 55% of calls are logged, a live screen shows barely half of what happens there.",
    from: "GDPR 2016",
    de: { title: "Tracking", match: ["Tracking", "erfasst", "Erfassung"], plain: "Aufzeichnen, was Besucher und Kunden tun (gesehene Seiten, Klicks, Chats), damit man es messen kann. Auf einer Website braucht es die Einwilligung des Besuchers, deshalb fehlt immer ein Teil des Verkehrs.", example: "Werden nur 55 % der Anrufe erfasst, zeigt ein Live-Bildschirm kaum die Hälfte dessen, was dort passiert." },
  },
  {
    id: "consent",
    title: "Consent",
    match: ["consent"],
    plain: "The visitor's permission to record what they do, usually given in a cookie banner. Under the GDPR, without it the visit may not be tracked.",
    from: "GDPR 2016",
    de: { title: "Einwilligung", match: ["Einwilligung", "Einwilligungen"], plain: "Die Erlaubnis des Besuchers, aufzuzeichnen, was er tut, meist in einem Cookie-Banner gegeben. Ohne sie darf der Besuch laut DSGVO nicht erfasst werden." },
  },
  {
    id: "responsestd",
    title: "Response standard",
    match: ["response standard", "response standards"],
    plain: "A written promise for one interaction point: how fast it is answered and who answers it. It makes speed independent of who happens to be on duty.",
    example: "“Pricing page: chat answer within 2 minutes; quote requests: callback within 1 hour.”",
    de: { title: "Antwortstandard", match: ["Antwortstandard", "Antwortstandards"], plain: "Ein schriftliches Versprechen für einen Interaktionspunkt: wie schnell er beantwortet wird und wer antwortet. So hängt Tempo nicht davon ab, wer gerade Dienst hat.", example: "„Preisseite: Chat-Antwort innerhalb von 2 Minuten; Angebotsanfragen: Rückruf innerhalb 1 Stunde.“" },
  },
  {
    id: "routing",
    title: "Routing",
    match: ["routing"],
    plain: "Sending each request automatically to the right person or team, so it does not wait in a shared inbox.",
    de: { title: "Routing", match: ["Routing", "Weiterleitung"], plain: "Jede Anfrage automatisch an die richtige Person oder das richtige Team schicken, damit sie nicht in einem gemeinsamen Postfach wartet." },
  },
  {
    id: "liveview",
    title: "Live view",
    match: ["live view"],
    plain: "One screen where every team sees the same customer interactions and numbers as they happen, instead of each team's own tool.",
    de: { title: "Live-Sicht", match: ["Live-Sicht", "Live-Interaktionssicht"], plain: "Ein Bildschirm, auf dem jedes Team dieselben Kundeninteraktionen und Zahlen sieht, während sie passieren, statt im eigenen Werkzeug jedes Teams." },
  },
  {
    id: "popup",
    title: "Pop-up",
    match: ["pop-up", "pop-ups"],
    plain: "A window that appears over the page by itself, often with an offer. It interrupts the visitor, so it can annoy as easily as it helps.",
    de: { title: "Pop-up", match: ["Pop-up", "Pop-ups"], plain: "Ein Fenster, das von selbst über der Seite erscheint, oft mit einem Angebot. Es unterbricht den Besucher und kann deshalb genauso stören wie helfen." },
  },
  {
    id: "relaunch",
    title: "Relaunch",
    match: ["relaunch"],
    plain: "Rebuilding a whole website at once. It takes months, and until it is live nothing is learned about what works.",
    de: { title: "Relaunch", match: ["Relaunch"], plain: "Eine ganze Website auf einmal neu bauen. Das dauert Monate, und bis sie live ist, lernt man nichts darüber, was wirkt." },
  },
  // --- omnichannel (Day 10) ----------------------------------------------------------------
  {
    id: "omnichannel",
    title: "Omnichannel",
    match: ["omnichannel", "omni-channel"],
    plain: "All of a company's channels (website, shop, chat, sales, support) share the customer's data and rules, so the customer can switch from one to another without starting again.",
    example: "A customer configures online, calls sales, and the salesperson already sees the configuration.",
    from: "Verhoef et al. 2015",
    de: { title: "Omnichannel", match: ["Omnichannel", "Omnichannel-Strategie", "Omnichannel-Strategien", "Omnichannel-Prozesse", "Omnichannel-Erlebnis"], plain: "Alle Kanäle eines Unternehmens (Website, Shop, Chat, Vertrieb, Support) teilen die Daten und Regeln des Kunden, sodass er von einem zum anderen wechseln kann, ohne neu anzufangen.", example: "Ein Kunde konfiguriert online, ruft den Vertrieb an, und der Vertriebsmitarbeiter sieht die Konfiguration schon." },
  },
  {
    id: "multichannel",
    title: "Multichannel",
    match: ["multichannel", "multi-channel"],
    plain: "A company offers several channels, but each runs on its own, with its own data and its own team. The customer has choice, but starts again at every switch.",
    from: "Neslin et al. 2006",
    de: { title: "Multichannel", match: ["Multichannel", "Multichannel-Falle"], plain: "Ein Unternehmen bietet mehrere Kanäle an, aber jeder läuft für sich, mit eigenen Daten und eigenem Team. Der Kunde hat Auswahl, fängt aber bei jedem Wechsel neu an." },
  },
  {
    id: "journey",
    title: "Customer journey",
    match: ["customer journey", "customer journeys", "journey", "journeys"],
    plain: "The whole path a customer takes with a company, across every channel: from the first search to the purchase, onboarding, service and renewal.",
    from: "Lemon & Verhoef 2016",
    de: { title: "Customer Journey", match: ["Customer Journey", "Journey", "Journeys"], plain: "Der ganze Weg eines Kunden mit einem Unternehmen, über jeden Kanal: von der ersten Suche über den Kauf, das Onboarding und den Service bis zur Verlängerung." },
  },
  {
    id: "handover",
    title: "Hand-over",
    match: ["hand-over", "hand-overs", "handover", "handovers"],
    plain: "The moment one channel or team passes the customer to the next: from the website to sales, from sales to support. A good hand-over carries the history and names who takes over, by when.",
    de: { title: "Übergabe", match: ["Übergabe", "Übergaben", "Übergabekarte", "Übergabestandard", "Übergabestandards"], plain: "Der Moment, in dem ein Kanal oder Team den Kunden an den nächsten weitergibt: von der Website an den Vertrieb, vom Vertrieb an den Support. Eine gute Übergabe nimmt die Historie mit und nennt, wer bis wann übernimmt." },
  },
  {
    id: "seamless",
    title: "Seamless transition",
    match: ["seamless transition", "seamless transitions"],
    plain: "The switch from one channel to the next works by itself: someone takes over, in time, and the customer does not wait or go in a circle.",
    de: { title: "Nahtloser Übergang", match: ["nahtloser Übergang", "Nahtloser Übergang", "nahtlose Übergänge"], plain: "Der Wechsel von einem Kanal zum nächsten funktioniert von selbst: Jemand übernimmt, rechtzeitig, und der Kunde wartet nicht und dreht sich nicht im Kreis." },
  },
  {
    id: "recognition",
    title: "Recognition",
    match: ["recognition"],
    exactCase: false,
    plain: "The next channel knows who the customer is and what they already said or bought, so they never have to repeat it.",
    de: { title: "Wiedererkennung", match: ["Wiedererkennung"], plain: "Der nächste Kanal weiß, wer der Kunde ist und was er schon gesagt oder gekauft hat, sodass er es nie wiederholen muss." },
  },
  {
    id: "consistency",
    title: "Consistency",
    match: ["consistency", "inconsistent", "consistent"],
    plain: "Every channel says the same about the same thing: one price, one delivery time, one promise. Inconsistent means two channels give two answers.",
    de: { title: "Konsistenz", match: ["Konsistenz", "inkonsistent", "inkonsistentes", "inkonsistente", "konsistent"], plain: "Jeder Kanal sagt dasselbe über dieselbe Sache: ein Preis, eine Lieferzeit, eine Zusage. Inkonsistent heißt, zwei Kanäle geben zwei Antworten." },
  },
  {
    id: "profile",
    title: "Shared customer profile",
    match: ["shared customer profile", "customer profile", "shared profile"],
    plain: "One record of the customer that every channel reads and writes: contracts, orders, tickets and contacts in one place. It is what lets the next channel recognise the customer.",
    de: { title: "Gemeinsames Kundenprofil", match: ["gemeinsame Kundenprofil", "gemeinsamen Kundenprofil", "gemeinsames Kundenprofil", "Kundenprofil", "gemeinsame Profil", "gemeinsamen Profil"], plain: "Ein Datensatz des Kunden, den jeder Kanal liest und schreibt: Verträge, Bestellungen, Tickets und Kontakte an einem Ort. Er lässt den nächsten Kanal den Kunden wiedererkennen." },
  },
  {
    id: "predictive",
    title: "Predictive analytics",
    match: ["predictive analytics", "prediction", "predictions"],
    plain: "Using data about past customers to estimate what a customer is likely to do next: renew, buy more or leave. It gives a probability, not a certainty, and it is only as good as the data it sees.",
    example: "A weekly list tells an account manager which ten customers are most likely to cancel, with the reasons.",
    from: "Provost & Fawcett 2013",
    de: { title: "Predictive Analytics", match: ["Predictive Analytics", "Vorhersage", "Vorhersagen", "Vorhersagemodell", "Vorhersagemodelle"], plain: "Daten über frühere Kunden nutzen, um zu schätzen, was ein Kunde wahrscheinlich als Nächstes tut: verlängern, mehr kaufen oder gehen. Sie liefert eine Wahrscheinlichkeit, keine Gewissheit, und ist nur so gut wie die Daten, die sie sieht.", example: "Eine wöchentliche Liste sagt einem Account Manager, welche zehn Kunden am ehesten kündigen, mit den Gründen." },
  },
  {
    id: "effort",
    title: "Customer effort",
    match: ["customer effort", "effort"],
    plain: "How much work the customer has to do to get something done: waiting, repeating information, switching channels, checking which answer is true. Less effort keeps customers.",
    from: "Dixon et al. 2010",
    de: { title: "Kundenaufwand (Customer Effort)", match: ["Kundenaufwand", "Customer Effort", "Aufwand"], plain: "Wie viel Arbeit der Kunde leisten muss, um etwas zu erledigen: warten, Angaben wiederholen, Kanäle wechseln, prüfen, welche Antwort stimmt. Weniger Aufwand hält Kunden." },
  },
  {
    id: "trend",
    title: "Trend",
    match: ["trend", "trends", "trend analysis"],
    plain: "A change that holds over several periods in a row, not one good week. Reading a trend shows the direction; a fair test shows the cause.",
    example: "Customers who repeat themselves fell from 58% to 40% and then to 35%: a trend. A single week at 40% would be noise.",
    de: { title: "Trend", match: ["Trend", "Trends", "Trendanalyse"], plain: "Eine Veränderung, die über mehrere Zeiträume in Folge hält, nicht eine gute Woche. Einen Trend zu lesen zeigt die Richtung; ein fairer Test zeigt die Ursache.", example: "Kunden, die sich wiederholen, fielen von 58 % auf 40 % und dann auf 35 %: ein Trend. Eine einzelne Woche bei 40 % wäre Rauschen." },
  },
  {
    id: "roadmap",
    title: "Roadmap",
    match: ["roadmap", "roadmaps"],
    plain: "A plan of what is done in which order over the coming months, with a start, an owner and a checkpoint for each item.",
    de: { title: "Roadmap", match: ["Roadmap", "Roadmap-Punkte"], plain: "Ein Plan, was in den kommenden Monaten in welcher Reihenfolge getan wird, mit Start, Owner und Prüfpunkt für jeden Punkt." },
  },
  {
    id: "interface",
    title: "Interface",
    match: ["interface", "interfaces"],
    plain: "The technical link through which two systems exchange data, for example the ticket system and the CRM. Without it, the data stays where it was entered.",
    de: { title: "Schnittstelle", match: ["Schnittstelle", "Schnittstellen", "Ticket-Schnittstelle"], plain: "Die technische Verbindung, über die zwei Systeme Daten austauschen, etwa Ticketsystem und CRM. Ohne sie bleiben die Daten dort, wo sie eingegeben wurden." },
  },
  {
    id: "landscape",
    title: "System landscape",
    match: ["system landscape"],
    plain: "All the software systems a company runs and how they are connected: shop, CRM, ticket system, chat, billing. Complex means many systems and few connections.",
    de: { title: "Systemlandschaft", match: ["Systemlandschaft"], plain: "Alle Softwaresysteme, die ein Unternehmen betreibt, und wie sie verbunden sind: Shop, CRM, Ticketsystem, Chat, Abrechnung. Komplex heißt viele Systeme und wenige Verbindungen." },
  },
  {
    id: "configurator",
    title: "Configurator",
    match: ["configurator", "online configurator"],
    plain: "A tool on the website where a customer puts together their own offer (number of users, locations, options) and sees a price before talking to anyone.",
    de: { title: "Konfigurator", match: ["Konfigurator", "Online-Konfigurator", "Konfigurator-Eingaben"], plain: "Ein Werkzeug auf der Website, mit dem ein Kunde sein eigenes Angebot zusammenstellt (Nutzerzahl, Standorte, Optionen) und einen Preis sieht, bevor er mit jemandem spricht." },
  },
  {
    id: "cost-of-waiting",
    title: "Cost of waiting",
    match: ["cost of waiting", "costs of waiting"],
    plain: "What it costs to leave something out for now: the item's price divided by what one customer kept is worth in a year, rounded up, is the number of customers who must leave before waiting has cost as much as the item.",
    example: "An app costs €36,000 and a customer kept is worth €12,000 a year: 36,000 ÷ 12,000 = 3 customers.",
    de: { title: "Kosten des Wartens", match: ["Kosten des Wartens", "Kosten des Wartens"], plain: "Was es kostet, etwas vorerst wegzulassen: der Preis des Punkts geteilt durch das, was ein gehaltener Kunde im Jahr wert ist, aufgerundet, ist die Zahl der Kunden, die gehen müssen, bevor das Warten so viel gekostet hat wie der Punkt.", example: "Eine App kostet 36.000 € und ein gehaltener Kunde ist 12.000 € im Jahr wert: 36.000 ÷ 12.000 = 3 Kunden." },
  },
  {
    id: "halfway",
    title: "Halfway between today and the aim",
    match: ["halfway", "halfway mark", "halfway between today and the aim"],
    plain: "A number found by taking today's figure and adding half the gap to the aim (or to the limit still accepted). It is the least that shows a real change, so it is a sensible line for a trigger or a tripwire.",
    example: "Today 70%, aim 80%: 70 + (80 − 70) ÷ 2 = 75%.",
    de: { title: "Hälfte des Weges zwischen heute und Ziel", match: ["Hälfte des Weges", "Hälfte des Weges zwischen heute und Ziel"], plain: "Eine Zahl, die man findet, indem man zum heutigen Wert die Hälfte des Abstands zum Ziel (oder zur noch akzeptierten Grenze) addiert. Sie ist das Mindeste, das eine echte Veränderung zeigt, also eine sinnvolle Linie für einen Trigger oder Tripwire.", example: "Heute 70 %, Ziel 80 %: 70 + (80 − 70) ÷ 2 = 75 %." },
  },
  {
    id: "dashboard",
    title: "Dashboard",
    match: ["dashboard", "dashboards"],
    plain: "One screen that shows the few numbers a team steers by, updated by the systems, so nobody has to ask for a report.",
    example: "A sales dashboard shows the conversion rate, the open offers and the complaints on one page.",
    de: { title: "Dashboard", match: ["Dashboard", "Dashboards"], plain: "Ein Bildschirm, der die wenigen Zahlen zeigt, nach denen ein Team steuert, von den Systemen aktualisiert, sodass niemand einen Bericht anfordern muss.", example: "Ein Vertriebs-Dashboard zeigt Conversion Rate, offene Angebote und Beschwerden auf einer Seite." },
  },
  {
    id: "renewal",
    title: "Renewal",
    match: ["renewal", "renewals", "renew", "renews"],
    plain: "When a customer extends the contract for another period instead of ending it. The renewal rate is the share of contracts that are extended.",
    example: "Of 100 contracts that end this year, 80 are extended: the renewal rate is 80%.",
    de: { title: "Renewal (Vertragsverlängerung)", match: ["Renewal", "Renewals", "Verlängerung", "Verlängerungen", "verlängern", "verlängert"], plain: "Wenn ein Kunde den Vertrag für einen weiteren Zeitraum verlängert, statt ihn zu beenden. Die Verlängerungsquote ist der Anteil der Verträge, die verlängert werden.", example: "Von 100 Verträgen, die dieses Jahr enden, werden 80 verlängert: Die Verlängerungsquote ist 80 %." },
  },
  {
    id: "architecture",
    title: "Architecture (of a system)",
    match: ["architecture", "implementation architecture", "architectures"],
    plain: "Not a list of tools but how they fit together: what is built first, what depends on what, who can see what. A good one is built in order, so every tool above can be trusted because the base below it is there.",
    example: "A shared profile and KPI system first, then the hand-over standard, then the chatbot on connected data.",
    de: { title: "Architektur (eines Systems)", match: ["Architektur", "Umsetzungsarchitektur", "Architekturen"], plain: "Keine Liste von Werkzeugen, sondern wie sie zusammenpassen: was zuerst gebaut wird, was wovon abhängt, wer was sehen kann. Eine gute wird der Reihe nach gebaut, sodass man jedem Werkzeug oben trauen kann, weil die Basis darunter steht.", example: "Zuerst ein gemeinsames Profil und ein KPI-System, dann der Übergabestandard, dann der Chatbot auf verbundenen Daten." },
  },
  {
    id: "kpi-system",
    title: "KPI system",
    match: ["KPI system", "KPI-System", "shared profile and KPI system"],
    plain: "The base of the architecture: a few KPIs, each defined once and counted the same way across channels from one shared profile, so every team reads the same numbers. Everything else is measured by it, so it starts first.",
    example: "One page that shows the cross-channel deal rate, the share of customers who repeat their information and the share of hand-overs that carry the history.",
    de: { title: "KPI-System", match: ["KPI-System", "gemeinsames Profil und KPI-System"], plain: "Die Basis der Architektur: wenige KPIs, jeder einmal definiert und über alle Kanäle gleich aus einem gemeinsamen Profil gezählt, sodass jedes Team dieselben Zahlen liest. Alles andere wird daran gemessen, also startet es zuerst.", example: "Eine Seite, die die kanalübergreifende Abschlussquote, den Anteil der Kunden, die ihre Angaben wiederholen, und den Anteil der Übergaben, die die Historie mitnehmen, zeigt." },
  },
  {
    id: "connected-data",
    title: "Connected data",
    match: ["connected data", "data connected"],
    plain: "The share of the steps a tool reads whose data already reaches the shared customer profile. A tool that learns from data should start only when at least 80% is connected, otherwise it learns the gaps.",
    example: "The chatbot reads contract data that is 81% connected, so it can start; the predictions read renewal data that is 60% connected, so they wait.",
    de: { title: "Verbundene Daten", match: ["verbundene Daten", "verbundenen Daten", "Daten verbunden"], plain: "Der Anteil der Schritte, die ein Werkzeug liest und deren Daten schon das gemeinsame Kundenprofil erreichen. Ein Werkzeug, das aus Daten lernt, sollte erst starten, wenn mindestens 80 % verbunden sind, sonst lernt es die Lücken.", example: "Der Chatbot liest Vertragsdaten, die zu 81 % verbunden sind, also kann er starten; die Vorhersagen lesen Verlängerungsdaten, die zu 60 % verbunden sind, also warten sie." },
  },
];

// --- lookup ---------------------------------------------------------------------

export const GLOSS_BY_ID: Record<string, GlossEntry> = Object.fromEntries(GLOSSARY.map((g) => [g.id, g]));

/** The texts of an entry in the active language (the English text where a German version is missing). */
export function glossText(g: GlossEntry): { title: string; plain: string; example?: string; from?: string } {
  if (getLang() === "de" && g.de) return { title: g.de.title ?? g.title, plain: g.de.plain, example: g.de.example, from: g.from };
  return { title: g.title, plain: g.plain, example: g.example, from: g.from };
}

const isAcronym = (s: string) => s === s.toUpperCase() && /[A-Z]/.test(s);
const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function build(forms: (g: GlossEntry) => string[] | undefined) {
  const lookup = new Map<string, { entry: GlossEntry; exact: string | null }>();
  for (const g of GLOSSARY) for (const m of forms(g) ?? []) if (!lookup.has(m.toLowerCase())) lookup.set(m.toLowerCase(), { entry: g, exact: g.exactCase || isAcronym(m) ? m : null });
  const re = new RegExp(
    `(?<![\\p{L}\\p{N}_])(${[...lookup.keys()]
      .sort((a, b) => b.length - a.length)
      .map(escapeRe)
      .join("|")})(?![\\p{L}\\p{N}_])`,
    "giu",
  );
  return { lookup, re };
}

const EN = build((g) => g.match);
const DE = build((g) => g.de?.match);

/** lowercase written form → its entry, and whether that form must be matched exactly. */
export const GLOSS_LOOKUP = EN.lookup;
export const GLOSS_RE = EN.re;
export const GLOSS_LOOKUP_DE = DE.lookup;
export const GLOSS_RE_DE = DE.re;
