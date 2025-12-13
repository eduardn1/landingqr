import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, X, ArrowLeft, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLeadForm } from "@/hooks/useLeadForm";
import { LeadFormProvider } from "@/hooks/useLeadForm";
import LeadForm from "@/components/landing/LeadForm";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const plans = [
  { name: "Starter", price: "29", slug: "starter" },
  { name: "Pro", price: "59", slug: "pro", featured: true },
  { name: "Enterprise", price: "Custom", slug: "enterprise" },
];

const featureCategories = [
  {
    name: "Menu & Contenuti",
    features: [
      { name: "Menu QR", starter: "Illimitato", pro: "Illimitato", enterprise: "Illimitato" },
      { name: "Piatti", starter: "Illimitati", pro: "Illimitati", enterprise: "Illimitati" },
      { name: "Lingue", starter: "3", pro: "Illimitate", enterprise: "Illimitate" },
      { name: "Foto piatti", starter: true, pro: true, enterprise: true },
      { name: "Descrizioni AI", starter: false, pro: true, enterprise: true },
      { name: "Menu stagionali", starter: true, pro: true, enterprise: true },
    ],
  },
  {
    name: "Prenotazioni & Ordini",
    features: [
      { name: "Prenotazioni online", starter: true, pro: true, enterprise: true },
      { name: "Conferma automatica", starter: true, pro: true, enterprise: true },
      { name: "Ordini asporto", starter: false, pro: true, enterprise: true },
      { name: "Ordini delivery", starter: false, pro: true, enterprise: true },
      { name: "Pagamenti online", starter: false, pro: true, enterprise: true },
      { name: "Commissioni ordini", starter: "-", pro: "0%", enterprise: "0%" },
    ],
  },
  {
    name: "Analytics & Report",
    features: [
      { name: "Dashboard base", starter: true, pro: true, enterprise: true },
      { name: "Report vendite", starter: "Base", pro: "Avanzato", enterprise: "Custom" },
      { name: "Analisi clienti", starter: false, pro: true, enterprise: true },
      { name: "Heatmap menu", starter: false, pro: true, enterprise: true },
      { name: "Export dati", starter: "CSV", pro: "CSV, PDF", enterprise: "API" },
      { name: "Report automatici", starter: false, pro: "Settimanali", enterprise: "Giornalieri" },
    ],
  },
  {
    name: "Gestione & Sedi",
    features: [
      { name: "Sedi", starter: "1", pro: "Fino a 3", enterprise: "Illimitate" },
      { name: "Utenti staff", starter: "2", pro: "10", enterprise: "Illimitati" },
      { name: "Ruoli e permessi", starter: "Base", pro: "Avanzati", enterprise: "Custom" },
      { name: "Multi-brand", starter: false, pro: false, enterprise: true },
      { name: "White-label", starter: false, pro: false, enterprise: true },
    ],
  },
  {
    name: "Integrazioni",
    features: [
      { name: "POS integrations", starter: false, pro: true, enterprise: true },
      { name: "Stampanti fiscali", starter: false, pro: true, enterprise: true },
      { name: "Social media", starter: false, pro: true, enterprise: true },
      { name: "API pubbliche", starter: false, pro: "Limitato", enterprise: "Full" },
      { name: "Webhook", starter: false, pro: false, enterprise: true },
      { name: "SSO", starter: false, pro: false, enterprise: true },
    ],
  },
  {
    name: "Supporto",
    features: [
      { name: "Supporto email", starter: "48h", pro: "24h", enterprise: "4h" },
      { name: "Supporto chat", starter: false, pro: true, enterprise: true },
      { name: "Supporto WhatsApp", starter: false, pro: true, enterprise: true },
      { name: "Supporto telefonico", starter: false, pro: false, enterprise: true },
      { name: "Account manager", starter: false, pro: false, enterprise: true },
      { name: "Formazione on-site", starter: false, pro: false, enterprise: true },
      { name: "SLA garantito", starter: false, pro: false, enterprise: "99.9%" },
    ],
  },
];

const renderValue = (value: boolean | string) => {
  if (typeof value === "boolean") {
    return value ? (
      <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center mx-auto">
        <Check className="w-3.5 h-3.5 text-success" />
      </div>
    ) : (
      <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center mx-auto">
        <X className="w-3.5 h-3.5 text-muted-foreground" />
      </div>
    );
  }
  return <span className="text-foreground font-medium">{value}</span>;
};

const PricingComparisonContent = () => {
  const { openLeadForm } = useLeadForm();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 radial-gradient" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
        
        <div className="container relative z-10">
          <Link 
            to="/#pricing" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Torna ai piani
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-display-sm md:text-display-md font-bold mb-6">
              <span className="text-foreground">Confronta i </span>
              <span className="gradient-text">piani</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Trova il piano perfetto per le esigenze del tuo ristorante
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sticky Header */}
      <section className="py-8 sticky top-16 z-40 bg-background/95 backdrop-blur-xl border-b border-border">
        <div className="container">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1" />
            {plans.map((plan) => (
              <motion.div
                key={plan.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                {plan.featured && (
                  <div className="badge-primary text-xs mb-2 mx-auto">
                    <Star className="w-3 h-3" />
                    <span>Popolare</span>
                  </div>
                )}
                <h3 className="font-bold text-foreground text-lg">{plan.name}</h3>
                <div className="text-muted-foreground text-sm">
                  {plan.price === "Custom" ? "Su misura" : `€${plan.price}/mese`}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-12">
        <div className="container">
          {featureCategories.map((category, catIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h3 className="text-lg font-bold text-foreground mb-4 pb-2 border-b border-border">
                {category.name}
              </h3>
              
              <div className="bento-card p-0 overflow-hidden">
                {category.features.map((feature, index) => (
                  <div
                    key={feature.name}
                    className={`grid grid-cols-4 gap-4 p-4 ${
                      index < category.features.length - 1 ? "border-b border-border" : ""
                    } hover:bg-muted/30 transition-colors`}
                  >
                    <div className="text-muted-foreground text-sm">
                      {feature.name}
                    </div>
                    <div className="text-center text-sm">
                      {renderValue(feature.starter)}
                    </div>
                    <div className="text-center text-sm">
                      {renderValue(feature.pro)}
                    </div>
                    <div className="text-center text-sm">
                      {renderValue(feature.enterprise)}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}

          {/* CTA Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="grid grid-cols-4 gap-4 mt-12"
          >
            <div className="col-span-1" />
            {plans.map((plan) => (
              <div key={plan.slug} className="text-center">
                <Button
                  onClick={() => openLeadForm(`comparison-${plan.slug}`)}
                  className={`w-full ${
                    plan.featured
                      ? "gradient-button"
                      : "bg-secondary hover:bg-secondary/80 text-foreground"
                  }`}
                >
                  Scegli {plan.name}
                </Button>
                <Link 
                  to={`/pricing/${plan.slug}`}
                  className="block mt-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Dettagli →
                </Link>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-display-xs md:text-display-sm font-bold mb-4">
              Hai ancora dubbi?
            </h2>
            <p className="text-muted-foreground mb-8">
              Il nostro team è qui per aiutarti a scegliere il piano giusto per te.
            </p>
            <Button
              onClick={() => openLeadForm("comparison-help")}
              className="gradient-button rounded-full px-8 py-6"
            >
              Parla con un esperto
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
      <LeadForm />
    </div>
  );
};

const PricingComparison = () => (
  <LeadFormProvider>
    <PricingComparisonContent />
  </LeadFormProvider>
);

export default PricingComparison;
