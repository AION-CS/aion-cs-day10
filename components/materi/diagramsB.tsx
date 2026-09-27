"use client";

import { useId, useState } from "react";
import { Insight, Toggles } from "@/components/materi/kit";
import { CASES_MIN, LIFT_ACT, LIFT_WATCH } from "@/data/route2";
import { bi, num, t, tt } from "@/lib/lang";
import { Gloss } from "@/lib/glossify";

/**
 * The interactive diagrams of Materi B (Route 2). Every one uses the worked-example company Isar Datentechnik (a Munich IT provider,
 * Case assumption), never OmniTech. Every control is followed by an always-visible "What this shows" (CLAUDE.md #20).
 */
const C = { ink: "#1F2328", ash: "#59606A", paper: "#FFFEFA", mist: "#ECE6D6", line: "#D8D1BF", amber: "#8A5A0B", gold: "#D99A2B", teal: "#0F6B6B", tealSoft: "#DFEEEB", data: "#2F5D62", grey: "#8B9098", soft: "#FBF0D6", rust: "#A4472A" };

/* ------------------------------------------------------------------ B1 · four stages towards an AI-based control system */

type Stage = "report" | "dash" | "rules" | "forecast";
const STAGES: Stage[] = ["report", "dash", "rules", "forecast"];
const STAGE_TEXT = bi({
  report: { name: t("Channels in isolation", "Isolierte Kanäle"), spree: t("Web shop, sales, hotline and support each keep their own customer list and report their own KPIs.", "Webshop, Vertrieb, Hotline und Support führen je eine eigene Kundenliste und berichten eigene KPIs."), reading: t("A customer who switches channels starts again each time, and every channel reports that it is doing well.", "Ein Kunde, der den Kanal wechselt, fängt jedes Mal neu an, und jeder Kanal berichtet, dass es ihm gut geht.") },
  dash: { name: t("One customer profile", "Ein Kundenprofil"), spree: t("Every channel reads and writes one profile: contracts, orders, tickets and contacts in one place.", "Jeder Kanal liest und schreibt ein Profil: Verträge, Bestellungen, Tickets und Kontakte an einem Ort."), reading: t("Every channel now knows the customer; the switches between channels are still left to chance.", "Jeder Kanal kennt jetzt den Kunden; die Wechsel zwischen den Kanälen bleiben noch dem Zufall überlassen.") },
  rules: { name: t("Hand-over standards", "Übergabestandards"), spree: t("“Web form → sales: a named person within four hours, with the form attached. Sales → support: the contract travels with a welcome call.”", "„Webformular → Vertrieb: eine benannte Person innerhalb von vier Stunden, mit angehängtem Formular. Vertrieb → Support: Der Vertrag reist mit einem Begrüßungsanruf mit.“"), reading: t("The transitions are designed, not left to chance. This is where multichannel becomes omnichannel.", "Die Übergänge sind gestaltet, nicht dem Zufall überlassen. Hier wird aus Multichannel Omnichannel.") },
  forecast: { name: t("AI on the joined data", "KI auf den verbundenen Daten"), spree: t("A renewal-risk prediction and a chatbot read the shared profile; every month the same KPIs decide what is rolled out.", "Eine Vorhersage des Verlängerungsrisikos und ein Chatbot lesen das gemeinsame Profil; jeden Monat entscheiden dieselben KPIs, was ausgerollt wird."), reading: t("AI now builds on data from every channel, and the system improves month by month.", "KI baut jetzt auf Daten aus jedem Kanal auf, und das System verbessert sich Monat für Monat.") },
});

