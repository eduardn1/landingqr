/**
 * Theme Toggle Component
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 */

import { Moon, Sun, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

const nextTheme = (current?: string) => {
  const order = ["colorful", "dark", "light"] as const;
  const idx = Math.max(0, order.indexOf((current as any) ?? "colorful"));
  return order[(idx + 1) % order.length];
};

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(nextTheme(theme))}
      className="relative p-2 rounded-xl bg-muted hover:bg-muted/80 transition-colors overflow-hidden"
      title="Cambia tema (Light / Dark / Colorful)"
    >
      <div className="relative w-5 h-5">
        <motion.div
          initial={false}
          animate={{
            scale: theme === "dark" ? 1 : 0,
            rotate: theme === "dark" ? 0 : 90,
            opacity: theme === "dark" ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Moon className="w-5 h-5 text-foreground" />
        </motion.div>

        <motion.div
          initial={false}
          animate={{
            scale: theme === "light" ? 1 : 0,
            rotate: theme === "light" ? 0 : -90,
            opacity: theme === "light" ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sun className="w-5 h-5 text-foreground" />
        </motion.div>

        <motion.div
          initial={false}
          animate={{
            scale: theme === "colorful" ? 1 : 0,
            rotate: theme === "colorful" ? 0 : 90,
            opacity: theme === "colorful" ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sparkles className="w-5 h-5 text-foreground" />
        </motion.div>
      </div>
    </motion.button>
  );
};

