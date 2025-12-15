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
import { Sun, Moon, Sparkles, CreditCard, HelpCircle, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useLeadForm } from "@/hooks/useLeadForm";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { openLeadForm } = useLeadForm();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const scrolled = window.scrollY > 80;
      setIsScrolled(scrolled);
      // Auto-expand when scrolled
      if (scrolled && !isExpanded) {
        setIsExpanded(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isExpanded]);

  const navLinks = [
    { label: "Funzionalità", href: "#features", icon: Sparkles },
    { label: "Prezzi", href: "#pricing", icon: CreditCard },
    { label: "Demo", href: "/demo", icon: Play },
    { label: "FAQ", href: "#faq", icon: HelpCircle },
  ];

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleIslandClick = () => {
    if (!isScrolled) return;
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`hidden lg:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/25">
              <span className="text-white font-bold text-base">F</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-foreground">Flavour</span>
          </a>

          {/* Desktop Navigation */}
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA + Theme Toggle */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl bg-muted/50 hover:bg-muted border border-border transition-all duration-300 group"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  {theme === "dark" ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="w-4 h-4 text-yellow-500" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon className="w-4 h-4 text-primary" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            )}
            
            <a
              href="https://demo2.studiojem.it"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                Demo
              </Button>
            </a>
            <Button size="sm" className="gradient-button rounded-full px-5">
              Inizia gratis
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile "Dynamic Island" Header */}
      <div
        className="lg:hidden fixed top-3 left-0 right-0 z-50 flex justify-center px-3"
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
      >
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          layout
          onClick={handleIslandClick}
          className={`overflow-hidden transition-all duration-300 ${
            isExpanded 
              ? "bg-card/95 backdrop-blur-xl border border-border shadow-xl shadow-black/15 rounded-2xl w-full max-w-sm" 
              : "bg-card/90 backdrop-blur-lg border border-border/50 rounded-full"
          }`}
        >
          {/* Compact State */}
          <motion.div 
            layout
            className={`flex items-center justify-center gap-3 px-4 py-2 ${isExpanded ? 'border-b border-border' : ''}`}
          >
            {/* Logo */}
            <a href="/" className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-white font-bold text-xs">F</span>
              </div>
              <span className="font-bold text-sm tracking-tight text-foreground">Flavour</span>
            </a>

            <div className="w-px h-5 bg-border" />

            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleTheme();
                }}
                className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4 text-yellow-500" />
                ) : (
                  <Moon className="w-4 h-4 text-primary" />
                )}
              </button>
            )}

            {/* Expand indicator */}
            <AnimatePresence>
              {isScrolled && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="flex items-center"
                >
                  <motion.div 
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center"
                  >
                    <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Expanded Navigation */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="p-3 grid grid-cols-4 gap-2">
                  {navLinks.map((link) => {
                    const IconComponent = link.icon;
                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={(e) => e.stopPropagation()}
                        className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-muted/50 transition-colors"
                      >
                        <IconComponent className="w-5 h-5 text-primary" />
                        <span className="text-[10px] font-medium text-muted-foreground">{link.label}</span>
                      </a>
                    );
                  })}
                </div>
                
                {/* CTA Button */}
                <div className="px-3 pb-3">
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      openLeadForm("mobile_island");
                    }}
                    className="w-full gradient-button rounded-xl h-10 text-sm"
                  >
                    Inizia gratis
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
};

export default Navbar;
