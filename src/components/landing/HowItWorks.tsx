import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FileEdit, Palette, QrCode, ArrowRight, Clock, Sparkles } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: FileEdit,
    title: "Crea il menu",
    description: "Aggiungi i tuoi piatti, prezzi, foto e descrizioni. Importa da Excel se vuoi.",
    time: "5 min",
    gradient: "from-primary to-primary-light",
  },
  {
    step: "02",
    icon: Palette,
    title: "Personalizza",
    description: "Scegli template, colori, logo. Il tuo brand, il tuo stile.",
    time: "2 min",
    gradient: "from-accent to-primary",
  },
  {
    step: "03",
    icon: QrCode,
    title: "Vai live",
    description: "Genera il QR code. Stampalo. I clienti scansionano e ordinano.",
    time: "3 min",
    gradient: "from-success to-accent",
  },
];

const HowItWorks = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={containerRef} className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 radial-gradient opacity-50" />
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
      <div className="container relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="badge-success mb-6">
            <Clock className="w-4 h-4" />
            <span>Super veloce</span>
          </div>

          <h2 className="text-display-sm md:text-display-md font-bold leading-tight mb-6">
            <span className="text-foreground">Pronto in </span>
            <span className="gradient-text">10 minuti</span>
          </h2>

          <p className="text-body-lg text-muted-foreground leading-relaxed">
            Non serve essere esperti di tecnologia. Se sai usare WhatsApp, sai usare Flavour.
          </p>
        </motion.div>

        {/* Steps with Bento Layout */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 relative">
          {/* Connector Line */}
          <div className="hidden lg:block absolute top-1/2 left-[16%] right-[16%] h-px">
            <div className="h-full bg-gradient-to-r from-primary/50 via-accent/50 to-success/50" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary via-accent to-success blur-sm opacity-50" />
          </div>

          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              style={{ y: index === 1 ? y2 : y1 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative"
            >
              <div className="bento-card h-full text-center group">
                {/* Glow Effect on Hover */}
                <div className={`absolute -inset-px rounded-3xl bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`} />
                
                {/* Step Number Badge */}
                <div className="relative inline-flex items-center justify-center mb-6">
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} rounded-full blur-xl opacity-30`} />
                  <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/[0.1] flex items-center justify-center">
                    <span className="text-lg font-bold text-foreground">{step.step}</span>
                  </div>
                </div>

                {/* Icon */}
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>

                {/* Content */}
                <div className="space-y-3 mb-6">
                  <h3 className="text-heading-lg font-bold text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Time Badge */}
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-success/10 border border-success/20">
                  <Clock className="w-4 h-4 text-success" />
                  <span className="text-success font-semibold">{step.time}</span>
                </div>

                {/* Arrow for non-last items */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                    <div className="w-8 h-8 rounded-full bg-card border border-white/10 flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Total Time Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-6 px-8 py-5 rounded-3xl bg-gradient-to-r from-white/[0.04] to-white/[0.02] border border-white/[0.08] backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground font-medium">Tempo totale:</span>
            </div>
            <div className="text-3xl font-bold gradient-text">10 minuti</div>
            <span className="text-muted-foreground">e sei online!</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
