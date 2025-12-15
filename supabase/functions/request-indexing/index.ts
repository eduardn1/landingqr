/**
 * Google Indexing API Request Edge Function
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * 
 * Note: Requires GOOGLE_INDEXING_API_KEY secret to be configured
 * This uses the Google Indexing API for URL inspection/indexing requests
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url, action = 'URL_UPDATED' } = await req.json();

    if (!url) {
      return new Response(
        JSON.stringify({ success: false, error: 'URL is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Log the indexing request
    const { data: currentPages } = await supabase
      .from('brand_settings')
      .select('value')
      .eq('key', 'indexed_pages')
      .single();

    const indexedPages = currentPages?.value ? JSON.parse(currentPages.value) : [];
    const newEntry: Record<string, any> = {
      url,
      action,
      requestedAt: new Date().toISOString(),
      status: 'pending',
    };

    // Check if Google Indexing API key is configured
    const googleApiKey = Deno.env.get('GOOGLE_INDEXING_API_KEY');
    
    if (googleApiKey) {
      try {
        // Make request to Google Indexing API
        const response = await fetch(
          `https://indexing.googleapis.com/v3/urlNotifications:publish`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${googleApiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              url: url,
              type: action, // URL_UPDATED or URL_DELETED
            }),
          }
        );

        if (response.ok) {
          newEntry.status = 'submitted';
          const responseData = await response.json();
          newEntry.response = responseData;
        } else {
          newEntry.status = 'failed';
          newEntry.error = await response.text();
        }
      } catch (apiError: unknown) {
        console.error('Google API error:', apiError);
        newEntry.status = 'api_error';
        newEntry.error = apiError instanceof Error ? apiError.message : 'Unknown error';
      }
    } else {
      // No API key - just log the request
      newEntry.status = 'logged_only';
      newEntry.note = 'Google Indexing API key not configured';
    }

    // Update indexed pages list
    indexedPages.unshift(newEntry);
    // Keep only last 100 entries
    const trimmedPages = indexedPages.slice(0, 100);

    await supabase
      .from('brand_settings')
      .upsert(
        { key: 'indexed_pages', value: JSON.stringify(trimmedPages) },
        { onConflict: 'key' }
      );

    return new Response(
      JSON.stringify({
        success: true,
        data: newEntry,
        message: googleApiKey
          ? 'Indexing request submitted to Google'
          : 'Indexing request logged (API key not configured)',
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('Indexing request error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
