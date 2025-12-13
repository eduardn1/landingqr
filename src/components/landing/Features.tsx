import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { 
  QrCode, 
  Calendar, 
  ShoppingBag, 
  BarChart3,
  Bell,
  Palette,
  Languages,
  CreditCard
} from "lucide-react";
import qrScanPreview from "@/assets/qr-scan-preview.png";
import dashboardPreview from "@/assets/dashboard-preview.png";

const mainFeatures = [
  {
    icon: QrCode,
    title: "Menu QR Dinamico",
    description: "Aggiorna piatti, prezzi e foto in tempo reale. I tuoi clienti vedono sempre l'ultima versione.",
    image: qrScanPreview,
    gradient: "from-primary/20 to-primary/5",
  },
  {
    icon: Calendar,
    title: "Prenotazioni Online",
    description: "Sistema di prenotazione integrato con conferma automatica via WhatsApp e email.",
    image: null,
    gradient: "from-success/20 to-success/5",
  },
  {
    icon: ShoppingBag,
    title: "Ordini & Delivery",
    description: "Ricevi ordini per asporto e delivery direttamente sul tuo smartphone. Zero commissioni.",
    image: dashboardPreview,
    gradient: "from-warning/20 to-warning/5",
  },
];

const secondaryFeatures = [
  {
    icon: BarChart3,
    title: "Analytics Avanzati",
    description: "Scopri i piatti più popolari e ottimizza il tuo menu.",
  },
  {
    icon: Bell,
    title: "Notifiche Real-time",
    description: "Ricevi alert istantanei per ogni nuovo ordine.",
  },
  {
    icon: Palette,
    title: "Brand Personalizzato",
    description: "Colori, logo e stile del tuo ristorante.",
  },
  {
    icon: Languages,
    title: "Multi-lingua",
    description: "Menu in italiano, inglese, tedesco e altre lingue.",
  },
  {
    icon: CreditCard,
    title: "Pagamenti Online",
    description: "Accetta carte, Satispay e altri metodi digitali.",
  },
];

const Features = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} id="features" className="section-padding relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.02] to-background" />
      
      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          style={{ opacity }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="badge-primary mb-6">
            <span>Funzionalità</span>
          </div>
          <h2 className="text-display-sm md:text-display-md font-bold mb-6">
            <span className="text-foreground">Tutto quello che serve</span>
            <br />
            <span className="gradient-text">al tuo ristorante</span>
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
            Una piattaforma completa per digitalizzare ogni aspetto della tua attività.
          </p>
        </motion.div>

        {/* Main Features - Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Large Feature Card */}
          <motion.div
            style={{ y: y1 }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bento-card lg:row-span-2 group"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${mainFeatures[0].gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`} />
            <div className="relative z-10">
              <div className="icon-box-lg mb-6">
                <QrCode className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                {mainFeatures[0].title}
              </h3>
              <p className="text-muted-foreground mb-6">
                {mainFeatures[0].description}
              </p>
              
              {/* Feature Image */}
              <div className="relative rounded-2xl overflow-hidden border border-border">
                <img 
                  src={qrScanPreview} 
                  alt="QR Code scanning in restaurant" 
                  className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              </div>
            </div>
          </motion.div>

          {/* Stacked Feature Cards */}
          <motion.div
            style={{ y: y2 }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bento-card group"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${mainFeatures[1].gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`} />
            <div className="relative z-10">
              <div className="icon-box-lg mb-6">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                {mainFeatures[1].title}
              </h3>
              <p className="text-muted-foreground">
                {mainFeatures[1].description}
              </p>
              
              {/* Mini Calendar Preview */}
              <div className="mt-6 grid grid-cols-7 gap-1">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="text-center text-xs text-muted-foreground">
                    {["L", "M", "M", "G", "V", "S", "D"][i]}
                  </div>
                ))}
                {Array.from({ length: 14 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`aspect-square rounded-lg flex items-center justify-center text-sm ${
                      i === 5 || i === 8 || i === 12 
                        ? "bg-primary/20 text-primary font-medium" 
                        : "bg-muted/50 text-muted-foreground"
                    }`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            style={{ y: y2 }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bento-card group"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${mainFeatures[2].gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`} />
            <div className="relative z-10">
              <div className="icon-box-lg mb-6">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                {mainFeatures[2].title}
              </h3>
              <p className="text-muted-foreground">
                {mainFeatures[2].description}
              </p>
              
              {/* Order Preview Cards */}
              <div className="mt-6 space-y-2">
                {[
                  { status: "Nuovo", time: "2 min fa", items: 3 },
                  { status: "In preparazione", time: "15 min fa", items: 5 },
                ].map((order, i) => (
                  <div 
                    key={i}
                    className="flex items-center justify-between p-3 rounded-xl bg-muted/50 border border-border"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${i === 0 ? "bg-success animate-pulse" : "bg-warning"}`} />
                      <span className="text-sm text-foreground">{order.status}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{order.items} piatti</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Secondary Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {secondaryFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group p-6 rounded-2xl bg-card/50 border border-border hover:border-primary/30 hover:bg-card transition-all duration-300"
            >
              <div className="icon-box mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-4 h-4" />
              </div>
              <h4 className="font-semibold text-foreground mb-2 text-sm">
                {feature.title}
              </h4>
              <p className="text-xs text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
