import { motion } from "framer-motion";
import { HelpCircle, MessageCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    question: "Come funziona il white-label per agenzie?",
    answer: "Con il piano Enterprise puoi rivendere Flavour con il tuo brand. I tuoi clienti non vedranno mai il nostro logo. Hai accesso a un pannello multi-tenant per gestire tutti i ristoranti, fatturazione separata e margini personalizzabili.",
  },
  {
    question: "C'è una fee di setup o commissioni sugli ordini?",
    answer: "Assolutamente no! Non prendiamo commissioni sugli ordini come fanno i grandi aggregatori. Paghi solo l'abbonamento mensile, tutto incluso. Zero sorprese.",
  },
  {
    question: "Posso migrare da un'altra piattaforma?",
    answer: "Certo! Offriamo migrazione gratuita assistita per tutti i piani a pagamento. Importiamo menu da Excel, CSV o direttamente da altre piattaforme.",
  },
  {
    question: "I menu sono tradotti automaticamente?",
    answer: "Sì! Flavour supporta 5 lingue (Italiano, Inglese, Tedesco, Spagnolo, Francese). Puoi scegliere la traduzione automatica AI o inserire traduzioni manuali.",
  },
  {
    question: "Funziona offline?",
    answer: "Flavour è una PWA (Progressive Web App). Una volta caricato, funziona anche con connessione instabile. I clienti possono installarlo come app sul telefono.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      <div className="container relative z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <div className="badge-primary mb-6">
            <HelpCircle className="w-4 h-4" />
            <span>Domande frequenti</span>
          </div>
          <h2 className="text-display-sm md:text-display-md font-bold leading-tight text-foreground">
            Hai domande?
          </h2>
          <p className="text-muted-foreground mt-4">
            Trova le risposte alle domande più comuni
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-2xl bg-card border border-border px-6 overflow-hidden data-[state=open]:border-primary/30 transition-colors"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground text-base py-5 hover:no-underline hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-card border border-border">
            <div className="text-center sm:text-left">
              <p className="text-foreground font-semibold">Non trovi la risposta?</p>
              <p className="text-sm text-muted-foreground">Il nostro team è pronto ad aiutarti</p>
            </div>
            <a href="https://wa.me/393533811359" target="_blank" rel="noopener noreferrer">
              <Button className="gradient-button gap-2">
                <MessageCircle className="w-4 h-4" />
                Contattaci su WhatsApp
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
