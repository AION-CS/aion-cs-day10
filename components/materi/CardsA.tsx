"use client";

import { Bul, Diagram } from "@/components/materi/kit";
import { AutomationGrid, DelayCost, FairTest, KpiTree, MomentProfile, PilotExample, ScoreExample } from "@/components/materi/diagramsA";
import { Callout, DataTable, MaterialCard } from "@/components/ui/MaterialCard";
import { ShowMore } from "@/components/ui/ShowMore";
import { LEVEL_TESTS } from "@/data/ladder";
import { PATTERNS, PATTERN_IDS, PATTERN_PAIR_TESTS, RISK_RULE } from "@/data/patterns";
import { EXPLAIN_RULE } from "@/data/measures";
import { MOSEL, MOSEL_RESULT } from "@/data/forecast";
import { euro, num, pct, tt } from "@/lib/lang";

/** Materi A: the seven cards of Route 1 (Levels 1 and 2 on one case). 60 minutes in all. */
const p = "text-body text-ink";

export function CardA1() {
  return (
    <MaterialCard
      id="A1"
      scan={tt("Multichannel means a company offers many channels, each run on its own. Omnichannel means the same channels are integrated around the customer: one view of the customer, one set of promises, and a journey that carries on when the customer switches. More channels without integration make the experience worse, not better.", "Multichannel heißt, ein Unternehmen bietet viele Kanäle an, jeder für sich betrieben. Omnichannel heißt, dieselben Kanäle sind um den Kunden integriert: eine Sicht auf den Kunden, ein Satz Zusagen und eine Journey, die weiterläuft, wenn der Kunde wechselt. Mehr Kanäle ohne Integration machen das Erlebnis schlechter, nicht besser.")}
      reasoning={[
        tt("Multichannel: several channels, each with its own data, team and goals. Omnichannel: the same channels share the customer's data and rules, so the customer can switch without starting again.", "Multichannel: mehrere Kanäle, jeder mit eigenen Daten, eigenem Team und eigenen Zielen. Omnichannel: Dieselben Kanäle teilen die Daten und Regeln des Kunden, sodass er wechseln kann, ohne neu anzufangen."),
        tt("Customers do not think in channels: they start online, call, then e-mail support, and judge the company on the whole journey, online and offline.", "Kunden denken nicht in Kanälen: Sie starten online, rufen an, schreiben dann dem Support und beurteilen das Unternehmen nach der ganzen Journey, online und offline."),
        tt("Where the journey breaks is at the switches between channels, not inside a channel. Look for weaknesses there: waiting, repeating, two different answers.", "Wo die Journey bricht, sind die Wechsel zwischen Kanälen, nicht das Innere eines Kanals. Suchen Sie Schwachstellen dort: Warten, Wiederholen, zwei verschiedene Antworten."),
        tt("Omnichannel strategies often fail because each channel is optimised on its own, measured by its own KPIs and owned by its own team, while nobody owns the transitions.", "Omnichannel-Strategien scheitern oft, weil jeder Kanal für sich optimiert, an eigenen KPIs gemessen und von einem eigenen Team verantwortet wird, während niemand die Übergänge verantwortet."),
        tt("Adding a channel (an app, a new chat) is not a solution if it knows nothing about the others: it adds one more place where the journey can break. That is the multichannel trap.", "Einen Kanal hinzuzufügen (eine App, einen neuen Chat) ist keine Lösung, wenn er nichts über die anderen weiß: Er schafft eine weitere Stelle, an der die Journey brechen kann. Das ist die Multichannel-Falle."),
      ]}
      sources={["verhoef2015", "neslin2006", "lemon2016"]}
    >
      <ShowMore id="A1" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Verhoef, Kannan and Inman (2015) describe the step from multichannel to omnichannel: channels and touchpoints are managed together, so that the experience across them is optimised, not each channel alone. Neslin and colleagues (2006) had already named the hardest part: joining the data of all channels and measuring across them. Lemon and Verhoef (2016) show that customers experience the whole journey, before, during and after the purchase.",
            "Verhoef, Kannan und Inman (2015) beschreiben den Schritt von Multichannel zu Omnichannel: Kanäle und Touchpoints werden gemeinsam gesteuert, sodass das Erlebnis über alle optimiert wird, nicht jeder Kanal für sich. Neslin und Kollegen (2006) hatten den schwierigsten Teil schon benannt: die Daten aller Kanäle zu verbinden und über sie hinweg zu messen. Lemon und Verhoef (2016) zeigen, dass Kunden die ganze Journey erleben, vor, während und nach dem Kauf.",
          )}
        </p>
      </ShowMore>
      <Diagram label={tt("Single channel, multichannel, omnichannel · a worked example on Weser Systemhaus", "Ein Kanal, Multichannel, Omnichannel · ein Beispiel mit Weser Systemhaus")} caption={tt("Switch between the three ways Weser runs its channels and watch the journey and the share of customers who repeat themselves.", "Wechseln Sie zwischen den drei Arten, wie Weser seine Kanäle betreibt, und beobachten Sie die Journey und den Anteil der Kunden, die sich wiederholen.")}>
        <DelayCost />
      </Diagram>
      <ShowMore id="A1" part="notes" label={tt("Show two short notes", "Zwei kurze Hinweise zeigen")}>
        <Bul
          items={[
            tt("Seamless transition: the switch from one channel to the next works; someone takes over, in time.", "Nahtloser Übergang: Der Wechsel von einem Kanal zum nächsten funktioniert; jemand übernimmt, rechtzeitig."),
            tt("Recognition: the next channel knows who the customer is and what they already did.", "Wiedererkennung: Der nächste Kanal weiß, wer der Kunde ist und was er schon getan hat."),
            tt("Consistency: every channel says the same about prices, promises and facts.", "Konsistenz: Jeder Kanal sagt dasselbe über Preise, Zusagen und Fakten."),
          ]}
        />
      </ShowMore>
    </MaterialCard>
  );
}

