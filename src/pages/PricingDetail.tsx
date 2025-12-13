import { motion } from "framer-motion";
import { useParams, Link, Navigate } from "react-router-dom";
import { Check, X, ArrowLeft, ArrowRight, Star, Zap, Users, BarChart3, Globe, Headphones, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLeadForm } from "@/hooks/useLeadForm";
import { LeadFormProvider } from "@/hooks/useLeadForm";
import LeadForm from "@/components/landing/LeadForm";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const plansData = {
  starter: {
    name: "Starter",
    price: "29",
    description: "Perfetto per piccoli ristoranti che vogliono iniziare a digitalizzarsi",
    tagline: "Inizia la tua trasformazione digitale",
    color: "primary",
    features: [
      { name: "Menu QR illimitato", included: true, description: "Genera tutti i QR code di cui hai bisogno" },
      { name: "Piatti illimitati", included: true, description: "Nessun limite al numero di piatti nel menu" },
      { name: "3 lingue", included: true, description: "Italiano, Inglese + 1 lingua a scelta" },
      { name: "Prenotazioni online", included: true, description: "Sistema di prenotazione automatico 24/7" },
      { name: "Supporto email prioritario", included: true, description: "Risposte entro 24 ore lavorative" },
      { name: "Dashboard analytics base", included: true, description: "Statistiche essenziali sul tuo ristorante" },
      { name: "Ordini asporto & delivery", included: false },
      { name: "Analytics avanzati", included: false },
      { name: "Multi-sede", included: false },
      { name: "Integrazioni API", included: false },
      { name: "Supporto WhatsApp", included: false },
      { name: "Account manager dedicato", included: false },
    ],
    highlights: [
      { icon: Globe, text: "Menu multilingua" },
      { icon: Clock, text: "Prenotazioni 24/7" },
      { icon: Headphones, text: "Supporto prioritario" },
    ],
  },
  pro: {
    name: "Pro",
    price: "59",
    description: "La scelta ideale per ristoranti in crescita che vogliono il massimo",
    tagline: "Tutto ciò di cui hai bisogno per crescere",
    color: "primary",
    featured: true,
    features: [
      { name: "Menu QR illimitato", included: true, description: "Genera tutti i QR code di cui hai bisogno" },
      { name: "Piatti illimitati", included: true, description: "Nessun limite al numero di piatti nel menu" },
      { name: "Lingue illimitate", included: true, description: "Supporta clienti da tutto il mondo" },
      { name: "Prenotazioni online", included: true, description: "Sistema di prenotazione automatico 24/7" },
      { name: "Supporto prioritario", included: true, description: "Risposte entro 12 ore lavorative" },
      { name: "Ordini asporto & delivery", included: true, description: "Gestisci ordini senza commissioni" },
      { name: "Analytics avanzati", included: true, description: "Report dettagliati su vendite e clienti" },
      { name: "Multi-sede (fino a 3)", included: true, description: "Gestisci fino a 3 ristoranti da un'unica dashboard" },
      { name: "Integrazioni", included: true, description: "Collegati a POS, stampanti e altri strumenti" },
      { name: "Supporto WhatsApp", included: true, description: "Assistenza diretta via chat" },
      { name: "Account manager dedicato", included: false },
      { name: "SLA garantito", included: false },
    ],
    highlights: [
      { icon: Zap, text: "Zero commissioni" },
      { icon: BarChart3, text: "Analytics avanzati" },
      { icon: Users, text: "Multi-sede" },
    ],
  },
  enterprise: {
    name: "Enterprise",
    price: "Custom",
    description: "Soluzione su misura per catene e franchising con esigenze specifiche",
    tagline: "Potenza e flessibilità senza limiti",
    color: "accent",
    features: [
      { name: "Tutto in Pro", included: true, description: "Tutte le funzionalità del piano Pro" },
      { name: "Sedi illimitate", included: true, description: "Gestisci tutte le tue sedi da un'unica piattaforma" },
      { name: "API personalizzate", included: true, description: "Integrazioni custom per le tue esigenze" },
      { name: "Account manager dedicato", included: true, description: "Un esperto sempre al tuo fianco" },
      { name: "SLA garantito", included: true, description: "Uptime garantito al 99.9%" },
      { name: "Formazione on-site", included: true, description: "Training personalizzato per il tuo team" },
      { name: "White-label", included: true, description: "Personalizza l'app con il tuo brand" },
      { name: "Reportistica avanzata", included: true, description: "Dashboard executive con KPI personalizzati" },
      { name: "Single Sign-On (SSO)", included: true, description: "Integrazione con sistemi aziendali" },
      { name: "Supporto 24/7", included: true, description: "Assistenza sempre disponibile" },
    ],
    highlights: [
      { icon: Shield, text: "SLA garantito" },
      { icon: Users, text: "Account dedicato" },
      { icon: Zap, text: "Sedi illimitate" },
    ],
  },
};

