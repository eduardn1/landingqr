import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Marco Rossi",
    role: "Proprietario",
    business: "Trattoria da Mario",
    location: "Milano",
    rating: 5,
    quote: "Da quando usiamo MenuLink, gli ordini online sono aumentati del 52%. I clienti adorano poter ordinare dal tavolo senza aspettare il cameriere.",
  },
  {
    name: "Giulia Bianchi",
    role: "Manager",
    business: "Pizzeria Napoli",
    location: "Roma",
    rating: 5,
    quote: "Finalmente posso aggiornare i prezzi in tempo reale! Prima ogni modifica costava €150 di ristampa. Ora è gratis e immediato.",
  },
  {
    name: "Alessandro Conti",
    role: "Chef & Owner",
    business: "Ristorante La Pergola",
    location: "Firenze",
    rating: 5,
    quote: "I turisti stranieri ora capiscono tutto grazie alle 5 lingue automatiche. Le vendite del pranzo sono aumentate del 35%!",
  },
  {
    name: "Francesca Marino",
    role: "Proprietaria",
    business: "Bar Centrale",
    location: "Cagliari",
    rating: 5,
    quote: "Setup facilissimo, in 15 minuti ero online. Il supporto è fantastico e risponde sempre in italiano.",
  },
  {
    name: "Roberto De Luca",
    role: "Direttore",
    business: "Hotel Bellavista",
    location: "Amalfi",
    rating: 5,
    quote: "Gestiamo 3 ristoranti dell'hotel con un unico pannello. Il room service è diventato digitale e gli ospiti sono entusiasti.",
  },
  {
    name: "Elena Ferrara",
    role: "Co-founder",
    business: "Sushi Corner",
    location: "Torino",
    rating: 5,
    quote: "Il sistema di takeaway integrato ci ha permesso di triplicare gli ordini da asporto. Meglio di qualsiasi aggregatore!",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="section-padding relative overflow-hidden">
      <div className="container relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="badge-warning mb-6">
            Testimonianze
          </div>

          <h2 className="text-display-sm md:text-display-md font-bold leading-tight mb-6">
            Cosa dicono i nostri clienti
          </h2>

          <p className="text-body-lg text-muted-foreground">
            Oltre 500 ristoratori italiani hanno già scelto MenuLink
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-colors duration-200"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-warning text-warning"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-foreground/80 leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-sm">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-medium text-sm">{testimonial.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {testimonial.role}, {testimonial.business}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
