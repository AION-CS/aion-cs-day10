"use client";

import clsx from "clsx";
import { AnswerBlock } from "@/components/ui/AnswerBlock";
import { AnswerKey } from "@/components/ui/AnswerKey";
import { BlockMissing } from "@/components/ui/BlockMissing";
import { ExampleAnswer } from "@/components/ui/ExampleAnswer";
import { CheckBar, OptionList, Reading, TextBox } from "@/components/ui/Inputs";
import { MaterialRefs } from "@/components/ui/MaterialRefs";
import { MentorGuide } from "@/components/ui/MentorGuide";
import { PlacementBoard } from "@/components/ui/PlacementBoard";
import { RevealHint } from "@/components/ui/RevealHint";
import { WritingHelp } from "@/components/ui/WritingHelp";
import { LEVEL_TAGS, LEVEL_TESTS, LINES, LINE_KEY } from "@/data/ladder";
import type { LevelTag, LineId } from "@/data/ladder";
import { BASES, BASIS_LABEL, CUSTOMERS, DECISION_LABEL, INSIGHT_COUNT, INSIGHT_FRAME, INSIGHT_MIN, KNOWN_LABEL, LEAVE_MIN, PICK, PILOT, FORECAST } from "@/data/forecast";
import type { Basis, CustId, } from "@/data/forecast";
import { citesForecastFigure, insightFlags, pickHolds, sortHolds } from "@/lib/checks";
import { scrollToAndFlash } from "@/lib/flash";
import { Gloss } from "@/lib/glossify";
import { IDS } from "@/lib/missing";
import { euro, num, pct, tt } from "@/lib/lang";
import { extraInsightGuide, insightGuide, meaningGuide, reflectGuide } from "@/lib/mentorGuide";
import { pickKey, sortKey } from "@/lib/answerKey";
import { MIN_LINE, MIN_SENTENCE } from "@/lib/progress";
import { BLOCK_MINUTES } from "@/lib/routes";
import { useStore } from "@/store/useStore";

/* ------------------------------------------------------------------ Block 1.1 */

