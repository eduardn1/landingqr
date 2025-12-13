import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Check, Sparkles, Zap, Star, QrCode, CalendarCheck, Truck, BarChart3, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLeadForm } from "@/hooks/useLeadForm";
import dashboardPreview from "@/assets/dashboard-preview.png";
import mobilePreview from "@/assets/mobile-menu-preview.png";

const Hero = () => {
  const { openLeadForm } = useLeadForm();
  const { scrollY } = useScroll();
  
  // Parallax transforms
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const cardY1 = useTransform(scrollY, [0, 500], [0, -40]);
  const cardY2 = useTransform(scrollY, [0, 500], [0, -60]);
  const cardY3 = useTransform(scrollY, [0, 500], [0, -20]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20 pb-10 lg:pt-24">
      {/* Radial Gradient Background */}
      <div className="absolute inset-0 radial-gradient" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      {/* Noise Overlay */}
      <div className="absolute inset-0 noise-overlay" />

      {/* Animated Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="container relative z-10">
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 items-center">
          
          {/* LEFT COLUMN - Main Content (Large Card) */}
          <motion.div 
            style={{ opacity: heroOpacity }}
            className="lg:col-span-7 xl:col-span-6"
          >
            <div className="relative p-6 md:p-10 rounded-3xl bg-card/40 backdrop-blur-sm border border-border">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-3xl" />
              
              <div className="relative z-10">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="mb-6"
                >
                  <div className="badge-primary inline-flex">
                    <Sparkles className="w-4 h-4" />
                    <span>Usato da 500+ ristoranti in Italia</span>
                    <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  </div>
                </motion.div>

                {/* Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-display-sm sm:text-display-md lg:text-display-lg xl:text-display-xl font-extrabold mb-6"
                >
                  <span className="text-foreground">Il tuo ristorante</span>
                  <br />
                  <span className="gradient-text">digitalizzato</span>
                </motion.h1>

                {/* Subheading */}
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-body-md md:text-body-lg text-muted-foreground leading-relaxed max-w-xl mb-8"
                >
                  Menu QR, prenotazioni, asporto e delivery.{" "}
                  Tutto in una piattaforma.{" "}
                  <span className="text-foreground font-semibold">Pronto in 10 minuti.</span>
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-3 mb-8"
                >
                  <Button
                    size="lg"
                    onClick={() => openLeadForm("hero-cta")}
                    className="group text-base px-6 md:px-8 py-6 md:py-7 h-auto gradient-button rounded-2xl"
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    Inizia gratis ora
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>

                  <a
                    href="https://demo2.studiojem.it"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      className="text-base px-6 md:px-8 py-6 md:py-7 h-auto w-full rounded-2xl border-border bg-card/50 hover:bg-card hover:border-primary/30 backdrop-blur-sm transition-all"
                    >
                      Guarda demo live
                    </Button>
                  </a>
                </motion.div>

                {/* Trust Signals */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex flex-wrap gap-4 md:gap-6 text-sm text-muted-foreground"
                >
                  {[
                    "Nessuna carta richiesta",
                    "14 giorni gratis",
                    "Cancella quando vuoi",
                  ].map((text) => (
                    <span key={text} className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
                        <Check className="w-3 h-3 text-success" />
                      </div>
                      {text}
                    </span>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN - Bento Grid Cards */}
          <div className="lg:col-span-5 xl:col-span-6 grid grid-cols-2 gap-3 md:gap-4">
            
            {/* Dashboard Preview - Large Card */}
            <motion.div
              style={{ y: cardY1 }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="col-span-2 group relative overflow-hidden rounded-2xl md:rounded-3xl bg-card border border-border hover:border-primary/30 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <img 
                  src={dashboardPreview} 
                  alt="Dashboard di gestione menu digitale" 
                  className="w-full h-auto transform group-hover:scale-[1.02] transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              </div>
              
              {/* Floating Rating Badge */}
              <div className="absolute top-3 md:top-4 left-3 md:left-4 bg-card/90 backdrop-blur-xl border border-border rounded-full px-3 py-1.5 md:px-4 md:py-2 shadow-lg flex items-center gap-1.5">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-3 h-3 md:w-4 md:h-4 text-warning fill-warning" />
                  ))}
                </div>
                <span className="text-foreground font-medium text-xs md:text-sm">4.9</span>
              </div>
            </motion.div>

            {/* Mobile Preview - Medium Card */}
            <motion.div
              style={{ y: cardY2 }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="group relative overflow-hidden rounded-2xl md:rounded-3xl bg-card border border-border hover:border-violet-500/30 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-3 md:p-4">
                <div className="relative aspect-[3/4] rounded-xl md:rounded-2xl overflow-hidden border border-border/50">
                  <img 
                    src={mobilePreview} 
                    alt="Menu digitale su smartphone" 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </motion.div>

            {/* Stats Card - Medium Card */}
            <motion.div
              style={{ y: cardY3 }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="group relative overflow-hidden rounded-2xl md:rounded-3xl bg-card border border-border p-4 md:p-5 hover:border-emerald-500/30 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 h-full flex flex-col justify-between">
                {/* Icon */}
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-3 shadow-lg shadow-emerald-500/25">
                  <BarChart3 className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                
                {/* Stats */}
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Ordini oggi</p>
                    <p className="text-xl md:text-2xl font-bold text-foreground">+127</p>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Feature Pills Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-3"
            >
              {[
                { icon: QrCode, text: "Menu QR", color: "from-violet-500 to-purple-600" },
                { icon: CalendarCheck, text: "Prenotazioni", color: "from-emerald-500 to-teal-600" },
                { icon: Truck, text: "Delivery", color: "from-orange-500 to-red-500" },
                { icon: Users, text: "Fidelity", color: "from-pink-500 to-rose-500" },
              ].map((item, i) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.8 + i * 0.05 }}
                  className="group relative"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity`} />
                  <div className="relative flex items-center gap-2 p-2.5 md:p-3 rounded-xl bg-card/80 backdrop-blur-sm border border-border hover:border-primary/30 transition-all">
                    <div className={`w-7 h-7 md:w-8 md:h-8 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                      <item.icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
                    </div>
                    <span className="text-xs md:text-sm font-medium text-foreground truncate">{item.text}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Social Proof Mini Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="col-span-2 rounded-2xl bg-card/60 backdrop-blur-sm border border-border p-3 md:p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {['from-pink-500 to-rose-500', 'from-blue-500 to-cyan-500', 'from-green-500 to-emerald-500', 'from-purple-500 to-violet-500'].map((gradient, i) => (
                      <div key={i} className={`w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br ${gradient} border-2 border-card flex items-center justify-center text-white text-xs font-bold`}>
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
                  </div>
                  <div className="text-xs md:text-sm">
                    <p className="font-semibold text-foreground">+500 ristoratori</p>
                    <p className="text-muted-foreground">già attivi</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs md:text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>Setup in 10 min</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;