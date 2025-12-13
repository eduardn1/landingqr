import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { 
  Play, 
  Pause,
  Monitor, 
  Smartphone, 
  Truck, 
  Users,
  ShoppingBag,
  BarChart3,
  Settings,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import dashboardPreview from "@/assets/dashboard-preview.png";

const platformFeatures = [
  {
    icon: Monitor,
    title: "Pannello Gestionale",
    description: "Dashboard intuitiva per gestire menu, ordini, prenotazioni e clienti da un'unica interfaccia.",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    icon: Truck,
    title: "Driver Integrato",
    description: "Gestione rider con tracking live, assegnazione automatica e notifiche real-time.",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: ShoppingBag,
    title: "Takeaway Completo",
    description: "Ordini asporto con tempi stimati, conferma automatica e notifiche WhatsApp.",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    icon: Users,
    title: "Multi-staff",
    description: "Gestione ruoli e permessi per camerieri, cucina, cassa e amministrazione.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: BarChart3,
    title: "Analytics Avanzati",
    description: "Report vendite, piatti popolari, orari di punta e comportamento clienti.",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: Settings,
    title: "Configurazione Facile",
    description: "Importa menu da Excel, personalizza colori e logo in pochi click.",
    gradient: "from-amber-500 to-orange-500",
  },
];

const VideoDemo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);

  return (
    <section ref={containerRef} className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
      {/* Animated Orb */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]" />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="badge-primary mb-6">
            <Play className="w-4 h-4" />
            <span>Guarda la piattaforma</span>
          </div>
          
          <h2 className="text-display-sm md:text-display-md font-bold mb-6">
            <span className="text-foreground">Una piattaforma</span>
            <br />
            <span className="gradient-text">completa per il tuo business</span>
          </h2>
          
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
            Scopri tutte le funzionalità del pannello gestionale: dalla gestione ordini 
            al tracking dei driver, tutto in un'unica dashboard.
          </p>
        </motion.div>

        {/* Video/Demo Section */}
        <motion.div
          style={{ y, scale }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative max-w-5xl mx-auto mb-20"
        >
          {/* Video Container */}
          <div className="relative rounded-3xl overflow-hidden border border-border shadow-2xl group">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-accent/20 to-primary/30 rounded-3xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
            
            <div className="relative bg-card rounded-3xl overflow-hidden">
              {/* Browser Chrome */}
              <div className="bg-muted/50 border-b border-border px-4 py-3 flex items-center gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-warning/60" />
                  <div className="w-3 h-3 rounded-full bg-success/60" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-4 py-1.5 bg-background/50 rounded-lg text-xs text-muted-foreground flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-success" />
                    dashboard.flavour.it
                  </div>
                </div>
              </div>
              
              {/* Dashboard Screenshot / Video Placeholder */}
              <div className="relative aspect-video">
                <img 
                  src={dashboardPreview} 
                  alt="Pannello gestionale Flavour" 
                  className="w-full h-full object-cover"
                />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-background/30 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-2xl shadow-primary/50 hover:scale-110 transition-transform duration-300"
                  >
                    {isPlaying ? (
                      <Pause className="w-8 h-8 text-primary-foreground" />
                    ) : (
                      <Play className="w-8 h-8 text-primary-foreground ml-1" />
                    )}
                  </button>
                </div>
                
                {/* Feature Highlights */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="absolute left-4 top-4 hidden lg:block"
                >
                  <div className="bg-card/90 backdrop-blur-xl border border-border rounded-2xl p-4 shadow-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                        <ShoppingBag className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Ordini oggi</p>
                        <p className="text-lg font-bold text-foreground">+47</p>
                      </div>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-4/5 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full" />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="absolute right-4 bottom-4 hidden lg:block"
                >
                  <div className="bg-card/90 backdrop-blur-xl border border-border rounded-2xl p-4 shadow-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                        <Truck className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Driver attivi</p>
                        <p className="text-lg font-bold text-foreground">3 online</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
            {[
              { icon: Clock, text: "Setup 10 min", color: "from-violet-500 to-purple-600" },
              { icon: Smartphone, text: "Mobile first", color: "from-blue-500 to-cyan-500" },
              { icon: Users, text: "Multi-utente", color: "from-emerald-500 to-teal-600" },
            ].map((item, i) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-full shadow-lg"
              >
                <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                  <item.icon className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-sm font-medium text-foreground">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Platform Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-16"
        >
          {platformFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300"
              >
                {/* Glow on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-10 transition-opacity`} />
                
                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link to="/demo">
            <Button className="gradient-button rounded-full px-8 py-6 text-base">
              <Play className="w-5 h-5 mr-2" />
              Prova la demo interattiva
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoDemo;