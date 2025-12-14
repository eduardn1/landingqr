/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * QRCODESTUDIOJEM - Footer Component
 * 
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * Web Development & Digital Solutions
 * 
 * © 2024 StudioJEM - Tutti i diritti riservati
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";

const footerLinks = {
  prodotto: [
    { label: "Funzionalità", href: "#features" },
    { label: "Prezzi", href: "#pricing" },
    { label: "Demo Interattiva", href: "/demo" },
  ],
  azienda: [
    { label: "Chi siamo", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Contatti", href: "#" },
  ],
  legale: [
    { label: "Privacy Policy", href: "#" },
    { label: "Termini di Servizio", href: "#" },
    { label: "GDPR", href: "#" },
  ],
};

const Footer = () => {
  return (
    <footer className="border-t border-border py-16 bg-muted/30">
      <div className="container">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2 space-y-6">
            <a href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/25">
                <span className="text-white font-bold text-base">F</span>
              </div>
              <span className="font-bold text-xl tracking-tight text-foreground">Flavour</span>
            </a>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              La piattaforma all-in-one per menu digitali, prenotazioni e ordini online. 
              Zero commissioni, 100% controllo.
            </p>
            <div className="space-y-2 text-sm">
              <a href="mailto:info@studiojem.it" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="w-4 h-4" /> info@studiojem.it
              </a>
              <a href="tel:+393533811359" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <Phone className="w-4 h-4" /> +39 353 381 1359
              </a>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" /> Cagliari, Italia
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm text-foreground">Prodotto</h4>
            <ul className="space-y-3">
              {footerLinks.prodotto.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm text-foreground">Azienda</h4>
            <ul className="space-y-3">
              {footerLinks.azienda.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm text-foreground">Legale</h4>
            <ul className="space-y-3">
              {footerLinks.legale.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Flavour. Tutti i diritti riservati.
          </p>
          <a 
            href="https://studiojem.it" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors group"
          >
            Sviluppato da <span className="font-semibold text-foreground group-hover:text-primary">Eduard Costin Udila</span> @ studiojem.it
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
