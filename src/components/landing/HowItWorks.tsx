import { motion } from "framer-motion";
import { FileEdit, Palette, QrCode, ArrowRight } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: FileEdit,
    title: "Crea il Menu",
    description: "Aggiungi i tuoi piatti, prezzi, foto e descrizioni. Importa da Excel se vuoi.",
    time: "5 min",
    gradient: "from-primary to-purple-600",
  },
  {
    step: "02",
    icon: Palette,
    title: "Personalizza",
    description: "Scegli template, colori, logo. Il tuo brand, il tuo stile.",
    time: "2 min",
    gradient: "from-accent to-pink-600",
  },
  {
    step: "03",
    icon: QrCode,
    title: "Vai Live",
    description: "Genera il QR code. Stampalo. I clienti scansionano e ordinano.",
    time: "3 min",
    gradient: "from-success to-emerald-600",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 section-gradient" />
      
      <div className="container relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-6"
        >
          <div className="inline-block px-5 py-2 rounded-full bg-success/10 border border-success/20 text-success text-sm font-semibold tracking-wide uppercase">
            ⚡ Super Veloce
          </div>
          
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Pronto in{" "}
            <span className="gradient-text">10 Minuti</span>
          </h2>
          
          <p className="text-xl text-muted-foreground leading-relaxed">
            Non serve essere esperti di tecnologia. Se sai usare WhatsApp, sai usare MenuLink.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-24 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-primary via-accent to-success opacity-30" />
          
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              <div className="glass-card rounded-3xl p-8 text-center space-y-6 h-full border border-white/10 hover:border-white/20 transition-all duration-300 group">
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-background border border-white/20 text-sm font-bold text-muted-foreground">
                  {step.step}
                </div>
                
                {/* Icon */}
                <div className={`icon-container-xl bg-gradient-to-br ${step.gradient} mx-auto shadow-xl group-hover:scale-110 transition-transform`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                
                {/* Content */}
                <div className="space-y-3">
                  <h3 className="font-display text-2xl font-bold">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
                
                {/* Time Badge */}
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${step.gradient} text-white text-sm font-semibold`}>
                  {step.time}
                </div>
              </div>
              
              {/* Arrow (Mobile) */}
              {index < steps.length - 1 && (
                <div className="flex justify-center py-4 md:hidden">
                  <ArrowRight className="w-6 h-6 text-muted-foreground rotate-90" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
        
        {/* Total Time */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 glass-card px-8 py-4 rounded-2xl">
            <span className="text-muted-foreground">Tempo totale:</span>
            <span className="text-3xl font-bold gradient-text">10 minuti</span>
            <span className="text-muted-foreground">e sei online!</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
