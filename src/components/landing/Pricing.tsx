import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLeadForm } from "@/hooks/useLeadForm";
import PricingComparisonModal from "./PricingComparisonModal";

const plans = [
  {
    name: "Starter",
    price: "29",
    description: "Per piccoli ristoranti",
    features: [
      "Menu QR illimitato",
      "Piatti illimitati",
      "3 lingue",
      "Prenotazioni online",
      "Supporto prioritario",
    ],
    cta: "Prova 14 giorni gratis",
    featured: false,
    slug: "starter",
  },
  {
    name: "Pro",
    price: "59",
    description: "La scelta più popolare",
    features: [
      "Tutto in Starter",
      "Ordini asporto & delivery",
      "Analytics avanzati",
      "Multi-sede (fino a 3)",
      "Integrazioni",
      "Supporto WhatsApp",
    ],
    cta: "Prova 14 giorni gratis",
    featured: true,
    slug: "pro",
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Per catene e franchising",
    features: [
      "Tutto in Pro",
      "Sedi illimitate",
      "API personalizzate",
      "Account manager dedicato",
      "SLA garantito",
      "Formazione on-site",
    ],
    cta: "Contattaci",
    featured: false,
    slug: "enterprise",
  },
];

const Pricing = () => {
  const { openLeadForm } = useLeadForm();
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={containerRef} id="pricing" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="badge-primary mb-6">
            <span>Prezzi</span>
          </div>
          <h2 className="text-display-sm md:text-display-md font-bold mb-6">
            <span className="text-foreground">Semplice e </span>
            <span className="gradient-text">trasparente</span>
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
            Nessun costo nascosto. Nessuna commissione sugli ordini. 
            Paga solo quello che usi.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div 
          style={{ y }}
          className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative p-8 rounded-3xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                plan.featured 
                  ? "bg-gradient-to-b from-primary/10 to-card border-2 border-primary/30 shadow-xl shadow-primary/10" 
                  : "bg-card border border-border hover:border-border-medium"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="badge-primary">
                    <Star className="w-3 h-3" />
                    <span>Più popolare</span>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </div>

              <div className="mb-6">
                {plan.price === "Custom" ? (
                  <span className="text-3xl font-bold text-foreground">Su misura</span>
                ) : (
                  <>
                    <span className="text-4xl font-bold text-foreground">€{plan.price}</span>
                    <span className="text-muted-foreground">/mese</span>
                  </>
                )}
              </div>

              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-success" />
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => openLeadForm(`pricing-${plan.name.toLowerCase()}`)}
                className={`w-full py-6 ${
                  plan.featured
                    ? "gradient-button"
                    : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                }`}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground mt-12"
        >
          Tutti i piani includono 14 giorni di prova gratuita. Nessuna carta di credito richiesta.
        </motion.p>

        {/* Feature Comparison Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <Button 
            variant="outline"
            onClick={() => setIsComparisonOpen(true)}
            className="border-border hover:border-primary/30 text-foreground"
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
