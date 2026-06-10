/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * NESTIFY - Logos Section (Static/Optimized)
 *
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * Web Development & Digital Solutions
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { memo } from "react";
import { TrendingUp, Users, Star, Zap } from "lucide-react";

// Simulated client logos with gradient colors - diversified hospitality businesses
const clients = [
  { name: "Pub The Oak", initials: "TO", gradient: "from-emerald-500/70 to-teal-600/70", type: "Pub" },
  { name: "Bar Centrale", initials: "BC", gradient: "from-sky-500/70 to-blue-600/70", type: "Bar" },
  { name: "Caffè Venezia", initials: "CV", gradient: "from-cyan-500/70 to-teal-600/70", type: "Caffetteria" },
  { name: "Pizzeria Bella Napoli", initials: "BN", gradient: "from-rose-500/70 to-pink-600/70", type: "Pizzeria" },
  { name: "Cocktail Lab Milano", initials: "CL", gradient: "from-amber-500/70 to-orange-600/70", type: "Cocktail Bar" },
  { name: "Osteria del Borgo", initials: "OB", gradient: "from-teal-500/70 to-emerald-600/70", type: "Ristorante" },
  { name: "Wine Bar Tuscany", initials: "WT", gradient: "from-red-500/70 to-rose-600/70", type: "Enoteca" },
  { name: "Gelateria Dolce Vita", initials: "DV", gradient: "from-pink-400/70 to-rose-500/70", type: "Gelateria" },
];

// Realistic startup stats
const stats = [
  { value: "500+", label: "Locali", icon: Users, gradient: "from-emerald-500/70 to-teal-600/70" },
  { value: "2M+", label: "Menu views", icon: Zap, gradient: "from-sky-500/70 to-blue-600/70" },
  { value: "95%", label: "Soddisfatti", icon: TrendingUp, gradient: "from-cyan-500/70 to-teal-600/70" },
  { value: "4.9★", label: "Rating", icon: Star, gradient: "from-amber-500/70 to-orange-600/70" },
];

const Logos = memo(() => {
  // Duplicate for seamless loop
  const allClients = [...clients, ...clients];

  return (
    <section className="py-10 md:py-14 overflow-hidden relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      <div className="container relative z-10 mb-8">
        <p className="text-center text-muted-foreground text-sm font-medium">
          Scelto da centinaia di ristoratori, baristi e hotel manager in tutta Italia
        </p>
      </div>

      {/* Compact Marquee */}
      <div className="relative mb-8">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Scrolling Logos - CSS animation only */}
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
      <div className="container">
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
      </div>
    </section>
  );
});

Logos.displayName = 'Logos';

export default Logos;