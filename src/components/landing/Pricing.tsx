import { motion } from "framer-motion";
import { Check, Sparkles, Crown, Zap, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Gratis",
    price: "€0",
    period: "/mese",
    description: "Perfetto per iniziare e provare la piattaforma",
    icon: Zap,
    features: [
      "1 menu",
      "20 piatti",
      "QR Code base",
      "Multi-lingua",
      "Dark/Light mode",
    ],
    limitations: ["Branding MenuLink", "Supporto community"],
    cta: "Inizia Gratis",
    popular: false,
    gradient: "from-muted to-muted",
  },
  {
    name: "Starter",
    price: "€29",
    period: "/mese",
    description: "Per ristoranti che vogliono crescere",
    icon: Sparkles,
    features: [
      "3 menu",
      "100 piatti",
      "Prenotazioni",
      "Analytics base",
      "Nessun branding",
      "QR personalizzato",
      "Supporto email",
    ],
    limitations: [],
    cta: "Prova Gratis 14 Giorni",
    popular: true,
    gradient: "from-primary to-accent",
  },
  {
    name: "Pro",
    price: "€79",
    period: "/mese",
    description: "Funzionalità complete per locali ambiziosi",
    icon: Crown,
    features: [
      "Menu illimitati",
      "Piatti illimitati",
      "Takeaway & Delivery",
      "Loyalty & Rewards",
      "WhatsApp notifications",
      "Analytics avanzati",
      "Subdomain personalizzato",
      "Supporto prioritario",
    ],
    limitations: [],
    cta: "Prova Gratis 14 Giorni",
    popular: false,
    gradient: "from-success to-emerald-600",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Per catene e agenzie con esigenze speciali",
    icon: Building2,
    features: [
      "White-label completo",
      "Multi-location",
      "API access",
      "SSO & SAML",
      "Account manager",
      "SLA garantito",
      "Formazione team",
      "Personalizzazioni",
    ],
    limitations: [],
    cta: "Contattaci",
    popular: false,
    gradient: "from-warning to-orange-600",
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 section-gradient" />
      <div className="absolute top-1/4 left-0 w-96 h-96 orb-primary opacity-20" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 orb-accent opacity-15" />

      <div className="container relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-6"
        >
          <div className="inline-block px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold tracking-wide uppercase">
            💰 Prezzi Trasparenti
          </div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Costa Meno di{" "}
            <span className="gradient-text">Una Pizza al Mese</span>
          </h2>

          <p className="text-xl text-muted-foreground leading-relaxed">
            Nessun costo nascosto. Nessuna commissione sugli ordini. Paghi solo
            l'abbonamento.
          </p>
        </motion.div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative ${plan.popular ? "lg:-mt-4 lg:mb-4" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-bold z-10">
                  ⭐ Più Popolare
                </div>
              )}

              <div
                className={`h-full ${
                  plan.popular
                    ? "pricing-card-featured"
                    : "pricing-card border border-white/10"
                } hover:scale-[1.02] transition-all duration-300`}
              >
                <div className="relative z-10 space-y-6">
                  {/* Plan Header */}
                  <div className="space-y-4">
                    <div
                      className={`icon-container-md bg-gradient-to-br ${plan.gradient}`}
                    >
                      <plan.icon className="w-5 h-5 text-white" />
                    </div>

                    <div>
                      <h3 className="font-display text-xl font-bold">
                        {plan.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {plan.description}
                      </p>
                    </div>

                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">
                        {plan.period}
                      </span>
                    </div>
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
                        ? "gradient-primary gradient-primary-hover"
                        : "bg-secondary hover:bg-secondary/80"
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground">
            🔒 Garanzia soddisfatti o rimborsati 30 giorni •{" "}
            <span className="text-foreground">Nessuna carta richiesta per la prova</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
