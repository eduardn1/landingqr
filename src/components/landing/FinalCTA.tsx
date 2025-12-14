import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Check, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLeadForm } from "@/hooks/useLeadForm";

const FinalCTA = () => {
  const { openLeadForm } = useLeadForm();
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={containerRef} className="section-padding relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      {/* Animated Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] opacity-50" />

      <motion.div 
        style={{ scale, opacity }}
        className="container relative z-10"
      >
        <div className="max-w-4xl mx-auto">
          {/* CTA Card */}
          <div className="relative p-8 md:p-12 lg:p-16 rounded-3xl bg-gradient-to-br from-primary/10 via-card to-card border border-primary/20 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-accent/20 to-transparent rounded-full blur-3xl" />
            
            <div className="relative z-10 text-center">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-flex mb-8"
              >
                <div className="badge-primary">
                  <Sparkles className="w-4 h-4" />
                  <span>Inizia oggi</span>
                </div>
              </motion.div>

              {/* Headline */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-display-sm md:text-display-md font-bold mb-6"
              >
                <span className="text-foreground">Pronto a portare la tua</span>
                <br />
                <span className="text-foreground">attività nel </span>
                <span className="gradient-text">futuro?</span>
              </motion.h2>

              {/* Subheading */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-body-lg text-muted-foreground max-w-2xl mx-auto mb-10"
              >
                Unisciti a centinaia di locali che hanno già scelto Flavour 
                per digitalizzare la loro attività.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
              >
                <Button
                  size="lg"
                  onClick={() => openLeadForm("final-cta")}
                  className="group text-base px-10 py-7 h-auto gradient-button rounded-2xl"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Inizia la prova gratuita
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
                    className="text-base px-10 py-7 h-auto w-full sm:w-auto rounded-2xl border-border bg-card/50 hover:bg-card text-foreground"
                  >
                    Vedi la demo live
                  </Button>
                </a>
              </motion.div>

              {/* Trust Signals */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex flex-wrap gap-6 items-center justify-center text-sm text-muted-foreground"
              >
                {[
                  "Setup in 10 minuti",
                  "Nessuna carta richiesta",
                  "Supporto italiano 24/7",
                ].map((text) => (
                  <span key={text} className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-success" />
                    </div>
                    {text}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default FinalCTA;