export function DataStages() {
  const uid = useId().replace(/:/g, "");
  const [st, setSt] = useState<Stage>("dash");
  const idx = STAGES.indexOf(st);
  const s = STAGE_TEXT[st];
  return (
    <div className="space-y-3">
      <svg viewBox="0 0 560 170" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{tt("Four stages towards an integrated customer system", "Vier Stufen zu einem integrierten Kundensystem")}</title>
        <desc id={`${uid}-d`}>{tt(`Stage shown: ${s.name}.`, `Gezeigte Stufe: ${s.name}.`)}</desc>
        {STAGES.map((k, i) => {
          const x = 10 + i * 137;
          const h = 40 + i * 25;
          const on = i <= idx;
          return (
            <g key={k} className="hit" role="button" tabIndex={0} aria-label={STAGE_TEXT[k].name} onClick={() => setSt(k)} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setSt(k)}>
              <rect className="hit-shape" x={x} y={150 - h} width="128" height={h} fill={k === st ? C.gold : on ? C.data : C.paper} stroke={C.ink} strokeWidth="1.4" />
              <text x={x + 64} y={166} textAnchor="middle" fontSize="11" fill={C.ash}>{`${i + 1}`}</text>
            </g>
          );
        })}
        <text x="10" y="18" fontSize="11.5" fill={C.ash}>{tt("from channels in isolation → to one profile → to hand-over standards → to AI on joined data", "von isolierten Kanälen → zu einem Profil → zu Übergabestandards → zu KI auf verbundenen Daten")}</text>
      </svg>
      <Toggles<Stage> label={tt("Stage", "Stufe")} value={st} onChange={setSt} options={STAGES.map((k, i) => ({ id: k, label: `${i + 1} · ${STAGE_TEXT[k].name}` }))} />
      <p className="rounded-md border border-line bg-paper px-3 py-2 text-caption text-ink">
        <span className="smallcaps mr-1.5">Isar Datentechnik</span>
        {s.spree}
      </p>
      <Insight>{s.reading}</Insight>
    </div>
  );
}

/* ------------------------------------------------------------------ B2 · the KPI first, then the tool */