export function CardA2() {
  return (
    <MaterialCard
      id="A2"
      scan={tt("A seamless experience rests on three principles: transitions that work (someone takes over, in time), recognition (the next channel knows the customer) and consistency (every channel says the same). When one breaks, the customer waits, repeats themselves or hears two answers.", "Ein nahtloses Erlebnis beruht auf drei Prinzipien: Übergängen, die funktionieren (jemand übernimmt, rechtzeitig), Wiedererkennung (der nächste Kanal kennt den Kunden) und Konsistenz (jeder Kanal sagt dasselbe). Bricht eines, wartet der Kunde, wiederholt sich oder hört zwei Antworten.")}
      reasoning={[
        ...LEVEL_TESTS.map((x) => `${x.name}: ${x.test}`),
        tt("Customer effort is the sign: every time a customer has to wait for a hand-over, repeat what they said or check which answer is true, the experience breaks at one of the three principles.", "Kundenaufwand ist das Zeichen: Jedes Mal, wenn ein Kunde auf eine Übergabe warten, Gesagtes wiederholen oder prüfen muss, welche Antwort stimmt, bricht das Erlebnis an einem der drei Prinzipien."),
        tt("A seamless experience gives customers three advantages: less effort (no repeating), less waiting (a named person takes over) and more trust (one price, one promise).", "Ein nahtloses Erlebnis gibt Kunden drei Vorteile: weniger Aufwand (kein Wiederholen), weniger Warten (eine benannte Person übernimmt) und mehr Vertrauen (ein Preis, eine Zusage)."),
        tt("Seamless does not mean everywhere and at once: pressing too early, showing that you track the customer, or forcing one script onto a special case turns integration against the customer.", "Nahtlos heißt nicht überall und sofort: zu früh drängen, zeigen, dass man den Kunden verfolgt, oder einem Sonderfall ein Skript aufzwingen wendet die Integration gegen den Kunden."),
        tt("A weakness in a journey names a moment between two channels, what goes wrong there today, and what it costs the customer.", "Eine Schwachstelle in einer Journey nennt einen Moment zwischen zwei Kanälen, was dort heute schiefgeht, und was es den Kunden kostet."),
      ]}
      sources={["dixon2010", "lemon2016", "gdpr2016"]}
    >
      <ShowMore id="A2" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Dixon, Freeman and Toman (2010) found that what drives customers away is effort more than a lack of delight: having to repeat information, switch channels and wait. Lemon and Verhoef (2016) describe the experience as built from all touchpoints together, so a single weak transition colours the whole journey.",
            "Dixon, Freeman und Toman (2010) fanden, dass Kunden eher durch Aufwand vertrieben werden als durch fehlende Begeisterung: Angaben wiederholen, Kanäle wechseln und warten müssen. Lemon und Verhoef (2016) beschreiben das Erlebnis als aus allen Touchpoints zusammen gebaut, sodass ein einziger schwacher Übergang die ganze Journey färbt.",
          )}
        </p>
      </ShowMore>
      <Diagram label={tt("Three principles, three states · a worked example on Weser Systemhaus", "Drei Prinzipien, drei Zustände · ein Beispiel mit Weser Systemhaus")} caption={tt("Choose a principle and a state and read what the customer experiences; then try the worked sort below.", "Wählen Sie ein Prinzip und einen Zustand und lesen Sie, was der Kunde erlebt; probieren Sie dann die Beispielsortierung darunter.")}>
        <MomentProfile />
      </Diagram>
      <ShowMore id="A2" part="extra" label={tt("Show: The GDPR still applies", "Zeigen: Die DSGVO gilt weiter")}>
        <Callout label={tt("The GDPR still applies", "Die DSGVO gilt weiter")} tone="rust">
          <p>{tt("Joining the data of several channels is processing personal data: it needs a lawful basis (Art. 6), website tracking usually needs consent, and customers may object to direct marketing (Art. 21). Integration does not change any of it.", "Die Daten mehrerer Kanäle zu verbinden ist Verarbeitung personenbezogener Daten: Sie braucht eine Rechtsgrundlage (Art. 6), Website-Tracking braucht meist eine Einwilligung, und Kunden können der Direktwerbung widersprechen (Art. 21). Integration ändert daran nichts.")}</p>
        </Callout>
      </ShowMore>
    </MaterialCard>
  );
}

