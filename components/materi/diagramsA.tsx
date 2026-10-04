"use client";

import { useId, useState } from "react";
import { Insight, Story, ThePoint, Toggles, useStory } from "@/components/materi/kit";
import { LEVEL_LABEL } from "@/data/ladder";
import type { LevelTag } from "@/data/ladder";
import { MOSEL, MOSEL_RESULT, extraOf } from "@/data/forecast";
import { PATTERNS } from "@/data/patterns";
import type { PatternId } from "@/data/patterns";
import { JOINS_LABEL, bandOf, explainBucket } from "@/data/measures";
import type { Joins } from "@/data/measures";
import { bi, euro, num, pct, t, tt } from "@/lib/lang";

/**
 * The interactive diagrams of Materi A (Route 1). Every one uses the worked-example company Weser Systemhaus (a Bremen IT reseller,
 * Case assumption), never OmniTech, so the answer to a task block is never printed. Every control is followed by an always-visible
 * "What this shows" (CLAUDE.md #20). (Export names are kept from the file this was built from.)
 */
/** "In plain words:" leads every reading of a control (CLAUDE.md #36). */
const plain = () => tt("In plain words: ", "In einfachen Worten: ");
const C = { ink: "#1F2328", ash: "#59606A", paper: "#FFFEFA", mist: "#ECE6D6", line: "#D8D1BF", amber: "#8A5A0B", gold: "#D99A2B", teal: "#0F6B6B", tealSoft: "#DFEEEB", rust: "#A4472A", rustSoft: "#F6E3DB", data: "#2F5D62", grey: "#8B9098", soft: "#FBF0D6" };

/* ------------------------------------------------------------------ A1 · single channel, multichannel, omnichannel */

type Stage = "single" | "multi" | "omni";
const STAGES: Stage[] = ["single", "multi", "omni"];
const STAGE = bi({
  single: { label: t("Single channel", "Ein Kanal"), repeat: null as number | null, reading: t("Weser sells only through its website. There are no transitions, so nothing can break between channels, but customers who want to talk to a person or get help after buying have nowhere to go.", "Weser verkauft nur über seine Website. Es gibt keine Übergänge, also kann zwischen Kanälen nichts brechen, aber Kunden, die mit einem Menschen sprechen oder nach dem Kauf Hilfe wollen, haben keinen Ort dafür.") },
  multi: { label: t("Multichannel", "Multichannel"), repeat: 60 as number | null, reading: t("Weser adds a shop, sales and support, each with its own data and its own team. Every channel works, but at each switch the customer starts again: 60% of customers who switch channels repeat their information. More channels made the experience worse, not better.", "Weser ergänzt Shop, Vertrieb und Support, jeder mit eigenen Daten und eigenem Team. Jeder Kanal funktioniert, aber bei jedem Wechsel fängt der Kunde von vorn an: 60 % der Kunden, die den Kanal wechseln, wiederholen ihre Angaben. Mehr Kanäle haben das Erlebnis verschlechtert, nicht verbessert.") },
  omni: { label: t("Omnichannel", "Omnichannel"), repeat: 12 as number | null, reading: t("The same four channels, now reading and writing one shared customer profile. The journey runs through without a restart: only 12% still repeat their information. Omnichannel is not more channels; it is the same channels, integrated around the customer.", "Dieselben vier Kanäle, die jetzt ein gemeinsames Kundenprofil lesen und schreiben. Die Journey läuft ohne Neustart durch: Nur noch 12 % wiederholen ihre Angaben. Omnichannel heißt nicht mehr Kanäle; es sind dieselben Kanäle, um den Kunden integriert.") },
});
const CHANNELS = bi([t("Website", "Website"), t("Shop", "Shop"), t("Sales", "Vertrieb"), t("Support", "Support")]);

