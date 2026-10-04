"use client";

import clsx from "clsx";
import { useId, useState } from "react";
import { Insight, Story, ThePoint, Toggles, useStory } from "@/components/materi/kit";
import { CASES_MIN, LIFT_ACT, LIFT_WATCH } from "@/data/route2";
import { bi, num, t, tt } from "@/lib/lang";
import { Gloss } from "@/lib/glossify";

/**
 * The interactive diagrams of Materi B (Route 2). Every one uses the worked-example company Isar Datentechnik (a Munich IT provider,
 * Case assumption), never OmniTech. Every control is followed by an always-visible "What this shows" (CLAUDE.md #20), every picture opens with "The point" and carries a three-step "Walk me through it" story that
 * drives the real controls (CLAUDE.md #36); a manual button leaves the story.
 */
/** "In plain words:" leads every reading of a control (CLAUDE.md #36). */
const plain = () => tt("In plain words: ", "In einfachen Worten: ");
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
  const [st, setStRaw] = useState<Stage>("dash");
  const story = useStory([
    {
      title: tt("AI on the joined data", "KI auf den verbundenen Daten"),
      say: tt(`Isar Datentechnik is an example company, not your case. A renewal-risk prediction and a chatbot read the shared profile, and every month the same KPIs decide what is rolled out.`, `Isar Datentechnik ist ein Beispielunternehmen, nicht Ihr Fall. Eine Vorhersage des Verlängerungsrisikos und ein Chatbot lesen das gemeinsame Profil, und jeden Monat entscheiden dieselben KPIs, was ausgerollt wird.`),
      look: tt("the last, tallest bar", "der letzte, höchste Balken"),
      apply: () => {
        setStRaw("forecast");
      },
    },
    {
      title: tt("Channels in isolation", "Isolierte Kanäle"),
      say: tt(`Before that, the web shop, sales, hotline and support each kept their own customer list and reported their own KPIs. A customer who switched channels started again.`, `Davor führten Webshop, Vertrieb, Hotline und Support je eine eigene Kundenliste und berichteten eigene KPIs. Ein Kunde, der den Kanal wechselte, fing von vorn an.`),
      look: tt("the first, shortest bar", "der erste, niedrigste Balken"),
      apply: () => {
        setStRaw("report");
      },
    },
    {
      title: tt("The point", "Das Wichtigste"),
      say: tt(`The jump from isolated channels to a system is one customer profile that every channel reads and writes. Try the four stages.`, `Der Sprung von isolierten Kanälen zu einem System ist ein Kundenprofil, das jeder Kanal liest und schreibt. Probieren Sie die vier Stufen.`),
      look: tt("the second bar", "der zweite Balken"),
      apply: () => {
        setStRaw("dash");
      },
    },
  ]);
  const setSt = (v: Stage) => {
    story.leave();
    setStRaw(v);
  };
  const idx = STAGES.indexOf(st);
  const s = STAGE_TEXT[st];
  return (
    <div className="space-y-3">
      <ThePoint>{tt("An integrated customer system is not a set of busy channels. It is one profile every channel reads, hand-overs that carry the history, and AI that learns from the joined data.", "Ein integriertes Kundensystem ist keine Ansammlung beschäftigter Kanäle. Es ist ein Profil, das jeder Kanal liest, Übergaben, die die Historie mitnehmen, und KI, die aus den verbundenen Daten lernt.")}</ThePoint>
      <Story steps={story.plan} step={story.step} onStep={story.go} />
      <svg viewBox="0 0 560 170" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{tt("Four stages towards an integrated customer system", "Vier Stufen zu einem integrierten Kundensystem")}</title>
        <desc id={`${uid}-d`}>{tt(`Stage shown: ${s.name}.`, `Gezeigte Stufe: ${s.name}.`)}</desc>
        {STAGES.map((k, i) => {
          const x = 10 + i * 137;
          const h = 40 + i * 25;
          const on = i <= idx;
          return (
            <g key={k} className="hit" role="button" tabIndex={0} aria-label={STAGE_TEXT[k].name} onClick={() => setSt(k)} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setSt(k)}>
              {k === st && story.step !== null && <rect x={x - 4} y={150 - h - 4} width="136" height={h + 8} rx="6" fill="none" stroke={C.amber} strokeWidth="2" strokeDasharray="5 4" className="anim-pulse" />}
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
      <Insight>{plain()}{s.reading}</Insight>
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
  const [sel, setSelRaw] = useState("voice");
  const story = useStory([
    {
      title: tt("Select now", "Jetzt auswählen"),
      say: tt(`Isar Datentechnik is an example company, not your case. Its web shop order names a KPI it should move, and ${I_SRC[0].complete}% of its data is ready: select now, and test it against a control group.`, `Isar Datentechnik ist ein Beispielunternehmen, nicht Ihr Fall. Seine Webshop-Bestellung nennt einen KPI, den sie bewegen soll, und ${I_SRC[0].complete} % ihrer Daten sind bereit: jetzt auswählen und gegen eine Kontrollgruppe testen.`),
      look: tt("the dot in the teal area", "der Punkt im türkisen Feld"),
      apply: () => {
        setSelRaw("upsell");
      },
    },
    {
      title: tt("Data first", "Erst die Daten"),
      say: tt(`Renewal talks would would move a KPI too, but only ${I_SRC[2].complete}% of its data is ready. Built on now, it would learn the gaps. Fix the data first.`, `Verlängerungsgespräche würden würde auch einen KPI bewegen, aber nur ${I_SRC[2].complete} % ihrer Daten sind bereit. Jetzt darauf gebaut, würde sie die Lücken lernen. Erst die Daten verbessern.`),
      look: tt("the dot in the amber area", "der Punkt im bernsteinfarbenen Feld"),
      apply: () => {
        setSelRaw("voice");
      },
    },
    {
      title: tt("The point", "Das Wichtigste"),
      say: tt(`The supplier invoices have has ${I_SRC[4].complete}% of its data ready, but it moves no KPI of the system. However complete, not now. Try the other items.`, `Die Lieferantenrechnungen haben hat ${I_SRC[4].complete} % seiner Daten bereit, bewegt aber keinen KPI des Systems. Egal wie vollständig: jetzt nicht. Probieren Sie die anderen Punkte.`),
      look: tt("the dot in the grey area", "der Punkt im grauen Feld"),
      apply: () => {
        setSelRaw("images");
      },
    },
  ]);
  const setSel = (v: string) => {
    story.leave();
    setSelRaw(v);
  };
  const s = I_SRC.find((x) => x.id === sel)!;
  const u = useOfI(s);
  const POS: Record<string, { cx: number; cy: number }> = { upsell: { cx: 300, cy: 58 }, winback: { cx: 300, cy: 88 }, voice: { cx: 90, cy: 72 }, sentiment: { cx: 90, cy: 138 }, images: { cx: 300, cy: 138 } };
  const pos = (x: ISrc, _i: number) => POS[x.id];
  return (
    <div className="space-y-3">
      <ThePoint>{tt("Start from the KPI, not from the tool. An item that names a KPI and has its data ready is selected now; with data not ready it waits; with no KPI it is not now, however good it sounds.", "Gehen Sie vom KPI aus, nicht vom Werkzeug. Ein Punkt, der einen KPI nennt und dessen Daten bereit sind, wird jetzt gewählt; mit nicht bereiten Daten wartet er; ohne KPI ist er jetzt nicht dran, egal wie gut er klingt.")}</ThePoint>
      <Story steps={story.plan} step={story.step} onStep={story.go} />
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
              {on && story.step !== null && <circle cx={p.cx} cy={p.cy} r="17" fill="none" stroke={C.amber} strokeWidth="2" strokeDasharray="5 4" className="anim-pulse" />}
              <circle className="hit-shape" cx={p.cx} cy={p.cy} r={on ? 11 : 8} fill={on ? C.gold : C.paper} stroke={C.ink} strokeWidth="1.6" />
              <text x={p.cx + 14} y={p.cy + 4} fontSize="11.5" fontWeight={on ? 800 : 500} fill={C.ink}>{x.name}</text>
            </g>
          );
        })}
      </svg>
      <Toggles<string> label={tt("Process", "Prozess")} value={sel} onChange={setSel} options={I_SRC.map((x) => ({ id: x.id, label: x.name }))} />
      <Insight>{plain()}
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
  const [sel, setSelRaw] = useState("views");
  const story = useStory([
    {
      title: tt("A KPI that passes", "Ein KPI, der besteht"),
      say: tt(`Isar Datentechnik is an example company, not your case. Hand-overs that carry the history are linked to value, counted daily for every customer by the systems: High on all four, 12 of 12.`, `Isar Datentechnik ist ein Beispielunternehmen, nicht Ihr Fall. Übergaben mit Historie sind mit dem Wert verbunden, werden täglich für jeden Kunden von den Systemen gezählt: Hoch auf allen vier, 12 von 12.`),
      look: tt("all four rows filled to High", "alle vier Zeilen bis Hoch gefüllt"),
      apply: () => {
        setSelRaw("upgrade");
      },
    },
    {
      title: tt("A number that does not", "Eine Zahl, die nicht besteht"),
      say: tt(`The number of channels is easy to count, but it rose while customers were more annoyed: more channels are not a better experience. The link to value stays Low, whatever the rest.`, `Die Zahl der Kanäle ist leicht zu zählen, stieg aber, während Kunden verärgerter wurden: Mehr Kanäle sind keine bessere Erfahrung. Die Verbindung zum Wert bleibt Niedrig, egal wie der Rest ist.`),
      look: tt("the first row, Link to value", "die erste Zeile, Verbindung zum Wert"),
      apply: () => {
        setSelRaw("views");
      },
    },
    {
      title: tt("The point", "Das Wichtigste"),
      say: tt(`The yearly survey score is linked to value but arrives once a year, so it is Low on early: a number for learning, not for steering. Try the other candidates.`, `Der jährliche Befragungswert ist mit dem Wert verbunden, kommt aber einmal im Jahr und ist daher bei „früh“ Niedrig: eine Zahl zum Lernen, nicht zum Steuern. Probieren Sie die anderen Kandidaten.`),
      look: tt("the second row, Early", "die zweite Zeile, Früh"),
      apply: () => {
        setSelRaw("survey");
      },
    },
  ]);
  const setSel = (v: string) => {
    story.leave();
    setSelRaw(v);
  };
  const c = I_COMPS.find((x) => x.id === sel)!;
  const total = I_CRITS.reduce((s, k) => s + c.r[k], 0);
  return (
    <div className="space-y-3">
      <ThePoint>{tt("A KPI worth steering by is linked to value, shows a change early, covers every customer and is counted by the systems. The printed facts cap each rating.", "Ein KPI, nach dem es sich zu steuern lohnt, ist mit dem Wert verbunden, zeigt früh eine Veränderung, deckt jeden Kunden ab und wird von den Systemen gezählt. Die gedruckten Fakten deckeln jede Bewertung.")}</ThePoint>
      <Story steps={story.plan} step={story.step} onStep={story.go} />
      <svg viewBox="0 0 560 170" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{tt("One KPI candidate of Isar Datentechnik on four tests", "Ein KPI-Kandidat von Isar Datentechnik nach vier Tests")}</title>
        <desc id={`${uid}-d`}>{I_CRITS.map((k) => `${I_CRIT_NAME[k]} ${c.r[k]}`).join(", ")}</desc>
        {I_CRITS.map((k, i) => {
          const y = 14 + i * 38;
          const v = c.r[k];
          return (
            <g key={k}>
              {((story.step === 1 && k === "explain") || (story.step === 2 && k === "timely")) && <rect x="-4" y={y - 3} width="556" height="32" rx="6" fill="none" stroke={C.amber} strokeWidth="2" strokeDasharray="5 4" className="anim-pulse" />}
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
      <Insight>{plain()}
        {tt(`${c.name}: ${total} of 12. ${c.note} Each rating is capped by a printed fact: “not linked to value” caps the link at Low; “after the customer has left” or “yearly” caps early at Low; “some customers” caps reach at Mid; “collected by hand” caps measured automatically at Low.`, `${c.name}: ${total} von 12. ${c.note} Jede Bewertung ist durch einen gedruckten Fakt gedeckelt: „nicht mit dem Wert verbunden“ deckelt die Verbindung bei Niedrig; „nachdem der Kunde gegangen ist“ oder „jährlich“ deckeln früh bei Niedrig; „einige Kunden“ deckelt die Reichweite bei Mittel; „von Hand gesammelt“ deckelt automatisch gemessen bei Niedrig.`)}
      </Insight>
    </div>
  );
}

/* ------------------------------------------------------------------ B4 · roll out, keep testing or stop: uplift and conversions */

export function LiftCases() {
  const uid = useId().replace(/:/g, "");
  const [lift, setLiftRaw] = useState(20);
  const [cases, setCasesRaw] = useState(40);
  const story = useStory([
    {
      title: tt("Roll out", "Ausrollen"),
      say: tt(`Isar Datentechnik is an example company, not your case. A test of a hand-over card shows +30% on 200 conversions per group: clear and proven. Roll out.`, `Isar Datentechnik ist ein Beispielunternehmen, nicht Ihr Fall. Ein Test einer Übergabekarte zeigt +30 % bei 200 Conversions pro Gruppe: klar und belegt. Ausrollen.`),
      look: tt("the dot in the teal area", "der Punkt im türkisen Feld"),
      apply: () => {
        setLiftRaw(30);
        setCasesRaw(200);
      },
    },
    {
      title: tt("Keep testing", "Weiter testen"),
      say: tt(`Another test also shows +30%, but on only 40 conversions per group, fewer than ${CASES_MIN}. Too few to trust it: keep testing.`, `Ein anderer Test zeigt auch +30 %, aber nur bei 40 Conversions pro Gruppe, weniger als ${CASES_MIN}. Zu wenig, um ihm zu trauen: weiter testen.`),
      look: tt("the dot in the left amber strip", "der Punkt im linken bernsteinfarbenen Streifen"),
      apply: () => {
        setLiftRaw(30);
        setCasesRaw(40);
      },
    },
    {
      title: tt("The point", "Das Wichtigste"),
      say: tt(`A third test shows +2% on 300 conversions. Many conversions do not rescue a tiny uplift: they prove it is tiny. Stop. Move the two sliders to try your own.`, `Ein dritter Test zeigt +2 % bei 300 Conversions. Viele Conversions retten keinen winzigen Uplift: Sie beweisen, dass er winzig ist. Stoppen. Bewegen Sie die beiden Regler, um eigene Werte zu probieren.`),
      look: tt("the dot in the grey area", "der Punkt im grauen Feld"),
      apply: () => {
        setLiftRaw(2);
        setCasesRaw(300);
      },
    },
  ]);
  const setLift = (v: number) => {
    story.leave();
    setLiftRaw(v);
  };
  const setCases = (v: number) => {
    story.leave();
    setCasesRaw(v);
  };
  const act = lift >= LIFT_ACT && cases >= CASES_MIN ? "intervene" : lift >= LIFT_WATCH ? "watch" : "none";
  const X = (c: number) => 60 + (Math.min(c, 300) / 300) * 460;
  const Y = (l: number) => 170 - ((Math.min(Math.max(l, -10), 60) + 10) / 70) * 150;
  return (
    <div className="space-y-3">
      <ThePoint>{tt("Every test ends in a decision. A clear uplift on enough conversions: roll out. A strong uplift on too few, or a small one: keep testing. No real uplift: stop.", "Jeder Test endet in einer Entscheidung. Ein klarer Uplift bei genug Conversions: ausrollen. Ein starker Uplift bei zu wenigen oder ein kleiner: weiter testen. Kein echter Uplift: stoppen.")}</ThePoint>
      <Story steps={story.plan} step={story.step} onStep={story.go} />
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
        {story.step !== null && <circle cx={X(cases)} cy={Y(lift)} r="17" fill="none" stroke={C.amber} strokeWidth="2" strokeDasharray="5 4" className="anim-pulse" />}
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
      <Insight>{plain()}
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

/* ------------------------------------------------------------------ B5 · how an architecture is built: Isar's chatbot and its base */

/**
 * The worked example of Materi B5 on the example company Isar Datentechnik (a Munich IT provider, Case assumption): a small version of the Route 2
 * panel. Two controls set the same two facts the panel reads: does the shared profile start before the chatbot, and is its data connected. The links in
 * the picture break the way the panel's do, and "What this shows" says what the break means.
 */
export function ArchExample() {
  const [measFirst, setMeasFirstRaw] = useState(true);
  const [ready, setReadyRaw] = useState(true);
  const story = useStory([
    {
      title: tt("The base first", "Die Basis zuerst"),
      say: tt("Isar Datentechnik is an example company, not your case. It builds its shared profile and KPI system first, so its chatbot reads one customer and is measured from its first week.", "Isar Datentechnik ist ein Beispielunternehmen, nicht Ihr Fall. Es baut zuerst sein gemeinsames Profil und sein KPI-System, damit sein Chatbot einen Kunden liest und ab der ersten Woche gemessen wird."),
      look: tt("the solid teal link between the chatbot and the base", "die durchgezogene teal Verbindung zwischen Chatbot und Basis"),
      apply: () => {
        setMeasFirstRaw(true);
        setReadyRaw(true);
      },
    },
    {
      title: tt("The tool before the base", "Das Werkzeug vor der Basis"),
      say: tt("Now the chatbot starts first. It has no profile to read and nothing measures it, so nobody can say whether it helps. Its link is dashed.", "Jetzt startet der Chatbot zuerst. Er hat kein Profil zum Lesen, und nichts misst ihn, also kann niemand sagen, ob er hilft. Seine Verbindung ist gestrichelt."),
      look: tt("the dashed amber link and the note on the chatbot", "die gestrichelte amberfarbene Verbindung und der Vermerk am Chatbot"),
      apply: () => {
        setMeasFirstRaw(false);
        setReadyRaw(true);
      },
    },
    {
      title: tt("The point", "Das Wichtigste"),
      say: tt("Integrated, but on data only 75% connected, the chatbot would learn the gaps. Base first, then an AI tool on connected data. Try the two buttons.", "Integriert, aber auf nur zu 75 % verbundenen Daten würde der Chatbot die Lücken lernen. Zuerst die Basis, dann ein KI-Werkzeug auf verbundenen Daten. Probieren Sie die beiden Schaltflächen."),
      look: tt("the data note under the chatbot", "den Datenvermerk unter dem Chatbot"),
      apply: () => {
        setMeasFirstRaw(true);
        setReadyRaw(false);
      },
    },
  ]);
  const setMeasFirst = (v: boolean) => {
    story.leave();
    setMeasFirstRaw(v);
  };
  const setReady = (v: boolean) => {
    story.leave();
    setReadyRaw(v);
  };
  const dataPct = ready ? 90 : 75;
  const dataOk = dataPct >= 80;
  return (
    <div className="space-y-3">
      <ThePoint>{tt("An architecture is built in order: the base first (one customer profile and the KPIs), then the data, then the AI tools. Where a link in that chain is missing, the tool above it cannot be trusted.", "Eine Architektur wird der Reihe nach gebaut: zuerst die Basis (ein Kundenprofil und die KPIs), dann die Daten, dann die KI-Werkzeuge. Wo ein Glied dieser Kette fehlt, lässt sich dem Werkzeug darüber nicht trauen.")}</ThePoint>
      <Story steps={story.plan} step={story.step} onStep={story.go} />
      <div role="group" aria-label={tt("Isar's chatbot and its base", "Der Chatbot von Isar und seine Basis")} className="mx-auto max-w-xl">
        <div className="rounded-lg border border-dashed border-line bg-canvas px-3 py-1.5 text-center text-caption text-ash">{tt("What customers meet: the support chat", "Was Kunden erleben: der Support-Chat")}</div>
        <div className="my-1 flex h-7 items-center justify-center" aria-hidden />
        <div className={clsx("rounded-lg border p-2 text-caption leading-snug", "border-signal bg-signalSoft")}>
          <p className="font-semibold text-ink">{tt("Chatbot connected to the customer profile", "Chatbot mit Anbindung an das Kundenprofil")}</p>
          <p className="text-ash">{tt(measFirst ? "Starts in month 1" : "Starts in month 1, before the base", measFirst ? "Startet in Monat 1" : "Startet in Monat 1, vor der Basis")}</p>
          {!measFirst && <p className="text-accent">{tt("no profile to read and nothing measures it yet", "noch kein Profil zum Lesen, und nichts misst es")}</p>}
          {!dataOk && <p className="text-accent">{tt(`its data is ${dataPct}% connected, below 80%, when it starts`, `seine Daten sind zu ${dataPct} % verbunden, unter 80 %, wenn es startet`)}</p>}
        </div>
        <div className={clsx("flex h-7 items-center justify-center gap-2 text-micro normal-case tracking-normal", measFirst ? "text-ash" : "text-accent")}>
          <span aria-hidden className={clsx("block h-full w-0 border-l-[3px]", measFirst ? "border-solid border-signal" : "border-dashed border-gold")} />
          <span>{measFirst ? tt("reads the profile", "liest das Profil") : tt("no profile to read", "kein Profil zum Lesen")}</span>
        </div>
        <div className={clsx("rounded-lg border p-2 text-caption leading-snug", measFirst ? "border-signal bg-signalSoft" : "border-signal bg-signalSoft")}>
          <p className="font-semibold text-ink">{tt("Shared profile and KPI system", "Gemeinsames Profil und KPI-System")}</p>
          <p className="text-ash">{measFirst ? tt("Starts in month 1", "Startet in Monat 1") : tt("Starts in month 3, after the chatbot", "Startet in Monat 3, nach dem Chatbot")}</p>
        </div>
        <div className="flex h-7 items-center justify-center gap-2 text-micro normal-case tracking-normal text-ash">
          <span aria-hidden className="block h-full w-0 border-l-[3px] border-solid border-signal" />
          <span>{tt("raw data from every system flows up", "Rohdaten aus jedem System fließen nach oben")}</span>
        </div>
        <div className="rounded-lg border border-dashed border-line bg-canvas px-3 py-1.5 text-center text-caption text-ash">{tt(`Where the data lives: CRM, shop and ticket system, ${dataPct}% of what the chatbot reads is connected`, `Wo die Daten liegen: CRM, Shop und Ticketsystem, ${dataPct} % dessen, was der Chatbot liest, sind verbunden`)}</div>
      </div>
      <div className="space-y-1.5">
        <p className="smallcaps">{tt("Two things to change", "Zwei Dinge zum Ändern")}</p>
        <Toggles<string> label={tt("The shared profile starts", "Das gemeinsame Profil startet")} value={measFirst ? "first" : "after"} onChange={(v) => setMeasFirst(v === "first")} options={[{ id: "first", label: tt("Before the chatbot", "Vor dem Chatbot") }, { id: "after", label: tt("After the chatbot", "Nach dem Chatbot") }]} />
        <Toggles<string> label={tt("Data behind the chatbot", "Daten hinter dem Chatbot")} value={ready ? "ready" : "weak"} onChange={(v) => setReady(v === "ready")} options={[{ id: "ready", label: tt("90% connected", "90 % verbunden") }, { id: "weak", label: tt("75% connected", "75 % verbunden") }]} />
      </div>
      <Insight>{plain()}
        {measFirst && dataOk
          ? tt("The base exists before the tool and the tool runs on data that is connected. Isar can say whether the chatbot helps, and its data does not teach it gaps. This is what a plan that holds looks like.", "Die Basis steht vor dem Werkzeug, und das Werkzeug läuft auf verbundenen Daten. Isar kann sagen, ob der Chatbot hilft, und seine Daten lehren ihn keine Lücken. So sieht ein Plan aus, der hält.")
          : !measFirst
            ? tt("The chatbot starts before the profile it reads exists. Its link to the base is dashed: Isar would pay for a tool and never know whether it works. The fix is the order: the shared profile and KPI system first.", "Der Chatbot startet, bevor das Profil existiert, das er liest. Seine Verbindung zur Basis ist gestrichelt: Isar würde für ein Werkzeug zahlen und nie wissen, ob es wirkt. Die Lösung ist die Reihenfolge: zuerst gemeinsames Profil und KPI-System.")
            : tt("It reads the profile, but its data is only 75% connected, below the 80% an AI tool should start on. It would learn the gaps. The fix is to connect the data first, or to hold the tool back until it is ready.", "Er liest das Profil, aber seine Daten sind nur zu 75 % verbunden, unter den 80 %, auf denen ein KI-Werkzeug starten sollte. Er würde die Lücken lernen. Die Lösung ist, zuerst die Daten zu verbinden oder das Werkzeug zurückzuhalten, bis sie bereit sind.")}
      </Insight>
    </div>
  );
}
