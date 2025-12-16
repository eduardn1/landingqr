/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * QRCODESTUDIOJEM - Bottom Navigation for Mobile
 * 
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * Web Development & Digital Solutions
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  ShoppingBag, 
  Calendar, 
  MoreHorizontal 
} from "lucide-react";

interface BottomNavProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  onOpenMenu: () => void;
}

const navItems = [
  { icon: LayoutDashboard, label: "Home", id: "dashboard" },
  { icon: UtensilsCrossed, label: "Menu", id: "menu" },
  { icon: ShoppingBag, label: "Ordini", id: "orders" },
  { icon: Calendar, label: "Prenota", id: "reservations" },
];

export const BottomNav = ({ activeSection, onNavigate, onOpenMenu }: BottomNavProps) => {
  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-xl border-t border-border safe-area-bottom"
    >
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="relative flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200"
            >
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary/10 rounded-xl"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              
              <motion.div
                animate={{ 
                  scale: isActive ? 1.1 : 1,
                  y: isActive ? -2 : 0
                }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className={`relative z-10 ${isActive ? "text-primary" : "text-muted-foreground"}`}
              >
                <Icon className="w-5 h-5" />
              </motion.div>
              
              <span className={`relative z-10 text-[10px] font-medium ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}>
                {item.label}
              </span>
              
              {/* Active dot */}
              {isActive && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 w-1 h-1 bg-primary rounded-full"
                />
              )}
            </button>
          );
        })}
        
        {/* More button */}
        <button
          onClick={onOpenMenu}
          className="flex flex-col items-center gap-1 px-3 py-2 text-muted-foreground"
        >
          <MoreHorizontal className="w-5 h-5" />
          <span className="text-[10px] font-medium">Altro</span>
        </button>
      </div>
    </motion.nav>
  );
};
