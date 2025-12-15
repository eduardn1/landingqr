/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * QRCODESTUDIOJEM - Navigation Bar
 * 
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * Web Development & Digital Solutions
 * 
 * © 2024 StudioJEM - Tutti i diritti riservati
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Sparkles, CreditCard, HelpCircle, Play, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useLeadForm } from "@/hooks/useLeadForm";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { openLeadForm } = useLeadForm();

  useEffect(() => {
    setMounted(true);
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 80);
      
      // Close on any scroll movement
      if (Math.abs(currentScrollY - lastScrollY) > 10 && isExpanded) {
        setIsExpanded(false);
      }
      lastScrollY = currentScrollY;

      // Detect active section
      const sections = ["features", "pricing", "faq"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            return;
          }
        }
      }
      
      if (currentScrollY < 100) {
        setActiveSection("home");
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isExpanded]);

  const navLinks = [
    { id: "home", label: "Home", href: "#", icon: Home },
    { id: "features", label: "Funzionalità", href: "#features", icon: Sparkles },
    { id: "pricing", label: "Prezzi", href: "#pricing", icon: CreditCard },
    { id: "demo", label: "Demo", href: "/demo", icon: Play },
    { id: "faq", label: "FAQ", href: "#faq", icon: HelpCircle },
  ];

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleIslandClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      if (href === "#") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      window.location.href = href;
    }
    setIsExpanded(false);
  };

  return (
    <>
      {/* Dynamic Island Navigation */}
      <div
        className="fixed top-3 left-0 right-0 z-50 flex justify-center px-3"
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
      >
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          layout
          className="relative overflow-hidden rounded-full"
          style={{
            background: theme === 'dark' 
              ? 'linear-gradient(135deg, rgba(30,30,40,0.85) 0%, rgba(20,20,30,0.9) 100%)'
              : 'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(245,245,250,0.9) 100%)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            border: '1px solid',
            borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
            boxShadow: theme === 'dark'
              ? '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)'
              : '0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.8)',
          }}
        >
          {/* Liquid glass shine effect */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)',
              borderRadius: 'inherit',
            }}
          />

          {/* Notification Badge */}
          <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 animate-pulse shadow-lg shadow-rose-500/50 z-10" />

          {/* Main Content */}
          <div className="relative flex items-center gap-2 px-4 py-2.5 lg:px-5 lg:py-3">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-lg lg:rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md shadow-primary/30">
                <span className="text-white font-bold text-xs lg:text-sm">F</span>
              </div>
              <span className="font-bold text-sm lg:text-base tracking-tight text-foreground">Flavour</span>
            </a>

            <div className="w-px h-5 lg:h-6 bg-border/50 mx-1" />

            {/* Desktop: Always visible links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.href)}
                    className={`relative px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 outline-none
                      focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background
                      after:absolute after:left-1/2 after:-bottom-0.5 after:h-px after:w-0 after:-translate-x-1/2 after:bg-primary after:opacity-0
                      after:transition-all after:duration-300 after:ease-out hover:after:opacity-100 hover:after:w-[72%]
                      ${
                        isActive
                          ? 'text-primary after:opacity-100 after:w-[72%]'
                          : 'text-muted-foreground hover:text-foreground hover:bg-primary/5 hover:shadow-[0_0_24px_hsl(var(--primary)/0.18)]'
                      }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavPill"
                        className="absolute inset-0 bg-primary/10 rounded-full"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile: Active section indicator + expand */}
            <div 
              className="md:hidden flex items-center gap-2 cursor-pointer"
              onClick={handleIslandClick}
            >
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10">
                {(() => {
                  const activeLink = navLinks.find(l => l.id === activeSection);
                  const Icon = activeLink?.icon || Home;
                  return (
                    <>
                      <Icon className="w-3.5 h-3.5 text-primary" />
                      <span className="text-[11px] font-medium text-primary">{activeLink?.label || 'Home'}</span>
                    </>
                  );
                })()}
              </div>
              
              {/* Expand indicator */}
              <motion.div 
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center"
              >
                <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.div>
            </div>

            <div className="w-px h-5 lg:h-6 bg-border/50 mx-1" />

            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-1.5 lg:p-2 rounded-lg hover:bg-muted/50 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-4 h-4 lg:w-5 lg:h-5 text-primary" />
                )}
              </button>
            )}

            {/* CTA Button */}
            <Button 
              onClick={() => openLeadForm("dynamic_island")}
              size="sm"
              className="gradient-button rounded-full px-4 h-8 lg:h-9 text-xs lg:text-sm shadow-lg shadow-primary/25"
            >
              <span className="hidden sm:inline">Inizia gratis</span>
              <Sparkles className="w-4 h-4 sm:hidden" />
            </Button>
          </div>
        </motion.div>

        {/* Mobile Expanded Menu */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="md:hidden absolute top-full left-3 right-3 mt-2 rounded-2xl overflow-hidden"
              style={{
                background: theme === 'dark' 
                  ? 'linear-gradient(135deg, rgba(30,30,40,0.95) 0%, rgba(20,20,30,0.98) 100%)'
                  : 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(245,245,250,0.98) 100%)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid',
                borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
                boxShadow: theme === 'dark'
                  ? '0 8px 32px rgba(0,0,0,0.4)'
                  : '0 8px 32px rgba(0,0,0,0.12)',
              }}
            >
              <div className="p-3 grid grid-cols-5 gap-1">
                {navLinks.map((link) => {
                  const IconComponent = link.icon;
                  const isActive = activeSection === link.id;
                  
                  return (
                    <button
                      key={link.id}
                      onClick={() => handleNavClick(link.href)}
                      className={`relative flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                        isActive 
                          ? 'bg-primary/15' 
                          : 'hover:bg-muted/50'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeMobileTab"
                          className="absolute inset-0 bg-primary/10 rounded-xl"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <IconComponent className={`w-5 h-5 relative z-10 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span className={`text-[9px] font-medium relative z-10 ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                        {link.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Click outside to close mobile menu */}
      {isExpanded && (
        <div 
          className="md:hidden fixed inset-0 z-40" 
          onClick={() => setIsExpanded(false)}
        />
      )}
    </>
  );
};

export default Navbar;
