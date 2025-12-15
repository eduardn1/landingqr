/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * QRCODESTUDIOJEM - Logos Section (Monochrome + Colored Accents)
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { memo } from "react";
import { TrendingUp, Users, Star, Zap } from "lucide-react";
import ScrollReveal from "@/components/ui/scroll-reveal";

const clients = [
  { name: "Pub The Oak", initials: "TO" },
  { name: "Bar Centrale", initials: "BC" },
  { name: "Caffè Venezia", initials: "CV" },
  { name: "Pizzeria Bella Napoli", initials: "BN" },
  { name: "Cocktail Lab", initials: "CL" },
  { name: "Osteria del Borgo", initials: "OB" },
  { name: "Wine Bar Tuscany", initials: "WT" },
  { name: "Gelateria Dolce Vita", initials: "DV" },
];

const stats = [
  { value: "500+", label: "Locali", icon: Users },
  { value: "2M+", label: "Menu views", icon: Zap },
  { value: "95%", label: "Soddisfatti", icon: TrendingUp },
  { value: "4.9★", label: "Rating", icon: Star },
];

const Logos = memo(() => {
  const allClients = [...clients, ...clients];

  return (
    <section className="py-12 overflow-hidden relative">
      <div className="container relative z-10 mb-6">
        <p className="text-center text-sm text-foreground-50">Usato da bar, ristoranti e pub in tutta Italia</p>
      </div>

      <div className="relative mb-8">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="flex animate-marquee">
          {allClients.map((client, index) => (
            <div key={`${client.name}-${index}`} className="flex-shrink-0 mx-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-foreground-05 border border-foreground-10">
                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-semibold text-xs">{client.initials}</span>
                </div>
                <span className="text-foreground-70 font-medium text-sm whitespace-nowrap">{client.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ScrollReveal animation="fadeIn">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-foreground-05 border border-foreground-10">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-foreground leading-tight">{stat.value}</div>
                    <div className="text-xs text-foreground-50">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
});

Logos.displayName = 'Logos';
export default Logos;