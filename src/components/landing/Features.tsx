/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * QRCODESTUDIOJEM - Features Section (Static/Subtle Animations)
 * 
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * Web Development & Digital Solutions
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { useState, memo, useRef, useCallback } from "react";
import { 
  UtensilsCrossed,
  Calendar, 
  ShoppingBag, 
  BarChart3,
  Languages,
  Palette,
  MessageCircle,
  Heart,
  Instagram,
  Smartphone,
  Gift,
  Bell,
  Trophy,
  Sparkles,
  Check,
  ArrowRight,
  Zap,
  Users,
  Filter,
  Truck,
  MapPin,
  QrCode,
  Star,
  Gamepad2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

interface HeroFeature {
  id: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  gradient: string;
  stat: string;
  statLabel: string;
}

interface CategoryFeature {
  icon: LucideIcon;
  title: string;
  desc: string;
}

interface FeatureCategory {
  id: string;
  label: string;
  icon: LucideIcon;
  features: CategoryFeature[];
}

const heroFeatures: HeroFeature[] = [
  {
    id: "menu-allergeni",
    icon: UtensilsCrossed,
    title: "Menu & Allergeni",
    subtitle: "Gestione piatti completa con filtri allergeni",
    description: "Editor drag & drop per piatti, categorie, prezzi. 14 allergeni con badge visibili. Traduzioni automatiche in 5 lingue.",
    benefits: ["Editor drag & drop", "14 filtri allergeni", "5 lingue AI", "Import Excel"],
    gradient: "from-emerald-500/70 to-teal-600/70",
    stat: "∞",
    statLabel: "Piatti"
  },
  {
    id: "ordini-delivery",
    icon: ShoppingBag,
    title: "Ordini & Delivery",
    subtitle: "Zero commissioni. Tracking GPS real-time.",
    description: "Gestione ordini asporto e delivery con tracking GPS live. Assegnazione driver, notifiche WhatsApp automatiche.",
    benefits: ["0% commissioni", "Tracking GPS live", "Gestione driver", "Notifiche auto"],
    gradient: "from-orange-500 to-red-500",
    stat: "0%",
    statLabel: "Commissioni"
  },
  {
    id: "prenotazioni-eventi",
    icon: Calendar,
    title: "Prenotazioni & Eventi",
    subtitle: "-80% no-show con conferma automatica",
    description: "Calendario prenotazioni, conferma istantanea via WhatsApp. Gestione eventi speciali, coperti, sale private.",
    benefits: ["Conferma WhatsApp", "Gestione eventi", "Anti no-show", "Sale private"],
    gradient: "from-emerald-500 to-teal-600",
    stat: "-80%",
    statLabel: "No-show"
  },
  {
    id: "clienti-loyalty",
    icon: Trophy,
    title: "Clienti & Loyalty",
    subtitle: "+40% clienti che ritornano",
    description: "CRM completo con storico ordini. Sistema punti fedeltà, livelli, badge. Gamification con confetti e animazioni.",
    benefits: ["CRM completo", "Punti fedeltà", "Gamification", "Referral"],
    gradient: "from-pink-500 to-rose-500",
    stat: "+40%",
    statLabel: "Retention"
  },
  {
    id: "promo-stories",
    icon: Gift,
    title: "Promo & Stories",
    subtitle: "Marketing integrato stile Instagram",
    description: "Crea promozioni, codici sconto, flash sales. Stories Instagram-style per novità ed eventi.",
    benefits: ["Codici sconto", "Flash sales", "Stories swipe", "Instagram live"],
    gradient: "from-amber-500 to-orange-500",
    stat: "+25%",
    statLabel: "Engagement"
  },
  {
    id: "analytics",
    icon: BarChart3,
    title: "Analytics Dashboard",
    subtitle: "Dati real-time per decisioni smart",
    description: "Dashboard con fatturato, ordini, piatti top, orari di punta. Grafici interattivi, export report.",
    benefits: ["Real-time data", "Piatti top", "Orari punta", "Export report"],
    gradient: "from-blue-500 to-cyan-500",
    stat: "Live",
    statLabel: "Analytics"
  },
];

const featureCategories: FeatureCategory[] = [
  {
    id: "menu",
    label: "Menu",
    icon: UtensilsCrossed,
    features: [
      { icon: UtensilsCrossed, title: "Editor Piatti", desc: "Aggiungi, modifica, elimina piatti" },
      { icon: Filter, title: "Filtri Allergeni", desc: "14 allergeni con badge visibili" },
      { icon: Languages, title: "Multi-Lingua", desc: "5 lingue con traduzione AI" },
      { icon: QrCode, title: "Menu QR", desc: "QR code sempre aggiornato" },
    ]
  },
  {
    id: "ordini",
    label: "Ordini",
    icon: ShoppingBag,
    features: [
      { icon: ShoppingBag, title: "Ordini Asporto", desc: "Zero commissioni, checkout completo" },
      { icon: Truck, title: "Delivery GPS", desc: "Tracking real-time driver" },
      { icon: MapPin, title: "Zone Consegna", desc: "Costi dinamici per distanza" },
      { icon: MessageCircle, title: "WhatsApp Auto", desc: "Conferme automatiche" },
    ]
  },
  {
    id: "clienti",
    label: "Clienti",
    icon: Users,
    features: [
      { icon: Users, title: "CRM Completo", desc: "Storico ordini e preferenze" },
      { icon: Trophy, title: "Loyalty Points", desc: "Sistema punti e premi" },
      { icon: Gamepad2, title: "Gamification", desc: "Badge e sfide" },
      { icon: Star, title: "Recensioni", desc: "Raccolta feedback" },
    ]
  },
  {
    id: "marketing",
    label: "Marketing",
    icon: Gift,
    features: [
      { icon: Gift, title: "Promo & Sconti", desc: "Codici sconto e flash sales" },
      { icon: Smartphone, title: "Stories", desc: "Contenuti swipe stile IG" },
      { icon: Instagram, title: "Instagram Feed", desc: "Post sincronizzati live" },
      { icon: Bell, title: "Push Notifications", desc: "Notifiche per promo" },
    ]
  },
  {
    id: "gestione",
    label: "Gestione",
    icon: Palette,
    features: [
      { icon: Palette, title: "6 Temi Premium", desc: "Template moderni" },
      { icon: BarChart3, title: "Analytics Pro", desc: "Dashboard real-time" },
      { icon: Calendar, title: "Prenotazioni", desc: "Calendario e conferme" },
      { icon: Heart, title: "Eventi Speciali", desc: "Gestione eventi e sale" },
    ]
  },
];

const Features = memo(() => {
  const [activeCategory, setActiveCategory] = useState("menu");
  const [activeFeature, setActiveFeature] = useState(0);
  const featureDetailRef = useRef<HTMLDivElement>(null);

  const handleFeatureClick = useCallback((index: number) => {
    setActiveFeature(index);
    // Auto-scroll to show content on mobile
    setTimeout(() => {
      if (featureDetailRef.current && window.innerWidth < 1024) {
        featureDetailRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }
    }, 100);
  }, []);

  const activeFeatureData = heroFeatures[activeFeature];
  const ActiveIcon = activeFeatureData.icon;

  return (
    <section id="features" className="py-16 md:py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
      
      {/* Static orbs */}
      <div className="absolute top-20 left-[10%] w-72 h-72 bg-gradient-to-br from-violet-500/10 to-purple-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-[10%] w-96 h-96 bg-gradient-to-br from-orange-500/8 to-rose-600/5 rounded-full blur-3xl" />
      
      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/10 to-purple-600/10 border border-violet-500/20 mb-4">
            <Zap className="w-4 h-4 text-violet-500" />
            <span className="text-sm font-medium text-violet-500">Piattaforma Completa</span>
          </div>
          
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4 px-2">
            <span className="text-foreground">Tutto per il tuo </span>
            <span className="gradient-text">locale digitale</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto px-4">
            Menu QR, ordini, delivery, prenotazioni, loyalty, analytics. Una dashboard all-in-one.
          </p>
        </div>

        {/* Hero Features - Interactive Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Feature Navigation */}
          <div className="space-y-2">
            {heroFeatures.map((feature, index) => {
              const Icon = feature.icon;
              const isActive = activeFeature === index;
              
              return (
                <div
                  key={feature.id}
                  onClick={() => handleFeatureClick(index)}
                  className={`relative p-3 rounded-xl cursor-pointer transition-all group ${
                    isActive 
                      ? "bg-card border-2 border-primary/30 shadow-md" 
                      : "bg-card/50 border border-border hover:bg-card hover:border-primary/20"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-sm flex-shrink-0`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-foreground text-sm">{feature.title}</h4>
                      <p className="text-xs text-muted-foreground truncate">{feature.subtitle}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className={`text-lg font-bold bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                        {feature.stat}
                      </div>
                      <div className="text-[10px] text-muted-foreground">{feature.statLabel}</div>
                    </div>
                    {isActive && (
                      <ArrowRight className="w-4 h-4 text-primary flex-shrink-0" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Feature Detail Card */}
          <div className="relative" ref={featureDetailRef}>
            <div className={`relative p-6 rounded-2xl bg-gradient-to-br ${activeFeatureData.gradient} overflow-hidden`}>
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-xl" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-5">
                  <ActiveIcon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  {activeFeatureData.title}
                </h3>
                <p className="text-white/90 mb-4">
                  {activeFeatureData.description}
                </p>
                
                {/* Benefits */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {activeFeatureData.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-white" />
                      </div>
                      <span className="text-xs text-white/90">{benefit}</span>
                    </div>
                  ))}
                </div>
                
                {/* Stat highlight */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-white">{activeFeatureData.stat}</div>
                  <div className="text-white/80 text-sm">{activeFeatureData.statLabel}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* All Features Grid with Category Tabs */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
              Esplora tutte le funzionalità
            </h3>
          </div>

          {/* Category Tabs */}
          <div className="flex overflow-x-auto scrollbar-hide gap-2 mb-6 pb-2 px-2 sm:px-0 sm:flex-wrap sm:justify-center">
            {featureCategories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Features Grid */}
          {featureCategories.map((cat) => cat.id === activeCategory && (
            <div key={cat.id} className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {cat.features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="group p-4 rounded-xl bg-card border border-border hover:border-primary/20 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground text-sm mb-1">{feature.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{feature.desc}</p>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* CTA - Compact */}
        <div className="text-center">
          <Link to="/demo">
            <Button size="lg" className="gradient-button group">
              <Sparkles className="w-4 h-4 mr-2" />
              Prova la Demo
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
});

Features.displayName = 'Features';

export default Features;