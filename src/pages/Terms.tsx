/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * QRCODESTUDIOJEM - Terms of Service Page
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
import { FileText, UserCheck, CreditCard, Shield, AlertTriangle, Scale, Mail, Clock, Ban, RefreshCw } from "lucide-react";

const sections = [
  {
    id: "accettazione",
    icon: UserCheck,
    title: "1. Accettazione dei Termini",
    content: `Utilizzando la piattaforma Flavour ("Servizio"), accetti di essere vincolato dai presenti Termini di Servizio ("Termini"). Se non accetti questi Termini, non potrai utilizzare il Servizio.

Il Servizio è fornito da **StudioJEM di Eduard Costin Udila**, con sede in Cagliari, Italia, P.IVA IT03883630927 ("Fornitore", "noi", "nostro").

Ci riserviamo il diritto di modificare questi Termini in qualsiasi momento. Le modifiche entreranno in vigore al momento della pubblicazione sul sito. L'uso continuato del Servizio dopo la pubblicazione delle modifiche costituisce accettazione dei nuovi Termini.`
  },
  {
    id: "descrizione",
    icon: FileText,
    title: "2. Descrizione del Servizio",
    content: `Flavour è una piattaforma SaaS (Software as a Service) che offre:

- Menu digitali accessibili tramite QR code
- Sistema di prenotazioni online
- Gestione ordini per asporto e delivery
- Programmi fedeltà e promozioni
- Analytics e reportistica
- Integrazioni con servizi terzi

Il Servizio è destinato a bar, ristoranti, pub, caffetterie e attività di ristorazione in generale. L'utilizzo per scopi diversi non è consentito senza autorizzazione scritta.`
  },
  {
    id: "account",
    icon: UserCheck,
    title: "3. Account e Registrazione",
    content: `Per utilizzare il Servizio è necessario creare un account. Al momento della registrazione, ti impegni a:

- Fornire informazioni accurate, complete e aggiornate
- Mantenere la sicurezza delle credenziali di accesso
- Non condividere l'account con terzi non autorizzati
- Notificarci immediatamente in caso di uso non autorizzato

Sei responsabile di tutte le attività svolte tramite il tuo account. Ci riserviamo il diritto di sospendere o terminare account che violano questi Termini o che risultano inattivi per più di 12 mesi.`
  },
  {
    id: "pagamenti",
    icon: CreditCard,
    title: "4. Pagamenti e Fatturazione",
    content: `**Piani e Prezzi:**
I prezzi sono indicati sul sito e possono essere soggetti a variazioni. Eventuali modifiche saranno comunicate con almeno 30 giorni di anticipo.

**Fatturazione:**
- La fatturazione avviene mensilmente o annualmente, in base al piano scelto
- I pagamenti sono dovuti in anticipo
- Accettiamo carte di credito/debito e bonifico bancario

**Rimborsi:**
- Piano mensile: nessun rimborso per il mese in corso
- Piano annuale: rimborso pro-rata per i mesi non utilizzati, solo entro i primi 30 giorni
- Periodi di prova gratuiti non richiedono pagamento se annullati prima della scadenza

**Mancato Pagamento:**
In caso di mancato pagamento, ci riserviamo il diritto di sospendere il servizio dopo 7 giorni di ritardo e di terminarlo dopo 30 giorni.`
  },
  {
    id: "uso-accettabile",
    icon: Shield,
    title: "5. Uso Accettabile",
    content: `Utilizzando il Servizio, ti impegni a NON:

- Violare leggi o regolamenti applicabili
- Pubblicare contenuti illegali, offensivi, diffamatori o fraudolenti
- Caricare malware, virus o codice dannoso
- Tentare di accedere a sistemi o dati non autorizzati
- Interferire con il funzionamento del Servizio
- Effettuare reverse engineering del software
- Rivendere o sublicenziare il Servizio senza autorizzazione
- Utilizzare il Servizio per spam o comunicazioni non richieste

Ci riserviamo il diritto di rimuovere contenuti che violano questi Termini e di sospendere o terminare account in caso di violazioni gravi o ripetute.`
  },
  {
    id: "proprieta-intellettuale",
    icon: Scale,
    title: "6. Proprietà Intellettuale",
    content: `**Nostra Proprietà:**
Il Servizio, inclusi software, design, loghi, testi e ogni altro materiale, è di nostra proprietà o dei nostri licenzianti ed è protetto dalle leggi sul diritto d'autore e sulla proprietà intellettuale.

**Tua Proprietà:**
Mantieni tutti i diritti sui contenuti che carichi sulla piattaforma (menu, immagini, testi). Ci concedi una licenza limitata per utilizzare tali contenuti esclusivamente per fornire il Servizio.

**Feedback:**
Eventuali suggerimenti o feedback forniti possono essere utilizzati liberamente per migliorare il Servizio senza alcun obbligo di compenso.`
  },
  {
    id: "limitazioni",
    icon: AlertTriangle,
    title: "7. Limitazioni di Responsabilità",
    content: `**Esclusione di Garanzie:**
Il Servizio è fornito "così com'è" senza garanzie di alcun tipo, espresse o implicite, incluse garanzie di commerciabilità o idoneità per uno scopo particolare.

**Limitazione di Responsabilità:**
In nessun caso saremo responsabili per danni indiretti, incidentali, speciali o consequenziali, inclusi perdita di profitti, dati o opportunità commerciali.

La nostra responsabilità totale non supererà l'importo pagato per il Servizio nei 12 mesi precedenti l'evento che ha causato il danno.

**Eccezioni:**
Queste limitazioni non si applicano in caso di dolo, colpa grave o nei casi in cui la legge non consente tali limitazioni.`
  },
  {
    id: "risoluzione",
    icon: Ban,
    title: "8. Risoluzione",
    content: `**Da Parte Tua:**
Puoi annullare il tuo account in qualsiasi momento dalle impostazioni o contattandoci. L'annullamento sarà effettivo alla fine del periodo di fatturazione corrente.

**Da Parte Nostra:**
Possiamo sospendere o terminare il tuo account:
- Per violazione di questi Termini
- Per mancato pagamento
- Per motivi di sicurezza o legali
- Per cessazione del Servizio (con preavviso di 90 giorni)

**Conseguenze:**
Alla risoluzione, perderai l'accesso al Servizio. I tuoi dati saranno conservati per 30 giorni, durante i quali potrai richiederne l'esportazione. Successivamente, saranno eliminati in conformità alla nostra Privacy Policy.`
  },
  {
    id: "modifiche",
    icon: RefreshCw,
    title: "9. Modifiche al Servizio",
    content: `Ci riserviamo il diritto di:

- Modificare o interrompere funzionalità del Servizio
- Aggiornare l'interfaccia e l'esperienza utente
- Introdurre nuove funzionalità o servizi
- Modificare i prezzi con preavviso di 30 giorni

In caso di modifiche significative che impattano negativamente il Servizio, ti daremo la possibilità di recedere senza penali entro 30 giorni dalla notifica.`
  },
  {
    id: "legge-applicabile",
    icon: Scale,
    title: "10. Legge Applicabile e Foro Competente",
    content: `Questi Termini sono regolati dalla legge italiana.

Per qualsiasi controversia derivante da o relativa a questi Termini o al Servizio:
- Le parti cercheranno prima una risoluzione amichevole
- In caso di mancato accordo, sarà competente il Foro di Cagliari

Per i consumatori si applicano le norme del Codice del Consumo (D.Lgs. 206/2005) e il foro del consumatore.

**Ultimo aggiornamento:** ${new Date().toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}`
  }
];

