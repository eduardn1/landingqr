# Specifiche: Trasformazione in SaaS Multi-Tenant per Ristoranti

> **Istruzioni per Claude Code**: Leggi questo documento per intero, analizza la codebase esistente, poi crea un piano dettagliato per implementare tutto quello che è descritto. Identifica eventuali conflitti con il codice esistente, proponi miglioramenti e segnala se qualcosa può essere riutilizzato. Inizia dall'analisi della codebase prima di proporre qualsiasi modifica.

---

## 1. Contesto e Obiettivo

Questa applicazione è attualmente **single-tenant**: una sola istanza serve un solo locale. L'obiettivo è trasformarla in un **SaaS multi-tenant** vendibile a qualsiasi gruppo di ristoranti o catena.

### Caso d'uso reale (primo cliente)
Un gruppo enogastronomico con **3 sedi** separate:
- Sede A (esempio: Porto Cervo)
- Sede B (esempio: Olbia)
- Sede C (esempio: Porto Rotondo)

Ogni sede deve avere la propria dashboard isolata. Il proprietario del gruppo deve avere una dashboard centrale ("hub") dove vedere tutto.

### Struttura domini (da configurare su Vercel)
```
[DOMINIO_BASE]          → landing page marketing (invariata, non toccare)
sede-a.[DOMINIO_BASE]   → dashboard Sede A
sede-b.[DOMINIO_BASE]   → dashboard Sede B
sede-c.[DOMINIO_BASE]   → dashboard Sede C
hub.[DOMINIO_BASE]      → dashboard aggregata per il proprietario
```

> `[DOMINIO_BASE]` è un placeholder: sarà il dominio reale del prodotto (es. `miappdemo.it`). Sostituirlo ovunque con il valore corretto.

### Principio fondamentale
- Uno staff di Sede A **non può** vedere prenotazioni, ordini o dati di Sede B
- Il proprietario del gruppo **può** vedere tutto tramite l'hub
- La landing page marketing esistente **rimane invariata**

---

## 2. Architettura Multi-Tenancy

### Approccio scelto: Row-Level Security (RLS) su singolo progetto Supabase

**Motivazione**: un progetto Supabase per tenant sarebbe troppo costoso e difficile da gestire. L'approccio RLS è lo standard per SaaS multi-tenant su Supabase, scala bene e mantiene i costi contenuti.

### Gerarchia dei dati
```
Organization (gruppo ristorante)
  ├── Catalogo Vini / Prodotti (condiviso tra tutte le sedi)
  ├── Clienti (condivisi per loyalty cross-sede)
  ├── Hub Dashboard (visione aggregata)
  └── Locations (sedi)
        ├── Menu (può ereditare dal catalogo org o avere varianti locali)
        ├── Tavoli + Pianta (floor plan specifico per sede)
        ├── Prenotazioni
        ├── Ordini (POS)
        └── Magazzino locale (quantità per sede)
```

### Subdomain routing (Vite/React — senza Next.js)

Tutta la logica di routing avviene **lato client** leggendo `window.location.hostname`:

```
"sede-a.dominio.it"  → mode: "location", slug: "sede-a"
"hub.dominio.it"     → mode: "hub"
"dominio.it"         → mode: "marketing" (landing page esistente)
```

**Per sviluppo locale**: usare query param `?subdomain=sede-a` come override (es. `localhost:5173?subdomain=sede-a`).

Variabili d'ambiente necessarie:
```
VITE_APP_BASE_DOMAIN=dominio.it
VITE_DEV_SUBDOMAIN_OVERRIDE=sede-a   # opzionale per dev
```

**Configurazione Vercel**:
- Aggiungere dominio `dominio.it` + wildcard `*.dominio.it` nelle project settings
- `vercel.json` con rewrite SPA: `{"rewrites": [{"source": "/(.*)", "destination": "/index.html"}]}`

---

## 3. Schema Database Completo (Supabase PostgreSQL)

### 3.1 Nuovi Tipi Enum

```sql
CREATE TYPE org_role AS ENUM ('owner', 'manager', 'admin');
CREATE TYPE location_role AS ENUM ('manager', 'staff', 'waiter', 'kitchen');
CREATE TYPE table_shape AS ENUM ('round', 'square', 'rectangle');
CREATE TYPE table_status AS ENUM ('available', 'occupied', 'reserved', 'cleaning');
CREATE TYPE reservation_status AS ENUM ('pending', 'confirmed', 'seated', 'completed', 'cancelled', 'no_show');
CREATE TYPE order_status AS ENUM ('open', 'sent_to_kitchen', 'partially_ready', 'ready', 'paid', 'voided');
CREATE TYPE order_item_status AS ENUM ('pending', 'preparing', 'ready', 'served', 'voided');
CREATE TYPE movement_type AS ENUM ('restock', 'sale_deduction', 'manual_adjustment', 'wastage', 'transfer_in', 'transfer_out');
CREATE TYPE wine_color AS ENUM ('red', 'white', 'rose', 'sparkling', 'dessert', 'fortified');
CREATE TYPE bottle_size AS ENUM ('375ml', '750ml', '1000ml', '1500ml', '3000ml', '6000ml');
```

