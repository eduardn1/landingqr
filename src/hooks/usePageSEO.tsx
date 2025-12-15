/**
 * Page SEO Hook - Fetch SEO settings for specific routes
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 */

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface PageSEO {
  id: string;
  route: string;
  title: string | null;
  description: string | null;
  keywords: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  canonical_url: string | null;
  noindex: boolean;
  nofollow: boolean;
  schema_type: string;
  custom_schema: any | null;
  updated_at: string;
}

export const usePageSEO = (route?: string) => {
  const [pageSEO, setPageSEO] = useState<PageSEO | null>(null);
  const [allPages, setAllPages] = useState<PageSEO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPageSEO = useCallback(async () => {
    try {
      if (route) {
        const { data, error } = await supabase
          .from('page_seo')
          .select('*')
          .eq('route', route)
          .maybeSingle();

        if (error) throw error;
        setPageSEO(data);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [route]);

  const fetchAllPages = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('page_seo')
        .select('*')
        .order('route');

      if (error) throw error;
      setAllPages(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (route) {
      fetchPageSEO();
    } else {
      fetchAllPages();
    }
  }, [route, fetchPageSEO, fetchAllPages]);

  const updatePageSEO = async (
    routePath: string,
    updates: Partial<PageSEO>
  ): Promise<boolean> => {
    try {
      const { data: session } = await supabase.auth.getSession();

      const { error } = await supabase
        .from('page_seo')
        .upsert(
          {
            route: routePath,
            ...updates,
            updated_by: session?.session?.user?.id,
          },
          {
            onConflict: 'route',
          }
        );

      if (error) throw error;

      // Refresh data
      if (route) {
        await fetchPageSEO();
      } else {
        await fetchAllPages();
      }

      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    }
  };

  const createPage = async (routePath: string): Promise<boolean> => {
    try {
      const { data: session } = await supabase.auth.getSession();

      const { error } = await supabase.from('page_seo').insert({
        route: routePath,
        title: routePath === '/' ? 'Home' : routePath.replace('/', '').replace(/-/g, ' '),
        schema_type: 'WebPage',
        updated_by: session?.session?.user?.id,
      });

      if (error) throw error;
      await fetchAllPages();
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    }
  };

  const deletePage = async (routePath: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('page_seo')
        .delete()
        .eq('route', routePath);

      if (error) throw error;
      await fetchAllPages();
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    }
  };

  return {
    pageSEO,
    allPages,
    isLoading,
    error,
    updatePageSEO,
    createPage,
    deletePage,
    refetch: route ? fetchPageSEO : fetchAllPages,
  };
};
