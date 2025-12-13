import { motion } from "framer-motion";
import { TrendingUp, Users, Star, Eye } from "lucide-react";

// Simulated client logos with gradient colors
const clients = [
  { name: "Ristorante Milano", initials: "RM", gradient: "from-rose-500 to-pink-600" },
  { name: "Trattoria Bella", initials: "TB", gradient: "from-amber-500 to-orange-600" },
  { name: "Pizzeria Napoli", initials: "PN", gradient: "from-red-500 to-rose-600" },
  { name: "Osteria Toscana", initials: "OT", gradient: "from-emerald-500 to-teal-600" },
  { name: "Bistrot Roma", initials: "BR", gradient: "from-blue-500 to-indigo-600" },
  { name: "Café Venezia", initials: "CV", gradient: "from-violet-500 to-purple-600" },
  { name: "La Pergola", initials: "LP", gradient: "from-cyan-500 to-blue-600" },
  { name: "Il Giardino", initials: "IG", gradient: "from-green-500 to-emerald-600" },
];

const stats = [
  { value: "500+", label: "Ristoranti attivi", icon: Users, gradient: "from-violet-500 to-purple-600" },
  { value: "2M+", label: "Menu visualizzati", icon: Eye, gradient: "from-blue-500 to-cyan-600" },
  { value: "98%", label: "Clienti soddisfatti", icon: TrendingUp, gradient: "from-emerald-500 to-teal-600" },
  { value: "4.9★", label: "Rating medio", icon: Star, gradient: "from-amber-500 to-orange-600" },
];

const Logos = () => {
  // Duplicate for seamless loop
  const allClients = [...clients, ...clients];

  return (
    <section className="py-16 md:py-24 overflow-hidden relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
      
      <div className="container relative z-10 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-muted-foreground text-sm uppercase tracking-widest font-medium mb-2">
            I nostri partner
          </p>
          <p className="text-foreground text-lg font-medium">
            Scelto da 500+ ristoranti in tutta Italia
          </p>
        </motion.div>
      </div>

      {/* Marquee Container */}
      <div className="relative mb-16">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Scrolling Logos */}
        <div className="flex animate-marquee">
          {allClients.map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="flex-shrink-0 mx-4 md:mx-6"
            >
              <div className="group flex items-center gap-3 px-5 py-4 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${client.gradient} flex items-center justify-center shadow-lg`}>
                  <span className="text-white font-bold text-sm">{client.initials}</span>
                </div>
                <span className="text-foreground font-medium text-sm whitespace-nowrap">
                  {client.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats with icons and gradients */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="container"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity`} />
                <div className="relative bento-card text-center py-6">
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default Logos;