### 3.2 Tabelle Foundation (Multi-Tenancy)

```sql
-- Gruppi ristorante (un cliente del SaaS = una organization)
organizations (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,          -- es. "in-vino-veritas"
  logo_url TEXT,
  primary_color TEXT DEFAULT '#8B5CF6',
  plan TEXT DEFAULT 'starter',        -- starter | growth | enterprise
  subscription_status TEXT,
  trial_ends_at TIMESTAMPTZ,
  stripe_customer_id TEXT,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ
)

-- Sedi (ogni location = un subdomain)
locations (
  id UUID PRIMARY KEY,
  org_id UUID FK → organizations,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,                 -- es. "porto-cervo"
  subdomain TEXT UNIQUE NOT NULL,     -- es. "porto-cervo.dominio.it"
  address TEXT,
  city TEXT,
  country TEXT DEFAULT 'IT',
  phone TEXT,
  email TEXT,
  timezone TEXT DEFAULT 'Europe/Rome',
  currency TEXT DEFAULT 'EUR',
  is_active BOOLEAN DEFAULT true,
  opening_hours JSONB DEFAULT '{}',  -- { "mon": {"open":"12:00","close":"23:00"}, ... }
  created_at TIMESTAMPTZ,
  UNIQUE(org_id, slug)
)

-- Membri a livello organizzazione (accesso hub + tutte le sedi)
org_members (
  id UUID PRIMARY KEY,
  org_id UUID FK → organizations,
  user_id UUID FK → auth.users,
  role org_role DEFAULT 'manager',
  invited_by UUID FK → auth.users,
  created_at TIMESTAMPTZ,
  UNIQUE(org_id, user_id)
)

-- Membri a livello sede (accesso solo alla propria sede)
location_members (
  id UUID PRIMARY KEY,
  location_id UUID FK → locations,
  user_id UUID FK → auth.users,
  role location_role DEFAULT 'staff',
  invited_by UUID FK → auth.users,
  created_at TIMESTAMPTZ,
  UNIQUE(location_id, user_id)
)

-- Sistema inviti via email
invitations (
  id UUID PRIMARY KEY,
  org_id UUID FK → organizations,
  location_id UUID FK → locations (nullable → invito org-level),
  email TEXT NOT NULL,
  role_org org_role (nullable),
  role_location location_role (nullable),
  token TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'pending',     -- pending | accepted | expired | revoked
  expires_at TIMESTAMPTZ DEFAULT now() + interval '7 days',
  invited_by UUID FK → auth.users,
  created_at TIMESTAMPTZ
)

-- Profilo utente esteso
profiles (
  id UUID PRIMARY KEY FK → auth.users,
  full_name TEXT,
  avatar_url TEXT,
  language TEXT DEFAULT 'it',
  updated_at TIMESTAMPTZ
)
```

### 3.3 Menu e Catalogo

