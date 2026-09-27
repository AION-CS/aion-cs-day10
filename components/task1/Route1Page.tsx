"use client";

import { SectionRail } from "@/components/chrome/SectionRail";
import { PageNav } from "@/components/chrome/PageNav";
import { HashFlash } from "@/components/chrome/HashFlash";
import { SuggestedOrderBanner } from "@/components/ui/Banner";
import { MateriA } from "@/components/materi/Materi";
import { Task1 } from "@/components/task1/Task1";
import { ResetRoute } from "@/components/ui/ResetRoute";
import { tt } from "@/lib/lang";

export function Route1Page() {
  return (
    <div className="space-y-8 pt-4">
      <HashFlash />
      <header className="space-y-1">
        <p className="smallcaps text-accent">{tt("Route 1 · Levels 1 and 2 · Knowledge and application", "Route 1 · Level 1 und 2 · Wissen und Anwendung")}</p>
        <h1>{tt("Seamless customer experiences: connect the channels, recognise the customer, and measure across channels", "Nahtlose Kundenerlebnisse: Kanäle verbinden, den Kunden wiedererkennen und kanalübergreifend messen")}</h1>
      </header>
      <SuggestedOrderBanner
        routeKey="r1"
        text={tt("Materi A → the Omnichannel Analysis task, one case in two parts (Understand the omnichannel experience, Make it measurable and choose). Every section stays open, so you can start anywhere.", "Materi A → die Aufgabe Omnichannel Analysis, ein Fall in zwei Teilen (Das Omnichannel-Erlebnis verstehen, Messbar machen und auswählen). Jeder Abschnitt bleibt offen, Sie können überall beginnen.")}
      />
      <SectionRail route={1} />
      <PageNav route={1} />
      <MateriA />
      <Task1 />
      <ResetRoute route={1} />
    </div>
  );
}