type ISrc = { id: string; name: string; decision: boolean; complete: number };
const I_SRC: ISrc[] = bi([
  { id: "upsell", name: t("Web shop order", "Bestellung im Webshop"), decision: true, complete: 91 },
  { id: "winback", name: t("Service request", "Serviceanfrage"), decision: true, complete: 86 },
  { id: "voice", name: t("Renewal talks", "Verlängerungsgespräche"), decision: true, complete: 50 },
  { id: "sentiment", name: t("Events newsletter", "Veranstaltungs-Newsletter"), decision: false, complete: 75 },
  { id: "images", name: t("Supplier invoices", "Lieferantenrechnungen"), decision: false, complete: 98 },
]);
const useOfI = (s: ISrc) => (!s.decision ? "leave" : s.complete >= 80 ? "core" : "later");
export function SourceGrid() {
  const uid = useId().replace(/:/g, "");
  const [sel, setSel] = useState("voice");
  const s = I_SRC.find((x) => x.id === sel)!;
  const u = useOfI(s);
  const POS: Record<string, { cx: number; cy: number }> = { upsell: { cx: 300, cy: 58 }, winback: { cx: 300, cy: 88 }, voice: { cx: 90, cy: 72 }, sentiment: { cx: 90, cy: 138 }, images: { cx: 300, cy: 138 } };
  const pos = (x: ISrc, _i: number) => POS[x.id];
  return (
    <div className="space-y-3">
      <svg viewBox="0 0 560 210" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{tt("Isar Datentechnik's processes by customer decision and connected data", "Prozesse von Isar Datentechnik nach Kundenentscheidung und verbundenen Daten")}</title>
        <desc id={`${uid}-d`}>{I_SRC.map((x) => `${x.name}: ${useOfI(x)}`).join(", ")}</desc>
        <rect x="60" y="20" width="220" height="90" fill={C.soft} stroke={C.line} />
        <rect x="280" y="20" width="240" height="90" fill={C.tealSoft} stroke={C.line} />
        <rect x="60" y="110" width="460" height="80" fill={C.mist} stroke={C.line} />
        <text x="170" y="36" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={C.amber}>{tt("Central: connect the data first", "Zentral: zuerst die Daten verbinden")}</text>
        <text x="400" y="36" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={C.teal}>{tt("Central: integrate now", "Zentral: jetzt integrieren")}</text>
        <text x="290" y="182" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={C.ash}>{tt("Not central: no customer decision", "Nicht zentral: keine Kundenentscheidung")}</text>
        <text x="30" y="70" textAnchor="middle" fontSize="11" fill={C.ash} transform="rotate(-90 30 70)">{tt("customer decides", "Kunde entscheidet")}</text>
        <text x="170" y="206" textAnchor="middle" fontSize="11" fill={C.ash}>{tt("< 80% connected", "< 80 % verbunden")}</text>
        <text x="400" y="206" textAnchor="middle" fontSize="11" fill={C.ash}>{tt("≥ 80% connected", "≥ 80 % verbunden")}</text>
        {I_SRC.map((x, i) => {
          const p = pos(x, i);
          const on = x.id === sel;
          return (
            <g key={x.id} className="hit" role="button" tabIndex={0} aria-label={x.name} onClick={() => setSel(x.id)} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setSel(x.id)}>
              <circle className="hit-shape" cx={p.cx} cy={p.cy} r={on ? 11 : 8} fill={on ? C.gold : C.paper} stroke={C.ink} strokeWidth="1.6" />
              <text x={p.cx + 14} y={p.cy + 4} fontSize="11.5" fontWeight={on ? 800 : 500} fill={C.ink}>{x.name}</text>
            </g>
          );
        })}
      </svg>
      <Toggles<string> label={tt("Process", "Prozess")} value={sel} onChange={setSel} options={I_SRC.map((x) => ({ id: x.id, label: x.name }))} />
      <Insight>
        {u === "core"
          ? tt(`${s.name}: the customer decides something in it and ${s.complete}% of its data reaches the shared profile. Central: integrate it now, with a hand-over standard.`, `${s.name}: Der Kunde entscheidet darin etwas, und ${s.complete} % seiner Daten erreichen das gemeinsame Profil. Zentral: jetzt integrieren, mit einem Übergabestandard.`)
          : u === "later"
            ? tt(`${s.name}: the customer decides something in it, but only ${s.complete}% of its data reaches the profile. Integrating the process now would build on gaps. Connect the data first.`, `${s.name}: Der Kunde entscheidet darin etwas, aber nur ${s.complete} % seiner Daten erreichen das Profil. Den Prozess jetzt zu integrieren hieße, auf Lücken zu bauen. Zuerst die Daten verbinden.`)
            : tt(`${s.name}: ${s.complete}% connected, but no buying or renewal decision happens in it. Not central, however well connected.`, `${s.name}: ${s.complete} % verbunden, aber darin fällt keine Kauf- oder Verlängerungsentscheidung. Nicht zentral, egal wie gut verbunden.`)}
      </Insight>
    </div>
  );
}

/* ------------------------------------------------------------------ B3 · four tests for a management KPI */

