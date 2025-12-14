import { motion, useInView } from "framer-motion";
import { useRef, memo } from "react";
import { TrendingUp, Users, Star, Zap } from "lucide-react";

// Simulated client logos with gradient colors - diversified hospitality businesses
const clients = [
  { name: "Pub The Oak", initials: "TO", gradient: "from-violet-500 to-purple-600", type: "Pub" },
  { name: "Bar Centrale", initials: "BC", gradient: "from-emerald-500 to-teal-600", type: "Bar" },
  { name: "Caffè Venezia", initials: "CV", gradient: "from-cyan-500 to-blue-600", type: "Caffetteria" },
  { name: "Pizzeria Bella Napoli", initials: "BN", gradient: "from-rose-500 to-pink-600", type: "Pizzeria" },
  { name: "Cocktail Lab Milano", initials: "CL", gradient: "from-amber-500 to-orange-600", type: "Cocktail Bar" },
  { name: "Osteria del Borgo", initials: "OB", gradient: "from-indigo-500 to-violet-600", type: "Ristorante" },
  { name: "Wine Bar Tuscany", initials: "WT", gradient: "from-red-500 to-rose-600", type: "Enoteca" },
  { name: "Gelateria Dolce Vita", initials: "DV", gradient: "from-pink-400 to-fuchsia-500", type: "Gelateria" },
];

// Realistic startup stats
const stats = [
  { value: "500+", label: "Locali", icon: Users, gradient: "from-violet-500 to-purple-600" },
  { value: "2M+", label: "Menu views", icon: Zap, gradient: "from-blue-500 to-cyan-600" },
  { value: "95%", label: "Soddisfatti", icon: TrendingUp, gradient: "from-emerald-500 to-teal-600" },
  { value: "4.9★", label: "Rating", icon: Star, gradient: "from-amber-500 to-orange-600" },
];

const Logos = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  // Duplicate for seamless loop
  const allClients = [...clients, ...clients];

  return (
    <section ref={ref} className="py-10 md:py-14 overflow-hidden relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      <div className="container relative z-10 mb-8">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.3 }}
          className="text-center text-muted-foreground text-sm"
        >
          Usato da bar, ristoranti e pub in tutta Italia
        </motion.p>
      </div>

      {/* Compact Marquee */}
      <div className="relative mb-8">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Scrolling Logos - Smaller */}
        <div className="flex animate-marquee">
          {allClients.map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="flex-shrink-0 mx-3"
            >
              <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-card/50 border border-border/50">
                <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${client.gradient} flex items-center justify-center`}>
                  <span className="text-white font-semibold text-xs">{client.initials}</span>
                </div>
                <span className="text-foreground/80 font-medium text-xs whitespace-nowrap">
                  {client.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compact Stats - Single Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="container"
      >
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-card/50 border border-border/50"
              >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-lg font-bold text-foreground leading-tight">
                    {stat.value}
                  </div>
                  <div className="text-[10px] text-muted-foreground leading-tight">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
});

Logos.displayName = 'Logos';

export default Logos;
