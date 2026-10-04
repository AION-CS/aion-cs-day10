"use client";

import { useState } from "react";
import { Block31, Block32, Block33, Block34 } from "@/components/task2/Blocks";
import { MemoPanel } from "@/components/task2/MemoPanel";
import { Panel } from "@/components/task2/Panel";
import { StepA } from "@/components/task2/StepA";
import { StepB } from "@/components/task2/StepB";
import { TodayTable } from "@/components/task2/Kits";
import { ExportBar } from "@/components/ui/ExportBar";
import { Callout } from "@/components/ui/MaterialCard";
import { OptionalSection } from "@/components/ui/OptionalSection";
import { MEASURE_BY_ID } from "@/data/measures";
import { R2_BUDGET, R2_MONTHS } from "@/data/route2";
import { Gloss } from "@/lib/glossify";
import { euro, tt } from "@/lib/lang";
import { memoBody } from "@/lib/exportDoc";
import { r2Missing } from "@/lib/missing";
import { BLOCK_MINUTES, TASK2_MINUTES } from "@/lib/routes";
import { exportName } from "@/lib/slug";
import type { Scn } from "@/lib/r2Panel";
import { useJumpTo } from "@/lib/useJumpTo";
import { usePersisted } from "@/store/usePersisted";
import { useHydrated } from "@/store/useStore";

