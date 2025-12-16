/**
 * Dynamic Sitemap Generator Edge Function
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Static pages with their priorities and change frequencies
const staticPages = [
  { path: '/', priority: 1.0, changefreq: 'daily' },
  { path: '/demo', priority: 0.9, changefreq: 'weekly' },
  { path: '/faq', priority: 0.7, changefreq: 'monthly' },
  { path: '/guide', priority: 0.8, changefreq: 'weekly' },
  { path: '/contatti', priority: 0.6, changefreq: 'monthly' },
  { path: '/chi-siamo', priority: 0.6, changefreq: 'monthly' },
  { path: '/diventa-rivenditore', priority: 0.7, changefreq: 'monthly' },
  { path: '/privacy', priority: 0.3, changefreq: 'yearly' },
  { path: '/cookie-policy', priority: 0.3, changefreq: 'yearly' },
  { path: '/termini-servizio', priority: 0.3, changefreq: 'yearly' },
];

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const baseUrl = url.searchParams.get('baseUrl') || 'https://nestify.menu';
    const format = url.searchParams.get('format') || 'xml';

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get last update timestamp
    const { data: lastUpdate } = await supabase
      .from('brand_settings')
      .select('value')
      .eq('key', 'last_sitemap_update')
      .single();

    const now = new Date().toISOString();

    // Update last sitemap generation time
    await supabase
      .from('brand_settings')
      .upsert({ key: 'last_sitemap_update', value: now }, { onConflict: 'key' });

    // Generate sitemap
    const pages = staticPages.map((page) => ({
      ...page,
      url: `${baseUrl}${page.path}`,
      lastmod: now.split('T')[0],
    }));

    if (format === 'json') {
      return new Response(
        JSON.stringify({ success: true, pages, generated: now }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Generate XML sitemap
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${pages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

    return new Response(xml, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error: unknown) {
    console.error('Sitemap generation error:', error);
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
