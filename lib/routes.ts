import { bi, t } from "@/lib/lang";

/**
 * Day 10 route registry: Customer Retention & Buying Behaviour in B2B IT Sales, Module 5, Day 2 (designing and strategically
 * developing seamless customer experiences: omnichannel). From Day 3 on, a day has TWO routes (CLAUDE.md #30): Route 1 merges Level 1 and
 * Level 2 on one case, Route 2 is Level 3.
 */
export const COURSE = bi({
  title: t("Seamless Customer Experiences: Omnichannel, AI Tools and Integrated Systems", "Nahtlose Kundenerlebnisse: Omnichannel, KI-Werkzeuge und integrierte Systeme"),
  site: t("Retention Lab · Day 10", "Retention Lab · Tag 10"),
  module: t("Module 5, Day 2 of 2", "Modul 5, Tag 2 von 2"),
  course: t("Customer Retention & Buying Behaviour in B2B IT Sales", "Customer Retention & Kaufverhalten im B2B-IT-Vertrieb"),
  day: 10,
  company: "OmniTech Solutions GmbH",
});

export type RouteNo = 1 | 2;

export const BLOCK_MINUTES = { "1.1": 6, "1.2": 5, "1.3": 9, "1.4": 5, "2.1": 11, "2.2": 6, "2.3": 8, "2.4": 14, "3.1": 5, "3.2": 8, "3.3": 10, "3.4": 8, "3.5": 10, "3.6": 9 } as const;
const sum = (keys: (keyof typeof BLOCK_MINUTES)[]) => keys.reduce((s, k) => s + BLOCK_MINUTES[k], 0);
export const TASK1_MINUTES = sum(["1.1", "1.2", "1.3", "1.4", "2.1", "2.2", "2.3", "2.4"]);
export const TASK2_MINUTES = sum(["3.1", "3.2", "3.3", "3.4", "3.5", "3.6"]);

export type RouteInfo = { n: RouteNo; href: string; short: string; title: string; level: string; blurb: string; plan: { label: string; minutes: number }[]; built: boolean };

export const ROUTES: RouteInfo[] = bi([
  {
    n: 1 as RouteNo,
    href: "/route-1/",
    short: t("Omnichannel", "Omnichannel"),
    title: t("Route 1 · Connect, recognise, measure", "Route 1 · Verbinden, wiedererkennen, messen"),
    level: t("Levels 1 + 2 · Knowledge and application", "Level 1 + 2 · Wissen und Anwendung"),
    blurb: t(
      "One case, two levels: OmniTech Solutions has many channels, but they work in isolation. A customer starts online, switches to sales and later to support, and information is lost on the way. You learn the difference between multichannel and omnichannel, what makes an experience seamless (consistency, recognition, transitions), where AI tools such as chatbots, predictive analytics and personalised offers fit, and how to measure across channels. Then two core blocks: you find the breaks in one journey, and choose three measures inside €250,000 and six months. Six optional blocks go further: deciding which transitions are critical and where AI can build, with three improvements, tagging twelve metrics and naming three KPIs, a read of the hand-over figures, a coaching reflection, what each kind of metric is worth and a fair test. Material first, then one task that ends in an Omnichannel Analysis File.",
      "Ein Fall, zwei Level: OmniTech Solutions hat viele Kanäle, aber sie arbeiten isoliert. Ein Kunde startet online, wechselt zum Vertrieb und später zum Support, und unterwegs gehen Informationen verloren. Sie lernen den Unterschied zwischen Multichannel und Omnichannel, was ein Erlebnis nahtlos macht (Konsistenz, Wiedererkennung, Übergänge), wo KI-Werkzeuge wie Chatbots, Predictive Analytics und personalisierte Angebote passen, und wie man kanalübergreifend misst. Dann zwei Kernblöcke: Sie finden die Brüche in einer Journey und wählen drei Maßnahmen innerhalb von 250.000 € und sechs Monaten. Sechs optionale Blöcke gehen weiter: entscheiden, welche Übergänge kritisch sind und wo KI aufbauen kann, mit drei Verbesserungen, zwölf Kennzahlen zuordnen und drei KPIs nennen, eine Lektüre der Übergabe-Werte, eine Coaching-Reflexion, was jede Art von Kennzahl wert ist, und einen fairen Test. Erst das Material, dann eine Aufgabe, die mit einer Omnichannel Analysis File endet.",
    ),
    plan: [
      { label: t("Materi A · seven cards, Levels 1 and 2", "Materi A · sieben Karten, Level 1 und 2"), minutes: 60 },
      { label: t("Task 1 · Omnichannel Analysis, one task", "Task 1 · Omnichannel Analysis, eine Aufgabe"), minutes: TASK1_MINUTES },
    ],
    built: true,
  },
  {
    n: 2 as RouteNo,
    href: "/route-2/",
    short: t("Decide", "Entscheiden"),
    title: t("Route 2 · Management decision", "Route 2 · Managemententscheidung"),
    level: t("Level 3 · Management decision", "Level 3 · Managemententscheidung"),
    blurb: t(
      "You are now OmniTech's Chief Digital Officer. The systems are not integrated, the customer experience is inconsistent and competitors are technologically ahead. You set the target vision of an integrated customer system and build its architecture on a live panel that shows what your choices do: each of eight items is set to Now, After data is ready or Not now, and the diagram, three bars and four tests redraw at once. Then you make the investment decision despite unclear success prospects and say what you will watch and when you would stop. Four optional blocks go deeper. Material first, then one task that ends in an Omnichannel Strategy Memo that assembles below your answers.",
      "Sie sind jetzt Chief Digital Officer von OmniTech. Die Systeme sind nicht integriert, das Kundenerlebnis ist inkonsistent, und der Wettbewerb ist technologisch voraus. Sie legen das Zielbild eines integrierten Kundensystems fest und bauen seine Architektur an einem Live-Panel, das zeigt, was Ihre Entscheidungen bewirken: Jeder von acht Punkten steht auf Jetzt, Wenn die Daten bereit sind oder Jetzt nicht, und Diagramm, drei Balken und vier Tests zeichnen sich sofort neu. Dann treffen Sie die Investitionsentscheidung trotz unklarer Erfolgsaussichten und sagen, was Sie beobachten und wann Sie aufhören würden. Vier optionale Blöcke vertiefen. Erst das Material, dann eine Aufgabe, die in einem Omnichannel Strategy Memo endet, das sich unter Ihren Antworten zusammensetzt.",
    ),
    plan: [
      { label: t("Materi B · five cards, Level 3", "Materi B · fünf Karten, Level 3"), minutes: 60 },
      { label: t("Task 2 · Omnichannel Strategy Memo", "Task 2 · Omnichannel Strategy Memo"), minutes: TASK2_MINUTES },
    ],
    built: true,
  },
]);
