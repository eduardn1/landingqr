/**
 * Dynamic SEO Component - Full SEO Integration from Database
 * Supports both global settings and page-specific overrides
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 */

import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useBrandSettings } from '@/hooks/useBrandSettings';
import { usePageSEO } from '@/hooks/usePageSEO';

interface DynamicSEOProps {
  // Override props (highest priority)
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  noindex?: boolean;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
  product?: {
    price?: string;
    currency?: string;
    availability?: 'in stock' | 'out of stock';
  };
}

const DynamicSEO = ({
  title: propTitle,
  description: propDescription,
  image: propImage,
  url: propUrl,
  type = 'website',
  noindex: propNoindex,
  article,
  product,
}: DynamicSEOProps) => {
  const location = useLocation();
  const { settings, isLoading: brandLoading } = useBrandSettings();
  const { pageSEO, isLoading: pageLoading } = usePageSEO(location.pathname);

  if (brandLoading || pageLoading) return null;

  // Priority: Props > Page SEO > Brand Settings > Defaults
  const siteTitle = settings.site_title || 'Flavour';
  const pageTitle = propTitle || pageSEO?.title || siteTitle;
  const fullTitle = pageTitle !== siteTitle ? `${pageTitle} | ${siteTitle}` : siteTitle;
  
  const metaDescription = propDescription || pageSEO?.description || settings.site_description || '';
  const ogImage = propImage || pageSEO?.og_image || settings.og_image_url || '';
  const canonicalUrl = propUrl || pageSEO?.canonical_url || (typeof window !== 'undefined' ? window.location.href : '');
  const twitterCard = settings.twitter_card_type || 'summary_large_image';
  const noindex = propNoindex ?? pageSEO?.noindex ?? false;
  const nofollow = pageSEO?.nofollow ?? false;
  
  const ogTitle = pageSEO?.og_title || settings.og_title || fullTitle;
  const ogDescription = pageSEO?.og_description || settings.og_description || metaDescription;
  const keywords = pageSEO?.keywords || settings.meta_keywords || '';

  // Schema.org structured data based on page type
  const schemaType = pageSEO?.schema_type || 'WebPage';
  
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    name: pageTitle,
    description: metaDescription,
    url: canonicalUrl,
  };

  // Organization schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': settings.schema_org_type || 'Organization',
    name: settings.schema_org_name || siteTitle,
    url: typeof window !== 'undefined' ? window.location.origin : '',
    logo: settings.schema_org_logo || settings.logo_url,
    description: settings.site_description,
    ...(settings.schema_org_address && {
      address: {
        '@type': 'PostalAddress',
        streetAddress: settings.schema_org_address,
      },
    }),
    ...(settings.schema_org_phone && { telephone: settings.schema_org_phone }),
    ...(settings.schema_org_email && { email: settings.schema_org_email }),
    sameAs: [
      settings.instagram_handle && `https://instagram.com/${settings.instagram_handle.replace('@', '')}`,
      settings.twitter_handle && `https://twitter.com/${settings.twitter_handle.replace('@', '')}`,
      settings.linkedin_url,
    ].filter(Boolean),
  };

  // WebSite schema for search
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteTitle,
    url: typeof window !== 'undefined' ? window.location.origin : '',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${typeof window !== 'undefined' ? window.location.origin : ''}?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  // BreadcrumbList schema
  const pathParts = location.pathname.split('/').filter(Boolean);
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: typeof window !== 'undefined' ? window.location.origin : '',
      },
      ...pathParts.map((part, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: part.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        item: typeof window !== 'undefined' 
          ? `${window.location.origin}/${pathParts.slice(0, index + 1).join('/')}`
          : '',
      })),
    ],
  };

  // Article schema
  const articleSchema = article
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: pageTitle,
        description: metaDescription,
        image: ogImage,
        datePublished: article.publishedTime,
        dateModified: article.modifiedTime,
        author: { '@type': 'Person', name: article.author },
        publisher: organizationSchema,
      }
    : null;

  // Product schema
  const productSchema = product
    ? {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: pageTitle,
        description: metaDescription,
        image: ogImage,
        offers: {
          '@type': 'Offer',
          price: product.price,
          priceCurrency: product.currency || 'EUR',
          availability: `https://schema.org/${product.availability === 'in stock' ? 'InStock' : 'OutOfStock'}`,
        },
      }
    : null;

  // Custom schema from database
  const customSchema = pageSEO?.custom_schema;

  // Robots directive
  const robotsContent = [
    noindex ? 'noindex' : 'index',
    nofollow ? 'nofollow' : 'follow',
    'max-image-preview:large',
    'max-snippet:-1',
    'max-video-preview:-1',
  ].join(', ');

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={metaDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={settings.schema_org_name || siteTitle} />
      
      {/* Robots */}
      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content={robotsContent} />
      <meta name="bingbot" content={robotsContent} />

      {/* Canonical */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Favicon */}
      {settings.favicon_url && <link rel="icon" type="image/png" href={settings.favicon_url} />}
      {settings.favicon_url && <link rel="apple-touch-icon" href={settings.favicon_url} />}

      {/* Theme Color */}
      <meta name="theme-color" content={settings.theme_color || '#8B5CF6'} />
      <meta name="msapplication-TileColor" content={settings.theme_color || '#8B5CF6'} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:site_name" content={siteTitle} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {ogImage && <meta property="og:image:width" content="1200" />}
      {ogImage && <meta property="og:image:height" content="630" />}
      <meta property="og:locale" content="it_IT" />
      {settings.facebook_app_id && <meta property="fb:app_id" content={settings.facebook_app_id} />}

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDescription} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      {settings.twitter_handle && <meta name="twitter:site" content={settings.twitter_handle} />}
      {settings.twitter_handle && <meta name="twitter:creator" content={settings.twitter_handle} />}

      {/* Article specific */}
      {article?.publishedTime && <meta property="article:published_time" content={article.publishedTime} />}
      {article?.modifiedTime && <meta property="article:modified_time" content={article.modifiedTime} />}
      {article?.author && <meta property="article:author" content={article.author} />}
      {article?.section && <meta property="article:section" content={article.section} />}
      {article?.tags?.map((tag, i) => <meta key={i} property="article:tag" content={tag} />)}

      {/* Verification */}
      {settings.google_site_verification && (
        <meta name="google-site-verification" content={settings.google_site_verification} />
      )}
      {settings.bing_site_verification && (
        <meta name="msvalidate.01" content={settings.bing_site_verification} />
      )}
      {settings.yandex_verification && (
        <meta name="yandex-verification" content={settings.yandex_verification} />
      )}

      {/* Preconnect */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      {settings.google_analytics_id && <link rel="preconnect" href="https://www.googletagmanager.com" />}

      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(baseSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      {location.pathname === '/' && (
        <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      )}
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      {articleSchema && <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>}
      {productSchema && <script type="application/ld+json">{JSON.stringify(productSchema)}</script>}
      {customSchema && <script type="application/ld+json">{JSON.stringify(customSchema)}</script>}

      {/* Analytics */}
      {settings.google_analytics_id && (
        <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${settings.google_analytics_id}`} />
          <script>
            {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${settings.google_analytics_id}', {page_path: '${location.pathname}'});`}
          </script>
        </>
      )}
      {settings.facebook_pixel_id && (
        <script>
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init','${settings.facebook_pixel_id}');fbq('track','PageView');`}
        </script>
      )}
    </Helmet>
  );
};

export default DynamicSEO;
