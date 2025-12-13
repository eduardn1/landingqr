import { motion } from "framer-motion";
import { Store, QrCode, Zap, Star } from "lucide-react";

const stats = [
  {
    icon: Store,
    value: "500+",
    label: "Ristoranti Attivi",
    gradient: "from-primary to-purple-600",
    shadow: "shadow-primary/50",
  },
  {
    icon: QrCode,
    value: "1M+",
    label: "Scan al Mese",
    gradient: "from-success to-emerald-600",
    shadow: "shadow-success/50",
  },
  {
    icon: Zap,
    value: "99.9%",
    label: "Uptime",
    gradient: "from-accent to-pink-600",
    shadow: "shadow-accent/50",
  },
  {
    icon: Star,
    value: "4.9★",
    label: "Valutazione",
    gradient: "from-warning to-orange-600",
    shadow: "shadow-warning/50",
  },
];

const Stats = () => {
  return (
    <section className="py-16 relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-3xl p-8 md:p-12 shadow-2xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="stat-card"
              >
                <div className="flex justify-center">
                  <div
                    className={`icon-container-lg bg-gradient-to-br ${stat.gradient} shadow-lg ${stat.shadow}`}
                  >
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="stat-value gradient-text">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
