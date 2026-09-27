import { bi, t } from "@/lib/lang";

/**
 * Task 1 · Block 1.1. Nine weaknesses in one customer journey at OmniTech (online → sales → support). The learner tags each with the
 * omnichannel principle it breaks (Materi A1–A3): seamless transition, recognition or consistency. (The identifiers keep the names of the
 * sort board this file was built from: a "line" is one weakness, a "level tag" is the principle; the ids respond/personal/learn now mean
 * transition/recognition/consistency.) `truth` is never shown outside the mentor answer key.
 */
export type LevelTag = "respond" | "personal" | "learn";
export const LEVEL_TAGS = bi([
  { id: "respond" as LevelTag, label: t("Seamless transition", "Nahtloser Übergang"), hint: t("The switch between channels itself fails: the customer waits, goes in a circle, or nobody takes over.", "Der Wechsel zwischen Kanälen scheitert selbst: Der Kunde wartet, dreht sich im Kreis, oder niemand übernimmt.") },
  { id: "personal" as LevelTag, label: t("Recognition", "Wiedererkennung"), hint: t("The next channel does not know who the customer is or what they already did, so they have to repeat it.", "Der nächste Kanal weiß nicht, wer der Kunde ist oder was er schon getan hat, also muss er es wiederholen.") },
  { id: "learn" as LevelTag, label: t("Consistency", "Konsistenz"), hint: t("Two channels say or show different things: prices, promises, answers, tone.", "Zwei Kanäle sagen oder zeigen Verschiedenes: Preise, Versprechen, Antworten, Ton.") },
]);
export const LEVEL_LABEL = bi({ respond: t("Seamless transition", "Nahtloser Übergang"), personal: t("Recognition", "Wiedererkennung"), learn: t("Consistency", "Konsistenz") });

export type LineId = "l1" | "l2" | "l3" | "l4" | "l5" | "l6" | "l7" | "l8" | "l9";
export type Line = { id: LineId; text: string; source: string; truth: LevelTag; clue: string; why: string; rejected: Partial<Record<LevelTag, string>> };

