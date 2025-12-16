/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * NESTIFY - Cookie Policy Page
 * 
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * Web Development & Digital Solutions
 * 
 * © 2024 StudioJEM - Tutti i diritti riservati
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { memo } from "react";
import { Link } from "react-router-dom";
import SharedNavbar from "@/components/shared/SharedNavbar";
import Footer from "@/components/landing/Footer";
import DynamicSEO from "@/components/DynamicSEO";
import { Cookie, Settings, BarChart3, Target, Shield, Clock, Globe, AlertCircle } from "lucide-react";

const cookieTypes = [
  {
    id: "tecnici",
    icon: Settings,
    title: "Cookie Tecnici (Necessari)",
    required: true,
    description: "Essenziali per il funzionamento del sito. Non possono essere disattivati.",
    cookies: [
      { name: "session_id", purpose: "Gestione della sessione utente", duration: "Sessione", provider: "Nestify" },
      { name: "csrf_token", purpose: "Protezione da attacchi CSRF", duration: "Sessione", provider: "Nestify" },
      { name: "cookie_consent", purpose: "Memorizza le preferenze cookie", duration: "12 mesi", provider: "Nestify" },
      { name: "theme", purpose: "Preferenza tema chiaro/scuro", duration: "12 mesi", provider: "Nestify" },
    ]
  },
  {
    id: "analytics",
    icon: BarChart3,
    title: "Cookie Analitici",
    required: false,
    description: "Ci aiutano a capire come i visitatori interagiscono con il sito.",
    cookies: [
      { name: "_ga", purpose: "Distingue gli utenti (Google Analytics)", duration: "24 mesi", provider: "Google" },
      { name: "_ga_*", purpose: "Mantiene lo stato della sessione", duration: "24 mesi", provider: "Google" },
      { name: "_gid", purpose: "Distingue gli utenti", duration: "24 ore", provider: "Google" },
    ]
  },
  {
    id: "marketing",
    icon: Target,
    title: "Cookie di Marketing",
    required: false,
    description: "Utilizzati per tracciare i visitatori e mostrare annunci pertinenti.",
    cookies: [
      { name: "_fbp", purpose: "Tracciamento pubblicitario Facebook", duration: "3 mesi", provider: "Meta" },
      { name: "_gcl_au", purpose: "Conversioni Google Ads", duration: "3 mesi", provider: "Google" },
    ]
  },
  {
    id: "funzionali",
    icon: Globe,
    title: "Cookie Funzionali",
    required: false,
    description: "Permettono funzionalità avanzate e personalizzazione.",
    cookies: [
      { name: "lang", purpose: "Memorizza la preferenza lingua", duration: "12 mesi", provider: "Nestify" },
      { name: "recent_searches", purpose: "Cronologia ricerche recenti", duration: "30 giorni", provider: "Nestify" },
    ]
  }
];

