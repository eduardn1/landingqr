/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * QRCODESTUDIOJEM - Problem Solution Section (Monochrome + Colored Accents)
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { memo } from "react";
import { X, Check, ArrowRight } from "lucide-react";
import { useLeadForm } from "@/hooks/useLeadForm";
import ScrollReveal from "@/components/ui/scroll-reveal";
import StaggerContainer, { StaggerItem } from "@/components/ui/stagger-container";
import TapButton from "@/components/ui/tap-button";

const transformations = [
  { before: "Menu cartacei costosi", after: "Aggiornamenti illimitati gratis" },
  { before: "Prenotazioni telefoniche", after: "Prenotazioni automatiche 24/7" },
  { before: "Ordini persi o sbagliati", after: "Ordini digitali sempre precisi" },
  { before: "Zero dati sui clienti", after: "Analytics e CRM dettagliati" },
  { before: "Commissioni delivery alte", after: "Zero commissioni, 100% tuo" },
];

const ProblemSolution = memo(() => {
  const { openLeadForm } = useLeadForm();

  return (
    <section className="section-padding-sm relative overflow-hidden">
      <div className="container relative z-10">
        <ScrollReveal animation="fadeUp" className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-foreground">
            Dal <span className="text-destructive">caos</span> al <span className="text-primary">controllo</span>
          </h2>
          <p className="text-foreground-50 max-w-md mx-auto">
            Automatizza le attività quotidiane e risparmia ore ogni giorno
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-10">
          {transformations.map((item, index) => (
            <StaggerItem key={index}>
              <div className="p-4 rounded-xl bg-foreground-05 border border-foreground-10 hover:border-foreground-20 transition-colors">
                <div className="flex items-start gap-2 mb-3">
                  <div className="w-5 h-5 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X className="w-3 h-3 text-destructive" />
                  </div>
                  <p className="text-sm text-foreground-30 line-through">{item.before}</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-foreground">{item.after}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <ScrollReveal animation="fadeIn" className="text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-primary/5 border border-primary/20">
            <div className="flex -space-x-2">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-xs font-bold text-primary">
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
              <div className="w-8 h-8 rounded-full bg-foreground-10 border-2 border-background flex items-center justify-center text-xs font-bold text-foreground-50">+500</div>
            </div>
            <p className="text-sm text-foreground font-medium">500+ locali hanno già scelto Flavour</p>
            <TapButton onClick={() => openLeadForm("problem-solution")} variant="primary" size="sm">
              Inizia ora
              <ArrowRight className="w-4 h-4 ml-2" />
            </TapButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
});

ProblemSolution.displayName = 'ProblemSolution';
export default ProblemSolution;