```sql
-- Categorie menu (org-level: condivise tra tutte le sedi)
menu_categories (
  id UUID PRIMARY KEY,
  org_id UUID FK → organizations,
  name TEXT NOT NULL,               -- es. "Vini Rossi", "Antipasti"
  description TEXT,
  emoji TEXT,                       -- es. "🍷"
  sort_order INT DEFAULT 0,
  is_wine_category BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ
)

-- Voci menu (org-level con campi wine-specific)
menu_items (
  id UUID PRIMARY KEY,
  org_id UUID FK → organizations,
  category_id UUID FK → menu_categories,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  allergens TEXT[],                 -- standard EU: gluten, lactose, eggs, ecc.
  is_available BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,

  -- Campi specifici vino (NULL per i non-wine)
  is_wine BOOLEAN DEFAULT false,
  wine_color wine_color,
  vintage_year SMALLINT,            -- anno vendemmia, es. 2019
  producer TEXT,                    -- cantina/produttore
  region TEXT,                      -- es. "Barolo DOCG"
  appellation TEXT,                 -- sottozona DOC
  grape_varieties TEXT[],           -- es. ['Nebbiolo', 'Sangiovese']
  alcohol_pct DECIMAL(4,1),
  bottle_size bottle_size DEFAULT '750ml',
  tasting_notes TEXT,
  food_pairings TEXT[],             -- es. ['carne rossa', 'formaggi stagionati']
  serving_temp_min SMALLINT,        -- temperatura servizio min (°C)
  serving_temp_max SMALLINT,
  natural_wine BOOLEAN DEFAULT false,
  organic BOOLEAN DEFAULT false,
  biodynamic BOOLEAN DEFAULT false,
  by_glass BOOLEAN DEFAULT false,
  glass_price DECIMAL(10,2),        -- prezzo al calice se by_glass = true

  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)

-- Disponibilità per sede (override org-level)
-- Permette di disabilitare un item in una sede specifica
location_menu_overrides (
  id UUID PRIMARY KEY,
  location_id UUID FK → locations,
  menu_item_id UUID FK → menu_items,
  is_available BOOLEAN,             -- override disponibilità
  price_override DECIMAL(10,2),     -- override prezzo (nullable = usa prezzo org)
  created_at TIMESTAMPTZ,
  UNIQUE(location_id, menu_item_id)
)
```

### 3.4 Tavoli e Pianta (Floor Plan)

```sql
-- Zone della pianta (es. Terrazzo, Sala Interna, Bar)
floor_zones (
  id UUID PRIMARY KEY,
  location_id UUID FK → locations,
  name TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  color TEXT DEFAULT '#6366f1',     -- colore per visualizzazione pianta
  created_at TIMESTAMPTZ
)

-- Tavoli (con posizione per la pianta visuale)
tables (
  id UUID PRIMARY KEY,
  location_id UUID FK → locations,
  zone_id UUID FK → floor_zones,
  name TEXT NOT NULL,               -- es. "T1", "Tavolo Terrazza 3"
  capacity SMALLINT NOT NULL DEFAULT 4,
  shape table_shape DEFAULT 'square',
  status table_status DEFAULT 'available',
  pos_x DECIMAL(8,2) DEFAULT 0,    -- posizione X nella pianta (pixel o %)
  pos_y DECIMAL(8,2) DEFAULT 0,    -- posizione Y nella pianta
  width DECIMAL(6,2) DEFAULT 80,   -- larghezza per rendering
  height DECIMAL(6,2) DEFAULT 80,  -- altezza per rendering
  rotation SMALLINT DEFAULT 0,     -- rotazione in gradi
  qr_code_url TEXT,                -- URL del QR code generato per questo tavolo
  notes TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)
```

### 3.5 Clienti e Prenotazioni

```sql
-- Clienti a livello org (per loyalty cross-sede)
customers (
  id UUID PRIMARY KEY,
  org_id UUID FK → organizations,
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  notes TEXT,                       -- allergie, preferenze
  loyalty_points INT DEFAULT 0,
  visit_count INT DEFAULT 0,
  total_spent DECIMAL(12,2) DEFAULT 0,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  UNIQUE(org_id, email)
)

-- Prenotazioni
reservations (
  id UUID PRIMARY KEY,
  location_id UUID FK → locations,
  table_id UUID FK → tables (nullable),
  customer_id UUID FK → customers (nullable),
  guest_name TEXT NOT NULL,
  guest_phone TEXT,
  guest_email TEXT,
  party_size SMALLINT NOT NULL DEFAULT 2,
  reserved_date DATE NOT NULL,
  reserved_time TIME NOT NULL,
  duration_mins SMALLINT DEFAULT 90,
  status reservation_status DEFAULT 'pending',
  notes TEXT,
  internal_notes TEXT,             -- note solo per lo staff
  source TEXT DEFAULT 'manual',    -- manual | online | phone | walkin
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
  -- INDEX: (table_id, reserved_date, reserved_time)
  --        WHERE status NOT IN ('cancelled','no_show')
  --        per conflict detection efficiente
)
```

### 3.6 Ordini (POS)