type ICrit = "explain" | "timely" | "reach" | "scale";
const I_CRITS: ICrit[] = ["explain", "timely", "reach", "scale"];
const I_CRIT_NAME = bi({ explain: t("Link to value", "Verbindung zum Wert"), timely: t("Early", "Früh"), reach: t("Reach", "Reichweite"), scale: t("Measured automatically", "Automatisch gemessen") });
const I_COMPS = bi([
  { id: "upgrade", name: t("Hand-overs that carry the history", "Übergaben mit Historie"), facts: t("linked to value · daily · every customer · counted by the systems", "mit dem Wert verbunden · täglich · jeder Kunde · von den Systemen gezählt"), r: { explain: 3, timely: 3, reach: 3, scale: 3 }, note: t("High on all four: it is linked to deals, it moves as soon as a transition is connected, it covers every customer and nobody has to collect it.", "Hoch auf allen vier: Es ist mit Abschlüssen verbunden, bewegt sich, sobald ein Übergang verbunden ist, deckt jeden Kunden ab, und niemand muss es sammeln.") },
  { id: "survey", name: t("Yearly customer survey", "Jährliche Kundenbefragung"), facts: t("linked to value · yearly · those who answer · by a survey", "mit dem Wert verbunden · jährlich · wer antwortet · über eine Befragung"), r: { explain: 3, timely: 1, reach: 2, scale: 2 }, note: t("Linked to loyalty, but once a year is too late to steer a six-month plan.", "Mit Loyalität verbunden, aber einmal im Jahr ist zu spät, um einen Sechsmonatsplan zu steuern.") },
  { id: "views", name: t("Number of channels", "Zahl der Kanäle"), facts: t("not linked to value · daily · every customer · counted by the systems", "nicht mit dem Wert verbunden · täglich · jeder Kunde · von den Systemen gezählt"), r: { explain: 1, timely: 3, reach: 3, scale: 3 }, note: t("Easy to count, and it rose from four to six while complaints rose: channels are not integration.", "Leicht zu zählen, und sie stieg von vier auf sechs, während die Beschwerden stiegen: Kanäle sind keine Integration.") },
  { id: "wins", name: t("Channel managers' monthly highlights", "Monatliche Highlights der Kanalverantwortlichen"), facts: t("not linked to value · monthly · cases someone picks · collected by hand", "nicht mit dem Wert verbunden · monatlich · von jemandem ausgewählte Fälle · von Hand gesammelt"), r: { explain: 1, timely: 2, reach: 2, scale: 1 }, note: t("Each channel reports on itself, chosen by the teller, so the breaks between channels never appear.", "Jeder Kanal berichtet über sich, ausgewählt vom Erzähler, also tauchen die Brüche zwischen Kanälen nie auf.") },
]);
export function CompProfile() {
  const uid = useId().replace(/:/g, "");
  const [sel, setSel] = useState("views");
  const c = I_COMPS.find((x) => x.id === sel)!;
  const total = I_CRITS.reduce((s, k) => s + c.r[k], 0);
  return (
    <div className="space-y-3">
      <svg viewBox="0 0 560 170" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{tt("One KPI candidate of Isar Datentechnik on four tests", "Ein KPI-Kandidat von Isar Datentechnik nach vier Tests")}</title>
        <desc id={`${uid}-d`}>{I_CRITS.map((k) => `${I_CRIT_NAME[k]} ${c.r[k]}`).join(", ")}</desc>
        {I_CRITS.map((k, i) => {
          const y = 14 + i * 38;
          const v = c.r[k];
          return (
            <g key={k}>
              <text x="0" y={y + 18} fontSize="12" fill={C.ink}>{I_CRIT_NAME[k]}</text>
              {[1, 2, 3].map((b) => (
                <rect key={b} x={160 + (b - 1) * 110} y={y} width="104" height="26" fill={b <= v ? (v === 1 ? C.grey : C.data) : C.paper} stroke={C.ink} strokeDasharray={b <= v ? undefined : "4 3"} />
              ))}
              <text x="500" y={y + 18} fontSize="12.5" fontWeight="700" fill={C.ink}>{["", tt("Low", "Niedrig"), tt("Mid", "Mittel"), tt("High", "Hoch")][v]}</text>
            </g>
          );
        })}
      </svg>
      <Toggles<string> label={tt("KPI candidate", "KPI-Kandidat")} value={sel} onChange={setSel} options={I_COMPS.map((x) => ({ id: x.id, label: x.name }))} />
      <p className="text-caption text-ash">
        <span className="font-semibold text-ink">{tt("Printed facts: ", "Gedruckte Fakten: ")}</span>
        {c.facts}
      </p>
      <Insight>
        {tt(`${c.name}: ${total} of 12. ${c.note} Each rating is capped by a printed fact: “not linked to value” caps the link at Low; “after the customer has left” or “yearly” caps early at Low; “some customers” caps reach at Mid; “collected by hand” caps measured automatically at Low.`, `${c.name}: ${total} von 12. ${c.note} Jede Bewertung ist durch einen gedruckten Fakt gedeckelt: „nicht mit dem Wert verbunden“ deckelt die Verbindung bei Niedrig; „nachdem der Kunde gegangen ist“ oder „jährlich“ deckeln früh bei Niedrig; „einige Kunden“ deckelt die Reichweite bei Mittel; „von Hand gesammelt“ deckelt automatisch gemessen bei Niedrig.`)}
      </Insight>
    </div>
  );
}

