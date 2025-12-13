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
    answer: "Con il piano Enterprise puoi rivendere MenuLink con il tuo brand. I tuoi clienti non vedranno mai il nostro logo. Hai accesso a un pannello multi-tenant per gestire tutti i ristoranti, fatturazione separata e margini personalizzabili. Contattaci per una demo dedicata.",
  },
  {
    question: "Posso usare il mio dominio personalizzato?",
    answer: "Sì! Con il piano Pro puoi avere un subdomain (es. tuoristorante.menulink.it). Con Enterprise puoi usare il tuo dominio completo (es. menu.tuoristorante.it). La configurazione è guidata e richiede solo 5 minuti.",
  },
  {
    question: "C'è una fee di setup o commissioni sugli ordini?",
    answer: "Assolutamente no! Non prendiamo commissioni sugli ordini come fanno i grandi aggregatori (JustEat, Glovo, etc.). Paghi solo l'abbonamento mensile, tutto incluso. Zero sorprese.",
  },
  {
    question: "Che tipo di supporto offrite?",
    answer: "Piano Gratis: community e FAQ. Piano Starter: email con risposta in 24h. Piano Pro: supporto prioritario con risposta in 4h, anche via WhatsApp. Enterprise: account manager dedicato e supporto telefonico.",
  },
  {
    question: "Posso migrare da un'altra piattaforma?",
    answer: "Certo! Offriamo migrazione gratuita assistita per tutti i piani a pagamento. Importiamo menu da Excel, CSV o direttamente da altre piattaforme. Il nostro team ti guida passo passo.",
  },
  {
    question: "Quali metodi di pagamento accettate?",
    answer: "Accettiamo tutte le carte di credito/debito, PayPal, bonifico bancario (per piani annuali) e SEPA Direct Debit. Per i tuoi clienti, integriamo Stripe, PayPal, Satispay e contanti alla consegna.",
  },
  {
    question: "I menu sono tradotti automaticamente?",
    answer: "Sì! MenuLink supporta 5 lingue (Italiano, Inglese, Tedesco, Spagnolo, Francese). Puoi scegliere la traduzione automatica AI o inserire traduzioni manuali. Il cliente vede il menu nella sua lingua preferita.",
  },
  {
    question: "Funziona offline?",
    answer: "MenuLink è una PWA (Progressive Web App). Una volta caricato, funziona anche con connessione instabile. I clienti possono 'installarlo' come app sul telefono senza passare dagli store.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 section-gradient" />

      <div className="container relative z-10 max-w-4xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-6"
        >
          <div className="inline-block px-5 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold tracking-wide uppercase">
            ❓ Domande Frequenti
          </div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Hai Domande?{" "}
            <span className="gradient-text">Abbiamo Risposte</span>
          </h2>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-card rounded-2xl border border-white/10 px-6 overflow-hidden"
              >
                <AccordionTrigger className="text-left font-semibold text-lg py-6 hover:no-underline hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground">
            Non trovi la risposta?{" "}
            <a
              href="mailto:info@menulink.it"
              className="text-primary hover:underline font-medium"
            >
              Scrivici un'email
            </a>{" "}
            o{" "}
            <a
              href="https://wa.me/393533811359"
              target="_blank"
              rel="noopener noreferrer"
              className="text-success hover:underline font-medium"
            >
              contattaci su WhatsApp
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
