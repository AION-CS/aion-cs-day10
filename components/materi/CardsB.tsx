"use client";

import { Bul, Diagram } from "@/components/materi/kit";
import { ArchExample, CompProfile, DataStages, LiftCases, SourceGrid } from "@/components/materi/diagramsB";
import { Callout, DataTable, MaterialCard } from "@/components/ui/MaterialCard";
import { ShowMore } from "@/components/ui/ShowMore";
import { CASES_MIN, CRITERIA, LIFT_ACT, LIFT_WATCH, QUALITY_BAR, R2_MONTHS } from "@/data/route2";
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
      <ShowMore id="B1" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Verhoef, Kannan and Inman (2015) describe omnichannel management as steering all channels and touchpoints together, so that the experience across them is optimised. Lemon and Verhoef (2016) add that the experience is built across the whole journey; a system that serves the journey needs the customer's data and the transitions to be managed, not only each channel.",
            "Verhoef, Kannan und Inman (2015) beschreiben Omnichannel-Management als gemeinsame Steuerung aller Kanäle und Touchpoints, sodass das Erlebnis über alle optimiert wird. Lemon und Verhoef (2016) ergänzen, dass das Erlebnis über die ganze Journey entsteht; ein System, das der Journey dient, muss die Daten des Kunden und die Übergänge steuern, nicht nur jeden Kanal.",
          )}
        </p>
      </ShowMore>
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
      <ShowMore id="B2" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Rawson, Duncan and Jones (2013) found that the journeys that matter most are few, and that firms improve fastest by managing those end to end, across departments. Joining data has limits too: under the GDPR, personal data needs a lawful basis and website tracking usually needs consent, so a profile with gaps is normal, not a failure. Start where the decision is and the data is good enough.",
            "Rawson, Duncan und Jones (2013) fanden, dass die wichtigsten Journeys wenige sind und dass Unternehmen am schnellsten besser werden, wenn sie diese durchgängig über Abteilungen hinweg steuern. Auch das Verbinden von Daten hat Grenzen: Nach der DSGVO brauchen personenbezogene Daten eine Rechtsgrundlage, und Website-Tracking braucht meist eine Einwilligung, also ist ein Profil mit Lücken normal, kein Versagen. Beginnen Sie dort, wo die Entscheidung fällt und die Daten gut genug sind.",
          )}
        </p>
      </ShowMore>
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
      <ShowMore id="B3" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Kaplan and Norton (1992) showed that managers steer better by a few linked measures, results and the drivers behind them, than by many unrelated ones. Neslin and colleagues (2006) name measuring across channels as a core challenge: when each channel counts its own success, the same customer is claimed several times and the breaks between channels are counted nowhere.",
            "Kaplan und Norton (1992) zeigten, dass Führungskräfte besser nach wenigen verbundenen Kennzahlen steuern, Ergebnissen und den Treibern dahinter, als nach vielen unverbundenen. Neslin und Kollegen (2006) nennen kanalübergreifendes Messen eine Kernaufgabe: Zählt jeder Kanal seinen eigenen Erfolg, wird derselbe Kunde mehrfach beansprucht, und die Brüche zwischen Kanälen werden nirgends gezählt.",
          )}
        </p>
      </ShowMore>
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
      <ShowMore id="B4" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Kohavi, Tang and Xu (2020) describe how firms that test continuously decide on each result with rules agreed before the test: a minimum effect worth shipping, a minimum sample, and guardrail metrics that veto a rollout. Davenport and Ronanki (2018) add that AI pays where it is integrated into existing processes and systems, and rarely as a stand-alone tool.",
            "Kohavi, Tang und Xu (2020) beschreiben, wie Firmen, die laufend testen, über jedes Ergebnis mit Regeln entscheiden, die vor dem Test vereinbart sind: ein Mindesteffekt, der einen Rollout lohnt, eine Mindeststichprobe und Guardrail-Kennzahlen, die einen Rollout verhindern können. Davenport und Ronanki (2018) ergänzen, dass KI sich dort lohnt, wo sie in bestehende Prozesse und Systeme integriert ist, und selten als allein stehendes Werkzeug.",
          )}
        </p>
      </ShowMore>
      <Diagram label={tt("Roll out, keep testing or stop · move the two sliders", "Ausrollen, weiter testen oder stoppen · die zwei Regler bewegen")} caption={tt("Set an uplift and a number of conversions and read which decision the rule gives.", "Stellen Sie einen Uplift und eine Zahl von Conversions ein und lesen Sie, welche Entscheidung die Regel ergibt.")}>
        <LiftCases />
      </Diagram>
      <ShowMore id="B4" part="table" label={tt("Show the table: a worked decision on other tests (Case assumption)", "Tabelle zeigen: Eine Beispielentscheidung mit anderen Tests (Fallannahme)")}>
        <DataTable
          head={[tt("Isar test", "Test bei Isar"), tt("Uplift", "Uplift"), tt("Conversions", "Conversions"), tt("Rule gives", "Regel ergibt"), tt("Who acts", "Wer handelt")]}
          rows={[
            [tt("Chatbot that reads order status from the profile", "Chatbot, der den Bestellstatus aus dem Profil liest"), "+36%", "150", tt("Roll out", "Ausrollen"), tt("Service", "Service")],
            [tt("Upgrade prediction for account managers", "Upgrade-Vorhersage für Account Manager"), "+28%", "30", tt("Keep testing", "Weiter testen"), tt("Data team", "Datenteam")],
            [tt("Avatar video in every e-mail", "Avatar-Video in jeder E-Mail"), "+1%", "700", tt("Stop", "Stoppen"), tt("No one", "Niemand")],
          ]}
          caption={tt("A worked decision on other tests (Case assumption)", "Eine Beispielentscheidung mit anderen Tests (Fallannahme)")}
        />
      </ShowMore>
    </MaterialCard>
  );
}

