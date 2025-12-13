import { motion } from "framer-motion";

// Simulated client logos - in production these would be real brand logos
const clients = [
  { name: "Ristorante Milano", initials: "RM" },
  { name: "Trattoria Bella", initials: "TB" },
  { name: "Pizzeria Napoli", initials: "PN" },
  { name: "Osteria Toscana", initials: "OT" },
  { name: "Bistrot Roma", initials: "BR" },
  { name: "Café Venezia", initials: "CV" },
  { name: "La Pergola", initials: "LP" },
  { name: "Il Giardino", initials: "IG" },
];

const Logos = () => {
  // Duplicate for seamless loop
  const allClients = [...clients, ...clients];

  return (
    <section className="py-16 md:py-20 overflow-hidden relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent" />
      
      <div className="container relative z-10 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-muted-foreground text-sm uppercase tracking-widest font-medium mb-2">
            Trusted by
          </p>
          <p className="text-foreground/80 text-lg">
            500+ ristoranti in tutta Italia
          </p>
        </motion.div>
      </div>

      {/* Marquee Container */}
      <div className="relative">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Scrolling Logos */}
        <div className="flex animate-marquee">
          {allClients.map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="flex-shrink-0 mx-6 md:mx-10"
            >
              <div className="logo-card w-40 md:w-48 h-20 md:h-24">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">{client.initials}</span>
                  </div>
                  <span className="text-foreground/60 font-medium text-sm whitespace-nowrap">
                    {client.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats below logos */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="container mt-16"
      >
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {[
            { value: "500+", label: "Ristoranti attivi" },
            { value: "2M+", label: "Menu visualizzati" },
            { value: "98%", label: "Clienti soddisfatti" },
            { value: "4.9★", label: "Rating medio" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Logos;
