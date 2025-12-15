/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * QRCODESTUDIOJEM - FAQ Page (Monochrome + Colored Accents)
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CreditCard, Globe, HelpCircle, MessageCircle, Search, Settings, Sparkles, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SharedNavbar from "@/components/shared/SharedNavbar";

interface FAQItem { question: string; answer: string; category: string; }
interface FAQCategory { id: string; label: string; icon: LucideIcon; }

const faqCategories: FAQCategory[] = [
  { id: "all", label: "Tutte", icon: Sparkles },
  { id: "pricing", label: "Prezzi", icon: CreditCard },
  { id: "features", label: "Funzionalità", icon: Settings },
  { id: "technical", label: "Tecnico", icon: Zap },
  { id: "international", label: "Internazionale", icon: Globe },
];

const faqs: FAQItem[] = [
  { question: "Come funziona il white-label per agenzie?", answer: "Con il piano Enterprise puoi rivendere Flavour con il tuo brand. I tuoi clienti non vedranno mai il nostro logo. Hai accesso a un pannello multi-tenant per gestire tutti i locali, fatturazione separata e margini personalizzabili.", category: "pricing" },
  { question: "Ci sono commissioni sugli ordini?", answer: "Assolutamente no! Non prendiamo commissioni sugli ordini come fanno i grandi aggregatori. Paghi solo l'abbonamento mensile, tutto incluso. Zero sorprese.", category: "pricing" },
  { question: "Funziona per bar, pub e caffetterie?", answer: "Certamente! Flavour è perfetto per ogni tipo di locale: bar, pub, cocktail bar, wine bar, caffetterie, bistrot, pizzerie, osterie, gelaterie, ristoranti. Personalizza il menu con qualsiasi categoria.", category: "features" },
  { question: "Posso migrare da un'altra piattaforma?", answer: "Certo! Offriamo migrazione gratuita assistita per tutti i piani a pagamento. Importiamo menu da Excel, CSV o direttamente da altre piattaforme.", category: "technical" },
  { question: "I menu sono tradotti automaticamente?", answer: "Sì! Flavour supporta 5 lingue (Italiano, Inglese, Tedesco, Spagnolo, Francese). Puoi scegliere la traduzione automatica AI oppure inserire traduzioni manuali.", category: "international" },
  { question: "Funziona offline?", answer: "Flavour è una PWA (Progressive Web App). Una volta caricato, funziona anche con connessione instabile. I clienti possono installarlo come app sul telefono.", category: "technical" },
  { question: "Posso gestire più sedi?", answer: "Sì! Con i piani Pro e Enterprise puoi gestire più locali da un unico pannello. Menu condivisi o separati per ogni sede, analytics aggregati.", category: "features" },
  { question: "Come funzionano le prenotazioni?", answer: "I clienti prenotano direttamente dal menu digitale. Ricevi notifica istantanea, conferma automatica via WhatsApp, reminder prima della prenotazione.", category: "features" },
  { question: "Qual è la differenza con Just Eat o Deliveroo?", answer: "Loro prendono fino al 30% di commissioni. Noi zero. Flavour è tuo: i clienti sono tuoi, i dati sono tuoi, il profitto è 100% tuo.", category: "pricing" },
  { question: "Supportate pagamenti internazionali?", answer: "Sì! Integriamo Stripe, PayPal, Satispay, Apple Pay, Google Pay. I tuoi clienti pagano come preferiscono.", category: "international" },
  { question: "Quanto tempo serve per configurare Flavour?", answer: "Mediamente 10-15 minuti per un menu base. Puoi importare menu esistenti da Excel o iniziare da un template.", category: "technical" },
  { question: "Posso cambiare piano in qualsiasi momento?", answer: "Sì! Puoi fare upgrade o downgrade del piano in qualsiasi momento. L'upgrade è immediato.", category: "pricing" },
];

const FAQPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredFaqs = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return faqs.filter((faq) => {
      const matchesSearch = !q || faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q);
      const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen bg-background">
      <SharedNavbar />

      <main className="pt-20 pb-12 md:pt-24 md:pb-16">
        <div className="container max-w-4xl">
          {/* Header - Monochrome text, colored badge */}
          <div className="text-center mb-10 md:mb-12">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <HelpCircle className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Centro Assistenza</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-foreground mb-4">
              Domande Frequenti
            </h1>
            <p className="text-lg text-foreground-50 max-w-2xl mx-auto">
              Trova risposte alle domande più comuni su Flavour, i nostri piani e le funzionalità
            </p>
          </div>

          {/* Search - Monochrome */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-50" />
            <Input
              type="text"
              placeholder="Cerca una domanda..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-base bg-foreground-05 border-foreground-10 focus:border-foreground-30 rounded-2xl"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground-50 hover:text-foreground">✕</button>
            )}
          </div>

          {/* Category Tabs - Colored active, monochrome inactive */}
          <div className="flex overflow-x-auto scrollbar-hide gap-2 mb-8 md:mb-10 pb-2 px-2 sm:px-0 sm:flex-wrap sm:justify-center">
            {faqCategories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              const count = cat.id === "all" ? faqs.length : faqs.filter((f) => f.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                    isActive ? "bg-primary text-primary-foreground shadow-md" : "bg-foreground-05 border border-foreground-10 text-foreground-50 hover:text-foreground hover:border-foreground-20"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.label}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${isActive ? "bg-white/20" : "bg-foreground-10"}`}>{count}</span>
                </button>
              );
            })}
          </div>

          {/* FAQ Items - Monochrome cards */}
          {filteredFaqs.length > 0 ? (
            <Accordion type="multiple" className="space-y-3">
              {filteredFaqs.map((faq, index) => (
                <AccordionItem key={faq.question} value={`${activeCategory}-${index}`} className="group border-0">
                  <div className="rounded-2xl bg-foreground-05 border border-foreground-10 overflow-hidden transition-colors hover:border-foreground-20 group-data-[state=open]:border-primary/30">
                    <AccordionTrigger className="p-5 text-left hover:no-underline">
                      <span className="font-semibold text-foreground pr-4">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-5 pb-5">
                      <div className="h-px bg-foreground-10 mb-4" />
                      <p className="text-foreground-50 leading-relaxed">{faq.answer}</p>
                    </AccordionContent>
                  </div>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-foreground-10 flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-foreground-50" />
              </div>
              <p className="text-foreground-50">Nessun risultato trovato per "{searchQuery}"</p>
              <button onClick={() => { setSearchQuery(""); setActiveCategory("all"); }} className="text-primary hover:underline mt-2">Mostra tutte le domande</button>
            </div>
          )}

          {/* Contact CTA - Glass effect */}
          <div className="mt-14 md:mt-16">
            <div className="relative p-8 rounded-3xl bg-foreground-05 border border-foreground-10 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">Non trovi la risposta?</h3>
                  <p className="text-foreground-50">Il nostro team è pronto ad aiutarti via WhatsApp</p>
                </div>
                <a href="https://wa.me/393533811359" target="_blank" rel="noopener noreferrer">
                  <Button className="gap-2" size="lg">
                    <MessageCircle className="w-5 h-5" />
                    Contattaci su WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-foreground-10 py-8 bg-foreground-05">
        <div className="container text-center">
          <p className="text-sm text-foreground-50">© {new Date().getFullYear()} Flavour. Tutti i diritti riservati.</p>
        </div>
      </footer>
    </div>
  );
};

export default FAQPage;
export { FAQPage as FAQ };