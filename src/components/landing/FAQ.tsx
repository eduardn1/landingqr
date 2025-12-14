/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * QRCODESTUDIOJEM - FAQ Section (2026 Design)
 * Accordion animato con search bar e categorizzazione
 * 
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * Web Development & Digital Solutions
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { HelpCircle, MessageCircle, Search, ChevronDown, Sparkles, CreditCard, Settings, Globe, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { LucideIcon } from "lucide-react";

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
    answer: "Con il piano Enterprise puoi rivendere Flavour con il tuo brand. I tuoi clienti non vedranno mai il nostro logo. Hai accesso a un pannello multi-tenant per gestire tutti i ristoranti, fatturazione separata e margini personalizzabili.",
    category: "pricing",
  },
  {
    question: "C'è una fee di setup o commissioni sugli ordini?",
    answer: "Assolutamente no! Non prendiamo commissioni sugli ordini come fanno i grandi aggregatori. Paghi solo l'abbonamento mensile, tutto incluso. Zero sorprese.",
    category: "pricing",
  },
  {
    question: "Posso migrare da un'altra piattaforma?",
    answer: "Certo! Offriamo migrazione gratuita assistita per tutti i piani a pagamento. Importiamo menu da Excel, CSV o direttamente da altre piattaforme. Il nostro team ti guida in ogni step.",
    category: "technical",
  },
  {
    question: "I menu sono tradotti automaticamente?",
    answer: "Sì! Flavour supporta 5 lingue (Italiano, Inglese, Tedesco, Spagnolo, Francese). Puoi scegliere la traduzione automatica AI oppure inserire traduzioni manuali per un controllo totale.",
    category: "international",
  },
  {
    question: "Funziona offline?",
    answer: "Flavour è una PWA (Progressive Web App). Una volta caricato, funziona anche con connessione instabile. I clienti possono installarlo come app sul telefono senza passare dagli store.",
    category: "technical",
  },
  {
    question: "Posso gestire più sedi?",
    answer: "Sì! Con i piani Pro e Enterprise puoi gestire più ristoranti da un unico pannello. Menu condivisi, analytics aggregati, gestione centralizzata del personale.",
    category: "features",
  },
  {
    question: "Come funzionano le prenotazioni?",
    answer: "I clienti prenotano direttamente dal menu digitale. Ricevi notifica istantanea, conferma automatica via WhatsApp, reminder prima della prenotazione. Sistema anti no-show incluso.",
    category: "features",
  },
  {
    question: "Posso personalizzare il design?",
    answer: "Assolutamente! Hai 8 template premium tra cui scegliere, più personalizzazione completa di colori, font, logo. Il tuo brand, il tuo stile. Zero codice richiesto.",
    category: "features",
  },
  {
    question: "Qual è la differenza con Just Eat o Deliveroo?",
    answer: "Loro prendono fino al 30% di commissioni su ogni ordine. Noi zero. Flavour è tuo: i clienti sono tuoi, i dati sono tuoi, il profitto è 100% tuo. E offri un'esperienza migliore.",
    category: "pricing",
  },
  {
    question: "Supportate pagamenti internazionali?",
    answer: "Sì! Integriamo Stripe, PayPal, Satispay, Apple Pay, Google Pay. I tuoi clienti internazionali pagano come preferiscono, nella loro valuta.",
    category: "international",
  },
];

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [openItems, setOpenItems] = useState<number[]>([]);

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesSearch = 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section id="faq" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />
      <div className="absolute inset-0 grid-pattern opacity-[0.02]" />
      
      <div className="container relative z-10 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 mb-8"
          >
            <HelpCircle className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Domande frequenti</span>
          </motion.div>
          
          <h2 className="font-display text-display-sm md:text-display-md font-bold leading-tight text-foreground mb-4">
            Hai domande?
          </h2>
          <p className="text-body-lg text-muted-foreground">
            Trova le risposte alle domande più comuni
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative mb-8"
        >
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
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
          )}
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {faqCategories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            const count = cat.id === "all" 
              ? faqs.length 
              : faqs.filter(f => f.category === cat.id).length;
            
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.label}
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-white/20' : 'bg-muted'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="space-y-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => {
                const isOpen = openItems.includes(index);
                
                return (
                  <motion.div
                    key={faq.question}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <div
                      className={`rounded-2xl bg-card border overflow-hidden transition-colors ${
                        isOpen ? 'border-primary/30' : 'border-border hover:border-primary/20'
                      }`}
                    >
                      <button
                        onClick={() => toggleItem(index)}
                        className="w-full flex items-center justify-between p-5 text-left"
                      >
                        <span className="font-semibold text-foreground pr-4">
                          {faq.question}
                        </span>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                            isOpen ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </motion.div>
                      </button>
                      
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <div className="px-5 pb-5 pt-0">
                              <div className="h-px bg-border mb-4" />
                              <p className="text-muted-foreground leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">
                  Nessun risultato trovato per "{searchQuery}"
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                  }}
                  className="text-primary hover:underline mt-2"
                >
                  Mostra tutte le domande
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16"
        >
          <div className="relative p-8 rounded-3xl bg-gradient-to-br from-primary/10 via-card to-accent/5 border border-primary/20 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  Non trovi la risposta?
                </h3>
                <p className="text-muted-foreground">
                  Il nostro team è pronto ad aiutarti via WhatsApp
                </p>
              </div>
              <a href="https://wa.me/393533811359" target="_blank" rel="noopener noreferrer">
                <Button className="gradient-button gap-2" size="lg">
                  <MessageCircle className="w-5 h-5" />
                  Contattaci su WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
