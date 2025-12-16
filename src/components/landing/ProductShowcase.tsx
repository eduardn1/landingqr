/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * QRCODESTUDIOJEM - Product Showcase Section (Static/Compact)
 * 
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * Web Development & Digital Solutions
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { memo, useState, useCallback } from "react";
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
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

const showcaseItems = [
  {
    id: "mobile",
    device: "iPhone",
    icon: Smartphone,
    title: "Menu Mobile-First",
    description: "I clienti scansionano il QR e accedono al menu ottimizzato per smartphone.",
    badges: [
      { text: "QR Code", icon: QrCode, color: "from-emerald-500/70 to-teal-600/70" },
      { text: "Ordini", icon: ShoppingBag, color: "from-orange-500 to-red-500" },
    ],
    gradient: "from-emerald-500/20 to-teal-600/20",
    demoSection: "menu"
  },
  {
    id: "tablet",
    device: "iPad",
    icon: Tablet,
    title: "Dashboard Analytics",
    description: "Monitora vendite, ordini e performance in tempo reale.",
    badges: [
      { text: "Analytics", icon: BarChart3, color: "from-blue-500 to-cyan-500" },
      { text: "Report", icon: Calendar, color: "from-emerald-500 to-teal-600" },
    ],
    gradient: "from-blue-500/20 to-cyan-500/20",
    demoSection: "analytics"
  },
  {
    id: "desktop",
    device: "Desktop",
    icon: Monitor,
    title: "Gestione Completa",
    description: "Dashboard gestionale per menu, prenotazioni, clienti e staff.",
    badges: [
      { text: "Multi-sede", icon: Users, color: "from-pink-500 to-rose-500" },
      { text: "CRM", icon: Users, color: "from-amber-500 to-orange-500" },
    ],
    gradient: "from-pink-500/20 to-rose-500/20",
    demoSection: "orders"
  },
];

// Mobile Mockup with iframe and skeleton
const MobileMockup = memo(() => {
  const [loaded, setLoaded] = useState(false);
  const handleLoad = useCallback(() => setLoaded(true), []);
  
  return (
    <div className="relative w-full max-w-[240px] mx-auto">
      <div className="bg-card rounded-[2rem] p-1.5 border-4 border-muted shadow-xl">
        <div className="bg-background rounded-[1.75rem] overflow-hidden">
          <div className="flex justify-center py-1.5 bg-background">
            <div className="w-16 h-4 bg-muted rounded-full" />
          </div>
          <div className="relative h-[320px] overflow-hidden">
            {!loaded && <Skeleton className="absolute inset-0 rounded-none" />}
            <iframe
              src="/demo?skip=true&section=menu"
              className={`absolute top-0 left-0 w-[700px] h-[500px] origin-top-left pointer-events-none transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
              style={{ transform: 'scale(0.34)', transformOrigin: 'top left' }}
              title="Menu Preview"
              loading="lazy"
              onLoad={handleLoad}
            />
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
      <div className="absolute -inset-3 bg-gradient-to-br from-emerald-500/15 to-teal-600/10 rounded-[2.5rem] blur-xl -z-10" />
    </div>
  );
});
MobileMockup.displayName = 'MobileMockup';

// Tablet Mockup with iframe and skeleton
const TabletMockup = memo(() => {
  const [loaded, setLoaded] = useState(false);
  const handleLoad = useCallback(() => setLoaded(true), []);
  
  return (
    <div className="relative w-full max-w-[400px] mx-auto">
      <div className="bg-card rounded-[1.5rem] p-2 border-4 border-muted shadow-xl">
        <div className="bg-background rounded-[1.25rem] overflow-hidden">
          <div className="relative h-[260px] overflow-hidden">
            {!loaded && <Skeleton className="absolute inset-0 rounded-none" />}
            <iframe
              src="/demo?skip=true&section=analytics"
              className={`absolute top-0 left-0 w-[1000px] h-[700px] origin-top-left pointer-events-none transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
              style={{ transform: 'scale(0.4)', transformOrigin: 'top left' }}
              title="Analytics Preview"
              loading="lazy"
              onLoad={handleLoad}
            />
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-background to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
      <div className="absolute -inset-3 bg-gradient-to-br from-blue-500/12 to-cyan-500/8 rounded-[2rem] blur-xl -z-10" />
    </div>
  );
});
TabletMockup.displayName = 'TabletMockup';

// Desktop Mockup with iframe and skeleton
const DesktopMockup = memo(() => {
  const [loaded, setLoaded] = useState(false);
  const handleLoad = useCallback(() => setLoaded(true), []);
  
  return (
    <div className="relative w-full">
      <div className="bg-card rounded-lg border border-border shadow-xl overflow-hidden">
        <div className="flex items-center gap-1.5 px-3 py-2 bg-muted/50 border-b border-border">
          <div className="flex gap-1">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          </div>
          <div className="flex-1 mx-3">
            <div className="h-5 bg-background rounded flex items-center px-2">
              <span className="text-[10px] text-muted-foreground">app.nestify.io/ordini</span>
            </div>
          </div>
        </div>
        <div className="relative h-[280px] md:h-[320px] overflow-hidden bg-background">
          {!loaded && <Skeleton className="absolute inset-0 rounded-none" />}
          <iframe
            src="/demo?skip=true&section=orders"
            className={`absolute top-0 left-0 w-[1200px] h-[800px] origin-top-left pointer-events-none transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            style={{ transform: 'scale(0.45)', transformOrigin: 'top left' }}
            title="Orders Preview"
            loading="lazy"
            onLoad={handleLoad}
          />
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        </div>
      </div>
      <div className="absolute -inset-3 bg-gradient-to-br from-pink-500/8 to-rose-500/8 rounded-xl blur-xl -z-10" />
    </div>
  );
});
DesktopMockup.displayName = 'DesktopMockup';

const mockupComponents = {
  mobile: MobileMockup,
  tablet: TabletMockup,
  desktop: DesktopMockup,
};

const ProductShowcase = memo(() => {
  return (
    <section id="showcase" className="py-16 md:py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      {/* Static Orbs */}
      <div className="absolute top-20 left-[5%] w-[300px] h-[300px] bg-gradient-to-br from-emerald-500/8 to-teal-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-[5%] w-[350px] h-[350px] bg-gradient-to-br from-sky-500/6 to-cyan-500/4 rounded-full blur-3xl" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Multi-Device</span>
          </div>
          
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4 px-2">
            <span className="text-foreground">Un'esperienza </span>
            <span className="gradient-text">su ogni schermo</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto px-4">
            Dal menu mobile per i clienti alla dashboard gestionale per il tuo staff.
          </p>
        </div>

        {/* Device Showcase - Compact Layout */}
        <div className="space-y-12 md:space-y-16">
          {showcaseItems.map((item, index) => {
            const isEven = index % 2 === 0;
            const Icon = item.icon;
            
            return (
              <div
                key={item.id}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-6 lg:gap-12`}
              >
                {/* Device Mockup */}
                <div className="relative flex-1 w-full max-w-md lg:max-w-none">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-2xl blur-2xl opacity-50`} />
                  
                  <div className="relative">
                    {/* Badge on top */}
                    <div className={`absolute -top-3 ${isEven ? 'left-3' : 'right-3'} z-20`}>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border shadow-lg">
                        <Icon className="w-3.5 h-3.5 text-primary" />
                        <span className="text-xs font-semibold text-foreground">{item.device}</span>
                      </div>
                    </div>

                    {/* Device Mockup Component */}
                    <div className={`relative ${
                      item.id === 'mobile' ? 'max-w-[240px] mx-auto' : 
                      item.id === 'tablet' ? 'max-w-[400px] mx-auto' : ''
                    }`}>
                      {(() => {
                        const MockupComponent = mockupComponents[item.id as keyof typeof mockupComponents];
                        return MockupComponent ? <MockupComponent /> : null;
                      })()}
                    </div>

                    {/* Floating feature badges */}
                    <div className={`absolute ${isEven ? '-right-2 md:-right-6' : '-left-2 md:-left-6'} top-1/2 -translate-y-1/2 space-y-2`}>
                      {item.badges.map((badge) => {
                        const BadgeIcon = badge.icon;
                        return (
                          <div
                            key={badge.text}
                            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-card/90 backdrop-blur-sm border border-border shadow-md"
                          >
                            <div className={`w-5 h-5 rounded bg-gradient-to-br ${badge.color} flex items-center justify-center`}>
                              <BadgeIcon className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-[10px] font-medium text-foreground">{badge.text}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center lg:text-left">
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${item.gradient} border border-border/50 mb-4`}>
                    <Icon className="w-3.5 h-3.5 text-foreground" />
                    <span className="text-xs font-medium text-foreground">{item.device}</span>
                  </div>

                  <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-3">
                    {item.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed mb-4 max-w-md mx-auto lg:mx-0">
                    {item.description}
                  </p>

                  {/* Feature list */}
                  <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                    {item.badges.map((badge) => {
                      const BadgeIcon = badge.icon;
                      return (
                        <div 
                          key={badge.text}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted border border-border text-xs"
                        >
                          <BadgeIcon className="w-3.5 h-3.5 text-primary" />
                          <span className="text-foreground">{badge.text}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link to="/demo">
            <Button size="lg" className="gradient-button group">
              <Sparkles className="w-4 h-4 mr-2" />
              Esplora la demo
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
});

ProductShowcase.displayName = 'ProductShowcase';

export default ProductShowcase;