import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, memo } from "react";
import { X, Check, TrendingUp, Users, Clock, Zap, ArrowRight } from "lucide-react";
import { useLeadForm } from "@/hooks/useLeadForm";
import { Button } from "@/components/ui/button";

const transformations = [
  {
    before: "Menu cartacei costosi",
    after: "Aggiornamenti illimitati",
    icon: Zap,
  },
  {
    before: "Prenotazioni telefoniche",
    after: "Prenotazioni automatiche 24/7",
    icon: Clock,
  },
  {
    before: "Ordini persi o sbagliati",
    after: "Ordini digitali precisi",
    icon: Check,
  },
  {
    before: "Zero dati sui clienti",
    after: "Analytics dettagliati",
    icon: Users,
  },
  {
    before: "Commissioni delivery alte",
    after: "Zero commissioni",
    icon: TrendingUp,
  },
];

const ProblemSolution = memo(() => {
  const { openLeadForm } = useLeadForm();
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section ref={containerRef} id="transformation" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      <div className="container relative z-10">
        {/* Header - Compact */}
        <motion.div
          style={{ opacity }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="badge-neutral mb-4">
            <Zap className="w-4 h-4" />
            <span>La Trasformazione</span>
          </div>
          
          <h2 className="text-display-sm md:text-display font-black mb-3">
            <span className="text-foreground">Dal </span>
            <span className="text-destructive">caos</span>
            <span className="text-foreground"> al </span>
            <span className="gradient-text">controllo</span>
          </h2>
          
          <p className="text-body text-muted-foreground max-w-xl mx-auto">
            Automatizza le attività quotidiane e risparmia ore ogni giorno
          </p>
        </motion.div>

        {/* Compact Before/After Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-12">
          {transformations.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group relative p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all"
            >
              {/* Icon */}
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              
              {/* Before - Compact */}
              <div className="flex items-start gap-2 mb-2">
                <X className="w-3.5 h-3.5 text-destructive mt-0.5 flex-shrink-0" />
                <p className="text-xs text-muted-foreground line-through">
                  {item.before}
                </p>
              </div>
              
              {/* After - Compact */}
              <div className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-success mt-0.5 flex-shrink-0" />
                <p className="text-xs font-medium text-foreground">
                  {item.after}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 p-6 rounded-2xl bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 border border-primary/20"
        >
          {/* Stacked Avatars */}
          <div className="flex -space-x-2">
            {['from-pink-500 to-rose-500', 'from-blue-500 to-cyan-500', 'from-green-500 to-emerald-500', 'from-purple-500 to-violet-500'].map((gradient, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                viewport={{ once: true }}
                className={`w-8 h-8 rounded-full bg-gradient-to-br ${gradient} border-2 border-card flex items-center justify-center text-white text-xs font-bold`}
              >
                {String.fromCharCode(65 + i)}
              </motion.div>
            ))}
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              viewport={{ once: true }}
              className="w-8 h-8 rounded-full bg-muted border-2 border-card flex items-center justify-center text-foreground text-[10px] font-bold"
            >
              +500
            </motion.div>
          </div>
          
          <div className="text-center sm:text-left">
            <p className="font-bold text-foreground">500+ ristoratori hanno già scelto Flavour</p>
            <p className="text-sm text-muted-foreground">Digitalizza il tuo locale oggi stesso</p>
          </div>
          
          <Button
            onClick={() => openLeadForm("problem-solution")}
            className="gradient-button rounded-full px-6 whitespace-nowrap"
          >
            Inizia ora
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
});

ProblemSolution.displayName = 'ProblemSolution';

export default ProblemSolution;