```sql
-- Ordini (uno per tavolo per sessione)
orders (
  id UUID PRIMARY KEY,
  location_id UUID FK → locations,
  table_id UUID FK → tables (nullable),
  reservation_id UUID FK → reservations (nullable),
  customer_id UUID FK → customers (nullable),
  order_number TEXT NOT NULL,       -- numero leggibile es. "#1247"
  status order_status DEFAULT 'open',
  subtotal DECIMAL(10,2) DEFAULT 0,
  tax_amount DECIMAL(10,2) DEFAULT 0,
  discount_amount DECIMAL(10,2) DEFAULT 0,
  total_amount DECIMAL(10,2) DEFAULT 0,
  payment_method TEXT,              -- cash | card | qr
  notes TEXT,
  opened_by UUID FK → auth.users,
  closed_by UUID FK → auth.users,
  opened_at TIMESTAMPTZ DEFAULT now(),
  closed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ
)

-- Righe ordine
order_items (
  id UUID PRIMARY KEY,
  order_id UUID FK → orders,
  menu_item_id UUID FK → menu_items (nullable),
  item_name TEXT NOT NULL,          -- snapshot nome al momento dell'ordine
  item_price DECIMAL(10,2) NOT NULL, -- snapshot prezzo
  quantity SMALLINT NOT NULL DEFAULT 1,
  notes TEXT,
  status order_item_status DEFAULT 'pending',
  is_wine BOOLEAN DEFAULT false,
  inventory_deducted BOOLEAN DEFAULT false, -- flag idempotenza scalatura stock
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)
```

### 3.7 Inventario e Magazzino Vini

```sql
-- Catalogo prodotti/vini a livello org (condiviso tra sedi)
inventory_items (
  id UUID PRIMARY KEY,
  org_id UUID FK → organizations,
  menu_item_id UUID FK → menu_items (nullable), -- collegato alla voce menu
  sku TEXT,
  name TEXT NOT NULL,
  unit TEXT DEFAULT 'bottle',       -- bottle | kg | liter | piece | glass
  reorder_point DECIMAL(8,2) DEFAULT 6,     -- soglia alert stock basso
  reorder_quantity DECIMAL(8,2) DEFAULT 24, -- quantità suggerita riordino
  cost_price DECIMAL(10,2),
  supplier TEXT,
  supplier_ref TEXT,                -- codice fornitore

  -- Campi wine (mirror di menu_items)
  is_wine BOOLEAN DEFAULT false,
  wine_color wine_color,
  vintage_year SMALLINT,
  producer TEXT,
  region TEXT,
  grape_varieties TEXT[],
  bottle_size bottle_size DEFAULT '750ml',

  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)

-- Stock per sede (quantità fisica in ogni location)
location_inventory (
  id UUID PRIMARY KEY,
  location_id UUID FK → locations,
  inventory_item_id UUID FK → inventory_items,
  quantity_in_stock DECIMAL(10,2) NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ,
  UNIQUE(location_id, inventory_item_id)
)

-- Movimenti stock (audit trail completo)
stock_movements (
  id UUID PRIMARY KEY,
  location_id UUID FK → locations,
  inventory_item_id UUID FK → inventory_items,
  order_item_id UUID FK → order_items (nullable), -- collegato alla vendita
  movement_type movement_type NOT NULL,
  quantity_delta DECIMAL(10,2) NOT NULL, -- positivo = entrata, negativo = uscita
  quantity_before DECIMAL(10,2) NOT NULL,
  quantity_after DECIMAL(10,2) NOT NULL,
  notes TEXT,
  performed_by UUID FK → auth.users,
  created_at TIMESTAMPTZ
)
```

### 3.8 QR Codes

```sql
qr_codes (
  id UUID PRIMARY KEY,
  location_id UUID FK → locations,
  table_id UUID FK → tables (nullable),
  label TEXT NOT NULL,              -- "Tavolo 5" o "Menu Generale"
  target_url TEXT NOT NULL,         -- URL a cui punta il QR
  qr_image_url TEXT,               -- PNG salvato in Supabase Storage
  scan_count INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ
)
```

---

## 4. Strategia RLS (Row Level Security)

### Funzioni Helper (SECURITY DEFINER — evitano ricorsione)

```sql
-- Controlla se l'utente corrente è membro dell'org con ruolo minimo
is_org_member(org_id UUID, min_role org_role) → BOOLEAN

-- Controlla se l'utente corrente è membro della sede
is_location_member(location_id UUID) → BOOLEAN

-- Ritorna l'org_id di una sede
location_org_id(location_id UUID) → UUID
```

### Pattern Policy per Tabella

**Tabelle org-scoped** (organizations, menu_categories, menu_items, inventory_items, customers):
- `SELECT`: `is_org_member(org_id, 'admin')` — qualsiasi membro org può leggere
- `INSERT/UPDATE/DELETE`: `is_org_member(org_id, 'manager')` — solo owner/manager

**Tabelle location-scoped** (tables, floor_zones, reservations, orders, order_items, location_inventory, stock_movements):
- `SELECT/INSERT/UPDATE`: `is_location_member(location_id) OR is_org_member(location_org_id(location_id), 'admin')`
- `DELETE`: solo org manager

