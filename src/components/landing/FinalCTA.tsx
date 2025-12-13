import { motion } from "framer-motion";
import { Rocket, MessageCircle, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const FinalCTA = () => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Background Card */}
          <div className="glass-card rounded-4xl p-8 md:p-12 lg:p-16 border border-white/10 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-96 h-96 orb-primary opacity-30 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 orb-accent opacity-20 translate-x-1/2 translate-y-1/2" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/3 rounded-full" />

            <div className="relative z-10 text-center max-w-3xl mx-auto space-y-8">
              {/* Sparkle Icon */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex"
              >
                <div className="icon-container-xl bg-gradient-to-br from-primary to-accent shadow-xl glow-primary">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
              </motion.div>

              {/* Heading */}
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Pronto a Trasformare
                <br />
                <span className="gradient-text-animated">
                  il Tuo Ristorante?
                </span>
              </h2>

              {/* Subtitle */}
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Unisciti a oltre 500 ristoratori italiani che hanno già scelto
                MenuLink. Inizia gratis oggi e vedi la differenza.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="text-lg px-10 py-7 h-auto gradient-primary gradient-primary-hover"
                >
                  <Rocket className="w-5 h-5 mr-2" />
                  Inizia Gratis 14 Giorni
                </Button>
                <a
                  href="https://wa.me/393533811359"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-10 py-7 h-auto w-full sm:w-auto border-white/20 hover:bg-white/5"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Parla con Noi
                  </Button>
                </a>
              </div>

              {/* Trust Signals */}
              <div className="flex flex-wrap gap-6 items-center justify-center text-sm text-muted-foreground">
                {[
                  "Nessuna carta richiesta",
                  "14 giorni gratis",
                  "Cancella quando vuoi",
                ].map((text) => (
                  <div key={text} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
