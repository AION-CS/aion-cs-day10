"use client";

import { Bul, Diagram } from "@/components/materi/kit";
import { ArchExample, CompProfile, DataStages, LiftCases, SourceGrid } from "@/components/materi/diagramsB";
import { Callout, DataTable, MaterialCard } from "@/components/ui/MaterialCard";
import { CASES_MIN, CRITERIA, LIFT_ACT, LIFT_WATCH, QUALITY_BAR } from "@/data/route2";
import { tt } from "@/lib/lang";

/** Materi B: the five cards of Route 2 (Level 3). 60 minutes in all. */
const p = "text-body text-ink";

export function CardB1() {
  return (
    <MaterialCard
      id="B1"
      scan={tt("An integrated customer system is not a better channel here and there. It is one customer profile that every channel shares, a hand-over standard with an owner for every transition, and a regular review that decides on every measure by the same KPIs across channels. It is built around the customer, not around the channels.", "Ein integriertes Kundensystem ist kein besserer Kanal hier und da. Es ist ein Kundenprofil, das jeder Kanal teilt, ein Übergabestandard mit Owner für jeden Übergang und ein regelmäßiges Review, das über jede Maßnahme nach denselben kanalübergreifenden KPIs entscheidet. Es ist um den Kunden gebaut, nicht um die Kanäle.")}
      reasoning={[
        tt("One shared customer profile comes first: if every channel keeps its own customer list, the customer is a stranger at every switch, however good each channel is.", "Ein gemeinsames Kundenprofil kommt zuerst: Führt jeder Kanal seine eigene Kundenliste, ist der Kunde bei jedem Wechsel ein Fremder, egal wie gut jeder Kanal ist."),
        tt("A hand-over standard per transition (what travels with the customer, who takes over and by when, which price and promises hold) is what turns “customer experience inconsistent” into a designed journey.", "Ein Übergabestandard pro Übergang (was mit dem Kunden mitreist, wer bis wann übernimmt, welcher Preis und welche Zusagen gelten) macht aus „Kundenerlebnis inkonsistent“ eine gestaltete Journey."),
        tt("KPI owners and a monthly review by the same KPIs for every channel keep the system honest; both are good additions to the two foundations.", "KPI-Owner und ein monatliches Review nach denselben KPIs für jeden Kanal halten das System ehrlich; beides sind gute Ergänzungen zu den zwei Fundamenten."),
        tt("Opening as many channels as possible is the multichannel trap: every channel that does not know the others adds a place where the journey breaks.", "So viele Kanäle wie möglich zu öffnen ist die Multichannel-Falle: Jeder Kanal, der die anderen nicht kennt, schafft eine Stelle, an der die Journey bricht."),
        tt("Replacing every system with one suite before anything changes for customers is not a vision: it takes longer than the time available, and the competition does not wait.", "Jedes System durch eine Suite zu ersetzen, bevor sich für Kunden etwas ändert, ist kein Zielbild: Es dauert länger als die verfügbare Zeit, und der Wettbewerb wartet nicht."),
      ]}
      sources={["verhoef2015", "lemon2016"]}
    >
      <p className={p}>
        {tt(
          "Verhoef, Kannan and Inman (2015) describe omnichannel management as steering all channels and touchpoints together, so that the experience across them is optimised. Lemon and Verhoef (2016) add that the experience is built across the whole journey; a system that serves the journey needs the customer's data and the transitions to be managed, not only each channel.",
          "Verhoef, Kannan und Inman (2015) beschreiben Omnichannel-Management als gemeinsame Steuerung aller Kanäle und Touchpoints, sodass das Erlebnis über alle optimiert wird. Lemon und Verhoef (2016) ergänzen, dass das Erlebnis über die ganze Journey entsteht; ein System, das der Journey dient, muss die Daten des Kunden und die Übergänge steuern, nicht nur jeden Kanal.",
        )}
      </p>
      <Diagram label={tt("Four stages towards an integrated system · a worked example on Isar Datentechnik", "Vier Stufen zu einem integrierten System · ein Beispiel mit Isar Datentechnik")} caption={tt("Click a stage and read what changes for the company at that stage.", "Klicken Sie eine Stufe an und lesen Sie, was sich auf dieser Stufe für das Unternehmen ändert.")}>
        <DataStages />
      </Diagram>
    </MaterialCard>
  );
}

