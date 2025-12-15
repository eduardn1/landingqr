/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * QRCODESTUDIOJEM - Guides Page
 * Tutorial e guide organizzate per livello con link alla demo interattiva
 * 
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * Web Development & Digital Solutions
 * 
 * © 2024 StudioJEM - Tutti i diritti riservati
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { useState, memo } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  Clock,
  ExternalLink,
  Filter,
  GraduationCap,
  MessageCircle,
  Play,
  Rocket,
  Sparkles,
  Star,
  Trophy,
  Zap,
  UtensilsCrossed,
  ShoppingBag,
  Calendar,
  Users,
  Gift,
  BarChart3,
  Settings,
  Bell,
  Truck,
  Languages,
  Palette,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type DifficultyLevel = "base" | "intermedio" | "avanzato" | "all";

interface Guide {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: "base" | "intermedio" | "avanzato";
  icon: LucideIcon;
  demoSection: string;
  steps: string[];
  gradient: string;
  popular?: boolean;
}

const levelConfig = {
  base: {
    label: "Base",
    icon: Sparkles,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
    description: "Perfetto per iniziare. Impara le funzionalità essenziali.",
  },
  intermedio: {
    label: "Intermedio",
    icon: Zap,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    description: "Approfondisci le funzionalità e ottimizza il tuo workflow.",
  },
  avanzato: {
    label: "Avanzato",
    icon: Trophy,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    description: "Sblocca tutto il potenziale con le funzioni avanzate.",
  },
};

