import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Star, Quote, MapPin } from "lucide-react";

const testimonials = [
  {
    name: "Marco Rossi",
    role: "Proprietario",
    business: "Trattoria da Mario",
    location: "Milano",
    rating: 5,
    quote: "Da quando usiamo Flavour, gli ordini online sono aumentati del 52%. I clienti adorano poter ordinare dal tavolo senza aspettare il cameriere.",
    highlight: "+52% ordini",
    featured: true,
  },
  {
    name: "Giulia Bianchi",
    role: "Manager",
    business: "Pizzeria Napoli",
    location: "Roma",
    rating: 5,
    quote: "Finalmente posso aggiornare i prezzi in tempo reale! Prima ogni modifica costava €150 di ristampa. Ora è gratis e immediato.",
    highlight: "€150 risparmiati",
    featured: false,
  },
  {
    name: "Alessandro Conti",
    role: "Chef & Owner",
    business: "Ristorante La Pergola",
    location: "Firenze",
    rating: 5,
    quote: "I turisti stranieri ora capiscono tutto grazie alle 5 lingue automatiche. Le vendite del pranzo sono aumentate del 35%!",
    highlight: "+35% vendite",
    featured: false,
  },
  {
    name: "Francesca Marino",
    role: "Proprietaria",
    business: "Bar Centrale",
    location: "Cagliari",
    rating: 5,
    quote: "Setup facilissimo, in 15 minuti ero online. Il supporto è fantastico e risponde sempre in italiano.",
    highlight: "15 min setup",
    featured: false,
  },
  {
    name: "Roberto De Luca",
    role: "Direttore",
    business: "Hotel Bellavista",
    location: "Amalfi",
    rating: 5,
    quote: "Gestiamo 3 ristoranti dell'hotel con un unico pannello. Il room service è diventato digitale e gli ospiti sono entusiasti.",
    highlight: "3 ristoranti",
    featured: true,
  },
  {
    name: "Elena Ferrara",
    role: "Co-founder",
    business: "Sushi Corner",
    location: "Torino",
    rating: 5,
    quote: "Il sistema di takeaway integrato ci ha permesso di triplicare gli ordini da asporto. Meglio di qualsiasi aggregatore!",
    highlight: "3x asporto",
    featured: false,
  },
];

const Testimonials = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={containerRef} id="testimonials" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-warning/[0.02] to-background" />
      
      <div className="container relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="badge-warning mb-6">
            <Star className="w-4 h-4 fill-current" />
            <span>Testimonianze</span>
          </div>

          <h2 className="text-display-sm md:text-display-md font-bold leading-tight mb-6">
            <span className="text-foreground">Cosa dicono i</span>{" "}
            <span className="gradient-text">nostri clienti</span>
          </h2>

          <p className="text-body-lg text-muted-foreground">
            Oltre 500 ristoratori italiani hanno già scelto Flavour
          </p>
        </motion.div>

        {/* Testimonials Bento Grid */}
        <motion.div style={{ y }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`testimonial-card group ${testimonial.featured ? 'md:row-span-1 ring-1 ring-primary/20' : ''}`}
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-10 h-10 text-foreground" />
              </div>

              {/* Highlight Badge */}
              {testimonial.highlight && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/15 border border-success/20 text-success text-xs font-semibold mb-4">
                  {testimonial.highlight}
                </div>
              )}

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
              <p className="text-foreground/90 leading-relaxed mb-6 text-[15px]">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 mt-auto pt-4 border-t border-white/[0.06]">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full blur-sm opacity-50" />
                  <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border border-white/10 flex items-center justify-center text-primary font-bold text-sm">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-foreground text-sm">{testimonial.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {testimonial.role}, {testimonial.business}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  {testimonial.location}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 text-warning fill-warning" />
              ))}
            </div>
            <div className="h-6 w-px bg-white/10" />
            <span className="text-foreground font-semibold">4.9 su 5</span>
            <span className="text-muted-foreground">basato su 500+ recensioni</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
