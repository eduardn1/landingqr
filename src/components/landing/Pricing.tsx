import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLeadForm } from "@/hooks/useLeadForm";

const plans = [
  {
    name: "Gratis",
    price: "0",
    description: "Per provare senza impegno",
    features: [
      "Menu QR base",
      "Fino a 20 piatti",
      "1 lingua",
      "Supporto email",
    ],
    cta: "Inizia gratis",
    featured: false,
  },
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
  },
];

const Pricing = () => {
  const { openLeadForm } = useLeadForm();
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={containerRef} id="pricing" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.02] to-background" />

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
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={plan.featured ? "pricing-card-featured" : "pricing-card"}
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
                    <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => openLeadForm(`pricing-${plan.name.toLowerCase()}`)}
                className={`w-full py-6 ${
                  plan.featured
                    ? "gradient-button text-primary-foreground"
                    : "bg-muted hover:bg-muted/80 text-foreground"
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
      </div>
    </section>
  );
};

export default Pricing;
