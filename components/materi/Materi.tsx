"use client";

import { CARDS_A } from "@/components/materi/CardsA";
import { CARDS_B } from "@/components/materi/CardsB";
import { ReferencesAccordion } from "@/components/ui/ReferencesAccordion";
import { SECTIONS } from "@/data/materialIndex";
import type { RefKey } from "@/data/references";
import { tt } from "@/lib/lang";

const REFS_A: RefKey[] = ["verhoef2015", "neslin2006", "lemon2016", "dixon2010", "gdpr2016", "rawson2013", "adam2021", "provost2013", "kaplan1992", "ries2011", "kohavi2020", "hubbard2014", "davenport2018"];
const REFS_B: RefKey[] = ["verhoef2015", "lemon2016", "rawson2013", "gdpr2016", "kaplan1992", "neslin2006", "kohavi2020", "davenport2018", "courtney1997", "klein2007"];

function Block({ id, title, intro, children }: { id: string; title: string; intro: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="space-y-4">
      <header className="space-y-1">
        <p className="smallcaps text-accent">{title}</p>
        <h2 id={`${id}-h`}>{intro}</h2>
      </header>
      {children}
    </section>
  );
}
const NOTE = () => tt("Check every source before you teach from it: page numbers and editions differ between printings.", "Prüfen Sie jede Quelle, bevor Sie damit unterrichten: Seitenzahlen und Auflagen unterscheiden sich.");

export function MateriA() {
  const s = SECTIONS[1][0];
  return (
    <Block id={s.id} title={tt(`Materi A · ${s.minutes} minutes, facilitator-led`, `Materi A · ${s.minutes} Minuten, moderiert`)} intro={tt("Seamless customer experiences: omnichannel instead of multichannel, the three principles, critical transitions and AI tools, and how to measure across channels", "Nahtlose Kundenerlebnisse: Omnichannel statt Multichannel, die drei Prinzipien, kritische Übergänge und KI-Werkzeuge, und wie man kanalübergreifend misst")}>
      <p className="max-w-prose text-body text-ash">
        {tt("Seven cards, Level 1 and Level 2 in one run: knowledge first (omnichannel versus multichannel, the three principles of a seamless experience, critical transitions and AI tools, what a seamless hand-over is worth), then application (KPIs across channels, testing and trends, choosing measures). Every diagram uses Weser Systemhaus, another company, so the task is never answered for you.", "Sieben Karten, Level 1 und Level 2 in einem Durchgang: zuerst Wissen (Omnichannel statt Multichannel, die drei Prinzipien eines nahtlosen Erlebnisses, kritische Übergänge und KI-Werkzeuge, was eine nahtlose Übergabe wert ist), dann Anwendung (KPIs über Kanäle hinweg, Testen und Trends, Maßnahmen wählen). Jedes Diagramm nutzt Weser Systemhaus, ein anderes Unternehmen, damit die Aufgabe nie für Sie gelöst wird.")}
      </p>
      {CARDS_A.map((C, i) => (
        <C key={i} />
      ))}
      <ReferencesAccordion block="A" keys={REFS_A} note={NOTE()} />
    </Block>
  );
}

export function MateriB() {
  const s = SECTIONS[2][0];
  return (
    <Block id={s.id} title={tt(`Materi B · ${s.minutes} minutes, facilitator-led`, `Materi B · ${s.minutes} Minuten, moderiert`)} intro={tt("An integrated customer system: the vision, the central omnichannel processes, the cross-channel KPI system, the selection and integration of AI tools, and an investment decision under unclear prospects", "Ein integriertes Kundensystem: das Zielbild, die zentralen Omnichannel-Prozesse, das kanalübergreifende KPI-System, die Auswahl und Integration von KI-Werkzeugen und eine Investitionsentscheidung bei unklaren Aussichten")}>
      <p className="max-w-prose text-body text-ash">
        {tt("Five cards for Level 3. You stop fixing single transitions and start designing how the whole company is integrated around the customer. Each card ends in rules the task uses; each diagram uses Isar Datentechnik, another company.", "Fünf Karten für Level 3. Sie beheben keine einzelnen Übergänge mehr, sondern gestalten, wie das ganze Unternehmen um den Kunden integriert wird. Jede Karte endet mit Regeln, die die Aufgabe nutzt; jedes Diagramm nutzt Isar Datentechnik, ein anderes Unternehmen.")}
      </p>
      {CARDS_B.map((C, i) => (
        <C key={i} />
      ))}
      <ReferencesAccordion block="B" keys={REFS_B} note={NOTE()} />
    </Block>
  );
}
