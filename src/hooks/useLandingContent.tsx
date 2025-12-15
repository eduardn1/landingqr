/**
 * Landing Content Hook - Fetch and Update CMS Content
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 */

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ContentItem {
  id: string;
  section: string;
  key: string;
  value: any;
  updated_at: string;
}

export const useLandingContent = (section?: string) => {
  const [content, setContent] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = useCallback(async () => {
    try {
      let query = supabase.from('landing_content').select('*');
      
      if (section) {
        query = query.eq('section', section);
      }

      const { data, error } = await query;

      if (error) throw error;

      const contentMap: Record<string, any> = {};
      data?.forEach((item: ContentItem) => {
        if (!contentMap[item.section]) {
          contentMap[item.section] = {};
        }
        contentMap[item.section][item.key] = item.value;
      });

      setContent(contentMap);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [section]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const updateContent = async (
    section: string,
    key: string,
    value: any
  ): Promise<boolean> => {
    try {
      const { data: session } = await supabase.auth.getSession();
      
      const { error } = await supabase
        .from('landing_content')
        .upsert(
          {
            section,
            key,
            value,
            updated_by: session?.session?.user?.id
          },
          {
            onConflict: 'section,key'
          }
        );

      if (error) throw error;

      // Update local state
      setContent(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [key]: value
        }
      }));

      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    }
  };

  const getContent = (section: string, key: string, defaultValue: any = null) => {
    return content[section]?.[key] ?? defaultValue;
  };

  return {
    content,
    isLoading,
    error,
    updateContent,
    getContent,
    refetch: fetchContent
  };
};