const CookiePolicy = memo(() => {
  return (
    <div className="min-h-screen bg-background">
      <DynamicSEO />
      <SharedNavbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <div 
          className="absolute inset-0 opacity-[0.015]" 
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
          }} 
        />
        
        <div className="container px-4 sm:px-6 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Cookie className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Trasparenza</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Cookie Policy
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Informazioni complete sui cookie utilizzati su questo sito e come gestire le tue preferenze.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16">
        <div className="container px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            {/* Intro */}
            <div className="mb-12 p-6 rounded-2xl bg-card border border-border">
              <h2 className="text-xl font-bold text-foreground mb-4">Cosa sono i Cookie?</h2>
              <p className="text-muted-foreground mb-4">
                I cookie sono piccoli file di testo che vengono salvati sul tuo dispositivo quando visiti un sito web. 
                Servono a memorizzare informazioni utili per migliorare la tua esperienza di navigazione, come le preferenze 
                di lingua o lo stato di accesso.
              </p>
              <p className="text-muted-foreground">
                Alcuni cookie sono essenziali per il funzionamento del sito, mentre altri ci aiutano a migliorare 
                i nostri servizi analizzando come viene utilizzato il sito. Puoi gestire le tue preferenze in qualsiasi momento.
              </p>
            </div>

            {/* Cookie Types */}
            <div className="space-y-8 mb-12">
              {cookieTypes.map((type) => (
                <div key={type.id} id={type.id} className="rounded-2xl bg-card border border-border overflow-hidden">
                  <div className="p-6 border-b border-border">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <type.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-bold text-foreground">{type.title}</h3>
                            {type.required && (
                              <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                                Obbligatori
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{type.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Cookie Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-muted/30">
                        <tr>
                          <th className="px-6 py-3 text-left font-semibold text-foreground">Nome</th>
                          <th className="px-6 py-3 text-left font-semibold text-foreground">Finalità</th>
                          <th className="px-6 py-3 text-left font-semibold text-foreground">Durata</th>
                          <th className="px-6 py-3 text-left font-semibold text-foreground">Provider</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {type.cookies.map((cookie) => (
                          <tr key={cookie.name} className="hover:bg-muted/20 transition-colors">
                            <td className="px-6 py-3 font-mono text-xs text-primary">{cookie.name}</td>
                            <td className="px-6 py-3 text-muted-foreground">{cookie.purpose}</td>
                            <td className="px-6 py-3 text-muted-foreground">{cookie.duration}</td>
                            <td className="px-6 py-3 text-muted-foreground">{cookie.provider}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>

            {/* How to Manage */}
            <div className="mb-12 p-6 rounded-2xl bg-card border border-border">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Settings className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-foreground pt-1">Come Gestire i Cookie</h2>
              </div>
              
              <div className="pl-14 space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Tramite il nostro banner:</strong> Puoi modificare le tue preferenze 
                  in qualsiasi momento cliccando sull'icona delle impostazioni cookie presente in basso a sinistra su ogni pagina.
                </p>
                
                <p>
                  <strong className="text-foreground">Tramite il browser:</strong> Puoi anche gestire i cookie direttamente 
                  dal tuo browser. Ecco le guide per i principali browser:
                </p>
                
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Chrome</a></li>
                  <li><a href="https://support.mozilla.org/it/kb/protezione-antitracciamento-avanzata-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Mozilla Firefox</a></li>
                  <li><a href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Safari</a></li>
                  <li><a href="https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Microsoft Edge</a></li>
                </ul>

                <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                  <p className="text-sm">
                    <strong className="text-foreground">Attenzione:</strong> Disabilitare i cookie tecnici potrebbe 
                    compromettere il corretto funzionamento del sito e impedire l'accesso ad alcune funzionalità.
                  </p>
                </div>
              </div>
            </div>

            {/* Updates */}
            <div className="mb-12 p-6 rounded-2xl bg-card border border-border">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-foreground pt-1">Aggiornamenti</h2>
              </div>
              
              <p className="pl-14 text-muted-foreground">
                Questa Cookie Policy può essere aggiornata periodicamente. L'ultima modifica è stata effettuata il{" "}
                <strong className="text-foreground">
                  {new Date().toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}
                </strong>. 
                Ti invitiamo a consultare questa pagina regolarmente per essere informato su eventuali modifiche.
              </p>
            </div>

            {/* Related Links */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/privacy"
                className="flex-1 p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors group"
              >
                <Shield className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">Privacy Policy</h3>
                <p className="text-sm text-muted-foreground">Scopri come trattiamo i tuoi dati personali</p>
              </Link>
              
              <Link
                to="/termini-servizio"
                className="flex-1 p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors group"
              >
                <Settings className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">Termini di Servizio</h3>
                <p className="text-sm text-muted-foreground">Leggi le condizioni d'uso della piattaforma</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
});

CookiePolicy.displayName = 'CookiePolicy';

export default CookiePolicy;
