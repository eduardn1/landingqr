/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * QRCODESTUDIOJEM - Guides Page (Monochrome + Colored Accents)
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { memo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, BookOpen, Clock, GraduationCap, Play, Rocket, Star, UtensilsCrossed, ShoppingBag, Calendar, Users, Gift, BarChart3, Settings, Bell, Truck, Filter, Palette, Trophy } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SharedNavbar from "@/components/shared/SharedNavbar";

interface Guide {
  id: string; title: string; description: string; duration: string; icon: LucideIcon; demoSection: string; steps: string[]; popular?: boolean;
}

const guides: Guide[] = [
  { id: "primo-menu", title: "Crea il tuo primo menu", description: "Impara ad aggiungere piatti, categorie e prezzi.", duration: "5 min", icon: UtensilsCrossed, demoSection: "menu", steps: ["Accedi alla sezione Menu", "Crea le categorie", "Aggiungi i piatti", "Carica le foto", "Pubblica"], popular: true },
  { id: "gestione-ordini", title: "Gestire gli ordini", description: "Come ricevere e gestire gli ordini in tempo reale.", duration: "4 min", icon: ShoppingBag, demoSection: "orders", steps: ["Visualizza ordini", "Conferma o modifica", "Cambia stato", "Notifiche"] },
  { id: "prenotazioni-base", title: "Prenotazioni tavoli", description: "Configura il sistema di prenotazioni.", duration: "5 min", icon: Calendar, demoSection: "reservations", steps: ["Imposta orari", "Configura tavoli", "Gestisci richieste", "Cancellazioni"] },
  { id: "impostazioni-locale", title: "Configura il tuo locale", description: "Personalizza nome, logo, orari, contatti.", duration: "3 min", icon: Settings, demoSection: "settings", steps: ["Nome e descrizione", "Carica logo", "Orari apertura", "Contatti"] },
  { id: "allergeni-traduzioni", title: "Allergeni e traduzioni", description: "Configura allergeni e traduzioni automatiche.", duration: "6 min", icon: Filter, demoSection: "menu", steps: ["Gestione allergeni", "Assegna allergeni", "Traduzione AI", "Verifica", "Test"], popular: true },
  { id: "delivery-driver", title: "Delivery e tracking GPS", description: "Zone di consegna, driver e tracking.", duration: "8 min", icon: Truck, demoSection: "delivery", steps: ["Zone consegna", "Costi zona", "Aggiungi driver", "Assegna", "Tracking"] },
  { id: "clienti-crm", title: "CRM e gestione clienti", description: "Storico ordini, note e contatti.", duration: "5 min", icon: Users, demoSection: "customers", steps: ["Lista clienti", "Storico ordini", "Note", "Offerte"] },
  { id: "notifiche-whatsapp", title: "Notifiche WhatsApp", description: "Notifiche automatiche via WhatsApp.", duration: "4 min", icon: Bell, demoSection: "notifications", steps: ["Collega WhatsApp", "Template", "Attiva", "Test"] },
  { id: "loyalty-gamification", title: "Loyalty e gamification", description: "Programma fedeltà con punti e sfide.", duration: "10 min", icon: Trophy, demoSection: "loyalty", steps: ["Sistema punti", "Livelli", "Premi", "Badge", "Gamification", "Referral"], popular: true },
  { id: "promo-stories", title: "Promozioni e Stories", description: "Codici sconto e stories Instagram-style.", duration: "7 min", icon: Gift, demoSection: "promo", steps: ["Codice sconto", "Flash sale", "Story", "Programma", "Monitor"] },
  { id: "analytics-avanzati", title: "Analytics e report", description: "Fatturato, piatti top, report.", duration: "8 min", icon: BarChart3, demoSection: "analytics", steps: ["Dashboard", "Trend", "Top seller", "Orari", "Export"] },
  { id: "temi-personalizzazione", title: "Temi e branding", description: "Colori, font, layout e template.", duration: "6 min", icon: Palette, demoSection: "templates", steps: ["Template", "Colori", "Font", "Custom", "Pubblica"] },
];

