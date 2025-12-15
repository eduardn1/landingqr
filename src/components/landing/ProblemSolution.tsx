/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * QRCODESTUDIOJEM - Problem/Solution Section (Static/Compact)
 * 
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * Web Development & Digital Solutions
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { memo } from "react";
import { X, Check, TrendingUp, Users, Clock, Zap, ArrowRight } from "lucide-react";
import { useLeadForm } from "@/hooks/useLeadForm";
import { Button } from "@/components/ui/button";

const transformations = [
  {
    before: "Menu cartacei costosi",
    after: "Aggiornamenti illimitati",
    icon: Zap,
  },
  {
    before: "Prenotazioni telefoniche",
    after: "Prenotazioni automatiche 24/7",
    icon: Clock,
  },
  {
    before: "Ordini persi o sbagliati",
    after: "Ordini digitali precisi",
    icon: Check,
  },
  {
    before: "Zero dati sui clienti",
    after: "Analytics dettagliati",
    icon: Users,
  },
  {
    before: "Commissioni delivery alte",
    after: "Zero commissioni",
    icon: TrendingUp,
  },
];

const ProblemSolution = memo(() => {
  const { openLeadForm } = useLeadForm();

  return (
    <section id="transformation" className="py-14 md:py-16 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
      
      <div className="container relative z-10">
        {/* Header - Compact */}
        <div className="text-center mb-10">
          <div className="badge-neutral mb-4">
            <Zap className="w-4 h-4" />
            <span>La Trasformazione</span>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-black mb-3">
            <span className="text-foreground">Dal </span>
            <span className="text-destructive">caos</span>
            <span className="text-foreground"> al </span>
            <span className="gradient-text">controllo</span>
          </h2>
          
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Automatizza le attività quotidiane e risparmia ore ogni giorno
          </p>
        </div>

        {/* Compact Before/After Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-10">
          {transformations.map((item, index) => (
            <div
              key={index}
              className="group relative p-3 rounded-xl bg-card border border-border hover:border-primary/30 transition-all"
            >
              {/* Icon */}
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-2">
                <item.icon className="w-4 h-4 text-primary" />
              </div>
              
              {/* Before */}
              <div className="flex items-start gap-1.5 mb-1.5">
                <X className="w-3 h-3 text-destructive mt-0.5 flex-shrink-0" />
                <p className="text-[10px] text-muted-foreground line-through leading-tight">
                  {item.before}
                </p>
              </div>
              
              {/* After */}
              <div className="flex items-start gap-1.5">
                <Check className="w-3 h-3 text-success mt-0.5 flex-shrink-0" />
                <p className="text-[10px] font-medium text-foreground leading-tight">
                  {item.after}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section - Compact */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 p-4 rounded-xl bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 border border-primary/20">
          {/* Stacked Avatars */}
          <div className="flex -space-x-2">
            {['from-pink-500 to-rose-500', 'from-blue-500 to-cyan-500', 'from-green-500 to-emerald-500', 'from-purple-500 to-violet-500'].map((gradient, i) => (
              <div 
                key={i} 
                className={`w-7 h-7 rounded-full bg-gradient-to-br ${gradient} border-2 border-card flex items-center justify-center text-white text-[10px] font-bold`}
              >
                {String.fromCharCode(65 + i)}
              </div>
            ))}
            <div className="w-7 h-7 rounded-full bg-muted border-2 border-card flex items-center justify-center text-foreground text-[9px] font-bold">
              +500
            </div>
          </div>
          
          <div className="text-center sm:text-left">
            <p className="font-bold text-foreground text-sm">500+ locali hanno già scelto Flavour</p>
            <p className="text-xs text-muted-foreground">Digitalizza la tua attività oggi</p>
          </div>
          
          <Button
            onClick={() => openLeadForm("problem-solution")}
            className="gradient-button rounded-full px-5 text-sm whitespace-nowrap"
          >
            Inizia ora
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
});

ProblemSolution.displayName = 'ProblemSolution';

export default ProblemSolution;