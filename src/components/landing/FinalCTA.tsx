/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * QRCODESTUDIOJEM - Final CTA Section (Minimal 2026 Design)
 * Clean, focused call to action
 * 
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { memo } from "react";
import { ArrowRight, Check, Play } from "lucide-react";
import { useLeadForm } from "@/hooks/useLeadForm";
import ScrollReveal from "@/components/ui/scroll-reveal";
import TapButton from "@/components/ui/tap-button";

const FinalCTA = memo(() => {
  const { openLeadForm } = useLeadForm();

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-3xl opacity-40" />

      <div className="container relative z-10">
        <ScrollReveal animation="fadeUp">
          <div className="max-w-3xl mx-auto text-center">
            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Pronto a digitalizzare la tua attività?
            </h2>

            {/* Subheading */}
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
              Unisciti a centinaia di locali che hanno già scelto Flavour.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <TapButton
                variant="primary"
                size="lg"
                onClick={() => openLeadForm("final-cta")}
                className="px-8 py-4 text-base font-semibold shadow-lg shadow-primary/25"
              >
                Inizia la prova gratuita
                <ArrowRight className="w-5 h-5 ml-2" />
              </TapButton>

              <TapButton
                variant="outline"
                size="lg"
                onClick={() => window.open("https://demo2.studiojem.it", "_blank")}
                className="px-8 py-4 text-base"
              >
                <Play className="w-4 h-4 mr-2" />
                Guarda demo
              </TapButton>
            </div>

            {/* Trust Signals */}
            <div className="flex flex-wrap gap-6 items-center justify-center text-sm text-muted-foreground">
              {["Setup in 10 minuti", "Nessuna carta richiesta", "Supporto italiano 24/7"].map((text) => (
                <span key={text} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  {text}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
});

FinalCTA.displayName = 'FinalCTA';

export default FinalCTA;