const guides: Guide[] = [
  // BASE
  {
    id: "primo-menu",
    title: "Crea il tuo primo menu",
    description: "Impara ad aggiungere piatti, categorie e prezzi. Il primo passo per digitalizzare il tuo locale.",
    duration: "5 min",
    level: "base",
    icon: UtensilsCrossed,
    demoSection: "menu",
    steps: [
      "Accedi alla sezione Menu",
      "Crea le categorie (Antipasti, Primi, ecc.)",
      "Aggiungi i piatti con nome, prezzo e descrizione",
      "Carica le foto dei piatti",
      "Pubblica il menu",
    ],
    gradient: "from-violet-500 to-purple-600",
    popular: true,
  },
  {
    id: "gestione-ordini",
    title: "Gestire gli ordini",
    description: "Come ricevere, confermare e gestire gli ordini dei clienti in tempo reale.",
    duration: "4 min",
    level: "base",
    icon: ShoppingBag,
    demoSection: "orders",
    steps: [
      "Visualizza gli ordini in arrivo",
      "Conferma o modifica un ordine",
      "Cambia lo stato (In preparazione, Pronto, ecc.)",
      "Gestisci le notifiche al cliente",
    ],
    gradient: "from-orange-500 to-red-500",
  },
  {
    id: "prenotazioni-base",
    title: "Prenotazioni tavoli",
    description: "Configura il sistema di prenotazioni e gestisci le richieste dei clienti.",
    duration: "5 min",
    level: "base",
    icon: Calendar,
    demoSection: "reservations",
    steps: [
      "Imposta gli orari di apertura",
      "Configura il numero di tavoli e coperti",
      "Ricevi e conferma le prenotazioni",
      "Gestisci le cancellazioni",
    ],
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    id: "impostazioni-locale",
    title: "Configura il tuo locale",
    description: "Personalizza le informazioni del tuo locale: nome, logo, orari, contatti.",
    duration: "3 min",
    level: "base",
    icon: Settings,
    demoSection: "settings",
    steps: [
      "Inserisci il nome e descrizione",
      "Carica il logo",
      "Imposta gli orari di apertura",
      "Aggiungi i contatti e social",
    ],
    gradient: "from-slate-500 to-gray-600",
  },

  // INTERMEDIO
  {
    id: "allergeni-traduzioni",
    title: "Allergeni e traduzioni",
    description: "Configura i 14 allergeni obbligatori e attiva le traduzioni automatiche in 5 lingue.",
    duration: "6 min",
    level: "intermedio",
    icon: Filter,
    demoSection: "menu",
    steps: [
      "Accedi alla gestione allergeni",
      "Assegna gli allergeni a ogni piatto",
      "Attiva la traduzione automatica AI",
      "Verifica e modifica le traduzioni",
      "Testa la visualizzazione multi-lingua",
    ],
    gradient: "from-cyan-500 to-blue-600",
    popular: true,
  },
  {
    id: "delivery-driver",
    title: "Delivery e tracking GPS",
    description: "Configura le zone di consegna, assegna i driver e monitora le consegne in tempo reale.",
    duration: "8 min",
    level: "intermedio",
    icon: Truck,
    demoSection: "delivery",
    steps: [
      "Definisci le zone di consegna",
      "Imposta i costi per zona",
      "Aggiungi i driver",
      "Assegna le consegne",
      "Monitora il tracking GPS live",
    ],
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    id: "clienti-crm",
    title: "CRM e gestione clienti",
    description: "Visualizza lo storico ordini dei clienti, aggiungi note e gestisci i contatti.",
    duration: "5 min",
    level: "intermedio",
    icon: Users,
    demoSection: "customers",
    steps: [
      "Accedi alla lista clienti",
      "Visualizza lo storico ordini",
      "Aggiungi note e preferenze",
      "Invia offerte personalizzate",
    ],
    gradient: "from-pink-500 to-rose-600",
  },
  {
    id: "notifiche-whatsapp",
    title: "Notifiche WhatsApp",
    description: "Configura le notifiche automatiche via WhatsApp per ordini e prenotazioni.",
    duration: "4 min",
    level: "intermedio",
    icon: Bell,
    demoSection: "notifications",
    steps: [
      "Collega il numero WhatsApp Business",
      "Configura i template messaggi",
      "Attiva le notifiche automatiche",
      "Testa l'invio",
    ],
    gradient: "from-green-500 to-emerald-600",
  },

  // AVANZATO
  {
    id: "loyalty-gamification",
    title: "Loyalty e gamification",
    description: "Crea un programma fedeltà con punti, livelli, badge e sfide per fidelizzare i clienti.",
    duration: "10 min",
    level: "avanzato",
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
    gradient: "from-amber-500 to-orange-600",
    popular: true,
  },
  {
    id: "promo-stories",
    title: "Promozioni e Stories",
    description: "Crea codici sconto, flash sales e stories stile Instagram per promuovere il tuo locale.",
    duration: "7 min",
    level: "avanzato",
    icon: Gift,
    demoSection: "promo",
    steps: [
      "Crea un codice sconto",
      "Imposta una flash sale a tempo",
      "Crea una story con immagine/video",
      "Programma la pubblicazione",
      "Monitora le performance",
    ],
    gradient: "from-fuchsia-500 to-pink-600",
  },
  {
    id: "analytics-avanzati",
    title: "Analytics e report",
    description: "Analizza fatturato, piatti più venduti, orari di punta e genera report dettagliati.",
    duration: "8 min",
    level: "avanzato",
    icon: BarChart3,
    demoSection: "analytics",
    steps: [
      "Esplora la dashboard analytics",
      "Analizza i trend di fatturato",
      "Identifica i piatti top seller",
      "Scopri gli orari di punta",
      "Esporta i report",
    ],
    gradient: "from-indigo-500 to-violet-600",
  },
  {
    id: "temi-personalizzazione",
    title: "Temi e branding",
    description: "Personalizza completamente l'aspetto del menu: colori, font, layout e template.",
    duration: "6 min",
    level: "avanzato",
    icon: Palette,
    demoSection: "templates",
    steps: [
      "Scegli tra i 6 template premium",
      "Personalizza i colori brand",
      "Modifica font e stili",
      "Aggiungi elementi custom",
      "Anteprima e pubblica",
    ],
    gradient: "from-rose-500 to-red-600",
  },
];

