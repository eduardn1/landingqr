/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * QRCODESTUDIOJEM - Features Section (2026 Design)
 * Bento Grid Asimmetrico con effetti 3D e micro-animazioni Linear/Vercel style
 * 
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * Web Development & Digital Solutions
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { 
  QrCode, 
  Calendar, 
  ShoppingBag, 
  BarChart3,
  Languages,
  Palette,
  Trophy,
  Sparkles,
  ArrowUpRight,
  Zap,
  ChefHat,
  MessageCircle,
  Instagram,
  Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const bentoFeatures = [
  {
    id: "qr-menu",
    icon: QrCode,
    title: "Menu QR Intelligente",
    description: "Scannerizza, ordina, paga. Zero carta, zero app da scaricare.",
    stat: "100%",
    statLabel: "Digitale",
    gradient: "from-violet-500 to-purple-600",
    size: "large", // large = 2x2, medium = 2x1, small = 1x1
  },
  {
    id: "multi-lingua",
    icon: Languages,
    title: "5 Lingue AI",
    description: "+23% vendite dai turisti.",
    stat: "+23%",
    statLabel: "Revenue",
    gradient: "from-blue-500 to-cyan-500",
    size: "medium",
  },
  {
    id: "templates",
    icon: Palette,
    title: "8 Template",
    description: "Premium design",
    stat: "8",
    statLabel: "Temi",
    gradient: "from-amber-500 to-orange-500",
    size: "small",
  },
  {
    id: "delivery",
    icon: ShoppingBag,
    title: "Delivery & Asporto",
    description: "Zero commissioni. 100% profitto. Tracking GPS live.",
    stat: "0%",
    statLabel: "Commissioni",
    gradient: "from-orange-500 to-red-500",
    size: "medium",
  },
  {
    id: "reservations",
    icon: Calendar,
    title: "Prenotazioni Smart",
    description: "-80% no-show con conferma WhatsApp automatica.",
    stat: "-80%",
    statLabel: "No-show",
    gradient: "from-emerald-500 to-teal-600",
    size: "large",
  },
  {
    id: "loyalty",
    icon: Trophy,
    title: "Loyalty",
    description: "+40% retention",
    stat: "+40%",
    statLabel: "Return",
    gradient: "from-pink-500 to-rose-500",
    size: "small",
  },
  {
    id: "analytics",
    icon: BarChart3,
    title: "Analytics Pro",
    description: "Dashboard real-time con insights actionable.",
    stat: "Live",
    statLabel: "Data",
    gradient: "from-indigo-500 to-violet-500",
    size: "medium",
  },
  {
    id: "chef",
    icon: ChefHat,
    title: "Menu Editor",
    description: "Drag & drop intuitivo",
    stat: "Easy",
    statLabel: "Edit",
    gradient: "from-slate-500 to-zinc-600",
    size: "small",
  },
];

const quickFeatures = [
  { icon: MessageCircle, label: "WhatsApp Auto" },
  { icon: Instagram, label: "Instagram Feed" },
  { icon: Bell, label: "Push Notifications" },
  { icon: Sparkles, label: "AI Translations" },
];

const Features = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);

  return (
    <section ref={containerRef} id="features" className="section-padding relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      <div className="absolute inset-0 grid-pattern opacity-[0.03]" />
      
      {/* Floating Orbs */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-40 left-[5%] w-[500px] h-[500px] bg-gradient-to-br from-violet-500/20 to-purple-600/5 rounded-full blur-[100px]"
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-40 right-[5%] w-[600px] h-[600px] bg-gradient-to-br from-orange-500/15 to-rose-600/5 rounded-full blur-[120px]"
      />
      
      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20 mb-8"
          >
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">30+ Funzionalità Pro</span>
          </motion.div>
          
          <h2 className="font-display text-display-sm md:text-display-md lg:text-display-lg font-bold mb-6">
            <span className="text-foreground">Un ecosistema </span>
            <span className="gradient-text">completo</span>
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
            Menu QR, delivery, prenotazioni, loyalty, analytics. 
            Una piattaforma all-in-one che trasforma il tuo ristorante.
          </p>
        </motion.div>

        {/* Bento Grid - Asymmetric */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-5 mb-16">
          {bentoFeatures.map((feature, index) => {
            const Icon = feature.icon;
            const isHovered = hoveredCard === feature.id;
            
            // Dynamic grid sizing
            const gridClass = feature.size === 'large' 
              ? 'col-span-2 row-span-2' 
              : feature.size === 'medium' 
                ? 'col-span-2 row-span-1' 
                : 'col-span-1 row-span-1';
            
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 40, rotateX: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1]
                }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredCard(feature.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`${gridClass} perspective-1000`}
              >
                <motion.div
                  animate={{
                    rotateY: isHovered ? 5 : 0,
                    rotateX: isHovered ? -5 : 0,
                    z: isHovered ? 50 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`relative h-full p-6 lg:p-8 rounded-3xl bg-card border border-border overflow-hidden group cursor-pointer transition-colors duration-300 ${
                    isHovered ? 'border-primary/30' : ''
                  }`}
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Gradient Overlay on Hover */}
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0`}
                    animate={{ opacity: isHovered ? 0.08 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Shine Effect */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100"
                    style={{
                      background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 45%, transparent 50%)',
                      transform: 'translateX(-100%)',
                    }}
                    animate={{
                      transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)',
                    }}
                    transition={{ duration: 0.6 }}
                  />

                  <div className="relative z-10 h-full flex flex-col">
                    {/* Icon */}
                    <motion.div 
                      className={`w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 lg:mb-6 shadow-lg`}
                      animate={{ 
                        scale: isHovered ? 1.1 : 1,
                        rotate: isHovered ? 5 : 0,
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    >
                      <Icon className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                    </motion.div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <h3 className={`font-display font-bold text-foreground mb-2 ${
                        feature.size === 'large' ? 'text-xl lg:text-2xl' : 'text-lg'
                      }`}>
                        {feature.title}
                      </h3>
                      {(feature.size === 'large' || feature.size === 'medium') && (
                        <p className="text-muted-foreground text-sm lg:text-base leading-relaxed">
                          {feature.description}
                        </p>
                      )}
                    </div>
                    
                    {/* Stat */}
                    <div className="mt-4 flex items-end justify-between">
                      <div>
                        <div className={`font-display font-bold bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent ${
                          feature.size === 'large' ? 'text-3xl lg:text-4xl' : 'text-2xl'
                        }`}>
                          {feature.stat}
                        </div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider">
                          {feature.statLabel}
                        </div>
                      </div>
                      
                      {/* Arrow */}
                      <motion.div
                        animate={{ 
                          x: isHovered ? 4 : 0,
                          y: isHovered ? -4 : 0,
                          opacity: isHovered ? 1 : 0.5,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowUpRight className="w-5 h-5 text-muted-foreground" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Features Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {quickFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all cursor-default"
              >
                <Icon className="w-4 h-4" />
                <span>{feature.label}</span>
              </motion.div>
            );
          })}
          <div className="text-muted-foreground text-sm flex items-center">
            +20 altre funzionalità
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/demo">
            <Button size="lg" className="gradient-button group">
              <span>Esplora la demo interattiva</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
