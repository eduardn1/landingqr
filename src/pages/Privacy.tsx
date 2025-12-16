/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * NESTIFY - Privacy Policy Page
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
import { Shield, Mail, Calendar, FileText, Lock, Eye, Database, Globe, UserCheck, AlertCircle } from "lucide-react";

const sections = [
  {
    id: "titolare",
    icon: UserCheck,
    title: "1. Titolare del Trattamento",
    content: `Il Titolare del trattamento dei dati personali è:

**StudioJEM di Eduard Costin Udila**
- Sede legale: Cagliari, Italia
- P.IVA: IT03883630927
- Email: info@studiojem.it
- Telefono: +39 353 381 1359

Per qualsiasi richiesta relativa al trattamento dei tuoi dati personali, puoi contattarci agli indirizzi sopra indicati.`
  },
  {
    id: "dati-raccolti",
    icon: Database,
    title: "2. Dati Personali Raccolti",
    content: `Raccogliamo le seguenti categorie di dati personali:

**Dati forniti volontariamente:**
- Nome e cognome
- Indirizzo email
- Numero di telefono
- Nome del ristorante/attività
- Messaggi e richieste di contatto

**Dati raccolti automaticamente:**
- Indirizzo IP
- Tipo di browser e dispositivo
- Sistema operativo
- Pagine visitate e tempo di permanenza
- Dati di navigazione (tramite cookie)

**Dati di terze parti:**
Non raccogliamo dati da fonti terze senza il tuo consenso esplicito.`
  },
  {
    id: "finalita",
    icon: Eye,
    title: "3. Finalità del Trattamento",
    content: `I tuoi dati personali sono trattati per le seguenti finalità:

**a) Erogazione del servizio:**
- Gestione dell'account e accesso alla piattaforma
- Fornitura dei servizi richiesti
- Supporto tecnico e assistenza clienti

**b) Comunicazioni:**
- Risposta alle richieste di contatto
- Invio di comunicazioni di servizio
- Newsletter e aggiornamenti (previo consenso)

**c) Miglioramento del servizio:**
- Analisi statistiche anonime
- Ottimizzazione della piattaforma
- Personalizzazione dell'esperienza utente

**d) Obblighi legali:**
- Adempimenti fiscali e contabili
- Risposta a richieste delle autorità competenti`
  },
  {
    id: "base-giuridica",
    icon: FileText,
    title: "4. Base Giuridica del Trattamento",
    content: `Il trattamento dei tuoi dati si basa su:

- **Consenso:** Per l'invio di comunicazioni marketing e newsletter
- **Esecuzione contrattuale:** Per la fornitura dei servizi richiesti
- **Interesse legittimo:** Per migliorare i nostri servizi e la sicurezza
- **Obbligo legale:** Per adempiere agli obblighi di legge

Puoi revocare il consenso in qualsiasi momento contattandoci o utilizzando i link di disiscrizione presenti nelle nostre comunicazioni.`
  },
  {
    id: "conservazione",
    icon: Calendar,
    title: "5. Periodo di Conservazione",
    content: `I tuoi dati personali sono conservati per il tempo strettamente necessario:

- **Dati contrattuali:** 10 anni dalla cessazione del rapporto (obblighi fiscali)
- **Dati di contatto:** 24 mesi dall'ultima interazione
- **Dati marketing:** Fino alla revoca del consenso
- **Dati di navigazione:** 14 mesi (cookie analytics)
- **Log di sicurezza:** 6 mesi

Al termine del periodo di conservazione, i dati vengono cancellati o anonimizzati in modo irreversibile.`
  },
  {
    id: "diritti",
    icon: Shield,
    title: "6. I Tuoi Diritti",
    content: `In conformità al GDPR, hai i seguenti diritti:

- **Accesso:** Ottenere conferma del trattamento e copia dei dati
- **Rettifica:** Correggere dati inesatti o incompleti
- **Cancellazione:** Richiedere l'eliminazione dei dati ("diritto all'oblio")
- **Limitazione:** Limitare il trattamento in determinati casi
- **Portabilità:** Ricevere i dati in formato strutturato
- **Opposizione:** Opporti al trattamento per motivi legittimi
- **Revoca del consenso:** Revocare il consenso in qualsiasi momento

Per esercitare questi diritti, contattaci a: **privacy@studiojem.it**

Hai inoltre il diritto di proporre reclamo al Garante per la Protezione dei Dati Personali (www.garanteprivacy.it).`
  },
  {
    id: "sicurezza",
    icon: Lock,
    title: "7. Misure di Sicurezza",
    content: `Adottiamo misure tecniche e organizzative adeguate per proteggere i tuoi dati:

**Misure tecniche:**
- Crittografia SSL/TLS per tutte le comunicazioni
- Hashing delle password con algoritmi sicuri
- Firewall e sistemi di protezione perimetrale
- Backup regolari con crittografia

**Misure organizzative:**
- Accesso ai dati limitato al personale autorizzato
- Formazione del personale sulla protezione dei dati
- Procedure di incident response
- Audit periodici della sicurezza`
  },
  {
    id: "trasferimenti",
    icon: Globe,
    title: "8. Trasferimenti Internazionali",
    content: `I tuoi dati sono principalmente trattati all'interno dell'Unione Europea.

In caso di trasferimento verso paesi terzi, garantiamo un livello di protezione adeguato attraverso:
- Decisioni di adeguatezza della Commissione Europea
- Clausole Contrattuali Standard (SCC)
- Certificazioni riconosciute (es. EU-US Data Privacy Framework)

I nostri principali fornitori di servizi (hosting, analytics) sono selezionati anche in base alle loro garanzie di conformità al GDPR.`
  },
  {
    id: "modifiche",
    icon: AlertCircle,
    title: "9. Modifiche alla Privacy Policy",
    content: `Ci riserviamo il diritto di modificare questa Privacy Policy in qualsiasi momento.

Le modifiche significative saranno comunicate tramite:
- Avviso sulla piattaforma
- Email agli utenti registrati
- Banner informativo sul sito

Ti invitiamo a consultare periodicamente questa pagina per verificare eventuali aggiornamenti.

**Ultimo aggiornamento:** ${new Date().toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}`
  }
];

const Privacy = memo(() => {
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
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">GDPR Compliant</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Privacy Policy
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              La tua privacy è importante per noi. Qui trovi tutte le informazioni su come trattiamo i tuoi dati personali.
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
              <h3 className="text-xl font-bold text-foreground mb-2">Hai domande sulla privacy?</h3>
              <p className="text-muted-foreground mb-6">
                Contattaci per qualsiasi chiarimento sul trattamento dei tuoi dati personali.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="mailto:privacy@studiojem.it"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  privacy@studiojem.it
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

Privacy.displayName = 'Privacy';

export default Privacy;