export const LINES: Line[] = bi([
  {
    id: "l1" as LineId,
    source: t("Online → sales", "Online → Vertrieb"),
    text: t("After the customer completes the online configurator, an automatic e-mail says “we will be in touch”, and nobody calls for nine days.", "Nachdem der Kunde den Online-Konfigurator ausgefüllt hat, sagt eine automatische E-Mail „wir melden uns“, und neun Tage lang ruft niemand an."),
    truth: "respond" as LevelTag,
    clue: t("Is the problem what sales knows, or that nobody takes over at all?", "Ist das Problem, was der Vertrieb weiß, oder dass überhaupt niemand übernimmt?"),
    why: t("The hand-over from online to sales has no owner and no time: the transition itself fails.", "Die Übergabe von online an den Vertrieb hat keinen Owner und keine Frist: Der Übergang selbst scheitert."),
    rejected: { personal: t("Nobody has contacted the customer yet, so nobody can fail to recognise them.", "Noch hat niemand den Kunden kontaktiert, also kann ihn auch niemand nicht wiedererkennen.") },
  },
  {
    id: "l2" as LineId,
    source: t("Chat → person", "Chat → Mensch"),
    text: t("The chatbot cannot hand over to a person: after three answers that do not help, it suggests starting the conversation again.", "Der Chatbot kann nicht an einen Menschen übergeben: Nach drei Antworten, die nicht helfen, schlägt er vor, das Gespräch neu zu beginnen."),
    truth: "respond" as LevelTag,
    clue: t("Where can the customer go next?", "Wohin kann der Kunde als Nächstes?"),
    why: t("There is no route from the bot to a person: the customer goes in a circle, a broken transition.", "Es gibt keinen Weg vom Bot zu einem Menschen: Der Kunde dreht sich im Kreis, ein gebrochener Übergang."),
    rejected: { learn: t("The bot is not contradicting another channel; it has no way out.", "Der Bot widerspricht keinem anderen Kanal; er hat keinen Ausweg.") },
  },
  {
    id: "l3" as LineId,
    source: t("Sales → support", "Vertrieb → Support"),
    text: t("After signing, the customer is told to “contact support”, without a name, a number or a ticket; the first call lands in the general hotline queue.", "Nach der Unterschrift heißt es „wenden Sie sich an den Support“, ohne Namen, Nummer oder Ticket; der erste Anruf landet in der allgemeinen Hotline-Warteschlange."),
    truth: "respond" as LevelTag,
    clue: t("Who takes the customer over after the signature?", "Wer übernimmt den Kunden nach der Unterschrift?"),
    why: t("Sales lets go and support does not take over: the customer falls into the gap between two teams.", "Der Vertrieb lässt los, und der Support übernimmt nicht: Der Kunde fällt in die Lücke zwischen zwei Teams."),
    rejected: { learn: t("Nobody gives a different answer; nobody gives an answer at all.", "Niemand gibt eine andere Antwort; niemand gibt überhaupt eine.") },
  },
  {
    id: "l4" as LineId,
    source: t("Online → sales", "Online → Vertrieb"),
    text: t("The salesperson calls and asks for company size, locations and number of users, all of which the customer entered in the configurator.", "Der Vertriebsmitarbeiter ruft an und fragt nach Unternehmensgröße, Standorten und Nutzerzahl, die der Kunde alle im Konfigurator eingegeben hat."),
    truth: "personal" as LevelTag,
    clue: t("Does the customer have to say anything they already said?", "Muss der Kunde etwas sagen, das er schon gesagt hat?"),
    why: t("The call happens, but sales does not see what the customer did online: the customer is not recognised and repeats everything.", "Der Anruf findet statt, aber der Vertrieb sieht nicht, was der Kunde online getan hat: Der Kunde wird nicht wiedererkannt und wiederholt alles."),
    rejected: { respond: t("The hand-over worked: someone called. What failed is what they knew.", "Die Übergabe hat funktioniert: Jemand hat angerufen. Gescheitert ist, was er wusste.") },
  },
  {
    id: "l5" as LineId,
    source: t("Sales → support", "Vertrieb → Support"),
    text: t("Support asks for the contract number and which products were bought, because the ticket system does not show the contract.", "Der Support fragt nach der Vertragsnummer und den gekauften Produkten, weil das Ticketsystem den Vertrag nicht anzeigt."),
    truth: "personal" as LevelTag,
    clue: t("What does support not know that OmniTech already knows?", "Was weiß der Support nicht, was OmniTech schon weiß?"),
    why: t("The contract lives in the sales system and never reaches support: the customer is not recognised.", "Der Vertrag liegt im Vertriebssystem und erreicht den Support nie: Der Kunde wird nicht wiedererkannt."),
    rejected: { learn: t("Support does not contradict sales; it simply does not see what sales sold.", "Der Support widerspricht dem Vertrieb nicht; er sieht einfach nicht, was der Vertrieb verkauft hat.") },
  },
  {
    id: "l6" as LineId,
    source: t("Website after signing", "Website nach der Unterschrift"),
    text: t("Back on the website after signing, the customer still sees banners for the free trial for new customers.", "Zurück auf der Website sieht der Kunde nach der Unterschrift noch Banner für die kostenlose Testphase für Neukunden."),
    truth: "personal" as LevelTag,
    clue: t("Does the website know this visitor is now a customer?", "Weiß die Website, dass dieser Besucher jetzt Kunde ist?"),
    why: t("The website treats a signed customer as a stranger: it does not recognise them.", "Die Website behandelt einen Kunden mit Vertrag wie einen Fremden: Sie erkennt ihn nicht wieder."),
    rejected: { learn: t("The banner is the same one every visitor sees; the fault is that the site does not know who is looking.", "Das Banner ist dasselbe, das jeder Besucher sieht; der Fehler ist, dass die Seite nicht weiß, wer schaut.") },
  },
  {
    id: "l7" as LineId,
    source: t("Online vs sales", "Online vs. Vertrieb"),
    text: t("The configurator shows €38 per user and month; the offer from sales says €45 for the same package.", "Der Konfigurator zeigt 38 € pro Nutzer und Monat; das Angebot des Vertriebs nennt 45 € für dasselbe Paket."),
    truth: "learn" as LevelTag,
    clue: t("Two channels answer. Do they say the same thing?", "Zwei Kanäle antworten. Sagen sie dasselbe?"),
    why: t("Two channels give two prices for one package: the experience is inconsistent, and trust goes.", "Zwei Kanäle nennen zwei Preise für ein Paket: Das Erlebnis ist inkonsistent, und das Vertrauen geht."),
    rejected: { personal: t("Sales may know the customer well; the problem is that its price differs from the website's.", "Der Vertrieb kennt den Kunden vielleicht gut; das Problem ist, dass sein Preis von dem der Website abweicht.") },
  },
  {
    id: "l8" as LineId,
    source: t("Website vs contract", "Website vs. Vertrag"),
    text: t("The website promises a support response within four hours; the support contract says next business day.", "Die Website verspricht eine Support-Antwort innerhalb von vier Stunden; der Supportvertrag sagt nächster Werktag."),
    truth: "learn" as LevelTag,
    clue: t("Which promise holds?", "Welches Versprechen gilt?"),
    why: t("The same service is promised in two different ways: an inconsistent promise.", "Derselbe Service wird auf zwei verschiedene Arten versprochen: ein inkonsistentes Versprechen."),
    rejected: { respond: t("No hand-over fails here; two written promises disagree.", "Hier scheitert keine Übergabe; zwei schriftliche Versprechen widersprechen sich.") },
  },
  {
    id: "l9" as LineId,
    source: t("Chat vs sales", "Chat vs. Vertrieb"),
    text: t("The chatbot says customer data is hosted in Germany; the salesperson says “within the EU”.", "Der Chatbot sagt, Kundendaten werden in Deutschland gehostet; der Vertriebsmitarbeiter sagt „innerhalb der EU“."),
    truth: "learn" as LevelTag,
    clue: t("Is anyone missing information about the customer, or do two answers differ?", "Fehlt jemandem eine Information über den Kunden, oder weichen zwei Antworten ab?"),
    why: t("Two channels answer the same question differently: inconsistency on a point the customer's decision depends on.", "Zwei Kanäle beantworten dieselbe Frage verschieden: Inkonsistenz bei einem Punkt, von dem die Entscheidung des Kunden abhängt."),
    rejected: { personal: t("Neither answer depends on who the customer is; they simply differ.", "Keine der Antworten hängt davon ab, wer der Kunde ist; sie weichen einfach ab.") },
  },
]);
export const LINE_IDS: LineId[] = ["l1", "l2", "l3", "l4", "l5", "l6", "l7", "l8", "l9"];

