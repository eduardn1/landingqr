/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * QRCODESTUDIOJEM - Mobile Bottom Navigation
 * Navigazione mobile moderna con icone e animazioni
 * 
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * Web Development & Digital Solutions
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  Sparkles, 
  CreditCard, 
  MessageCircleQuestion,
  Play,
  X
} from "lucide-react";
import { useLeadForm } from "@/hooks/useLeadForm";

const navItems = [
  { id: "home", icon: Home, label: "Home", href: "#" },
  { id: "features", icon: Sparkles, label: "Funzionalità", href: "#features" },
  { id: "pricing", icon: CreditCard, label: "Prezzi", href: "#pricing" },
  { id: "demo", icon: Play, label: "Demo", href: "/demo" },
  { id: "faq", icon: MessageCircleQuestion, label: "FAQ", href: "#faq" },
];

const MobileNav = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { openLeadForm } = useLeadForm();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);

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
  }, [lastScrollY]);

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.href.startsWith("#")) {
      if (item.href === "#") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const element = document.querySelector(item.href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      window.location.href = item.href;
    }
    setActiveSection(item.id);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="lg:hidden fixed bottom-0 left-0 right-0 z-50 pb-safe"
        >
          <div className="mx-3 mb-3">
            <div className="bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl shadow-black/20 px-2 py-2">
              <div className="flex items-center justify-around">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item)}
                      className="relative flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all"
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-primary/10 rounded-xl"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <Icon 
                        className={`w-5 h-5 relative z-10 transition-colors ${
                          isActive ? "text-primary" : "text-muted-foreground"
                        }`} 
                      />
                      <span 
                        className={`text-[10px] font-medium relative z-10 transition-colors ${
                          isActive ? "text-primary" : "text-muted-foreground"
                        }`}
                      >
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default MobileNav;
