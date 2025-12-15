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
}

const defaultSettings: BrandSettings = {
  site_title: 'Flavour - Menu Digitali',
  site_description: 'La nuova era dei menu digitali per bar, ristoranti e pub',
  meta_keywords: 'menu digitale, QR code, ristorante, bar, pub',
  og_title: 'Flavour - Menu Digitali',
  og_description: 'Trasforma il tuo locale con menu digitali interattivi',
  twitter_handle: '@flavour',
  favicon_url: null,
  logo_url: null,
  og_image_url: null,
  brand_primary_color: '#8B5CF6',
  brand_secondary_color: '#EC4899',
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
