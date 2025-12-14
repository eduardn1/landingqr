/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * QRCODESTUDIOJEM - Product Showcase Section
 * Device mockups generici con icone e gradienti
 * 
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * Web Development & Digital Solutions
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, memo } from "react";
import { 
  Smartphone, 
  Monitor, 
  Tablet,
  QrCode,
  ShoppingBag,
  BarChart3,
  Calendar,
  Users,
  Sparkles,
  ArrowRight,
  Menu,
  CreditCard,
  TrendingUp,
  Bell,
  Settings,
  Star,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const showcaseItems = [
  {
    id: "mobile",
    device: "iPhone",
    icon: Smartphone,
    title: "Menu Mobile-First",
    description: "I clienti scansionano il QR e accedono al menu ottimizzato per smartphone. Ordini, pagamenti e recensioni in un tap.",
    badges: [
      { text: "QR Code", icon: QrCode, color: "from-violet-500 to-purple-600" },
      { text: "Ordini", icon: ShoppingBag, color: "from-orange-500 to-red-500" },
    ],
    gradient: "from-violet-500/20 to-purple-600/20",
    position: "left"
  },
  {
    id: "tablet",
    device: "iPad",
    icon: Tablet,
    title: "Dashboard Analytics",
    description: "Monitora vendite, ordini e performance in tempo reale. Grafici interattivi, report automatici, KPI personalizzabili.",
    badges: [
      { text: "Analytics", icon: BarChart3, color: "from-blue-500 to-cyan-500" },
      { text: "Report", icon: Calendar, color: "from-emerald-500 to-teal-600" },
    ],
    gradient: "from-blue-500/20 to-cyan-500/20",
    position: "right"
  },
  {
    id: "desktop",
    device: "Desktop",
    icon: Monitor,
    title: "Gestione Completa",
    description: "Dashboard gestionale per menu, prenotazioni, clienti e staff. Multi-sede, multi-utente, tutto da browser.",
    badges: [
      { text: "Multi-sede", icon: Users, color: "from-pink-500 to-rose-500" },
      { text: "CRM", icon: Users, color: "from-amber-500 to-orange-500" },
    ],
    gradient: "from-pink-500/20 to-rose-500/20",
    position: "center"
  },
];

// Generic Mobile Mockup Component
const MobileMockup = memo(() => (
  <div className="relative w-full max-w-[280px] mx-auto">
    <div className="bg-card rounded-[2.5rem] p-2 border-4 border-muted shadow-2xl">
      <div className="bg-background rounded-[2rem] overflow-hidden">
        {/* Notch */}
        <div className="flex justify-center py-2">
          <div className="w-20 h-5 bg-muted rounded-full" />
        </div>
        
        {/* Content */}
        <div className="px-4 pb-6 space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <QrCode className="w-4 h-4 text-white" />
              </div>
              <div className="h-3 w-16 bg-foreground/60 rounded" />
            </div>
            <Menu className="w-5 h-5 text-muted-foreground" />
          </div>

          {/* Menu Items */}
          {[
            { color: "from-orange-400 to-red-500", price: "€12" },
            { color: "from-green-400 to-emerald-500", price: "€8" },
            { color: "from-blue-400 to-indigo-500", price: "€15" },
            { color: "from-pink-400 to-rose-500", price: "€10" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 p-2.5 bg-muted/50 rounded-xl"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                <Sparkles className="w-5 h-5 text-white/80" />
              </div>
              <div className="flex-1 space-y-1.5">
                <div className="h-2.5 w-20 bg-foreground/60 rounded" />
                <div className="h-2 w-14 bg-muted-foreground/40 rounded" />
              </div>
              <span className="text-sm font-bold text-success">{item.price}</span>
            </motion.div>
          ))}

          {/* CTA */}
          <div className="h-10 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center gap-2 mt-4">
            <CreditCard className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white">Ordina ora</span>
          </div>
        </div>
      </div>
    </div>
  </div>
));
MobileMockup.displayName = 'MobileMockup';

// Generic Tablet Mockup Component
const TabletMockup = memo(() => (
  <div className="relative w-full max-w-[500px] mx-auto">
    <div className="bg-card rounded-[2rem] p-3 border-4 border-muted shadow-2xl">
      <div className="bg-background rounded-[1.5rem] overflow-hidden">
        {/* Content */}
        <div className="p-4 md:p-6">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-white" />
              </div>
              <div className="h-3 w-20 bg-foreground/60 rounded" />
            </div>
            <div className="flex gap-2">
              <div className="w-6 h-6 rounded bg-muted flex items-center justify-center">
                <Bell className="w-3 h-3 text-muted-foreground" />
              </div>
              <div className="w-6 h-6 rounded bg-muted flex items-center justify-center">
                <Settings className="w-3 h-3 text-muted-foreground" />
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { icon: TrendingUp, value: "€2.4k", label: "Oggi", color: "from-emerald-500 to-teal-600" },
              { icon: ShoppingBag, value: "127", label: "Ordini", color: "from-violet-500 to-purple-600" },
              { icon: Users, value: "89", label: "Clienti", color: "from-blue-500 to-cyan-500" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                viewport={{ once: true }}
                className="bg-muted/50 rounded-xl p-3"
              >
                <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-2`}>
                  <stat.icon className="w-3 h-3 text-white" />
                </div>
                <p className="text-lg font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Chart Placeholder */}
          <div className="bg-muted/30 rounded-xl p-4 h-32 flex items-end gap-1">
            {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 80].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                whileInView={{ height: `${h}%` }}
                transition={{ delay: 0.5 + i * 0.05, duration: 0.4 }}
                viewport={{ once: true }}
                className="flex-1 bg-gradient-to-t from-primary to-primary/50 rounded-t"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
));
TabletMockup.displayName = 'TabletMockup';

// Generic Desktop Mockup Component
const DesktopMockup = memo(() => (
  <div className="relative w-full">
    <div className="bg-card rounded-xl border border-border shadow-2xl overflow-hidden">
      {/* Browser Chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <div className="flex-1 mx-4">
          <div className="h-6 bg-background rounded-md flex items-center px-3">
            <div className="h-2 w-32 bg-muted-foreground/30 rounded" />
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="p-4 md:p-6 bg-background">
        {/* Sidebar + Main */}
        <div className="flex gap-4">
          {/* Sidebar */}
          <div className="hidden md:block w-48 space-y-2">
            {[
              { icon: BarChart3, label: "Dashboard", active: true },
              { icon: Menu, label: "Menu" },
              { icon: ShoppingBag, label: "Ordini" },
              { icon: Calendar, label: "Prenotazioni" },
              { icon: Users, label: "Clienti" },
              { icon: Settings, label: "Impostazioni" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                viewport={{ once: true }}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg ${item.active ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted/50'}`}
              >
                <item.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-4">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { icon: TrendingUp, value: "€8.2k", label: "Ricavi Mensili", color: "from-emerald-500 to-teal-600", change: "+12%" },
                { icon: ShoppingBag, value: "847", label: "Ordini Totali", color: "from-violet-500 to-purple-600", change: "+8%" },
                { icon: Users, value: "234", label: "Clienti Attivi", color: "from-blue-500 to-cyan-500", change: "+15%" },
                { icon: Star, value: "4.9", label: "Rating Medio", color: "from-amber-500 to-orange-500", change: "+0.2" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-muted/30 rounded-xl p-3 border border-border"
                >
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-2`}>
                    <stat.icon className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <span className="text-xs text-success">{stat.change}</span>
                </motion.div>
              ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-muted/30 rounded-xl p-4 border border-border">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-foreground text-sm">Ordini Recenti</h4>
                <Clock className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                {[
                  { id: "#1234", status: "In preparazione", amount: "€24.50" },
                  { id: "#1233", status: "Consegnato", amount: "€18.00" },
                  { id: "#1232", status: "In consegna", amount: "€32.00" },
                ].map((order, i) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center">
                        <ShoppingBag className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-foreground">{order.id}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{order.status}</span>
                    <span className="text-sm font-semibold text-foreground">{order.amount}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
));
DesktopMockup.displayName = 'DesktopMockup';

const mockupComponents = {
  mobile: MobileMockup,
  tablet: TabletMockup,
  desktop: DesktopMockup,
};

const ProductShowcase = memo(() => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [-5, 5]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [5, -5]);

  return (
    <section ref={containerRef} id="showcase" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      <div className="absolute inset-0 grid-pattern opacity-[0.03]" />
      
      {/* Floating Orbs - reduced blur for better performance */}
      <div className="absolute top-20 left-[5%] w-[400px] h-[400px] bg-gradient-to-br from-violet-500/10 to-purple-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-[5%] w-[500px] h-[500px] bg-gradient-to-br from-blue-500/8 to-cyan-500/5 rounded-full blur-3xl" />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Multi-Device</span>
          </motion.div>
          
          <h2 className="font-display text-display-sm sm:text-display-md md:text-display-lg font-bold mb-4 md:mb-6 px-2">
            <span className="text-foreground">Un'esperienza </span>
            <span className="gradient-text">su ogni schermo</span>
          </h2>
          <p className="text-body-md sm:text-body-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Dal menu mobile per i clienti alla dashboard gestionale per il tuo staff.
            Ogni interfaccia è ottimizzata per il suo dispositivo.
          </p>
        </motion.div>

        {/* Device Showcase - Mobile-first Alternating Layout */}
        <div className="space-y-16 sm:space-y-24 md:space-y-32">
          {showcaseItems.map((item, index) => {
            const isEven = index % 2 === 0;
            const Icon = item.icon;
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, margin: "-100px" }}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 sm:gap-10 lg:gap-16 xl:gap-20`}
              >
                {/* Device Mockup - Mobile optimized */}
                <motion.div 
                  style={{ 
                    y: index === 0 ? y1 : y2,
                    rotate: index === 0 ? rotate1 : rotate2
                  }}
                  className="relative flex-1 w-full max-w-lg lg:max-w-none"
                >
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-3xl blur-3xl opacity-60`} />
                  
                  {/* Device Frame */}
                  <div className="relative">
                    {/* Badge on top */}
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      viewport={{ once: true }}
                      className={`absolute -top-4 ${isEven ? 'left-4' : 'right-4'} z-20`}
                    >
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border shadow-xl">
                        <Icon className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-foreground">{item.device}</span>
                      </div>
                    </motion.div>

                    {/* Device Mockup Component */}
                    <div className={`relative ${
                      item.id === 'mobile' ? 'max-w-[280px] mx-auto' : 
                      item.id === 'tablet' ? 'max-w-[500px] mx-auto' : ''
                    }`}>
                      {(() => {
                        const MockupComponent = mockupComponents[item.id as keyof typeof mockupComponents];
                        return MockupComponent ? <MockupComponent /> : null;
                      })()}
                    </div>

                    {/* Floating feature badges */}
                    <div className={`absolute ${isEven ? '-right-4 md:-right-8' : '-left-4 md:-left-8'} top-1/2 -translate-y-1/2 space-y-3`}>
                      {item.badges.map((badge, i) => {
                        const BadgeIcon = badge.icon;
                        return (
                          <motion.div
                            key={badge.text}
                            initial={{ opacity: 0, x: isEven ? 20 : -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + i * 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-2 px-3 py-2 rounded-full bg-card/90 backdrop-blur-sm border border-border shadow-lg"
                          >
                            <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${badge.color} flex items-center justify-center`}>
                              <BadgeIcon className="w-3.5 h-3.5 text-white" />
                            </div>
                            <span className="text-xs font-medium text-foreground">{badge.text}</span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>

                {/* Content */}
                <div className="flex-1 text-center lg:text-left">
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    {/* Device icon badge */}
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${item.gradient} border border-border/50 mb-6`}>
                      <Icon className="w-4 h-4 text-foreground" />
                      <span className="text-sm font-medium text-foreground">{item.device}</span>
                    </div>

                    <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                      {item.title}
                    </h3>
                    
                    <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">
                      {item.description}
                    </p>

                    {/* Feature list */}
                    <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                      {item.badges.map((badge) => {
                        const BadgeIcon = badge.icon;
                        return (
                          <div 
                            key={badge.text}
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border text-sm"
                          >
                            <BadgeIcon className="w-4 h-4 text-primary" />
                            <span className="text-foreground">{badge.text}</span>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-24"
        >
          <Link to="/demo">
            <Button size="lg" className="gradient-button group">
              <Sparkles className="w-4 h-4 mr-2" />
              <span>Esplora la demo completa</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
});

ProductShowcase.displayName = 'ProductShowcase';

export default ProductShowcase;