const GuideCard = memo(({ guide }: { guide: Guide }) => {
  const Icon = guide.icon;
  const levelInfo = levelConfig[guide.level];
  const LevelIcon = levelInfo.icon;

  return (
    <div className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300">
      {/* Popular badge */}
      {guide.popular && (
        <div className="absolute top-3 right-3 z-10">
          <Badge className="bg-primary text-primary-foreground text-[10px] gap-1">
            <Star className="w-3 h-3" />
            Popolare
          </Badge>
        </div>
      )}

      {/* Header with gradient */}
      <div className={`relative p-5 bg-gradient-to-br ${guide.gradient}`}>
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 flex items-start justify-between">
          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm">
            <Clock className="w-3.5 h-3.5 text-white" />
            <span className="text-xs font-medium text-white">{guide.duration}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Level badge */}
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${levelInfo.bgColor} ${levelInfo.borderColor} border mb-3`}>
          <LevelIcon className={`w-3.5 h-3.5 ${levelInfo.color}`} />
          <span className={`text-xs font-medium ${levelInfo.color}`}>{levelInfo.label}</span>
        </div>

        <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
          {guide.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {guide.description}
        </p>

        {/* Steps preview */}
        <div className="space-y-1.5 mb-5">
          {guide.steps.slice(0, 3).map((step, index) => (
            <div key={index} className="flex items-start gap-2 text-xs text-muted-foreground">
              <div className="w-4 h-4 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[10px] font-semibold">{index + 1}</span>
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
        <Link to={`/demo?skip=true&section=${guide.demoSection}`}>
          <Button className="w-full gradient-button gap-2 group/btn">
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
  const [activeLevel, setActiveLevel] = useState<DifficultyLevel>("all");

  const filteredGuides = activeLevel === "all" 
    ? guides 
    : guides.filter(g => g.level === activeLevel);

  const groupedGuides = {
    base: filteredGuides.filter(g => g.level === "base"),
    intermedio: filteredGuides.filter(g => g.level === "intermedio"),
    avanzato: filteredGuides.filter(g => g.level === "avanzato"),
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <ArrowLeft className="w-4 h-4 text-primary" />
            </div>
            <span className="font-medium text-foreground">Torna alla home</span>
          </Link>
          
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <span className="font-bold text-lg text-foreground">Flavour</span>
          </Link>
        </div>
      </header>

      <main className="py-12 md:py-16">
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
              Impara Flavour
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Tutorial passo-passo per sfruttare al massimo tutte le funzionalità. 
              Ogni guida include un link diretto alla demo interattiva.
            </p>

            {/* Quick stats */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
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

          {/* Level Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <button
              onClick={() => setActiveLevel("all")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeLevel === "all"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Tutte le guide
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeLevel === "all" ? "bg-white/20" : "bg-muted"}`}>
                {guides.length}
              </span>
            </button>
            {(Object.keys(levelConfig) as Array<keyof typeof levelConfig>).map((level) => {
              const config = levelConfig[level];
              const Icon = config.icon;
              const count = guides.filter(g => g.level === level).length;
              
              return (
                <button
                  key={level}
                  onClick={() => setActiveLevel(level)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeLevel === level
                      ? `${config.bgColor} ${config.color} border ${config.borderColor}`
                      : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {config.label}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeLevel === level ? "bg-white/20" : "bg-muted"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Guides by Level */}
          {activeLevel === "all" ? (
            // Show all grouped by level
            <div className="space-y-12">
              {(Object.keys(levelConfig) as Array<keyof typeof levelConfig>).map((level) => {
                const config = levelConfig[level];
                const Icon = config.icon;
                const levelGuides = groupedGuides[level];
                
                if (levelGuides.length === 0) return null;
                
                return (
                  <div key={level}>
                    {/* Level Header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-10 h-10 rounded-xl ${config.bgColor} flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${config.color}`} />
                      </div>
                      <div>
                        <h2 className="font-bold text-xl text-foreground">{config.label}</h2>
                        <p className="text-sm text-muted-foreground">{config.description}</p>
                      </div>
                    </div>

                    {/* Guides Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                      {levelGuides.map((guide) => (
                        <GuideCard key={guide.id} guide={guide} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            // Show filtered guides
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredGuides.map((guide) => (
                <GuideCard key={guide.id} guide={guide} />
              ))}
            </div>
          )}

          {/* Help CTA */}
          <div className="mt-16">
            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-primary/10 via-card to-accent/5 border border-primary/20 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">
                    Hai bisogno di aiuto?
                  </h3>
                  <p className="text-muted-foreground">
                    Il nostro team è pronto ad assisterti via WhatsApp
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to="/faq">
                    <Button variant="outline" className="gap-2 rounded-xl">
                      Vedi FAQ
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </Link>
                  <a
                    href="https://wa.me/393533811359"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="gradient-button gap-2 rounded-xl">
                      <MessageCircle className="w-4 h-4" />
                      Contattaci
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-border py-8 bg-muted/30">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Flavour. Tutti i diritti riservati.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default GuidesPage;