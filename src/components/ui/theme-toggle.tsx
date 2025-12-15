/**
 * Theme Toggle Component - Cycles through light, dark, colorful
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 */

import { Sun, Moon, Palette } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeMode, type ThemeMode } from "@/hooks/useThemeMode";

interface ThemeToggleProps {
  className?: string;
  size?: "sm" | "md";
}

const icons: Record<ThemeMode, React.ReactNode> = {
  light: <Sun className="w-4 h-4 lg:w-5 lg:h-5" />,
  dark: <Moon className="w-4 h-4 lg:w-5 lg:h-5" />,
  colorful: <Palette className="w-4 h-4 lg:w-5 lg:h-5" />,
};

const labels: Record<ThemeMode, string> = {
  light: "Tema chiaro",
  dark: "Tema scuro", 
  colorful: "Tema colorato",
};

export function ThemeToggle({ className = "", size = "md" }: ThemeToggleProps) {
  const { mode, cycleMode, mounted } = useThemeMode();

  if (!mounted) {
    return (
      <div className={`p-1.5 lg:p-2 rounded-lg ${className}`}>
        <div className="w-4 h-4 lg:w-5 lg:h-5" />
      </div>
    );
  }

  return (
    <motion.button
      onClick={cycleMode}
      className={`relative p-1.5 lg:p-2 rounded-lg hover:bg-foreground-05 transition-colors ${className}`}
      title={labels[mode]}
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ scale: 0.8, opacity: 0, rotate: -90 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0.8, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.15 }}
          className={`${mode === "colorful" ? "text-accent-color" : "text-foreground-60"}`}
        >
          {icons[mode]}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}

export default ThemeToggle;