export function CardA3() {
  return (
    <MaterialCard
      id="A3"
      scan={tt("Not every transition matters equally. A transition is critical where a buying or renewal decision is open and many customers drop out. AI tools such as chatbots, predictive analytics and personalised offers can only build where the customer's history already travels.", "Nicht jeder Übergang zählt gleich. Ein Übergang ist kritisch, wo eine Kauf- oder Verlängerungsentscheidung offen ist und viele Kunden abspringen. KI-Werkzeuge wie Chatbots, Predictive Analytics und personalisierte Angebote können nur dort aufbauen, wo die Historie des Kunden schon mitreist.")}
      reasoning={[
        tt("A transition is critical where two things hold: a buying or renewal decision is open, and 25% or more of customers drop out there. Fix those first.", "Ein Übergang ist kritisch, wo zwei Dinge gelten: Eine Kauf- oder Verlängerungsentscheidung ist offen, und 25 % oder mehr der Kunden springen dort ab. Diese zuerst beheben."),
        tt("Many dropping out is not enough: between a newsletter and the website nobody decides anything. A transition with an open decision where few drop out is working; it is not the first place to act.", "Dass viele abspringen, reicht nicht: Zwischen Newsletter und Website entscheidet niemand etwas. Ein Übergang mit offener Entscheidung, an dem wenige abspringen, funktioniert; er ist nicht der erste Ort zum Handeln."),
        tt("AI support needs data: a chatbot can only answer about a contract it can read, a prediction only learns from contacts it sees, an offer only fits if it knows what sales agreed. Pick the transitions where part or all of the history already travels.", "KI-Unterstützung braucht Daten: Ein Chatbot kann nur zu einem Vertrag antworten, den er lesen kann, eine Vorhersage lernt nur aus Kontakten, die sie sieht, ein Angebot passt nur, wenn es weiß, was der Vertrieb vereinbart hat. Wählen Sie die Übergänge, an denen ein Teil oder die ganze Historie schon mitreist."),
        tt("A chatbot answers routine questions at any hour; without the customer's history and a fast hand-over to a person, it becomes one more wall.", "Ein Chatbot beantwortet Routinefragen zu jeder Zeit; ohne die Historie des Kunden und eine schnelle Übergabe an einen Menschen wird er zu einer weiteren Wand."),
        tt("Predictive analytics uses data from past customers to estimate what a customer is likely to do next (renew, buy more, leave), so that a person can act in time.", "Predictive Analytics nutzt Daten früherer Kunden, um zu schätzen, was ein Kunde wahrscheinlich als Nächstes tut (verlängern, mehr kaufen, gehen), damit ein Mensch rechtzeitig handeln kann."),
        tt("Personalised offers built on one channel's data (only the shop) can contradict what another channel agreed: integration first, then personalisation.", "Personalisierte Angebote auf den Daten eines Kanals (nur des Shops) können dem widersprechen, was ein anderer Kanal vereinbart hat: erst Integration, dann Personalisierung."),
        tt("Integration into existing systems is the hard part: an AI tool that stands alone adds an island, however clever it is.", "Die Integration in bestehende Systeme ist der schwierige Teil: Ein KI-Werkzeug, das allein steht, fügt eine Insel hinzu, so klug es auch ist."),
      ]}
      sources={["rawson2013", "adam2021", "provost2013"]}
    >
      <ShowMore id="A3" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Rawson, Duncan and Jones (2013) show that whole journeys, not single touchpoints, predict satisfaction, and that the breaks sit between departments. Adam, Wessel and Benlian (2021) find that chatbots handle first contact well when they are designed for it and know their limits. Provost and Fawcett (2013) explain how predictive models learn from past data, and why they are only as good as the data they see.",
            "Rawson, Duncan und Jones (2013) zeigen, dass ganze Journeys, nicht einzelne Touchpoints, die Zufriedenheit vorhersagen, und dass die Brüche zwischen den Abteilungen liegen. Adam, Wessel und Benlian (2021) finden, dass Chatbots den Erstkontakt gut bewältigen, wenn sie dafür gestaltet sind und ihre Grenzen kennen. Provost und Fawcett (2013) erklären, wie Vorhersagemodelle aus vergangenen Daten lernen und warum sie nur so gut sind wie die Daten, die sie sehen.",
          )}
        </p>
      </ShowMore>
      <Diagram label={tt("Critical transitions, and where AI can build · a worked example on Weser Systemhaus", "Kritische Übergänge, und wo KI aufbauen kann · ein Beispiel mit Weser Systemhaus")} caption={tt("Choose a transition on the grid or in the list and read where it falls and why.", "Wählen Sie einen Übergang im Raster oder in der Liste und lesen Sie, wo er liegt und warum.")}>
        <AutomationGrid />
      </Diagram>
      <ShowMore id="A3" part="table" label={tt("Show the table: three AI tools and what each needs from integration", "Tabelle zeigen: Drei KI-Werkzeuge und was jedes von der Integration braucht")}>
        <DataTable
          head={[tt("AI tool", "KI-Werkzeug"), tt("What it does", "Was es tut"), tt("What it needs to work", "Was es braucht, um zu wirken")]}
          rows={[
            [tt("Chatbot", "Chatbot"), tt("Answers routine questions at any hour, hands over to a person", "Beantwortet Routinefragen zu jeder Zeit, übergibt an einen Menschen"), tt("The customer's contract and tickets, and a hand-over with the conversation attached", "Vertrag und Tickets des Kunden, und eine Übergabe mit angehängtem Gespräch")],
            [tt("Predictive analytics", "Predictive Analytics"), tt("Estimates who will renew, buy more or leave", "Schätzt, wer verlängert, mehr kauft oder geht"), tt("Contacts from every channel over time, and a person who acts on the list", "Kontakte aus jedem Kanal über die Zeit, und ein Mensch, der nach der Liste handelt")],
            [tt("Personalised offers", "Personalisierte Angebote"), tt("Chooses an offer from what the customer did", "Wählt ein Angebot aus dem, was der Kunde tat"), tt("What every channel knows and agreed, not only one channel's data", "Was jeder Kanal weiß und vereinbart hat, nicht nur die Daten eines Kanals")],
          ]}
          caption={tt("Three AI tools and what each needs from integration", "Drei KI-Werkzeuge und was jedes von der Integration braucht")}
        />
      </ShowMore>
    </MaterialCard>
  );
}

