"use client";

import { ExportBar } from "@/components/ui/ExportBar";
import { OptionalSection } from "@/components/ui/OptionalSection";
import { Block11, Block12, Block13, Block14 } from "@/components/task1/Part1";
import { Block21, Block22, Block23, Block24 } from "@/components/task1/Part2";
import { Callout } from "@/components/ui/MaterialCard";
import { BUDGET, MONTHS } from "@/data/measures";
import { analysisBody } from "@/lib/exportDoc";
import { l1Missing } from "@/lib/missing";
import { euro, num, tt } from "@/lib/lang";
import { FORECAST, PILOT } from "@/data/forecast";
import { exportName } from "@/lib/slug";
import { usePersisted } from "@/store/usePersisted";
import { Gloss } from "@/lib/glossify";
import { BLOCK_MINUTES, TASK1_MINUTES } from "@/lib/routes";

const CORE_MIN = BLOCK_MINUTES["1.1"] + BLOCK_MINUTES["1.3"] + BLOCK_MINUTES["2.1"] + BLOCK_MINUTES["2.4"];

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
      <p className="max-w-prose text-body text-ink">
        <Gloss>
          {tt(
            `One first sign: last year ${num(PILOT.control.sent)} journeys went from online to sales and sales started from zero; ${num(FORECAST.controlRate, { maximumFractionDigits: 1 })}% ended in a deal. In ${num(PILOT.variant.sent)} journeys sales saw the online history; ${num(FORECAST.f1, { maximumFractionDigits: 1 })}% ended in a deal, ${num(FORECAST.f2)} times as often. The groups may differ in other ways, so it is a hint, not proof.`,
            `Ein erstes Zeichen: Im letzten Jahr gingen ${num(PILOT.control.sent)} Journeys von online zum Vertrieb, und der Vertrieb fing bei null an; ${num(FORECAST.controlRate, { maximumFractionDigits: 1 })} % endeten in einem Abschluss. Bei ${num(PILOT.variant.sent)} Journeys sah der Vertrieb die Online-Historie; ${num(FORECAST.f1, { maximumFractionDigits: 1 })} % endeten in einem Abschluss, ${num(FORECAST.f2)}-mal so oft. Die Gruppen unterscheiden sich vielleicht auch in anderem, also ist es ein Hinweis, kein Beweis.`,
          )}
        </Gloss>
      </p>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt("What you have", "Was Sie haben")}</p>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-ink">
            <li>{tt("Nine weaknesses noted along one customer's journey (Block 1.1).", "Neun Schwachstellen, notiert entlang der Journey eines Kunden (Block 1.1).")}</li>
            <li>{tt("Eight transitions between channels (Block 1.3); last year's hand-overs with and without the online history (optional Block 1.2).", "Acht Übergänge zwischen Kanälen (Block 1.3); die Übergaben des letzten Jahres mit und ohne Online-Historie (optionaler Block 1.2).")}</li>
            <li>{tt("Twelve metrics OmniTech reports today (Block 2.1) and six measures it could fund (Block 2.4).", "Zwölf Kennzahlen, die OmniTech heute berichtet (Block 2.1), und sechs Maßnahmen, die es finanzieren könnte (Block 2.4).")}</li>
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
          <p className="smallcaps">{tt(`How the task runs · four core blocks, about ${CORE_MIN} min`, `So läuft die Aufgabe · vier Kernblöcke, ca. ${CORE_MIN} Min.`)}</p>
          <ol className="mt-1 list-decimal space-y-1 pl-4 text-ink">
            <li>{tt("Block 1.1: sort nine weaknesses by the principle each breaks, and name a break of your own (Level 1).", "Block 1.1: neun Schwachstellen nach dem Prinzip sortieren, das jede bricht, und einen eigenen Bruch nennen (Level 1).")}</li>
            <li>{tt("Block 1.3: choose the two critical transitions and the two where AI can build on the data, and write three improvements (Level 1).", "Block 1.3: die zwei kritischen Übergänge und die zwei, an denen KI auf den Daten aufbauen kann, wählen und drei Verbesserungen schreiben (Level 1).")}</li>
            <li>{tt("Block 2.1: tag twelve cross-channel metrics by kind and name your three KPIs (Level 2).", "Block 2.1: zwölf kanalübergreifende Kennzahlen nach Art zuordnen und Ihre drei KPIs nennen (Level 2).")}</li>
            <li>{tt("Block 2.4: choose three of six measures, score them and defend the order (Level 2).", "Block 2.4: drei von sechs Maßnahmen wählen, bewerten und die Reihenfolge begründen (Level 2).")}</li>
          </ol>
          <p className="mt-1 text-ash">{tt(`Four more blocks (about ${TASK1_MINUTES - CORE_MIN} min) are optional and folded.`, `Vier weitere Blöcke (ca. ${TASK1_MINUTES - CORE_MIN} Min.) sind optional und eingeklappt.`)}</p>
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
        <p className="smallcaps text-accent">{tt(`Task 1 · four core blocks, optional blocks folded`, `Task 1 · vier Kernblöcke, optionale Blöcke eingeklappt`)}</p>
        <h2 id="task1-h">{tt("Omnichannel Analysis: connect, recognise, measure", "Omnichannel Analysis: verbinden, wiedererkennen, messen")}</h2>
      </header>
      <CaseBrief />
      <PartHeading id="part-1" n={1} title={tt("Understand the omnichannel experience", "Das Omnichannel-Erlebnis verstehen")} level={tt("Level 1 · Knowledge", "Level 1 · Wissen")} />
      <Block11 />
      <OptionalSection
        id="block-1-2"
        title={tt("Block 1.2 · Read the hand-over figures: two deal rates side by side", "Block 1.2 · Die Übergabe-Werte lesen: zwei Abschlussquoten nebeneinander")}
        minutes={BLOCK_MINUTES["1.2"]}
        reason={tt("Practises reading one comparison without being fooled by it (the two groups may differ in other ways); the choices of Block 2.4 do not need it.", "Übt, einen Vergleich zu lesen, ohne sich täuschen zu lassen (die zwei Gruppen unterscheiden sich vielleicht auch in anderem); die Entscheidungen in Block 2.4 brauchen es nicht.")}
      >
        <Block12 />
      </OptionalSection>
      <Block13 />
      <OptionalSection
        id="block-1-4"
        title={tt("Block 1.4 · Coaching reflection: from Level 1 to Level 2", "Block 1.4 · Coaching-Reflexion: von Level 1 zu Level 2")}
        minutes={BLOCK_MINUTES["1.4"]}
        reason={tt("A reflective bridge between Level 1 and Level 2, not content the Omnichannel Analysis File itself needs.", "Eine reflektierende Brücke zwischen Level 1 und Level 2, kein Inhalt, den die Omnichannel Analysis File selbst braucht.")}
      >
        <Block14 />
      </OptionalSection>
      <PartHeading id="part-2" n={2} title={tt("Make it measurable and choose", "Messbar machen und auswählen")} level={tt("Level 2 · Application", "Level 2 · Anwendung")} />
      <Block21 />
      <OptionalSection
        id="block-2-2"
        title={tt("Block 2.2 · What each kind of metric is worth, and the uncertainties", "Block 2.2 · Was jede Art von Kennzahl wert ist, und die Unsicherheiten")}
        minutes={BLOCK_MINUTES["2.2"]}
        reason={tt("Reads what each kind of metric tells management, from your tags in Block 2.1, and what can mislead a measurement; Block 2.4 can be answered without it.", "Liest, was jede Art von Kennzahl dem Management sagt, aus Ihren Zuordnungen in Block 2.1, und was eine Messung in die Irre führen kann; Block 2.4 lässt sich auch ohne es beantworten.")}
      >
        <Block22 />
      </OptionalSection>
      <OptionalSection
        id="block-2-3"
        title={tt("Block 2.3 · Design a fair A/B test", "Block 2.3 · Einen fairen A/B-Test entwerfen")}
        minutes={BLOCK_MINUTES["2.3"]}
        reason={tt("Applies the fair-test rules of Materi A6 to a hand-over card; the measures of Block 2.4 are chosen and scored without it.", "Wendet die Regeln eines fairen Tests aus Materi A6 auf eine Übergabekarte an; die Maßnahmen in Block 2.4 werden auch ohne ihn gewählt und bewertet.")}
      >
        <Block23 />
      </OptionalSection>
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
