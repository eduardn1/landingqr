import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { 
  QrCode, 
  Calendar, 
  ShoppingBag, 
  BarChart3,
  Languages,
  CreditCard,
  Palette,
  MessageCircle,
  Heart,
  Instagram,
  Smartphone,
  Gift,
  Star,
  Gamepad2,
  ChefHat,
  Filter,
  Moon,
  Search,
  Navigation,
  Building2,
  Bell,
  Trophy,
  Sparkles,
  Play,
  Check,
  ArrowRight,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Hero Features - Top 6 most impactful
const heroFeatures = [
  {
    id: "qr-menu",
    icon: QrCode,
    title: "Menu QR Intelligente",
    subtitle: "Scannerizza, ordina, paga. Zero carta.",
    description: "Menu interattivo accessibile via QR code. Aggiornamenti istantanei, nessuna app da scaricare, sempre aggiornato in tempo reale.",
    benefits: ["Zero costi stampa", "Aggiornamenti real-time", "PWA installabile", "Offline-first"],
    gradient: "from-violet-500 to-purple-600",
    stat: "100%",
    statLabel: "Digitale"
  },
  {
    id: "multi-lingua",
    icon: Languages,
    title: "Multi-Lingua AI",
    subtitle: "5 lingue incluse. +23% vendite turisti.",
    description: "Switch automatico basato su browser. Traduzioni complete di piatti, descrizioni e interfaccia. I turisti ordinano nella loro lingua.",
    benefits: ["IT, EN, DE, ES, FR", "Traduzione AI", "Zero barriere", "Auto-detect"],
    gradient: "from-blue-500 to-cyan-500",
    stat: "+23%",
    statLabel: "Vendite estere"
  },
  {
    id: "templates",
    icon: Palette,
    title: "8 Template Premium",
    subtitle: "Da glassmorphism a video background.",
    description: "Modern Glassmorphism, Classic, Bento Minimal, Masonry, Aurora, Parallax, Split Hero, Video Background. Personalizza colori, logo, layout in 2 minuti.",
    benefits: ["8 stili unici", "Branding custom", "Drag & drop", "White-label"],
    gradient: "from-amber-500 to-orange-500",
    stat: "8",
    statLabel: "Template"
  },
  {
    id: "delivery",
    icon: ShoppingBag,
    title: "Asporto & Delivery",
    subtitle: "Zero commissioni. Tieni 100% profitto.",
    description: "Menu asporto dedicato, carrello intelligente, checkout completo, tracking GPS live, gestione driver con performance dashboard.",
    benefits: ["0% commissioni", "Tracking real-time", "WhatsApp auto", "Driver management"],
    gradient: "from-orange-500 to-red-500",
    stat: "0%",
    statLabel: "Commissioni"
  },
  {
    id: "reservations",
    icon: Calendar,
    title: "Prenotazioni Smart",
    subtitle: "Clienti prenotano. Tu ottimizzi. Zero no-show.",
    description: "Calendario disponibilità, selezione orario, conferma istantanea via WhatsApp, reminder automatici, gestione coperti intelligente.",
    benefits: ["Conferma automatica", "Reminder WhatsApp", "Anti no-show", "Capacity ottimale"],
    gradient: "from-emerald-500 to-teal-600",
    stat: "-80%",
    statLabel: "No-show"
  },
  {
    id: "loyalty",
    icon: Trophy,
    title: "Loyalty & Gamification",
    subtitle: "+40% clienti che ritornano.",
    description: "Punti per ordine, livelli progressivi, badge achievements, sfide settimanali, leaderboard, referral program con quiz interattivi e animazioni.",
    benefits: ["Punti & livelli", "Badge & sfide", "Referral program", "Confetti 🎉"],
    gradient: "from-pink-500 to-rose-500",
    stat: "+40%",
    statLabel: "Retention"
  },
];

// Feature categories with all features
const featureCategories = [
  {
    id: "engagement",
    label: "Engagement",
    icon: Heart,
    features: [
      { icon: Instagram, title: "Instagram Feed Live", desc: "Post sincronizzati automaticamente nel menu" },
      { icon: Smartphone, title: "Stories Instagram-style", desc: "Promozioni, novità, eventi con swipe" },
      { icon: Gamepad2, title: "Mood Selector", desc: "Clienti scelgono mood, menu si adatta" },
      { icon: Star, title: "Google Reviews", desc: "5 stelle live nel menu. Social proof" },
    ]
  },
  {
    id: "operations",
    label: "Operazioni",
    icon: Building2,
    features: [
      { icon: MessageCircle, title: "WhatsApp Automation", desc: "Conferme, tracking, promemoria auto" },
      { icon: BarChart3, title: "Analytics Dashboard", desc: "Vendite, piatti top, orari di punta" },
      { icon: ChefHat, title: "Menu Editor Pro", desc: "CRUD, multi-lingua, drag & drop" },
      { icon: Bell, title: "Notifiche Push", desc: "Alert ordini, promo, eventi" },
    ]
  },
  {
    id: "customization",
    label: "Personalizzazione",
    icon: Palette,
    features: [
      { icon: Filter, title: "Filtri Allergeni", desc: "14 allergeni, badge visibili, sicurezza" },
      { icon: Gift, title: "Promo & Sconti", desc: "Codici, flash sales, referral, birthday" },
      { icon: Moon, title: "Dark/Light Mode", desc: "Preferenza utente, transizioni smooth" },
      { icon: Search, title: "SEO 2026-ready", desc: "Meta, Schema.org, rich snippets" },
    ]
  },
  {
    id: "payments",
    label: "Pagamenti",
    icon: CreditCard,
    features: [
      { icon: CreditCard, title: "Pagamenti Integrati", desc: "Carte, Satispay, Apple Pay, PayPal" },
      { icon: Navigation, title: "Zone di Consegna", desc: "Delivery zones, costi dinamici" },
      { icon: Sparkles, title: "Customization Piatti", desc: "Extra, varianti, +15% revenue" },
      { icon: Building2, title: "Multi-sede", desc: "Gestione centralizzata più locali" },
    ]
  },
];

const Features = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState("engagement");
  const [activeFeature, setActiveFeature] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const activeFeatureData = heroFeatures[activeFeature];

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
            <span className="text-sm font-medium text-violet-500">30+ Funzionalità Pro</span>
          </motion.div>
          
          <h2 className="text-display-sm md:text-display-md font-bold mb-6">
            <span className="text-foreground">Tutto il potere di un</span>
            <br />
            <span className="gradient-text">ristorante digitale</span>
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
            Menu QR, delivery, prenotazioni, loyalty, analytics. Una piattaforma all-in-one 
            che trasforma il tuo ristorante in un'esperienza moderna.
          </p>
        </motion.div>

        {/* Hero Features - Interactive Showcase */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
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
                      <activeFeatureData.icon className="w-8 h-8 text-white" />
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
              E molto altro ancora...
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Esplora tutte le funzionalità organizzate per categoria
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {featureCategories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                  }`}
                >
                  <Icon className="w-4 h-4" />
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
                        <p className="text-sm text-muted-foreground">{feature.desc}</p>
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
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4">
            <Link to="/demo">
              <Button size="lg" className="btn-primary group">
                <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                Prova la Demo Interattiva
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground">
              Esplora tutte le funzionalità in azione
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
