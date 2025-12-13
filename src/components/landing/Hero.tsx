import { motion } from "framer-motion";
import { Rocket, Play, CheckCircle2, TrendingUp, Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import phoneMockup from "@/assets/phone-mockup.png";

const Hero = () => {
  return (
    <section className="min-h-screen relative overflow-hidden flex items-center pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute top-20 left-10 w-72 h-72 orb-primary animate-float opacity-60" />
      <div className="absolute bottom-20 right-10 w-96 h-96 orb-accent animate-float-delayed opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] orb-primary opacity-20 animate-pulse-glow" />

      <div className="container relative z-10 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Lanciato nel 2024 • 500+ Ristoranti</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1]"
            >
              <span className="gradient-text-animated">Il Tuo Ristorante</span>
              <br />
              <span>Diventa Digitale</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0"
            >
              Menu QR, Prenotazioni, Asporto e Delivery. Tutto in una piattaforma.{" "}
              <span className="text-primary font-semibold block mt-2">
                Pronto in 10 minuti. Costa meno di una pizza.
              </span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                className="text-lg px-8 py-6 h-auto gradient-primary gradient-primary-hover"
              >
                <Rocket className="w-5 h-5 mr-2" />
                Inizia Gratis 14 Giorni
              </Button>
              <a
                href="https://demo2.studiojem.it"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 h-auto w-full sm:w-auto border-white/20 hover:bg-white/5"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Guarda la Demo
                </Button>
              </a>
            </motion.div>

            {/* Trust Signals */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-6 items-center justify-center lg:justify-start text-sm text-muted-foreground"
            >
              {[
                "Nessuna carta richiesta",
                "Cancella quando vuoi",
                "Setup gratuito",
              ].map((text) => (
                <div key={text} className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                  <span>{text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative z-10 perspective-2000">
              <motion.div
                whileHover={{ rotateY: 5, rotateX: -5 }}
                transition={{ duration: 0.4 }}
                className="relative max-w-[400px] mx-auto"
              >
                <img
                  src={phoneMockup}
                  alt="MenuLink App Demo"
                  className="w-full h-auto drop-shadow-2xl"
                />
                
                {/* Glow behind phone */}
                <div className="absolute inset-0 -z-10 blur-3xl opacity-50 bg-gradient-to-br from-primary/50 to-accent/50 scale-90" />
              </motion.div>
            </div>

            {/* Floating Stats Cards */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -left-4 lg:-left-8 top-1/4 glass-card p-4 rounded-2xl shadow-xl animate-float hidden md:block"
            >
              <div className="flex items-center gap-3">
                <div className="icon-container-md bg-gradient-to-br from-success to-emerald-600">
                  <TrendingUp className="w-5 h-5 text-success-foreground" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-success">+47%</div>
                  <div className="text-xs text-muted-foreground whitespace-nowrap">
                    Ordini Online
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="absolute -right-4 lg:-right-8 top-2/3 glass-card p-4 rounded-2xl shadow-xl animate-float-delayed hidden md:block"
            >
              <div className="flex items-center gap-3">
                <div className="icon-container-md bg-gradient-to-br from-primary to-purple-600">
                  <Users className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">500+</div>
                  <div className="text-xs text-muted-foreground whitespace-nowrap">
                    Ristoranti
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
