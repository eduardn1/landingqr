/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * NESTIFY - Shared Navbar for Internal Pages
 * Digital tools for Hospitality
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
import { Sun, Moon, Sparkles, Home, MessageCircle, HelpCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useLeadForm } from "@/hooks/useLeadForm";
import logoShort from "@/assets/logo-short.svg";

const navLinks = [
  { id: "home", label: "Home", href: "/", icon: Home },
  { id: "chi-siamo", label: "Chi siamo", href: "/chi-siamo", icon: Users },
  { id: "contatti", label: "Contatti", href: "/contatti", icon: MessageCircle },
  { id: "faq", label: "FAQ", href: "/faq", icon: HelpCircle },
];

const SharedNavbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const location = useLocation();
  const { openLeadForm } = useLeadForm();

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      if (isExpanded) {
        setIsExpanded(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isExpanded]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

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

          {/* Main Content */}
          <div className="relative flex items-center gap-2 px-4 py-2.5 lg:px-5 lg:py-3">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img src={logoShort} alt="Nestify" className="w-7 h-7 lg:w-8 lg:h-8" />
              <span className="font-bold text-sm lg:text-base tracking-tight text-foreground">Nestify</span>
            </Link>

            <div className="w-px h-5 lg:h-6 bg-border/50 mx-1" />

            {/* Desktop: Navigation links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                
                return (
                  <Link
                    key={link.id}
                    to={link.href}
                    className={`relative px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 outline-none
                      ${
                        isActive
                          ? 'text-primary bg-primary/10'
                          : 'text-muted-foreground hover:text-foreground hover:bg-primary/5'
                      }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavPillShared"
                        className="absolute inset-0 bg-primary/10 rounded-full"
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
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10">
                <currentPage.icon className="w-3.5 h-3.5 text-primary" />
                <span className="text-[11px] font-medium text-primary">{currentPage.label}</span>
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
              onClick={() => openLeadForm("shared_navbar")}
              size="sm"
              className="gradient-button rounded-full px-4 h-8 lg:h-9 text-xs lg:text-sm shadow-md shadow-primary/20"
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
              <div className="p-3 grid grid-cols-4 gap-1">
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
                          ? 'bg-primary/15' 
                          : 'hover:bg-muted/50'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeMobileTabShared"
                          className="absolute inset-0 bg-primary/10 rounded-xl"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <IconComponent className={`w-5 h-5 relative z-10 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span className={`text-[9px] font-medium relative z-10 ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
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