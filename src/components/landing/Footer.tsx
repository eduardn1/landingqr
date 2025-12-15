/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * QRCODESTUDIOJEM - Footer Component (Enhanced Design)
 * 
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * Web Development & Digital Solutions
 * 
 * © 2024 StudioJEM - Tutti i diritti riservati
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { memo } from "react";
import { Link } from "react-router-dom";
import { 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  Shield, 
  Lock, 
  CheckCircle,
  Instagram,
  Facebook,
  Linkedin,
  MessageCircle,
  BookOpen,
  HelpCircle,
  Sparkles
} from "lucide-react";

const footerLinks = {
  prodotto: [
    { label: "Funzionalità", href: "#features" },
    { label: "Prezzi", href: "#pricing" },
    { label: "Demo Interattiva", href: "/demo", isRoute: true },
    { label: "Come funziona", href: "#howitworks" },
  ],
  risorse: [
    { label: "Centro Assistenza", href: "/faq", isRoute: true },
    { label: "Guide & Tutorial", href: "/faq", isRoute: true },
    { label: "FAQ", href: "/faq", isRoute: true },
  ],
  azienda: [
    { label: "Chi siamo", href: "#" },
    { label: "Contatti", href: "#" },
    { label: "Partner", href: "#" },
  ],
  legale: [
    { label: "Privacy Policy", href: "#" },
    { label: "Termini di Servizio", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: MessageCircle, href: "https://wa.me/393533811359", label: "WhatsApp" },
];

const badges = [
  { icon: Shield, label: "GDPR Compliant" },
  { icon: Lock, label: "SSL Sicuro" },
  { icon: CheckCircle, label: "Made in Italy" },
];

const Footer = memo(() => {
  return (
    <footer className="border-t border-border bg-muted/30 pb-24 lg:pb-8">
      {/* Main Footer */}
      <div className="container px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6 mb-12">
          {/* Brand Column - Spans 2 cols on lg */}
          <div className="col-span-2 space-y-5">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/25">
                <span className="text-white font-bold">F</span>
              </div>
              <span className="font-bold text-xl tracking-tight text-foreground">Flavour</span>
            </Link>
            
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              La piattaforma all-in-one per menu digitali, prenotazioni e ordini online per bar, ristoranti, pub e caffetterie.
            </p>
            
            {/* Contact Info */}
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

            {/* Social Links */}
            <div className="flex gap-2 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Prodotto */}
          <div>
            <h4 className="font-semibold mb-4 text-sm text-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              Prodotto
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.prodotto.map((link) => (
                <li key={link.label}>
                  {link.isRoute ? (
                    <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Risorse */}
          <div>
            <h4 className="font-semibold mb-4 text-sm text-foreground flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" />
              Risorse
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.risorse.map((link) => (
                <li key={link.label}>
                  {link.isRoute ? (
                    <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Azienda */}
          <div>
            <h4 className="font-semibold mb-4 text-sm text-foreground flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-primary" />
              Azienda
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.azienda.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legale */}
          <div>
            <h4 className="font-semibold mb-4 text-sm text-foreground flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              Legale
            </h4>
            <ul className="space-y-2.5">
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

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-8 py-6 border-y border-border">
          {badges.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border"
            >
              <badge.icon className="w-4 h-4 text-success" />
              <span className="text-xs font-medium text-foreground">{badge.label}</span>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs text-muted-foreground">
            <span>© {new Date().getFullYear()} Flavour. Tutti i diritti riservati.</span>
            <span className="hidden sm:inline">•</span>
            <span>P.IVA IT03883630927</span>
          </div>
          
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
});

Footer.displayName = 'Footer';

export default Footer;