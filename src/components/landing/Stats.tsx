/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * QRCODESTUDIOJEM - Stats Section (Static/Optimized)
 * 
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * Web Development & Digital Solutions
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { memo } from "react";
import { TrendingUp, Users, Zap, Star, ArrowUpRight } from "lucide-react";

const stats = [
  { 
    value: "500+", 
    label: "Locali attivi",
    icon: Users,
    gradient: "from-primary/20 to-primary/5",
    change: "+127 questo mese"
  },
  { 
    value: "2M+", 
    label: "Scan al mese",
    icon: Zap,
    gradient: "from-accent/20 to-accent/5",
    change: "+45% vs mese scorso"
  },
  { 
    value: "99.9%", 
    label: "Uptime garantito",
    icon: TrendingUp,
    gradient: "from-success/20 to-success/5",
    change: "SLA Enterprise"
  },
  { 
    value: "4.9★", 
    label: "Valutazione media",
    icon: Star,
    gradient: "from-warning/20 to-warning/5",
    change: "su Trustpilot"
  },
];

const Stats = memo(() => {
  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.02] to-background" />
      
      <div className="container relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <div className="relative bento-card h-full text-center md:text-left">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-muted border border-border mb-4 group-hover:scale-105 transition-transform duration-200">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>

                {/* Value */}
                <div className="text-4xl md:text-5xl font-extrabold text-foreground mb-2 tracking-tight">
                  {stat.value}
                </div>

                {/* Label */}
                <div className="text-sm text-muted-foreground font-medium mb-3">
                  {stat.label}
                </div>

                {/* Change indicator */}
                <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-success/10 text-success text-xs font-medium">
                  <ArrowUpRight className="w-3 h-3" />
                  {stat.change}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

Stats.displayName = 'Stats';

export default Stats;