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
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Sparkles, CreditCard, HelpCircle, Play, Home, Grid3X3, X, BookOpen, MessageCircle, Users, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useLeadForm } from "@/hooks/useLeadForm";

// Static pages menu
const staticPages = [
  { label: "Chi siamo", href: "/chi-siamo", icon: Users },
  { label: "Contatti", href: "/contatti", icon: MessageCircle },
  { label: "Guide", href: "/guide", icon: BookOpen },
  { label: "FAQ", href: "/faq", icon: HelpCircle },
  { label: "Demo", href: "/demo", icon: Play },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPagesMenuOpen, setIsPagesMenuOpen] = useState(false);
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
  }, [isExpanded, isPagesMenuOpen]);

  // Close pages menu on scroll
  useEffect(() => {
    const handleScrollForPages = () => {
      if (isPagesMenuOpen) {
        setIsPagesMenuOpen(false);
      }
    };
    window.addEventListener("scroll", handleScrollForPages, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollForPages);
  }, [isPagesMenuOpen]);

  const navLinks = [
    { id: "home", label: "Home", href: "#", icon: Home },
    { id: "features", label: "Funzionalità", href: "#features", icon: Sparkles },
    { id: "pricing", label: "Prezzi", href: "#pricing", icon: CreditCard },
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
              ? 'linear-gradient(135deg, rgba(30,30,40,0.8) 0%, rgba(20,20,30,0.85) 100%)'
              : 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(240,240,250,0.7) 100%)',
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            border: '1px solid',
            borderColor: theme === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.6)',
            boxShadow: theme === 'dark'
              ? '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)'
              : '0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)',
          }}
        >
          {/* Liquid glass shine effect */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: theme === 'dark'
                ? 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.03) 100%)'
                : 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, transparent 40%, rgba(255,255,255,0.2) 100%)',
              borderRadius: 'inherit',
            }}
          />

          {/* Notification Badge */}
          <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 animate-pulse shadow-lg shadow-rose-500/50 z-10" />

          {/* Main Content */}
          <div className="relative flex items-center gap-2 px-3 py-2.5 lg:px-5 lg:py-3 max-w-full overflow-hidden">
            {/* Logo */}
            <a href="/" className="flex items-center gap-1.5 lg:gap-2 shrink-0">
              <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-lg lg:rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md shadow-primary/30">
                <span className="text-white font-bold text-[10px] lg:text-sm">F</span>
              </div>
              <span className="font-bold text-xs lg:text-base tracking-tight text-foreground">Flavour</span>
            </a>

            <div className="w-px h-4 lg:h-6 bg-border/50 mx-0.5 lg:mx-1 shrink-0" />

            {/* Desktop: Always visible links */}
            <div className="hidden lg:flex items-center gap-0.5 shrink-0">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.href)}
                    className={`relative px-2.5 py-1.5 rounded-full text-sm font-medium transition-all duration-300 outline-none whitespace-nowrap
                      focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background
                      ${
                        isActive
                          ? 'text-primary bg-primary/10'
                          : 'text-muted-foreground hover:text-foreground hover:bg-primary/5'
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

            {/* Mobile/Tablet: Active section indicator + expand */}
            <div 
              className="lg:hidden flex items-center gap-1.5 cursor-pointer shrink-0"
              onClick={handleIslandClick}
            >
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10">
                {(() => {
                  const activeLink = navLinks.find(l => l.id === activeSection);
                  const Icon = activeLink?.icon || Home;
                  return (
                    <>
                      <Icon className="w-3 h-3 text-primary" />
                      <span className="text-[10px] font-medium text-primary">{activeLink?.label || 'Home'}</span>
                    </>
                  );
                })()}
              </div>
              
              {/* Expand indicator */}
              <motion.div 
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center"
              >
                <svg className="w-2.5 h-2.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.div>
            </div>

            <div className="w-px h-4 lg:h-6 bg-border/50 mx-0.5 lg:mx-1 shrink-0" />

            {/* Pages Menu Button */}
            <div className="relative shrink-0">
              <button
                onClick={() => setIsPagesMenuOpen(!isPagesMenuOpen)}
                className={`p-1.5 lg:p-2 rounded-lg transition-colors ${isPagesMenuOpen ? 'bg-primary/10 text-primary' : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'}`}
                aria-label="Menu pagine"
              >
                {isPagesMenuOpen ? (
                  <X className="w-4 h-4 lg:w-5 lg:h-5" />
                ) : (
                  <Grid3X3 className="w-4 h-4 lg:w-5 lg:h-5" />
                )}
              </button>
            </div>

            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-1.5 lg:p-2 rounded-lg hover:bg-muted/50 transition-colors shrink-0"
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
              className="gradient-button rounded-full px-3 lg:px-4 h-7 lg:h-9 text-[10px] lg:text-sm shadow-md shadow-primary/20 shrink-0"
            >
              <span className="hidden sm:inline">Inizia gratis</span>
              <Sparkles className="w-3.5 h-3.5 sm:hidden" />
            </Button>
          </div>
        </motion.div>

        {/* Mobile/Tablet Expanded Menu */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden absolute top-full left-1/2 -translate-x-1/2 mt-2 rounded-2xl overflow-hidden w-[calc(100%-24px)] max-w-md"
              style={{
                background: theme === 'dark' 
                  ? 'linear-gradient(135deg, rgba(30,30,40,0.9) 0%, rgba(20,20,30,0.95) 100%)'
                  : 'linear-gradient(135deg, rgba(255,255,255,0.75) 0%, rgba(245,245,250,0.85) 100%)',
                backdropFilter: 'blur(24px) saturate(180%)',
                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                border: '1px solid',
                borderColor: theme === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.7)',
                boxShadow: theme === 'dark'
                  ? '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)'
                  : '0 8px 32px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.9)',
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

        {/* Pages Menu Dropdown */}
        <AnimatePresence>
          {isPagesMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-3 mt-2 rounded-2xl overflow-hidden min-w-[200px]"
              style={{
                background: theme === 'dark' 
                  ? 'linear-gradient(135deg, rgba(30,30,40,0.9) 0%, rgba(20,20,30,0.95) 100%)'
                  : 'linear-gradient(135deg, rgba(255,255,255,0.75) 0%, rgba(245,245,250,0.85) 100%)',
                backdropFilter: 'blur(24px) saturate(180%)',
                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                border: '1px solid',
                borderColor: theme === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.7)',
                boxShadow: theme === 'dark'
                  ? '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)'
                  : '0 8px 32px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.9)',
              }}
            >
              <div className="p-2">
                <div className="px-3 py-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Pagine
                </div>
                {staticPages.map((page) => {
                  const IconComponent = page.icon;
                  return (
                    <Link
                      key={page.href}
                      to={page.href}
                      onClick={() => setIsPagesMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-all"
                    >
                      <IconComponent className="w-4 h-4" />
                      <span>{page.label}</span>
                      <ExternalLink className="w-3 h-3 ml-auto text-muted-foreground" />
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Click outside to close menus */}
      {(isExpanded || isPagesMenuOpen) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setIsExpanded(false);
            setIsPagesMenuOpen(false);
          }}
        />
      )}
    </>
  );
};

export default Navbar;
