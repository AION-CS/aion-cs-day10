import { MATERIALS, materialAnchorId } from "@/data/materialIndex";
import type { RouteNo } from "@/lib/routes";
import type { TaskBlockId } from "@/lib/progress";
import { tt } from "@/lib/lang";

/** The page map on the right of every route (CLAUDE.md #28). Built on call, so it follows the language. */
export type NavItem = { id: string; short: string; title: string; done?: { card: string } | { block: TaskBlockId } };
export type NavGroup = { label: string; items: NavItem[] };

const cards = (block: "A" | "B"): NavItem[] => MATERIALS.filter((m) => m.block === block).map((m) => ({ id: materialAnchorId(m.id), short: m.id, title: m.title, done: { card: m.id } }));
const blk = (n: string, title: string, block: TaskBlockId): NavItem => ({ id: `block-${n.replace(".", "-")}`, short: n, title, done: { block } });

export function pageNav(route: RouteNo): NavGroup[] {
  if (route === 1)
    return [
      { label: "Materi A", items: cards("A") },
      {
        label: "Task 1",
        items: [
          { id: "case-brief", short: tt("Case", "Fall"), title: tt("The case: OmniTech", "Der Fall: OmniTech") },
          blk("1.1", tt("Weaknesses in the journey", "Schwachstellen der Journey"), "b11"),
          blk("1.2", tt("What a seamless hand-over is worth", "Was eine nahtlose Übergabe wert ist"), "b12"),
          blk("1.3", tt("Critical transitions, three improvements", "Kritische Übergänge, drei Verbesserungen"), "b13"),
          blk("1.4", tt("Coaching reflection", "Coaching-Reflexion"), "b14"),
          blk("2.1", tt("Tag the twelve metrics", "Die zwölf Kennzahlen zuordnen"), "b21"),
          blk("2.2", tt("What each kind is worth, your three KPIs", "Was jede Art wert ist, Ihre drei KPIs"), "b22"),
          blk("2.3", tt("A fair A/B test", "Ein fairer A/B-Test"), "b23"),
          blk("2.4", tt("Three measures, scored and ordered", "Drei Maßnahmen, bewertet und geordnet"), "b24"),
          { id: "export-l1l2", short: "Export", title: tt("Export the Omnichannel Analysis File", "Omnichannel Analysis File exportieren") },
        ],
      },
    ];
  return [
    { label: "Materi B", items: cards("B") },
    {
      label: "Task 2",
      items: [
        { id: "task-2", short: tt("Case", "Fall"), title: tt("The situation and the budget", "Die Lage und das Budget") },
        blk("3.1", tt("The target vision", "Das Zielbild"), "b31"),
        blk("3.2", tt("Central omnichannel processes", "Zentrale Omnichannel-Prozesse"), "b32"),
        blk("3.3", tt("The cross-channel KPI system", "Das kanalübergreifende KPI-System"), "b33"),
        blk("3.4", tt("AI tools, tested", "KI-Werkzeuge, getestet"), "b34"),
        blk("3.5", tt("The strategic roadmap", "Die strategische Roadmap"), "b35"),
        blk("3.6", tt("The investment decision", "Die Investitionsentscheidung"), "b36"),
        { id: "export-l3", short: "Export", title: tt("Export the Omnichannel Strategy Memo", "Omnichannel Strategy Memo exportieren") },
      ],
    },
  ];
}