const Terms = memo(() => {
  return (
    <div className="min-h-screen bg-background">
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
              <FileText className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Documento Legale</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Termini di Servizio
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Condizioni generali di utilizzo della piattaforma Flavour. Leggi attentamente prima di utilizzare il servizio.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16">
        <div className="container px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            {/* Quick Navigation */}
            <div className="mb-12 p-6 rounded-2xl bg-card border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">Indice</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                  >
                    <section.icon className="w-4 h-4 text-primary" />
                    {section.title.replace(/^\d+\.\s/, '')}
                  </a>
                ))}
              </div>
            </div>

            {/* Sections */}
            <div className="space-y-12">
              {sections.map((section) => (
                <div key={section.id} id={section.id} className="scroll-mt-24">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <section.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground pt-1">
                      {section.title}
                    </h2>
                  </div>
                  <div className="pl-14 prose prose-sm prose-neutral dark:prose-invert max-w-none">
                    {section.content.split('\n\n').map((paragraph, idx) => (
                      <p key={idx} className="text-muted-foreground whitespace-pre-line">
                        {paragraph.split('**').map((part, i) => 
                          i % 2 === 1 ? <strong key={i} className="text-foreground font-semibold">{part}</strong> : part
                        )}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact CTA */}
            <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10 text-center">
              <Mail className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">Hai domande sui Termini?</h3>
              <p className="text-muted-foreground mb-6">
                Contattaci per qualsiasi chiarimento sui termini di servizio.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="mailto:legale@studiojem.it"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  legale@studiojem.it
                </a>
                <Link
                  to="/contatti"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-card border border-border text-foreground font-medium hover:bg-muted/50 transition-colors"
                >
                  Contattaci
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
});

Terms.displayName = 'Terms';

export default Terms;
