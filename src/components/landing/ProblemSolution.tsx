import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { X, Check, TrendingUp, Users, Clock } from "lucide-react";
import dashboardPreview from "@/assets/dashboard-preview.png";

const problems = [
  "Menu cartacei costosi da ristampare",
  "Prenotazioni telefoniche continue",
  "Ordini persi o sbagliati",
  "Nessun dato sui clienti",
  "Costi di commissione delivery elevati",
];

const solutions = [
  "Aggiornamenti illimitati in tempo reale",
  "Prenotazioni automatiche 24/7",
  "Ordini digitali senza errori",
  "Analytics dettagliati sui clienti",
  "Zero commissioni sugli ordini",
];

const ProblemSolution = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const leftX = useTransform(scrollYProgress, [0, 0.5], [-50, 0]);
  const rightX = useTransform(scrollYProgress, [0, 0.5], [50, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section ref={containerRef} className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-destructive/[0.02] to-background" />
      
      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          style={{ scale, opacity }}
          className="text-center mb-20"
        >
          <h2 className="text-display-sm md:text-display-md font-bold mb-6">
            <span className="text-foreground">Dì addio ai</span>{" "}
            <span className="text-destructive">vecchi problemi</span>
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
            I ristoratori italiani perdono tempo e soldi con metodi obsoleti. 
            Noi cambiamo le regole del gioco.
          </p>
        </motion.div>

        {/* Problem / Solution Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Problems */}
          <motion.div
            style={{ x: leftX }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="badge-destructive mb-6">
              <X className="w-3 h-3" />
              <span>Prima</span>
            </div>

            <div className="space-y-4">
              {problems.map((problem, index) => (
                <motion.div
                  key={problem}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="pain-card group"
                >
                  <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0 group-hover:bg-destructive/30 transition-colors">
                    <X className="w-4 h-4 text-destructive" />
                  </div>
                  <span className="text-foreground">{problem}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Solutions */}
          <motion.div
            style={{ x: rightX }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="badge-success mb-6">
              <Check className="w-3 h-3" />
              <span>Con Flavour</span>
            </div>

            <div className="space-y-4">
              {solutions.map((solution, index) => (
                <motion.div
                  key={solution}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="benefit-card group"
                >
                  <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 group-hover:bg-success/30 transition-colors">
                    <Check className="w-4 h-4 text-success" />
                  </div>
                  <span className="text-foreground">{solution}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 relative"
        >
          <div className="relative rounded-3xl overflow-hidden border border-border shadow-2xl shadow-primary/5">
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent z-10 pointer-events-none" />
            <img 
              src={dashboardPreview} 
              alt="Dashboard Flavour" 
              className="w-full h-auto"
            />
            
            {/* Floating Stats */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-4">
              {[
                { icon: TrendingUp, label: "Ordini", value: "+43%" },
                { icon: Users, label: "Clienti", value: "+127" },
                { icon: Clock, label: "Tempo risparmiato", value: "2h/giorno" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card/90 backdrop-blur-xl border border-border rounded-2xl px-4 py-3 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-primary" />
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
