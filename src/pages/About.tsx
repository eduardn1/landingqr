/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * QRCODESTUDIOJEM - About Page (Chi Siamo)
 * Stile Cadence: glass cards, bordi luminosi, bento grid asimmetrico, tab navigation
 * 
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * Web Development & Digital Solutions
 * 
 * © 2024 StudioJEM - Tutti i diritti riservati
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

const techStack = [
  { name: "React", icon: Code },
  { name: "TypeScript", icon: Code },
  { name: "Tailwind CSS", icon: Palette },
  { name: "Supabase", icon: Shield },
  { name: "Framer Motion", icon: Sparkles },
  { name: "Vite", icon: Zap },
];

const stats = [
  { value: "500+", label: "Locali attivi", icon: Building },
  { value: "50K+", label: "Menu visualizzati", icon: TrendingUp },
  { value: "99.9%", label: "Uptime garantito", icon: Shield },
  { value: "4.9/5", label: "Rating clienti", icon: Award },
];

// Glass Card Component
const GlassCard = ({ 
  children, 
  className = "", 
  glowColor = "primary",
  hover = true 
}: { 
  children: React.ReactNode; 
  className?: string;
  glowColor?: "primary" | "accent" | "rose";
  hover?: boolean;
}) => {
  const glowColors = {
    primary: "hover:shadow-primary/20 hover:border-primary/40",
    accent: "hover:shadow-accent/20 hover:border-accent/40",
    rose: "hover:shadow-rose-500/20 hover:border-rose-500/40",
  };

  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ duration: 0.2 }}
      className={`
        relative overflow-hidden rounded-2xl
        bg-card/50 backdrop-blur-xl
        border border-border/50
        shadow-lg shadow-black/5
        ${hover ? glowColors[glowColor] : ""}
        transition-all duration-300
        ${className}
      `}
    >
      {/* Gradient border glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState("valori");

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <SharedNavbar />

      <main className="pt-16">
        {/* Hero Section - Glass Style */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          {/* Background gradient orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[100px]" />
          </div>
          
          <div className="container relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              {/* Badge */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 mb-6"
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Chi Siamo</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-foreground mb-6"
              >
                Dietro Flavour c'è una{" "}
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  passione italiana
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
              >
                Siamo un team di sviluppatori e designer che credono nel potere della tecnologia 
                per trasformare l'esperienza della ristorazione italiana.
              </motion.p>

              {/* Location Badge */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-border/50"
              >
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Cagliari, Sardegna</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">Made in Italy 🇮🇹</span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section - Glass Cards */}
        <section className="py-8 border-y border-border/50">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-4"
                >
                  <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                  <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tab Navigation Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              {/* Tab List - Glass Style */}
              <div className="flex justify-center mb-12">
                <TabsList className="bg-card/50 backdrop-blur-xl border border-border/50 p-1.5 rounded-full">
                  <TabsTrigger 
                    value="valori" 
                    className="rounded-full px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <Target className="w-4 h-4 mr-2" />
                    Valori
                  </TabsTrigger>
                  <TabsTrigger 
                    value="team" 
                    className="rounded-full px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Team
                  </TabsTrigger>
                  <TabsTrigger 
                    value="storia" 
                    className="rounded-full px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Storia
                  </TabsTrigger>
                  <TabsTrigger 
                    value="tech" 
                    className="rounded-full px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <Code className="w-4 h-4 mr-2" />
                    Tech
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Values Tab - Asymmetric Bento Grid */}
              <TabsContent value="valori" className="mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-5xl mx-auto"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[200px]">
                    {/* Large Card */}
                    <GlassCard className="md:col-span-2 lg:row-span-2 p-8 group" glowColor="primary">
                      <div className="h-full flex flex-col">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <Target className="w-7 h-7 text-primary-foreground" />
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-3">{values[0].title}</h3>
                        <p className="text-muted-foreground flex-1">{values[0].description}</p>
                        <div className="mt-4 flex items-center gap-2 text-primary text-sm font-medium">
                          <span>La nostra missione</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </GlassCard>

                    {/* Medium Cards */}
                    {values.slice(1).map((value, index) => {
                      const Icon = value.icon;
                      const glowColors: ("primary" | "accent" | "rose")[] = ["accent", "rose", "primary"];
                      return (
                        <GlassCard 
                          key={value.title} 
                          className="p-6 group" 
                          glowColor={glowColors[index]}
                        >
                          <div className="h-full flex flex-col">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
                              index === 0 ? "from-accent to-accent/50" :
                              index === 1 ? "from-rose-500 to-rose-500/50" :
                              "from-primary to-primary/50"
                            } flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-semibold text-lg text-foreground mb-2">{value.title}</h3>
                            <p className="text-sm text-muted-foreground flex-1">{value.description}</p>
                          </div>
                        </GlassCard>
                      );
                    })}
                  </div>
                </motion.div>
              </TabsContent>

              {/* Team Tab */}
              <TabsContent value="team" className="mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-5xl mx-auto"
                >
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-foreground mb-3">Le persone dietro Flavour</h2>
                    <p className="text-muted-foreground">Un team appassionato che lavora ogni giorno per te.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {teamMembers.map((member, index) => (
                      <GlassCard 
                        key={member.name} 
                        className="p-6 text-center group"
                        glowColor={index % 2 === 0 ? "primary" : "accent"}
                      >
                        <div className="relative w-20 h-20 mx-auto mb-4">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full rounded-full object-cover border-2 border-border group-hover:border-primary/50 transition-colors"
                          />
                          {/* Glow effect */}
                          <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-1">{member.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{member.role}</p>
                        <div className="flex justify-center gap-2">
                          <a 
                            href={member.socials.linkedin}
                            className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center hover:bg-primary/20 transition-colors"
                          >
                            <Linkedin className="w-4 h-4 text-muted-foreground" />
                          </a>
                          <a 
                            href={`mailto:${member.socials.email}`}
                            className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center hover:bg-primary/20 transition-colors"
                          >
                            <Mail className="w-4 h-4 text-muted-foreground" />
                          </a>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>

              {/* Storia Tab */}
              <TabsContent value="storia" className="mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-3xl mx-auto"
                >
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-foreground mb-3">La nostra storia</h2>
                    <p className="text-muted-foreground">Da un'idea a una piattaforma che trasforma l'hospitality.</p>
                  </div>
                  
                  <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-primary/20" />
                    
                    <div className="space-y-6">
                      {timeline.map((item, index) => (
                        <GlassCard 
                          key={item.year} 
                          className="ml-16 p-6 group"
                          glowColor={index === 0 ? "primary" : index === 1 ? "accent" : "rose"}
                        >
                          {/* Year badge */}
                          <div className="absolute -left-16 top-6 w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-primary/30">
                            {item.year.slice(2)}
                          </div>
                          
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-semibold text-primary">{item.year}</span>
                          </div>
                          <h3 className="font-semibold text-lg text-foreground mb-2">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </GlassCard>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </TabsContent>

              {/* Tech Tab - Bento Grid */}
              <TabsContent value="tech" className="mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-4xl mx-auto"
                >
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-foreground mb-3">Costruito con le migliori tecnologie</h2>
                    <p className="text-muted-foreground">Stack moderno e performante per un'esperienza impeccabile.</p>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {techStack.map((tech, index) => {
                      const Icon = tech.icon;
                      return (
                        <GlassCard 
                          key={tech.name} 
                          className="p-6 text-center group"
                          glowColor={index % 3 === 0 ? "primary" : index % 3 === 1 ? "accent" : "rose"}
                        >
                          <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                            <Icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
                          <span className="font-medium text-foreground">{tech.name}</span>
                        </GlassCard>
                      );
                    })}
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA Section - Glass Style */}
        <section className="py-16 md:py-24">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <GlassCard className="p-8 md:p-12 text-center" hover={false}>
                {/* Glow background */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-2xl" />
                
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/30">
                    <Rocket className="w-8 h-8 text-white" />
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    Pronto a trasformare il tuo locale?
                  </h2>
                  <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
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
                      <Button variant="outline" size="lg" className="gap-2 rounded-full bg-card/50 backdrop-blur-sm">
                        Contattaci
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
