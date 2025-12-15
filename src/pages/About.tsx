/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * QRCODESTUDIOJEM - About Page (Chi Siamo) - Monochrome + Glass Effects
 * Inspired by Cadence AI
 * 
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowRight,
  Sparkles, 
  Target, 
  Heart, 
  Zap, 
  Globe,
  Users,
  Rocket,
  Shield,
  Code,
  Palette,
  MapPin,
  Calendar,
  Coffee,
  Linkedin,
  Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SharedNavbar from "@/components/shared/SharedNavbar";

const values = [
  {
    icon: Target,
    title: "Missione",
    description: "Democratizzare la tecnologia per l'hospitality, rendendo accessibile a ogni locale strumenti digitali potenti e facili da usare.",
  },
  {
    icon: Heart,
    title: "Passione",
    description: "Amiamo il nostro lavoro e lo facciamo con dedizione. Ogni feature nasce dall'ascolto delle esigenze reali dei nostri clienti.",
  },
  {
    icon: Zap,
    title: "Innovazione",
    description: "Siamo sempre al passo con le ultime tecnologie per offrire soluzioni all'avanguardia che fanno la differenza.",
  },
  {
    icon: Globe,
    title: "Accessibilità",
    description: "Crediamo che ogni locale, grande o piccolo, meriti strumenti professionali senza costi proibitivi.",
  },
];

const timeline = [
  {
    year: "2023",
    title: "L'idea prende forma",
    description: "Nasce l'idea di Flavour durante la pandemia, quando i ristoratori hanno più che mai bisogno di soluzioni digitali.",
  },
  {
    year: "2024",
    title: "Lancio ufficiale",
    description: "Dopo mesi di sviluppo e test con ristoratori locali, Flavour viene lanciato ufficialmente in Sardegna.",
  },
  {
    year: "2025",
    title: "Espansione nazionale",
    description: "Flavour si espande in tutta Italia, con oltre 500 locali attivi e nuove funzionalità rivoluzionarie.",
  },
];

const features = [
  { icon: Code, label: "Tecnologia proprietaria" },
  { icon: Palette, label: "Design italiano" },
  { icon: Shield, label: "GDPR compliant" },
  { icon: Rocket, label: "Performance ottimizzate" },
];

const techStack = [
  "React", "TypeScript", "Tailwind CSS", "Supabase", "Framer Motion", "Vite"
];

