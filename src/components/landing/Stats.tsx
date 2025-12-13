import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, Users, Zap, Star, ArrowUpRight } from "lucide-react";

const stats = [
  { 
    value: "500+", 
    label: "Ristoranti attivi",
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

const Stats = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={containerRef} className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.02] to-background" />
      
      <motion.div style={{ y }} className="container relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative bento-card h-full text-center md:text-left">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/[0.08] mb-4 group-hover:scale-110 transition-transform duration-300">
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
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Stats;
