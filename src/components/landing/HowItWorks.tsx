/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * QRCODESTUDIOJEM - How It Works Section (2026 Design)
 * Timeline verticale animata con step cards e smooth scroll transitions
 * 
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * Web Development & Digital Solutions
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FileEdit, Palette, QrCode, Rocket, Clock, CheckCircle, ArrowDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLeadForm } from "@/hooks/useLeadForm";

const steps = [
  {
    step: 1,
    icon: FileEdit,
    title: "Crea il menu",
    description: "Aggiungi piatti, prezzi, foto. Importa da Excel o inizia da un template. Traduzioni AI in 5 lingue.",
    details: ["Import Excel/CSV", "Foto ottimizzate", "5 lingue automatiche"],
    time: "5 min",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    step: 2,
    icon: Palette,
    title: "Personalizza",
    description: "Scegli tra 8 template premium. Colori, logo e layout secondo il tuo brand. Zero codice.",
    details: ["8 template moderni", "Colori brand custom", "Logo & branding"],
    time: "3 min",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    step: 3,
    icon: Rocket,
    title: "Vai live!",
    description: "QR code pronto, condividi il link. I clienti ordinano, tu gestisci tutto dalla dashboard.",
    details: ["QR code unico", "Link condivisibile", "Analytics istantanei"],
    time: "2 min",
    gradient: "from-emerald-500 to-teal-600",
  },
];

const HowItWorks = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineProgress = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const { openLeadForm } = useLeadForm();

  return (
    <section ref={containerRef} className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-background" />
      <div className="absolute inset-0 grid-pattern opacity-[0.03]" />
      
      {/* Floating Orb */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-40 right-[10%] w-[400px] h-[400px] bg-gradient-to-br from-primary/15 to-accent/10 rounded-full blur-[100px]"
      />
      
      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-success/10 border border-success/20 mb-8"
          >
            <Clock className="w-4 h-4 text-success" />
            <span className="text-sm font-semibold text-success">Setup in 10 minuti</span>
          </motion.div>

          <h2 className="font-display text-display-sm md:text-display-md font-bold leading-tight mb-6">
            <span className="text-foreground">Da zero a online in </span>
            <span className="gradient-text">3 step</span>
          </h2>

          <p className="text-body-lg text-muted-foreground leading-relaxed">
            Non serve essere esperti di tecnologia. Se sai usare WhatsApp, sai usare Flavour.
            <br />
            Promesso.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line - Animated */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2">
            <div className="absolute inset-0 bg-border" />
            <motion.div 
              className="absolute inset-x-0 top-0 bg-gradient-to-b from-primary via-accent to-success"
              style={{ height: lineProgress }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-16 md:space-y-24">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ 
                    duration: 0.7, 
                    delay: index * 0.1,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className={`relative flex items-start gap-8 md:gap-0 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Node */}
                  <motion.div 
                    className="absolute left-8 md:left-1/2 md:-translate-x-1/2 z-10"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", delay: index * 0.1 + 0.2 }}
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-xl`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    {/* Glow */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.gradient} blur-xl opacity-40`} />
                  </motion.div>

                  {/* Content Card */}
                  <div className={`flex-1 ml-24 md:ml-0 ${
                    isEven ? 'md:pr-16 lg:pr-24 md:text-right' : 'md:pl-16 lg:pl-24'
                  }`}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="relative p-6 md:p-8 rounded-3xl bg-card border border-border hover:border-primary/20 transition-colors group"
                    >
                      {/* Gradient overlay on hover */}
                      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity`} />
                      
                      <div className="relative z-10">
                        {/* Step Number */}
                        <div className={`inline-flex items-center gap-2 mb-4 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                          <span className={`text-xs font-semibold uppercase tracking-wider bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent`}>
                            Step {step.step}
                          </span>
                          <div className="h-px w-8 bg-border" />
                        </div>

                        {/* Title */}
                        <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-3">
                          {step.title}
                        </h3>

                        {/* Description */}
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          {step.description}
                        </p>

                        {/* Details List */}
                        <ul className={`space-y-2 mb-6 ${isEven ? 'md:flex md:flex-col md:items-end' : ''}`}>
                          {step.details.map((detail, i) => (
                            <motion.li
                              key={detail}
                              initial={{ opacity: 0, x: isEven ? 10 : -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.3 + i * 0.05 }}
                              className={`flex items-center gap-2 text-sm ${isEven ? 'md:flex-row-reverse' : ''}`}
                            >
                              <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                              <span className="text-muted-foreground">{detail}</span>
                            </motion.li>
                          ))}
                        </ul>

                        {/* Time Badge */}
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/20 ${
                          isEven ? 'md:flex-row-reverse' : ''
                        }`}>
                          <Clock className="w-4 h-4 text-success" />
                          <span className="text-success font-semibold text-sm">{step.time}</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              );
            })}
          </div>

          {/* Arrow at the end */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex justify-center mt-16"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center"
            >
              <ArrowDown className="w-5 h-5 text-primary" />
            </motion.div>
          </motion.div>
        </div>

        {/* Total Time Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-8 px-8 py-6 rounded-3xl bg-card border border-border backdrop-blur-sm shadow-xl">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-primary" />
              <span className="text-muted-foreground font-medium">Tempo totale:</span>
            </div>
            <div className="font-display text-4xl md:text-5xl font-bold gradient-text">
              ~10 minuti
            </div>
            <Button 
              onClick={() => openLeadForm('how-it-works')}
              className="gradient-button"
            >
              Inizia ora
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
