import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Gratis",
    price: "€0",
    period: "Per sempre",
    description: "Perfetto per iniziare",
    features: [
      "1 menu, 20 piatti",
      "QR Code base",
      "Multi-lingua",
      "Dark/Light mode",
    ],
    limitations: ["Branding MenuLink"],
    cta: "Inizia gratis",
    popular: false,
  },
  {
    name: "Starter",
    price: "€29",
    period: "al mese",
    description: "Per ristoranti che vogliono crescere",
    features: [
      "3 menu, 100 piatti",
      "Prenotazioni incluse",
      "Analytics base",
      "Nessun branding",
      "Supporto email",
    ],
    limitations: [],
    cta: "Prova gratis 14 giorni",
    popular: true,
  },
  {
    name: "Pro",
    price: "€79",
    period: "al mese",
    description: "Funzionalità complete",
    features: [
      "Menu illimitati",
      "Takeaway e delivery",
      "Loyalty e rewards",
      "WhatsApp notifications",
      "Analytics avanzati",
      "Supporto prioritario",
    ],
    limitations: [],
    cta: "Prova gratis 14 giorni",
    popular: false,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Per catene e agenzie",
    features: [
      "White-label completo",
      "Multi-location",
      "API access",
      "Account manager",
      "SLA garantito",
      "Personalizzazioni",
    ],
    limitations: [],
    cta: "Contattaci",
    popular: false,
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="section-padding relative overflow-hidden">
      <div className="container relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="badge-primary mb-6">
            Prezzi trasparenti
          </div>

          <h2 className="text-display-sm md:text-display-md font-bold leading-tight mb-6">
            Scegli il tuo piano
          </h2>

          <p className="text-body-lg text-muted-foreground">
            Prezzi chiari, nessun costo nascosto. Cancella quando vuoi.
          </p>
        </motion.div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`relative ${plan.popular ? "lg:-mt-4 lg:mb-4" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium z-10">
                  Più popolare
                </div>
              )}

              <div
                className={`h-full ${
                  plan.popular ? "pricing-card-featured" : "pricing-card"
                }`}
              >
                <div className="space-y-6">
                  {/* Plan Header */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">{plan.name}</h3>

                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      {plan.period && (
                        <span className="text-muted-foreground text-sm">
                          {plan.period}
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {plan.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground/80">
                          {feature}
                        </span>
                      </div>
                    ))}
                    {plan.limitations.map((limitation) => (
                      <div
                        key={limitation}
                        className="flex items-start gap-3 opacity-50"
                      >
                        <Check className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">
                          {limitation}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "gradient-button text-primary-foreground"
                        : "bg-white/5 border border-white/10 hover:bg-white/10"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Money Back Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground text-sm">
            Garanzia soddisfatti o rimborsati 30 giorni •{" "}
            <span className="text-foreground">Nessuna carta richiesta per la prova</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