/** The situation of Route 2, stated once, directly above the task, with a soft pointer to the learner's own Route 1 answers. */
function CaseBrief() {
  const hydrated = useHydrated();
  const p = usePersisted();
  const jump = useJumpTo();
  const chosen = p.l1.chosen.map((id) => MEASURE_BY_ID[id].name);
  const has = hydrated && chosen.length > 0;
  return (
    <section id="task-2" aria-labelledby="task2-h" className="card space-y-3 p-4 md:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="task2-h">{tt("The situation: you are the Chief Digital Officer", "Die Lage: Sie sind Chief Digital Officer")}</h2>
        <span className="smallcaps">{tt("Read once · about 4 min", "Einmal lesen · ca. 4 Min.")}</span>
      </div>
      <p className="max-w-prose text-body text-ink">
        <Gloss>
          {tt("OmniTech has seen that hand-overs with the customer's history close twice as often. You now answer for how the whole company connects its channels and uses AI. The systems are not integrated, the customer experience is inconsistent and competitors are technologically ahead. The budget is restricted, the system landscape is complex and time is short. The board wants an integrated omnichannel strategy, and an investment decision now, although nobody can promise its success.", "OmniTech hat gesehen, dass Übergaben mit der Historie des Kunden doppelt so oft abschließen. Sie verantworten jetzt, wie das ganze Unternehmen seine Kanäle verbindet und KI nutzt. Die Systeme sind nicht integriert, das Kundenerlebnis ist inkonsistent, und der Wettbewerb ist technologisch voraus. Das Budget ist begrenzt, die Systemlandschaft komplex und die Zeit knapp. Der Vorstand will eine integrierte Omnichannel-Strategie und jetzt eine Investitionsentscheidung, obwohl niemand ihren Erfolg versprechen kann.")}
        </Gloss>
      </p>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt("The limits", "Die Grenzen")}</p>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-ink">
            <li>
              {tt("Budget: ", "Budget: ")}
              <strong>{euro(R2_BUDGET)}</strong> {tt("(Case assumption)", "(Fallannahme)")}
            </li>
            <li>
              {tt("Time: ", "Zeit: ")}
              <strong>{tt(`${R2_MONTHS} months`, `${R2_MONTHS} Monate`)}</strong>
            </li>
            <li>{tt("The items and their costs are in Step A; the numbers today are in the table below.", "Die Punkte und ihre Kosten stehen in Schritt A; die Zahlen heute stehen in der Tabelle darunter.")}</li>
          </ul>
        </div>
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption md:col-span-2">
          <p className="smallcaps">{tt(`What you build · about ${TASK2_MINUTES} min`, `Was Sie bauen · ca. ${TASK2_MINUTES} Min.`)}</p>
          <ol className="mt-1 grid list-decimal gap-x-6 pl-4 text-ink sm:grid-cols-2">
            <li>{tt("The target vision of an integrated customer system", "Das Zielbild eines integrierten Kundensystems")}</li>
            <li>{tt("The definition of central omnichannel processes", "Die Bestimmung zentraler Omnichannel-Prozesse")}</li>
            <li>{tt("The selection and integration of AI tools", "Die Auswahl und Integration von KI-Werkzeugen")}</li>
            <li>{tt("A cross-channel KPI system", "Ein kanalübergreifendes KPI-System")}</li>
            <li>{tt("A strategic roadmap for further development", "Eine strategische Roadmap für die Weiterentwicklung")}</li>
            <li>{tt("An investment decision despite unclear success prospects", "Eine Investitionsentscheidung trotz unklarer Erfolgsaussichten")}</li>
          </ol>
        </div>
      </div>
      <TodayTable />
      <div role="note" className="rounded-lg border border-gold bg-accentSoft p-3 text-caption text-ink" id="task1-quote">
        <p className="smallcaps text-accent">{tt("Where Route 1 left off · your own answers", "Wo Route 1 aufgehört hat · Ihre eigenen Antworten")}</p>
        {has ? (
          <p className="mt-1">
            {tt("Measures you chose in Route 1: ", "Von Ihnen in Route 1 gewählte Maßnahmen: ")}
            <strong>{chosen.join(", ")}</strong>.
          </p>
        ) : (
          <p className="mt-1">{tt("You have not answered Route 1 yet. That is fine: nothing here is blocked, and this box fills in when you do.", "Sie haben Route 1 noch nicht beantwortet. Das ist in Ordnung: Hier ist nichts gesperrt, und dieses Feld füllt sich, sobald Sie es tun.")}</p>
        )}
        <button type="button" onClick={() => jump("block-2-4", "/route-1/")} className="btn-ghost btn-sm mt-2">
          {tt("Go to Block 2.4 in Route 1", "Zu Block 2.4 in Route 1")}
        </button>
      </div>
      <Callout label={tt("Case assumption", "Fallannahme")} tone="amber">
        <p>
          {tt("The brief gives the role (Chief Digital Officer or sales manager) and the situation: systems not integrated, customer experience inconsistent, competitors technologically ahead, budget restrictions, a complex system landscape and high time pressure, and an investment decision despite unclear success prospects. The budget, the processes, the uplifts, the costs and the baselines are made up for this exercise.", "Der Auftrag nennt die Rolle (Chief Digital Officer oder Vertriebsleitung) und die Lage: Systeme nicht integriert, Kundenerlebnis inkonsistent, Wettbewerb technologisch voraus, Budgetgrenzen, eine komplexe Systemlandschaft und hoher Zeitdruck, und eine Investitionsentscheidung trotz unklarer Erfolgsaussichten. Budget, Prozesse, Uplifts, Kosten und Ausgangswerte sind für diese Übung erfunden.")}
        </p>
      </Callout>
    </section>
  );
}