export function Block11() {
  const l1 = useStore((s) => s.l1);
  const place = useStore((s) => s.placeLine);
  const undo = useStore((s) => s.undoSort);
  const redo = useStore((s) => s.redoSort);
  const patch = useStore((s) => s.patchL1);
  const mentor = useStore((s) => s.mentorUnlocked);
  return (
    <AnswerBlock
      id="block-1-1"
      title={tt("Block 1.1 · Transition, recognition or consistency?", "Block 1.1 · Übergang, Wiedererkennung oder Konsistenz?")}
      kind="OBJECTIVE"
      core
      minutes={BLOCK_MINUTES["1.1"]}
      findIt={tt("Route 1 → Task 1 → the nine weaknesses on the sort board below, noted along one customer's journey from the online configurator to sales and to support. Answer on the sort board.", "Route 1 → Task 1 → die neun Schwachstellen auf der Sortiertafel unten, notiert entlang der Journey eines Kunden vom Online-Konfigurator zum Vertrieb und zum Support. Antworten Sie auf der Sortiertafel.")}
    >
      <MaterialRefs refs={["A1", "A2", "A3"]} />
      <PlacementBoard<LevelTag>
        items={LINES.map((r) => ({ id: r.id, meta: r.source, text: r.text }))}
        bins={LEVEL_TAGS.map((t) => ({ id: t.id, label: t.label, hint: t.hint }))}
        value={l1.sort}
        onPlace={(id, tag) => place(id as LineId, tag)}
        onUndo={undo}
        onRedo={redo}
        undoCount={l1.sortHistory.length}
        redoCount={l1.sortFuture.length}
        domId={IDS.line}
        keyPhrases={LINE_KEY}
        clues={Object.fromEntries(LINES.map((r) => [r.id, r.clue]))}
        reasons={Object.fromEntries(LINES.map((r) => [r.id, r.why]))}
        result={l1.sortResult}
        checks={l1.sortChecks}
        onCheck={() => patch((s) => ({ checks: s.checks + 1, sortChecks: s.sortChecks + 1, sortResult: sortHolds(s.sort) }))}
        onClue={() => patch({ sortClue: true })}
        clueShown={l1.sortClue}
        reasoningOpened={l1.sortReasoning}
        onOpenReasoning={() => patch({ sortReasoning: true })}
        noun={tt("weakness", "Schwachstelle")}
        intro={tt("Drag a weakness onto the principle it breaks, or select it and then select a principle. Select a placed one to move it again. One principle per weakness: the one it mainly breaks.", "Ziehen Sie eine Schwachstelle auf das Prinzip, das sie bricht, oder wählen Sie sie aus und dann ein Prinzip. Wählen Sie eine platzierte, um sie zu verschieben. Ein Prinzip pro Schwachstelle: das, das sie vor allem bricht.")}
        tests={
          <RevealHint id="sort-tests" label={tt("Show the test questions", "Testfragen zeigen")} title={tt("Test questions · taught in Materi A1 to A3", "Testfragen · aus Materi A1 bis A3")}>
            <div className="space-y-2 text-caption text-ink">
              <p>{tt("Ask these of every weakness. They repeat the tests from Materi A1 to A3; they never say which weakness goes where.", "Stellen Sie diese Fragen zu jeder Schwachstelle. Sie wiederholen die Tests aus Materi A1 bis A3; sie sagen nie, welche Schwachstelle wohin gehört.")}</p>
              <ul className="space-y-1.5">
                {LEVEL_TESTS.map((c) => (
                  <li key={c.name}>
                    <span className="font-semibold">{c.name}. </span>
                    <Gloss>{c.test}</Gloss>
                  </li>
                ))}
              </ul>
              <MaterialRefs refs={["A2", "A3"]} lead={tt("Taught in", "Gelehrt in")} />
            </div>
          </RevealHint>
        }
      />
      <TextBox
        id={IDS.extraInsight}
        label={tt("One weakness of your own", "Eine eigene Schwachstelle")}
        help={tt("Name a moment between two of OmniTech's channels, what goes wrong there today, and what it costs the customer (“so …”). At least 30 characters.", "Nennen Sie einen Moment zwischen zwei Kanälen von OmniTech, was dort heute schiefgeht, und was es den Kunden kostet („sodass …“). Mindestens 30 Zeichen.")}
        value={l1.extraInsight}
        onChange={(v) => patch({ extraInsight: v })}
        min={MIN_LINE}
        rows={2}
      >
        <WritingHelp
          id="extra-insight-kit"
          refs={[
            { label: tt("Where the journey breaks today (the case)", "Wo die Journey heute bricht (der Fall)"), value: tt("channels work in isolation, the experience is inconsistent, AI potential is unused", "Kanäle arbeiten isoliert, das Erlebnis ist uneinheitlich, KI-Potenzial bleibt ungenutzt"), target: "case-brief" },
            { label: tt("The three principles (Materi A1 to A3)", "Die drei Prinzipien (Materi A1 bis A3)"), value: tt("seamless transition · recognition · consistency", "nahtloser Übergang · Wiedererkennung · Konsistenz"), target: "mat-A2" },
            { label: tt("The nine weaknesses above", "Die neun Schwächen oben"), value: tt("see which breaks the teams already name", "sehen Sie, welche Brüche die Teams schon nennen"), target: IDS.line(LINES[0].id) },
          ]}
          steps={[
            tt("Name a moment between two of OmniTech's channels (for example online to sales), not “the whole journey”.", "Nennen Sie einen Moment zwischen zwei Kanälen von OmniTech (zum Beispiel online zum Vertrieb), nicht „die ganze Journey“."),
            tt("Say what goes wrong there today (the customer repeats, waits or hears something different).", "Sagen Sie, was dort heute schiefgeht (der Kunde wiederholt, wartet oder hört etwas anderes)."),
            tt("Finish with “so …”: what it costs the customer, or what a fix would change.", "Schließen Sie mit „also …“: was es den Kunden kostet, oder was eine Lösung ändern würde."),
          ]}
        />
      </TextBox>
      <ExampleAnswer id="extra-insight-example" guide={extraInsightGuide()} />
      {mentor && <MentorGuide guide={extraInsightGuide()} />}
      <AnswerKey block={sortKey()} />
      <BlockMissing block="1.1" route={1} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ Block 1.2 (Optional, read-only) */

const row = (id: string, cells: string[]) => (
  <tr id={id} className="border-t border-line">
    <td className="px-3 py-2 font-semibold">{cells[0]}</td>
    {cells.slice(1).map((c, i) => (
      <td key={i} className="tnum px-3 py-2 text-right">
        {c}
      </td>
    ))}
  </tr>
);

export function Block12() {
  const l1 = useStore((s) => s.l1);
  const patch = useStore((s) => s.patchL1);
  const mentor = useStore((s) => s.mentorUnlocked);
  const check = () =>
    patch((s) => {
      const w = s.meaning.trim();
      return { checks: s.checks + 1, meaningFlagged: w !== "" && (w.length < MIN_SENTENCE || !citesForecastFigure(w)), meaningClue: false };
    });
  const pct1 = (v: number) => `${num(v, { minimumFractionDigits: 1, maximumFractionDigits: 1 })} %`;
  return (
    <AnswerBlock
      id="block-1-2"
      title={tt("Block 1.2 · Read the hand-over figures: two deal rates side by side", "Block 1.2 · Die Übergabe-Werte lesen: zwei Abschlussquoten nebeneinander")}
      kind="JUDGED"
      core={false}
      minutes={BLOCK_MINUTES["1.2"]}
      findIt={tt("Route 1 → Task 1 → the table “Last year” directly below, with the two deal rates the app prints. Answer in the field under the table.", "Route 1 → Task 1 → die Tabelle „Letztes Jahr“ direkt darunter, mit den zwei Abschlussquoten, die die App druckt. Antworten Sie im Feld unter der Tabelle.")}
    >
      <MaterialRefs refs={["A4"]} />
      <p className="text-body text-ink">
        <Gloss>
          {tt("OmniTech's CRM shows how the journeys that started online and switched to sales ended last year, split by whether sales saw what the customer had done online. The app divides deals by hand-overs and prints both deal rates for you; nothing is left to calculate. Your job is to read them side by side and say what they do and do not tell OmniTech. How such a rate is worked out is shown in", "Das CRM von OmniTech zeigt, wie die Journeys, die online begannen und zum Vertrieb wechselten, im letzten Jahr endeten, aufgeteilt danach, ob der Vertrieb sah, was der Kunde online getan hatte. Die App teilt Abschlüsse durch Übergaben und druckt beide Abschlussquoten für Sie; es bleibt nichts zu rechnen. Ihre Aufgabe ist, sie nebeneinander zu lesen und zu sagen, was sie OmniTech sagen und was nicht. Wie eine solche Quote entsteht, zeigt")}
        </Gloss>{" "}
        <button type="button" onClick={() => scrollToAndFlash("mat-A4", "ref")} className="font-semibold text-accent underline decoration-dotted underline-offset-2">
          Materi A4
        </button>
        .
      </p>
      <div className="relative overflow-x-auto rounded-lg border border-line">
        <table className="w-full min-w-[30rem] border-collapse text-caption">
          <caption className="bg-mist px-3 py-2 text-left text-micro font-semibold uppercase text-ash">{tt("Last year · hand-overs from online to sales (Case assumption)", "Letztes Jahr · Übergaben von online an den Vertrieb (Fallannahme)")}</caption>
          <thead>
            <tr className="text-left text-micro uppercase text-ash">
              <th className="px-3 py-2">{tt("Group", "Gruppe")}</th>
              <th className="px-3 py-2 text-right">{tt("Hand-overs", "Übergaben")}</th>
              <th className="px-3 py-2 text-right">{tt("Deals", "Abschlüsse")}</th>
              <th className="px-3 py-2 text-right">{tt("Deal rate (printed)", "Abschlussquote (gedruckt)")}</th>
            </tr>
          </thead>
          <tbody>
            {row("fc-ctl", [tt("Sales started from zero", "Vertrieb fing bei null an"), num(PILOT.control.sent), num(PILOT.control.orders), pct1(FORECAST.controlRate)])}
            {row("fc-var", [tt("Sales saw the online history", "Vertrieb sah die Online-Historie"), num(PILOT.variant.sent), num(PILOT.variant.orders), pct1(FORECAST.f1)])}
          </tbody>
        </table>
      </div>
      <p className="text-caption text-ash">
        {tt(`Read it like this: of every 100 hand-overs, ${num(FORECAST.controlRate, { maximumFractionDigits: 1 })} ended in a deal when sales started from zero and ${num(FORECAST.f1, { maximumFractionDigits: 1 })} when sales saw the online history, so the history doubled the deal rate (${num(FORECAST.f2)} times). But the two groups may differ in other ways, so the true effect may be smaller.`, `So lesen Sie es: Von je 100 Übergaben endeten ${num(FORECAST.controlRate, { maximumFractionDigits: 1 })} in einem Abschluss, wenn der Vertrieb bei null anfing, und ${num(FORECAST.f1, { maximumFractionDigits: 1 })}, wenn der Vertrieb die Online-Historie sah; die Historie verdoppelte also die Abschlussquote (${num(FORECAST.f2)}-mal). Aber die beiden Gruppen unterscheiden sich vielleicht auch in anderem, also kann der wahre Effekt kleiner sein.`)}
      </p>
      <TextBox
        id={IDS.meaning}
        label={tt("What do the hand-over figures mean for OmniTech?", "Was bedeuten die Übergabe-Werte für OmniTech?")}
        help={tt("One or two sentences. Quote at least one printed figure, say what OmniTech should change first, and why it cannot be sure yet that the history alone made the difference.", "Ein oder zwei Sätze. Zitieren Sie mindestens einen gedruckten Wert, sagen Sie, was OmniTech zuerst ändern sollte, und warum es noch nicht sicher sein kann, dass allein die Historie den Unterschied machte.")}
        value={l1.meaning}
        onChange={(v) => patch({ meaning: v, meaningFlagged: false })}
        min={MIN_SENTENCE}
        rows={4}
        flagged={l1.meaningFlagged}
        clue={tt("Which printed figure says how much better journeys ended when sales saw the history, and could the two groups differ in other ways? Quote one figure and say what follows.", "Welcher gedruckte Wert sagt, wie viel besser Journeys endeten, wenn der Vertrieb die Historie sah, und könnten sich die zwei Gruppen auch in anderem unterscheiden? Zitieren Sie einen Wert und sagen Sie, was folgt.")}
        clueShown={l1.meaningClue}
        onShowClue={() => patch({ meaningClue: true })}
      >
        <WritingHelp
          id="meaning-help"
          refs={[
            { label: tt("Deal rates, from zero and with the history", "Abschlussquoten, bei null und mit der Historie"), value: `${pct1(FORECAST.controlRate)} · ${pct1(FORECAST.f1)}`, target: "fc-var" },
            { label: tt("Deals behind each group", "Abschlüsse hinter jeder Gruppe"), value: `${PILOT.control.orders} · ${PILOT.variant.orders}`, target: "fc-ctl" },
            { label: tt("Why a comparison like this is not yet proof (Materi A6)", "Warum ein solcher Vergleich noch kein Beweis ist (Materi A6)"), value: tt("the two groups may differ in other ways", "die zwei Gruppen unterscheiden sich vielleicht auch in anderem"), target: "mat-A6" },
          ]}
          steps={[
            tt("Say how much better the journeys ended with the history (the two rates, or “twice”).", "Sagen Sie, wie viel besser die Journeys mit der Historie endeten (die zwei Quoten, oder „doppelt“)."),
            tt("Say what OmniTech should change first, for example give sales the online history at every hand-over.", "Sagen Sie, was OmniTech zuerst ändern sollte, zum Beispiel dem Vertrieb bei jeder Übergabe die Online-Historie geben."),
            tt("Say it as an estimate: the groups may differ in other ways.", "Sagen Sie es als Schätzung: Die Gruppen unterscheiden sich vielleicht auch in anderem."),
          ]}
        />
      </TextBox>
      <ExampleAnswer id="meaning-example" guide={meaningGuide()} />
      {mentor && <MentorGuide guide={meaningGuide()} />}
      <CheckBar onCheck={check} checkLabel={tt("Check my sentence", "Meinen Satz prüfen")} checks={l1.checks} />
      {l1.checks > 0 && (
        <Reading>
          {!l1.meaningFlagged
            ? tt("Nothing is outlined by the last check.", "Die letzte Prüfung hat nichts markiert.")
            : tt("The sentence is outlined: it needs at least one printed figure and a few words more.", "Der Satz ist markiert: Er braucht mindestens einen gedruckten Wert und ein paar Worte mehr.")}
        </Reading>
      )}
      <BlockMissing block="1.2" route={1} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ Block 1.3 */

export function Block13() {
  const l1 = useStore((s) => s.l1);
  const patch = useStore((s) => s.patchL1);
  const mentor = useStore((s) => s.mentorUnlocked);
  const toggle = (k: "valuable" | "churners", id: CustId) => patch((s) => ({ [k]: s[k].includes(id) ? s[k].filter((x) => x !== id) : [...s[k], id], pickResult: null }) as Partial<typeof s>);
  const setRow = (i: number, p: Partial<{ basis: Basis | null; text: string }>) => patch((s) => ({ insights: s.insights.map((h, j) => (j === i ? { ...h, ...p } : h)), insFlagged: s.insFlagged.filter((x) => x !== i) }));
  const check = () => patch((s) => ({ checks: s.checks + 1, insChecked: true, insClue: false, insFlagged: insightFlags(s), pickResult: pickHolds(s), pickClue: false }));
  const opts = CUSTOMERS.map((c) => ({ id: c.id, label: c.name }));
  return (
    <AnswerBlock
      id="block-1-3"
      title={tt("Block 1.3 · Critical transitions, where AI can build, and three improvements", "Block 1.3 · Kritische Übergänge, wo KI aufbauen kann, und drei Verbesserungen")}
      kind="OBJECTIVE + JUDGED"
      core
      minutes={BLOCK_MINUTES["1.3"]}
      findIt={tt("Route 1 → Task 1 → the table “Eight transitions between channels” below: journeys a month, the share who drop out there, whether a buying or renewal decision is open, and what travels with the customer. Answer in the two lists and the three fields under it.", "Route 1 → Task 1 → die Tabelle „Acht Übergänge zwischen Kanälen“ unten: Journeys pro Monat, der Anteil, der dort abspringt, ob eine Kauf- oder Verlängerungsentscheidung offen ist, und was mit dem Kunden mitreist. Antworten Sie in den zwei Listen und den drei Feldern darunter.")}
    >
      <MaterialRefs refs={["A3"]} />
      <p className="rounded-md border border-line bg-mist/40 px-3 py-2 text-caption text-ink">
        <Gloss>
          {tt("How to read the table. Each row is one transition between two of OmniTech's channels, for example from the chatbot to a person. “Journeys a month” says how many customers make that switch. “Drop out here” says what share of them give up at that point (bold means 50% or more). “Decision open? · What travels” says whether a buying or renewal decision is still open there, and what goes along with the customer: nothing, the customer's name, or the whole history.", "So lesen Sie die Tabelle. Jede Zeile ist ein Übergang zwischen zwei Kanälen von OmniTech, zum Beispiel vom Chatbot zu einem Menschen. „Journeys pro Monat“ sagt, wie viele Kunden diesen Wechsel machen. „Springen hier ab“ sagt, welcher Anteil von ihnen an dieser Stelle aufgibt (fett heißt 50 % oder mehr). „Entscheidung offen? · Was mitreist“ sagt, ob dort noch eine Kauf- oder Verlängerungsentscheidung offen ist, und was mit dem Kunden mitgeht: nichts, der Name des Kunden oder die ganze Historie.")}
        </Gloss>
      </p>
      <div className="relative overflow-x-auto rounded-lg border border-line">
        <table className="w-full min-w-[36rem] border-collapse text-caption">
          <caption className="bg-mist px-3 py-2 text-left text-micro font-semibold uppercase text-ash">{tt("Eight transitions between channels · OmniTech's journey data (Case assumption)", "Acht Übergänge zwischen Kanälen · Journey-Daten von OmniTech (Fallannahme)")}</caption>
          <thead>
            <tr className="text-left text-micro uppercase text-ash">
              <th className="px-3 py-2">{tt("Transition", "Übergang")}</th>
              <th className="px-3 py-2 text-right">{tt("Journeys a month", "Journeys pro Monat")}</th>
              <th className="px-3 py-2">{tt("Drop out here", "Springen hier ab")}</th>
              <th className="px-3 py-2">{tt("Decision open? · What travels", "Entscheidung offen? · Was mitreist")}</th>
            </tr>
          </thead>
          <tbody>
            {CUSTOMERS.map((c) => (
              <tr key={c.id} id={`cust-${c.id}`} className="border-t border-line">
                <td className="px-3 py-2 font-semibold">{c.name}</td>
                <td className="tnum px-3 py-2 text-right">{num(c.volume)}</td>
                <td className={clsx("tnum px-3 py-2", c.leave >= LEAVE_MIN && "font-semibold")}>{pct(c.leave)}</td>
                <td className="px-3 py-2">{`${DECISION_LABEL[c.decision ? "yes" : "no"]} · ${KNOWN_LABEL[c.known]}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div id={IDS.valuable} className="space-y-1.5">
          <p className="font-semibold text-ink">{tt(`a · The ${PICK} most critical transitions`, `a · Die ${PICK} kritischsten Übergänge`)}</p>
          <OptionList<CustId> multi label={tt("Critical", "Kritisch")} value={l1.valuable} onChange={(id) => toggle("valuable", id)} disabledIds={l1.valuable.length >= PICK ? CUSTOMERS.map((c) => c.id) : []} onDisabledClick={() => scrollToAndFlash(IDS.valuable, "warn")} options={opts} />
          <p role="status" className="text-caption text-ash">{tt(`${l1.valuable.length} of ${PICK} chosen.`, `${l1.valuable.length} von ${PICK} gewählt.`)}</p>
        </div>
        <div id={IDS.churners} className="space-y-1.5">
          <p className="font-semibold text-ink">{tt(`b · The ${PICK} transitions where AI support can build on the data`, `b · Die ${PICK} Übergänge, an denen KI-Unterstützung auf den Daten aufbauen kann`)}</p>
          <OptionList<CustId> multi label={tt("AI can build on it", "KI kann aufbauen")} value={l1.churners} onChange={(id) => toggle("churners", id)} disabledIds={l1.churners.length >= PICK ? CUSTOMERS.map((c) => c.id) : []} onDisabledClick={() => scrollToAndFlash(IDS.churners, "warn")} options={opts} />
          <p role="status" className="text-caption text-ash">{tt(`${l1.churners.length} of ${PICK} chosen.`, `${l1.churners.length} von ${PICK} gewählt.`)}</p>
        </div>
      </div>
      {l1.pickResult && (
        <Reading>
          {tt(`${l1.pickResult.holds} of ${l1.pickResult.total} picks hold. A check never says which. `, `${l1.pickResult.holds} von ${l1.pickResult.total} Wahlen stimmen. Eine Prüfung sagt nie, welche. `)}
          {l1.pickClue ? (
            tt("Clue: a transition is critical where a buying or renewal decision is open and many drop out. AI support needs data that travels with the customer. Which transitions have an open decision and 25% or more dropping out? Where does part or all of the history already travel?", "Hinweis: Ein Übergang ist kritisch, wo eine Kauf- oder Verlängerungsentscheidung offen ist und viele abspringen. KI-Unterstützung braucht Daten, die mit dem Kunden reisen. Welche Übergänge haben eine offene Entscheidung und 25 % oder mehr, die abspringen? Wo reist ein Teil oder die ganze Historie schon mit?")
          ) : l1.pickResult.holds < l1.pickResult.total ? (
            <button type="button" onClick={() => patch({ pickClue: true })} className="btn-ghost btn-sm border-gold">
              {tt("Show clue", "Hinweis zeigen")}
            </button>
          ) : null}
        </Reading>
      )}
      <AnswerKey block={pickKey()} />
      <div className="space-y-3 border-t border-line pt-3">
        <p className="font-semibold text-ink">{tt("c · Three concrete improvements", "c · Drei konkrete Verbesserungen")}</p>
        <p className="text-body text-ink">
          <Gloss>{tt("Write three concrete improvements for OmniTech, each serving a different principle: seamless transition, recognition or consistency. Say what each gives the customer: that is the advantage for customers the plan asks for.", "Schreiben Sie drei konkrete Verbesserungen für OmniTech, jede für ein anderes Prinzip: nahtloser Übergang, Wiedererkennung oder Konsistenz. Sagen Sie, was jede dem Kunden bringt: Das ist der Vorteil für Kunden, nach dem der Plan fragt.")}</Gloss>
        </p>
        <p className="text-caption text-ash">
          {tt("The frame: ", "Der Rahmen: ")}
          {INSIGHT_FRAME.v}
        </p>
        {l1.insights.map((a, i) => (
          <div key={i} className="space-y-1.5">
            <TextBox
              id={IDS.insight(i)}
              label={tt(`Improvement ${i + 1}`, `Verbesserung ${i + 1}`)}
              help={tt(`Choose the principle, then write the improvement and what the customer gains in one or two sentences (“…, so …”), at least ${INSIGHT_MIN} characters.`, `Wählen Sie das Prinzip und schreiben Sie dann die Verbesserung und was der Kunde gewinnt in ein oder zwei Sätzen („…, sodass …“), mindestens ${INSIGHT_MIN} Zeichen.`)}
              value={a.text}
              onChange={(v) => setRow(i, { text: v })}
              min={INSIGHT_MIN}
              flagged={l1.insFlagged.includes(i)}
              clue={tt(`Use the frame: ${INSIGHT_FRAME.v} Choose a principle no other row uses, and finish with “so” and what the customer gains.`, `Nutzen Sie den Rahmen: ${INSIGHT_FRAME.v} Wählen Sie ein Prinzip, das keine andere Zeile nutzt, und schließen Sie mit „sodass“ und dem, was der Kunde gewinnt.`)}
              clueShown={l1.insClue}
              onShowClue={() => patch({ insClue: true })}
            >
              <div>
                <label htmlFor={`insight-${i}-basis`} className="smallcaps block">
                  {tt("Principle", "Prinzip")}
                </label>
                <select id={`insight-${i}-basis`} className="field mt-1 max-w-md" value={a.basis ?? ""} onChange={(e) => setRow(i, { basis: (e.target.value || null) as Basis | null })}>
                  <option value="">{tt("Choose the principle…", "Prinzip wählen…")}</option>
                  {BASES.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.label}
                    </option>
                  ))}
                </select>
                {a.basis && <p className="mt-1 text-micro normal-case tracking-normal text-ash">{tt("Chosen: ", "Gewählt: ")}{BASIS_LABEL[a.basis]}</p>}
              </div>
            </TextBox>
            {i === 0 && (
          <WritingHelp
            id="insight-kit"
            refs={[
              { label: tt("What each principle asks for (Materi A1 to A3)", "Was jedes Prinzip verlangt (Materi A1 bis A3)"), value: tt("a seamless transition · recognition · consistency", "ein nahtloser Übergang · Wiedererkennung · Konsistenz"), target: "mat-A3" },
              { label: tt("The transitions between channels (table above)", "Die Übergänge zwischen Kanälen (Tabelle oben)"), value: tt("where customers drop out and what travels with them", "wo Kunden abspringen und was mit ihnen reist"), target: "cust-c1" },
            ]}
            steps={[
              tt("Choose the principle and name the transition you would change.", "Wählen Sie das Prinzip und nennen Sie den Übergang, den Sie ändern würden."),
              tt("Say the change in one sentence, concretely.", "Sagen Sie die Änderung in einem Satz, konkret."),
              tt("Finish with what the customer gets from it.", "Schließen Sie mit dem, was der Kunde davon hat."),
            ]}
          />
            )}
            <ExampleAnswer id={`insight-${i}-example`} guide={insightGuide(i)} />
            {mentor && <MentorGuide guide={insightGuide(i)} />}
          </div>
        ))}
      </div>
      <CheckBar onCheck={check} checkLabel={tt("Check my picks and improvements", "Meine Wahl und Verbesserungen prüfen")} checks={l1.checks} />
      {l1.insChecked && (
        <Reading>
          {l1.insFlagged.length === 0
            ? tt(`Nothing is outlined among the improvements. All ${INSIGHT_COUNT} serve different principles and say what the customer gains; whether they are good is for you and your facilitator to judge.`, `Bei den Verbesserungen ist nichts markiert. Alle ${INSIGHT_COUNT} dienen verschiedenen Prinzipien und sagen, was der Kunde gewinnt; ob sie gut sind, beurteilen Sie und Ihre Moderation.`)
            : tt(`${l1.insFlagged.length} improvement${l1.insFlagged.length === 1 ? " is" : "s are"} outlined: the principle is missing or repeated, the text is short, or it does not say what the customer gains.`, `${l1.insFlagged.length} ${l1.insFlagged.length === 1 ? "Verbesserung ist" : "Verbesserungen sind"} markiert: Das Prinzip fehlt oder wiederholt sich, der Text ist kurz, oder er sagt nicht, was der Kunde gewinnt.`)}
        </Reading>
      )}
      <BlockMissing block="1.3" route={1} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ Block 1.4 */

export function Block14() {
  const l1 = useStore((s) => s.l1);
  const patch = useStore((s) => s.patchL1);
  const mentor = useStore((s) => s.mentorUnlocked);
  const fields: { k: "interpret" | "causation" | "decider"; label: string; help: string }[] = [
    { k: "interpret", label: tt("Why do omnichannel strategies often fail, and where are the breaks and the unconnected systems at OmniTech?", "Warum scheitern Omnichannel-Strategien oft, und wo sind die Brüche und die nicht verbundenen Systeme bei OmniTech?"), help: tt("One or two sentences, using a transition from Block 1.3 and the systems that do not talk to each other.", "Ein oder zwei Sätze, mit einem Übergang aus Block 1.3 und den Systemen, die nicht miteinander sprechen.") },
    { k: "causation", label: tt("What is the difference between technology and customer experience?", "Was ist der Unterschied zwischen Technologie und Kundenerlebnis?"), help: tt("Name one example from OmniTech where a technology would not improve the experience, and say why.", "Nennen Sie ein Beispiel bei OmniTech, bei dem eine Technologie das Erlebnis nicht verbessern würde, und sagen Sie, warum.") },
    { k: "decider", label: tt("Why is integration the central success factor, and how would a strategic decision-maker prioritise?", "Warum ist Integration der zentrale Erfolgsfaktor, und wie würde eine strategische Entscheiderin priorisieren?"), help: tt("Name what comes first, what builds on it, and how you would measure the whole across channels. Be concrete.", "Nennen Sie, was zuerst kommt, was darauf aufbaut, und wie Sie das Ganze kanalübergreifend messen würden. Seien Sie konkret.") },
  ];
  return (
    <AnswerBlock
      id="block-1-4"
      title={tt("Block 1.4 · Coaching reflection: from Level 1 to Level 2", "Block 1.4 · Coaching-Reflexion: von Level 1 zu Level 2")}
      kind="JUDGED"
      core={false}
      minutes={BLOCK_MINUTES["1.4"]}
      findIt={tt("Route 1 → Task 1 → your own answers in Blocks 1.1 and 1.3, and the multichannel trap in Materi A1. Answer in the three fields below.", "Route 1 → Task 1 → Ihre eigenen Antworten in den Blöcken 1.1 und 1.3 und die Multichannel-Falle in Materi A1. Antworten Sie in den drei Feldern unten.")}
    >
      <MaterialRefs refs={["A1", "A2", "A3"]} />
      <p className="text-body text-ink">
        <Gloss>{tt("Before you make it measurable: why do omnichannel strategies fail, what separates technology from experience, and what comes first?", "Bevor Sie es messbar machen: Warum scheitern Omnichannel-Strategien, was trennt Technologie vom Erlebnis, und was kommt zuerst?")}</Gloss>
      </p>
      {fields.map((f) => (
        <div key={f.k} className="space-y-1.5">
          <TextBox id={IDS.reflect(f.k)} label={f.label} help={f.help} value={l1.reflect[f.k]} onChange={(v) => patch((s) => ({ reflect: { ...s.reflect, [f.k]: v } }))} min={MIN_LINE} rows={3} />
          <ExampleAnswer id={`reflect-${f.k}-example`} guide={reflectGuide(f.k)} />
          {mentor && <MentorGuide guide={reflectGuide(f.k)} />}
        </div>
      ))}
      <BlockMissing block="1.4" route={1} />
    </AnswerBlock>
  );
}
