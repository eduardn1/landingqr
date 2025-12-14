/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * QRCODESTUDIOJEM - Pricing Section (2026 Design)
 * Cards moderne con toggle annuale/mensile animato
 * 
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * Web Development & Digital Solutions
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { Check, Star, Sparkles, Zap, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLeadForm } from "@/hooks/useLeadForm";
import PricingComparisonModal from "./PricingComparisonModal";

const plans = [
  {
    name: "Starter",
    monthlyPrice: 29,
    yearlyPrice: 24,
    description: "Per piccoli ristoranti che iniziano la digitalizzazione",
    features: [
      { text: "Menu QR illimitato", included: true },
      { text: "Fino a 50 piatti", included: true },
      { text: "3 lingue", included: true },
      { text: "Prenotazioni online", included: true },
      { text: "Analytics base", included: true },
      { text: "Supporto email", included: true },
      { text: "Delivery & Asporto", included: false },
      { text: "Multi-sede", included: false },
    ],
    cta: "Inizia gratis",
    featured: false,
    slug: "starter",
    gradient: "from-slate-500 to-zinc-600",
  },
  {
    name: "Pro",
    monthlyPrice: 59,
    yearlyPrice: 49,
    description: "La scelta più popolare per ristoranti ambiziosi",
    features: [
      { text: "Tutto in Starter", included: true },
      { text: "Piatti illimitati", included: true },
      { text: "5 lingue + AI", included: true },
      { text: "Ordini asporto & delivery", included: true },
      { text: "Analytics avanzati", included: true },
      { text: "Multi-sede (fino a 3)", included: true },
      { text: "Supporto WhatsApp", included: true },
      { text: "Loyalty & Gamification", included: true },
    ],
    cta: "Inizia la prova gratuita",
    featured: true,
    slug: "pro",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    name: "Enterprise",
    monthlyPrice: null,
    yearlyPrice: null,
    description: "Per catene e franchising con esigenze personalizzate",
    features: [
      { text: "Tutto in Pro", included: true },
      { text: "Sedi illimitate", included: true },
      { text: "API personalizzate", included: true },
      { text: "Account manager dedicato", included: true },
      { text: "SLA garantito 99.9%", included: true },
      { text: "Formazione on-site", included: true },
      { text: "Integrazioni custom", included: true },
      { text: "White-label completo", included: true },
    ],
    cta: "Contattaci",
    featured: false,
    slug: "enterprise",
    gradient: "from-amber-500 to-orange-500",
  },
];

