-- Add comprehensive SEO settings
INSERT INTO public.brand_settings (key, value) VALUES
-- Advanced SEO
('canonical_url', NULL),
('robots_txt', 'User-agent: *\nAllow: /\nSitemap: /sitemap.xml'),
('google_site_verification', NULL),
('bing_site_verification', NULL),
('yandex_verification', NULL),
-- Social
('facebook_app_id', NULL),
('twitter_card_type', 'summary_large_image'),
('instagram_handle', NULL),
('linkedin_url', NULL),
-- Schema.org
('schema_org_type', 'Organization'),
('schema_org_name', 'Flavour'),
('schema_org_logo', NULL),
('schema_org_address', NULL),
('schema_org_phone', NULL),
('schema_org_email', NULL),
-- PWA
('theme_color', '#8B5CF6'),
('background_color', '#000000'),
('manifest_name', 'Flavour - Menu Digitali'),
('manifest_short_name', 'Flavour'),
-- Analytics
('google_analytics_id', NULL),
('facebook_pixel_id', NULL),
('hotjar_id', NULL),
-- Indexing
('google_indexing_enabled', 'false'),
('last_sitemap_update', NULL),
('indexed_pages', '[]')
ON CONFLICT (key) DO NOTHING;