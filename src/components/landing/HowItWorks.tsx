/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * QRCODESTUDIOJEM - How It Works Section (Compact Design)
 * Timeline compatta con icone inline e linea gradient
 * 
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * Web Development & Digital Solutions
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { memo } from "react";
import { FileEdit, Palette, Rocket, Clock, CheckCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLeadForm } from "@/hooks/useLeadForm";

const steps = [
  {
    step: 1,
    icon: FileEdit,
    title: "Crea il menu",
    description: "Aggiungi piatti, prezzi, foto. Importa da Excel o inizia da un template.",
    time: "5 min",
    gradient: "from-emerald-500/70 to-teal-600/70",
  },
  {
    step: 2,
    icon: Palette,
    title: "Personalizza",
    description: "Scegli tra 8 template premium. Colori, logo e layout secondo il tuo brand.",
    time: "3 min",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    step: 3,
    icon: Rocket,
    title: "Vai live!",
    description: "QR code pronto, condividi il link. I clienti ordinano, tu gestisci tutto.",
    time: "2 min",
    gradient: "from-emerald-500 to-teal-600",
  },
];

const HowItWorks = memo(() => {
  const { openLeadForm } = useLeadForm();

  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-background" />
      
      <div className="container relative z-10">
        {/* Header - Compact */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/20 mb-6">
            <Clock className="w-4 h-4 text-success" />
            <span className="text-sm font-semibold text-success">Setup in 10 minuti</span>
          </div>

          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-4">
            <span className="text-foreground">Da zero a online in </span>
            <span className="gradient-text">3 step</span>
          </h2>

          <p className="text-muted-foreground">
            Non serve essere esperti di tecnologia. Se sai usare WhatsApp, sai usare Nestify. Promesso.
          </p>
        </div>

        {/* Steps - Horizontal on desktop, Vertical on mobile */}
        <div className="max-w-4xl mx-auto">
          {/* Desktop Layout */}
          <div className="hidden md:grid md:grid-cols-3 gap-4 relative">
            {/* Progress Line - Behind cards */}
            <div className="absolute top-[52px] left-[16.67%] right-[16.67%] h-1 bg-border rounded-full z-0">
              <div className="h-full w-full bg-gradient-to-r from-emerald-500/70 via-sky-500/70 to-teal-500/70 rounded-full" />
            </div>
            
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="relative z-10">
                  {/* Step Card */}
                  <div className="bg-card border border-border rounded-2xl p-5 hover:border-primary/20 transition-colors">
                    {/* Icon + Step Number */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-md`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className={`text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent`}>
                        Step {step.step}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="font-bold text-lg text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {step.description}
                    </p>

                    {/* Time Badge */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-success/10 border border-success/20">
                      <Clock className="w-3.5 h-3.5 text-success" />
                      <span className="text-success font-semibold text-xs">{step.time}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Layout - Vertical */}
          <div className="md:hidden space-y-4 relative">
            {/* Vertical Progress Line */}
            <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-emerald-500/70 via-sky-500/70 to-teal-500/70 rounded-full" />
            
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="relative flex gap-4">
                  {/* Icon */}
                  <div className={`relative z-10 w-12 h-12 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-md flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  {/* Card */}
                  <div className="flex-1 bg-card border border-border rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-foreground">{step.title}</h3>
                      <span className={`text-xs font-bold bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent`}>
                        {step.time}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Total Time Banner - Compact */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 px-6 py-4 rounded-2xl bg-card border border-border">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground font-medium">Tempo totale:</span>
              <span className="font-display text-2xl font-bold gradient-text">~10 min</span>
            </div>
            <Button 
              onClick={() => openLeadForm('how-it-works')}
              className="gradient-button"
            >
              Inizia ora
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
});

HowItWorks.displayName = 'HowItWorks';

export default HowItWorks;