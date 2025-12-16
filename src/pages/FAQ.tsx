/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * NESTIFY - FAQ Page
 * Centro Assistenza e Domande Frequenti
 * 
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * Web Development & Digital Solutions
 * 
 * © 2024 StudioJEM - Tutti i diritti riservati
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  CreditCard,
  Globe,
  HelpCircle,
  MessageCircle,
  Search,
  Settings,
  Sparkles,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SharedNavbar from "@/components/shared/SharedNavbar";
import Footer from "@/components/landing/Footer";
import DynamicSEO from "@/components/DynamicSEO";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

interface FAQCategory {
  id: string;
  label: string;
  icon: LucideIcon;
}

const faqCategories: FAQCategory[] = [
  { id: "all", label: "Tutte", icon: Sparkles },
  { id: "pricing", label: "Prezzi", icon: CreditCard },
  { id: "features", label: "Funzionalità", icon: Settings },
  { id: "technical", label: "Tecnico", icon: Zap },
  { id: "international", label: "Internazionale", icon: Globe },
];

const faqs: FAQItem[] = [
  {
    question: "Come funziona il white-label per agenzie?",
    answer:
      "Con il piano Enterprise puoi rivendere Nestify con il tuo brand. I tuoi clienti non vedranno mai il nostro logo. Hai accesso a un pannello multi-tenant per gestire tutti gli immobili, fatturazione separata e margini personalizzabili.",
    category: "pricing",
  },
  {
    question: "Ci sono commissioni sulle prenotazioni?",
    answer:
      "Assolutamente no! Non prendiamo commissioni sulle prenotazioni come fanno altri portali. Paghi solo l'abbonamento mensile, tutto incluso. Zero sorprese.",
    category: "pricing",
  },
  {
    question: "Funziona per appartamenti, B&B e case vacanza?",
    answer:
      "Certamente! Nestify è perfetto per ogni tipo di struttura ricettiva: appartamenti, B&B, case vacanza, ville, residence, agriturismi, glamping. Gestisci qualsiasi tipologia di immobile da un'unica dashboard.",
    category: "features",
  },
  {
    question: "Posso migrare da un'altra piattaforma?",
    answer:
      "Certo! Offriamo migrazione gratuita assistita per tutti i piani a pagamento. Importiamo i tuoi immobili e prenotazioni da altre piattaforme. Il nostro team ti guida in ogni step.",
    category: "technical",
  },
  {
    question: "Le comunicazioni sono tradotte automaticamente?",
    answer:
      "Sì! Nestify supporta 5 lingue (Italiano, Inglese, Tedesco, Spagnolo, Francese). Puoi scegliere la traduzione automatica AI oppure inserire traduzioni manuali per un controllo totale. Perfetto per host con ospiti internazionali.",
    category: "international",
  },
  {
    question: "Funziona offline?",
    answer:
      "Nestify è una PWA (Progressive Web App). Una volta caricato, funziona anche con connessione instabile. Puoi installarlo come app sul telefono senza passare dagli store.",
    category: "technical",
  },
  {
    question: "Posso gestire più proprietà?",
    answer:
      "Sì! Con i piani Pro e Enterprise puoi gestire più immobili da un unico pannello. Calendar sincronizzati, analytics aggregati, gestione centralizzata. Perfetto per property manager professionisti.",
    category: "features",
  },
  {
    question: "Come funziona il channel manager?",
    answer:
      "Il channel manager sincronizza automaticamente disponibilità e prezzi con Airbnb, Booking.com, Vrbo e altri portali. Eviti overbooking e gestisci tutto da un'unica dashboard.",
    category: "features",
  },
  {
    question: "Qual è la differenza con i grandi portali?",
    answer:
      "I portali prendono fino al 15-20% di commissioni. Noi zero commissioni. Nestify è tuo: i clienti sono tuoi, i dati sono tuoi, il profitto è 100% tuo. E offri un'esperienza migliore e personalizzata.",
    category: "pricing",
  },
  {
    question: "Supportate pagamenti internazionali?",
    answer:
      "Sì! Integriamo Stripe, PayPal, bonifico bancario e altri metodi. I tuoi ospiti internazionali pagano come preferiscono, nella loro valuta.",
    category: "international",
  },
  {
    question: "Quanto tempo serve per configurare Nestify?",
    answer:
      "Mediamente 10-15 minuti per aggiungere un immobile. Puoi importare dati esistenti o iniziare da zero. Il nostro team offre setup assistito gratuito per i piani Pro e Enterprise.",
    category: "technical",
  },
  {
    question: "Posso cambiare piano in qualsiasi momento?",
    answer:
      "Sì! Puoi fare upgrade o downgrade del piano in qualsiasi momento. L'upgrade è immediato, il downgrade avviene alla fine del periodo di fatturazione corrente.",
    category: "pricing",
  },
  {
    question: "Come funziona il check-in automatico?",
    answer:
      "Invii automaticamente istruzioni di check-in, codici smart lock, indicazioni stradali. Gli ospiti ricevono tutto via email e WhatsApp. Zero chiamate, zero problemi.",
    category: "features",
  },
  {
    question: "Nestify è GDPR compliant?",
    answer:
      "Assolutamente sì. I dati sono conservati in server EU, offriamo export/cancellazione dati su richiesta, cookie banner integrato, informativa privacy personalizzabile. Siamo conformi a tutte le normative europee sulla privacy.",
    category: "technical",
  },
];

const FAQPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredFaqs = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return faqs.filter((faq) => {
      const matchesSearch =
        !q ||
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q);

      const matchesCategory =
        activeCategory === "all" || faq.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen bg-background">
      <DynamicSEO />
      {/* Dynamic Island Navigation */}
      <SharedNavbar />

      <main className="pt-20 pb-12 md:pt-24 md:pb-16">
        <div className="container max-w-4xl">
          {/* Page Header */}
          <div className="text-center mb-10 md:mb-12">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <HelpCircle className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">
                Centro Assistenza
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-foreground mb-4">
              Domande Frequenti
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Trova risposte alle domande più comuni su Nestify, i nostri piani e le funzionalità
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Cerca una domanda..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-base bg-card border-border focus:border-primary rounded-2xl"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Pulisci ricerca"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex overflow-x-auto scrollbar-hide gap-2 mb-8 md:mb-10 pb-2 px-2 sm:px-0 sm:flex-wrap sm:justify-center">
            {faqCategories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              const count =
                cat.id === "all"
                  ? faqs.length
                  : faqs.filter((f) => f.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.label}
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full ${
                      isActive ? "bg-white/20" : "bg-muted"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* FAQ Items */}
          {filteredFaqs.length > 0 ? (
            <Accordion type="multiple" className="space-y-3">
              {filteredFaqs.map((faq, index) => (
                <AccordionItem
                  key={faq.question}
                  value={`${activeCategory}-${index}`}
                  className="group border-0"
                >
                  <div className="rounded-2xl bg-card border border-border overflow-hidden transition-colors hover:border-primary/20 group-data-[state=open]:border-primary/30">
                    <AccordionTrigger className="p-5 text-left hover:no-underline">
                      <span className="font-semibold text-foreground pr-4">
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-5 pb-5">
                      <div className="h-px bg-border mb-4" />
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </AccordionContent>
                  </div>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">
                Nessun risultato trovato per &quot;{searchQuery}&quot;
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="text-primary hover:underline mt-2"
              >
                Mostra tutte le domande
              </button>
            </div>
          )}

          {/* Contact CTA */}
          <div className="mt-14 md:mt-16">
            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-primary/10 via-card to-accent/5 border border-primary/20 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">
                    Non trovi la risposta?
                  </h3>
                  <p className="text-muted-foreground">
                    Il nostro team è pronto ad aiutarti via WhatsApp
                  </p>
                </div>
                <a
                  href="https://wa.me/393533811359"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="gradient-button gap-2" size="lg">
                    <MessageCircle className="w-5 h-5" />
                    Contattaci su WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQPage;

// Also export as FAQ for compatibility
export { FAQPage as FAQ };