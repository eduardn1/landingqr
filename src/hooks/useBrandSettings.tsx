/**
 * Brand Settings Hook - Fetch and Update Brand/SEO Settings
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 */

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface BrandSettings {
  site_title: string;
  site_description: string;
  meta_keywords: string;
  og_title: string;
  og_description: string;
  twitter_handle: string;
  favicon_url: string | null;
  logo_url: string | null;
  og_image_url: string | null;
  brand_primary_color: string;
  brand_secondary_color: string;
  // Advanced SEO
  canonical_url: string | null;
  robots_txt: string | null;
  google_site_verification: string | null;
  bing_site_verification: string | null;
  yandex_verification: string | null;
  // Social
  facebook_app_id: string | null;
  twitter_card_type: string;
  instagram_handle: string | null;
  linkedin_url: string | null;
  // Schema.org
  schema_org_type: string;
  schema_org_name: string;
  schema_org_logo: string | null;
  schema_org_address: string | null;
  schema_org_phone: string | null;
  schema_org_email: string | null;
  // PWA
  theme_color: string;
  background_color: string;
  manifest_name: string;
  manifest_short_name: string;
  // Analytics
  google_analytics_id: string | null;
  facebook_pixel_id: string | null;
  hotjar_id: string | null;
  // Indexing
  google_indexing_enabled: string;
  last_sitemap_update: string | null;
  indexed_pages: string;
}

const defaultSettings: BrandSettings = {
  site_title: 'Nestify - Menu Digitali',
  site_description: 'La nuova era dei menu digitali per bar, ristoranti e pub',
  meta_keywords: 'menu digitale, QR code, ristorante, bar, pub',
  og_title: 'Nestify - Menu Digitali',
  og_description: 'Trasforma il tuo locale con menu digitali interattivi',
  twitter_handle: '@nestify',
  favicon_url: null,
  logo_url: null,
  og_image_url: null,
  brand_primary_color: '#38EF7D',
  brand_secondary_color: '#44C171',
  canonical_url: null,
  robots_txt: null,
  google_site_verification: null,
  bing_site_verification: null,
  yandex_verification: null,
  facebook_app_id: null,
  twitter_card_type: 'summary_large_image',
  instagram_handle: null,
  linkedin_url: null,
  schema_org_type: 'Organization',
  schema_org_name: 'Nestify',
  schema_org_logo: null,
  schema_org_address: null,
  schema_org_phone: null,
  schema_org_email: null,
  theme_color: '#38EF7D',
  background_color: '#000000',
  manifest_name: 'Nestify - Menu Digitali',
  manifest_short_name: 'Nestify',
  google_analytics_id: null,
  facebook_pixel_id: null,
  hotjar_id: null,
  google_indexing_enabled: 'false',
  last_sitemap_update: null,
  indexed_pages: '[]',
};

export const useBrandSettings = () => {
  const [settings, setSettings] = useState<BrandSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('brand_settings')
        .select('key, value');

      if (error) throw error;

      const settingsMap: Record<string, string | null> = {};
      data?.forEach((item) => {
        settingsMap[item.key] = item.value;
      });

      setSettings({
        ...defaultSettings,
        ...settingsMap,
      } as BrandSettings);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const updateSetting = async (key: string, value: string | null): Promise<boolean> => {
    try {
      const { data: session } = await supabase.auth.getSession();

      const { error } = await supabase
        .from('brand_settings')
        .upsert(
          {
            key,
            value,
            updated_by: session?.session?.user?.id,
          },
          {
            onConflict: 'key',
          }
        );

      if (error) throw error;

      setSettings((prev) => ({
        ...prev,
        [key]: value,
      }));

      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    }
  };

  const uploadAsset = async (
    file: File,
    type: 'favicon' | 'logo' | 'og_image'
  ): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${type}-${Date.now()}.${fileExt}`;
      const filePath = `${type}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('brand-assets')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('brand-assets')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (err: any) {
      setError(err.message);
      return null;
    }
  };

  return {
    settings,
    isLoading,
    error,
    updateSetting,
    uploadAsset,
    refetch: fetchSettings,
  };
};