export function Task2() {
  const p = usePersisted();
  const [scn, setScn] = useState<Scn>(0);
  const missing = r2Missing(p);
  const filename = exportName(p.participant.name, "l3-omnichannel-memo");
  return (
    <div className="space-y-6">
      <CaseBrief />
      <div id="r2-frame" className="space-y-4">
        <Panel scn={scn} setScn={setScn} />
        <StepA scn={scn} />
        <StepB scn={scn} />
      </div>
      <section id="go-deeper" aria-labelledby="go-deeper-h" className="space-y-3">
        <div className="space-y-1">
          <h2 id="go-deeper-h">{tt("Go deeper · optional", "Vertiefen · optional")}</h2>
          <p className="max-w-prose text-caption text-ash">
            {tt(
              "Four blocks that each practise one part of the plan: the principles of the vision, the definition of central omnichannel processes, the KPI system, and roll out, keep testing or stop for AI tools. They are folded: nothing in Step A or Step B needs them, and they are not counted in the progress ring or the missing list. Open one any time.",
              "Vier Blöcke, die je einen Teil des Plans üben: die Prinzipien des Zielbilds, die Festlegung zentraler Omnichannel-Prozesse, das KPI-System, und ausrollen, weiter testen oder stoppen bei KI-Werkzeugen. Sie sind eingeklappt: Nichts in Schritt A oder Schritt B braucht sie, und sie zählen nicht im Fortschrittsring oder in der Liste des Offenen. Öffnen Sie einen jederzeit.",
            )}
          </p>
        </div>
        <OptionalSection
          id="block-3-1"
          title={tt("Block 3.1 · The target vision of an integrated customer system", "Block 3.1 · Das Zielbild eines integrierten Kundensystems")}
          minutes={BLOCK_MINUTES["3.1"]}
          reason={tt("Names the principles behind an integrated customer system; Step A asks for your vision without them.", "Benennt die Prinzipien hinter einem integrierten Kundensystem; Schritt A fragt Ihr Zielbild auch ohne sie ab.")}
        >
          <Block31 />
        </OptionalSection>
        <OptionalSection
          id="block-3-2"
          title={tt("Block 3.2 · Definition of central omnichannel processes", "Block 3.2 · Festlegung zentraler Omnichannel-Prozesse")}
          minutes={BLOCK_MINUTES["3.2"]}
          reason={tt("Sorts eight omnichannel processes into integrate now, connect the data first or not central; Step A prints the figures it needs itself.", "Sortiert acht Omnichannel-Prozesse in jetzt integrieren, zuerst die Daten verbinden oder nicht zentral; Schritt A druckt die Zahlen, die er braucht, selbst.")}
        >
          <Block32 />
        </OptionalSection>
        <OptionalSection
          id="block-3-3"
          title={tt("Block 3.3 · A cross-channel KPI system", "Block 3.3 · Ein kanalübergreifendes KPI-System")}
          minutes={BLOCK_MINUTES["3.3"]}
          reason={tt("Rates cross-channel KPI candidates on four tests; Step B prints the customer figures it uses, so the decision does not need the ratings.", "Bewertet kanalübergreifende KPI-Kandidaten nach vier Tests; Schritt B druckt die Kundenzahlen, die er nutzt, die Entscheidung braucht die Bewertungen also nicht.")}
        >
          <Block33 />
        </OptionalSection>
        <OptionalSection
          id="block-3-4"
          title={tt("Block 3.4 · Selection and integration of AI tools, tested: roll out, keep testing or stop", "Block 3.4 · Auswahl und Integration von KI-Werkzeugen, getestet: ausrollen, weiter testen oder stoppen")}
          minutes={BLOCK_MINUTES["3.4"]}
          reason={tt("Decides roll out, keep testing or stop for six AI tool tests; Step B asks only when you would stop.", "Entscheidet für sechs Tests von KI-Werkzeugen über Ausrollen, Weitertesten oder Stoppen; Schritt B fragt nur, wann Sie aufhören würden.")}
        >
          <Block34 />
        </OptionalSection>
      </section>
      <MemoPanel />
      <ExportBar
        id="export-l3"
        previewTitle={tt("Preview of your memo", "Vorschau Ihres Memos")}
        exportLabel={tt("Export the Omnichannel Strategy Memo", "Omnichannel Strategy Memo exportieren")}
        docTitle="Omnichannel Strategy Memo"
        filename={filename}
        missing={missing}
        buildBody={() => memoBody(p)}
        showPreview={false}
      />
    </div>
  );
}
