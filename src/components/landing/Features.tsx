import { motion } from "framer-motion";
import {
  QrCode,
  ShoppingBag,
  Calendar,
  Palette,
  Gift,
  BarChart3,
  MessageCircle,
  Globe,
  Smartphone,
  Instagram,
  Sparkles,
  Utensils,
  Moon,
  Zap,
  Lock,
  Image,
  Brain,
  LayoutDashboard,
  Crown,
} from "lucide-react";

const mainFeatures = [
  {
    icon: QrCode,
    title: "Menu QR Intelligente",
    description: "5 lingue, filtri allergeni, aggiornamenti in tempo reale",
    gradient: "from-primary to-purple-600",
    large: true,
    tags: ["5 Lingue", "Filtri Allergeni", "Cerca Piatti", "Dark Mode"],
  },
  {
    icon: ShoppingBag,
    title: "Asporto & Delivery",
    description: "Ordini online con gestione driver, zone consegna, tracking",
    gradient: "from-success to-emerald-600",
  },
  {
    icon: Calendar,
    title: "Prenotazioni",
    description: "Gestione tavoli, promemoria WhatsApp, calendario integrato",
    gradient: "from-accent to-pink-600",
  },
  {
    icon: Palette,
    title: "8 Template Homepage",
    description: "Scegli il tuo stile. Personalizza colori. Lancia in minuti.",
    gradient: "from-warning to-orange-600",
    large: true,
  },
  {
    icon: Gift,
    title: "Loyalty & Premi",
    description: "Fidelizza clienti con punti e sconti",
    gradient: "from-primary to-purple-600",
    small: true,
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description: "Dati real-time sui tuoi clienti",
    gradient: "from-success to-emerald-600",
    small: true,
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    description: "Notifiche automatiche ordini",
    gradient: "from-accent to-pink-600",
    small: true,
  },
];

const additionalFeatures = [
  { icon: Globe, text: "Multi-lingua (IT, EN, DE, ES, FR)", color: "from-primary to-purple-600" },
  { icon: Smartphone, text: "PWA - Installabile come App", color: "from-success to-emerald-600" },
  { icon: Instagram, text: "Integrazione Instagram Feed", color: "from-accent to-pink-600" },
  { icon: Sparkles, text: "Gamification & Rewards", color: "from-warning to-orange-600" },
  { icon: Utensils, text: "Filtri Allergeni & Diete", color: "from-primary to-purple-600" },
  { icon: Moon, text: "Dark & Light Mode", color: "from-success to-emerald-600" },
  { icon: Zap, text: "Aggiornamenti Real-Time", color: "from-accent to-pink-600" },
  { icon: Lock, text: "GDPR Compliant & Sicuro", color: "from-warning to-orange-600" },
  { icon: Image, text: "Stories Tipo Instagram", color: "from-primary to-purple-600" },
  { icon: Brain, text: "Raccomandazioni AI", color: "from-success to-emerald-600" },
  { icon: LayoutDashboard, text: "Dashboard Admin Potente", color: "from-accent to-pink-600" },
  { icon: Crown, text: "White-Label per Agenzie", color: "from-warning to-orange-600" },
];

const Features = () => {
  return (
    <section id="features" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 section-gradient" />
      <div className="absolute top-0 left-1/4 w-96 h-96 orb-primary opacity-30" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 orb-accent opacity-20" />

      <div className="container relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-6"
        >
          <div className="inline-block px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold tracking-wide uppercase">
            🚀 Piattaforma Completa
          </div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Tutto Quello che Serve
            <br />
            <span className="gradient-text">al Tuo Locale</span>
          </h2>

          <p className="text-xl text-muted-foreground leading-relaxed">
            Dalla scansione QR al pagamento. Dallo staff ai clienti. Tutto
            integrato.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {mainFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`feature-card group ${
                feature.large ? "lg:col-span-2" : ""
              } ${feature.small ? "" : ""}`}
            >
              <div className="flex items-start gap-4 mb-6">
                <div
                  className={`icon-container-xl bg-gradient-to-br ${feature.gradient} shadow-xl group-hover:scale-110 transition-transform`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>

              {feature.large && feature.tags && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {feature.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Additional Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <h3 className="font-display text-2xl md:text-3xl font-bold text-center">
            E Molto Altro Ancora...
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex items-center gap-4 p-4 rounded-xl glass-card border border-white/10 hover:border-white/20 hover:scale-[1.02] transition-all duration-300 cursor-pointer group"
              >
                <div
                  className={`icon-container-sm bg-gradient-to-br ${feature.color} shadow-lg group-hover:scale-110 transition-transform`}
                >
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-foreground/80 font-medium group-hover:text-foreground transition-colors">
                  {feature.text}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