const PricingDetailContent = () => {
  const { slug } = useParams<{ slug: string }>();
  const { openLeadForm } = useLeadForm();

  const plan = plansData[slug as keyof typeof plansData];

  if (!plan) {
    return <Navigate to="/" replace />;
  }

  const otherPlans = Object.entries(plansData)
    .filter(([key]) => key !== slug)
    .map(([key, value]) => ({ slug: key, ...value }));

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

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {plan.featured && (
                <div className="badge-primary mb-4">
                  <Star className="w-3 h-3" />
                  <span>Più popolare</span>
                </div>
              )}
              
              <h1 className="text-display-sm md:text-display-md font-bold mb-4">
                <span className="text-foreground">Piano </span>
                <span className="gradient-text">{plan.name}</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-6">
                {plan.tagline}
              </p>
              
              <p className="text-body-lg text-muted-foreground mb-8">
                {plan.description}
              </p>

              {/* Highlights */}
              <div className="flex flex-wrap gap-4 mb-8">
                {plan.highlights.map((highlight, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-foreground">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <highlight.icon className="w-4 h-4 text-primary" />
                    </div>
                    {highlight.text}
                  </div>
                ))}
              </div>

              <Button
                onClick={() => openLeadForm(`pricing-detail-${slug}`)}
                className="gradient-button rounded-full px-8 py-6 text-lg"
              >
                Inizia la prova gratuita
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`pricing-card ${plan.featured ? 'pricing-card-featured' : ''} p-10`}
            >
              <div className="text-center mb-8">
                {plan.price === "Custom" ? (
                  <div className="text-4xl font-bold text-foreground">Prezzo su misura</div>
                ) : (
                  <>
                    <div className="text-6xl font-bold text-foreground">€{plan.price}</div>
                    <div className="text-muted-foreground">/mese per sede</div>
                  </>
                )}
              </div>

              <div className="space-y-2 text-sm text-muted-foreground text-center">
                <p>✓ 14 giorni di prova gratuita</p>
                <p>✓ Nessuna carta richiesta</p>
                <p>✓ Cancella quando vuoi</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features List */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-display-xs md:text-display-sm font-bold mb-4">
              Cosa include il piano {plan.name}
            </h2>
            <p className="text-muted-foreground">
              Tutte le funzionalità per far crescere il tuo ristorante
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <div className="bento-card p-0 overflow-hidden">
              {plan.features.map((feature, index) => (
                <motion.div
                  key={feature.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="comparison-row"
                >
                  <div className="flex items-center gap-3">
                    {feature.included ? (
                      <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 text-success" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                        <X className="w-3.5 h-3.5 text-muted-foreground" />
                      </div>
                    )}
                    <div>
                      <span className={feature.included ? "text-foreground" : "text-muted-foreground"}>
                        {feature.name}
                      </span>
                      {feature.description && feature.included && (
                        <p className="text-xs text-muted-foreground">{feature.description}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Other Plans */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-display-xs md:text-display-sm font-bold mb-4">
              Esplora altri piani
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {otherPlans.map((otherPlan, index) => (
              <motion.div
                key={otherPlan.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link 
                  to={`/pricing/${otherPlan.slug}`}
                  className="block pricing-card hover:border-primary/30 group"
                >
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {otherPlan.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">{otherPlan.tagline}</p>
                  <div className="flex items-center justify-between">
                    {otherPlan.price === "Custom" ? (
                      <span className="text-lg font-bold text-foreground">Su misura</span>
                    ) : (
                      <span className="text-lg font-bold text-foreground">€{otherPlan.price}/mese</span>
                    )}
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-display-xs md:text-display-sm font-bold mb-4">
              Pronto a iniziare?
            </h2>
            <p className="text-muted-foreground mb-8">
              Inizia la tua prova gratuita di 14 giorni. Nessuna carta di credito richiesta.
            </p>
            <Button
              onClick={() => openLeadForm(`pricing-detail-cta-${slug}`)}
              className="gradient-button rounded-full px-8 py-6 text-lg"
            >
              Prova {plan.name} gratis
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

const PricingDetail = () => (
  <LeadFormProvider>
    <PricingDetailContent />
  </LeadFormProvider>
);

export default PricingDetail;
