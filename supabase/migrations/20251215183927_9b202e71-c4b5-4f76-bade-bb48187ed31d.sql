-- Create storage bucket for brand assets
INSERT INTO storage.buckets (id, name, public)
VALUES ('brand-assets', 'brand-assets', true);

-- Storage policies for brand assets
CREATE POLICY "Anyone can view brand assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'brand-assets');

CREATE POLICY "Admins can upload brand assets"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'brand-assets' 
  AND public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can update brand assets"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'brand-assets' 
  AND public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can delete brand assets"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'brand-assets' 
  AND public.has_role(auth.uid(), 'admin')
);

-- Add SEO/Brand settings table
CREATE TABLE public.brand_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT NOT NULL UNIQUE,
    value TEXT,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.brand_settings ENABLE ROW LEVEL SECURITY;

-- Anyone can read brand settings
CREATE POLICY "Anyone can read brand settings"
ON public.brand_settings FOR SELECT
USING (true);

-- Only admins can modify
CREATE POLICY "Admins can manage brand settings"
ON public.brand_settings FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Trigger for updated_at
CREATE TRIGGER update_brand_settings_updated_at
BEFORE UPDATE ON public.brand_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default settings
INSERT INTO public.brand_settings (key, value) VALUES
('site_title', 'Flavour - Menu Digitali'),
('site_description', 'La nuova era dei menu digitali per bar, ristoranti e pub'),
('meta_keywords', 'menu digitale, QR code, ristorante, bar, pub'),
('og_title', 'Flavour - Menu Digitali'),
('og_description', 'Trasforma il tuo locale con menu digitali interattivi'),
('twitter_handle', '@flavour'),
('favicon_url', NULL),
('logo_url', NULL),
('og_image_url', NULL),
('brand_primary_color', '#8B5CF6'),
('brand_secondary_color', '#EC4899');