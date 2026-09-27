"use client";

import { ExportBar } from "@/components/ui/ExportBar";
import { Block11, Block12, Block13, Block14 } from "@/components/task1/Part1";
import { Block21, Block22, Block23, Block24 } from "@/components/task1/Part2";
import { Callout } from "@/components/ui/MaterialCard";
import { BUDGET, MONTHS } from "@/data/measures";
import { analysisBody } from "@/lib/exportDoc";
import { l1Missing } from "@/lib/missing";
import { euro, tt } from "@/lib/lang";
import { exportName } from "@/lib/slug";
import { usePersisted } from "@/store/usePersisted";
import { Gloss } from "@/lib/glossify";
import { TASK1_MINUTES } from "@/lib/routes";

function CaseBrief() {
  return (
    <section id="case-brief" aria-labelledby="case-h" className="card space-y-3 p-4 md:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="case-h">{tt("The case: OmniTech Solutions GmbH", "Der Fall: OmniTech Solutions GmbH")}</h2>
        <span className="smallcaps">{tt("Read once · about 5 min", "Einmal lesen · ca. 5 Min.")}</span>
      </div>
      <p className="max-w-prose text-body text-ink">
        <Gloss>
          {tt("OmniTech Solutions GmbH sells IT solutions to the Mittelstand through a website with an online configurator, a web shop, a chat, a sales team and a support hotline. Each channel works well on its own, but they work in isolation. A typical customer starts online, then switches to sales and later to support, and on the way information gets lost: they repeat what they already said, hear two prices, and wait between the steps. The experience is inconsistent, and the company's AI potential is unused.", "OmniTech Solutions GmbH verkauft dem Mittelstand IT-Lösungen über eine Website mit Online-Konfigurator, einen Webshop, einen Chat, ein Vertriebsteam und eine Support-Hotline. Jeder Kanal arbeitet für sich gut, aber sie arbeiten isoliert. Ein typischer Kunde startet online, wechselt dann zum Vertrieb und später zum Support, und unterwegs gehen Informationen verloren: Er wiederholt, was er schon gesagt hat, hört zwei Preise und wartet zwischen den Schritten. Das Erlebnis ist inkonsistent, und das KI-Potenzial des Unternehmens bleibt ungenutzt.")}
        </Gloss>
      </p>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt("What you have", "Was Sie haben")}</p>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-ink">
            <li>{tt("Nine weaknesses noted along one customer's journey (Block 1.1).", "Neun Schwachstellen, notiert entlang der Journey eines Kunden (Block 1.1).")}</li>
            <li>{tt("Last year's hand-overs with and without the online history, and eight transitions between channels (Blocks 1.2 and 1.3).", "Die Übergaben des letzten Jahres mit und ohne Online-Historie und acht Übergänge zwischen Kanälen (Blöcke 1.2 und 1.3).")}</li>
            <li>{tt("Twelve metrics OmniTech reports today (Block 2.1).", "Zwölf Kennzahlen, die OmniTech heute berichtet (Block 2.1).")}</li>
          </ul>
        </div>
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt("The limits", "Die Grenzen")}</p>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-ink">
            <li>
              {tt("Budget: ", "Budget: ")}
              <strong>{euro(BUDGET)}</strong>
            </li>
            <li>
              {tt("Time: ", "Zeit: ")}
              <strong>{tt(`${MONTHS} months`, `${MONTHS} Monate`)}</strong>
            </li>
            <li>{tt("The cost, the weeks and what every measure connects to are printed in Block 2.4.", "Kosten, Wochen und womit jede Maßnahme verbunden ist, stehen in Block 2.4.")}</li>
          </ul>
        </div>
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt(`How the task runs · about ${TASK1_MINUTES} min`, `So läuft die Aufgabe · ca. ${TASK1_MINUTES} Min.`)}</p>
          <ol className="mt-1 list-decimal space-y-1 pl-4 text-ink">
            <li>{tt("Find the breaks in the journey, what a seamless hand-over is worth, which transitions are critical, and three improvements with their advantage for customers (Level 1).", "Die Brüche der Journey finden, was eine nahtlose Übergabe wert ist, welche Übergänge kritisch sind, und drei Verbesserungen mit ihrem Vorteil für Kunden (Level 1).")}</li>
            <li>{tt("Define KPIs across channels and design a fair A/B test (Level 2).", "Kanalübergreifende KPIs festlegen und einen fairen A/B-Test entwerfen (Level 2).")}</li>
            <li>{tt("Evaluate the AI tools and other measures, choose three and defend the order.", "Die KI-Werkzeuge und anderen Maßnahmen bewerten, drei wählen und die Reihenfolge begründen.")}</li>
          </ol>
        </div>
      </div>
      <Callout label={tt("Case assumption", "Fallannahme")} tone="amber">
        <p>
          {tt("The brief says: a customer starts online, switches to sales and later to support; information gets lost and the experience is inconsistent; channels work in isolation and the AI potential is unused; €250,000 and six months. Everything else is made up for this exercise: the journey, the hand-over figures, the transitions, the metrics, the rates and the costs.", "Der Auftrag sagt: Ein Kunde startet online, wechselt zum Vertrieb und später zum Support; Informationen gehen verloren, und das Erlebnis ist inkonsistent; Kanäle arbeiten isoliert, und das KI-Potenzial ist ungenutzt; 250.000 € und sechs Monate. Alles andere ist für diese Übung erfunden: die Journey, die Übergabe-Werte, die Übergänge, die Kennzahlen, die Quoten und die Kosten.")}
        </p>
      </Callout>
    </section>
  );
}

