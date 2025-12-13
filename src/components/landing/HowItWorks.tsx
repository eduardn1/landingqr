import { motion } from "framer-motion";
import { FileEdit, Palette, QrCode } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: FileEdit,
    title: "Crea il menu",
    description: "Aggiungi i tuoi piatti, prezzi, foto e descrizioni. Importa da Excel se vuoi.",
    time: "5 min",
  },
  {
    step: "02",
    icon: Palette,
    title: "Personalizza",
    description: "Scegli template, colori, logo. Il tuo brand, il tuo stile.",
    time: "2 min",
  },
  {
    step: "03",
    icon: QrCode,
    title: "Vai live",
    description: "Genera il QR code. Stampalo. I clienti scansionano e ordinano.",
    time: "3 min",
  },
];

const HowItWorks = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="badge-success mb-6">
            Super veloce
          </div>

          <h2 className="text-display-sm md:text-display-md font-bold leading-tight mb-6">
            Pronto in{" "}
            <span className="text-muted-foreground">10 minuti</span>
          </h2>

          <p className="text-body-lg text-muted-foreground leading-relaxed">
            Non serve essere esperti di tecnologia. Se sai usare WhatsApp, sai usare MenuLink.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-20 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative"
            >
              <div className="bento-card text-center h-full">
                {/* Step Number */}
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
                  {step.step}
                </div>

                {/* Icon */}
                <div className="icon-box-lg bg-white/5 mx-auto mb-6">
                  <step.icon className="w-6 h-6 text-foreground" />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-heading-md font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Time Badge */}
                <div className="inline-block px-4 py-2 rounded-full bg-success/10 border border-success/20 text-success text-sm font-medium mt-6">
                  {step.time}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Total Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
            <span className="text-muted-foreground">Tempo totale:</span>
            <span className="text-2xl font-bold text-foreground">10 minuti</span>
            <span className="text-muted-foreground">e sei online!</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
