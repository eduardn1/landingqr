/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * QRCODESTUDIOJEM - Partner FAQ Page
 * FAQ dedicate al programma partner/rivenditori
 * 
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * Web Development & Digital Solutions
 * 
 * © 2024 StudioJEM - Tutti i diritti riservati
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { memo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SharedNavbar from "@/components/shared/SharedNavbar";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRight,
  HelpCircle,
  Sparkles,
  Handshake,
  CreditCard,
  Users,
  Settings,
  Rocket,
  Shield,
  Mail,
} from "lucide-react";

const faqCategories = [
  {
    id: "generale",
    title: "Informazioni Generali",
    icon: HelpCircle,
    color: "primary",
    questions: [
      {
        q: "Cos'è il Programma Partner Flavour?",
        a: "Il Programma Partner è pensato per agenzie web, consulenti IT, web agency e professionisti che vogliono offrire ai propri clienti soluzioni digitali per l'hospitality. Come partner, potrai rivendere i nostri servizi con condizioni economiche vantaggiose e supporto dedicato.",
      },
      {
        q: "Chi può diventare Partner?",
        a: "Il programma è aperto a web agency, sviluppatori freelance, consulenti digitali, agenzie di marketing e qualsiasi professionista che lavora con clienti nel settore hospitality (ristoranti, bar, pub, caffetterie, hotel, etc.).",
      },
      {
        q: "Ci sono requisiti minimi per aderire?",
        a: "Non ci sono requisiti minimi di volume o fatturato. Cerchiamo partner motivati e professionali che condividano la nostra visione di digitalizzazione dell'hospitality. Non serve esperienza pregressa con i nostri prodotti.",
      },
      {
        q: "Quanto tempo richiede il processo di attivazione?",
        a: "Una volta ricevuta la tua candidatura, ti contatteremo entro 24 ore. L'intero processo di onboarding, inclusa la formazione iniziale, richiede generalmente 3-5 giorni lavorativi.",
      },
    ],
  },
  {
    id: "economico",
    title: "Aspetti Economici",
    icon: CreditCard,
    color: "accent",
    questions: [
      {
        q: "Quanto costa diventare Partner?",
        a: "L'adesione al programma è completamente gratuita. Non ci sono costi di attivazione, canoni mensili o fee nascoste. Guadagni solo quando vendi.",
      },
      {
        q: "Come funziona il sistema di commissioni?",
        a: "Riceverai una commissione ricorrente su ogni cliente che attivi. Le percentuali variano in base al volume e al tipo di piano venduto. I dettagli specifici vengono discussi durante l'onboarding.",
      },
      {
        q: "Quando e come vengo pagato?",
        a: "I pagamenti vengono effettuati mensilmente tramite bonifico bancario. Riceverai un report dettagliato di tutte le commissioni maturate nel mese precedente.",
      },
      {
        q: "Posso impostare i miei prezzi?",
        a: "Sì, hai libertà di pricing. Puoi aggiungere il tuo markup ai nostri prezzi base o includere i nostri servizi in pacchetti più ampi che offri ai tuoi clienti.",
      },
    ],
  },
  {
    id: "gestione",
    title: "Gestione Clienti",
    icon: Users,
    color: "rose",
    questions: [
      {
        q: "Come gestisco i clienti che porto?",
        a: "Avrai accesso a una dashboard dedicata dove potrai vedere tutti i tuoi clienti, il loro stato, le statistiche di utilizzo e gestire le richieste di supporto. Tutto da un'unica interfaccia.",
      },
      {
        q: "Il cliente sa che sono un rivenditore?",
        a: "Dipende da te. Puoi scegliere di operare in modalità White Label completa, dove il cliente vede solo il tuo brand, oppure co-branded con Flavour visibile.",
      },
      {
        q: "Cosa succede se un cliente ha problemi tecnici?",
        a: "Puoi scegliere di gestire tu il primo livello di supporto o di passare direttamente le richieste al nostro team. In ogni caso, hai sempre accesso al nostro supporto tecnico prioritario.",
      },
      {
        q: "Posso trasferire clienti esistenti al programma?",
        a: "Sì, se hai già clienti che utilizzano Flavour, possiamo migrare i loro account sotto la tua gestione partner. Contattaci per i dettagli.",
      },
    ],
  },
  {
    id: "tecnico",
    title: "Aspetti Tecnici",
    icon: Settings,
    color: "emerald",
    questions: [
      {
        q: "Devo avere competenze tecniche?",
        a: "No, non sono richieste competenze di programmazione. La piattaforma è progettata per essere configurata senza codice. Ti forniremo comunque una formazione completa.",
      },
      {
        q: "Come funziona il White Label?",
        a: "Con l'opzione White Label puoi personalizzare completamente la piattaforma: logo, colori, dominio personalizzato. I tuoi clienti vedranno solo il tuo brand.",
      },
      {
        q: "Ricevo accesso anticipato alle nuove funzionalità?",
        a: "Sì, i partner hanno accesso alla beta delle nuove funzionalità prima del rilascio pubblico. Inoltre, le tue richieste di feature hanno priorità nel nostro roadmap.",
      },
      {
        q: "C'è documentazione tecnica disponibile?",
        a: "Assolutamente. Avrai accesso a documentazione completa, video tutorial, guide passo-passo e una knowledge base sempre aggiornata.",
      },
    ],
  },
  {
    id: "supporto",
    title: "Formazione e Supporto",
    icon: Rocket,
    color: "primary",
    questions: [
      {
        q: "Che tipo di formazione ricevo?",
        a: "L'onboarding include sessioni di formazione personalizzate sulla piattaforma, strategie di vendita, best practices e casi d'uso. Inoltre, organizziamo webinar periodici di aggiornamento.",
      },
      {
        q: "Come funziona il supporto per i partner?",
        a: "Hai accesso a un canale di supporto dedicato con tempi di risposta prioritari (entro 24h). Inoltre, avrai un account manager di riferimento per questioni commerciali.",
      },
      {
        q: "Ricevo materiali di marketing?",
        a: "Sì, forniamo kit di marketing completi: presentazioni, brochure, case study, template email e contenuti social pronti all'uso e personalizzabili.",
      },
      {
        q: "Ci sono eventi o community per i partner?",
        a: "Organizziamo meetup periodici (online e in presenza), webinar formativi e abbiamo un gruppo esclusivo per lo scambio di idee e best practices tra partner.",
      },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const PartnerFAQ = memo(() => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <SharedNavbar />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
          </div>

          <div className="container relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <HelpCircle className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">FAQ Partner</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl font-bold leading-tight text-foreground mb-6">
                Domande frequenti sul{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Programma Partner
                </span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Tutto quello che devi sapere per diventare un partner Flavour. 
                Non trovi la risposta? Contattaci direttamente.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="gap-2 rounded-full" asChild>
                  <Link to="/diventa-rivenditore">
                    <Handshake className="w-4 h-4" />
                    Diventa Partner
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="gap-2 rounded-full" asChild>
                  <Link to="/contatti">
                    <Mail className="w-4 h-4" />
                    Contattaci
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="py-12 md:py-20">
          <div className="container">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="max-w-4xl mx-auto space-y-8"
            >
              {faqCategories.map((category) => {
                const colorClasses = {
                  primary: "from-primary to-primary/60",
                  accent: "from-accent to-accent/60",
                  rose: "from-rose-500 to-rose-500/60",
                  emerald: "from-emerald-500 to-emerald-500/60",
                };

                return (
                  <motion.div
                    key={category.id}
                    variants={itemVariants}
                    className="rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50 overflow-hidden"
                  >
                    {/* Category Header */}
                    <div className="p-6 border-b border-border/50 bg-muted/30">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClasses[category.color as keyof typeof colorClasses]} flex items-center justify-center`}>
                          <category.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h2 className="text-xl font-semibold text-foreground">
                            {category.title}
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            {category.questions.length} domande
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Questions */}
                    <Accordion type="single" collapsible className="px-6">
                      {category.questions.map((faq, index) => (
                        <AccordionItem 
                          key={index} 
                          value={`${category.id}-${index}`}
                          className="border-border/50"
                        >
                          <AccordionTrigger className="text-left hover:text-primary transition-colors py-5">
                            <span className="pr-4">{faq.q}</span>
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                            {faq.a}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <div className="rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50 p-8 md:p-10 text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-5">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                  Hai altre domande?
                </h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Il nostro team è pronto ad aiutarti. Contattaci per una consulenza gratuita sul programma partner.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button size="lg" className="gap-2 rounded-full" asChild>
                    <Link to="/diventa-rivenditore">
                      <Rocket className="w-4 h-4" />
                      Candidati ora
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="gap-2 rounded-full" asChild>
                    <Link to="/contatti">
                      Parla con noi
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>

                <div className="mt-8 pt-6 border-t border-border/50">
                  <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      <span>Nessun costo di attivazione</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span>100+ partner attivi</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-primary" />
                      <span>Risposta entro 24h</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
});

PartnerFAQ.displayName = "PartnerFAQ";

export default PartnerFAQ;
