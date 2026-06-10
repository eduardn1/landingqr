/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * NESTIFY - Use Cases Section
 * Showcasing real-world scenarios and benefits for different hospitality businesses
 *
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * Web Development & Digital Solutions
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { memo } from "react";
import { 
  Users, 
  TrendingUp, 
  Clock, 
  Smartphone, 
  BarChart3, 
  Zap,
  MapPin,
  DollarSign,
  CheckCircle,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLeadForm } from "@/hooks/useLeadForm";

const useCases = [
  {
    id: "ristorante",
    title: "Ristorante Tradizionale",
    description: "Gestisci menu, prenotazioni e ordini in sala da un'unica dashboard",
    icon: Users,
    benefits: [
      { icon: Clock, text: "Riduce attese al bancone" },
      { icon: TrendingUp, text: "+35% ordini medi" },
      { icon: DollarSign, text: "Zero commissioni delivery" },
    ],
    gradient: "from-emerald-500/70 to-teal-600/70",
    color: "emerald",
  },
  {
    id: "pizzeria",
    title: "Pizzeria & Asporto",
    description: "Ordini online, ritiro programmato, tracking real-time",
    icon: Smartphone,
    benefits: [
      { icon: Zap, text: "Ordini 24/7 automatici" },
      { icon: TrendingUp, text: "+40% ricavi asporto" },
      { icon: Clock, text: "Setup in 5 minuti" },
    ],
    gradient: "from-rose-500/70 to-pink-600/70",
    color: "rose",
  },
  {
    id: "bar",
    title: "Bar & Pub",
    description: "Ordini da tavolo, loyalty program, promo integrate",
    icon: BarChart3,
    benefits: [
      { icon: Users, text: "+40% clienti fedeli" },
      { icon: TrendingUp, text: "Promo automatiche" },
      { icon: Sparkles, text: "Menu aggiornabile istantaneamente" },
    ],
    gradient: "from-sky-500/70 to-blue-600/70",
    color: "sky",
  },
  {
    id: "hotel",
    title: "Hotel & Resort",
    description: "Room service, prenotazioni ristorante, multi-lingua",
    icon: MapPin,
    benefits: [
      { icon: CheckCircle, text: "5 lingue automatiche" },
      { icon: TrendingUp, text: "Esperienza ospiti migliorata" },
      { icon: Clock, text: "Gestione centralizzata" },
    ],
    gradient: "from-amber-500/70 to-orange-600/70",
    color: "amber",
  },
];

const UseCases = memo(() => {
  const { openLeadForm } = useLeadForm();

  return (
    <section id="use-cases" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />
      <div className="absolute inset-0 grid-pattern opacity-[0.02]" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">
              Casi d'uso reali
            </span>
          </div>

          <h2 className="font-display text-display-sm sm:text-display-md md:text-display-lg font-bold mb-4 md:mb-6 px-2">
            <span className="text-foreground">Perfetto per ogni tipo di </span>
            <span className="gradient-text">attività</span>
          </h2>
          <p className="text-body-md sm:text-body-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Che tu gestisca un ristorante, una pizzeria, un bar o un hotel, Nestify si adatta alle tue esigenze specifiche.
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {useCases.map((useCase) => {
            const Icon = useCase.icon;
            return (
              <div
                key={useCase.id}
                className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
              >
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${useCase.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />

                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${useCase.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Title & Description */}
                <h3 className="font-bold text-lg text-foreground mb-2">
                  {useCase.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-5">
                  {useCase.description}
                </p>

                {/* Benefits */}
                <div className="space-y-2.5">
                  {useCase.benefits.map((benefit, idx) => {
                    const BenefitIcon = benefit.icon;
                    return (
                      <div key={idx} className="flex items-center gap-2">
                        <BenefitIcon className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-xs text-muted-foreground">
                          {benefit.text}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            onClick={() => openLeadForm('use-cases')}
            size="lg"
            className="gradient-button rounded-full px-8 h-12 text-base shadow-lg shadow-primary/20"
          >
            Scopri come Nestify può aiutare la tua attività
          </Button>
        </div>
      </div>
    </section>
  );
});

UseCases.displayName = 'UseCases';

export default UseCases;
