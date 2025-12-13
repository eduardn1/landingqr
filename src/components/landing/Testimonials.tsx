import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Marco Rossi",
    role: "Proprietario",
    business: "Trattoria da Mario",
    location: "Milano",
    rating: 5,
    quote: "Da quando usiamo MenuLink, gli ordini online sono aumentati del 52%. I clienti adorano poter ordinare dal tavolo senza aspettare il cameriere.",
    avatar: "MR",
  },
  {
    name: "Giulia Bianchi",
    role: "Manager",
    business: "Pizzeria Napoli",
    location: "Roma",
    rating: 5,
    quote: "Finalmente posso aggiornare i prezzi in tempo reale! Prima ogni modifica costava €150 di ristampa. Ora è gratis e immediato.",
    avatar: "GB",
  },
  {
    name: "Alessandro Conti",
    role: "Chef & Owner",
    business: "Ristorante La Pergola",
    location: "Firenze",
    rating: 5,
    quote: "I turisti stranieri ora capiscono tutto grazie alle 5 lingue automatiche. Le vendite del pranzo sono aumentate del 35%!",
    avatar: "AC",
  },
  {
    name: "Francesca Marino",
    role: "Proprietaria",
    business: "Bar Centrale",
    location: "Cagliari",
    rating: 5,
    quote: "Setup facilissimo, in 15 minuti ero online. Il supporto è fantastico e risponde sempre in italiano.",
    avatar: "FM",
  },
  {
    name: "Roberto De Luca",
    role: "Direttore",
    business: "Hotel Bellavista",
    location: "Amalfi",
    rating: 5,
    quote: "Gestiamo 3 ristoranti dell'hotel con un unico pannello. Il room service è diventato digitale e gli ospiti sono entusiasti.",
    avatar: "RD",
  },
  {
    name: "Elena Ferrara",
    role: "Co-founder",
    business: "Sushi Corner",
    location: "Torino",
    rating: 5,
    quote: "Il sistema di takeaway integrato ci ha permesso di triplicare gli ordini da asporto. Meglio di qualsiasi aggregatore!",
    avatar: "EF",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 section-gradient" />

      <div className="container relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-6"
        >
          <div className="inline-block px-5 py-2 rounded-full bg-warning/10 border border-warning/20 text-warning text-sm font-semibold tracking-wide uppercase">
            ⭐ Testimonianze
          </div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Cosa Dicono i{" "}
            <span className="gradient-text">Nostri Clienti</span>
          </h2>

          <p className="text-xl text-muted-foreground leading-relaxed">
            Oltre 500 ristoratori italiani hanno già scelto MenuLink
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-3xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group"
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-primary/30 mb-4" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-warning text-warning"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-foreground/80 leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}, {testimonial.business}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    📍 {testimonial.location}
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
