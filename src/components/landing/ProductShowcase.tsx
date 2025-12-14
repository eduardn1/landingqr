/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * QRCODESTUDIOJEM - Product Showcase Section
 * Device mockups con screenshot reali della piattaforma
 * 
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * Web Development & Digital Solutions
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, memo } from "react";
import { 
  Smartphone, 
  Monitor, 
  Tablet,
  QrCode,
  ShoppingBag,
  BarChart3,
  Calendar,
  Users,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Import device mockups (WebP for better performance)
import iphoneMockup from "@/assets/iphone-menu-mockup.webp";
import ipadMockup from "@/assets/ipad-dashboard-mockup.webp";
import dashboardPreview from "@/assets/dashboard-preview.webp";

const showcaseItems = [
  {
    id: "mobile",
    device: "iPhone",
    icon: Smartphone,
    title: "Menu Mobile-First",
    description: "I clienti scansionano il QR e accedono al menu ottimizzato per smartphone. Ordini, pagamenti e recensioni in un tap.",
    image: iphoneMockup,
    badges: [
      { text: "QR Code", icon: QrCode, color: "from-violet-500 to-purple-600" },
      { text: "Ordini", icon: ShoppingBag, color: "from-orange-500 to-red-500" },
    ],
    gradient: "from-violet-500/20 to-purple-600/20",
    position: "left"
  },
  {
    id: "tablet",
    device: "iPad",
    icon: Tablet,
    title: "Dashboard Analytics",
    description: "Monitora vendite, ordini e performance in tempo reale. Grafici interattivi, report automatici, KPI personalizzabili.",
    image: ipadMockup,
    badges: [
      { text: "Analytics", icon: BarChart3, color: "from-blue-500 to-cyan-500" },
      { text: "Report", icon: Calendar, color: "from-emerald-500 to-teal-600" },
    ],
    gradient: "from-blue-500/20 to-cyan-500/20",
    position: "right"
  },
  {
    id: "desktop",
    device: "Desktop",
    icon: Monitor,
    title: "Gestione Completa",
    description: "Dashboard gestionale per menu, prenotazioni, clienti e staff. Multi-sede, multi-utente, tutto da browser.",
    image: dashboardPreview,
    badges: [
      { text: "Multi-sede", icon: Users, color: "from-pink-500 to-rose-500" },
      { text: "CRM", icon: Users, color: "from-amber-500 to-orange-500" },
    ],
    gradient: "from-pink-500/20 to-rose-500/20",
    position: "center"
  },
];

const ProductShowcase = memo(() => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [-5, 5]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [5, -5]);

  return (
    <section ref={containerRef} id="showcase" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      <div className="absolute inset-0 grid-pattern opacity-[0.03]" />
      
      {/* Floating Orbs */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-20 left-[5%] w-[400px] h-[400px] bg-gradient-to-br from-violet-500/15 to-purple-600/5 rounded-full blur-[100px]"
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-20 right-[5%] w-[500px] h-[500px] bg-gradient-to-br from-blue-500/10 to-cyan-500/5 rounded-full blur-[120px]"
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
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Multi-Device</span>
          </motion.div>
          
          <h2 className="font-display text-display-sm sm:text-display-md md:text-display-lg font-bold mb-4 md:mb-6 px-2">
            <span className="text-foreground">Un'esperienza </span>
            <span className="gradient-text">su ogni schermo</span>
          </h2>
          <p className="text-body-md sm:text-body-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Dal menu mobile per i clienti alla dashboard gestionale per il tuo staff.
            Ogni interfaccia è ottimizzata per il suo dispositivo.
          </p>
        </motion.div>

        {/* Device Showcase - Mobile-first Alternating Layout */}
        <div className="space-y-16 sm:space-y-24 md:space-y-32">
          {showcaseItems.map((item, index) => {
            const isEven = index % 2 === 0;
            const Icon = item.icon;
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, margin: "-100px" }}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 sm:gap-10 lg:gap-16 xl:gap-20`}
              >
                {/* Device Mockup - Mobile optimized */}
                <motion.div 
                  style={{ 
                    y: index === 0 ? y1 : y2,
                    rotate: index === 0 ? rotate1 : rotate2
                  }}
                  className="relative flex-1 w-full max-w-lg lg:max-w-none"
                >
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-3xl blur-3xl opacity-60`} />
                  
                  {/* Device Frame */}
                  <div className="relative">
                    {/* Badge on top */}
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      viewport={{ once: true }}
                      className={`absolute -top-4 ${isEven ? 'left-4' : 'right-4'} z-20`}
                    >
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border shadow-xl">
                        <Icon className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-foreground">{item.device}</span>
                      </div>
                    </motion.div>

                    {/* Image Container */}
                    <div className={`relative rounded-3xl overflow-hidden border border-border shadow-2xl ${
                      item.id === 'mobile' ? 'max-w-[280px] mx-auto' : 
                      item.id === 'tablet' ? 'max-w-[500px] mx-auto' : ''
                    }`}>
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-auto"
                        loading="lazy"
                        decoding="async"
                      />
                      
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent pointer-events-none" />
                    </div>

                    {/* Floating feature badges */}
                    <div className={`absolute ${isEven ? '-right-4 md:-right-8' : '-left-4 md:-left-8'} top-1/2 -translate-y-1/2 space-y-3`}>
                      {item.badges.map((badge, i) => {
                        const BadgeIcon = badge.icon;
                        return (
                          <motion.div
                            key={badge.text}
                            initial={{ opacity: 0, x: isEven ? 20 : -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + i * 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-2 px-3 py-2 rounded-full bg-card/90 backdrop-blur-sm border border-border shadow-lg"
                          >
                            <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${badge.color} flex items-center justify-center`}>
                              <BadgeIcon className="w-3.5 h-3.5 text-white" />
                            </div>
                            <span className="text-xs font-medium text-foreground">{badge.text}</span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>

                {/* Content */}
                <div className="flex-1 text-center lg:text-left">
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    {/* Device icon badge */}
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${item.gradient} border border-border/50 mb-6`}>
                      <Icon className="w-4 h-4 text-foreground" />
                      <span className="text-sm font-medium text-foreground">{item.device}</span>
                    </div>

                    <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                      {item.title}
                    </h3>
                    
                    <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">
                      {item.description}
                    </p>

                    {/* Feature list */}
                    <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                      {item.badges.map((badge) => {
                        const BadgeIcon = badge.icon;
                        return (
                          <div 
                            key={badge.text}
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border text-sm"
                          >
                            <BadgeIcon className="w-4 h-4 text-primary" />
                            <span className="text-foreground">{badge.text}</span>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-24"
        >
          <Link to="/demo">
            <Button size="lg" className="gradient-button group">
              <Sparkles className="w-4 h-4 mr-2" />
              <span>Esplora la demo completa</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
});

ProductShowcase.displayName = 'ProductShowcase';

export default ProductShowcase;
