/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * QRCODESTUDIOJEM - Guides Page
 * Tutorial e guide con link alla demo interattiva
 * 
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * Web Development & Digital Solutions
 * 
 * © 2024 StudioJEM - Tutti i diritti riservati
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { memo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Clock,
  GraduationCap,
  Play,
  Rocket,
  Star,
  UtensilsCrossed,
  ShoppingBag,
  Calendar,
  Users,
  Gift,
  BarChart3,
  Settings,
  Bell,
  Truck,
  Filter,
  Palette,
  Trophy,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SharedNavbar from "@/components/shared/SharedNavbar";
import Footer from "@/components/landing/Footer";
import DynamicSEO from "@/components/DynamicSEO";

interface Guide {
  id: string;
  title: string;
  description: string;
  duration: string;
  icon: LucideIcon;
  demoSection: string;
  steps: string[];
  popular?: boolean;
}

const guides: Guide[] = [
  {
    id: "primo-menu",
    title: "Crea il tuo primo menu",
    description: "Impara ad aggiungere piatti, categorie e prezzi. Il primo passo per digitalizzare il tuo locale.",
    duration: "5 min",
    icon: UtensilsCrossed,
    demoSection: "menu",
    steps: [
      "Accedi alla sezione Menu",
      "Crea le categorie (Antipasti, Primi, ecc.)",
      "Aggiungi i piatti con nome, prezzo e descrizione",
      "Carica le foto dei piatti",
      "Pubblica il menu",
    ],
    popular: true,
  },
  {
    id: "gestione-ordini",
    title: "Gestire gli ordini",
    description: "Come ricevere, confermare e gestire gli ordini dei clienti in tempo reale.",
    duration: "4 min",
    icon: ShoppingBag,
    demoSection: "orders",
    steps: [
      "Visualizza gli ordini in arrivo",
      "Conferma o modifica un ordine",
      "Cambia lo stato (In preparazione, Pronto, ecc.)",
      "Gestisci le notifiche al cliente",
    ],
  },
  {
    id: "prenotazioni-base",
    title: "Prenotazioni tavoli",
    description: "Configura il sistema di prenotazioni e gestisci le richieste dei clienti.",
    duration: "5 min",
    icon: Calendar,
    demoSection: "reservations",
    steps: [
      "Imposta gli orari di apertura",
      "Configura il numero di tavoli e coperti",
      "Ricevi e conferma le prenotazioni",
      "Gestisci le cancellazioni",
    ],
  },
  {
    id: "impostazioni-locale",
    title: "Configura il tuo locale",
    description: "Personalizza le informazioni del tuo locale: nome, logo, orari, contatti.",
    duration: "3 min",
    icon: Settings,
    demoSection: "settings",
    steps: [
      "Inserisci il nome e descrizione",
      "Carica il logo",
      "Imposta gli orari di apertura",
      "Aggiungi i contatti e social",
    ],
  },
  {
    id: "allergeni-traduzioni",
    title: "Allergeni e traduzioni",
    description: "Configura i 14 allergeni obbligatori e attiva le traduzioni automatiche in 5 lingue.",
    duration: "6 min",
    icon: Filter,
    demoSection: "menu",
    steps: [
      "Accedi alla gestione allergeni",
      "Assegna gli allergeni a ogni piatto",
      "Attiva la traduzione automatica AI",
      "Verifica e modifica le traduzioni",
      "Testa la visualizzazione multi-lingua",
    ],
    popular: true,
  },
  {
    id: "delivery-driver",
    title: "Delivery e tracking GPS",
    description: "Configura le zone di consegna, assegna i driver e monitora le consegne in tempo reale.",
    duration: "8 min",
    icon: Truck,
    demoSection: "delivery",
    steps: [
      "Definisci le zone di consegna",
      "Imposta i costi per zona",
      "Aggiungi i driver",
      "Assegna le consegne",
      "Monitora il tracking GPS live",
    ],
  },
  {
    id: "clienti-crm",
    title: "CRM e gestione clienti",
    description: "Visualizza lo storico ordini dei clienti, aggiungi note e gestisci i contatti.",
    duration: "5 min",
    icon: Users,
    demoSection: "customers",
    steps: [
      "Accedi alla lista clienti",
      "Visualizza lo storico ordini",
      "Aggiungi note e preferenze",
      "Invia offerte personalizzate",
    ],
  },
  {
    id: "notifiche-whatsapp",
    title: "Notifiche WhatsApp",
    description: "Configura le notifiche automatiche via WhatsApp per ordini e prenotazioni.",
    duration: "4 min",
    icon: Bell,
    demoSection: "notifications",
    steps: [
      "Collega il numero WhatsApp Business",
      "Configura i template messaggi",
      "Attiva le notifiche automatiche",
      "Testa l'invio",
    ],
  },
  {
    id: "loyalty-gamification",
    title: "Loyalty e gamification",
    description: "Crea un programma fedeltà con punti, livelli, badge e sfide per fidelizzare i clienti.",
    duration: "10 min",
    icon: Trophy,
    demoSection: "loyalty",
    steps: [
      "Configura il sistema punti",
      "Crea i livelli (Bronze, Silver, Gold)",
      "Definisci i premi riscattabili",
      "Attiva i badge e le sfide",
      "Configura la gamification (confetti, animazioni)",
      "Imposta il referral program",
    ],
    popular: true,
  },
  {
    id: "promo-stories",
    title: "Promozioni e Stories",
    description: "Crea codici sconto, flash sales e stories stile Instagram per promuovere il tuo locale.",
    duration: "7 min",
    icon: Gift,
    demoSection: "promo",
    steps: [
      "Crea un codice sconto",
      "Imposta una flash sale a tempo",
      "Crea una story con immagine/video",
      "Programma la pubblicazione",
      "Monitora le performance",
    ],
  },
  {
    id: "analytics-avanzati",
    title: "Analytics e report",
    description: "Analizza fatturato, piatti più venduti, orari di punta e genera report dettagliati.",
    duration: "8 min",
    icon: BarChart3,
    demoSection: "analytics",
    steps: [
      "Esplora la dashboard analytics",
      "Analizza i trend di fatturato",
      "Identifica i piatti top seller",
      "Scopri gli orari di punta",
      "Esporta i report",
    ],
  },
  {
    id: "temi-personalizzazione",
    title: "Temi e branding",
    description: "Personalizza completamente l'aspetto del menu: colori, font, layout e template.",
    duration: "6 min",
    icon: Palette,
    demoSection: "templates",
    steps: [
      "Scegli tra i 6 template premium",
      "Personalizza i colori brand",
      "Modifica font e stili",
      "Aggiungi elementi custom",
      "Anteprima e pubblica",
    ],
  },
];

const GuideCard = memo(({ guide }: { guide: Guide }) => {
  const Icon = guide.icon;

  return (
    <div id={`guide-${guide.id}`} className="group relative bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
      {/* Content */}
      <div className="p-5">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
              <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                {guide.title}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <Clock className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{guide.duration}</span>
              </div>
            </div>
          </div>
          {guide.popular && (
            <Badge variant="secondary" className="text-[10px] gap-1 shrink-0">
              <Star className="w-3 h-3" />
              Popolare
            </Badge>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {guide.description}
        </p>

        {/* Steps preview */}
        <div className="space-y-1.5 mb-5">
          {guide.steps.slice(0, 3).map((step, index) => (
            <div key={index} className="flex items-start gap-2 text-xs text-muted-foreground">
              <div className="w-4 h-4 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[10px] font-medium">{index + 1}</span>
              </div>
              <span className="line-clamp-1">{step}</span>
            </div>
          ))}
          {guide.steps.length > 3 && (
            <div className="text-xs text-muted-foreground pl-6">
              +{guide.steps.length - 3} altri step...
            </div>
          )}
        </div>

        {/* CTA */}
        <Link to={`/demo?skip=true&section=${guide.demoSection}&from=guides&guideId=${guide.id}`}>
          <Button variant="outline" className="w-full gap-2 group/btn">
            <Play className="w-4 h-4" />
            Prova nella demo
            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
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
          setTimeout(() => {
            element.classList.remove("ring-2", "ring-primary", "ring-offset-2");
          }, 2000);
        }, 100);
      }
    }
  }, [scrollToGuide]);
  
  return (
    <div className="min-h-screen bg-background">
      <DynamicSEO />
      {/* Dynamic Island Navigation */}
      <SharedNavbar />

      <main className="pt-20 pb-12 md:pt-24 md:pb-16">
        <div className="container">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">
                Guide & Tutorial
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-foreground mb-4">
              Impara Nestify
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Tutorial passo-passo per sfruttare al massimo tutte le funzionalità. 
              Ogni guida include un link diretto alla demo interattiva.
            </p>

            {/* Quick stats */}
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
                <GraduationCap className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">{guides.length} guide</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">3-10 min ciascuna</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
                <Rocket className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Demo interattiva inclusa</span>
              </div>
            </div>
          </div>

          {/* Guides Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {guides.map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-4">
              Hai bisogno di aiuto? Il nostro team è sempre disponibile.
            </p>
            <Link to="/#contact">
              <Button variant="outline" className="gap-2">
                Contattaci
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default GuidesPage;