export function CardA4() {
  const r = MOSEL_RESULT;
  return (
    <MaterialCard
      id="A4"
      scan={tt("To put a euro figure on a seamless hand-over, compare how often journeys ended in a deal when the next channel saw the customer's history and when it started from zero. Three figures read it: the deal rate of each group, the lift, and the extra revenue a year.", "Um einer nahtlosen Übergabe einen Euro-Wert zu geben, vergleichen Sie, wie oft Journeys mit einem Abschluss endeten, wenn der nächste Kanal die Historie des Kunden sah, und wenn er bei null anfing. Drei Werte lesen es: die Abschlussquote jeder Gruppe, der Lift und der zusätzliche Umsatz pro Jahr.")}
      reasoning={[
        tt("Deal rate = deals ÷ hand-overs × 100. Take both numbers from the same group's rows.", "Abschlussquote = Abschlüsse ÷ Übergaben × 100. Nehmen Sie beide Zahlen aus den Zeilen derselben Gruppe."),
        tt("Lift = deal rate with the history ÷ deal rate without it. Work out the second rate from its own rows first; the groups are not the same size, so compare rates, never counts.", "Lift = Abschlussquote mit Historie ÷ Abschlussquote ohne. Berechnen Sie die zweite Quote zuerst aus ihren eigenen Zeilen; die Gruppen sind nicht gleich groß, also vergleichen Sie Quoten, nie Zahlen."),
        tt("Extra revenue a year = channel-switching journeys a year × (rate with − rate without, as a share of one) × average deal value. Only the difference counts: hand-overs from zero would have closed their share anyway. One point is 0.01.", "Zusätzlicher Umsatz pro Jahr = kanalwechselnde Journeys pro Jahr × (Quote mit − Quote ohne, als Anteil von eins) × durchschnittlicher Auftragswert. Nur der Unterschied zählt: Übergaben bei null hätten ihren Anteil ohnehin abgeschlossen. Ein Punkt ist 0,01."),
        tt("Use the journeys of a whole year, not the hand-overs of one group.", "Nehmen Sie die Journeys eines ganzen Jahres, nicht die Übergaben einer Gruppe."),
        tt("These figures compare hand-overs where someone chose to look up the history or not, so they are not yet a fair test: say them as an estimate, and test fairly before you promise the full amount (Materi A6).", "Diese Werte vergleichen Übergaben, bei denen jemand die Historie nachschlagen wollte oder nicht, sind also noch kein fairer Test: Sagen Sie sie als Schätzung, und testen Sie fair, bevor Sie den ganzen Betrag versprechen (Materi A6)."),
        tt("A sentence about a seamless hand-over quotes at least one figure, says what to change first, and how sure it can be.", "Ein Satz über eine nahtlose Übergabe nennt mindestens einen Wert, sagt, was zuerst zu ändern ist, und wie sicher man sein kann."),
      ]}
      sources={["provost2013", "rawson2013"]}
    >
      <ShowMore id="A4" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Provost and Fawcett (2013) name rates, lift and expected value as the basic tools for reading any comparison: compare two groups, and put a value on the difference. Applied to journeys, as Rawson and colleagues (2013) suggest, the groups are journeys that flowed and journeys that broke. The worked example uses Weser Systemhaus's numbers; the steps are the same for any company.",
            "Provost und Fawcett (2013) nennen Raten, Lift und Erwartungswert als Grundwerkzeuge, um jeden Vergleich zu lesen: zwei Gruppen vergleichen und dem Unterschied einen Wert geben. Auf Journeys angewandt, wie Rawson und Kollegen (2013) nahelegen, sind die Gruppen Journeys, die flossen, und Journeys, die brachen. Das Beispiel nutzt die Zahlen von Weser Systemhaus; die Schritte sind für jedes Unternehmen gleich.",
          )}
        </p>
      </ShowMore>
      <Diagram label={tt("What a seamless hand-over is worth · worked example on Weser Systemhaus (Case assumption)", "Was eine nahtlose Übergabe wert ist · Beispiel mit Weser Systemhaus (Fallannahme)")} caption={tt("Move the slider to change how many channel-switching journeys Weser has in a year.", "Bewegen Sie den Regler, um zu ändern, wie viele kanalwechselnde Journeys Weser pro Jahr hat.")}>
        <PilotExample />
      </Diagram>
      <ShowMore id="A4" part="calc" label={tt("Show the table: the four steps, on other numbers than the task", "Tabelle zeigen: Die vier Schritte, mit anderen Zahlen als in der Aufgabe")}>
        <DataTable
          head={[tt("Step", "Schritt"), tt("Calculation · Weser Systemhaus", "Rechnung · Weser Systemhaus"), tt("Result", "Ergebnis")]}
          rows={[
            [tt("1 · Deal rate with the history", "1 · Abschlussquote mit Historie"), `${MOSEL.variant.orders} ÷ ${num(MOSEL.variant.sent)} × 100`, pct(r.rate)],
            [tt("2 · Deal rate from zero", "2 · Abschlussquote bei null"), `${MOSEL.control.orders} ÷ ${num(MOSEL.control.sent)} × 100`, pct(r.other)],
            [tt("3 · Lift", "3 · Lift"), `${num(r.rate)} ÷ ${num(r.other)}`, tt(`${num(r.lift)} times`, `${num(r.lift)}-mal`)],
            [tt("4 · Extra revenue a year", "4 · Zusätzlicher Umsatz pro Jahr"), `${num(MOSEL.yearly)} × ${num((r.rate - r.other) / 100)} × ${euro(MOSEL.order)}`, euro(r.extra)],
          ]}
          caption={tt("The four steps, on other numbers than the task", "Die vier Schritte, mit anderen Zahlen als in der Aufgabe")}
        />
      </ShowMore>
    </MaterialCard>
  );
}

