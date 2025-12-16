/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * NESTIFY - Product Showcase Section (Static Images)
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

// Import static mockup images
import mockupMobile from "@/assets/mockup-mobile.png";
import mockupTablet from "@/assets/mockup-tablet.png";
import mockupDesktop from "@/assets/mockup-desktop.png";

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
    image: mockupMobile
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
    image: mockupTablet
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
    image: mockupDesktop
  },
];

// Static Image Mockup Component
const MockupImage = memo(({ 
  src, 
  alt, 
  type 
}: { 
  src: string; 
  alt: string; 
  type: 'mobile' | 'tablet' | 'desktop';
}) => {
  const [loaded, setLoaded] = useState(false);
  const handleLoad = useCallback(() => setLoaded(true), []);

  const containerStyles = {
    mobile: "w-full max-w-[260px] mx-auto",
    tablet: "w-full max-w-[420px] mx-auto",
    desktop: "w-full"
  };

  const glowStyles = {
    mobile: "from-emerald-500/15 to-teal-600/10",
    tablet: "from-blue-500/12 to-cyan-500/8",
    desktop: "from-pink-500/8 to-rose-500/8"
  };

  return (
    <div className={`relative ${containerStyles[type]}`}>
      <div className="relative rounded-xl overflow-hidden shadow-2xl border border-border/50">
        <div 
          className={`absolute inset-0 bg-muted/50 transition-opacity duration-300 ${loaded ? 'opacity-0' : 'opacity-100'}`} 
        />
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={handleLoad}
          className={`w-full h-auto transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>
      <div className={`absolute -inset-4 bg-gradient-to-br ${glowStyles[type]} rounded-2xl blur-2xl -z-10`} />
    </div>
  );
});
MockupImage.displayName = 'MockupImage';

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

                    {/* Static Image Mockup */}
                    <MockupImage 
                      src={item.image} 
                      alt={item.title}
                      type={item.id as 'mobile' | 'tablet' | 'desktop'}
                    />

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