/* ------------------------------------------------------------------ B4 · roll out, keep testing or stop: uplift and conversions */

export function LiftCases() {
  const uid = useId().replace(/:/g, "");
  const [lift, setLift] = useState(20);
  const [cases, setCases] = useState(40);
  const act = lift >= LIFT_ACT && cases >= CASES_MIN ? "intervene" : lift >= LIFT_WATCH ? "watch" : "none";
  const X = (c: number) => 60 + (Math.min(c, 300) / 300) * 460;
  const Y = (l: number) => 170 - ((Math.min(Math.max(l, -10), 60) + 10) / 70) * 150;
  return (
    <div className="space-y-3">
      <svg viewBox="0 0 560 200" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{tt("Roll out, keep testing or stop, by uplift and conversions per group", "Ausrollen, weiter testen oder stoppen, nach Uplift und Conversions pro Gruppe")}</title>
        <desc id={`${uid}-d`}>{tt(`Uplift ${lift}%, ${cases} conversions: ${act}.`, `Uplift ${lift} %, ${cases} Conversions: ${act}.`)}</desc>
        <rect x={X(CASES_MIN)} y={Y(60)} width={X(300) - X(CASES_MIN)} height={Y(LIFT_ACT) - Y(60)} fill={C.tealSoft} />
        <rect x={X(0)} y={Y(60)} width={X(CASES_MIN) - X(0)} height={Y(LIFT_ACT) - Y(60)} fill={C.soft} />
        <rect x={X(0)} y={Y(LIFT_ACT)} width={X(300) - X(0)} height={Y(LIFT_WATCH) - Y(LIFT_ACT)} fill={C.soft} />
        <rect x={X(0)} y={Y(LIFT_WATCH)} width={X(300) - X(0)} height={Y(-10) - Y(LIFT_WATCH)} fill={C.mist} />
        <text x={X(200)} y={Y(45)} textAnchor="middle" fontSize="12" fontWeight="700" fill={C.teal}>{tt("roll out", "ausrollen")}</text>
        <text x={X(50)} y={Y(45)} textAnchor="middle" fontSize="11" fontWeight="700" fill={C.amber}>{tt("keep testing", "weiter testen")}</text>
        <text x={X(200)} y={Y(6)} textAnchor="middle" fontSize="11" fontWeight="700" fill={C.amber}>{tt("keep testing", "weiter testen")}</text>
        <text x={X(200)} y={Y(-4)} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={C.ash}>{tt("stop", "stoppen")}</text>
        <line x1={X(0)} y1={Y(0)} x2={X(300)} y2={Y(0)} stroke={C.rust} strokeDasharray="4 3" />
        <line x1={X(0)} y1={Y(-10)} x2={X(0)} y2={Y(60)} stroke={C.ash} />
        <text x={X(150)} y="196" textAnchor="middle" fontSize="11" fill={C.ash}>{tt("conversions in the smaller group →", "Conversions in der kleineren Gruppe →")}</text>
        <text x="16" y={Y(25)} textAnchor="middle" fontSize="11" fill={C.ash} transform={`rotate(-90 16 ${Y(25)})`}>{tt("uplift % →", "Uplift % →")}</text>
        <circle cx={X(cases)} cy={Y(lift)} r="9" fill={C.gold} stroke={C.ink} strokeWidth="2" />
      </svg>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-lift`} className="smallcaps block">{tt(`Uplift over the control group: ${lift > 0 ? "+" : ""}${lift}%`, `Uplift gegenüber der Kontrollgruppe: ${lift > 0 ? "+" : ""}${lift} %`)}</label>
          <input id={`${uid}-lift`} type="range" min={-10} max={60} step={1} value={lift} onChange={(e) => setLift(Number(e.target.value))} className="w-full accent-[#8A5A0B]" />
        </div>
        <div>
          <label htmlFor={`${uid}-cases`} className="smallcaps block">{tt(`Conversions per group: ${cases}`, `Conversions pro Gruppe: ${cases}`)}</label>
          <input id={`${uid}-cases`} type="range" min={10} max={300} step={10} value={cases} onChange={(e) => setCases(Number(e.target.value))} className="w-full accent-[#8A5A0B]" />
        </div>
      </div>
      <Insight>
        {act === "intervene"
          ? tt(`An uplift of ${lift}% on ${cases} conversions per group: clear and proven. Roll out, and hand it to the team that owns the channel.`, `Ein Uplift von ${lift} % bei ${cases} Conversions pro Gruppe: klar und belegt. Ausrollen, und dem Team übergeben, dem der Kanal gehört.`)
          : act === "watch"
            ? lift >= LIFT_ACT
              ? tt(`An uplift of ${lift}% looks strong, but ${cases} conversions are too few to trust it (fewer than ${CASES_MIN}). Keep testing; the data team runs it until the size is reached.`, `Ein Uplift von ${lift} % sieht stark aus, aber ${cases} Conversions sind zu wenig, um ihm zu trauen (weniger als ${CASES_MIN}). Weiter testen; das Datenteam lässt ihn laufen, bis die Größe erreicht ist.`)
              : tt(`An uplift of ${lift}%: a small difference. Not worth a rollout yet; keep testing a stronger variant.`, `Ein Uplift von ${lift} %: ein kleiner Unterschied. Noch keinen Rollout wert; eine stärkere Variante weiter testen.`)
            : tt(`An uplift of ${lift}%: the variant does about as well as the control, or worse. Stop; running it on costs money and attention for nothing.`, `Ein Uplift von ${lift} %: Die Variante schneidet etwa so gut ab wie die Kontrolle, oder schlechter. Stoppen; sie weiterlaufen zu lassen kostet Geld und Aufmerksamkeit für nichts.`)}
      </Insight>
    </div>
  );
}

/* ------------------------------------------------------------------ B5 · Isar's roadmap over six months */

const I_ARCH = bi([
  { id: "base", name: t("Shared customer profile", "Gemeinsames Kundenprofil"), start: 1, owner: t("Head of Data", "Leitung Data"), trigger: t("If fewer than 80% of orders and tickets reach the profile by month 3, the renewal prediction waits.", "Erreichen bis Monat 3 weniger als 80 % der Bestellungen und Tickets das Profil, wartet die Verlängerungsvorhersage."), why: t("Starts first: every other item reads from it and is measured by it.", "Startet zuerst: Jeder andere Punkt liest daraus und wird daran gemessen.") },
  { id: "score", name: t("Hand-over standard web form → sales", "Übergabestandard Webformular → Vertrieb"), start: 1, owner: t("Head of Sales", "Vertriebsleitung"), trigger: t("If more than 20% of customers still repeat their data at the first call in month 2, the card is rewritten with the sales team.", "Wiederholen in Monat 2 noch mehr als 20 % der Kunden beim ersten Anruf ihre Angaben, wird die Karte mit dem Vertriebsteam überarbeitet."), why: t("Starts in the same month: it needs only the CRM and fixes the most critical transition at once.", "Startet im selben Monat: Er braucht nur das CRM und behebt den kritischsten Übergang sofort.") },
  { id: "calls", name: t("Renewal-risk prediction", "Vorhersage des Verlängerungsrisikos"), start: 4, owner: t("Head of Data", "Leitung Data"), trigger: t("If the prediction does not match at least 60% of actual cancellations by month 6, the model is retrained before account managers plan by it.", "Trifft die Vorhersage bis Monat 6 nicht mindestens 60 % der tatsächlichen Kündigungen, wird das Modell neu trainiert, bevor Account Manager danach planen."), why: t("Starts once the profile holds three months of joined data.", "Startet, sobald das Profil drei Monate verbundene Daten enthält.") },
]);
export function ArchExample() {
  const uid = useId().replace(/:/g, "");
  const [sel, setSel] = useState("base");
  const r = I_ARCH.find((x) => x.id === sel)!;
  const X = (m: number) => 250 + (m - 1) * 51;
  return (
    <div className="space-y-3">
      <svg viewBox="0 0 560 170" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{tt("Isar's three funded items by start month", "Die drei finanzierten Punkte von Isar nach Startmonat")}</title>
        <desc id={`${uid}-d`}>{I_ARCH.map((a) => `${a.name}: ${a.start}`).join(". ")}</desc>
        {[1, 2, 3, 4, 5, 6].map((m) => (
          <text key={m} x={X(m) + 25} y="14" textAnchor="middle" fontSize="11.5" fill={C.ash}>{`M${m}`}</text>
        ))}
        {I_ARCH.map((a, i) => {
          const y = 24 + i * 44;
          const on = a.id === sel;
          return (
            <g key={a.id} className="hit" role="button" tabIndex={0} aria-label={a.name} onClick={() => setSel(a.id)} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setSel(a.id)}>
              <text x="4" y={y + 22} fontSize="12" fontWeight={on ? 800 : 600} fill={C.ink}>{a.name.length > 36 ? `${a.name.slice(0, 35)}…` : a.name}</text>
              {[1, 2, 3, 4, 5, 6].map((m) => (
                <rect key={m} className={m === a.start ? "hit-shape" : undefined} x={X(m) + 2} y={y + 6} width="47" height="24" rx="3" fill={m === a.start ? C.data : m > a.start ? C.tealSoft : C.paper} stroke={on && m === a.start ? C.amber : C.line} strokeWidth={on && m === a.start ? 2.5 : 1} />
              ))}
            </g>
          );
        })}
      </svg>
      <div className="space-y-1.5">
        <p className="smallcaps">{tt("Read one item", "Einen Punkt lesen")}</p>
        <Toggles<string> label={tt("Item", "Punkt")} value={sel} onChange={setSel} options={I_ARCH.map((a) => ({ id: a.id, label: a.name }))} />
      </div>
      <div className="rounded-lg border border-line bg-paper p-3.5 text-caption" aria-live="polite">
        <p className="smallcaps">{r.name}</p>
        <p className="mt-1">
          <span className="font-semibold text-ink">Owner. </span>
          {r.owner}
        </p>
        <p className="mt-1">
          <span className="font-semibold text-ink">Trigger. </span>
          <Gloss>{r.trigger}</Gloss>
        </p>
        <p className="mt-1 text-ash">{r.why}</p>
      </div>
      <Insight>
        {tt("The shared profile starts first, together with the hand-over standard on the most critical transition, because every other item reads from the profile and the hand-over needs only the CRM. The prediction waits for three months of joined data. Each item has one owner who can change it alone and a trigger with a number, a date and an action. Isar left out an all-in-one suite on purpose: it would have been in use only after thirty weeks, and nobody at Isar could have explained its decisions.", "Das gemeinsame Profil startet zuerst, zusammen mit dem Übergabestandard am kritischsten Übergang, weil jeder andere Punkt aus dem Profil liest und die Übergabe nur das CRM braucht. Die Vorhersage wartet auf drei Monate verbundener Daten. Jeder Punkt hat einen Owner, der ihn allein ändern kann, und einen Trigger mit Zahl, Datum und Aktion. Isar hat eine All-in-one-Suite bewusst weggelassen: Sie wäre erst nach dreißig Wochen in Betrieb gewesen, und niemand bei Isar hätte ihre Entscheidungen erklären können.")}
      </Insight>
    </div>
  );
}