export function CardA5() {
  return (
    <MaterialCard
      id="A5"
      scan={tt("When every channel reports its own numbers, the breaks between channels stay invisible. Measure across channels: an outcome KPI is the result (deals, revenue, customers kept); a driver KPI comes before it (hand-overs that carry the history); a guardrail must not get worse (customers who repeat themselves); a vanity metric counts activity (channels, downloads).", "Wenn jeder Kanal seine eigenen Zahlen berichtet, bleiben die Brüche zwischen Kanälen unsichtbar. Messen Sie kanalübergreifend: Ein Outcome-KPI ist das Ergebnis (Abschlüsse, Umsatz, gehaltene Kunden); ein Treiber-KPI kommt davor (Übergaben, die die Historie mitnehmen); eine Guardrail darf nicht schlechter werden (Kunden, die sich wiederholen); eine Vanity Metric zählt Aktivität (Kanäle, Downloads).")}
      reasoning={[
        ...PATTERN_IDS.map((x) => `${PATTERNS[x].label}: ${PATTERNS[x].test}`),
        ...PATTERN_PAIR_TESTS.map((x) => `${x.pair} ${x.test}`),
        tt("Tag what a metric measures, not how it behaved last year: a driver that did not move with value is still a driver. The time to first contact counts as a driver although it measures your speed: it comes before the deal and your team moves it.", "Ordnen Sie zu, was eine Kennzahl misst, nicht wie sie sich letztes Jahr verhielt: Ein Treiber, der sich nicht mit dem Wert bewegte, ist trotzdem ein Treiber. Die Zeit bis zum ersten Kontakt zählt als Treiber, obwohl sie Ihr Tempo misst: Sie kommt vor dem Abschluss, und Ihr Team bewegt sie."),
        RISK_RULE.v,
        tt("How to use each kind: outcome → the target on the management dashboard; driver → the team that owns the hand-over, reviewed weekly; guardrail → a limit that stops a test or a rollout; vanity → stop reporting it as success. A bonus on a number rewards reporting it, not moving it.", "Wie man jede Art nutzt: Outcome → das Ziel im Management-Dashboard; Treiber → das Team, dem die Übergabe gehört, wöchentlich geprüft; Guardrail → eine Grenze, die einen Test oder Rollout stoppt; Vanity → nicht mehr als Erfolg berichten. Ein Bonus auf eine Zahl belohnt, dass sie berichtet wird, nicht dass sie bewegt wird."),
        tt("Think in the whole system: a KPI per channel rewards each channel for pushing customers on; a KPI across channels rewards the journey.", "Denken Sie im Gesamtsystem: Ein KPI pro Kanal belohnt jeden Kanal dafür, Kunden weiterzuschieben; ein kanalübergreifender KPI belohnt die Journey."),
        tt("A good set of three KPIs has at least one outcome and one driver, each with where the number comes from, what you would aim for and why it is a KPI; a guardrail is a strong third.", "Ein gutes Set aus drei KPIs hat mindestens ein Outcome und einen Treiber, jeder mit Quelle der Zahl, dem, was Sie anstreben würden, und warum er ein KPI ist; eine Guardrail ist ein starker dritter."),
      ]}
      sources={["kaplan1992", "ries2011", "neslin2006"]}
    >
      <ShowMore id="A5" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Kaplan and Norton (1992) argued that managers should steer by a few linked measures: the results, and the drivers that lead to them. Ries (2011) called the numbers that go up whatever you do “vanity metrics”. Neslin and colleagues (2006) add the omnichannel point: measure across channels, or each channel will claim the customer for itself.",
            "Kaplan und Norton (1992) forderten, dass Führungskräfte nach wenigen verbundenen Kennzahlen steuern: den Ergebnissen und den Treibern, die zu ihnen führen. Ries (2011) nannte die Zahlen, die steigen, egal was man tut, „Vanity Metrics“. Neslin und Kollegen (2006) ergänzen den Omnichannel-Punkt: kanalübergreifend messen, sonst beansprucht jeder Kanal den Kunden für sich.",
          )}
        </p>
      </ShowMore>
      <Diagram label={tt("A cross-channel KPI tree · a worked example on Weser Systemhaus", "Ein kanalübergreifender KPI-Baum · ein Beispiel mit Weser Systemhaus")} caption={tt("Choose a metric to read its kind, then show whether each moved with customer value last year.", "Wählen Sie eine Kennzahl, um ihre Art zu lesen, und zeigen Sie dann, ob sich jede letztes Jahr mit dem Kundenwert bewegte.")}>
        <KpiTree />
      </Diagram>
      <ShowMore id="A5" part="table" label={tt("Show the table: the four kinds of metric", "Tabelle zeigen: Die vier Arten von Kennzahlen")}>
        <DataTable
          head={[tt("Kind", "Art"), tt("What it is", "Was es ist"), tt("Where it sits", "Wo es steht")]}
          rows={PATTERN_IDS.map((x) => [PATTERNS[x].label, PATTERNS[x].means, PATTERNS[x].shape])}
          caption={tt("The four kinds of metric", "Die vier Arten von Kennzahlen")}
        />
      </ShowMore>
    </MaterialCard>
  );
}