**Tabelle membership** (org_members, location_members):
- Ogni utente vede solo le proprie righe
- Org owner vede tutte le righe del proprio org

**Invitations**:
- `SELECT`: email corrisponde a `auth.email()`, oppure membro org che ha invitato
- `INSERT`: solo org manager
- `UPDATE`: utente autenticato con token valido (flusso accettazione)

### Supabase Realtime + RLS

Abilitare Realtime per: `tables` (cambio status), `orders` (nuovi ordini), `order_items` (display cucina). Supabase Realtime rispetta RLS automaticamente. Ogni subscription deve includere filtro `location_id=eq.{locationId}`.

---

## 5. Architettura React

### Struttura File da Creare

```
src/
├── lib/
│   └── subdomain.ts                ← NUOVO: rileva subdomain + dev override
│
├── contexts/
│   ├── AuthContext.tsx              ← NUOVO: Supabase auth state
│   └── TenantContext.tsx            ← NUOVO: org + location dal subdomain (KEYSTONE)
│
├── hooks/
│   ├── useTenant.tsx                ← NUOVO: useContext(TenantContext)
│   ├── useMenu.tsx                  ← NUOVO: query menu items/categories
│   ├── useTables.tsx                ← NUOVO: query tavoli + Realtime
│   ├── useReservations.tsx          ← NUOVO: CRUD prenotazioni
│   ├── useOrders.tsx                ← NUOVO: ordini + Realtime
│   ├── useInventory.tsx             ← NUOVO: query inventario + mutazioni
│   ├── useLowStockAlerts.tsx        ← NUOVO: alert stock basso
│   └── useHubStats.tsx              ← NUOVO: KPI aggregati per hub
│
├── pages/
│   ├── auth/
│   │   ├── Login.tsx                ← NUOVO: login per il SaaS
│   │   ├── SignUp.tsx               ← NUOVO: crea org + prima sede
│   │   └── AcceptInvite.tsx         ← NUOVO: accetta invito via token
│   ├── LocationApp.tsx              ← NUOVO: dashboard sede (struttura = Demo.tsx)
│   └── HubApp.tsx                   ← NUOVO: dashboard org aggregata
│
├── components/
│   ├── shared/
│   │   └── ProtectedRoute.tsx       ← NUOVO: redirect login se non autenticato
│   │
│   ├── location/                    ← NUOVO: componenti con dati reali
│   │   ├── LocationDashboard.tsx    ← KPI sede in tempo reale
│   │   ├── FloorPlan.tsx            ← Pianta tavoli drag&drop
│   │   ├── MenuManager.tsx          ← CRUD menu (tab Piatti / Vini)
│   │   ├── WineItemForm.tsx         ← Form aggiunta/modifica vino
│   │   ├── ReservationsManager.tsx  ← Prenotazioni con conflict detection
│   │   ├── OrdersManager.tsx        ← POS: tavolo → items → conto
│   │   ├── WineCatalog.tsx          ← Catalogo vini org-level
│   │   ├── InventoryStock.tsx       ← Stock per sede + restock
│   │   └── QRCodeManager.tsx        ← Generazione QR per tavoli
│   │
│   └── hub/                         ← NUOVO: componenti hub org
│       ├── HubOverview.tsx          ← KPI aggregati + Recharts
│       ├── HubAnalytics.tsx         ← Analisi cross-sede
│       ├── LocationsManager.tsx     ← Gestione sedi
│       └── TeamManager.tsx          ← Inviti + gestione staff
│
└── App.tsx                          ← MODIFICA: aggiungere subdomain branching
```

### Modifica di `App.tsx`

```tsx
// Aggiungere prima del BrowserRouter:
const { mode } = detectSubdomain();

// Avvolgere con:
<AuthProvider>
  <TenantProvider mode={mode}>
    <BrowserRouter>
      {mode === 'hub'       && <HubRoutes />}
      {mode === 'location'  && <LocationRoutes />}
      {mode === 'marketing' && <MarketingRoutes />}  {/* INVARIATO */}
    </BrowserRouter>
  </TenantProvider>
</AuthProvider>
```

> **IMPORTANTE**: `Demo.tsx` e tutti i componenti `demo/` rimangono **assolutamente invariati**. Sono usati sulla landing page marketing per mostrare le funzionalità ai potenziali clienti.

### TenantContext (componente architetturale chiave)

```typescript
interface TenantContextValue {
  organization: Organization | null;
  location: Location | null;          // null nella modalità hub
  mode: 'marketing' | 'location' | 'hub';
  orgRole: OrgRole | null;
  locationRole: LocationRole | null;
  canManageOrg: boolean;              // owner o manager
  canManageLocation: boolean;
  canViewHub: boolean;
  isLoading: boolean;
  error: string | null;
}
```

