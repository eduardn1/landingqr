/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * QRCODESTUDIOJEM - Navigation Bar (Monochrome + Glass Effect)
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CreditCard, HelpCircle, Play, Home, Grid3X3, X, BookOpen, MessageCircle, Users, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useLeadForm } from "@/hooks/useLeadForm";

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
  const { openLeadForm } = useLeadForm();

  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 80);
      
      if (Math.abs(currentScrollY - lastScrollY) > 10 && isExpanded) {
        setIsExpanded(false);
      }
      lastScrollY = currentScrollY;

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

  useEffect(() => {
    const handleScrollForPages = () => {
      if (isPagesMenuOpen) setIsPagesMenuOpen(false);
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

  const handleIslandClick = () => setIsExpanded(!isExpanded);

  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      if (href === "#") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.location.href = href;
    }
    setIsExpanded(false);
  };

  return (
    <>
      <div className="fixed top-3 left-0 right-0 z-50 flex justify-center px-3" style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}>
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          layout
          className="relative overflow-hidden rounded-full bg-card/80 backdrop-blur-xl border border-foreground-10 shadow-lg"
        >
          {/* Glass shine effect */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-foreground-05 via-transparent to-foreground-05 rounded-full" />

          {/* Notification Badge - Colored */}
          <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-accent-color animate-pulse shadow-lg z-10" />

          <div className="relative flex items-center gap-2 px-3 py-2.5 lg:px-5 lg:py-3 max-w-full overflow-hidden">
            {/* Logo - Monochrome primary (black/white) */}
            <a href="/" className="flex items-center gap-1.5 lg:gap-2 shrink-0">
              <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-lg lg:rounded-xl bg-foreground flex items-center justify-center">
                <span className="text-background font-bold text-[10px] lg:text-sm">F</span>
              </div>
              <span className="font-bold text-xs lg:text-base tracking-tight text-foreground">Flavour</span>
            </a>

            <div className="w-px h-4 lg:h-6 bg-foreground-10 mx-0.5 lg:mx-1 shrink-0" />

            {/* Desktop: Links - Monochrome */}
            <div className="hidden lg:flex items-center gap-0.5 shrink-0">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.href)}
                    className={`relative px-2.5 py-1.5 rounded-full text-sm font-medium transition-all duration-300 outline-none whitespace-nowrap ${
                      isActive ? 'text-foreground bg-foreground-10' : 'text-foreground-50 hover:text-foreground hover:bg-foreground-05'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavPill"
                        className="absolute inset-0 bg-foreground-10 rounded-full"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile: Active section indicator - Monochrome */}
            <div className="lg:hidden flex items-center gap-1.5 cursor-pointer shrink-0" onClick={handleIslandClick}>
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-foreground-10">
                {(() => {
                  const activeLink = navLinks.find(l => l.id === activeSection);
                  const Icon = activeLink?.icon || Home;
                  return (
                    <>
                      <Icon className="w-3 h-3 text-foreground" />
                      <span className="text-[10px] font-medium text-foreground">{activeLink?.label || 'Home'}</span>
                    </>
                  );
                })()}
              </div>
              <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} className="w-4 h-4 rounded-full bg-foreground-10 flex items-center justify-center">
                <svg className="w-2.5 h-2.5 text-foreground-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.div>
            </div>

            <div className="w-px h-4 lg:h-6 bg-foreground-10 mx-0.5 lg:mx-1 shrink-0" />

            {/* Pages Menu - Monochrome */}
            <div className="relative shrink-0">
              <button
                onClick={() => setIsPagesMenuOpen(!isPagesMenuOpen)}
                className={`p-1.5 lg:p-2 rounded-lg transition-colors ${isPagesMenuOpen ? 'bg-foreground-10 text-foreground' : 'hover:bg-foreground-05 text-foreground-50 hover:text-foreground'}`}
              >
                {isPagesMenuOpen ? <X className="w-4 h-4 lg:w-5 lg:h-5" /> : <Grid3X3 className="w-4 h-4 lg:w-5 lg:h-5" />}
              </button>
            </div>

            {/* Theme Toggle - Cycles light/dark/colorful */}
            <ThemeToggle />

            {/* CTA - Primary monochrome */}
            <Button onClick={() => openLeadForm("dynamic_island")} size="sm" className="rounded-full px-3 lg:px-4 h-7 lg:h-9 text-[10px] lg:text-sm shrink-0">
              <span className="hidden sm:inline">Inizia gratis</span>
              <Sparkles className="w-3.5 h-3.5 sm:hidden" />
            </Button>
          </div>
        </motion.div>

        {/* Mobile Expanded Menu - Glass effect */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="lg:hidden absolute top-full left-1/2 -translate-x-1/2 mt-2 rounded-2xl overflow-hidden w-[calc(100%-24px)] max-w-md bg-card/95 backdrop-blur-xl border border-foreground-10 shadow-xl"
            >
              <div className="p-3 grid grid-cols-5 gap-1">
                {navLinks.map((link) => {
                  const IconComponent = link.icon;
                  const isActive = activeSection === link.id;
                  return (
                    <button
                      key={link.id}
                      onClick={() => handleNavClick(link.href)}
                      className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${isActive ? 'bg-foreground-10' : 'hover:bg-foreground-05'}`}
                    >
                      <IconComponent className={`w-5 h-5 ${isActive ? 'text-foreground' : 'text-foreground-50'}`} />
                      <span className={`text-[9px] font-medium ${isActive ? 'text-foreground' : 'text-foreground-50'}`}>{link.label}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pages Menu Dropdown - Glass effect */}
        <AnimatePresence>
          {isPagesMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute top-full left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-3 mt-2 rounded-2xl overflow-hidden min-w-[200px] bg-card/95 backdrop-blur-xl border border-foreground-10 shadow-xl z-50"
            >
              <div className="p-2">
                <div className="px-3 py-1.5 text-[10px] font-semibold text-foreground-50 uppercase tracking-wider">Pagine</div>
                {staticPages.map((page) => {
                  const IconComponent = page.icon;
                  return (
                    <Link
                      key={page.href}
                      to={page.href}
                      onClick={() => setIsPagesMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-foreground hover:bg-foreground-05 transition-all"
                    >
                      <IconComponent className="w-4 h-4 text-foreground-50" />
                      <span>{page.label}</span>
                      <ExternalLink className="w-3 h-3 ml-auto text-foreground-30" />
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Click outside to close */}
      {(isExpanded || isPagesMenuOpen) && (
        <div className="fixed inset-0 z-40" onClick={() => { setIsExpanded(false); setIsPagesMenuOpen(false); }} />
      )}
    </>
  );
};

export default Navbar;