const Pricing = () => {
  const { openLeadForm } = useLeadForm();
  const [isYearly, setIsYearly] = useState(true);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  return (
    <section id="pricing" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.02] to-background" />
      <div className="absolute inset-0 grid-pattern opacity-[0.02]" />
      
      {/* Gradient Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-primary/10 via-transparent to-accent/10 rounded-full blur-[150px] opacity-50" />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Zero commissioni</span>
          </motion.div>
          
          <h2 className="font-display text-display-sm sm:text-display-md md:text-display-lg font-bold mb-4 md:mb-6 px-2">
            <span className="text-foreground">Prezzi </span>
            <span className="gradient-text">trasparenti</span>
          </h2>
          <p className="text-body-md sm:text-body-lg text-muted-foreground max-w-2xl mx-auto mb-8 md:mb-10 px-4">
            Nessun costo nascosto. Nessuna commissione sugli ordini. 
            Paga solo quello che usi, cancella quando vuoi.
          </p>

          {/* Toggle Annual/Monthly */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-4 p-1.5 rounded-full bg-muted border border-border"
          >
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                !isYearly 
                  ? 'bg-card text-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Mensile
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                isYearly 
                  ? 'bg-card text-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Annuale
              <span className="px-2 py-0.5 rounded-full bg-success/20 text-success text-xs font-semibold">
                -17%
              </span>
            </button>
          </motion.div>
        </motion.div>

        {/* Pricing Cards - Mobile-first stacked layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto mb-12 px-2 sm:px-0">
          {plans.map((plan, index) => {
            const isHovered = hoveredPlan === plan.slug;
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
            
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1]
                }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredPlan(plan.slug)}
                onMouseLeave={() => setHoveredPlan(null)}
                className={`relative ${plan.featured ? 'md:-mt-4 md:mb-4' : ''}`}
              >
                <motion.div
                  animate={{
                    y: isHovered ? -8 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`relative h-full p-8 rounded-3xl overflow-hidden flex flex-col transition-all duration-300 ${
                    plan.featured 
                      ? 'bg-gradient-to-b from-primary/10 via-card to-card border-2 border-primary/30 shadow-2xl shadow-primary/10' 
                      : 'bg-card border border-border hover:border-primary/20'
                  }`}
                >
                  {/* Featured Badge */}
                  {plan.featured && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -top-px left-1/2 -translate-x-1/2"
                    >
                      <div className="px-4 py-1.5 rounded-b-xl bg-gradient-to-r from-primary to-primary-light text-primary-foreground text-xs font-semibold flex items-center gap-1.5">
                        <Star className="w-3 h-3" />
                        Più popolare
                      </div>
                    </motion.div>
                  )}

                  {/* Glow Effect */}
                  {plan.featured && (
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
                  )}

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Plan Name */}
                    <div className="mb-6">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${plan.gradient} bg-opacity-10 mb-3`}>
                        <Zap className="w-3 h-3 text-foreground/70" />
                        <span className="text-xs font-semibold text-foreground/70 uppercase tracking-wider">
                          {plan.name}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {plan.description}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="mb-8">
                      {price !== null ? (
                        <div className="flex items-baseline gap-1">
                          <AnimatePresence mode="wait">
                            <motion.span
                              key={`${plan.slug}-${isYearly}`}
                              initial={{ opacity: 0, y: -20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 20 }}
                              transition={{ duration: 0.3 }}
                              className="text-5xl font-display font-bold text-foreground"
                            >
                              €{price}
                            </motion.span>
                          </AnimatePresence>
                          <span className="text-muted-foreground">/mese</span>
                        </div>
                      ) : (
                        <span className="text-3xl font-display font-bold text-foreground">
                          Su misura
                        </span>
                      )}
                      {price !== null && isYearly && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Fatturato annualmente
                        </p>
                      )}
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 mb-8 flex-grow">
                      {plan.features.map((feature, i) => (
                        <motion.li 
                          key={feature.text}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + i * 0.03 }}
                          viewport={{ once: true }}
                          className="flex items-start gap-3 text-sm"
                        >
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            feature.included 
                              ? 'bg-success/20' 
                              : 'bg-muted'
                          }`}>
                            {feature.included ? (
                              <Check className="w-3 h-3 text-success" />
                            ) : (
                              <X className="w-3 h-3 text-muted-foreground" />
                            )}
                          </div>
                          <span className={feature.included ? 'text-foreground' : 'text-muted-foreground'}>
                            {feature.text}
                          </span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Button
                      onClick={() => openLeadForm(`pricing-${plan.slug}`)}
                      className={`w-full py-6 group ${
                        plan.featured
                          ? "gradient-button"
                          : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                      }`}
                    >
                      <span>{plan.cta}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center space-y-6"
        >
          <p className="text-sm text-muted-foreground">
            ✓ 14 giorni di prova gratuita &nbsp;·&nbsp; ✓ Nessuna carta richiesta &nbsp;·&nbsp; ✓ Cancella quando vuoi
          </p>
          
          <Button 
            variant="outline"
            onClick={() => setIsComparisonOpen(true)}
            className="border-border hover:border-primary/30"
          >
            Confronta tutti i piani nel dettaglio
          </Button>
        </motion.div>
      </div>

      {/* Comparison Modal */}
      <PricingComparisonModal 
        isOpen={isComparisonOpen} 
        onClose={() => setIsComparisonOpen(false)} 
      />
    </section>
  );
};

export default Pricing;
