import { motion } from "framer-motion";
import { X, Zap, Globe, TrendingUp, Smartphone, Sparkles, FileX } from "lucide-react";
import { Button } from "@/components/ui/button";
import oldMenu from "@/assets/old-menu.jpg";

const painPoints = [
  { emoji: "💸", text: "Stampa menu: €200-500 ogni mese" },
  { emoji: "⏰", text: "Modifiche richiedono giorni" },
  { emoji: "🌍", text: "Turisti non capiscono (perdi vendite)" },
  { emoji: "📊", text: "Zero dati sui tuoi clienti" },
];

const benefits = [
  {
    icon: Zap,
    text: "Aggiornamenti istantanei da smartphone",
    gradient: "from-primary to-purple-600",
    stat: "5 secondi",
  },
  {
    icon: Globe,
    text: "5 lingue incluse (IT, EN, DE, ES, FR)",
    gradient: "from-success to-emerald-600",
    stat: "Più turisti",
  },
  {
    icon: TrendingUp,
    text: "Analytics completi sui tuoi clienti",
    gradient: "from-accent to-pink-600",
    stat: "+47% ordini",
  },
  {
    icon: Smartphone,
    text: "Clienti ordinano da tavolo, da casa, ovunque",
    gradient: "from-warning to-orange-600",
    stat: "24/7 aperto",
  },
];

const ProblemSolution = () => {
  return (
    <section className="py-20 md:py-32 section-gradient">
      <div className="container space-y-24 lg:space-y-32">
        {/* Problem Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1 relative"
          >
            <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-destructive/20 shadow-2xl relative">
              <img
                src={oldMenu}
                alt="Menu cartaceo obsoleto"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <FileX className="w-24 h-24 text-destructive/40" />
              </div>
            </div>

            {/* Floating Pain Cards */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -top-4 -right-4 glass-card p-3 rounded-xl max-w-[200px] shadow-xl border border-destructive/20 animate-float hidden md:block"
            >
              <div className="flex items-start gap-2">
                <X className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground/80">
                  Costi di stampa ricorrenti
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute -bottom-4 -left-4 glass-card p-3 rounded-xl max-w-[220px] shadow-xl border border-destructive/20 animate-float-delayed hidden md:block"
            >
              <div className="flex items-start gap-2">
                <X className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground/80">
                  Impossibile aggiornare prezzi
                </span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2 space-y-6"
          >
            <div className="inline-block px-4 py-2 rounded-full bg-destructive/10 border border-destructive/20 text-destructive text-sm font-semibold">
              ❌ Il Problema
            </div>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              I Menu Cartacei
              <br />
              <span className="gradient-text">Ti Stanno Costando Soldi</span>
            </h2>

            <p className="text-xl text-muted-foreground leading-relaxed">
              Ogni ristampa costa. Ogni errore costa. Ogni cliente che non
              capisce il menu è un'opportunità persa.
            </p>

            <div className="space-y-3 pt-4">
              {painPoints.map((pain, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="pain-card"
                >
                  <span className="text-2xl flex-shrink-0">{pain.emoji}</span>
                  <span className="text-lg text-foreground/80 pt-1">
                    {pain.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Solution Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-block px-4 py-2 rounded-full bg-success/10 border border-success/20 text-success text-sm font-semibold">
              ✅ La Soluzione
            </div>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Menu Digitale che
              <br />
              <span className="gradient-text">Aumenta le Vendite</span>
            </h2>

            <p className="text-xl text-muted-foreground leading-relaxed">
              Aggiorna in 5 secondi. 5 lingue automatiche. Analytics in tempo
              reale. E costa{" "}
              <span className="text-success font-bold">
                meno di una pizza
              </span>{" "}
              al mese.
            </p>

            <div className="space-y-4 pt-4">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="benefit-card"
                >
                  <div
                    className={`icon-container-lg bg-gradient-to-br ${benefit.gradient} flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <benefit.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="text-lg font-medium text-foreground/90 mb-1">
                      {benefit.text}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {benefit.stat}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <Button
              size="lg"
              className="gradient-primary gradient-primary-hover mt-8"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Provalo Gratis 14 Giorni
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Dashboard Preview using real demo screenshot */}
            <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl glass-card">
              <img
                src="https://demo2.studiojem.it/og-image.png"
                alt="Dashboard Admin MenuLink"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop";
                }}
              />
            </div>

            {/* Floating Success Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute -bottom-6 -right-6 glass-card p-5 rounded-2xl shadow-2xl max-w-[280px] border border-success/20 animate-float hidden md:block"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="icon-container-md bg-gradient-to-br from-success to-emerald-600 shadow-lg">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-success">+47%</div>
                  <div className="text-sm text-muted-foreground">
                    Ordini Online
                  </div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground leading-relaxed">
                Media ristoranti nostri clienti nel primo mese
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
