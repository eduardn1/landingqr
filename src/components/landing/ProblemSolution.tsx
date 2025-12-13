import { motion } from "framer-motion";
import { X, Check, ArrowRight, Zap, Globe, TrendingUp, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

const painPoints = [
  "Stampa menu: €200-500 ogni mese",
  "Modifiche richiedono giorni",
  "Turisti non capiscono (perdi vendite)",
  "Zero dati sui tuoi clienti",
];

const benefits = [
  {
    icon: Zap,
    text: "Aggiornamenti istantanei da smartphone",
    stat: "5 secondi",
  },
  {
    icon: Globe,
    text: "5 lingue incluse (IT, EN, DE, ES, FR)",
    stat: "Più turisti",
  },
  {
    icon: TrendingUp,
    text: "Analytics completi sui tuoi clienti",
    stat: "+47% ordini",
  },
  {
    icon: Smartphone,
    text: "Clienti ordinano da tavolo, da casa, ovunque",
    stat: "24/7 aperto",
  },
];

const ProblemSolution = () => {
  return (
    <section className="section-padding">
      <div className="container space-y-32">
        {/* Problem Section */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="order-2 lg:order-1"
          >
            {/* Problem Image Placeholder */}
            <div className="aspect-[4/3] rounded-3xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-20 h-20 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-4">
                  <X className="w-10 h-10 text-destructive/50" />
                </div>
                <p className="text-muted-foreground">Menu cartacei obsoleti</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="order-1 lg:order-2 space-y-8"
          >
            <div className="badge-destructive">
              Il problema
            </div>

            <h2 className="text-display-sm md:text-display-md font-bold leading-tight">
              I menu cartacei
              <br />
              <span className="text-muted-foreground">ti stanno costando soldi</span>
            </h2>

            <p className="text-body-lg text-muted-foreground leading-relaxed">
              Ogni ristampa costa. Ogni errore costa. Ogni cliente che non
              capisce il menu è un'opportunità persa.
            </p>

            <div className="space-y-3 pt-2">
              {painPoints.map((pain, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className="pain-card"
                >
                  <X className="w-5 h-5 text-destructive flex-shrink-0" />
                  <span className="text-foreground/80">{pain}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Solution Section */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="badge-success">
              La soluzione
            </div>

            <h2 className="text-display-sm md:text-display-md font-bold leading-tight">
              Menu digitale che
              <br />
              <span className="text-muted-foreground">aumenta le vendite</span>
            </h2>

            <p className="text-body-lg text-muted-foreground leading-relaxed">
              Aggiorna in 5 secondi. 5 lingue automatiche. Analytics in tempo
              reale. E costa{" "}
              <span className="text-success font-medium">meno di una pizza</span>{" "}
              al mese.
            </p>

            <div className="space-y-4 pt-2">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className="benefit-card group"
                >
                  <div className="icon-box-lg bg-primary/10 flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="text-foreground/90 font-medium mb-1">
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
              className="group gradient-button text-primary-foreground mt-4"
            >
              Provalo gratis 14 giorni
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Solution Image/Dashboard Preview */}
            <div className="aspect-[4/3] rounded-3xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
              <img
                src="https://demo2.studiojem.it/og-image.png"
                alt="Dashboard MenuLink"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop";
                }}
              />
            </div>

            {/* Floating Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="absolute -bottom-6 -right-6 p-5 rounded-2xl bg-background/90 backdrop-blur-sm border border-white/10 hidden md:block"
            >
              <div className="flex items-center gap-4">
                <div className="icon-box-md bg-success/10">
                  <TrendingUp className="w-5 h-5 text-success" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-success">+47%</div>
                  <div className="text-sm text-muted-foreground">Ordini online</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