export function CardA6() {
  return (
    <MaterialCard
      id="A6"
      scan={tt("Two tools tell you whether an omnichannel measure works. A fair A/B test shows the cause: one change, a random split in the same weeks, judged by the result, with a size fixed before the start. Reading trends shows the direction: a change that holds over several periods and across channels, not one good week.", "Zwei Werkzeuge zeigen, ob eine Omnichannel-Maßnahme wirkt. Ein fairer A/B-Test zeigt die Ursache: eine Änderung, eine zufällige Aufteilung in denselben Wochen, am Ergebnis gemessen, mit einer vor dem Start festgelegten Größe. Trends zu lesen zeigt die Richtung: eine Veränderung, die über mehrere Zeiträume und Kanäle hält, nicht eine gute Woche.")}
      reasoning={[
        tt("One change: if the variant differs in two things and wins, nobody knows which one did it.", "Eine Änderung: Unterscheidet sich die Variante in zwei Dingen und gewinnt, weiß niemand, welches es war."),
        tt("A random split in the same weeks: comparing with last quarter, website leads with trade-fair leads, or leads a salesperson chose lets something other than the change explain the difference.", "Eine zufällige Aufteilung in denselben Wochen: Der Vergleich mit dem Vorquartal, von Website-Leads mit Messe-Leads oder mit Leads, die ein Vertriebsmitarbeiter ausgewählt hat, lässt etwas anderes als die Änderung den Unterschied erklären."),
        tt("The KPI that decides is the result the problem is about (for customers lost between channels: deals per hand-over), not cards opened and not calls made.", "Der KPI, der entscheidet, ist das Ergebnis, um das es beim Problem geht (bei Kunden, die zwischen Kanälen verloren gehen: Abschlüsse pro Übergabe), nicht geöffnete Karten und nicht getätigte Anrufe."),
        tt("Fix the size before you start: about 100 deals per group and at least one full sales cycle. Stopping when the variant is ahead picks a lucky moment.", "Legen Sie die Größe vor dem Start fest: etwa 100 Abschlüsse pro Gruppe und mindestens ein voller Verkaufszyklus. Zu stoppen, wenn die Variante vorn liegt, wählt einen glücklichen Moment."),
        tt("Write the hypothesis (“if we …, then … rises, because …”) and the decision rule (roll out, keep testing, stop, and which guardrail must hold) before the test starts.", "Schreiben Sie die Hypothese („wenn wir …, dann steigt …, weil …“) und die Entscheidungsregel (ausrollen, weiter testen, stoppen, und welche Guardrail halten muss) vor dem Teststart auf."),
        tt("A trend is a change that holds for several periods in a row; one good week is noise. Compare the same periods (this quarter with the same quarter last year) and look across channels: a fall in one channel and a rise in another may be one shift, not two trends.", "Ein Trend ist eine Veränderung, die mehrere Zeiträume in Folge hält; eine gute Woche ist Rauschen. Vergleichen Sie gleiche Zeiträume (dieses Quartal mit demselben Quartal des Vorjahres) und schauen Sie über die Kanäle: Ein Rückgang in einem Kanal und ein Anstieg in einem anderen können eine Verschiebung sein, nicht zwei Trends."),
        tt("A trend shows where to look, not why: use it to choose what to test, then test before you scale.", "Ein Trend zeigt, wo man hinschauen muss, nicht warum: Nutzen Sie ihn, um zu wählen, was getestet wird, und testen Sie dann, bevor Sie ausweiten."),
        tt("Real uncertainties: a small base, the history looked up only for the best leads (not a fair split), journeys that leave no trace (an unlogged call), and a new product or campaign that changes who switches channels. “More channels always mean a better experience”, “connected systems are always consistent” and “more KPIs per channel measure better” are mistakes, not uncertainties.", "Echte Unsicherheiten: eine kleine Basis, die Historie nur bei den besten Leads nachgeschlagen (keine faire Aufteilung), Journeys, die keine Spur hinterlassen (ein nicht erfasster Anruf), und ein neues Produkt oder eine Kampagne, die ändert, wer den Kanal wechselt. „Mehr Kanäle bedeuten immer ein besseres Erlebnis“, „verbundene Systeme sind immer konsistent“ und „mehr KPIs pro Kanal messen besser“ sind Fehler, keine Unsicherheiten."),
      ]}
      sources={["kohavi2020", "hubbard2014"]}
    >
      <ShowMore id="A6" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Kohavi, Tang and Xu (2020) collected what makes controlled experiments trustworthy: a random split, one change at a time, a size fixed in advance, guardrail metrics, and no peeking to stop early. Hubbard (2014) reminds us that most business measurement is about reducing uncertainty enough to decide, which is what reading a trend over several periods does.",
            "Kohavi, Tang und Xu (2020) haben gesammelt, was kontrollierte Experimente vertrauenswürdig macht: eine zufällige Aufteilung, eine Änderung auf einmal, eine vorab festgelegte Größe, Guardrail-Kennzahlen und kein vorzeitiges Hinschauen, um früh zu stoppen. Hubbard (2014) erinnert daran, dass die meiste Messung im Unternehmen Unsicherheit so weit verringern soll, dass man entscheiden kann; genau das tut ein Trend über mehrere Zeiträume.",
          )}
        </p>
      </ShowMore>
      <Diagram label={tt("A fair test across channels, and how sure it is · a worked example on Weser Systemhaus", "Ein fairer kanalübergreifender Test, und wie sicher er ist · ein Beispiel mit Weser Systemhaus")} caption={tt("Switch between the four ways of running the test, then move the slider to change how many deals each group has.", "Wechseln Sie zwischen den vier Arten, den Test durchzuführen, und bewegen Sie dann den Regler, um zu ändern, wie viele Abschlüsse jede Gruppe hat.")}>
        <FairTest />
      </Diagram>
      <ShowMore id="A6" part="table" label={tt("Show the table: reading a trend: Weser's share of customers who repeat themselves, by quarter (Case assumption)", "Tabelle zeigen: Einen Trend lesen: Anteil der Kunden bei Weser, die sich wiederholen, nach Quartal (Fallannahme)")}>
        <DataTable
          head={[tt("Transition at Weser", "Übergang bei Weser"), "Q1", "Q2", "Q3", "Q4", tt("Reading", "Lesart")]}
          rows={[
            [tt("Web form → sales", "Webformular → Vertrieb"), pct(60), pct(58), pct(40), pct(35), tt("A trend: it fell after the hand-over card in Q3 and held in Q4.", "Ein Trend: Er fiel nach der Übergabekarte in Q3 und hielt in Q4.")],
            [tt("Sales → support", "Vertrieb → Support"), pct(55), pct(54), pct(52), pct(50), tt("Flat: small moves are noise, not a trend.", "Flach: Kleine Bewegungen sind Rauschen, kein Trend.")],
            [tt("Chatbot → hotline", "Chatbot → Hotline"), pct(30), pct(45), pct(44), pct(46), tt("A shift: it jumped when the chatbot launched in Q2; customers now repeat themselves after the bot.", "Eine Verschiebung: Er sprang, als der Chatbot in Q2 startete; Kunden wiederholen sich jetzt nach dem Bot.")],
          ]}
          caption={tt("Reading a trend: Weser's share of customers who repeat themselves, by quarter (Case assumption)", "Einen Trend lesen: Anteil der Kunden bei Weser, die sich wiederholen, nach Quartal (Fallannahme)")}
        />
      </ShowMore>
      <ShowMore id="A6" part="table" label={tt("Show the table: the test card, part by part", "Tabelle zeigen: Die Testkarte, Teil für Teil")}>
        <DataTable
          head={[tt("Part of the test card", "Teil der Testkarte"), tt("Fair", "Fair"), tt("What goes wrong otherwise", "Was sonst schiefgeht")]}
          rows={[
            [tt("What changes", "Was sich ändert"), tt("One thing only", "Nur eine Sache"), tt("A win cannot be put down to anything", "Ein Gewinn lässt sich nichts zuschreiben")],
            [tt("Control group", "Kontrollgruppe"), tt("Random half, same weeks", "Zufällige Hälfte, dieselben Wochen"), tt("Another quarter, another lead source or self-chosen cases explain the difference", "Ein anderes Quartal, eine andere Lead-Quelle oder selbst gewählte Fälle erklären den Unterschied")],
            [tt("Success KPI", "Erfolgs-KPI"), tt("The result: deals per hand-over", "Das Ergebnis: Abschlüsse pro Übergabe"), tt("Cards are opened and nobody buys", "Karten werden geöffnet, und niemand kauft")],
            [tt("Size and duration", "Größe und Dauer"), tt("Fixed: about 100 deals per group, one full sales cycle", "Fest: etwa 100 Abschlüsse pro Gruppe, ein voller Verkaufszyklus"), tt("A lucky moment on the dashboard is taken for a result", "Ein glücklicher Moment im Dashboard wird für ein Ergebnis gehalten")],
          ]}
          caption={tt("The test card, part by part", "Die Testkarte, Teil für Teil")}
        />
      </ShowMore>
    </MaterialCard>
  );
}

