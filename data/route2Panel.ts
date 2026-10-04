import { ARCH_IDS } from "@/data/route2";
import type { ArchId } from "@/data/route2";
import { bi, t } from "@/lib/lang";

/**
 * What the Route 2 control panel reads (CLAUDE.md #47). Every figure is a Case assumption and is printed on the item cards and in "the
 * numbers today", so a Core block never reads an Optional one (#40): `data` is the share of the steps an AI tool reads whose data already reaches the
 * shared customer profile, the same figure the process list of the “Go deeper” part prints for the process it also names (a check in
 * `npm run verify:calc` keeps them equal). Nothing here asks the learner to calculate (#44): the panel computes it and says what it means.
 * (Identifiers keep the names of the file this was built from: `chat` is the hand-over standard, `personal` the chatbot, `routing` the predictive
 * analytics, `tracking` the one price list, `relaunch` the new app.)
 */
export type Tier = "now" | "later" | "not";
export const TIER_IDS: Tier[] = ["now", "later", "not"];
export const TIER_LABEL = bi({ now: t("Now", "Jetzt"), later: t("After data is ready", "Wenn die Daten bereit sind"), not: t("Not now", "Jetzt nicht") });

/** The "weaker data" scenario: every readiness figure is this many points lower (the plan's “complex system landscape”). */
export const WEAK_POINTS = 15;
/** An AI tool starts on data that is at least this connected (the rule of Materi B5; the same bar as the “Go deeper” part's). */
export const READY_BAR = 80;

/** Where an item sits in the architecture diagram. */
export type Layer = "suite" | "site" | "engine" | "people" | "base";

export type PanelFacts = {
  layer: Layer;
  /** Short name for the diagram. */
  short: string;
  /** What the item does for the system, in one phrase after "Moves". */
  moves: string;
  /** It moves a named KPI of customers (a rate customers' behaviour changes). */
  named: boolean;
  /** It makes the other items measurable or usable (the shared profile and KPI system, the hand-over standard, the training, the one price list). */
  enabler: boolean;
  /** Its effect can be measured once it is in place (a named KPI, or the measurement system itself). */
  measured: boolean;
  /** Share of the steps it reads whose data already reaches the shared profile today (percent), or null when it needs no data to start. */
  data: number | null;
  /** The hand-over standard prepares the data this item reads: it is ready when the standard is in use before the item starts. */
  cleaned: boolean;
  blackBox: boolean;
};

export const PANEL: Record<ArchId, PanelFacts> = bi({
  foundation: { layer: "base" as Layer, short: t("Shared profile and KPI system", "Gemeinsames Profil und KPI-System"), moves: t("no KPI by itself: every channel reads one customer, and every KPI is counted once across channels", "keinen KPI selbst: Jeder Kanal liest einen Kunden, und jeder KPI wird einmal über alle Kanäle gezählt"), named: false, enabler: true, measured: true, data: null, cleaned: false, blackBox: false },
  chat: { layer: "people" as Layer, short: t("Hand-over standard and card", "Übergabestandard und Übergabekarte"), moves: t("the share of hand-overs that carry the history", "den Anteil der Übergaben, die die Historie mitnehmen"), named: true, enabler: true, measured: true, data: null, cleaned: false, blackBox: false },
  personal: { layer: "engine" as Layer, short: t("Chatbot on the customer profile", "Chatbot auf dem Kundenprofil"), moves: t("the share of customers who repeat their information", "den Anteil der Kunden, die ihre Angaben wiederholen"), named: true, enabler: false, measured: true, data: 81, cleaned: false, blackBox: false },
  routing: { layer: "engine" as Layer, short: t("Predictive analytics for account managers", "Predictive Analytics für Account Manager"), moves: t("the share of cancellations the weekly list named beforehand", "den Anteil der Kündigungen, die die Wochenliste vorher genannt hatte"), named: true, enabler: false, measured: true, data: 60, cleaned: true, blackBox: false },
  training: { layer: "people" as Layer, short: t("Omnichannel training", "Omnichannel-Training"), moves: t("no KPI by itself: sales and service open the profile and take over with the history", "keinen KPI selbst: Vertrieb und Service öffnen das Profil und übernehmen mit der Historie"), named: false, enabler: true, measured: false, data: null, cleaned: false, blackBox: false },
  tracking: { layer: "people" as Layer, short: t("One price list and one set of promises", "Eine Preisliste und ein Satz Zusagen"), moves: t("no KPI by itself: every channel says the same about price and promises", "keinen KPI selbst: Jeder Kanal sagt dasselbe zu Preis und Zusagen"), named: false, enabler: true, measured: false, data: null, cleaned: false, blackBox: false },
  suite: { layer: "suite" as Layer, short: t("All-in-one omnichannel AI suite", "All-in-one-Omnichannel-KI-Suite"), moves: t("no KPI it reports: its rules and results are not shown", "keinen KPI, den sie berichtet: Ihre Regeln und Ergebnisse werden nicht gezeigt"), named: false, enabler: false, measured: false, data: null, cleaned: false, blackBox: true },
  relaunch: { layer: "site" as Layer, short: t("New customer app", "Neue Kunden-App"), moves: t("no KPI it names: an app whose contact form is not connected to the other systems", "keinen KPI, den sie nennt: eine App, deren Kontaktformular nicht mit den anderen Systemen verbunden ist"), named: false, enabler: false, measured: false, data: null, cleaned: false, blackBox: false },
});

/** The AI tools that read the shared profile: the chatbot and the predictive analytics. */
export const ENGINE_IDS: ArchId[] = ["personal", "routing"];
/** The item the "After data is ready" tier waits for (hand-overs that carry the history put the data into the profile), and the one that makes everything else measurable. */
export const CLEAN_ID: ArchId = "chat";
export const KPI_SYSTEM_ID: ArchId = "foundation";

/**
 * The model plan (CLAUDE.md #47): the six items that fit the budget; the predictive analytics wait for the hand-over standard to put the history into the
 * profile; the all-in-one suite and the new app stay out (the suite is in use only in month 9, after the 6 months; the app names no KPI and is not connected).
 */
export const MODEL_TIER: Record<ArchId, Tier> = { foundation: "now", chat: "now", personal: "now", routing: "later", training: "now", tracking: "now", suite: "not", relaunch: "not" };
export const MODEL_ARCH: ArchId[] = ARCH_IDS.filter((id) => MODEL_TIER[id] !== "not");