export function DelayCost() {
  const uid = useId().replace(/:/g, "");
  const [st, setStRaw] = useState<Stage>("multi");
  const story = useStory([
    {
      title: tt("Channels that pass the baton", "Kanäle, die den Staffelstab weitergeben"),
      say: tt(`Weser Systemhaus is an example company, not your case. Omnichannel is like a relay team: the same four channels share one customer profile, so only ${STAGE.omni.repeat}% of customers who switch channel still repeat their information.`, `Weser Systemhaus ist ein Beispielunternehmen, nicht Ihr Fall. Omnichannel ist wie eine Staffel: Dieselben vier Kanäle teilen ein Kundenprofil, sodass nur ${STAGE.omni.repeat} % der Kunden, die den Kanal wechseln, ihre Angaben noch wiederholen.`),
      look: tt("the teal lines down from every channel", "die teal Linien von jedem Kanal nach unten"),
      apply: () => {
        setStRaw("omni");
      },
    },
    {
      title: tt("Channels that run their own race", "Kanäle, die ihr eigenes Rennen laufen"),
      say: tt(`Multichannel is four runners, each with its own data and nothing handed over: ${STAGE.multi.repeat}% of customers who switch channel repeat their information. More channels made it worse, not better.`, `Multichannel sind vier Läufer, jeder mit eigenen Daten und ohne Übergabe: ${STAGE.multi.repeat} % der Kunden, die den Kanal wechseln, wiederholen ihre Angaben. Mehr Kanäle machten es schlechter, nicht besser.`),
      look: tt("the grey “own data” boxes under each channel", "die grauen Kästen „eigene Daten“ unter jedem Kanal"),
      apply: () => {
        setStRaw("multi");
      },
    },
    {
      title: tt("The point", "Das Wichtigste"),
      say: tt(`Omnichannel is not more channels; it is the same channels connected around the customer. Try the three buttons.`, `Omnichannel heißt nicht mehr Kanäle, sondern dieselben Kanäle, verbunden rund um den Kunden. Probieren Sie die drei Schaltflächen.`),
      look: tt("the channels and what connects them", "die Kanäle und was sie verbindet"),
      apply: () => {
        setStRaw("omni");
      },
    },
  ]);
  const setSt = (v: Stage) => {
    story.leave();
    setStRaw(v);
  };
  const s = STAGE[st];
  const X = (i: number) => 20 + i * 135;
  return (
    <div className="space-y-3">
      <ThePoint>{tt("Adding channels does not make an experience seamless. What matters is whether the channels share what they know about the customer: then the customer moves on without starting again.", "Mehr Kanäle machen ein Erlebnis nicht nahtlos. Entscheidend ist, ob die Kanäle teilen, was sie über den Kunden wissen: Dann geht der Kunde weiter, ohne neu anzufangen.")}</ThePoint>
      <Story steps={story.plan} step={story.step} onStep={story.go} />
      <svg viewBox="0 0 560 230" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{tt("Weser Systemhaus: four channels as single channel, multichannel and omnichannel", "Weser Systemhaus: vier Kanäle als ein Kanal, Multichannel und Omnichannel")}</title>
        <desc id={`${uid}-d`}>{tt(`Shown: ${s.label}.`, `Gezeigt: ${s.label}.`)}</desc>
        <defs>
          <marker id={`${uid}-arr`} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 z" fill={C.ink} />
          </marker>
        </defs>
        {story.step !== null && <rect x="12" y="14" width="544" height="54" rx="9" fill="none" stroke={C.amber} strokeWidth="2" strokeDasharray="5 4" className="anim-pulse" />}
        {CHANNELS.map((name, i) => {
          const on = st !== "single" || i === 0;
          return (
            <g key={i}>
              <rect x={X(i)} y="20" width="100" height="42" rx="6" fill={on ? C.paper : "none"} stroke={on ? C.ink : C.grey} strokeWidth="1.4" strokeDasharray={on ? undefined : "5 4"} />
              <text x={X(i) + 50} y="46" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={on ? C.ink : C.grey}>{name}</text>
              {st === "multi" && (
                <g>
                  <line x1={X(i) + 50} y1="62" x2={X(i) + 50} y2="150" stroke={C.grey} strokeWidth="1.4" />
                  <rect x={X(i) + 15} y="150" width="70" height="30" rx="4" fill={C.mist} stroke={C.grey} />
                  <text x={X(i) + 50} y="169" textAnchor="middle" fontSize="10.5" fill={C.ash}>{tt("own data", "eigene Daten")}</text>
                </g>
              )}
              {st === "omni" && <line x1={X(i) + 50} y1="62" x2={X(i) + 50} y2="150" stroke={C.teal} strokeWidth="2" />}
              {st === "single" && i === 0 && (
                <g>
                  <line x1={X(i) + 50} y1="62" x2={X(i) + 50} y2="150" stroke={C.grey} strokeWidth="1.4" />
                  <rect x={X(i) + 15} y="150" width="70" height="30" rx="4" fill={C.mist} stroke={C.grey} />
                  <text x={X(i) + 50} y="169" textAnchor="middle" fontSize="10.5" fill={C.ash}>{tt("own data", "eigene Daten")}</text>
                </g>
              )}
            </g>
          );
        })}
        {st === "omni" && (
          <g>
            <rect x="40" y="150" width="480" height="30" rx="4" fill={C.tealSoft} stroke={C.teal} strokeWidth="1.6" />
            <text x="280" y="169" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={C.teal}>{tt("one shared customer profile", "ein gemeinsames Kundenprofil")}</text>
          </g>
        )}
        {st !== "single" &&
          [0, 1, 2].map((i) => {
            const x1 = X(i) + 100;
            const x2 = X(i + 1);
            const mid = (x1 + x2) / 2;
            return st === "multi" ? (
              <g key={i}>
                <line x1={x1 + 2} y1="41" x2={mid - 7} y2="41" stroke={C.rust} strokeWidth="2" strokeDasharray="4 3" />
                <line x1={mid + 7} y1="41" x2={x2 - 2} y2="41" stroke={C.rust} strokeWidth="2" strokeDasharray="4 3" />
                <text x={mid} y="46" textAnchor="middle" fontSize="14" fontWeight="700" fill={C.rust}>×</text>
              </g>
            ) : (
              <line key={i} x1={x1 + 2} y1="41" x2={x2 - 4} y2="41" stroke={C.teal} strokeWidth="2.4" markerEnd={`url(#${uid}-arr)`} />
            );
          })}
        <text x="20" y="13" fontSize="10.5" fill={C.ash}>{st === "single" ? "" : tt("customer journey →", "Customer Journey →")}</text>
        <text x="20" y="214" fontSize="12" fontWeight="700" fill={s.repeat === null ? C.ash : s.repeat > 30 ? C.rust : C.teal}>
          {s.repeat === null ? tt("No switches between channels, so nothing to repeat.", "Keine Wechsel zwischen Kanälen, also nichts zu wiederholen.") : tt(`Customers who switch channels and repeat their information: ${s.repeat}%`, `Kunden, die den Kanal wechseln und ihre Angaben wiederholen: ${s.repeat} %`)}
        </text>
      </svg>
      <Toggles<Stage> label={tt("How Weser runs its channels", "Wie Weser seine Kanäle betreibt")} value={st} onChange={setSt} options={STAGES.map((k) => ({ id: k, label: STAGE[k].label }))} />
      <Insight>{plain()}{s.reading}</Insight>
      <p className="text-caption text-ash">{tt("Illustration on Weser Systemhaus (Case assumption). A dashed rust line with × is a break where the customer starts again; a teal arrow is a transition that carries the history.", "Illustration mit Weser Systemhaus (Fallannahme). Eine gestrichelte rostfarbene Linie mit × ist ein Bruch, an dem der Kunde neu anfängt; ein teal Pfeil ist ein Übergang, der die Historie mitnimmt.")}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ A2 · the three principles of a seamless experience */

type Depth = "none" | "fit" | "much";
const PRINCIPLE_IDS: LevelTag[] = ["respond", "personal", "learn"];
const DEPTHS: Depth[] = ["none", "fit", "much"];
const D_LABEL = bi({ none: t("Broken", "Gebrochen"), fit: t("Seamless", "Nahtlos"), much: t("Overdone", "Übertrieben") });
const SHOWN = bi({
  respond: {
    none: t("After the web form, the customer waits six days and then gets a call from someone who was never told about the request.", "Nach dem Webformular wartet der Kunde sechs Tage und bekommt dann einen Anruf von jemandem, dem nie von der Anfrage erzählt wurde."),
    fit: t("A named salesperson calls within four working hours and says they have the web form in front of them.", "Eine benannte Vertriebsperson ruft innerhalb von vier Arbeitsstunden an und sagt, dass sie das Webformular vor sich hat."),
    much: t("A salesperson calls within two minutes of every click on the price page, while the customer is still reading.", "Eine Vertriebsperson ruft innerhalb von zwei Minuten nach jedem Klick auf der Preisseite an, während der Kunde noch liest."),
  },
  personal: {
    none: t("Support asks for the customer number, the contract and the products, all of which Weser already holds.", "Der Support fragt nach Kundennummer, Vertrag und Produkten, die Weser alle schon hat."),
    fit: t("Support opens the call with the contract and the last three tickets on screen, and asks only what is new.", "Der Support beginnt das Gespräch mit Vertrag und den letzten drei Tickets auf dem Bildschirm und fragt nur, was neu ist."),
    much: t("The chatbot greets the customer by name and mentions the pages their colleagues read yesterday.", "Der Chatbot begrüßt den Kunden mit Namen und erwähnt die Seiten, die seine Kollegen gestern gelesen haben."),
  },
  learn: {
    none: t("The website says delivery in five days, sales promises three, and the order confirmation says ten.", "Die Website sagt Lieferung in fünf Tagen, der Vertrieb verspricht drei, und die Auftragsbestätigung sagt zehn."),
    fit: t("Website, sales and the order confirmation read the delivery time from one source and say the same.", "Website, Vertrieb und Auftragsbestätigung lesen die Lieferzeit aus einer Quelle und sagen dasselbe."),
    much: t("Every channel reads the same script word for word, even when a customer's special case needs a person to adapt it.", "Jeder Kanal liest dasselbe Skript Wort für Wort, auch wenn der Sonderfall eines Kunden verlangt, dass ein Mensch es anpasst."),
  },
});
const READ = bi({
  none: t("The customer feels the gap between channels: they wait, repeat themselves or hear two answers. Each channel may work well on its own; the experience does not.", "Der Kunde spürt die Lücke zwischen den Kanälen: Er wartet, wiederholt sich oder hört zwei Antworten. Jeder Kanal mag für sich gut arbeiten; das Erlebnis tut es nicht."),
  fit: t("The customer moves from one channel to the next without starting again: the same knowledge, the same promises, a named person. This is what a seamless experience means.", "Der Kunde wechselt von einem Kanal zum nächsten, ohne neu anzufangen: dasselbe Wissen, dieselben Zusagen, eine benannte Person. Das bedeutet ein nahtloses Erlebnis."),
  much: t("Seamless does not mean everywhere and at once: pressing too early, showing tracking or ignoring a special case turns integration against the customer. Under the GDPR, using data in a way the customer does not expect may also lack a lawful basis.", "Nahtlos heißt nicht überall und sofort: zu früh drängen, Tracking zeigen oder einen Sonderfall übergehen wendet die Integration gegen den Kunden. Nach der DSGVO fehlt für eine Datennutzung, die der Kunde nicht erwartet, vielleicht auch eine Rechtsgrundlage."),
});

const M_IDEAS = bi([
  { id: "a", text: t("“The sales call starts with: could you tell me your company size again?”", "„Das Vertriebsgespräch beginnt mit: Können Sie mir Ihre Unternehmensgröße noch einmal nennen?“"), tag: "personal" as LevelTag, why: t("Someone takes over, but without what the customer already gave: recognition breaks.", "Jemand übernimmt, aber ohne das, was der Kunde schon angegeben hat: Die Wiedererkennung bricht.") },
  { id: "b", text: t("“After the chatbot fails, the customer is told to e-mail support and wait.”", "„Nachdem der Chatbot scheitert, soll der Kunde dem Support mailen und warten.“"), tag: "respond" as LevelTag, why: t("Nobody takes over at the switch: the transition breaks.", "Beim Wechsel übernimmt niemand: Der Übergang bricht.") },
  { id: "c", text: t("“The price in the shop differs from the price in the offer.”", "„Der Preis im Shop weicht vom Preis im Angebot ab.“"), tag: "learn" as LevelTag, why: t("Two channels say different things about the same price: consistency breaks.", "Zwei Kanäle sagen Verschiedenes über denselben Preis: Die Konsistenz bricht.") },
]);

export function MomentProfile() {
  const [v, setVRaw] = useState<LevelTag>("personal");
  const [d, setDRaw] = useState<Depth>("none");
  const story = useStory([
    {
      title: tt("Recognition that works", "Wiedererkennung, die funktioniert"),
      say: tt(`Weser Systemhaus is an example company, not your case. Support opens the call with the contract and the last three tickets on screen and asks only what is new: the channel recognises the customer.`, `Weser Systemhaus ist ein Beispielunternehmen, nicht Ihr Fall. Der Support beginnt das Gespräch mit Vertrag und den letzten drei Tickets auf dem Bildschirm und fragt nur, was neu ist: Der Kanal erkennt den Kunden wieder.`),
      look: tt("the highlighted middle card", "die hervorgehobene mittlere Karte"),
      apply: () => {
        setVRaw("personal");
        setDRaw("fit");
      },
    },
    {
      title: tt("A transition that breaks", "Ein Übergang, der bricht"),
      say: tt(`After the web form the customer waits six days and then gets a call from someone who was never told. Nobody took over at the switch: like a relay where the baton is dropped.`, `Nach dem Webformular wartet der Kunde sechs Tage und bekommt dann einen Anruf von jemandem, dem nie jemand Bescheid sagte. Beim Wechsel übernahm niemand: wie eine Staffel, bei der der Stab fällt.`),
      look: tt("the dashed first card", "die gestrichelte erste Karte"),
      apply: () => {
        setVRaw("respond");
        setDRaw("none");
      },
    },
    {
      title: tt("The point", "Das Wichtigste"),
      say: tt(`A seamless experience needs a transition that works, recognition and the same promises in every channel. Seamless does not mean overdone. Try the buttons.`, `Ein nahtloses Erlebnis braucht einen Übergang, der funktioniert, Wiedererkennung und dieselben Zusagen in jedem Kanal. Nahtlos heißt nicht übertrieben. Probieren Sie die Schaltflächen.`),
      look: tt("the consistent delivery time in the third card", "die einheitliche Lieferzeit in der dritten Karte"),
      apply: () => {
        setVRaw("learn");
        setDRaw("fit");
      },
    },
  ]);
  const setV = (v: LevelTag) => {
    story.leave();
    setVRaw(v);
  };
  const setD = (v: Depth) => {
    story.leave();
    setDRaw(v);
  };
  const [open, setOpen] = useState<string[]>([]);
  return (
    <div className="space-y-3">
      <ThePoint>{tt("A seamless experience means the customer moves from one channel to the next without starting again: someone takes over, the next channel knows what the customer did, and every channel says the same. Where one of the three is missing, the customer feels the gap.", "Ein nahtloses Erlebnis heißt, dass der Kunde von einem Kanal zum nächsten geht, ohne neu anzufangen: Jemand übernimmt, der nächste Kanal weiß, was der Kunde tat, und jeder Kanal sagt dasselbe. Fehlt eines der drei, spürt der Kunde die Lücke.")}</ThePoint>
      <Story steps={story.plan} step={story.step} onStep={story.go} />
      <div className="grid gap-2 sm:grid-cols-3" role="img" aria-label={tt("What the customer experiences for each principle", "Was der Kunde bei jedem Prinzip erlebt")}>
        {PRINCIPLE_IDS.map((x) => (
          <div key={x} className={`rounded-md border px-3 py-2 text-caption ${x === v ? "border-accent bg-accentSoft" : "border-line bg-paper"} ${d !== "fit" && x === v ? "border-dashed" : ""} ${story.step !== null && x === v ? "outline outline-2 -outline-offset-2 outline-dashed outline-[#8A5A0B] anim-pulse" : ""}`}>
            <p className="smallcaps">{LEVEL_LABEL[x]}</p>
            <p className="mt-1 text-ink">{SHOWN[x][d]}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Toggles<LevelTag> label={tt("Principle", "Prinzip")} value={v} onChange={setV} options={PRINCIPLE_IDS.map((x) => ({ id: x, label: LEVEL_LABEL[x] }))} />
        <Toggles<Depth> label={tt("State", "Zustand")} value={d} onChange={setD} options={DEPTHS.map((x) => ({ id: x, label: D_LABEL[x] }))} />
      </div>
      <Insight>{plain()}{`${LEVEL_LABEL[v]} · ${D_LABEL[d]}: ${READ[d]}`}</Insight>
      <div className="space-y-1.5">
        <p className="smallcaps">{tt("A worked sort: three weaknesses at Weser Systemhaus", "Eine Beispielsortierung: drei Schwachstellen bei Weser Systemhaus")}</p>
        <ul className="space-y-1.5">
          {M_IDEAS.map((x) => {
            const on = open.includes(x.id);
            return (
              <li key={x.id} className="rounded-md border border-line bg-paper px-3 py-2 text-caption">
                <p className="text-ink">{x.text}</p>
                <button type="button" aria-expanded={on} onClick={() => setOpen((o) => (on ? o.filter((y) => y !== x.id) : [...o, x.id]))} className="btn-ghost btn-sm mt-1">
                  {on ? tt("Hide", "Verbergen") : tt("Show the principle and why", "Prinzip und Grund zeigen")}
                </button>
                {on && (
                  <p className="mt-1 text-ink">
                    <strong>{LEVEL_LABEL[x.tag]}.</strong> {x.why}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <p className="text-caption text-ash">{tt("Illustration on Weser Systemhaus (Case assumption). A dashed frame marks a state that is broken or overdone.", "Illustration mit Weser Systemhaus (Fallannahme). Ein gestrichelter Rahmen markiert einen gebrochenen oder übertriebenen Zustand.")}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ A3 · critical transitions, and where AI can build */

type Verdict = "respond" | "personal" | "neither";
type NPage = { id: string; name: string; leave: number; decision: boolean; known: 0 | 1 | 2; verdict: Verdict; why: string };
const N_PAGES: NPage[] = bi([
  { id: "n1", name: t("Web form → sales call", "Webformular → Vertriebsanruf"), leave: 40, decision: true, known: 0 as const, verdict: "respond" as Verdict, why: t("A buying decision is open and 40% drop out, with nothing travelling to sales: fix this transition first.", "Eine Kaufentscheidung ist offen, und 40 % springen ab, während nichts an den Vertrieb mitreist: diesen Übergang zuerst beheben.") },
  { id: "n2", name: t("Offer → questions by phone", "Angebot → Rückfragen am Telefon"), leave: 30, decision: true, known: 0 as const, verdict: "respond" as Verdict, why: t("The customer is deciding on the offer and 30% drop out when the hotline knows nothing about it: critical.", "Der Kunde entscheidet über das Angebot, und 30 % springen ab, wenn die Hotline nichts davon weiß: kritisch.") },
  { id: "n3", name: t("Contract → onboarding", "Vertrag → Onboarding"), leave: 10, decision: false, known: 2 as const, verdict: "personal" as Verdict, why: t("The whole history travels with the contract: an onboarding plan or a prediction of who will struggle can build on it.", "Die ganze Historie reist mit dem Vertrag: Ein Onboarding-Plan oder eine Vorhersage, wer Probleme haben wird, kann darauf aufbauen.") },
  { id: "n4", name: t("Tickets → renewal talk", "Tickets → Verlängerungsgespräch"), leave: 15, decision: true, known: 1 as const, verdict: "personal" as Verdict, why: t("The ticket history reaches the account manager: a renewal-risk prediction can build on it. Only 15% drop out, so it is not the most critical break.", "Die Ticket-Historie erreicht den Account Manager: Eine Vorhersage des Verlängerungsrisikos kann darauf aufbauen. Nur 15 % springen ab, also ist es nicht der kritischste Bruch.") },
  { id: "n5", name: t("Newsletter → website", "Newsletter → Website"), leave: 70, decision: false, known: 0 as const, verdict: "neither" as Verdict, why: t("Many drop out, but nobody decides anything on the way from a newsletter to the site.", "Viele springen ab, aber auf dem Weg vom Newsletter zur Website entscheidet niemand etwas.") },
  { id: "n6", name: t("Webinar → sales", "Webinar → Vertrieb"), leave: 20, decision: true, known: 0 as const, verdict: "neither" as Verdict, why: t("A decision is open, but only 20% drop out: it works well enough; not the first place to act.", "Eine Entscheidung ist offen, aber nur 20 % springen ab: Es funktioniert gut genug; nicht der erste Ort zum Handeln.") },
]);
const VERDICT_LABEL = bi({ respond: t("Critical: fix it first", "Kritisch: zuerst beheben"), personal: t("AI can build on it", "KI kann darauf aufbauen"), neither: t("Neither comes first", "Keines kommt zuerst") });
const VERDICT_GLYPH: Record<Verdict, string> = { respond: "●", personal: "◐", neither: "○" };

export function AutomationGrid() {
  const uid = useId().replace(/:/g, "");
  const [sel, setSelRaw] = useState<string>("n1");
  const story = useStory([
    {
      title: tt("Fix this first", "Das zuerst beheben"),
      say: tt(`Weser Systemhaus is an example company, not your case. At the step from web form to sales call a buying decision is open and ${N_PAGES[0].leave}% drop out, with nothing travelling to sales. Fix this transition first.`, `Weser Systemhaus ist ein Beispielunternehmen, nicht Ihr Fall. Beim Schritt vom Webformular zum Vertriebsanruf ist eine Kaufentscheidung offen, und ${N_PAGES[0].leave} % springen ab, ohne dass etwas an den Vertrieb mitreist. Diesen Übergang zuerst beheben.`),
      look: tt("square 1, in the hatched area at the bottom right", "Quadrat 1, im schraffierten Bereich unten rechts"),
      apply: () => {
        setSelRaw("n1");
      },
    },
    {
      title: tt("AI can build on this", "Darauf kann KI aufbauen"),
      say: tt(`From contract to onboarding the whole history travels with the customer and only ${N_PAGES[2].leave}% drop out. That is where an AI tool can build, for example a prediction of who will struggle.`, `Vom Vertrag zum Onboarding reist die ganze Historie mit dem Kunden, und nur ${N_PAGES[2].leave} % springen ab. Dort kann ein KI-Werkzeug aufbauen, zum Beispiel eine Vorhersage, wer Schwierigkeiten bekommt.`),
      look: tt("circle 3, in the top row: the history travels", "Kreis 3, in der oberen Reihe: Die Historie reist mit"),
      apply: () => {
        setSelRaw("n3");
      },
    },
    {
      title: tt("The point", "Das Wichtigste"),
      say: tt(`Newsletter to website loses ${N_PAGES[4].leave}%, but nobody decides anything there. Fix first where a decision is open and many drop out; build AI where the history already travels. Try the dots.`, `Newsletter zur Website verliert ${N_PAGES[4].leave} %, aber dort entscheidet niemand etwas. Beheben Sie zuerst, wo eine Entscheidung offen ist und viele abspringen; bauen Sie KI dort, wo die Historie schon mitreist. Probieren Sie die Punkte.`),
      look: tt("circle 5, in the grey area", "Kreis 5, im grauen Bereich"),
      apply: () => {
        setSelRaw("n5");
      },
    },
  ]);
  const setSel = (v: string) => {
    story.leave();
    setSelRaw(v);
  };
  const s = N_PAGES.find((x) => x.id === sel)!;
  const X = (l: number) => 60 + (l / 100) * 440;
  const Y = (k: number) => 250 - k * 85;
  return (
    <div className="space-y-3">
      <ThePoint>{tt("Fix first where a buying decision is open and many customers drop out with nothing travelling along. An AI tool can build where the history already travels with the customer. Where neither is true, other work comes first.", "Beheben Sie zuerst, wo eine Kaufentscheidung offen ist und viele Kunden abspringen, ohne dass etwas mitreist. Ein KI-Werkzeug kann dort aufbauen, wo die Historie schon mit dem Kunden mitreist. Wo beides nicht zutrifft, kommt andere Arbeit zuerst.")}</ThePoint>
      <Story steps={story.plan} step={story.step} onStep={story.go} />
      <svg viewBox="0 0 560 300" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{tt("Weser Systemhaus's transitions by the share who drop out and what travels with the customer", "Übergänge von Weser Systemhaus nach dem Anteil, der abspringt, und dem, was mit dem Kunden mitreist")}</title>
        <desc id={`${uid}-d`}>{`${s.name}: ${VERDICT_LABEL[s.verdict]}.`}</desc>
        <defs>
          <pattern id={`${uid}-hatch`} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="8" stroke={C.gold} strokeWidth="2" opacity="0.5" />
          </pattern>
        </defs>
        <rect x={X(0)} y="30" width={X(100) - X(0)} height="175" fill={C.tealSoft} opacity="0.7" />
        <rect x={X(25)} y="205" width={X(100) - X(25)} height="80" fill={`url(#${uid}-hatch)`} stroke={C.amber} />
        <rect x={X(0)} y="205" width={X(25) - X(0)} height="80" fill={C.mist} />
        <text x={X(62)} y="222" textAnchor="middle" fontSize="10.5" fontWeight="700" fill={C.amber}>{tt("decision open + 25% drop out: critical", "Entscheidung offen + 25 % springen ab: kritisch")}</text>
        <text x={X(50)} y="46" textAnchor="middle" fontSize="10.5" fontWeight="700" fill={C.teal}>{tt("the history travels: AI can build on it", "die Historie reist mit: KI kann darauf aufbauen")}</text>
        <line x1={X(25)} y1="205" x2={X(25)} y2="285" stroke={C.ash} strokeDasharray="4 3" />
        {[0, 25, 50, 75, 100].map((l) => (
          <text key={l} x={X(l)} y="298" textAnchor="middle" fontSize="11" fill={C.ash}>{pct(l)}</text>
        ))}
        {[tt("nothing", "nichts"), tt("part", "ein Teil"), tt("all", "alles")].map((l, k) => (
          <text key={k} x="54" y={Y(k) + 4} textAnchor="end" fontSize="11" fill={C.ash}>{l}</text>
        ))}
        <text x="4" y="20" fontSize="11" fill={C.ash}>{tt("what travels", "was mitreist")}</text>
        {N_PAGES.map((x, i) => {
          const on = x.id === sel;
          const cx = X(x.leave);
          const cy = Y(x.known) + (x.known === 0 ? 10 : 0);
          return (
            <g key={x.id} className="hit" role="button" tabIndex={0} aria-label={x.name} onClick={() => setSel(x.id)} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setSel(x.id)}>
              {on && story.step !== null && <circle cx={cx} cy={cy} r="21" fill="none" stroke={C.amber} strokeWidth="2" strokeDasharray="5 4" className="anim-pulse" />}
              {x.decision ? <rect className="hit-shape" x={cx - (on ? 14 : 11)} y={cy - (on ? 14 : 11)} width={on ? 28 : 22} height={on ? 28 : 22} rx="3" fill={on ? C.gold : C.data} stroke={C.ink} strokeWidth="1.4" /> : <circle className="hit-shape" cx={cx} cy={cy} r={on ? 14 : 11} fill={on ? C.gold : C.data} stroke={C.ink} strokeWidth="1.4" />}
              <text x={cx} y={cy + 4} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={on ? C.ink : C.paper}>{i + 1}</text>
            </g>
          );
        })}
      </svg>
      <div role="group" aria-label={tt("Transitions", "Übergänge")} className="flex flex-wrap gap-2">
        {N_PAGES.map((x, i) => (
          <button key={x.id} type="button" aria-pressed={x.id === sel} onClick={() => setSel(x.id)} className={`btn btn-sm min-h-[40px] border ${x.id === sel ? "border-accent bg-accentSoft text-ink" : "border-line bg-paper text-ash hover:border-ash"}`}>
            {`${i + 1} · ${x.name}`}
          </button>
        ))}
      </div>
      <Insight>{plain()}{`${s.name} · ${tt(`${s.leave}% drop out`, `${s.leave} % springen ab`)} · ${s.decision ? tt("decision open", "Entscheidung offen") : tt("no decision open", "keine Entscheidung offen")} · ${VERDICT_GLYPH[s.verdict]} ${VERDICT_LABEL[s.verdict]}. ${s.why}`}</Insight>
      <p className="text-caption text-ash">{tt("Illustration on Weser Systemhaus (Case assumption). Squares are transitions with an open decision, circles are not. Hatched = critical; teal = AI can build on it; grey = neither comes first.", "Illustration mit Weser Systemhaus (Fallannahme). Quadrate sind Übergänge mit offener Entscheidung, Kreise nicht. Schraffiert = kritisch; teal = KI kann darauf aufbauen; grau = keines kommt zuerst.")}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ A4 · what a seamless hand-over is worth (Weser Systemhaus) */

export function PilotExample() {
  const uid = useId().replace(/:/g, "");
  const [yearly, setYearlyRaw] = useState(MOSEL.yearly);
  const story = useStory([
    {
      title: tt("Two groups, two rates", "Zwei Gruppen, zwei Quoten"),
      say: tt(`Weser Systemhaus is an example company, not your case. Journeys in which sales saw the history ended in a deal at ${pct(MOSEL_RESULT.rate, 1)}, against ${pct(MOSEL_RESULT.other, 1)} from zero: ${num(MOSEL_RESULT.lift)} times as often.`, `Weser Systemhaus ist ein Beispielunternehmen, nicht Ihr Fall. Journeys, bei denen der Vertrieb die Historie sah, endeten zu ${pct(MOSEL_RESULT.rate, 1)} in einem Abschluss, gegenüber ${pct(MOSEL_RESULT.other, 1)} bei null: ${num(MOSEL_RESULT.lift)}-mal so oft.`),
      look: tt("the two bars and the amber line under them", "die zwei Balken und die bernsteinfarbene Zeile darunter"),
      apply: () => {
        setYearlyRaw(MOSEL.yearly);
      },
    },
    {
      title: tt("Only the difference is extra", "Nur der Unterschied ist zusätzlich"),
      say: tt(`Journeys from zero would have closed ${pct(MOSEL_RESULT.other, 1)} anyway. On ${num(MOSEL.yearly * 2)} journeys a year the difference is worth about ${euro(extraOf(MOSEL.yearly * 2, MOSEL_RESULT.rate, MOSEL_RESULT.other, MOSEL.order))}. The app does the arithmetic.`, `Journeys bei null hätten ohnehin ${pct(MOSEL_RESULT.other, 1)} abgeschlossen. Bei ${num(MOSEL.yearly * 2)} Journeys pro Jahr ist der Unterschied etwa ${euro(extraOf(MOSEL.yearly * 2, MOSEL_RESULT.rate, MOSEL_RESULT.other, MOSEL.order))} wert. Die Rechnung übernimmt die App.`),
      look: tt("the slider at double the journeys, and the sum in “What this shows”", "der Regler bei doppelt so vielen Journeys und die Rechnung in „Was das zeigt“"),
      apply: () => {
        setYearlyRaw(MOSEL.yearly * 2);
      },
    },
    {
      title: tt("The point", "Das Wichtigste"),
      say: tt(`Two deal rates side by side turn “the history seems to help” into a figure. But if sales looked up the history only for the best leads, the gap overstates it: promising, not proven.`, `Zwei Abschlussquoten nebeneinander machen aus „die Historie scheint zu helfen“ eine Zahl. Hat der Vertrieb die Historie aber nur bei den besten Leads nachgeschlagen, überschätzt der Abstand sie: vielversprechend, nicht bewiesen.`),
      look: tt("the deals printed behind each bar", "die Abschlüsse, die hinter jedem Balken stehen"),
      apply: () => {
        setYearlyRaw(MOSEL.yearly);
      },
    },
  ]);
  const setYearly = (v: number) => {
    story.leave();
    setYearlyRaw(v);
  };
  const r = MOSEL_RESULT;
  const extra = extraOf(yearly, r.rate, r.other, MOSEL.order);
  const W = (p: number) => (p / 25) * 300;
  return (
    <div className="space-y-3">
      <ThePoint>{tt("A comparison gives two deal rates, one per group. Their ratio says how many times better the journeys with the history did, and the difference, over a year of journeys, says what it is worth. A comparison that sales shaped is promising, not proof.", "Ein Vergleich gibt zwei Abschlussquoten, eine pro Gruppe. Ihr Verhältnis sagt, wie viel Mal besser die Journeys mit der Historie abschnitten, und der Unterschied, über ein Jahr Journeys, sagt, was er wert ist. Ein Vergleich, den der Vertrieb mitgeprägt hat, ist vielversprechend, kein Beweis.")}</ThePoint>
      <Story steps={story.plan} step={story.step} onStep={story.go} />
      <svg viewBox="0 0 560 150" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{tt("Weser Systemhaus: hand-overs with the online history against hand-overs that start from zero", "Weser Systemhaus: Übergaben mit Online-Historie gegen Übergaben, die bei null anfangen")}</title>
        <desc id={`${uid}-d`}>{tt(`With the history ${r.rate}%, from zero ${r.other}%, lift ${r.lift}.`, `Mit Historie ${num(r.rate)} %, bei null ${num(r.other)} %, Lift ${num(r.lift)}.`)}</desc>
        {story.step !== null && <rect x="164" y="14" width="396" height="88" rx="8" fill="none" stroke={C.amber} strokeWidth="2" strokeDasharray="5 4" className="anim-pulse" />}
        <text x="0" y="36" fontSize="12" fill={C.ink}>{tt("With the history", "Mit Historie")}</text>
        <rect x="170" y="20" width={W(r.rate)} height="26" fill={C.data} stroke={C.ink} />
        <text x={176 + W(r.rate)} y="38" fontSize="12.5" fontWeight="700" fill={C.ink}>{`${pct(r.rate)} (${MOSEL.variant.orders} ${tt("of", "von")} ${num(MOSEL.variant.sent)})`}</text>
        <text x="0" y="86" fontSize="12" fill={C.ink}>{tt("From zero", "Bei null")}</text>
        <rect x="170" y="70" width={W(r.other)} height="26" fill={C.grey} stroke={C.ink} />
        <text x={176 + W(r.other)} y="88" fontSize="12.5" fontWeight="700" fill={C.ink}>{`${pct(r.other)} (${MOSEL.control.orders} ${tt("of", "von")} ${num(MOSEL.control.sent)})`}</text>
        <text x="170" y="128" fontSize="13" fontWeight="700" fill={C.amber}>{tt(`Lift = ${r.rate} ÷ ${r.other} = ${num(r.lift)} times as often`, `Lift = ${num(r.rate)} ÷ ${num(r.other)} = ${num(r.lift)}-mal so oft`)}</text>
      </svg>
      <div className="space-y-1.5">
        <label htmlFor={`${uid}-y`} className="smallcaps block">
          {tt(`Weser's channel-switching journeys a year: ${num(yearly)}`, `Kanalwechselnde Journeys von Weser pro Jahr: ${num(yearly)}`)}
        </label>
        <input id={`${uid}-y`} type="range" min={200} max={3000} step={100} value={yearly} onChange={(e) => setYearly(Number(e.target.value))} className="w-full max-w-md accent-[#8A5A0B]" />
      </div>
      <Insight>{plain()}
        {tt(
          `${num(yearly)} journeys × (${pct(r.rate)} − ${pct(r.other)}) × ${euro(MOSEL.order)} = ${euro(extra)} extra a year if sales saw the history in every journey. Only the difference counts: hand-overs from zero would have closed ${pct(r.other)} anyway. ${yearly === MOSEL.yearly ? "At 800 journeys the example gives €120,000." : `More journeys use the same lift more often: ${yearly > MOSEL.yearly ? "more" : "less"} extra revenue.`}`,
          `${num(yearly)} Journeys × (${pct(r.rate)} − ${pct(r.other)}) × ${euro(MOSEL.order)} = ${euro(extra)} zusätzlich pro Jahr, wenn der Vertrieb bei jeder Journey die Historie sähe. Nur der Unterschied zählt: Übergaben bei null hätten ohnehin ${pct(r.other)} abgeschlossen. ${yearly === MOSEL.yearly ? "Bei 800 Journeys ergibt das Beispiel 120.000 €." : `Mehr Journeys nutzen denselben Lift öfter: ${yearly > MOSEL.yearly ? "mehr" : "weniger"} zusätzlicher Umsatz.`}`,
        )}
      </Insight>
    </div>
  );
}

/* ------------------------------------------------------------------ A5 · a cross-channel KPI tree (Weser Systemhaus) */

type MMetric = { id: string; name: string; kind: PatternId; moved: boolean; why: string };
const M_METRICS: MMetric[] = bi([
  { id: "rev", name: t("Revenue per customer, all channels", "Umsatz pro Kunde, alle Kanäle"), kind: "outcome" as PatternId, moved: true, why: t("Money across channels: the result Weser is paid for. It moves last.", "Geld über alle Kanäle: das Ergebnis, für das Weser bezahlt wird. Es bewegt sich zuletzt.") },
  { id: "renew", name: t("Renewal rate", "Verlängerungsrate"), kind: "outcome" as PatternId, moved: true, why: t("Customers kept: a result.", "Gehaltene Kunden: ein Ergebnis.") },
  { id: "hist", name: t("Hand-overs with the history", "Übergaben mit Historie"), kind: "driver" as PatternId, moved: true, why: t("It comes before the deal and the teams can raise it this month.", "Sie kommen vor dem Abschluss, und die Teams können sie diesen Monat steigern.") },
  { id: "multi", name: t("Customers using two or more channels", "Kunden mit zwei oder mehr Kanälen"), kind: "driver" as PatternId, moved: false, why: t("A customer behaviour before the deal; it did not move with value last year, which is a finding, not another kind.", "Ein Kundenverhalten vor dem Abschluss; es bewegte sich letztes Jahr nicht mit dem Wert, das ist ein Befund, keine andere Art.") },
  { id: "repeat", name: t("Customers who repeat their information", "Kunden, die ihre Angaben wiederholen"), kind: "guardrail" as PatternId, moved: true, why: t("It must not rise while Weser connects its channels.", "Er darf nicht steigen, während Weser seine Kanäle verbindet.") },
  { id: "channels", name: t("Channels offered", "Angebotene Kanäle"), kind: "vanity" as PatternId, moved: false, why: t("It counts what Weser built, not how customers moved.", "Es zählt, was Weser gebaut hat, nicht wie Kunden sich bewegten.") },
]);
const KIND_POS: Record<PatternId, { x: number; y: number }> = { outcome: { x: 150, y: 30 }, driver: { x: 150, y: 150 }, guardrail: { x: 420, y: 90 }, vanity: { x: 420, y: 230 } };
const KIND_DE: Record<PatternId, string> = { outcome: "ein Outcome-KPI", driver: "ein Treiber-KPI", guardrail: "eine Guardrail", vanity: "eine Vanity Metric" };

export function KpiTree() {
  const uid = useId().replace(/:/g, "");
  const [sel, setSelRaw] = useState("hist");
  const [past, setPastRaw] = useState(false);
  const story = useStory([
    {
      title: tt("A driver you can steer by", "Ein Treiber, nach dem Sie steuern"),
      say: tt(`Weser Systemhaus is an example company, not your case. Hand-overs with the history come before the deal, the teams can raise them this month, and they moved with value last year: a driver.`, `Weser Systemhaus ist ein Beispielunternehmen, nicht Ihr Fall. Übergaben mit Historie kommen vor dem Abschluss, die Teams können sie diesen Monat steigern, und sie bewegten sich letztes Jahr mit dem Wert: ein Treiber.`),
      look: tt("the box under the top, and “moved with value”", "der Kasten unter der Spitze und „mit dem Wert bewegt“"),
      apply: () => {
        setSelRaw("hist");
        setPastRaw(true);
      },
    },
    {
      title: tt("A number that flatters", "Eine Zahl, die schmeichelt"),
      say: tt(`Channels offered counts what Weser built, not how customers moved. It did not move with value. It looks like progress and decides nothing: a vanity metric, a number that only flatters.`, `Angebotene Kanäle zählt, was Weser gebaut hat, nicht wie Kunden sich bewegten. Es bewegte sich nicht mit dem Wert. Es sieht nach Fortschritt aus und entscheidet nichts: eine Vanity Metric, eine Zahl, die nur schmeichelt.`),
      look: tt("the grey box outside the tree", "der graue Kasten außerhalb des Baums"),
      apply: () => {
        setSelRaw("channels");
        setPastRaw(true);
      },
    },
    {
      title: tt("The point", "Das Wichtigste"),
      say: tt(`Steer by the result and the behaviours that lead to it, watch a limit such as customers repeating their information, and stop reporting numbers that only count what you built. Choose any metric.`, `Steuern Sie nach dem Ergebnis und den Verhalten, die dorthin führen, beobachten Sie eine Grenze wie Kunden, die ihre Angaben wiederholen, und hören Sie auf, Zahlen zu berichten, die nur zählen, was Sie gebaut haben. Wählen Sie eine beliebige Kennzahl.`),
      look: tt("the dashed amber frame: the guardrail", "der gestrichelte bernsteinfarbene Rahmen: die Guardrail"),
      apply: () => {
        setSelRaw("repeat");
        setPastRaw(true);
      },
    },
  ]);
  const setSel = (v: string) => {
    story.leave();
    setSelRaw(v);
  };
  const setPast = (v: boolean | ((v: boolean) => boolean)) => {
    story.leave();
    setPastRaw(v);
  };
  const m = M_METRICS.find((x) => x.id === sel)!;
  const boxes = M_METRICS.map((x) => {
    const same = M_METRICS.filter((y) => y.kind === x.kind);
    const k = same.indexOf(x);
    const base = KIND_POS[x.kind];
    const w = same.length > 1 ? 130 : 140;
    return { x, bx: base.x - (same.length > 1 ? 140 : 70) + k * 150, by: base.y, w };
  });
  return (
    <div className="space-y-3">
      <ThePoint>{tt("Not every number is a KPI. The result sits at the top, the behaviours that lead to it below, a limit that must not get worse beside it; numbers that only count what you built do not belong in the picture.", "Nicht jede Zahl ist ein KPI. Das Ergebnis steht oben, die Verhalten, die dorthin führen, darunter, eine Grenze, die nicht schlechter werden darf, daneben; Zahlen, die nur zählen, was Sie gebaut haben, gehören nicht ins Bild.")}</ThePoint>
      <Story steps={story.plan} step={story.step} onStep={story.go} />
      <svg viewBox="0 0 560 300" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{tt("Weser Systemhaus's cross-channel metrics as a KPI tree", "Die kanalübergreifenden Kennzahlen von Weser Systemhaus als KPI-Baum")}</title>
        <desc id={`${uid}-d`}>{`${m.name}: ${PATTERNS[m.kind].label}.`}</desc>
        <line x1="75" y1="78" x2="75" y2="150" stroke={C.ink} strokeWidth="1.6" />
        <line x1="225" y1="78" x2="225" y2="150" stroke={C.ink} strokeWidth="1.6" />
        <line x1="75" y1="114" x2="225" y2="114" stroke={C.ink} strokeWidth="1.6" />
        <rect x="340" y="80" width="190" height="72" rx="6" fill="none" stroke={C.amber} strokeDasharray="6 4" />
        <rect x="340" y="222" width="190" height="66" rx="6" fill="none" stroke={C.grey} strokeDasharray="3 4" />
        <text x="435" y="76" textAnchor="middle" fontSize="10.5" fill={C.amber}>{tt("guardrail: must not get worse", "Guardrail: darf nicht schlechter werden")}</text>
        <text x="435" y="218" textAnchor="middle" fontSize="10.5" fill={C.ash}>{tt("outside the tree: decides nothing", "außerhalb des Baums: entscheidet nichts")}</text>
        {boxes.map(({ x, bx, by, w }) => {
          const on = x.id === sel;
          return (
            <g key={x.id} className="hit" role="button" tabIndex={0} aria-label={x.name} onClick={() => setSel(x.id)} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setSel(x.id)}>
              {on && story.step !== null && <rect x={bx - 5} y={by - 5} width={w + 10} height="58" rx="9" fill="none" stroke={C.amber} strokeWidth="2" strokeDasharray="5 4" className="anim-pulse" />}
              <rect className="hit-shape" x={bx} y={by} width={w} height="48" rx="6" fill={on ? C.soft : x.kind === "vanity" ? C.mist : C.paper} stroke={on ? C.amber : C.ink} strokeWidth={on ? 2.4 : 1.2} />
              <foreignObject x={bx + 4} y={by + 4} width={w - 8} height="40">
                <div style={{ fontSize: 11.5, lineHeight: 1.2, color: C.ink, textAlign: "center", fontFamily: "system-ui,sans-serif" }}>{x.name}</div>
              </foreignObject>
              {past && (
                <text x={bx + w - 6} y={by + 60} textAnchor="end" fontSize="10.5" fontWeight="700" fill={x.moved ? C.teal : C.ash}>{x.moved ? tt("● moved with value", "● mit dem Wert bewegt") : tt("○ did not move", "○ nicht bewegt")}</text>
              )}
            </g>
          );
        })}
        <text x="8" y="22" fontSize="10.5" fill={C.ash}>{tt("outcome", "Outcome")}</text>
        <text x="8" y="142" fontSize="10.5" fill={C.ash}>{tt("drivers", "Treiber")}</text>
      </svg>
      <div className="flex flex-wrap items-center gap-3">
        <Toggles<string> label={tt("Metric", "Kennzahl")} value={sel} onChange={setSel} options={M_METRICS.map((x) => ({ id: x.id, label: x.name }))} />
        <Toggles<string> label={tt("Last year", "Letztes Jahr")} value={past ? "on" : null} onChange={() => setPast((v) => !v)} options={[{ id: "on", label: past ? tt("Hide last year", "Letztes Jahr verbergen") : tt("Show whether it moved with value last year", "Zeigen, ob es sich letztes Jahr mit dem Wert bewegte") }]} />
      </div>
      <Insight>{plain()}
        {past
          ? tt(
              `${m.name} → ${PATTERNS[m.kind].label}. ${m.why} Last year it ${m.moved ? "moved" : "did not move"} with customer value. Both outcomes moved, one of two drivers, the guardrail moved, the vanity metric did not: the closer to the top of the tree, the stronger the link.`,
              `${m.name} ist ${KIND_DE[m.kind]}: ${m.why} Letztes Jahr ${m.moved ? "bewegte es sich" : "bewegte es sich nicht"} mit dem Kundenwert. Beide Outcomes bewegten sich, einer von zwei Treibern, die Guardrail bewegte sich, die Vanity Metric nicht: Je näher an der Spitze des Baums, desto stärker die Verbindung.`,
            )
          : tt(`${m.name} → ${PATTERNS[m.kind].label}. ${m.why} Switch on “last year” to see which kinds move with customer value.`, `${m.name} ist ${KIND_DE[m.kind]}. ${m.why} Schalten Sie „letztes Jahr“ ein, um zu sehen, welche Arten sich mit dem Kundenwert bewegen.`)}
      </Insight>
    </div>
  );
}

/* ------------------------------------------------------------------ A6 · a fair test across channels */

type Flaw = "none" | "two" | "time" | "peek";
const FLAWS = bi({
  none: { label: t("Fair test", "Fairer Test"), a: t("Calls without the hand-over card · random half of online leads · weeks 1–6", "Anrufe ohne Übergabekarte · zufällige Hälfte der Online-Leads · Wochen 1–6"), b: t("Calls with the hand-over card · other half · weeks 1–6", "Anrufe mit Übergabekarte · andere Hälfte · Wochen 1–6"), reading: t("One change, a random split, the same weeks, a size fixed in advance: a difference between the groups can be put down to the card.", "Eine Änderung, eine zufällige Aufteilung, dieselben Wochen, eine vorab festgelegte Größe: Ein Unterschied zwischen den Gruppen lässt sich der Karte zuschreiben.") },
  two: { label: t("Three changes at once", "Drei Änderungen auf einmal"), a: t("The old call · random half", "Der alte Anruf · zufällige Hälfte"), b: t("Card, new price list and new call script · other half", "Karte, neue Preisliste und neuer Gesprächsleitfaden · andere Hälfte"), reading: t("The variant differs in three things. If it wins, nobody can say whether the card, the prices or the script did it.", "Die Variante unterscheidet sich in drei Dingen. Gewinnt sie, kann niemand sagen, ob Karte, Preise oder Leitfaden es waren.") },
  time: { label: t("Compared with last quarter", "Mit dem Vorquartal verglichen"), a: t("Without the card · all leads · first quarter", "Ohne Karte · alle Leads · erstes Quartal"), b: t("With the card · all leads · second quarter", "Mit Karte · alle Leads · zweites Quartal"), reading: t("The groups are different quarters. A trade fair, a price change or the season can explain the difference. Comparing periods is reading a trend, not testing a cause.", "Die Gruppen sind verschiedene Quartale. Eine Messe, eine Preisänderung oder die Saison können den Unterschied erklären. Zeiträume zu vergleichen heißt einen Trend lesen, nicht eine Ursache testen.") },
  peek: { label: t("Stopped when ahead on the dashboard", "Gestoppt, sobald im Dashboard vorn"), a: t("Without the card · random half · stopped after week 1", "Ohne Karte · zufällige Hälfte · nach Woche 1 gestoppt"), b: t("With the card · other half · stopped after week 1", "Mit Karte · andere Hälfte · nach Woche 1 gestoppt"), reading: t("A deal rate swings with every deal. Stopping at the first lead picks a lucky moment, and customers who need longer to decide are left out.", "Eine Abschlussquote schwankt mit jedem Abschluss. Beim ersten Vorsprung zu stoppen, wählt einen glücklichen Moment, und Kunden, die länger zum Entscheiden brauchen, fehlen.") },
});
const FLAW_IDS: Flaw[] = ["none", "two", "time", "peek"];
const rangeOf = (ctl: number, ratio: number) => {
  const se = Math.sqrt(1 / (ctl * ratio) + 1 / ctl);
  const r2 = (x: number) => Math.round(x * 100) / 100;
  return { lo: r2(Math.exp(Math.log(ratio) - 1.96 * se)), hi: r2(Math.exp(Math.log(ratio) + 1.96 * se)) };
};

export function FairTest() {
  const uid = useId().replace(/:/g, "");
  const [flaw, setFlawRaw] = useState<Flaw>("none");
  const [conv, setConvRaw] = useState(30);
  const story = useStory([
    {
      title: tt("A fair test", "Ein fairer Test"),
      say: tt(`Weser Systemhaus is an example company, not your case. A fair test is like a race: same track, same start, one runner changed. Weser gives the hand-over card to a random half of online leads, in the same weeks.`, `Weser Systemhaus ist ein Beispielunternehmen, nicht Ihr Fall. Ein fairer Test ist wie ein Rennen: dieselbe Bahn, derselbe Start, ein Läufer ausgetauscht. Weser gibt die Übergabekarte an eine zufällige Hälfte der Online-Leads, in denselben Wochen.`),
      look: tt("Group A and Group B: only the card differs", "Gruppe A und Gruppe B: Nur die Karte unterscheidet sich"),
      apply: () => {
        setFlawRaw("none");
        setConvRaw(30);
      },
    },
    {
      title: tt("An unfair test", "Ein unfairer Test"),
      say: tt(`Now the variant gets the card, a new price list and a new call script together. If it wins, nobody knows which of the three did it.`, `Jetzt bekommt die Variante die Karte, eine neue Preisliste und ein neues Gesprächsskript zugleich. Gewinnt sie, weiß niemand, was von den dreien es war.`),
      look: tt("the dashed amber Group B box", "der gestrichelte bernsteinfarbene Kasten von Gruppe B"),
      apply: () => {
        setFlawRaw("two");
        setConvRaw(30);
      },
    },
    {
      title: tt("The point", "Das Wichtigste"),
      say: tt(`Even a fair test says less than it seems on few results: with 30 deals per group, the same 1.5× could be ${num(rangeOf(30, 1.5).lo)}×, which is no gain. Move the slider to 100.`, `Selbst ein fairer Test sagt bei wenigen Ergebnissen weniger, als es scheint: Mit 30 Abschlüssen pro Gruppe könnte dasselbe 1,5× ${num(rangeOf(30, 1.5).lo)}× sein, also kein Gewinn. Bewegen Sie den Regler auf 100.`),
      look: tt("the hatched bar crossing the dashed 1× line", "der schraffierte Balken, der die gestrichelte 1×-Linie kreuzt"),
      apply: () => {
        setFlawRaw("none");
        setConvRaw(30);
      },
    },
  ]);
  const setFlaw = (v: Flaw) => {
    story.leave();
    setFlawRaw(v);
  };
  const setConv = (v: number) => {
    story.leave();
    setConvRaw(v);
  };
  const f = FLAWS[flaw];
  const ratio = 1.5;
  const { lo, hi } = rangeOf(conv, ratio);
  const X = (r: number) => 40 + ((r - 0.5) / 2.5) * 480;
  const zero = X(1);
  const proven = lo > 1;
  return (
    <div className="space-y-4">
      <ThePoint>{tt("A test is fair when only one thing differs, chance decides who is in which group, both groups run in the same weeks, and the size is fixed in advance. Even then, a small test tells you less than it seems.", "Ein Test ist fair, wenn sich nur eine Sache unterscheidet, der Zufall entscheidet, wer in welcher Gruppe ist, beide Gruppen in denselben Wochen laufen und die Größe vorab feststeht. Selbst dann sagt ein kleiner Test weniger, als es scheint.")}</ThePoint>
      <Story steps={story.plan} step={story.step} onStep={story.go} />
      <div className="space-y-2">
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="rounded-md border border-line bg-paper px-3 py-2 text-caption">
            <p className="smallcaps">{tt("Group A", "Gruppe A")}</p>
            <p className="text-ink">{f.a}</p>
          </div>
          <div className={`rounded-md border px-3 py-2 text-caption ${flaw === "none" ? "border-line bg-paper" : "border-dashed border-accent bg-accentSoft"} ${story.step === 1 ? "outline outline-2 -outline-offset-2 outline-dashed outline-[#8A5A0B] anim-pulse" : ""}`}>
            <p className="smallcaps">{tt("Group B", "Gruppe B")}</p>
            <p className="text-ink">{f.b}</p>
          </div>
        </div>
        <Toggles<Flaw> label={tt("How Weser runs the test", "Wie Weser den Test durchführt")} value={flaw} onChange={setFlaw} options={FLAW_IDS.map((k) => ({ id: k, label: FLAWS[k].label }))} />
        <Insight>{plain()}{f.reading}</Insight>
      </div>
      <div className="space-y-2">
        <svg viewBox="0 0 560 120" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
          <title id={`${uid}-t`}>{tt("How sure the test is: the range of uplifts the result is compatible with", "Wie sicher der Test ist: die Spanne der Uplifts, mit denen das Ergebnis vereinbar ist")}</title>
          <desc id={`${uid}-d`}>{tt(`With ${conv} deals in the group without the card, the uplift lies between ${num(lo)} and ${num(hi)} times.`, `Mit ${conv} Abschlüssen in der Gruppe ohne Karte liegt der Uplift zwischen dem ${num(lo)}- und dem ${num(hi)}-Fachen.`)}</desc>
          <line x1="40" y1="60" x2="520" y2="60" stroke={C.ash} />
          {[0.5, 1, 1.5, 2, 2.5, 3].map((v) => (
            <g key={v}>
              <line x1={X(v)} y1="55" x2={X(v)} y2="65" stroke={C.ash} />
              <text x={X(v)} y="84" textAnchor="middle" fontSize="11" fill={C.ash}>{`${num(v)}×`}</text>
            </g>
          ))}
          <line x1={zero} y1="20" x2={zero} y2="70" stroke={C.rust} strokeDasharray="4 3" />
          <text x={zero + 4} y="22" fontSize="10.5" fill={C.rust}>{tt("1× = no difference", "1× = kein Unterschied")}</text>
          <defs>
            <pattern id={`${uid}-h`} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="8" stroke={C.gold} strokeWidth="2" />
            </pattern>
          </defs>
          {story.step === 2 && <rect x={X(Math.max(lo, 0.5)) - 4} y="42" width={Math.max(2, X(Math.min(hi, 3)) - X(Math.max(lo, 0.5))) + 8} height="36" rx="5" fill="none" stroke={C.amber} strokeWidth="2" strokeDasharray="5 4" className="anim-pulse" />}
          <rect x={X(Math.max(lo, 0.5))} y="48" width={Math.max(2, X(Math.min(hi, 3)) - X(Math.max(lo, 0.5)))} height="24" fill={proven ? C.tealSoft : `url(#${uid}-h)`} stroke={proven ? C.teal : C.amber} />
          <circle cx={X(ratio)} cy="60" r="6" fill={C.data} stroke={C.ink} />
          <text x="40" y="110" fontSize="11.5" fill={C.ink}>{tt(`measured: 1.5× · plausible range ${num(lo)}× to ${num(hi)}×`, `gemessen: 1,5× · plausible Spanne ${num(lo)}× bis ${num(hi)}×`)}</text>
        </svg>
        <label htmlFor={`${uid}-c`} className="smallcaps block">
          {tt(`Deals in the group without the card: ${conv} (the card group has 1.5 times as many)`, `Abschlüsse in der Gruppe ohne Karte: ${conv} (die Karten-Gruppe hat 1,5-mal so viele)`)}
        </label>
        <input id={`${uid}-c`} type="range" min={10} max={300} step={10} value={conv} onChange={(e) => setConv(Number(e.target.value))} className="w-full max-w-md accent-[#8A5A0B]" />
        <Insight>{plain()}
          {proven
            ? tt(`With ${conv} deals per group, even the low end of the range (${num(lo)}×) is above “no difference”: the uplift is real, though its size is still uncertain (up to ${num(hi)}×). Around 100 per group is where a 1.5× result becomes solid.`, `Mit ${conv} Abschlüssen pro Gruppe liegt selbst das untere Ende der Spanne (${num(lo)}×) über „kein Unterschied“: Der Uplift ist echt, auch wenn seine Größe noch unsicher ist (bis ${num(hi)}×). Um 100 pro Gruppe wird ein Ergebnis von 1,5× belastbar.`)
            : tt(`With ${conv} deals per group, the same 1.5× could be anything from ${num(lo)}× to ${num(hi)}×, and the range still includes “no difference” (hatched). Promising, not proven: keep the test running, however good the dashboard looks.`, `Mit ${conv} Abschlüssen pro Gruppe könnte dasselbe 1,5× alles zwischen ${num(lo)}× und ${num(hi)}× sein, und die Spanne schließt „kein Unterschied“ noch ein (schraffiert). Vielversprechend, nicht bewiesen: Lassen Sie den Test weiterlaufen, egal wie gut das Dashboard aussieht.`)}
        </Insight>
      </div>
      <p className="text-caption text-ash">{tt("Illustration on Weser Systemhaus (Case assumption). The range is a standard approximation, shown so the effect of the sample size is visible; the task never asks you to compute it.", "Illustration mit Weser Systemhaus (Fallannahme). Die Spanne ist eine übliche Näherung, gezeigt, damit die Wirkung der Stichprobengröße sichtbar wird; die Aufgabe verlangt nie, sie zu berechnen.")}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ A7 · scoring: Weser's three measures */

type WM = { id: string; name: string; cost: number; joins: Joins; fea: 1 | 2 | 3; eff: 1 | 2 | 3; note: string };
const M_MEASURES: WM[] = bi([
  { id: "profile", name: t("Shared customer profile", "Gemeinsames Kundenprofil"), cost: 60000, joins: "all" as Joins, fea: 3 as const, eff: 3 as const, note: t("Every channel reads and writes it, so it removes the restart at every switch, and once built it serves every customer.", "Jeder Kanal liest und schreibt es, also beseitigt es den Neustart bei jedem Wechsel, und einmal gebaut dient es jedem Kunden.") },
  { id: "bot", name: t("Stand-alone chatbot on the website", "Allein stehender Chatbot auf der Website"), cost: 15000, joins: "none" as Joins, fea: 3 as const, eff: 2 as const, note: t("It answers at any hour and scales, but it knows nothing about orders or tickets, so every hand-over to a person starts from zero.", "Er antwortet zu jeder Zeit und skaliert, weiß aber nichts über Bestellungen oder Tickets, also beginnt jede Übergabe an einen Menschen bei null.") },
  { id: "am", name: t("A personal account manager for every customer", "Ein persönlicher Account Manager für jeden Kunden"), cost: 120000, joins: "one" as Joins, fea: 1 as const, eff: 2 as const, note: t("Personal and it uses the CRM, but it grows only with people's time and still leaves the website and support unconnected.", "Persönlich und es nutzt das CRM, aber es wächst nur mit Personenzeit und lässt Website und Support weiter unverbunden.") },
]);

export function ScoreExample() {
  const uid = useId().replace(/:/g, "");
  const [sel, setSelRaw] = useState("profile");
  const sc = (id: string) => {
    const x = M_MEASURES.find((y) => y.id === id)!;
    return explainBucket(bandOf(x.joins)) * x.eff * x.fea;
  };
  const story = useStory([
    {
      title: tt("Strong on all three", "Stark in allen dreien"),
      say: tt(`Weser Systemhaus is an example company, not your case. The shared customer profile scores ${sc("profile")}: every channel reads and writes it, it moves the result, and once built it serves every customer.`, `Weser Systemhaus ist ein Beispielunternehmen, nicht Ihr Fall. Das gemeinsame Kundenprofil erzielt ${sc("profile")}: Jeder Kanal liest und schreibt es, es bewegt das Ergebnis, und einmal gebaut dient es jedem Kunden.`),
      look: tt("the longest bar", "der längste Balken"),
      apply: () => {
        setSelRaw("profile");
      },
    },
    {
      title: tt("One weak factor", "Ein schwacher Faktor"),
      say: tt(`The stand-alone chatbot scores only ${sc("bot")}: it answers at any hour but connects to nothing, so every hand-over to a person starts from zero. One weak factor, here integration, pulls the product down.`, `Der allein stehende Chatbot erzielt nur ${sc("bot")}: Er antwortet zu jeder Zeit, ist aber mit nichts verbunden, also beginnt jede Übergabe an einen Menschen bei null. Ein schwacher Faktor, hier die Integration, zieht das Produkt herunter.`),
      look: tt("the short bar, and its three parts in “What this shows”", "der kurze Balken und seine drei Teile in „Was das zeigt“"),
      apply: () => {
        setSelRaw("bot");
      },
    },
    {
      title: tt("The point", "Das Wichtigste"),
      say: tt(`Multiply integration, effect and scalability. Integration is read from what the measure connects to, never guessed. Choose a measure to read its three parts.`, `Multiplizieren Sie Integration, Wirkung und Skalierbarkeit. Die Integration wird daraus gelesen, womit die Maßnahme verbunden ist, nie geschätzt. Wählen Sie eine Maßnahme, um ihre drei Teile zu lesen.`),
      look: tt("the personal account managers: personal, but they grow only with people's time", "die persönlichen Account Manager: persönlich, aber sie wachsen nur mit Personenzeit"),
      apply: () => {
        setSelRaw("am");
      },
    },
  ]);
  const setSel = (v: string) => {
    story.leave();
    setSelRaw(v);
  };
  const m = M_MEASURES.find((x) => x.id === sel)!;
  const e = explainBucket(bandOf(m.joins));
  const score = e * m.eff * m.fea;
  return (
    <div className="space-y-3">
      <ThePoint>{tt("Score a measure on three questions: does it connect the channels, how much does it move the result, and does it reach every customer at no extra cost? The three scores are multiplied, so one weak answer lowers the whole.", "Bewerten Sie eine Maßnahme nach drei Fragen: Verbindet sie die Kanäle, wie stark bewegt sie das Ergebnis, und erreicht sie jeden Kunden ohne Zusatzkosten? Die drei Werte werden multipliziert, also senkt eine schwache Antwort das Ganze.")}</ThePoint>
      <Story steps={story.plan} step={story.step} onStep={story.go} />
      <svg viewBox="0 0 560 130" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{tt("Weser's three measures scored: integration × effect × scalability", "Wesers drei Maßnahmen bewertet: Integration × Wirkung × Skalierbarkeit")}</title>
        <desc id={`${uid}-d`}>{M_MEASURES.map((x) => `${x.name}: ${explainBucket(bandOf(x.joins)) * x.eff * x.fea}`).join("; ")}</desc>
        {M_MEASURES.map((x, i) => {
          const s = explainBucket(bandOf(x.joins)) * x.eff * x.fea;
          const y = 12 + i * 38;
          const on = x.id === sel;
          return (
            <g key={x.id} className="hit" role="button" tabIndex={0} aria-label={x.name} onClick={() => setSel(x.id)} onKeyDown={(ev) => (ev.key === "Enter" || ev.key === " ") && setSel(x.id)}>
              {on && story.step !== null && <rect x="-4" y={y - 4} width="556" height="32" rx="7" fill="none" stroke={C.amber} strokeWidth="2" strokeDasharray="5 4" className="anim-pulse" />}
              <text x="0" y={y + 17} fontSize="12" fontWeight={on ? 700 : 400} fill={C.ink}>{x.name}</text>
              <rect className="hit-shape" x="300" y={y} width={(s / 27) * 220} height="24" fill={on ? C.gold : C.data} stroke={C.ink} />
              <text x={306 + (s / 27) * 220} y={y + 17} fontSize="12.5" fontWeight="700" fill={C.ink}>{s}</text>
            </g>
          );
        })}
      </svg>
      <Toggles<string> label={tt("Measure", "Maßnahme")} value={sel} onChange={setSel} options={M_MEASURES.map((x) => ({ id: x.id, label: x.name }))} />
      <Insight>{plain()}
        {tt(
          `${m.name} (${euro(m.cost)}, connects to ${JOINS_LABEL[m.joins]}): integration ${e} × effect ${m.eff} × scalability ${m.fea} = ${score}. ${m.note}`,
          `${m.name} (${euro(m.cost)}, verbunden mit ${JOINS_LABEL[m.joins]}): Integration ${e} × Wirkung ${m.eff} × Skalierbarkeit ${m.fea} = ${score}. ${m.note}`,
        )}
      </Insight>
    </div>
  );
}
