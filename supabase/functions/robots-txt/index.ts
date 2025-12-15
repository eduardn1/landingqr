/**
 * Dynamic robots.txt Generator
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const defaultRobotsTxt = `# Robots.txt - Flavour Menu Digitali
# Sviluppato da Eduard Costin Udila @ studiojem.it

User-agent: *
Allow: /
Disallow: /admin
Disallow: /admin/

# Sitemap
Sitemap: https://flavour.menu/sitemap.xml

# Crawl delay
Crawl-delay: 1

# AI Crawlers
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /
`;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get custom robots.txt from settings
    const { data: robotsSetting } = await supabase
      .from('brand_settings')
      .select('value')
      .eq('key', 'robots_txt')
      .single();

    const robotsTxt = robotsSetting?.value || defaultRobotsTxt;

    return new Response(robotsTxt, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error) {
    console.error('Robots.txt error:', error);
    return new Response(defaultRobotsTxt, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/plain',
      },
    });
  }
});
