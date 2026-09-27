import { bi, t } from "@/lib/lang";
import { TASK1_MINUTES, TASK2_MINUTES } from "@/lib/routes";

/** One registry for every material card: the rail, the cards and the task chips all read it. */
export type MaterialId = "A1" | "A2" | "A3" | "A4" | "A5" | "A6" | "A7" | "B1" | "B2" | "B3" | "B4" | "B5";
export type Block = "A" | "B";
export type MaterialMeta = { id: MaterialId; block: Block; title: string; minutes: number };

/** Day 10: Materi A (Route 1, Levels 1 and 2) seven cards, 60 minutes; Materi B (Route 2, Level 3) five cards, 60 minutes. */
export const MATERIALS: MaterialMeta[] = bi([
  { id: "A1" as MaterialId, block: "A" as Block, title: t("Omnichannel versus multichannel: integration instead of single channels", "Omnichannel statt Multichannel: Integration statt einzelner Kanäle"), minutes: 8 },
  { id: "A2" as MaterialId, block: "A" as Block, title: t("A seamless experience: consistency, recognition and transitions", "Ein nahtloses Erlebnis: Konsistenz, Wiedererkennung und Übergänge"), minutes: 9 },
  { id: "A3" as MaterialId, block: "A" as Block, title: t("Critical transitions, and where AI tools can build on them", "Kritische Übergänge, und wo KI-Werkzeuge darauf aufbauen können"), minutes: 9 },
  { id: "A4" as MaterialId, block: "A" as Block, title: t("What a seamless hand-over is worth: deal rate, lift and extra revenue", "Was eine nahtlose Übergabe wert ist: Abschlussquote, Lift und zusätzlicher Umsatz"), minutes: 9 },
  { id: "A5" as MaterialId, block: "A" as Block, title: t("KPIs across channels: outcome, driver, guardrail and vanity metrics", "KPIs über Kanäle hinweg: Outcome, Treiber, Guardrail und Vanity Metrics"), minutes: 8 },
  { id: "A6" as MaterialId, block: "A" as Block, title: t("Testing across channels, and reading trends", "Kanalübergreifend testen, und Trends lesen"), minutes: 9 },
  { id: "A7" as MaterialId, block: "A" as Block, title: t("AI tools and priorities: integration, effect, scalability", "KI-Werkzeuge und Prioritäten: Integration, Wirkung, Skalierbarkeit"), minutes: 8 },
  { id: "B1" as MaterialId, block: "B" as Block, title: t("An integrated customer system: the target vision", "Ein integriertes Kundensystem: das Zielbild"), minutes: 12 },
  { id: "B2" as MaterialId, block: "B" as Block, title: t("Central omnichannel processes: the decision first, then the data", "Zentrale Omnichannel-Prozesse: zuerst die Entscheidung, dann die Daten"), minutes: 12 },
  { id: "B3" as MaterialId, block: "B" as Block, title: t("A cross-channel KPI system: four tests", "Ein kanalübergreifendes KPI-System: vier Tests"), minutes: 12 },
  { id: "B4" as MaterialId, block: "B" as Block, title: t("Selecting and integrating AI tools: roll out, keep testing or stop", "KI-Werkzeuge auswählen und integrieren: ausrollen, weiter testen oder stoppen"), minutes: 12 },
  { id: "B5" as MaterialId, block: "B" as Block, title: t("An investment decision under unclear prospects, and the roadmap", "Eine Investitionsentscheidung bei unklaren Aussichten, und die Roadmap"), minutes: 12 },
]);

export const MATERIAL_BY_ID = Object.fromEntries(MATERIALS.map((m) => [m.id, m])) as Record<MaterialId, MaterialMeta>;
export const materialAnchorId = (id: MaterialId) => `mat-${id}`;

export type RailSection = { id: string; label: string; sub: string; minutes: number };
export const SECTIONS: Record<1 | 2, RailSection[]> = bi({
  1: [
    { id: "materi-a", label: t("Materi A", "Materi A"), sub: t("Levels 1 + 2 · connect, recognise, measure", "Level 1 + 2 · verbinden, wiedererkennen, messen"), minutes: 60 },
    { id: "task-1", label: t("Task 1", "Task 1"), sub: t("Omnichannel Analysis · one case", "Omnichannel Analysis · ein Fall"), minutes: TASK1_MINUTES },
  ],
  2: [
    { id: "materi-b", label: t("Materi B", "Materi B"), sub: t("Level 3 · integrated customer system", "Level 3 · integriertes Kundensystem"), minutes: 60 },
    { id: "task-2", label: t("Task 2", "Task 2"), sub: t("Omnichannel Strategy Memo · CDO", "Omnichannel Strategy Memo · CDO"), minutes: TASK2_MINUTES },
  ],
});
