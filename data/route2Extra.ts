import type { ArchId, KpiId } from "@/data/route2";
import { bi, t } from "@/lib/lang";

/**
 * What the Step A item cards of Route 2 print besides the panel's own facts (CLAUDE.md #47, #46): one line of a normal day at OmniTech with
 * the item in use, who does what and what changes for the customer. Case assumptions, like every other figure of Route 2.
 */
export type ArchExtra = { scene: string };

export const ARCH_EXTRA: Record<ArchId, ArchExtra> = bi({
  foundation: {
    scene: t(
      "A sales rep opens a customer's profile before a call and sees the web shop orders, the open service tickets and the last contact in one place. Before, each system showed one slice and the customer was asked everything again.",
      "Ein Vertriebsmitarbeiter öffnet vor einem Anruf das Profil eines Kunden und sieht die Webshop-Bestellungen, die offenen Service-Tickets und den letzten Kontakt an einem Ort. Vorher zeigte jedes System eine Scheibe, und der Kunde wurde alles neu gefragt.",
    ),
  },
  chat: {
    scene: t(
      "A web form request is handed to sales with the form attached, a named person calls within four working hours, and the customer does not have to repeat what they wrote.",
      "Eine Webformular-Anfrage wird mit angehängtem Formular an den Vertrieb übergeben, eine benannte Person ruft innerhalb von vier Arbeitsstunden an, und der Kunde muss nicht wiederholen, was er geschrieben hat.",
    ),
  },
  personal: {
    scene: t(
      "A customer asks the chatbot when the service contract ends. It reads the contract and answers; when it cannot, it hands over with the conversation attached.",
      "Ein Kunde fragt den Chatbot, wann der Servicevertrag endet. Er liest den Vertrag und antwortet; wenn er es nicht kann, übergibt er mit angehängtem Gesprächsverlauf.",
    ),
  },
  routing: {
    scene: t(
      "Every Monday an account manager gets a list of customers likely to renew, buy more or leave, with the reasons shown, and calls the customers at risk first.",
      "Jeden Montag erhält ein Account Manager eine Liste der Kunden, die wahrscheinlich verlängern, mehr kaufen oder gehen, mit sichtbaren Gründen, und ruft zuerst die gefährdeten Kunden an.",
    ),
  },
  training: {
    scene: t(
      "In a half-day session a salesperson and a service agent each open the profile, take over a case with its history and quote the same price list. The customer meets two people who know the same facts.",
      "In einer halbtägigen Einheit öffnen ein Vertriebsmitarbeiter und ein Service-Mitarbeiter jeweils das Profil, übernehmen einen Fall mit seiner Historie und nennen dieselbe Preisliste. Der Kunde trifft zwei Menschen, die dieselben Fakten kennen.",
    ),
  },
  tracking: {
    scene: t(
      "The website, the shop, the chat and sales all read one price list and one set of service promises. A customer who asks in two channels gets the same answer in both.",
      "Website, Shop, Chat und Vertrieb lesen dieselbe Preisliste und denselben Satz von Servicezusagen. Ein Kunde, der in zwei Kanälen fragt, bekommt in beiden dieselbe Antwort.",
    ),
  },
  suite: {
    scene: t(
      "A vendor suite replaces the systems and decides offers and answers by itself, with no rules shown. Two customers with the same question get different answers and nobody at OmniTech can say why.",
      "Eine Anbieter-Suite ersetzt die Systeme und entscheidet Angebote und Antworten selbst, ohne dass Regeln gezeigt werden. Zwei Kunden mit derselben Frage bekommen verschiedene Antworten, und niemand bei OmniTech kann sagen, warum.",
    ),
  },
  relaunch: {
    scene: t(
      "A customer installs the new app and sees news, the catalogue and a contact form. The form is not connected to the CRM, so sales never sees what the customer wrote.",
      "Ein Kunde installiert die neue App und sieht Neuigkeiten, den Katalog und ein Kontaktformular. Das Formular ist nicht mit dem CRM verbunden, also sieht der Vertrieb nie, was der Kunde geschrieben hat.",
    ),
  },
});

/** The aim printed beside each customer KPI in "the numbers today" (the figure Step B's "what I watch" sentence can quote). */
export const KPI_AIM: Partial<Record<KpiId, number>> = { conv: 25, engage: 15 };