function PartHeading({ id, n, title, level }: { id: string; n: number; title: string; level: string }) {
  return (
    <div id={id} className="flex flex-wrap items-baseline gap-x-3 border-b-2 border-ink pb-1 pt-2">
      <span className="smallcaps text-accent">{tt(`Part ${n}`, `Teil ${n}`)}</span>
      <h2>{title}</h2>
      <span className="smallcaps ml-auto">{level}</span>
    </div>
  );
}

export function Task1() {
  const p = usePersisted();
  const missing = l1Missing(p);
  const filename = exportName(p.participant.name, "l1l2-omnichannel-file");
  return (
    <section id="task-1" aria-labelledby="task1-h" className="space-y-6">
      <header className="space-y-1">
        <p className="smallcaps text-accent">{tt(`Task 1 · about ${TASK1_MINUTES} minutes`, `Task 1 · ca. ${TASK1_MINUTES} Minuten`)}</p>
        <h2 id="task1-h">{tt("Omnichannel Analysis: connect, recognise, measure", "Omnichannel Analysis: verbinden, wiedererkennen, messen")}</h2>
      </header>
      <CaseBrief />
      <PartHeading id="part-1" n={1} title={tt("Understand the omnichannel experience", "Das Omnichannel-Erlebnis verstehen")} level={tt("Level 1 · Knowledge", "Level 1 · Wissen")} />
      <Block11 />
      <Block12 />
      <Block13 />
      <Block14 />
      <PartHeading id="part-2" n={2} title={tt("Make it measurable and choose", "Messbar machen und auswählen")} level={tt("Level 2 · Application", "Level 2 · Anwendung")} />
      <Block21 />
      <Block22 />
      <Block23 />
      <Block24 />
      <ExportBar
        id="export-l1l2"
        previewTitle={tt("Preview of your Omnichannel Analysis File", "Vorschau Ihrer Omnichannel Analysis File")}
        exportLabel={tt("Export the Omnichannel Analysis File", "Omnichannel Analysis File exportieren")}
        docTitle="Omnichannel Analysis File"
        filename={filename}
        missing={missing}
        buildBody={() => analysisBody(p)}
      />
    </section>
  );
}
