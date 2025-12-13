import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Come funziona il white-label per agenzie?",
    answer: "Con il piano Enterprise puoi rivendere MenuLink con il tuo brand. I tuoi clienti non vedranno mai il nostro logo. Hai accesso a un pannello multi-tenant per gestire tutti i ristoranti, fatturazione separata e margini personalizzabili.",
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
    answer: "Sì! MenuLink supporta 5 lingue (Italiano, Inglese, Tedesco, Spagnolo, Francese). Puoi scegliere la traduzione automatica AI o inserire traduzioni manuali.",
  },
  {
    question: "Funziona offline?",
    answer: "MenuLink è una PWA (Progressive Web App). Una volta caricato, funziona anche con connessione instabile. I clienti possono installarlo come app sul telefono.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="section-padding relative overflow-hidden">
      <div className="container relative z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <div className="badge-primary mb-6">Domande frequenti</div>
          <h2 className="text-display-sm md:text-display-md font-bold leading-tight">
            Hai domande?
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-2xl bg-white/[0.02] border border-white/[0.06] px-6 overflow-hidden"
              >
                <AccordionTrigger className="text-left font-medium text-base py-5 hover:no-underline hover:text-primary transition-colors">
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
          <p className="text-muted-foreground text-sm">
            Non trovi la risposta?{" "}
            <a href="https://wa.me/393533811359" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Contattaci su WhatsApp
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