const teamMembers = [
  {
    name: "Eduard Costin Udila",
    role: "Founder & Lead Developer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    socials: { linkedin: "#", email: "info@studiojem.it" }
  },
  {
    name: "Marco Rossi",
    role: "UX/UI Designer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    socials: { linkedin: "#", email: "#" }
  },
  {
    name: "Giulia Ferrara",
    role: "Product Manager",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
    socials: { linkedin: "#", email: "#" }
  },
  {
    name: "Alessandro Mura",
    role: "Backend Developer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    socials: { linkedin: "#", email: "#" }
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <SharedNavbar />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          {/* Background - Monochrome glow */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-foreground-05 via-transparent to-transparent" />
            <div className="absolute top-20 left-1/4 w-72 h-72 bg-foreground-05 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-foreground-03 rounded-full blur-3xl" />
          </div>
          
          <div className="container relative">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent-color/10 border border-accent-color/20 mb-6 backdrop-blur-sm"
              >
                <Sparkles className="w-4 h-4 text-accent-color" />
                <span className="text-sm font-semibold text-accent-color">Chi Siamo</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-foreground mb-6"
              >
                Dietro Flavour c'è una{" "}
                <span className="text-foreground-50">passione italiana</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-lg md:text-xl text-foreground-50 max-w-2xl mx-auto mb-8"
              >
                Siamo un team di sviluppatori e designer che credono nel potere della tecnologia 
                per trasformare l'esperienza della ristorazione italiana.
              </motion.p>

              {/* Location Badge - Glass effect */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, type: "spring" }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/60 backdrop-blur-xl border border-foreground-10"
              >
                <MapPin className="w-4 h-4 text-accent-color" />
                <span className="text-sm font-medium text-foreground">Cagliari, Sardegna</span>
                <span className="text-foreground-30">•</span>
                <span className="text-sm text-foreground-50">Made in Italy 🇮🇹</span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Values Section - Glass cards */}
        <section className="py-16 md:py-24 border-t border-foreground-10">
          <div className="container">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                I nostri valori
              </h2>
              <p className="text-foreground-50 max-w-xl mx-auto">
                Principi che guidano ogni decisione e ogni linea di codice che scriviamo.
              </p>
            </motion.div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
            >
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={value.title}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="group relative bg-card/60 backdrop-blur-xl border border-foreground-10 rounded-2xl p-6 hover:border-foreground-20 transition-all"
                  >
                    {/* Glass shine */}
                    <div className="absolute inset-0 bg-gradient-to-br from-foreground-05 via-transparent to-foreground-03 rounded-2xl pointer-events-none" />
                    
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-xl bg-foreground-05 flex items-center justify-center mb-4 group-hover:bg-foreground-10 transition-colors">
                        <Icon className="w-5 h-5 text-foreground-60 group-hover:text-foreground transition-colors" />
                      </div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">{value.title}</h3>
                      <p className="text-sm text-foreground-50 leading-relaxed">{value.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Team Section - Glass cards */}
        <section className="py-16 md:py-24 bg-foreground-03">
          <div className="container">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-color/10 border border-accent-color/20 mb-6 backdrop-blur-sm">
                <Users className="w-4 h-4 text-accent-color" />
                <span className="text-sm font-semibold text-accent-color">Il nostro team</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Le persone dietro Flavour
              </h2>
              <p className="text-foreground-50 max-w-xl mx-auto">
                Un team appassionato che lavora ogni giorno per rendere la tecnologia accessibile a tutti.
              </p>
            </motion.div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
            >
              {teamMembers.map((member) => (
                <motion.div
                  key={member.name}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="group text-center"
                >
                  {/* Avatar - Glass border */}
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <div className="w-full h-full rounded-full overflow-hidden border-2 border-foreground-10 group-hover:border-foreground-30 transition-colors">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Social links on hover */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <a 
                        href={member.socials.linkedin}
                        className="w-6 h-6 rounded-full bg-card/80 backdrop-blur-sm border border-foreground-10 flex items-center justify-center hover:border-foreground-20 transition-colors"
                      >
                        <Linkedin className="w-3 h-3 text-foreground-50" />
                      </a>
                      <a 
                        href={`mailto:${member.socials.email}`}
                        className="w-6 h-6 rounded-full bg-card/80 backdrop-blur-sm border border-foreground-10 flex items-center justify-center hover:border-foreground-20 transition-colors"
                      >
                        <Mail className="w-3 h-3 text-foreground-50" />
                      </a>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-foreground mb-1">{member.name}</h3>
                  <p className="text-sm text-foreground-50">{member.role}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Story Section with Timeline */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              {/* Left - Story */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-color/10 border border-accent-color/20 mb-6 backdrop-blur-sm">
                  <Calendar className="w-4 h-4 text-accent-color" />
                  <span className="text-sm font-semibold text-accent-color">La nostra storia</span>
                </div>
                
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Da un'idea a una piattaforma che{" "}
                  <span className="text-foreground-50">trasforma l'hospitality</span>
                </h2>
                
                <p className="text-foreground-50 mb-6 leading-relaxed">
                  Flavour nasce dalla volontà di creare qualcosa di diverso: una piattaforma che unisce 
                  tecnologia avanzata e semplicità d'uso, pensata per chi ogni giorno lavora con passione 
                  nel mondo della ristorazione.
                </p>
                
                <p className="text-foreground-50 mb-8 leading-relaxed">
                  Il nostro obiettivo è semplice: permettere a ogni locale, dal piccolo bar di quartiere 
                  al ristorante stellato, di offrire un'esperienza digitale all'altezza delle aspettative 
                  dei clienti moderni.
                </p>

                {/* Features Pills - Glass effect */}
                <div className="flex flex-wrap gap-2">
                  {features.map((feature) => (
                    <div
                      key={feature.label}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/60 backdrop-blur-sm border border-foreground-10 hover:border-foreground-20 transition-colors"
                    >
                      <feature.icon className="w-3.5 h-3.5 text-foreground-50" />
                      <span className="text-xs font-medium text-foreground">{feature.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right - Timeline */}
              <div className="space-y-6">
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15, duration: 0.5 }}
                    className="relative flex gap-4 group"
                  >
                    {/* Timeline Line */}
                    {index < timeline.length - 1 && (
                      <div className="absolute left-[23px] top-12 w-0.5 h-full bg-gradient-to-b from-foreground-30 to-foreground-10" />
                    )}
                    
                    {/* Year Badge - Monochrome */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-foreground text-background flex items-center justify-center font-bold text-sm">
                        {item.year.slice(2)}
                      </div>
                    </div>
                    
                    {/* Content - Glass card */}
                    <div className="flex-1 bg-card/60 backdrop-blur-sm border border-foreground-10 rounded-xl p-4 group-hover:border-foreground-20 transition-colors">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-foreground-60">{item.year}</span>
                      </div>
                      <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                      <p className="text-sm text-foreground-50">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="py-16 md:py-20 bg-foreground-03">
          <div className="container">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-color/10 border border-accent-color/20 mb-6 backdrop-blur-sm">
                <Code className="w-4 h-4 text-accent-color" />
                <span className="text-sm font-semibold text-accent-color">Tech Stack</span>
              </div>
              
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Costruito con le migliori tecnologie
              </h2>
              <p className="text-foreground-50 mb-8">
                Stack moderno e performante per un'esperienza utente impeccabile
              </p>
              
              <div className="flex flex-wrap justify-center gap-3">
                {techStack.map((tech) => (
                  <div
                    key={tech}
                    className="px-4 py-2 rounded-xl bg-card/60 backdrop-blur-sm border border-foreground-10 text-sm font-medium text-foreground hover:border-foreground-20 transition-all"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section - Glass card */}
        <section className="py-16 md:py-24">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center relative"
            >
              {/* Background glow - Monochrome */}
              <div className="absolute inset-0 bg-gradient-to-r from-foreground-05 via-foreground-10 to-foreground-05 rounded-3xl blur-3xl" />
              
              <div className="relative bg-card/60 backdrop-blur-xl border border-foreground-10 rounded-3xl p-8 md:p-12">
                {/* Glass shine */}
                <div className="absolute inset-0 bg-gradient-to-br from-foreground-05 via-transparent to-foreground-03 rounded-3xl pointer-events-none" />
                
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-foreground text-background flex items-center justify-center mx-auto mb-6">
                    <Rocket className="w-8 h-8" />
                  </div>
                  
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                    Pronto a trasformare il tuo locale?
                  </h2>
                  <p className="text-foreground-50 mb-8 max-w-lg mx-auto">
                    Unisciti a centinaia di locali che hanno già scelto Flavour per digitalizzare la loro esperienza.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link to="/demo">
                      <Button size="lg" className="gap-2 rounded-full">
                        <Coffee className="w-4 h-4" />
                        Prova la demo
                      </Button>
                    </Link>
                    <Link to="/contatti">
                      <Button variant="outline" size="lg" className="gap-2 rounded-full border-foreground-20 text-foreground-70 hover:text-foreground hover:border-foreground-30 hover:bg-foreground-05">
                        Contattaci
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;