export function CardB2() {
  return (
    <MaterialCard
      id="B2"
      scan={tt("Not every process needs to be integrated first. A process is central when the customer decides something in it (buy, sign, start using, stay, renew); it is ready to integrate when enough of its data already reaches the shared profile. Volume is not the test.", "Nicht jeder Prozess muss zuerst integriert werden. Ein Prozess ist zentral, wenn der Kunde darin etwas entscheidet (kaufen, unterschreiben, nutzen, bleiben, verlängern); er ist bereit zur Integration, wenn genug seiner Daten schon das gemeinsame Profil erreichen. Menge ist nicht der Test.")}
      reasoning={[
        tt("No customer decision happens in the process → not central, however busy or well connected.", "Im Prozess fällt keine Kundenentscheidung → nicht zentral, egal wie viel los ist oder wie gut er verbunden ist."),
        tt(`A decision happens in it and at least ${QUALITY_BAR}% of its data reaches the profile → central: integrate now, with a hand-over standard.`, `Darin fällt eine Entscheidung, und mindestens ${QUALITY_BAR} % seiner Daten erreichen das Profil → zentral: jetzt integrieren, mit Übergabestandard.`),
        tt(`A decision happens in it but less than ${QUALITY_BAR}% is connected → central, but connect the data first: integrating it now would build on gaps.`, `Darin fällt eine Entscheidung, aber weniger als ${QUALITY_BAR} % sind verbunden → zentral, aber zuerst die Daten verbinden: Ihn jetzt zu integrieren hieße, auf Lücken zu bauen.`),
        tt("Volume and cost are not the test: a quiet renewal talk is central, a busy newsletter is not.", "Menge und Kosten sind nicht der Test: Ein ruhiges Verlängerungsgespräch ist zentral, ein viel versandter Newsletter nicht."),
        tt("In a complex system landscape, connecting the data of one process at a time is normal; start with the processes where customers decide and the data is ready.", "In einer komplexen Systemlandschaft ist es normal, die Daten eines Prozesses nach dem anderen zu verbinden; beginnen Sie mit den Prozessen, in denen Kunden entscheiden und die Daten bereit sind."),
      ]}
      sources={["rawson2013", "gdpr2016"]}
    >
      <p className={p}>
        {tt(
          "Rawson, Duncan and Jones (2013) found that the journeys that matter most are few, and that firms improve fastest by managing those end to end, across departments. Joining data has limits too: under the GDPR, personal data needs a lawful basis and website tracking usually needs consent, so a profile with gaps is normal, not a failure. Start where the decision is and the data is good enough.",
          "Rawson, Duncan und Jones (2013) fanden, dass die wichtigsten Journeys wenige sind und dass Unternehmen am schnellsten besser werden, wenn sie diese durchgängig über Abteilungen hinweg steuern. Auch das Verbinden von Daten hat Grenzen: Nach der DSGVO brauchen personenbezogene Daten eine Rechtsgrundlage, und Website-Tracking braucht meist eine Einwilligung, also ist ein Profil mit Lücken normal, kein Versagen. Beginnen Sie dort, wo die Entscheidung fällt und die Daten gut genug sind.",
        )}
      </p>
      <Diagram label={tt("Isar Datentechnik's processes, sorted by customer decision and connected data", "Prozesse von Isar Datentechnik, nach Kundenentscheidung und verbundenen Daten sortiert")} caption={tt("Click a process to read where it goes and why.", "Klicken Sie einen Prozess an, um zu lesen, wohin er gehört und warum.")}>
        <SourceGrid />
      </Diagram>
    </MaterialCard>
  );
}

