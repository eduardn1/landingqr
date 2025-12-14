/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * QRCODESTUDIOJEM - Features Section
 * Showcase delle funzionalità reali della piattaforma (basato su /demo)
 * 
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * Web Development & Digital Solutions
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, memo } from "react";
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

// Hero Features - Le 6 funzionalità principali della demo
const heroFeatures: HeroFeature[] = [
  {
    id: "menu-allergeni",
    icon: UtensilsCrossed,
    title: "Menu & Allergeni",
    subtitle: "Gestione piatti completa con filtri allergeni",
    description: "Editor drag & drop per piatti, categorie, prezzi. 14 allergeni con badge visibili. Traduzioni automatiche in 5 lingue. Import da Excel/CSV.",
    benefits: ["Editor drag & drop", "14 filtri allergeni", "5 lingue AI", "Import Excel"],
    gradient: "from-violet-500 to-purple-600",
    stat: "∞",
    statLabel: "Piatti"
  },
  {
    id: "ordini-delivery",
    icon: ShoppingBag,
    title: "Ordini & Delivery",
    subtitle: "Zero commissioni. Tracking GPS real-time.",
    description: "Gestione ordini asporto e delivery con tracking GPS live. Assegnazione driver, performance dashboard, notifiche WhatsApp automatiche. Zero commissioni.",
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
    description: "Calendario prenotazioni, selezione orario, conferma istantanea via WhatsApp. Gestione eventi speciali, coperti, sale private. Reminder automatici.",
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
    description: "CRM completo con storico ordini. Sistema punti fedeltà, livelli, badge, sfide. Gamification con confetti e animazioni. Referral program.",
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
    description: "Crea promozioni, codici sconto, flash sales. Stories Instagram-style per novità ed eventi. Feed Instagram sincronizzato live nel menu.",
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
    description: "Dashboard con fatturato, ordini, piatti top, orari di punta. Grafici interattivi, export report, KPI personalizzabili. Tutto in tempo reale.",
    benefits: ["Real-time data", "Piatti top", "Orari punta", "Export report"],
    gradient: "from-blue-500 to-cyan-500",
    stat: "Live",
    statLabel: "Analytics"
  },
];

// Feature categories - tutte le funzionalità organizzate
const featureCategories: FeatureCategory[] = [
  {
    id: "menu",
    label: "Menu",
    icon: UtensilsCrossed,
    features: [
      { icon: UtensilsCrossed, title: "Editor Piatti", desc: "Aggiungi, modifica, elimina piatti con drag & drop" },
      { icon: Filter, title: "Filtri Allergeni", desc: "14 allergeni con badge visibili e sicurezza" },
      { icon: Languages, title: "Multi-Lingua", desc: "5 lingue con traduzione AI automatica" },
      { icon: QrCode, title: "Menu QR", desc: "QR code personalizzato, sempre aggiornato" },
    ]
  },
  {
    id: "ordini",
    label: "Ordini",
    icon: ShoppingBag,
    features: [
      { icon: ShoppingBag, title: "Ordini Asporto", desc: "Carrello smart, checkout completo, zero commissioni" },
      { icon: Truck, title: "Delivery GPS", desc: "Tracking real-time, assegnazione driver automatica" },
      { icon: MapPin, title: "Zone Consegna", desc: "Definisci zone, costi dinamici per distanza" },
      { icon: MessageCircle, title: "WhatsApp Auto", desc: "Conferme e tracking via WhatsApp automatici" },
    ]
  },
  {
    id: "clienti",
    label: "Clienti",
    icon: Users,
    features: [
      { icon: Users, title: "CRM Completo", desc: "Storico ordini, preferenze, note per cliente" },
      { icon: Trophy, title: "Loyalty Points", desc: "Sistema punti, livelli, premi automatici" },
      { icon: Gamepad2, title: "Gamification", desc: "Badge, sfide, leaderboard, confetti 🎉" },
      { icon: Star, title: "Recensioni", desc: "Raccolta feedback, integrazione Google Reviews" },
    ]
  },
  {
    id: "marketing",
    label: "Marketing",
    icon: Gift,
    features: [
      { icon: Gift, title: "Promo & Sconti", desc: "Codici sconto, flash sales, birthday offers" },
      { icon: Smartphone, title: "Stories", desc: "Contenuti swipe stile Instagram per novità" },
      { icon: Instagram, title: "Instagram Feed", desc: "Post sincronizzati live nel tuo menu" },
      { icon: Bell, title: "Push Notifications", desc: "Notifiche push per promo e aggiornamenti" },
    ]
  },
  {
    id: "gestione",
    label: "Gestione",
    icon: Palette,
    features: [
      { icon: Palette, title: "6 Temi Premium", desc: "Template moderni, personalizzazione completa" },
      { icon: BarChart3, title: "Analytics Pro", desc: "Dashboard real-time, report, KPI" },
      { icon: Calendar, title: "Prenotazioni", desc: "Calendario, conferme, gestione coperti" },
      { icon: Heart, title: "Eventi Speciali", desc: "Gestione eventi, sale private, menù dedicati" },
    ]
  },
];