export function CardB5() {
  return (
    <MaterialCard
      id="B5"
      scan={tt("An architecture is built in order: the base first (one shared profile and the KPIs), then the standards and the people, then the data, then the AI tools on connected data, and the rest held back. Four tests tell you whether it holds, and with six months the time test matters. Invest now, in stages, and say what you will watch and when you would stop.", "Eine Architektur wird der Reihe nach gebaut: zuerst die Basis (ein gemeinsames Profil und die KPIs), dann die Standards und die Menschen, dann die Daten, dann die KI-Werkzeuge auf verbundenen Daten, und der Rest wird zurückgehalten. Vier Tests sagen Ihnen, ob sie hält, und bei sechs Monaten zählt der Zeittest. Investieren Sie jetzt, in Stufen, und sagen Sie, was Sie beobachten und wann Sie aufhören würden.")}
      reasoning={[
        tt("Build in this order. The base first: the shared customer profile and KPI system, so every channel reads one customer. Then the standards and the people: the hand-over standard so the history travels at every switch, one price list for every channel, and staff trained to take over with the history. Then the data an AI tool reads, connected. Then the AI tools that move a named KPI, on data that is connected. Hold back the rest.", "Bauen Sie in dieser Reihenfolge. Zuerst die Basis: gemeinsames Kundenprofil und KPI-System, damit jeder Kanal einen Kunden liest. Dann die Standards und die Menschen: der Übergabestandard, damit die Historie bei jedem Wechsel mitreist, eine Preisliste für jeden Kanal und Mitarbeitende, die geschult sind, mit der Historie zu übernehmen. Dann die Daten, die ein KI-Werkzeug liest, verbunden. Dann die KI-Werkzeuge, die einen benannten KPI bewegen, auf verbundenen Daten. Den Rest halten Sie zurück."),
        tt(`Four tests check an architecture. Integration first: the shared profile and KPI system start no later than the first AI tool. Every funded item has a purpose: it moves a named KPI or makes one measurable; a black box and an app that names no KPI do neither. Data connected: an AI tool starts on data of which at least ${QUALITY_BAR}% already reaches the shared profile. It fits: inside the budget and in use by month ${R2_MONTHS}.`, `Vier Tests prüfen eine Architektur. Integration zuerst: Gemeinsames Profil und KPI-System starten nicht später als das erste KI-Werkzeug. Jeder finanzierte Punkt hat einen Zweck: Er bewegt einen benannten KPI oder macht einen messbar; eine Black Box und eine App, die keinen KPI nennt, tun keines von beidem. Daten verbunden: Ein KI-Werkzeug startet auf Daten, von denen mindestens ${QUALITY_BAR} % schon das gemeinsame Profil erreichen. Es passt: innerhalb des Budgets und bis Monat ${R2_MONTHS} im Einsatz.`),
        tt(`Time: an item is in use in the month = start + weeks ÷ 4, rounded up. A Now item starts in month 1; an After data is ready item starts in the month the hand-over standard is in use, so the standard has to be Now itself: hand-overs that carry the history are what put the data into the profile. With ${R2_MONTHS} months, an item of 30 weeks is in use only in month 9.`, `Zeit: Ein Punkt ist im Monat = Start + Wochen ÷ 4, aufgerundet, im Einsatz. Ein Jetzt-Punkt startet in Monat 1; ein Punkt „Wenn die Daten bereit sind“ startet in dem Monat, in dem der Übergabestandard im Einsatz ist, der Standard muss also selbst auf Jetzt stehen: Übergaben, die die Historie mitnehmen, bringen die Daten ins Profil. Bei ${R2_MONTHS} Monaten ist ein Punkt mit 30 Wochen erst in Monat 9 im Einsatz.`),
        tt(`Three bars show where the money sits: Budget (the money against the limit), Measurable (the share on items that are measured, whose data is connected and that are in use within the ${R2_MONTHS} months) and Risk (the share on a black box, on data below ${QUALITY_BAR}% connected or on an item in use only after the ${R2_MONTHS} months). Measurable and Risk are ranges, because the data may be weaker than the brief says: a plan that holds at both ends is the safer one.`, `Drei Balken zeigen, wo das Geld liegt: Budget (das Geld gegen die Grenze), Messbar (der Anteil auf Punkten, die gemessen werden, deren Daten verbunden sind und die innerhalb der ${R2_MONTHS} Monate im Einsatz sind) und Risiko (der Anteil auf einer Black Box, auf Daten unter ${QUALITY_BAR} % verbunden oder auf einem Punkt, der erst nach den ${R2_MONTHS} Monaten im Einsatz ist). Messbar und Risiko sind Spannen, weil die Daten schwächer sein können, als der Auftrag sagt: Ein Plan, der an beiden Enden hält, ist der sicherere.`),
        tt("Waiting until success is proven is also a decision: every break in the journey stays in the meantime, competitors move on, and the hand-overs could be fixed within weeks. The brief asks for an investment decision despite unclear prospects.", "Zu warten, bis der Erfolg bewiesen ist, ist auch eine Entscheidung: Jeder Bruch in der Journey bleibt in der Zwischenzeit, der Wettbewerb zieht weiter, und die Übergaben ließen sich in Wochen beheben. Der Auftrag verlangt eine Investitionsentscheidung trotz unklarer Aussichten."),
        tt("Buying one big suite at once feels like catching up, but it is in use only after 30 weeks, takes most of the budget, and nothing is measured before the money is spent. Staging changes something for customers within weeks and spends the rest as the evidence arrives.", "Eine große Suite auf einmal zu kaufen fühlt sich wie Aufholen an, ist aber erst nach 30 Wochen in Betrieb, nimmt den Großteil des Budgets, und nichts wird gemessen, bevor das Geld ausgegeben ist. Stufenweise ändert sich innerhalb von Wochen etwas für Kunden, und der Rest wird ausgegeben, während die Evidenz kommt."),
        tt("Fund inside the budget, and fund nothing nobody at the company can explain or measure: a black box cannot be steered. An app whose contact form is not connected to the other systems adds one more channel that knows nothing about the others.", "Finanzieren Sie innerhalb des Budgets, und nichts, was im Unternehmen niemand erklären oder messen kann: Eine Black Box lässt sich nicht steuern. Eine App, deren Kontaktformular nicht mit den anderen Systemen verbunden ist, fügt einen Kanal hinzu, der nichts von den anderen weiß."),
        tt("What you will watch is one figure about customers (the cross-channel deal rate, the share of customers who repeat their information), not your own speed or output (hours to first contact, channels offered, app downloads), the month it can first be read, and what you do if it falls short: stop, pause or change one thing.", "Was Sie beobachten, ist eine Zahl über Kunden (die kanalübergreifende Abschlussquote, der Anteil der Kunden, die ihre Angaben wiederholen), nicht Ihr eigenes Tempo oder Ihr Output (Stunden bis zum ersten Kontakt, angebotene Kanäle, App-Downloads), der Monat, in dem sie sich zuerst lesen lässt, und was Sie tun, wenn sie zu kurz greift: stoppen, pausieren oder eine Sache ändern."),
        tt("Every plan gives something and costs something. Say what it gives (measured, connected, inside the budget and the months) and what it leaves open (an item not now, data below 80% if the data is weaker, budget left unspent). A plan that differs from this order can still be argued: say why.", "Jeder Plan gibt etwas und kostet etwas. Sagen Sie, was er gibt (gemessen, verbunden, innerhalb von Budget und Monaten) und was er offen lässt (ein Punkt, der jetzt nicht kommt, Daten unter 80 %, wenn die Daten schwächer sind, ungenutztes Budget). Ein Plan, der von dieser Reihenfolge abweicht, lässt sich trotzdem vertreten: Sagen Sie, warum."),
      ]}
      sources={["courtney1997", "klein2007"]}
    >
      <Diagram label={tt("A chatbot and its base · a worked example on Isar Datentechnik", "Ein Chatbot und seine Basis · ein Beispiel mit Isar Datentechnik")} caption={tt("Change when the shared profile starts and how much of the data is connected, and watch the links.", "Ändern Sie, wann das gemeinsame Profil startet und wie viel der Daten verbunden ist, und beobachten Sie die Verbindungen.")}>
        <ArchExample />
      </Diagram>
      <ShowMore id="B5" part="calc" label={tt("Show the worked numbers on another company (Case assumption)", "Die Rechenwege an einem anderen Unternehmen zeigen (Fallannahme)")}>
        <DataTable
          head={[tt("Rule", "Regel"), tt("Isar's figures", "Zahlen von Isar"), tt("Result", "Ergebnis")]}
          rows={[
            [tt("Month in use: starts in month 1, needs 8 weeks", "Monat im Einsatz: startet in Monat 1, braucht 8 Wochen"), "1 + 8 ÷ 4 = 1 + 2", tt("month 3", "Monat 3")],
            [tt("After data is ready: the hand-over standard is in use in month 2, the item needs 10 weeks", "Wenn die Daten bereit sind: Der Übergabestandard ist in Monat 2 im Einsatz, der Punkt braucht 10 Wochen"), "2 + 10 ÷ 4 = 2 + 3", tt("starts month 2, in use month 5", "Start Monat 2, im Einsatz Monat 5")],
            [tt("Time: a suite of 28 weeks that starts in month 1, in a plan of 6 months", "Zeit: eine Suite mit 28 Wochen, die in Monat 1 startet, in einem Plan von 6 Monaten"), "1 + 28 ÷ 4 = 1 + 7", tt("month 8: too late", "Monat 8: zu spät")],
            [tt("Data connected: the chatbot's data is 90% connected, the bar is 80%", "Daten verbunden: Die Daten des Chatbots sind zu 90 % verbunden, die Grenze ist 80 %"), "90 ≥ 80", tt("ready", "bereit")],
            [tt("The same chatbot when the data is 15 points weaker", "Derselbe Chatbot, wenn die Daten 15 Punkte schwächer sind"), "90 − 15 = 75 < 80", tt("not ready", "nicht bereit")],
            [tt("Money: three funded items against Isar's €160,000", "Geld: drei finanzierte Punkte gegen Isars 160.000 €"), "70,000 + 30,000 + 20,000", tt("€120,000, €40,000 left", "120.000 €, 40.000 € übrig")],
          ]}
          caption={tt("Isar's numbers (Case assumption). The panel in the task does this for you and says what it means.", "Zahlen von Isar (Fallannahme). Das Panel in der Aufgabe macht das für Sie und sagt, was es bedeutet.")}
        />
      </ShowMore>
      <ShowMore id="B5" part="notes" label={tt("Show two short notes", "Zwei kurze Hinweise zeigen")}>
        <Bul
          items={[
            tt("Stage it: the no-regret items first (the shared profile, the hand-over standard on the most critical transition), the AI tools that need more connected data when the hand-overs carry the history.", "Stufenweise: die No-regret-Punkte zuerst (gemeinsames Profil, Übergabestandard am kritischsten Übergang), die KI-Werkzeuge, die mehr verbundene Daten brauchen, wenn die Übergaben die Historie mitnehmen."),
            tt("Premortem: imagine the plan failed after six months, and write down why. Those reasons are what you watch.", "Premortem: Stellen Sie sich vor, der Plan sei nach sechs Monaten gescheitert, und schreiben Sie auf, warum. Diese Gründe beobachten Sie."),
          ]}
        />
      </ShowMore>
      <ShowMore id="B5" part="extra" label={tt("Show: Unclear prospects are not a reason to bet everything, or nothing", "Zeigen: Unklare Aussichten sind kein Grund, alles oder nichts zu setzen")}>
        <Callout label={tt("Unclear prospects are not a reason to bet everything, or nothing", "Unklare Aussichten sind kein Grund, alles oder nichts zu setzen")} tone="signal">
          <p>{tt("Courtney, Kirkland and Viguerie (1997) advise matching the commitment to what is known: no-regret moves now, options that can be scaled later, and big bets only when the evidence is in. A staged investment with a sentence on what you watch is decisive and still honest about what you do not know yet.", "Courtney, Kirkland und Viguerie (1997) raten, die Festlegung an das Bekannte anzupassen: No-regret-Schritte jetzt, Optionen, die sich später ausweiten lassen, und große Wetten erst, wenn die Evidenz da ist. Eine gestufte Investition mit einem Satz dazu, was Sie beobachten, ist entschlossen und trotzdem ehrlich darüber, was Sie noch nicht wissen.")}</p>
        </Callout>
      </ShowMore>
    </MaterialCard>
  );
}

export const CARDS_B = [CardB1, CardB2, CardB3, CardB4, CardB5];
