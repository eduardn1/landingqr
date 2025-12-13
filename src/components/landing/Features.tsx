import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { 
  QrCode, 
  Calendar, 
  ShoppingBag, 
  BarChart3,
  Heart,
  MessageCircle
} from "lucide-react";
import qrScanPreview from "@/assets/qr-scan-preview.png";
import dashboardPreview from "@/assets/dashboard-preview.png";

const Features = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={containerRef} id="features" className="section-padding relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
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
            <span>Funzionalità</span>
          </div>
          <h2 className="text-display-sm md:text-display-md font-bold mb-6">
            <span className="text-foreground">Dal caos</span>
            <br />
            <span className="gradient-text">al controllo</span>
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
            Una piattaforma completa per digitalizzare ogni aspetto della tua attività.
          </p>
        </motion.div>

        {/* Bento Grid - Raycast Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* LARGE CARD - Menu QR (2 cols x 2 rows) */}
          <motion.div
            style={{ y: y1 }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-3xl bg-card border border-border p-10 hover:border-violet-500/30 transition-all duration-500"
          >
            {/* Gradient Background on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10 h-full flex flex-col">
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mb-6 shadow-lg shadow-violet-500/25">
                <QrCode className="w-7 h-7 text-white" />
              </div>
              
              {/* Content */}
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                Menu QR Dinamico
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Aggiorna piatti, prezzi e foto in tempo reale. I tuoi clienti vedono sempre l'ultima versione del menu.
              </p>
              
              {/* Screenshot */}
              <div className="relative flex-1 min-h-[200px] rounded-2xl overflow-hidden border border-border/50 mt-auto">
                <img 
                  src={qrScanPreview} 
                  alt="QR Code menu preview" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-6">
                {["Tempo reale", "Multi-lingua", "Personalizzabile"].map((tag) => (
                  <span 
                    key={tag}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* MEDIUM CARD - Takeaway */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="group relative overflow-hidden rounded-3xl bg-card border border-border p-8 hover:border-orange-500/30 transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-5 shadow-lg shadow-orange-500/25">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-2">
                Ordini & Delivery
              </h3>
              <p className="text-sm text-muted-foreground mb-5">
                Ricevi ordini per asporto e delivery. Zero commissioni.
              </p>
              
              {/* Mini Screenshot */}
              <div className="relative aspect-square rounded-xl overflow-hidden border border-border/50">
                <img 
                  src={dashboardPreview} 
                  alt="Dashboard preview" 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />
              </div>
            </div>
          </motion.div>

          {/* MEDIUM CARD - Reservations */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            className="group relative overflow-hidden rounded-3xl bg-card border border-border p-8 hover:border-emerald-500/30 transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-5 shadow-lg shadow-emerald-500/25">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-2">
                Prenotazioni Online
              </h3>
              <p className="text-sm text-muted-foreground mb-5">
                Sistema integrato con conferma automatica.
              </p>
              
              {/* Mini Calendar Grid */}
              <div className="aspect-square rounded-xl bg-muted/30 border border-border/50 p-3">
                <div className="grid grid-cols-7 gap-1 h-full">
                  {Array.from({ length: 21 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`rounded-md flex items-center justify-center text-xs transition-all ${
                        i === 8 || i === 12 || i === 17 
                          ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-semibold shadow-sm" 
                          : "bg-muted/50 text-muted-foreground"
                      }`}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* SMALL CARD - Loyalty */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="group relative overflow-hidden rounded-3xl bg-card border border-border p-6 hover:border-pink-500/30 transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center mb-4 shadow-lg shadow-pink-500/25">
                <Heart className="w-5 h-5 text-white" />
              </div>
              
              <h4 className="text-lg font-bold text-foreground mb-1.5">
                Fidelity
              </h4>
              <p className="text-sm text-muted-foreground">
                Premia i clienti abituali con sconti e punti fedeltà.
              </p>
            </div>
          </motion.div>

          {/* SMALL CARD - Analytics */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            viewport={{ once: true }}
            className="group relative overflow-hidden rounded-3xl bg-card border border-border p-6 hover:border-blue-500/30 transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4 shadow-lg shadow-blue-500/25">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              
              <h4 className="text-lg font-bold text-foreground mb-1.5">
                Analytics
              </h4>
              <p className="text-sm text-muted-foreground">
                Scopri i piatti più popolari e ottimizza il menu.
              </p>
            </div>
          </motion.div>

          {/* SMALL CARD - WhatsApp */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="group relative overflow-hidden rounded-3xl bg-card border border-border p-6 hover:border-green-500/30 transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-4 shadow-lg shadow-green-500/25">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              
              <h4 className="text-lg font-bold text-foreground mb-1.5">
                WhatsApp
              </h4>
              <p className="text-sm text-muted-foreground">
                Notifiche automatiche ai clienti e al team.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Features;
