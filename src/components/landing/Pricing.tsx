/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * QRCODESTUDIOJEM - Pricing Section (Monochrome + Colored Accents)
 * Inspired by Cadence AI
 * 
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { useState, memo } from "react";
import { Check, X, Star, ArrowRight } from "lucide-react";
import { useLeadForm } from "@/hooks/useLeadForm";
import PricingComparisonModal from "./PricingComparisonModal";
import ScrollReveal from "@/components/ui/scroll-reveal";
import StaggerContainer, { StaggerItem } from "@/components/ui/stagger-container";
import TapButton from "@/components/ui/tap-button";

const plans = [
  {
    name: "Starter",
    monthlyPrice: 29,
    yearlyPrice: 24,
    description: "Per piccoli locali che iniziano",
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
  },
  {
    name: "Pro",
    monthlyPrice: 59,
    yearlyPrice: 49,
    description: "La scelta più popolare",
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
  },
  {
    name: "Enterprise",
    monthlyPrice: null,
    yearlyPrice: null,
    description: "Per catene e franchising",
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
  },
];

const Pricing = memo(() => {
  const { openLeadForm } = useLeadForm();
  const [isYearly, setIsYearly] = useState(true);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);

  return (
    <section id="pricing" className="section-padding relative overflow-hidden">
      {/* Subtle background glow - Colored */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-gradient-to-b from-primary/8 via-primary/3 to-transparent rounded-full blur-3xl" />

      <div className="container relative z-10">
        {/* Header - Monochrome text, colored badge */}
        <ScrollReveal animation="fadeUp" className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="text-sm font-medium text-primary">Zero commissioni</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            Prezzi semplici e trasparenti
          </h2>
          <p className="text-foreground-50 max-w-xl mx-auto mb-8">
            Nessun costo nascosto. Paga solo quello che usi.
          </p>

          {/* Toggle - Monochrome with colored badge */}
          <div className="inline-flex items-center gap-1 p-1 rounded-full bg-foreground-05 border border-foreground-10">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                !isYearly
                  ? "bg-card text-foreground shadow-sm"
                  : "text-foreground-50 hover:text-foreground"
              }`}
            >
              Mensile
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                isYearly
                  ? "bg-card text-foreground shadow-sm"
                  : "text-foreground-50 hover:text-foreground"
              }`}
            >
              Annuale
              <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-semibold">
                -17%
              </span>
            </button>
          </div>
        </ScrollReveal>

        {/* Pricing Cards - Monochrome cards, colored accents */}
        <StaggerContainer className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {plans.map((plan) => {
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;

            return (
              <StaggerItem key={plan.name}>
                <div
                  className={`relative h-full p-6 rounded-2xl flex flex-col transition-all duration-200 ${
                    plan.featured
                      ? "bg-foreground-05 border-2 border-primary/40 shadow-lg shadow-primary/10"
                      : "bg-foreground-05 border border-foreground-10 hover:border-foreground-20"
                  }`}
                >
                  {/* Featured Badge - Colored */}
                  {plan.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <div className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Più popolare
                      </div>
                    </div>
                  )}

                  {/* Plan Header - Monochrome */}
                  <div className="mb-6 pt-2">
                    <h3 className="text-lg font-bold text-foreground mb-1">{plan.name}</h3>
                    <p className="text-sm text-foreground-50">{plan.description}</p>
                  </div>

                  {/* Price - Monochrome */}
                  <div className="mb-6">
                    {price !== null ? (
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-foreground">€{price}</span>
                        <span className="text-foreground-50">/mese</span>
                      </div>
                    ) : (
                      <span className="text-2xl font-bold text-foreground">Su misura</span>
                    )}
                  </div>

                  {/* Features - Colored checkmarks, monochrome text */}
                  <ul className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature) => (
                      <li key={feature.text} className="flex items-start gap-3 text-sm">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            feature.included ? "bg-primary/20" : "bg-foreground-10"
                          }`}
                        >
                          {feature.included ? (
                            <Check className="w-3 h-3 text-primary" />
                          ) : (
                            <X className="w-3 h-3 text-foreground-30" />
                          )}
                        </div>
                        <span className={feature.included ? "text-foreground" : "text-foreground-30"}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA - Colored primary, monochrome secondary */}
                  <TapButton
                    onClick={() => openLeadForm(`pricing-${plan.slug}`)}
                    variant={plan.featured ? "primary" : "secondary"}
                    className="w-full"
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </TapButton>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Bottom - Monochrome text, colored link */}
        <ScrollReveal animation="fadeIn" className="text-center space-y-6">
          <p className="text-sm text-foreground-50">
            ✓ 14 giorni di prova gratuita · ✓ Nessuna carta richiesta · ✓ Cancella quando vuoi
          </p>

          <button
            onClick={() => setIsComparisonOpen(true)}
            className="text-sm text-primary hover:underline underline-offset-4"
          >
            Confronta tutti i piani nel dettaglio →
          </button>
        </ScrollReveal>
      </div>

      <PricingComparisonModal
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
      />
    </section>
  );
});

Pricing.displayName = 'Pricing';

export default Pricing;