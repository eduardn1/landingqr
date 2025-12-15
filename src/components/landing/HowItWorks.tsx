/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * QRCODESTUDIOJEM - How It Works Section (Minimal 2026 Design)
 * Clean timeline with subtle animations
 * 
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { memo } from "react";
import { FileEdit, Palette, Rocket, Clock, ArrowRight } from "lucide-react";
import { useLeadForm } from "@/hooks/useLeadForm";
import ScrollReveal from "@/components/ui/scroll-reveal";
import StaggerContainer, { StaggerItem } from "@/components/ui/stagger-container";
import TapButton from "@/components/ui/tap-button";

const steps = [
  {
    step: 1,
    icon: FileEdit,
    title: "Crea il menu",
    description: "Aggiungi piatti, prezzi, foto. Importa da Excel o inizia da un template.",
    time: "5 min",
  },
  {
    step: 2,
    icon: Palette,
    title: "Personalizza",
    description: "Scegli tra 8 template premium. Colori, logo e layout secondo il tuo brand.",
    time: "3 min",
  },
  {
    step: 3,
    icon: Rocket,
    title: "Vai live!",
    description: "QR code pronto, condividi il link. I clienti ordinano, tu gestisci tutto.",
    time: "2 min",
  },
];

const HowItWorks = memo(() => {
  const { openLeadForm } = useLeadForm();

  return (
    <section className="section-padding-sm relative overflow-hidden">
      <div className="container relative z-10">
        {/* Header */}
        <ScrollReveal animation="fadeUp" className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Setup in 10 minuti</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Da zero a online in 3 step
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Se sai usare WhatsApp, sai usare Flavour. Promesso.
          </p>
        </ScrollReveal>

        {/* Steps */}
        <StaggerContainer className="max-w-4xl mx-auto mb-12">
          <div className="grid md:grid-cols-3 gap-6 relative">
            {/* Connection Line - Desktop */}
            <div className="hidden md:block absolute top-16 left-[16.67%] right-[16.67%] h-px bg-border">
              <div className="h-full w-full bg-gradient-to-r from-primary via-primary to-primary" />
            </div>

            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <StaggerItem key={step.step}>
                  <div className="relative text-center">
                    {/* Step Number + Icon */}
                    <div className="relative inline-flex mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                        {step.step}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{step.description}</p>

                    {/* Time Badge */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {step.time}
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </div>
        </StaggerContainer>

        {/* CTA */}
        <ScrollReveal animation="fadeIn" className="text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-card border border-border">
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground">Tempo totale:</span>
              <span className="text-2xl font-bold text-primary">~10 min</span>
            </div>
            <TapButton onClick={() => openLeadForm('how-it-works')} variant="primary">
              Inizia ora
              <ArrowRight className="w-4 h-4 ml-2" />
            </TapButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
});

HowItWorks.displayName = 'HowItWorks';

export default HowItWorks;
