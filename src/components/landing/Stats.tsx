import { motion } from "framer-motion";

const stats = [
  { value: "500+", label: "Ristoranti attivi" },
  { value: "1M+", label: "Scan al mese" },
  { value: "99.9%", label: "Uptime garantito" },
  { value: "4.9★", label: "Valutazione media" },
];

const Stats = () => {
  return (
    <section className="py-16 relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="p-8 md:p-12 rounded-3xl bg-white/[0.02] border border-white/[0.06]"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="stat-card"
              >
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
