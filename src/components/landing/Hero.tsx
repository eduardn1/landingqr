import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLeadForm } from "@/hooks/useLeadForm";
import dashboardPreview from "@/assets/dashboard-preview.png";
import mobilePreview from "@/assets/mobile-menu-preview.png";

const Hero = () => {
  const { openLeadForm } = useLeadForm();
  const { scrollY } = useScroll();
  
  // Parallax transforms
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const screenshotY = useTransform(scrollY, [0, 500], [0, -50]);
  const screenshotScale = useTransform(scrollY, [0, 500], [1, 1.05]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20">
      {/* Subtle Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.03] to-background" />
      
      {/* Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='white'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="container relative z-10 py-20">
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="badge-neutral mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span>Usato da 500+ ristoranti in Italia</span>
          </motion.div>

          {/* Headline - MASSIVE but clean */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-display-md md:text-display-lg lg:text-display-xl font-bold mb-8"
          >
            <span className="text-foreground">Il tuo ristorante</span>
            <br />
            <span className="text-muted-foreground">diventa </span>
            <span className="gradient-text">digitale</span>
          </motion.h1>

          {/* Subheading - Clear, no fluff */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-body-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-12"
          >
            Menu QR, prenotazioni, asporto e delivery.{" "}
            <br className="hidden md:block" />
            Tutto in una piattaforma.{" "}
            <span className="text-foreground font-medium">Pronto in 10 minuti.</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button
              size="lg"
              onClick={() => openLeadForm("hero-cta")}
              className="group text-base px-8 py-6 h-auto gradient-button text-primary-foreground"
            >
              Inizia gratis
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            <a
              href="https://demo2.studiojem.it"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 py-6 h-auto w-full sm:w-auto border-border hover:bg-muted hover:border-border transition-all"
              >
                Guarda demo
              </Button>
            </a>
          </motion.div>

          {/* Trust Signals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-6 items-center justify-center text-sm text-muted-foreground"
          >
            {[
              "Nessuna carta richiesta",
              "14 giorni gratis",
              "Cancella quando vuoi",
            ].map((text) => (
              <span key={text} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-success" />
                {text}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Product Screenshots with Parallax */}
        <motion.div
          style={{ y: screenshotY, scale: screenshotScale }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative mt-20 max-w-6xl mx-auto"
        >
          {/* Dashboard Preview - Main */}
          <div className="relative rounded-2xl overflow-hidden border border-border shadow-2xl shadow-primary/10">
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10 pointer-events-none" />
            <img 
              src={dashboardPreview} 
              alt="Dashboard di gestione menu digitale" 
              className="w-full h-auto"
            />
          </div>

          {/* Mobile Preview - Floating */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="absolute -right-4 md:right-8 -bottom-8 md:bottom-8 w-32 md:w-48 lg:w-56"
          >
            <div className="rounded-3xl overflow-hidden border-4 border-background shadow-2xl">
              <img 
                src={mobilePreview} 
                alt="Menu digitale su smartphone" 
                className="w-full h-auto"
              />
            </div>
          </motion.div>

          {/* Floating Stats Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="absolute -left-4 md:left-8 top-1/2 -translate-y-1/2 hidden md:block"
          >
            <div className="bg-card/90 backdrop-blur-xl border border-border rounded-2xl p-4 shadow-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center">
                  <Check className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Ordini oggi</p>
                  <p className="text-lg font-bold text-foreground">+127</p>
                </div>
              </div>
              <div className="h-1 bg-muted rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-gradient-to-r from-success to-primary rounded-full" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
