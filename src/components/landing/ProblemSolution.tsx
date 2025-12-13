import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { X, Check, TrendingUp, Users, Clock, Zap, ArrowRight, Sparkles, BarChart3, Receipt } from "lucide-react";
import dashboardPreview from "@/assets/dashboard-preview.png";
import { useLeadForm } from "@/hooks/useLeadForm";
import { Button } from "@/components/ui/button";

const transformations = [
  {
    before: "Menu cartacei costosi da ristampare",
    after: "Aggiornamenti illimitati in tempo reale",
    icon: Zap,
    gradient: "from-amber-500 to-orange-600",
    bgGradient: "from-amber-500/20 to-orange-500/10",
  },
  {
    before: "Prenotazioni telefoniche continue",
    after: "Prenotazioni automatiche 24/7",
    icon: Clock,
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-500/20 to-cyan-500/10",
  },
  {
    before: "Ordini persi o sbagliati",
    after: "Ordini digitali senza errori",
    icon: Receipt,
    gradient: "from-emerald-500 to-green-500",
    bgGradient: "from-emerald-500/20 to-green-500/10",
  },
  {
    before: "Nessun dato sui clienti",
    after: "Analytics dettagliati sui clienti",
    icon: BarChart3,
    gradient: "from-violet-500 to-purple-600",
    bgGradient: "from-violet-500/20 to-purple-500/10",
  },
  {
    before: "Costi di commissione delivery elevati",
    after: "Zero commissioni sugli ordini",
    icon: TrendingUp,
    gradient: "from-pink-500 to-rose-600",
    bgGradient: "from-pink-500/20 to-rose-500/10",
  },
];

const avatars = [
  { color: "from-violet-500 to-purple-600", initials: "MR" },
  { color: "from-blue-500 to-cyan-500", initials: "AG" },
  { color: "from-emerald-500 to-green-500", initials: "LP" },
  { color: "from-amber-500 to-orange-600", initials: "SC" },
];

const ProblemSolution = () => {
  const { openLeadForm } = useLeadForm();
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section ref={containerRef} id="transformation" className="section-padding relative overflow-hidden">
      {/* Background with gradient orbs */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* Badge with glow */}
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">La Trasformazione</span>
          </motion.div>
          
          {/* Headline with gradient */}
          <h2 className="text-display-sm md:text-display-lg font-black mb-6">
            <span className="text-foreground">Dal </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">caos</span>
            <span className="text-foreground"> al </span>
            <span className="gradient-text">controllo</span>
          </h2>
          
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
            Ogni giorno, ristoratori come te perdono ore in attività che potrebbero essere automatizzate.
          </p>
        </motion.div>

        {/* Transformation Cards - Modern Bento Grid */}
        <motion.div 
          style={{ y }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16"
        >
          {transformations.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group relative bg-card rounded-2xl border border-border p-6 overflow-hidden"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Gradient Icon Box */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} p-0.5 mb-5`}>
                  <div className="w-full h-full rounded-[10px] bg-card flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-foreground" />
                  </div>
                </div>
                
                {/* Before - Pain point */}
                <div className="mb-4 p-3.5 rounded-xl bg-destructive/10 dark:bg-destructive/5 border border-destructive/20">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-5 h-5 rounded-full bg-destructive/20 flex items-center justify-center">
                      <X className="w-3 h-3 text-destructive" />
                    </div>
                    <span className="text-xs font-semibold text-destructive uppercase tracking-wider">Prima</span>
                  </div>
                  <p className="text-foreground/60 text-sm line-through decoration-destructive/40">
                    {item.before}
                  </p>
                </div>
                
                {/* Arrow with animation */}
                <div className="flex justify-center my-3">
                  <motion.div
                    animate={{ y: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5 text-muted-foreground rotate-90" />
                  </motion.div>
                </div>
                
                {/* After - Solution */}
                <div className="p-3.5 rounded-xl bg-success/10 dark:bg-success/5 border border-success/20">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-success" />
                    </div>
                    <span className="text-xs font-semibold text-success uppercase tracking-wider">Dopo</span>
                  </div>
                  <p className="text-foreground font-medium text-sm">
                    {item.after}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* CTA Card with stacked avatars */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-primary/10 via-card to-accent/5 rounded-2xl border border-primary/20 p-6 flex flex-col justify-center items-center text-center overflow-hidden"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              {/* Stacked Avatars */}
              <div className="flex justify-center mb-5">
                <div className="flex -space-x-3">
                  {avatars.map((avatar, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      viewport={{ once: true }}
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatar.color} flex items-center justify-center text-white text-xs font-bold border-2 border-card`}
                    >
                      {avatar.initials}
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 }}
                    viewport={{ once: true }}
                    className="w-10 h-10 rounded-full bg-card border-2 border-primary/30 flex items-center justify-center text-xs font-bold text-primary"
                  >
                    +99
                  </motion.div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-2">
                Pronto a trasformare il tuo ristorante?
              </h3>
              <p className="text-muted-foreground text-sm mb-5">
                Unisciti a centinaia di ristoratori che hanno già fatto il salto.
              </p>
              
              <Button
                onClick={() => openLeadForm("problem-solution")}
                className="gradient-button rounded-full px-6 shadow-lg shadow-primary/25"
              >
                Inizia ora
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        </motion.div>

        {/* Dashboard Preview with enhanced floating stats */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Glow behind dashboard */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent blur-3xl scale-110" />
          
          <div className="relative rounded-3xl overflow-hidden border border-border bg-card shadow-2xl shadow-primary/5">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent z-10 pointer-events-none" />
            <img 
              src={dashboardPreview} 
              alt="Dashboard Flavour" 
              className="w-full h-auto"
            />
            
            {/* Floating Stats - Creativable style */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-wrap justify-center gap-3">
              {[
                { icon: TrendingUp, label: "Ordini", value: "+43%", gradient: "from-emerald-500 to-green-500" },
                { icon: Users, label: "Clienti", value: "+127", gradient: "from-violet-500 to-purple-600" },
                { icon: Clock, label: "Risparmiato", value: "2h/giorno", gradient: "from-amber-500 to-orange-600" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="bg-card/95 backdrop-blur-xl border border-border rounded-2xl px-4 py-3 flex items-center gap-3 shadow-lg"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} p-0.5`}>
                    <div className="w-full h-full rounded-[10px] bg-card flex items-center justify-center">
                      <stat.icon className="w-5 h-5 text-foreground" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className="text-lg font-bold text-foreground">{stat.value}</p>
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