/** The tests taught in Materi A1–A3 for each principle, and the pair tests. */
export const LEVEL_TESTS = bi([
  { name: t("Seamless transition", "Nahtloser Übergang"), test: t("Does the switch from one channel to the next fail by itself: a wait with no owner, a dead end, nobody who takes over?", "Scheitert der Wechsel von einem Kanal zum nächsten selbst: Warten ohne Owner, eine Sackgasse, niemand, der übernimmt?") },
  { name: t("Recognition", "Wiedererkennung"), test: t("Does the next channel lack what the customer already told or did, so they have to repeat it or are treated as a stranger?", "Fehlt dem nächsten Kanal, was der Kunde schon gesagt oder getan hat, sodass er es wiederholen muss oder wie ein Fremder behandelt wird?") },
  { name: t("Consistency", "Konsistenz"), test: t("Do two channels say or show different things about the same price, promise or fact?", "Sagen oder zeigen zwei Kanäle Verschiedenes über denselben Preis, dasselbe Versprechen oder dieselbe Tatsache?") },
  { name: t("Transition or recognition?", "Übergang oder Wiedererkennung?"), test: t("Ask whether anyone takes over. If nobody does, or the customer waits or circles, the transition fails. If someone takes over but does not know what happened before, recognition fails.", "Fragen Sie, ob jemand übernimmt. Tut es niemand, oder wartet der Kunde oder dreht sich im Kreis, scheitert der Übergang. Übernimmt jemand, weiß aber nicht, was vorher geschah, scheitert die Wiedererkennung.") },
  { name: t("Recognition or consistency?", "Wiedererkennung oder Konsistenz?"), test: t("Recognition is about what a channel knows of this customer. Consistency is about whether two channels give the same answer, whoever asks.", "Wiedererkennung betrifft, was ein Kanal über diesen Kunden weiß. Konsistenz betrifft, ob zwei Kanäle dieselbe Antwort geben, egal wer fragt.") },
]);
