/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * QRCODESTUDIOJEM - Shared Navbar for Internal Pages
 * Dynamic Island navigation per tutte le pagine interne
 * 
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * Web Development & Digital Solutions
 * 
 * © 2024 StudioJEM - Tutti i diritti riservati
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Home, BookOpen, MessageCircle, HelpCircle, Users, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const navLinks = [
  { id: "home", label: "Home", href: "/", icon: Home },
  { id: "demo", label: "Demo", href: "/demo", icon: Play },
  { id: "guide", label: "Guide", href: "/guide", icon: BookOpen },
  { id: "chi-siamo", label: "Chi siamo", href: "/chi-siamo", icon: Users },
  { id: "contatti", label: "Contatti", href: "/contatti", icon: MessageCircle },
  { id: "faq", label: "FAQ", href: "/faq", icon: HelpCircle },
];

const SharedNavbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (isExpanded) {
        setIsExpanded(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isExpanded]);

  const handleIslandClick = () => {
    setIsExpanded(!isExpanded);
  };

  const getCurrentPage = () => {
    const currentPath = location.pathname;
    return navLinks.find(link => link.href === currentPath) || navLinks[0];
  };

  const currentPage = getCurrentPage();

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
          className="relative overflow-hidden rounded-full bg-card/80 backdrop-blur-xl border border-foreground-10 shadow-lg"
        >
          {/* Glass shine effect */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-foreground-05 via-transparent to-foreground-05 rounded-full" />

          {/* Main Content */}
          <div className="relative flex items-center gap-2 px-4 py-2.5 lg:px-5 lg:py-3">
            {/* Logo - Monochrome */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-lg lg:rounded-xl bg-foreground flex items-center justify-center">
                <span className="text-background font-bold text-xs lg:text-sm">F</span>
              </div>
              <span className="font-bold text-sm lg:text-base tracking-tight text-foreground">Flavour</span>
            </Link>

            <div className="w-px h-5 lg:h-6 bg-foreground-10 mx-1" />

            {/* Desktop: Navigation links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.slice(0, 5).map((link) => {
                const isActive = location.pathname === link.href;
                
                return (
                  <Link
                    key={link.id}
                    to={link.href}
                    className={`relative px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 outline-none ${
                      isActive
                        ? 'text-foreground bg-foreground-10'
                        : 'text-foreground-50 hover:text-foreground hover:bg-foreground-05'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavPillShared"
                        className="absolute inset-0 bg-foreground-10 rounded-full"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Mobile: Current page indicator + expand */}
            <div 
              className="md:hidden flex items-center gap-2 cursor-pointer"
              onClick={handleIslandClick}
            >
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-foreground-10">
                <currentPage.icon className="w-3.5 h-3.5 text-foreground" />
                <span className="text-[11px] font-medium text-foreground">{currentPage.label}</span>
              </div>
              
              {/* Expand indicator */}
              <motion.div 
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="w-5 h-5 rounded-full bg-foreground-10 flex items-center justify-center"
              >
                <svg className="w-3 h-3 text-foreground-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.div>
            </div>

            <div className="w-px h-5 lg:h-6 bg-foreground-10 mx-1" />

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* CTA Button */}
            <Link to="/demo">
              <Button 
                size="sm"
                className="rounded-full px-4 h-8 lg:h-9 text-xs lg:text-sm"
              >
                <span className="hidden sm:inline">Prova demo</span>
                <Sparkles className="w-4 h-4 sm:hidden" />
              </Button>
            </Link>
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
              className="md:hidden absolute top-full left-3 right-3 mt-2 rounded-2xl overflow-hidden bg-card/95 backdrop-blur-xl border border-foreground-10 shadow-xl"
            >
              <div className="p-3 grid grid-cols-6 gap-1">
                {navLinks.map((link) => {
                  const IconComponent = link.icon;
                  const isActive = location.pathname === link.href;
                  
                  return (
                    <Link
                      key={link.id}
                      to={link.href}
                      onClick={() => setIsExpanded(false)}
                      className={`relative flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                        isActive 
                          ? 'bg-foreground-10' 
                          : 'hover:bg-foreground-05'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeMobileTabShared"
                          className="absolute inset-0 bg-foreground-10 rounded-xl"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <IconComponent className={`w-5 h-5 relative z-10 ${isActive ? 'text-foreground' : 'text-foreground-50'}`} />
                      <span className={`text-[9px] font-medium relative z-10 ${isActive ? 'text-foreground' : 'text-foreground-50'}`}>
                        {link.label}
                      </span>
                    </Link>
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

export default SharedNavbar;