### TanStack Query Keys (scoped per evitare cross-contamination)

```typescript
const queryKeys = {
  menu:         (orgId: string) => ['menu', orgId],
  reservations: (locationId: string) => ['reservations', locationId],
  tables:       (locationId: string) => ['tables', locationId],
  orders:       (locationId: string) => ['orders', locationId],
  inventory:    (orgId: string, locationId: string) => ['inventory', orgId, locationId],
  hubStats:     (orgId: string) => ['hub-stats', orgId],
}
```

---

## 6. Funzionalità da Implementare

### 6.1 Autenticazione e Onboarding

- **Signup** → crea `organization` + prima `location` + `org_members` (role: owner) + `profiles`
- **Login** → con redirect al subdomain corretto dopo autenticazione
- **Invite staff** → inserisce in `invitations`, manda email con link `sede-a.dominio.it/accept-invite?token=xxx`
- **Accetta invito** → se nuovo utente: registrazione; poi crea `org_members` o `location_members`
- **Password reset** → già supportato da Supabase Auth

### 6.2 Menu Management

- CRUD categorie e voci menu
- **Tab separato "Vini"** con tutti i campi enogastronomici:
  - Annata, produttore, regione, denominazione (es. DOCG), vitigni
  - Note di degustazione, abbinamenti gastronomici
  - Temperatura di servizio consigliata
  - Disponibile al calice (sì/no) + prezzo al calice
  - Certificazioni: biologico, biodinamico, naturale
  - Formato bottiglia
- Upload immagine per ogni voce
- Toggle disponibilità rapido (item esaurito momentaneamente)
- Override per sede: disabilitare un item o cambiare prezzo in una sede specifica

### 6.3 Pianta Tavoli (Floor Plan)

- **Editor visuale**: tavoli come elementi `div` con posizione assoluta
- **Drag & drop** con `framer-motion` (`drag` prop + `onDragEnd` → salva pos_x/pos_y)
- **Zone**: es. Terrazzo, Sala Interna, Bar — filtro per zona
- **Forme**: rotondo (circle), quadrato, rettangolo (con `border-radius` e dimensioni)
- **Status in tempo reale** via Supabase Realtime:
  - Verde = libero, Rosso = occupato, Giallo = prenotato, Grigio = in pulizia
- **Azioni rapido** su click tavolo: "Apri ordine", "Assegna prenotazione", "Segna pulizia"
- **QR code per tavolo**: bottone "Genera QR" → crea link `sede-a.dominio.it/tavolo/[id]` + immagine PNG

### 6.4 Prenotazioni

- Vista giornaliera/settimanale con filtro per data e stato
- Form nuova prenotazione: nome, telefono, numero coperti, data, ora, tavolo, note
- **Conflict detection**: avviso se tavolo già prenotato in quello slot temporale
- Al cambio stato "Seated" → aggiorna automaticamente `tables.status` a `occupied`
- Prenotazione da QR/link online → form pubblico senza login per i clienti finali
- Note interne (visibili solo allo staff)

### 6.5 Ordini (POS)

- Vista principale: griglia tavoli con indicatore ordini aperti
- Click tavolo → apri ordine esistente o crea nuovo
- Aggiunta item da menu (ricerca + filtro categoria)
- Stato item: in attesa → in preparazione → pronto → servito
- Chiusura conto: calcolo totale, metodo pagamento, stampa/invio ricevuta (futuro)
- Al conto pagato → tavolo torna automaticamente "libero"
- Display cucina: lista order_items ordinati per status (da implementare come vista separata)

### 6.6 Inventario e Magazzino Vini

- **Catalogo org-level**: tutti i prodotti/vini con campi completi
- **Stock per sede**: ogni sede gestisce le proprie quantità fisiche
- **Scalatura automatica**: quando un `order_item` diventa `'served'`:
  1. Edge Function (Supabase) rileva il cambio stato
  2. Trova l'`inventory_item` collegato al `menu_item`
  3. Decrementa `location_inventory.quantity_in_stock` atomicamente
  4. Inserisce record in `stock_movements` (tipo: `sale_deduction`)
  5. Marca `order_item.inventory_deducted = true` (idempotenza)
- **Restock**: form per inserire quantità ricevuta → stock_movements tipo `restock`
- **Alert stock basso**: badge rosso nel sidebar quando qty < `reorder_point`
- **Storico movimenti**: audit trail filtrabile per item/data/tipo
- **Trasferimento tra sedi**: registra uscita da sede A + entrata in sede B

