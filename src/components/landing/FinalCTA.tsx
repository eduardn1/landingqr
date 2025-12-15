/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * QRCODESTUDIOJEM - Final CTA Section (Monochrome + Glass Effects)
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
      {/* Background glow - Monochrome */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-foreground-05 rounded-full blur-3xl" />

      <div className="container relative z-10">
        <ScrollReveal animation="fadeUp">
          <div className="max-w-3xl mx-auto text-center">
            {/* Glass card wrapper */}
            <div className="relative p-8 md:p-12 rounded-3xl bg-card/60 backdrop-blur-xl border border-foreground-10">
              {/* Glass shine */}
              <div className="absolute inset-0 bg-gradient-to-br from-foreground-05 via-transparent to-foreground-03 rounded-3xl pointer-events-none" />
              
              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-foreground">
                  Pronto a digitalizzare la tua attività?
                </h2>
                <p className="text-lg text-foreground-50 max-w-xl mx-auto mb-10">
                  Unisciti a centinaia di locali che hanno già scelto Flavour.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                  <TapButton variant="primary" size="lg" onClick={() => openLeadForm("final-cta")} className="px-8 py-4 text-base font-semibold">
                    Inizia la prova gratuita
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </TapButton>
                  <TapButton variant="outline" size="lg" onClick={() => window.open("https://demo2.studiojem.it", "_blank")} className="px-8 py-4 text-base border-foreground-20 text-foreground-60 hover:text-foreground hover:border-foreground-40 hover:bg-foreground-05">
                    <Play className="w-4 h-4 mr-2" />
                    Guarda demo
                  </TapButton>
                </div>

                <div className="flex flex-wrap gap-6 items-center justify-center text-sm text-foreground-50">
                  {["Setup in 10 minuti", "Nessuna carta richiesta", "Supporto italiano 24/7"].map((text) => (
                    <span key={text} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-accent-color" />
                      {text}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
});

FinalCTA.displayName = 'FinalCTA';
export default FinalCTA;