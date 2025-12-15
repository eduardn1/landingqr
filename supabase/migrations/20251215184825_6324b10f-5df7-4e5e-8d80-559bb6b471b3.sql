-- Table for page-specific SEO settings
CREATE TABLE public.page_seo (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    route TEXT NOT NULL UNIQUE,
    title TEXT,
    description TEXT,
    keywords TEXT,
    og_title TEXT,
    og_description TEXT,
    og_image TEXT,
    canonical_url TEXT,
    noindex BOOLEAN DEFAULT false,
    nofollow BOOLEAN DEFAULT false,
    schema_type TEXT DEFAULT 'WebPage',
    custom_schema JSONB,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.page_seo ENABLE ROW LEVEL SECURITY;

-- Anyone can read page SEO
CREATE POLICY "Anyone can read page SEO"
ON public.page_seo FOR SELECT
USING (true);

-- Only admins can modify
CREATE POLICY "Admins can manage page SEO"
ON public.page_seo FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Trigger for updated_at
CREATE TRIGGER update_page_seo_updated_at
BEFORE UPDATE ON public.page_seo
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default SEO for all pages
INSERT INTO public.page_seo (route, title, description, schema_type) VALUES
('/', 'Home', 'La nuova era dei menu digitali per bar, ristoranti e pub', 'WebSite'),
('/demo', 'Demo Interattiva', 'Prova la demo interattiva di Flavour e scopri tutte le funzionalità', 'WebApplication'),
('/faq', 'FAQ', 'Domande frequenti su Flavour e i menu digitali', 'FAQPage'),
('/guide', 'Guide e Tutorial', 'Guide e tutorial per utilizzare al meglio Flavour', 'CollectionPage'),
('/contatti', 'Contatti', 'Contattaci per informazioni sui menu digitali Flavour', 'ContactPage'),
('/chi-siamo', 'Chi Siamo', 'Scopri la storia e il team di Flavour', 'AboutPage'),
('/diventa-rivenditore', 'Diventa Rivenditore', 'Unisciti al programma partner di Flavour', 'WebPage'),
('/privacy', 'Privacy Policy', 'Informativa sulla privacy di Flavour', 'WebPage'),
('/cookie-policy', 'Cookie Policy', 'Informativa sui cookie di Flavour', 'WebPage'),
('/termini-servizio', 'Termini di Servizio', 'Termini e condizioni di utilizzo di Flavour', 'WebPage');