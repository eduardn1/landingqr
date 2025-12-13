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
  Zap,
  Lock,
  Crown,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface MainFeature {
  icon: LucideIcon;
  title: string;
  description: string;
  tags?: string[];
  large?: boolean;
}

const mainFeatures: MainFeature[] = [
  {
    icon: QrCode,
    title: "Menu QR intelligente",
    description: "5 lingue, filtri allergeni, aggiornamenti in tempo reale",
    tags: ["Multi-lingua", "Filtri allergeni", "Ricerca", "Dark mode"],
    large: true,
  },
  {
    icon: ShoppingBag,
    title: "Asporto e delivery",
    description: "Ordini online con gestione driver, zone consegna, tracking",
  },
  {
    icon: Calendar,
    title: "Prenotazioni",
    description: "Gestione tavoli, promemoria WhatsApp, calendario integrato",
  },
  {
    icon: Palette,
    title: "8 template homepage",
    description: "Scegli il tuo stile. Personalizza colori. Lancia in minuti.",
    large: true,
  },
  {
    icon: Gift,
    title: "Loyalty e premi",
    description: "Fidelizza clienti con punti e sconti",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description: "Dati real-time sui tuoi clienti",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    description: "Notifiche automatiche ordini",
  },
];

interface AdditionalFeature {
  icon: LucideIcon;
  text: string;
}

const additionalFeatures: AdditionalFeature[] = [
  { icon: Globe, text: "Multi-lingua (IT, EN, DE, ES, FR)" },
  { icon: Smartphone, text: "PWA - Installabile come app" },
  { icon: Zap, text: "Aggiornamenti real-time" },
  { icon: Lock, text: "GDPR compliant e sicuro" },
  { icon: Crown, text: "White-label per agenzie" },
  { icon: BarChart3, text: "Dashboard admin potente" },
];

const Features = () => {
  return (
    <section id="features" className="section-padding relative overflow-hidden">
      <div className="container relative z-10">
        {/* Heading - Left aligned */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mb-20"
        >
          <div className="badge-primary mb-6">
            Piattaforma completa
          </div>

          <h2 className="text-display-sm md:text-display-md lg:text-[4.5rem] font-bold leading-tight mb-6">
            Tutto quello
            <br />
            <span className="text-muted-foreground">che serve</span>
          </h2>

          <p className="text-body-lg text-muted-foreground leading-relaxed">
            Dalla scansione QR al pagamento. Dallo staff ai clienti. Tutto
            integrato.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {mainFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`bento-card ${feature.large ? "lg:col-span-2" : ""}`}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="icon-box-lg bg-primary/10 flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-heading-md font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>

              {feature.large && feature.tags && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {feature.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/[0.06] text-sm text-muted-foreground"
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-colors duration-200"
              >
                <div className="icon-box-sm bg-white/5">
                  <feature.icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <span className="text-foreground/80 font-medium">
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