export function CardB3() {
  return (
    <MaterialCard
      id="B3"
      scan={tt("A cross-channel KPI system needs a few KPIs that pass four tests: linked to value, early, covering every customer in every channel, and measured automatically. Rate each candidate, capped by its printed facts. A KPI per channel keeps the channels apart; a KPI across channels steers the journey.", "Ein kanalübergreifendes KPI-System braucht wenige KPIs, die vier Tests bestehen: mit dem Wert verbunden, früh, jeden Kunden in jedem Kanal abdeckend und automatisch gemessen. Bewerten Sie jeden Kandidaten, gedeckelt durch seine gedruckten Fakten. Ein KPI pro Kanal hält die Kanäle getrennt; ein kanalübergreifender KPI steuert die Journey.")}
      reasoning={[
        ...CRITERIA.map((c) => `${c.name}: ${c.test} ${tt("Low", "Niedrig")}: ${c.low} ${tt("High", "Hoch")}: ${c.high}`),
        tt("The printed facts cap the ratings: not linked to value → link Low; after the customer has left or twice a year → early Low, monthly → at most Mid; only some customers → reach at most Mid; by a survey → measured automatically at most Mid, collected by hand → Low.", "Die gedruckten Fakten deckeln die Bewertungen: nicht mit dem Wert verbunden → Verbindung Niedrig; nachdem der Kunde gegangen ist oder zweimal im Jahr → früh Niedrig, monatlich → höchstens Mittel; nur einige Kunden → Reichweite höchstens Mittel; über eine Befragung → automatisch gemessen höchstens Mittel, von Hand gesammelt → Niedrig."),
        tt("A management system needs most of its KPIs to show a change within days or weeks; a number that counts the loss afterwards is for learning, not for steering.", "Ein Managementsystem braucht die meisten KPIs so, dass sie eine Veränderung innerhalb von Tagen oder Wochen zeigen; eine Zahl, die den Verlust hinterher zählt, dient dem Lernen, nicht dem Steuern."),
        tt("The KPI with the greatest leverage is usually the driver the problem names, if it is also linked to value and automatic: every measure can be steered by it within weeks.", "Der KPI mit der größten Hebelwirkung ist meist der Treiber, den das Problem nennt, wenn er zugleich mit dem Wert verbunden und automatisch ist: Jede Maßnahme lässt sich innerhalb von Wochen daran steuern."),
      ]}
      sources={["kaplan1992", "neslin2006"]}
    >
      <p className={p}>
        {tt(
          "Kaplan and Norton (1992) showed that managers steer better by a few linked measures, results and the drivers behind them, than by many unrelated ones. Neslin and colleagues (2006) name measuring across channels as a core challenge: when each channel counts its own success, the same customer is claimed several times and the breaks between channels are counted nowhere.",
          "Kaplan und Norton (1992) zeigten, dass Führungskräfte besser nach wenigen verbundenen Kennzahlen steuern, Ergebnissen und den Treibern dahinter, als nach vielen unverbundenen. Neslin und Kollegen (2006) nennen kanalübergreifendes Messen eine Kernaufgabe: Zählt jeder Kanal seinen eigenen Erfolg, wird derselbe Kunde mehrfach beansprucht, und die Brüche zwischen Kanälen werden nirgends gezählt.",
        )}
      </p>
      <Diagram label={tt("Four KPI candidates of Isar Datentechnik on four tests", "Vier KPI-Kandidaten von Isar Datentechnik nach vier Tests")} caption={tt("Choose a candidate and compare its profile with the printed facts under it.", "Wählen Sie einen Kandidaten und vergleichen Sie sein Profil mit den gedruckten Fakten darunter.")}>
        <CompProfile />
      </Diagram>
    </MaterialCard>
  );
}