### 6.7 Hub Dashboard (visione org)

- **KPI aggregati**: revenue totale, ordini totali, prenotazioni totali (tutte le sedi)
- **Breakdown per sede**: tabella comparativa con Recharts (bar chart)
- **Classifica vini**: top 10 vini per volume di vendita cross-sede
- **Stock overview**: sedi con stock critico evidenziate
- **Gestione sedi**: aggiungi/modifica/disabilita sedi
- **Gestione team**: invita staff per sede o per org; revoca accessi
- **Inviti pendenti**: lista inviti non ancora accettati

### 6.8 Clienti e Loyalty

- Database clienti a livello org (stessa persona riconosciuta in tutte le sedi)
- Storico visite cross-sede
- Punti fedeltà (accumulo su ogni ordine)
- Note cliente (allergie, preferenze, occasioni speciali)
- **Futuro**: integrazione WhatsApp/SMS per comunicazioni

### 6.9 QR Code Self-Order (funzionalità avanzata)

- Ogni tavolo ha un QR che punta a `sede-a.dominio.it/tavolo/[table_id]`
- Il cliente scansiona → vede il menu digitale (pubblico, no login)
- **Futuro**: il cliente può anche ordinare direttamente dal telefono

### 6.10 Analytics

- Revenue per periodo (giorno/settimana/mese)
- Piatti/vini più venduti
- Ore di punta (heatmap ordini per ora)
- Tasso di occupazione tavoli
- Tasso di no-show prenotazioni
- A livello hub: confronto performance tra sedi

---

## 7. Edge Functions Supabase

### `handle-order-item-served`
**Trigger**: DB Webhook su `order_items` UPDATE  
**Condizione**: `NEW.status = 'served' AND NEW.inventory_deducted = false`  
**Logica**:
1. Trova `inventory_item` collegato tramite `menu_item_id`
2. Legge stock attuale in `location_inventory` (FOR UPDATE per atomicità)
3. Decrementa stock di `quantity`
4. Inserisce `stock_movements` (tipo: `sale_deduction`, `quantity_delta` negativo)
5. Aggiorna `order_item.inventory_deducted = true`
6. Se nuovo stock < `reorder_point`: log alert (notifiche in futuro)

### `send-invitation`
**Trigger**: chiamata diretta dall'app quando si crea un invito  
**Logica**:
1. Legge invito da `invitations` tramite ID
2. Usa Supabase Auth service role per inviare email
3. Link nell'email: `https://[subdomain].dominio.it/accept-invite?token=[token]`

---

## 8. Dipendenze npm da Aggiungere

```json
{
  "qrcode": "^1.5.3",          // generazione QR code PNG
  "qrcode.react": "^3.1.0",   // rendering QR in React (anteprima)
  "react-dnd": "^16.0.1",     // alternativa a framer-motion per drag (valutare)
  "@dnd-kit/core": "^6.1.0",  // o questo per drag floor plan
  "@dnd-kit/sortable": "^8.0.0"
}
```

> **Nota**: `framer-motion` è già presente nel progetto — valutare se è sufficiente per il drag della pianta o se serve `@dnd-kit`.

---

## 9. Seed Data per il Primo Cliente

Creare una migration di seed (solo per dev/demo, non per production) con:

```
Organization:
  - nome: "In Vino Veritas"
  - slug: "in-vino-veritas"

Locations:
  - Porto Cervo  (slug: porto-cervo)
  - Olbia        (slug: olbia)
  - Porto Rotondo (slug: porto-rotondo)

Floor Zones per Porto Cervo:
  - Terrazzo, Sala Interna, Bar

Tavoli per Porto Cervo (con posizioni x/y):
  - T1 (4 posti, quadrato, Terrazzo)
  - T2 (4 posti, quadrato, Terrazzo)
  - T3 (6 posti, rettangolo, Sala Interna)
  - T4 (2 posti, rotondo, Sala Interna)
  - B1 (3 posti, rotondo, Bar)

Categorie Menu:
  - Vini Rossi, Vini Bianchi, Bollicine, Antipasti, Secondi, Dessert

Sample Wine Items:
  - Barolo Castiglione 2019 (Vietti, Nebbiolo, DOCG, €85)
  - Vermentino di Sardegna 2023 (Sella & Mosca, €32)
  - Franciacorta Brut NV (€48)
```

---

## 10. Configurazione Vercel