const Features = memo(() => {
  const containerRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState("menu");
  const [activeFeature, setActiveFeature] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const activeFeatureData = heroFeatures[activeFeature];
  const ActiveIcon = activeFeatureData.icon;

  return (
    <section ref={containerRef} id="features" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
      {/* Floating orbs */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-20 left-[10%] w-72 h-72 bg-gradient-to-br from-violet-500/20 to-purple-600/10 rounded-full blur-3xl"
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-20 right-[10%] w-96 h-96 bg-gradient-to-br from-orange-500/15 to-rose-600/10 rounded-full blur-3xl"
      />
      
      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/10 to-purple-600/10 border border-violet-500/20 mb-6"
          >
            <Zap className="w-4 h-4 text-violet-500" />
            <span className="text-sm font-medium text-violet-500">Piattaforma Completa</span>
          </motion.div>
          
          <h2 className="font-display text-display-sm sm:text-display-md md:text-display-lg font-bold mb-4 md:mb-6 px-2">
            <span className="text-foreground">Tutto quello che serve al tuo </span>
            <span className="gradient-text">locale digitale</span>
          </h2>
          <p className="text-body-md sm:text-body-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Menu QR, ordini, delivery, prenotazioni, loyalty, analytics. 
            Una dashboard all-in-one per gestire ogni aspetto della tua attività.
          </p>
        </motion.div>

        {/* Hero Features - Interactive Showcase - Mobile stacked */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-16 md:mb-20">
          {/* Feature Navigation */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            {heroFeatures.map((feature, index) => {
              const Icon = feature.icon;
              const isActive = activeFeature === index;
              
              return (
                <motion.div
                  key={feature.id}
                  onClick={() => setActiveFeature(index)}
                  className={`relative p-4 rounded-2xl cursor-pointer transition-all duration-300 group ${
                    isActive 
                      ? "bg-card border-2 border-primary/30 shadow-lg" 
                      : "bg-card/50 border border-border hover:bg-card hover:border-primary/20"
                  }`}
                  whileHover={{ x: 8 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-md flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-foreground">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground truncate">{feature.subtitle}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className={`text-xl font-bold bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                        {feature.stat}
                      </div>
                      <div className="text-xs text-muted-foreground">{feature.statLabel}</div>
                    </div>
                    {isActive && (
                      <motion.div 
                        layoutId="activeIndicator"
                        className="absolute right-4 top-1/2 -translate-y-1/2"
                      >
                        <ArrowRight className="w-5 h-5 text-primary" />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Feature Detail Card */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="sticky top-24"
              >
                <div className={`relative p-8 rounded-3xl bg-gradient-to-br ${activeFeatureData.gradient} overflow-hidden`}>
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full blur-2xl" />
                  
                  <div className="relative z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.1 }}
                      className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6"
                    >
                      <ActiveIcon className="w-8 h-8 text-white" />
                    </motion.div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                      {activeFeatureData.title}
                    </h3>
                    <p className="text-white/90 text-lg mb-6">
                      {activeFeatureData.description}
                    </p>
                    
                    {/* Benefits */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {activeFeatureData.benefits.map((benefit, i) => (
                        <motion.div
                          key={benefit}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + i * 0.05 }}
                          className="flex items-center gap-2"
                        >
                          <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-sm text-white/90">{benefit}</span>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Stat highlight */}
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-sm">
                      <div className="text-4xl font-bold text-white">{activeFeatureData.stat}</div>
                      <div className="text-white/80">{activeFeatureData.statLabel}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* All Features Grid with Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Esplora tutte le funzionalità
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Ogni aspetto della tua attività, gestito da un'unica piattaforma
            </p>
          </div>

          {/* Category Tabs - Horizontal scroll on mobile */}
          <div className="flex overflow-x-auto scrollbar-hide gap-2 mb-6 md:mb-8 pb-2 px-2 sm:px-0 sm:flex-wrap sm:justify-center">
            {featureCategories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Features Grid */}
          <AnimatePresence mode="wait">
            {featureCategories.map((cat) => cat.id === activeCategory && (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
              >
                {cat.features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />
                      <div className="relative z-10">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <h4 className="font-bold text-foreground mb-2">{feature.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {feature.desc}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/demo">
            <Button size="lg" className="gradient-button group">
              <Sparkles className="w-4 h-4 mr-2" />
              <span>Prova la demo interattiva</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground mt-4">
            Esplora tutte le funzionalità senza registrazione
          </p>
        </motion.div>
      </div>
    </section>
  );
});

Features.displayName = 'Features';

export default Features;
