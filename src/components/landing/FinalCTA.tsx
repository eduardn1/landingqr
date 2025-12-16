/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * QRCODESTUDIOJEM - Final CTA Section (Static/Optimized)
 * 
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * Web Development & Digital Solutions
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { memo } from "react";
import { ArrowRight, Check, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLeadForm } from "@/hooks/useLeadForm";

const FinalCTA = memo(() => {
  const { openLeadForm } = useLeadForm();

  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      {/* Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl opacity-30" />

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* CTA Card */}
          <div className="relative p-8 md:p-12 lg:p-16 rounded-3xl bg-gradient-to-br from-primary/10 via-card to-card border border-primary/20 overflow-hidden">
            {/* Decorative elements - simplified */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-primary/15 to-transparent rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-accent/15 to-transparent rounded-full blur-2xl" />
            
            <div className="relative z-10 text-center">
              {/* Badge */}
              <div className="inline-flex mb-8">
                <div className="badge-primary">
                  <Sparkles className="w-4 h-4" />
                  <span>Inizia oggi</span>
                </div>
              </div>

              {/* Headline */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
                <span className="text-foreground">Pronto a portare la tua</span>
                <br />
                <span className="text-foreground">attività nel </span>
                <span className="gradient-text">futuro?</span>
              </h2>

              {/* Subheading */}
              <p className="text-muted-foreground max-w-2xl mx-auto mb-10">
                Porta menu QR, ordini, delivery e prenotazioni in un unico posto. Setup in 10 minuti.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                <Button
                  size="lg"
                  onClick={() => openLeadForm("final-cta")}
                  className="group text-base px-10 py-7 h-auto gradient-button rounded-2xl"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Richiedi una demo
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-base px-10 py-7 h-auto w-full sm:w-auto rounded-2xl border-border bg-card/50 hover:bg-card text-foreground"
                >
                  Vedi i prezzi
                </Button>
              </div>

              {/* Trust Signals */}
              <div className="flex flex-wrap gap-6 items-center justify-center text-sm text-muted-foreground">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

FinalCTA.displayName = 'FinalCTA';

export default FinalCTA;