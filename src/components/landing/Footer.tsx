import { Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  prodotto: [
    { label: "Funzionalità", href: "#features" },
    { label: "Prezzi", href: "#pricing" },
    { label: "Demo", href: "https://demo2.studiojem.it" },
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
    <footer className="border-t border-white/[0.06] py-16">
      <div className="container">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2 space-y-6">
            <a href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">M</span>
              </div>
              <span className="font-semibold text-lg tracking-tight">MenuLink</span>
            </a>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              La piattaforma all-in-one per menu digitali, prenotazioni e ordini online.
            </p>
            <div className="space-y-2 text-sm">
              <a href="mailto:info@menulink.it" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="w-4 h-4" /> info@menulink.it
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
            <h4 className="font-medium mb-4 text-sm">Prodotto</h4>
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
            <h4 className="font-medium mb-4 text-sm">Azienda</h4>
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
            <h4 className="font-medium mb-4 text-sm">Legale</h4>
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

        <div className="pt-8 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} MenuLink by Studio JEM. Tutti i diritti riservati.
          </p>
          <p className="text-xs text-muted-foreground">Made with ❤️ in Sardegna</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