export function CardB4() {
  return (
    <MaterialCard
      id="B4"
      scan={tt("AI tools are selected and integrated by testing them on the joined data: every test ends in a decision, roll out, keep testing or stop, and who acts. Two numbers decide it: the uplift over the control group, and how many conversions it rests on. A tool that breaks consistency is stopped, however clever.", "KI-Werkzeuge werden ausgewählt und integriert, indem man sie auf den verbundenen Daten testet: Jeder Test endet in einer Entscheidung, ausrollen, weiter testen oder stoppen, und wer handelt. Zwei Zahlen entscheiden: der Uplift gegenüber der Kontrollgruppe und auf wie vielen Conversions er beruht. Ein Werkzeug, das die Konsistenz bricht, wird gestoppt, so klug es auch ist.")}
      reasoning={[
        tt(`Roll out when the uplift is ${LIFT_ACT}% or more and each group has at least ${CASES_MIN} conversions: the gain is clear and proven.`, `Ausrollen, wenn der Uplift ${LIFT_ACT} % oder mehr beträgt und jede Gruppe mindestens ${CASES_MIN} Conversions hat: Der Gewinn ist klar und belegt.`),
        tt(`Keep testing when the uplift is ${LIFT_ACT}% or more but on fewer than ${CASES_MIN} conversions, or when it is between ${LIFT_WATCH}% and ${LIFT_ACT}%.`, `Weiter testen, wenn der Uplift ${LIFT_ACT} % oder mehr beträgt, aber auf weniger als ${CASES_MIN} Conversions beruht, oder wenn er zwischen ${LIFT_WATCH} % und ${LIFT_ACT} % liegt.`),
        tt(`Stop when the uplift is below ${LIFT_WATCH}% or negative. Many conversions do not rescue a tiny uplift: they prove it is tiny.`, `Stoppen, wenn der Uplift unter ${LIFT_WATCH} % liegt oder negativ ist. Viele Conversions retten keinen winzigen Uplift: Sie belegen, dass er winzig ist.`),
        tt("A guardrail can stop a winner: if customers have to repeat themselves more, or complaints about contradictory information rise, the tool is not rolled out until the cause is fixed.", "Eine Guardrail kann einen Gewinner stoppen: Müssen sich Kunden öfter wiederholen oder steigen Beschwerden über widersprüchliche Informationen, wird das Werkzeug nicht ausgerollt, bis die Ursache behoben ist."),
        tt("Integration decides the value of an AI tool: the same chatbot or prediction does more when it reads the shared profile than when it sees one system only.", "Die Integration entscheidet über den Wert eines KI-Werkzeugs: Derselbe Chatbot oder dieselbe Vorhersage leistet mehr, wenn er das gemeinsame Profil liest, als wenn er nur ein System sieht."),
        tt("Who acts follows from what the tool is about: a tool in the chat or the support goes to service, one used by account managers goes to sales; keep testing belongs to the data team; a stopped test has no owner.", "Wer handelt, folgt daraus, worum es beim Werkzeug geht: Ein Werkzeug in Chat oder Support geht an den Service, eines für Account Manager an den Vertrieb; Weitertesten gehört dem Datenteam; ein gestoppter Test hat keinen Owner."),
      ]}
      sources={["kohavi2020", "davenport2018"]}
    >
      <p className={p}>
        {tt(
          "Kohavi, Tang and Xu (2020) describe how firms that test continuously decide on each result with rules agreed before the test: a minimum effect worth shipping, a minimum sample, and guardrail metrics that veto a rollout. Davenport and Ronanki (2018) add that AI pays where it is integrated into existing processes and systems, and rarely as a stand-alone tool.",
          "Kohavi, Tang und Xu (2020) beschreiben, wie Firmen, die laufend testen, über jedes Ergebnis mit Regeln entscheiden, die vor dem Test vereinbart sind: ein Mindesteffekt, der einen Rollout lohnt, eine Mindeststichprobe und Guardrail-Kennzahlen, die einen Rollout verhindern können. Davenport und Ronanki (2018) ergänzen, dass KI sich dort lohnt, wo sie in bestehende Prozesse und Systeme integriert ist, und selten als allein stehendes Werkzeug.",
        )}
      </p>
      <Diagram label={tt("Roll out, keep testing or stop · move the two sliders", "Ausrollen, weiter testen oder stoppen · die zwei Regler bewegen")} caption={tt("Set an uplift and a number of conversions and read which decision the rule gives.", "Stellen Sie einen Uplift und eine Zahl von Conversions ein und lesen Sie, welche Entscheidung die Regel ergibt.")}>
        <LiftCases />
      </Diagram>
      <DataTable
        head={[tt("Isar test", "Test bei Isar"), tt("Uplift", "Uplift"), tt("Conversions", "Conversions"), tt("Rule gives", "Regel ergibt"), tt("Who acts", "Wer handelt")]}
        rows={[
          [tt("Chatbot that reads order status from the profile", "Chatbot, der den Bestellstatus aus dem Profil liest"), "+36%", "150", tt("Roll out", "Ausrollen"), tt("Service", "Service")],
          [tt("Upgrade prediction for account managers", "Upgrade-Vorhersage für Account Manager"), "+28%", "30", tt("Keep testing", "Weiter testen"), tt("Data team", "Datenteam")],
          [tt("Avatar video in every e-mail", "Avatar-Video in jeder E-Mail"), "+1%", "700", tt("Stop", "Stoppen"), tt("No one", "Niemand")],
        ]}
        caption={tt("A worked decision on other tests (Case assumption)", "Eine Beispielentscheidung mit anderen Tests (Fallannahme)")}
      />
    </MaterialCard>
  );
}

