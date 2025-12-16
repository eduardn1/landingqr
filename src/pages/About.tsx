/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * NESTIFY - About Page (Chi Siamo)
 * Stile Cadence: glass cards, bento grid asimmetrico unificato
 *
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * Web Development & Digital Solutions
 * 
 * © 2024 StudioJEM - Tutti i diritti riservati
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
  Mail,
  Building,
  Award,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SharedNavbar from "@/components/shared/SharedNavbar";
import Footer from "@/components/landing/Footer";
import DynamicSEO from "@/components/DynamicSEO";

const teamMembers = [
  {
    name: "Eduard Costin Udila",
    role: "Founder & Lead Developer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Marco Rossi",
    role: "UX/UI Designer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Giulia Ferrara",
    role: "Product Manager",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Alessandro Mura",
    role: "Backend Developer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
  },
];

const techStack = ["React", "TypeScript", "Tailwind", "Supabase", "Framer Motion", "Vite"];

const stats = [
  { value: "500+", label: "Locali attivi", icon: Building },
  { value: "50K+", label: "Menu visualizzati", icon: TrendingUp },
  { value: "99.9%", label: "Uptime", icon: Shield },
  { value: "4.9/5", label: "Rating", icon: Award },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 15,
      mass: 0.8,
    }
  },
};

// Glass Card Component
const GlassCard = ({ 
  children, 
  className = "", 
  glowColor = "primary",
}: { 
  children: React.ReactNode; 
  className?: string;
  glowColor?: "primary" | "accent" | "rose";
}) => {
  const glowClasses = {
    primary: "hover:border-primary/50 hover:shadow-primary/10",
    accent: "hover:border-accent/50 hover:shadow-accent/10",
    rose: "hover:border-rose-500/50 hover:shadow-rose-500/10",
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ 
        y: -4, 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className={`
        relative rounded-2xl
        bg-card/60 backdrop-blur-xl
        border border-border/50
        shadow-xl shadow-black/5
        ${glowClasses[glowColor]}
        transition-colors duration-300
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <DynamicSEO />
      <SharedNavbar />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          {/* Radial Gradient Background */}
          <div className="absolute inset-0 radial-gradient" />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 grid-pattern opacity-30" />
          
          {/* Noise Overlay */}
          <div className="absolute inset-0 noise-overlay" />

          {/* Static Orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
          
          <div className="container relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Chi Siamo</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-foreground mb-6">
                Dietro Nestify c'è una{" "}
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  passione italiana
                </span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                Siamo un team di sviluppatori e designer che credono nel potere della tecnologia 
                per trasformare l'esperienza della ristorazione italiana.
              </p>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-border/50">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Cagliari, Sardegna</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">Made in Italy 🇮🇹</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Unified Bento Grid */}
        <section className="py-12 md:py-20">
          <div className="container">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto"
            >
              
              {/* Missione - Large Card */}
              <GlassCard className="lg:col-span-2 lg:row-span-2 p-8" glowColor="primary">
                <div className="h-full flex flex-col">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mb-5">
                    <Target className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">La nostra missione</h3>
                  <p className="text-muted-foreground mb-4 flex-1">
                    Democratizzare la tecnologia per l'hospitality, rendendo accessibile a ogni locale 
                    strumenti digitali potenti e facili da usare. Dal piccolo bar di quartiere al 
                    ristorante stellato.
                  </p>
                  <div className="flex items-center gap-2 text-primary text-sm font-medium">
                    <span>Scopri di più</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </GlassCard>

              {/* Passione */}
              <GlassCard className="p-6" glowColor="accent">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">Passione</h3>
                <p className="text-sm text-muted-foreground">Amiamo il nostro lavoro. Ogni feature nasce dall'ascolto reale dei clienti.</p>
              </GlassCard>

              {/* Innovazione */}
              <GlassCard className="p-6" glowColor="rose">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-rose-500/60 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">Innovazione</h3>
                <p className="text-sm text-muted-foreground">Sempre al passo con le ultime tecnologie per fare la differenza.</p>
              </GlassCard>

              {/* Team Card - Orizzontale */}
              <GlassCard className="lg:col-span-2 p-6" glowColor="primary">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Il nostro team</h3>
                    <p className="text-xs text-muted-foreground">4 persone, infinite possibilità</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {teamMembers.map((member, i) => (
                    <div key={member.name} className="group relative">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-border group-hover:border-primary/50 transition-colors"
                      />
                      {/* Tooltip */}
                      <div className="absolute -top-14 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-card border border-border opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                        <p className="text-xs font-medium text-foreground">{member.name}</p>
                        <p className="text-[10px] text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                  ))}
                  <div className="ml-2 text-sm text-muted-foreground">
                    <span className="text-foreground font-medium">100%</span> remoto
                  </div>
                </div>
              </GlassCard>

              {/* Storia Timeline Mini */}
              <GlassCard className="lg:col-span-2 p-6" glowColor="accent">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground">La nostra storia</h3>
                </div>
                <div className="flex items-center gap-2">
                  {[
                    { year: "'23", label: "Idea" },
                    { year: "'24", label: "Lancio" },
                    { year: "'25", label: "Crescita" },
                  ].map((item, i) => (
                    <div key={item.year} className="flex items-center gap-2">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                          <span className="text-xs font-bold text-primary">{item.year}</span>
                        </div>
                        <span className="text-[10px] text-muted-foreground mt-1">{item.label}</span>
                      </div>
                      {i < 2 && <div className="w-6 h-0.5 bg-gradient-to-r from-primary/50 to-accent/50 mb-4" />}
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* Accessibilità */}
              <GlassCard className="p-6" glowColor="primary">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">Accessibilità</h3>
                <p className="text-sm text-muted-foreground">Strumenti professionali senza costi proibitivi.</p>
              </GlassCard>

              {/* Tech Stack */}
              <GlassCard className="p-6" glowColor="rose">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-rose-500/60 flex items-center justify-center">
                    <Code className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground">Tech Stack</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {techStack.map((tech) => (
                    <span 
                      key={tech}
                      className="px-2 py-1 text-[10px] font-medium rounded-md bg-muted/50 text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </GlassCard>

              {/* Stats Row */}
              <GlassCard className="lg:col-span-4 p-6" glowColor="primary">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {stats.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                      <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </GlassCard>

            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <GlassCard className="p-8 md:p-10 text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-5">
                  <Rocket className="w-7 h-7 text-white" />
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                  Pronto a trasformare il tuo locale?
                </h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Unisciti a centinaia di locali che hanno già scelto Nestify.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link to="/demo">
                    <Button size="lg" className="gap-2 rounded-full">
                      <Coffee className="w-4 h-4" />
                      Prova la demo
                    </Button>
                  </Link>
                  <Link to="/contatti">
                    <Button variant="outline" size="lg" className="gap-2 rounded-full">
                      Contattaci
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
