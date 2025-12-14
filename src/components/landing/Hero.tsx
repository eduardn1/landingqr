/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * QRCODESTUDIOJEM - Hero Section
 * 
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * Web Development & Digital Solutions
 * 
 * © 2024 StudioJEM - Tutti i diritti riservati
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Check, Sparkles, Zap, Star, QrCode, CalendarCheck, Truck, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLeadForm } from "@/hooks/useLeadForm";
import dashboardPreview from "@/assets/dashboard-preview.png";
import mobilePreview from "@/assets/mobile-menu-preview.png";

const featureBadges = [
  { icon: QrCode, text: "Menu QR", color: "from-violet-500 to-purple-600" },
  { icon: CalendarCheck, text: "Prenotazioni", color: "from-emerald-500 to-teal-600" },
  { icon: Truck, text: "Delivery", color: "from-orange-500 to-red-500" },
  { icon: BarChart3, text: "Analytics", color: "from-blue-500 to-cyan-500" },
];

const Hero = () => {
  const { openLeadForm } = useLeadForm();
  const { scrollY } = useScroll();
  
  // Parallax transforms
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const screenshotY = useTransform(scrollY, [0, 500], [0, -80]);
  const screenshotScale = useTransform(scrollY, [0, 500], [1, 1.08]);
  const floatingY1 = useTransform(scrollY, [0, 500], [0, -30]);
  const floatingY2 = useTransform(scrollY, [0, 500], [0, -50]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20">
      {/* Radial Gradient Background */}
      <div className="absolute inset-0 radial-gradient" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      {/* Noise Overlay */}
      <div className="absolute inset-0 noise-overlay" />

      {/* Animated Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="container relative z-10 py-20">
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="max-w-5xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 inline-flex"
          >
            <div className="badge-primary">
              <Sparkles className="w-4 h-4" />
              <span>Usato da 500+ ristoranti in Italia</span>
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-display-md md:text-display-lg lg:text-display-xl font-extrabold mb-8"
          >
            <span className="text-foreground">Il tuo ristorante</span>
            <br />
            <span className="gradient-text">digitalizzato</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-body-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8"
          >
            Menu QR, prenotazioni, asporto e delivery.{" "}
            Tutto in una piattaforma.{" "}
            <span className="text-foreground font-semibold">Pronto in 10 minuti.</span>
          </motion.p>

          {/* Feature Badges - Stile Creativable */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-wrap gap-3 justify-center mb-10"
          >
            {featureBadges.map((badge, i) => (
              <motion.div
                key={badge.text}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${badge.color} rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity`} />
                <div className="relative flex items-center gap-2 px-4 py-2.5 rounded-full bg-card/80 backdrop-blur-sm border border-border hover:border-primary/30 transition-all">
                  <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${badge.color} flex items-center justify-center`}>
                    <badge.icon className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{badge.text}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button
              size="lg"
              onClick={() => openLeadForm("hero-cta")}
              className="group text-base px-8 py-7 h-auto gradient-button rounded-2xl"
            >
              <Zap className="w-5 h-5 mr-2" />
              Inizia gratis ora
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            <a
              href="https://demo2.studiojem.it"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 py-7 h-auto w-full sm:w-auto rounded-2xl border-border bg-card/50 hover:bg-card hover:border-primary/30 backdrop-blur-sm transition-all"
              >
                Guarda demo live
              </Button>
            </a>
          </motion.div>

          {/* Trust Signals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap gap-6 items-center justify-center text-sm text-muted-foreground"
          >
            {[
              "Nessuna carta richiesta",
              "14 giorni gratis",
              "Cancella quando vuoi",
            ].map((text) => (
              <span key={text} className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
                  <Check className="w-3 h-3 text-success" />
                </div>
                {text}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Product Screenshots with Parallax */}
        <motion.div
          style={{ y: screenshotY, scale: screenshotScale }}
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="relative mt-20 max-w-6xl mx-auto perspective-1000"
        >
          {/* Main Dashboard Preview */}
          <div className="relative rounded-3xl overflow-hidden border border-border shadow-2xl">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20 rounded-3xl blur-xl opacity-50" />
            
            <div className="relative bg-card rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
              <img 
                src={dashboardPreview} 
                alt="Dashboard di gestione menu digitale" 
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Floating Mobile Preview */}
          <motion.div
            style={{ y: floatingY1 }}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="absolute -right-4 md:right-8 -bottom-8 md:bottom-12 w-32 md:w-48 lg:w-56"
          >
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/30 to-accent/30 rounded-[2rem] blur-xl opacity-60" />
              <div className="relative rounded-[1.5rem] overflow-hidden border-4 border-card shadow-2xl">
                <img 
                  src={mobilePreview} 
                  alt="Menu digitale su smartphone" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </motion.div>

          {/* Floating Stats Card */}
          <motion.div
            style={{ y: floatingY2 }}
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="absolute -left-4 md:left-8 top-1/3 hidden md:block"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-success/30 to-primary/20 rounded-2xl blur-xl opacity-60" />
              <div className="relative bg-card/95 backdrop-blur-xl border border-border rounded-2xl p-5 shadow-2xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center">
                    <Check className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Ordini oggi</p>
                    <p className="text-2xl font-bold text-foreground">+127</p>
                  </div>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-gradient-to-r from-success to-primary rounded-full" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating Rating Badge */}
          <motion.div
            style={{ y: floatingY1 }}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="absolute left-1/2 -translate-x-1/2 -top-6 hidden lg:block"
          >
            <div className="bg-card/90 backdrop-blur-xl border border-border rounded-full px-5 py-3 shadow-xl flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 text-warning fill-warning" />
                ))}
              </div>
              <span className="text-foreground font-medium text-sm">4.9 su Trustpilot</span>
            </div>
          </motion.div>

          {/* Stacked Avatars - Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="absolute right-4 md:right-12 top-8 hidden lg:block"
          >
            <div className="bg-card/90 backdrop-blur-xl border border-border rounded-2xl px-4 py-3 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {['bg-gradient-to-br from-pink-500 to-rose-500', 'bg-gradient-to-br from-blue-500 to-cyan-500', 'bg-gradient-to-br from-green-500 to-emerald-500', 'bg-gradient-to-br from-purple-500 to-violet-500'].map((gradient, i) => (
                    <div key={i} className={`w-8 h-8 rounded-full ${gradient} border-2 border-card flex items-center justify-center text-white text-xs font-bold`}>
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-xs">
                  <p className="font-semibold text-foreground">+500</p>
                  <p className="text-muted-foreground">ristoratori</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
