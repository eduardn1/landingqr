/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * QRCODESTUDIOJEM - Cookie Consent Banner
 * 
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * Web Development & Digital Solutions
 * 
 * © 2024 StudioJEM - Tutti i diritti riservati
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { useState, useEffect, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, Settings, Check, ChevronDown, ChevronUp, Shield, BarChart3, Target, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

const COOKIE_CONSENT_KEY = "flavour_cookie_consent";
const COOKIE_PREFERENCES_KEY = "flavour_cookie_preferences";

const defaultPreferences: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  functional: false,
};

const cookieCategories = [
  {
    id: "necessary" as const,
    icon: Shield,
    title: "Cookie Necessari",
    description: "Essenziali per il funzionamento del sito. Non possono essere disattivati.",
    required: true,
  },
  {
    id: "analytics" as const,
    icon: BarChart3,
    title: "Cookie Analitici",
    description: "Ci aiutano a capire come viene utilizzato il sito per migliorarlo.",
    required: false,
  },
  {
    id: "marketing" as const,
    icon: Target,
    title: "Cookie di Marketing",
    description: "Utilizzati per mostrare annunci pertinenti ai tuoi interessi.",
    required: false,
  },
  {
    id: "functional" as const,
    icon: Globe,
    title: "Cookie Funzionali",
    description: "Permettono funzionalità avanzate come la personalizzazione.",
    required: false,
  },
];

const CookieBanner = memo(() => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    } else {
      const savedPrefs = localStorage.getItem(COOKIE_PREFERENCES_KEY);
      if (savedPrefs) {
        setPreferences(JSON.parse(savedPrefs));
      }
    }
  }, []);

  const saveConsent = useCallback((prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "true");
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(prefs));
    setPreferences(prefs);
    setIsVisible(false);
    
    // Here you would typically initialize/disable analytics based on preferences
    if (prefs.analytics) {
      // Initialize Google Analytics, etc.
      console.log("Analytics enabled");
    }
    if (prefs.marketing) {
      // Initialize marketing pixels
      console.log("Marketing enabled");
    }
  }, []);

  const acceptAll = useCallback(() => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    saveConsent(allAccepted);
  }, [saveConsent]);

  const acceptNecessary = useCallback(() => {
    saveConsent(defaultPreferences);
  }, [saveConsent]);

  const saveCustomPreferences = useCallback(() => {
    saveConsent(preferences);
  }, [preferences, saveConsent]);

  const togglePreference = useCallback((key: keyof CookiePreferences) => {
    if (key === "necessary") return;
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const openSettings = useCallback(() => {
    setIsVisible(true);
    setShowSettings(true);
  }, []);

  // Settings button (always visible after consent)
  const hasConsented = localStorage.getItem(COOKIE_CONSENT_KEY);

  return (
    <>
      {/* Settings Button - Shows after consent given */}
      {hasConsented && !isVisible && (
        <button
          onClick={openSettings}
          className="fixed bottom-4 left-4 z-50 w-10 h-10 rounded-full bg-card border border-border shadow-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all"
          aria-label="Impostazioni Cookie"
        >
          <Cookie className="w-5 h-5" />
        </button>
      )}

      {/* Cookie Banner */}
      <AnimatePresence>
        {isVisible && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
              onClick={() => !showSettings && setIsVisible(false)}
            />

            {/* Banner */}
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-[101] p-4 sm:p-6"
            >
              <div className="max-w-4xl mx-auto">
                <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
                  {/* Header */}
                  <div className="p-4 sm:p-6 border-b border-border">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <Cookie className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h2 className="text-lg font-bold text-foreground">Utilizziamo i Cookie</h2>
                          <p className="text-sm text-muted-foreground mt-1">
                            Per offrirti la migliore esperienza possibile, utilizziamo cookie e tecnologie simili.
                            {" "}
                            <Link to="/cookie-policy" className="text-primary hover:underline">
                              Scopri di più
                            </Link>
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setIsVisible(false)}
                        className="p-1.5 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Settings Panel */}
                  <AnimatePresence>
                    {showSettings && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-b border-border overflow-hidden"
                      >
                        <div className="p-4 sm:p-6 space-y-4 max-h-[40vh] overflow-y-auto">
                          {cookieCategories.map((category) => (
                            <div
                              key={category.id}
                              className="flex items-start justify-between gap-4 p-4 rounded-xl bg-muted/30 border border-border"
                            >
                              <div className="flex items-start gap-3">
                                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                  <category.icon className="w-4 h-4 text-primary" />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-semibold text-foreground text-sm">{category.title}</h3>
                                    {category.required && (
                                      <span className="px-2 py-0.5 rounded-full bg-muted text-[10px] font-medium text-muted-foreground">
                                        Obbligatorio
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs text-muted-foreground mt-0.5">{category.description}</p>
                                </div>
                              </div>
                              <Switch
                                checked={preferences[category.id]}
                                onCheckedChange={() => togglePreference(category.id)}
                                disabled={category.required}
                                className="shrink-0"
                              />
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Actions */}
                  <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setShowSettings(!showSettings)}
                      className="gap-2 order-3 sm:order-1"
                    >
                      <Settings className="w-4 h-4" />
                      {showSettings ? "Nascondi opzioni" : "Personalizza"}
                      {showSettings ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </Button>
                    
                    <div className="flex gap-3 flex-1 sm:justify-end order-1 sm:order-2">
                      {showSettings ? (
                        <Button onClick={saveCustomPreferences} className="flex-1 sm:flex-none gap-2">
                          <Check className="w-4 h-4" />
                          Salva preferenze
                        </Button>
                      ) : (
                        <>
                          <Button variant="outline" onClick={acceptNecessary} className="flex-1 sm:flex-none">
                            Solo necessari
                          </Button>
                          <Button onClick={acceptAll} className="flex-1 sm:flex-none gap-2">
                            <Check className="w-4 h-4" />
                            Accetta tutti
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
});

CookieBanner.displayName = 'CookieBanner';

export default CookieBanner;