export function CardA7() {
  return (
    <MaterialCard
      id="A7"
      scan={tt("Choose measures by the plan's three tests, each Low (1) to High (3), multiplied: integration (what the measure connects to), effect (how much it moves the result) and scalability (does it reach every customer without extra cost). Then check the budget and which problems you answer.", "Wählen Sie Maßnahmen nach den drei Tests des Plans, jeweils Niedrig (1) bis Hoch (3), multipliziert: Integration (womit die Maßnahme verbunden ist), Wirkung (wie stark sie das Ergebnis bewegt) und Skalierbarkeit (erreicht sie jeden Kunden ohne Zusatzkosten). Prüfen Sie dann das Budget und welche Probleme Sie beantworten.")}
      reasoning={[
        EXPLAIN_RULE.v,
        tt("Effect: 3 if it removes a break the customer feels (waiting, repeating, two answers) or lifts deals directly, 2 if it helps but moves the result less or through other people, 1 if it answers none of the problems or is not in use within the time.", "Wirkung: 3, wenn sie einen Bruch beseitigt, den der Kunde spürt (Warten, Wiederholen, zwei Antworten), oder Abschlüsse direkt hebt, 2, wenn sie hilft, das Ergebnis aber weniger oder über andere Menschen bewegt, 1, wenn sie keines der Probleme beantwortet oder in der Zeit nicht in Betrieb ist."),
        tt("Scalability: 3 if, once built, it serves every customer at little extra cost; 2 if it grows with cost or needs every team retrained; 1 if it depends on a person's time for each customer.", "Skalierbarkeit: 3, wenn sie, einmal gebaut, jedem Kunden mit wenig Zusatzkosten dient; 2, wenn sie mit den Kosten wächst oder jedes Team neu geschult werden muss; 1, wenn sie pro Kunde Personenzeit braucht."),
        tt("Match each measure to the problems it really answers: connecting data or handing the customer over answers “channels work in isolation”; making every channel know the customer and say the same answers “customer experience inconsistent”; only an AI tool answers “AI potential unused”. A stand-alone app or a dashboard per channel answers none of these.", "Ordnen Sie jede Maßnahme den Problemen zu, die sie wirklich beantwortet: Daten verbinden oder den Kunden übergeben beantwortet „Kanäle arbeiten isoliert“; jeden Kanal den Kunden kennen und dasselbe sagen lassen beantwortet „Kundenerlebnis inkonsistent“; nur ein KI-Werkzeug beantwortet „KI-Potenzial ungenutzt“. Eine allein stehende App oder ein Dashboard pro Kanal beantwortet keines davon."),
        tt("Evaluate an AI tool by its benefit, its data and its risk: what it improves for the customer, which data it needs from which channels, and what goes wrong if that data is missing or wrong.", "Bewerten Sie ein KI-Werkzeug nach Nutzen, Daten und Risiko: was es für den Kunden verbessert, welche Daten es aus welchen Kanälen braucht, und was schiefgeht, wenn diese Daten fehlen oder falsch sind."),
        tt("The label after the weeks says which kind of thing a measure is: a principle it builds (a seamless transition, recognition, consistency), an AI tool, or one channel on its own. The brief's three problems call for connecting the channels and for AI tools that build on that connection; a new app, a separate dashboard or more hotline staff improves one channel and connects nothing.", "Das Etikett hinter den Wochen sagt, was für eine Art Ding eine Maßnahme ist: ein Prinzip, das sie aufbaut (nahtloser Übergang, Wiedererkennung, Konsistenz), ein KI-Werkzeug oder ein Kanal für sich. Die drei Probleme des Auftrags verlangen, die Kanäle zu verbinden, und KI-Werkzeuge, die auf dieser Verbindung aufbauen; eine neue App, ein separates Dashboard oder mehr Hotline-Personal verbessert einen Kanal und verbindet nichts."),
        tt("Give a reason for the two judged scores, in your own words and with a fact from the card: for effect, what the customer or visitor sees or does differently; for scalability, whether it reaches everyone without more people, and the weeks it needs.", "Geben Sie für die zwei beurteilten Werte einen Grund, in eigenen Worten und mit einer Tatsache von der Karte: bei der Wirkung, was der Kunde oder Besucher anders sieht oder tut; bei der Skalierbarkeit, ob es alle ohne mehr Personal erreicht, und die Wochen, die es braucht."),
        tt("The budget is a limit to weigh, not a lock. If the plan is over, the rule is to leave out the lowest score rather than trim every measure a little; if you keep it anyway, say why.", "Das Budget ist eine Grenze zum Abwägen, keine Sperre. Liegt der Plan darüber, ist die Regel, den niedrigsten Wert wegzulassen, statt jede Maßnahme ein bisschen zu kürzen; behalten Sie ihn trotzdem, sagen Sie warum."),
        tt("Order by score and by dependency: what others read from goes first; an AI tool that needs joined data comes after the integration it needs.", "Ordnen Sie nach Wert und nach Abhängigkeit: Woraus andere lesen, kommt zuerst; ein KI-Werkzeug, das verbundene Daten braucht, kommt nach der Integration, die es braucht."),
      ]}
      sources={["davenport2018", "hubbard2014"]}
    >
      <ShowMore id="A7" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Davenport and Ronanki (2018) found that AI projects succeed when they start from a business problem and fit into existing processes and systems, and fail when they are bought as stand-alone technology. Hubbard (2014) advises measuring what would change a decision. The plan names the evaluation for this day: integration × effect × scalability.",
            "Davenport und Ronanki (2018) fanden, dass KI-Projekte gelingen, wenn sie von einem Geschäftsproblem ausgehen und in bestehende Prozesse und Systeme passen, und scheitern, wenn sie als allein stehende Technologie gekauft werden. Hubbard (2014) rät, zu messen, was eine Entscheidung ändern würde. Der Plan nennt die Bewertung für diesen Tag: Integration × Wirkung × Skalierbarkeit.",
          )}
        </p>
      </ShowMore>
      <Diagram label={tt("Three measures of Weser Systemhaus, scored", "Drei Maßnahmen von Weser Systemhaus, bewertet")} caption={tt("Choose a measure to read its three scores and why each one is what it is.", "Wählen Sie eine Maßnahme, um ihre drei Werte zu lesen und warum jeder so ist.")}>
        <ScoreExample />
      </Diagram>
      <ShowMore id="A7" part="notes" label={tt("Show two short notes", "Zwei kurze Hinweise zeigen")}>
        <Bul
          items={[
            tt("Integration is read from what the measure is printed to connect to, never guessed.", "Die Integration wird aus dem gelesen, womit die Maßnahme laut Beschreibung verbunden ist, nie geschätzt."),
            tt("A clever tool that stands alone scores low: it adds an island instead of closing a gap.", "Ein kluges Werkzeug, das allein steht, punktet niedrig: Es fügt eine Insel hinzu, statt eine Lücke zu schließen."),
          ]}
        />
      </ShowMore>
    </MaterialCard>
  );
}

export const CARDS_A = [CardA1, CardA2, CardA3, CardA4, CardA5, CardA6, CardA7];