export function CardB5() {
  return (
    <MaterialCard
      id="B5"
      scan={tt("An investment decision under unclear success prospects is made in stages: invest now where the breaks cost most and the data is ready, measure from the first day, and agree on the result that makes you change course. The roadmap gives every funded item a start, one owner and a trigger.", "Eine Investitionsentscheidung bei unklaren Erfolgsaussichten fällt in Stufen: jetzt dort investieren, wo die Brüche am meisten kosten und die Daten bereit sind, ab dem ersten Tag messen und das Ergebnis vereinbaren, bei dem Sie den Kurs ändern. Die Roadmap gibt jedem finanzierten Punkt einen Start, einen Owner und einen Trigger.")}
      reasoning={[
        tt("Waiting until success is proven is also a decision: every break in the journey stays in the meantime, competitors move on, and the hand-overs could be fixed within weeks. The brief asks for an investment decision despite unclear prospects.", "Zu warten, bis der Erfolg bewiesen ist, ist auch eine Entscheidung: Jeder Bruch in der Journey bleibt in der Zwischenzeit, der Wettbewerb zieht weiter, und die Übergaben ließen sich in Wochen beheben. Der Auftrag verlangt eine Investitionsentscheidung trotz unklarer Aussichten."),
        tt("Buying one big suite at once feels like catching up, but it is in use only after many months, takes most of the budget, and nothing is measured before the money is spent. Staging changes something for customers within weeks and spends the rest as the evidence arrives.", "Eine große Suite auf einmal zu kaufen fühlt sich wie Aufholen an, ist aber erst nach vielen Monaten in Betrieb, nimmt den Großteil des Budgets, und nichts wird gemessen, bevor das Geld ausgegeben ist. Stufenweise ändert sich innerhalb von Wochen etwas für Kunden, und der Rest wird ausgegeben, während die Evidenz kommt."),
        tt("Integration first: the shared customer profile starts no later than the first other item, because every other item, including every AI tool, reads from it and is measured by it.", "Integration zuerst: Das gemeinsame Kundenprofil startet nicht später als der erste andere Punkt, weil jeder andere Punkt, auch jedes KI-Werkzeug, daraus liest und daran gemessen wird."),
        tt("Fund inside the budget, and fund nothing nobody at the company can explain or measure: a black box cannot be steered.", "Finanzieren Sie innerhalb des Budgets, und nichts, was im Unternehmen niemand erklären oder messen kann: Eine Black Box lässt sich nicht steuern."),
        tt("Owner test: who can change the item without asking anyone else? Trigger test: a metric, a number, a date and an action.", "Owner-Test: Wer kann den Punkt ändern, ohne jemanden zu fragen? Trigger-Test: eine Kennzahl, eine Zahl, ein Datum und eine Aktion."),
        tt("A tripwire measures how customers behave (the cross-channel deal rate, customers who repeat themselves), not your own speed or output (hours to first contact, channels, downloads), and its threshold is better than today.", "Ein Tripwire misst, wie Kunden sich verhalten (kanalübergreifende Abschlussquote, Kunden, die sich wiederholen), nicht Ihr eigenes Tempo oder Ihren Output (Stunden bis zum ersten Kontakt, Kanäle, Downloads), und sein Schwellenwert ist besser als heute."),
        tt("When the experience improves and deals lag, check whether the result moved where the change was made and whether the base is large enough before you change the plan; do not stop what works or buy what cannot run in time.", "Wenn das Erlebnis besser wird und die Abschlüsse hinterherhinken, prüfen Sie, ob sich das Ergebnis dort bewegte, wo die Änderung gemacht wurde, und ob die Basis groß genug ist, bevor Sie den Plan ändern; stoppen Sie nicht, was wirkt, und kaufen Sie nicht, was nicht rechtzeitig laufen kann."),
      ]}
      sources={["courtney1997", "klein2007"]}
    >
      <Diagram label={tt("Three funded items over six months · a worked example on Isar Datentechnik", "Drei finanzierte Punkte über sechs Monate · ein Beispiel mit Isar Datentechnik")} caption={tt("Click a row to read its owner, its trigger and why it starts when it does.", "Klicken Sie eine Zeile an, um Owner, Trigger und den Grund für den Start zu lesen.")}>
        <ArchExample />
      </Diagram>
      <Bul
        items={[
          tt("Stage it: the no-regret items (the shared profile, the hand-over standard on the most critical transition) first, the AI tools when the joined data is there.", "Stufenweise: die No-regret-Punkte (gemeinsames Profil, Übergabestandard am kritischsten Übergang) zuerst, die KI-Werkzeuge, wenn die verbundenen Daten da sind."),
          tt("Premortem: imagine the programme failed after six months, and write down why. Those reasons are your assumptions to watch.", "Premortem: Stellen Sie sich vor, das Programm sei nach sechs Monaten gescheitert, und schreiben Sie auf, warum. Diese Gründe sind die Annahmen, die Sie beobachten."),
          tt("What does not fit gets a pickup point: the number and the date at which you look at it again.", "Was nicht passt, bekommt einen Pickup Point: die Zahl und das Datum, zu dem Sie es wieder ansehen."),
        ]}
      />
      <Callout label={tt("Unclear prospects are not a reason to bet everything, or nothing", "Unklare Aussichten sind kein Grund, alles oder nichts zu setzen")} tone="signal">
        <p>{tt("Courtney, Kirkland and Viguerie (1997) advise matching the commitment to what is known: no-regret moves now, options that can be scaled later, and big bets only when the evidence is in. A staged investment with a tripwire is decisive and still honest about what you do not know yet.", "Courtney, Kirkland und Viguerie (1997) raten, die Festlegung an das Bekannte anzupassen: No-regret-Schritte jetzt, Optionen, die sich später ausweiten lassen, und große Wetten erst, wenn die Evidenz da ist. Eine gestufte Investition mit Tripwire ist entschlossen und trotzdem ehrlich darüber, was Sie noch nicht wissen.")}</p>
      </Callout>
    </MaterialCard>
  );
}

export const CARDS_B = [CardB1, CardB2, CardB3, CardB4, CardB5];