const GuideCard = memo(({ guide }: { guide: Guide }) => {
  const Icon = guide.icon;
  return (
    <div id={`guide-${guide.id}`} className="group relative bg-foreground-05 border border-foreground-10 rounded-xl overflow-hidden hover:border-foreground-20 transition-all duration-300">
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-foreground-10 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
              <Icon className="w-5 h-5 text-foreground-50 group-hover:text-primary transition-colors" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground group-hover:text-foreground transition-colors line-clamp-1">{guide.title}</h3>
              <div className="flex items-center gap-2 mt-0.5">
                <Clock className="w-3 h-3 text-foreground-50" />
                <span className="text-xs text-foreground-50">{guide.duration}</span>
              </div>
            </div>
          </div>
          {guide.popular && (
            <Badge variant="secondary" className="text-[10px] gap-1 shrink-0 bg-primary/10 text-primary border-primary/20">
              <Star className="w-3 h-3" />Popolare
            </Badge>
          )}
        </div>
        <p className="text-sm text-foreground-50 mb-4 line-clamp-2">{guide.description}</p>
        <div className="space-y-1.5 mb-5">
          {guide.steps.slice(0, 3).map((step, index) => (
            <div key={index} className="flex items-start gap-2 text-xs text-foreground-50">
              <div className="w-4 h-4 rounded-full bg-foreground-10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[10px] font-medium">{index + 1}</span>
              </div>
              <span className="line-clamp-1">{step}</span>
            </div>
          ))}
          {guide.steps.length > 3 && <div className="text-xs text-foreground-30 pl-6">+{guide.steps.length - 3} altri step...</div>}
        </div>
        <Link to={`/demo?skip=true&section=${guide.demoSection}&from=guides&guideId=${guide.id}`}>
          <Button variant="outline" className="w-full gap-2 group/btn border-foreground-10 text-foreground-70 hover:text-foreground hover:border-foreground-20">
            <Play className="w-4 h-4" />Prova nella demo<ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
});
GuideCard.displayName = 'GuideCard';

const GuidesPage = () => {
  const [searchParams] = useSearchParams();
  const scrollToGuide = searchParams.get("scrollTo");

  useEffect(() => {
    if (scrollToGuide) {
      const element = document.getElementById(`guide-${scrollToGuide}`);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          element.classList.add("ring-2", "ring-primary", "ring-offset-2");
          setTimeout(() => element.classList.remove("ring-2", "ring-primary", "ring-offset-2"), 2000);
        }, 100);
      }
    }
  }, [scrollToGuide]);
  
  return (
    <div className="min-h-screen bg-background">
      <SharedNavbar />

      <main className="pt-20 pb-12 md:pt-24 md:pb-16">
        <div className="container">
          {/* Header - Monochrome text, colored badge */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Guide & Tutorial</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-foreground mb-4">Impara Flavour</h1>
            <p className="text-lg text-foreground-50 max-w-2xl mx-auto mb-8">Tutorial passo-passo per sfruttare tutte le funzionalità.</p>

            {/* Stats - Monochrome cards */}
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-foreground-05 border border-foreground-10">
                <GraduationCap className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">{guides.length} guide</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-foreground-05 border border-foreground-10">
                <Clock className="w-4 h-4 text-foreground-50" />
                <span className="text-sm text-foreground-50">3-10 min ciascuna</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-foreground-05 border border-foreground-10">
                <Rocket className="w-4 h-4 text-foreground-50" />
                <span className="text-sm text-foreground-50">Demo interattiva inclusa</span>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {guides.map((guide) => <GuideCard key={guide.id} guide={guide} />)}
          </div>

          <div className="mt-16 text-center">
            <p className="text-foreground-50 mb-4">Hai bisogno di aiuto? Il nostro team è sempre disponibile.</p>
            <Link to="/contatti">
              <Button variant="outline" className="gap-2 border-foreground-10 text-foreground-70 hover:text-foreground">Contattaci<ArrowRight className="w-4 h-4" /></Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GuidesPage;