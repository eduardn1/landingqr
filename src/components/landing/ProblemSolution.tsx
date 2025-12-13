import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { X, Check, TrendingUp, Users, Clock, Zap, ArrowRight } from "lucide-react";
import dashboardPreview from "@/assets/dashboard-preview.png";
import { useLeadForm } from "@/hooks/useLeadForm";
import { Button } from "@/components/ui/button";

const transformations = [
  {
    before: "Menu cartacei costosi da ristampare",
    after: "Aggiornamenti illimitati in tempo reale",
    icon: Zap,
  },
  {
    before: "Prenotazioni telefoniche continue",
    after: "Prenotazioni automatiche 24/7",
    icon: Clock,
  },
  {
    before: "Ordini persi o sbagliati",
    after: "Ordini digitali senza errori",
    icon: Check,
  },
  {
    before: "Nessun dato sui clienti",
    after: "Analytics dettagliati sui clienti",
    icon: Users,
  },
  {
    before: "Costi di commissione delivery elevati",
    after: "Zero commissioni sugli ordini",
    icon: TrendingUp,
  },
];

const ProblemSolution = () => {
  const { openLeadForm } = useLeadForm();
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section ref={containerRef} id="transformation" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      <div className="container relative z-10">
        {/* Header with Outline Style */}
        <motion.div
          style={{ opacity }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="badge-neutral mb-6">
            <Zap className="w-4 h-4" />
            <span>La Trasformazione</span>
          </div>
          
          {/* Outline Header Style */}
          <h2 className="text-display-sm md:text-display-lg font-black mb-6 relative">
            <span className="text-foreground">Dal </span>
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text" style={{
                WebkitTextStroke: '2px hsl(var(--destructive))',
              }}>caos</span>
            </span>
            <span className="text-foreground"> al </span>
            <span className="gradient-text">controllo</span>
          </h2>
          
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
            Ogni giorno, ristoratori come te perdono ore in attività che potrebbero essere automatizzate.
          </p>
        </motion.div>

        {/* Transformation Cards - Bento Grid */}
        <motion.div 
          style={{ y }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {transformations.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bento-card group"
            >
              {/* Icon */}
              <div className="icon-box-lg w-12 h-12 mb-6">
                <item.icon className="w-6 h-6" />
              </div>
              
              {/* Before */}
              <div className="mb-4 p-4 rounded-xl bg-destructive/10 border border-destructive/20">
                <div className="flex items-center gap-2 mb-2">
                  <X className="w-4 h-4 text-destructive" />
                  <span className="text-xs font-medium text-destructive uppercase tracking-wider">Prima</span>
                </div>
                <p className="text-foreground/70 text-sm line-through decoration-destructive/50">
                  {item.before}
                </p>
              </div>
              
              {/* Arrow */}
              <div className="flex justify-center my-2">
                <ArrowRight className="w-5 h-5 text-muted-foreground rotate-90" />
              </div>
              
              {/* After */}
              <div className="p-4 rounded-xl bg-success/10 border border-success/20">
                <div className="flex items-center gap-2 mb-2">
                  <Check className="w-4 h-4 text-success" />
                  <span className="text-xs font-medium text-success uppercase tracking-wider">Dopo</span>
                </div>
                <p className="text-foreground font-medium text-sm">
                  {item.after}
                </p>
              </div>
            </motion.div>
          ))}
          
          {/* CTA Card with Stacked Avatars */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="bento-card flex flex-col justify-center items-center text-center bg-gradient-to-br from-primary/10 to-accent/5 border-primary/20"
          >
            {/* Stacked Avatars - Creativable Style */}
            <div className="flex -space-x-3 mb-6">
              {['from-pink-500 to-rose-500', 'from-blue-500 to-cyan-500', 'from-green-500 to-emerald-500', 'from-purple-500 to-violet-500', 'from-orange-500 to-amber-500'].map((gradient, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 + i * 0.1 }}
                  viewport={{ once: true }}
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradient} border-2 border-card flex items-center justify-center text-white text-sm font-bold shadow-lg`}
                >
                  {String.fromCharCode(65 + i)}
                </motion.div>
              ))}
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 1.1 }}
                viewport={{ once: true }}
                className="w-10 h-10 rounded-full bg-muted border-2 border-card flex items-center justify-center text-foreground text-xs font-bold shadow-lg"
              >
                +500
              </motion.div>
            </div>
            
            <h3 className="text-xl font-bold text-foreground mb-2">
              Unisciti ai 500+ ristoratori
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              Che hanno già digitalizzato il loro locale con Flavour.
            </p>
            <Button
              onClick={() => openLeadForm("problem-solution")}
              className="gradient-button rounded-full px-6"
            >
              Inizia ora
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative rounded-3xl overflow-hidden border border-border shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent z-10 pointer-events-none" />
            <img 
              src={dashboardPreview} 
              alt="Dashboard Flavour" 
              className="w-full h-auto"
            />
            
            {/* Floating Stats */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-wrap justify-center gap-4">
              {[
                { icon: TrendingUp, label: "Ordini", value: "+43%", color: "text-success" },
                { icon: Users, label: "Clienti", value: "+127", color: "text-primary" },
                { icon: Clock, label: "Tempo risparmiato", value: "2h/giorno", color: "text-accent" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card/90 backdrop-blur-xl border border-border rounded-2xl px-4 py-3 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSolution;