```json
// vercel.json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

**Nel pannello Vercel** (Project Settings → Domains):
- Aggiungere `[DOMINIO_BASE]`
- Aggiungere `*.[DOMINIO_BASE]` (wildcard per tutti i subdomini)

**Variabili d'ambiente Vercel**:
```
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
VITE_APP_BASE_DOMAIN=[DOMINIO_BASE]
```

---

## 11. Fasi di Implementazione

### Fase 1 — Foundation (priorità assoluta)
Obiettivo: app rileva subdomain, risolve org/location, mostra login se non autenticato

1. Migrations: enum types + organizations/locations/members/invitations/profiles + RLS helpers + RLS policies
2. Rigenerare `src/integrations/supabase/types.ts`
3. `src/lib/subdomain.ts` — utility rilevamento subdomain
4. `src/contexts/AuthContext.tsx` — Supabase auth state
5. `src/contexts/TenantContext.tsx` — risolve org/location da subdomain
6. `src/pages/auth/Login.tsx` + `SignUp.tsx` + `AcceptInvite.tsx`
7. `src/components/shared/ProtectedRoute.tsx`
8. Modifica `src/App.tsx` — branching per mode
9. `src/pages/LocationApp.tsx` shell + `src/pages/HubApp.tsx` shell
10. `vercel.json` + documentazione variabili d'ambiente

### Fase 2 — Core Operations
Obiettivo: staff può gestire tavoli, prenotazioni, ordini e menu in tempo reale

1. Migrations: menu_categories, menu_items, location_menu_overrides, floor_zones, tables, customers, reservations, orders, order_items
2. `FloorPlan.tsx` — drag&drop + Realtime status tavoli
3. `MenuManager.tsx` — CRUD reale con tab Piatti/Vini
4. `ReservationsManager.tsx` — con conflict detection
5. `OrdersManager.tsx` — POS con chiusura conto
6. `QRCodeManager.tsx` — generazione QR per tavoli
7. Supabase Realtime subscriptions per tavoli e ordini

### Fase 3 — Inventario Vini
Obiettivo: magazzino con scalatura automatica su vendita

1. Migration: inventory_items, location_inventory, stock_movements
2. Edge Function `handle-order-item-served`
3. `WineCatalog.tsx` — catalogo vini org-level
4. `InventoryStock.tsx` — stock per sede + restock
5. Badge stock basso nel sidebar
6. Storico movimenti

### Fase 4 — Hub Dashboard
Obiettivo: proprietario vede tutto il gruppo in un unico posto

1. `HubOverview.tsx` — KPI aggregati con Recharts
2. `TeamManager.tsx` + Edge Function `send-invitation`
3. `LocationsManager.tsx` — CRUD sedi
4. `HubAnalytics.tsx` — confronto performance cross-sede

---

## 12. Funzionalità Future (Post-MVP)

- **QR self-order**: il cliente ordina direttamente dal telefono scansionando il tavolo
- **Stripe billing**: piani starter/growth/enterprise per monetizzare il SaaS
- **White-label**: ogni org personalizza colori e logo
- **App mobile**: companion app per waiter (React Native)
- **Integrazione WhatsApp**: conferma prenotazioni, aggiornamenti ordine
- **Notifiche push**: alert stock basso, nuovo ordine, prenotazione in arrivo
- **Fatturazione**: generazione PDF ricevute/scontrini
- **Delivery**: integrazione con corrieri, tracking in mappa (Mapbox già presente)
- **Multi-lingua**: IT/EN/DE per luoghi turistici

---

## 13. Verifica End-to-End

Al termine dell'implementazione, verificare:

1. `localhost:5173` → landing page marketing **invariata**
2. `localhost:5173?subdomain=porto-cervo` → redirect login → signup → crea org + location in DB
3. Accesso come staff sede A → impossibile vedere dati sede B (test RLS diretto su Supabase)
4. Drag tavolo sulla pianta → posizione persiste dopo reload pagina
5. Prenota tavolo T1 ore 20:00 → tentativo di seconda prenotazione stesso slot → avviso conflitto
6. Apri ordine su T1 → aggiungi bottiglia Barolo → segna "servita" → stock in `location_inventory` decrementa di 1 → record in `stock_movements` presente
7. Hub owner su `hub.[DOMINIO_BASE]` → vede KPI aggregati di tutte e 3 le sedi
8. Invito staff via email → accettazione → staff compare in `location_members` della sede corretta
9. Staff invitato non può accedere all'hub (solo location-level access)

---

*Documento generato per guidare la trasformazione da single-tenant a multi-tenant SaaS. Adattare i placeholder `[DOMINIO_BASE]` con il dominio reale del prodotto prima dell'implementazione.*
