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
    question: "Che cos'è Nestify?",
    answer:
      "Nestify è una piattaforma all-in-one per bar, ristoranti, pub e caffetterie: menu QR, ordini asporto e delivery, prenotazioni, loyalty e analytics in un'unica dashboard.",
    category: "features",
  },
  {
    question: "In quanto tempo posso essere online?",
    answer:
      "In media in 10 minuti: carichi il menu (anche da Excel), scegli un tema e generi il tuo QR. Se vuoi, ti aiutiamo noi nel setup.",
    category: "technical",
  },
  {
    question: "Ci sono commissioni sugli ordini?",
    answer:
      "No: Nestify non prende commissioni sugli ordini. Paghi solo il piano scelto, senza costi nascosti.",
    category: "pricing",
  },
  {
    question: "Posso gestire prenotazioni e eventi?",
    answer:
      "Sì: calendario prenotazioni, conferma automatica (anche via WhatsApp) e gestione eventi speciali con capienza, sale e note.",
    category: "features",
  },
  {
    question: "Gestite allergeni e diete?",
    answer:
      "Sì: puoi impostare gli allergeni per ogni piatto e mostrare badge chiari sul menu. Ideale anche per opzioni vegane/vegetariane e senza glutine.",
    category: "features",
  },
  {
    question: "Delivery con tracking GPS: come funziona?",
    answer:
      "Puoi gestire consegne interne e assegnare driver. I clienti vedono lo stato dell'ordine e, dove previsto, il tracking in tempo reale.",
    category: "technical",
  },
  {
    question: "Supportate più sedi?",
    answer:
      "Sì: con i piani Pro/Enterprise puoi gestire più sedi con menu, ordini e analytics separati o aggregati.",
    category: "features",
  },
  {
    question: "Il menu è multi-lingua?",
    answer:
      "Sì: puoi offrire il menu in più lingue. Utile per locali turistici; puoi usare traduzioni automatiche o inserire testi manuali.",
    category: "international",
  },
  {
    question: "Posso personalizzare grafica e branding?",
    answer:
      "Certo: scegli temi e colori, carichi il logo e personalizzi lo stile del menu per renderlo coerente con il tuo brand.",
    category: "features",
  },
  {
    question: "Nestify è GDPR compliant?",
    answer:
      "Sì: gestione cookie e privacy, data retention e protezione dei dati secondo le normative europee. Possiamo supportarti con l'informativa.",
    category: "technical",
  },
  {
    question: "Posso cambiare piano quando voglio?",
    answer:
      "Sì: puoi fare upgrade o downgrade in qualsiasi momento. L'upgrade è immediato, il downgrade a fine periodo di fatturazione.",
    category: "pricing",
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
              Trova risposte alle domande più comuni su Nestify, i piani e le funzionalità per il tuo locale
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