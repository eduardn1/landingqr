import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
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
        <div className="max-w-4xl mx-auto text-center">
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
                className="text-base px-8 py-6 h-auto w-full sm:w-auto border-white/10 hover:bg-white/5 hover:border-white/20 transition-all"
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
        </div>
      </div>
    </section>
  );
};

export default Hero;
