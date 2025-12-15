/**
 * Dynamic SEO Component - Full SEO Integration from Database
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 */

import { Helmet } from 'react-helmet-async';
import { useBrandSettings } from '@/hooks/useBrandSettings';

interface DynamicSEOProps {
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
  title,
  description,
  image,
  url,
  type = 'website',
  noindex = false,
  article,
  product,
}: DynamicSEOProps) => {
  const { settings, isLoading } = useBrandSettings();

  if (isLoading) return null;

  const siteTitle = settings.site_title || 'Flavour';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const metaDescription = description || settings.site_description || '';
  const ogImage = image || settings.og_image_url || '';
  const canonicalUrl = url || settings.canonical_url || typeof window !== 'undefined' ? window.location.href : '';
  const twitterCard = settings.twitter_card_type || 'summary_large_image';

  // Schema.org structured data
  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': settings.schema_org_type || 'Organization',
    name: settings.schema_org_name || siteTitle,
    url: canonicalUrl,
    logo: settings.schema_org_logo || settings.logo_url,
    description: metaDescription,
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

  // WebSite schema for search box
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteTitle,
    url: canonicalUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${canonicalUrl}?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  // Article schema
  const articleSchema = article
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description: metaDescription,
        image: ogImage,
        datePublished: article.publishedTime,
        dateModified: article.modifiedTime,
        author: {
          '@type': 'Person',
          name: article.author,
        },
        publisher: schemaOrg,
      }
    : null;

  // Product schema
  const productSchema = product
    ? {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: title,
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

  // BreadcrumbList schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: canonicalUrl?.split('/').slice(0, 3).join('/'),
      },
      ...(title && title !== siteTitle
        ? [
            {
              '@type': 'ListItem',
              position: 2,
              name: title,
              item: canonicalUrl,
            },
          ]
        : []),
    ],
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={metaDescription} />
      {settings.meta_keywords && <meta name="keywords" content={settings.meta_keywords} />}
      <meta name="author" content={settings.schema_org_name || siteTitle} />
      
      {/* Robots */}
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'} />
      <meta name="googlebot" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <meta name="bingbot" content={noindex ? 'noindex, nofollow' : 'index, follow'} />

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
      <meta property="og:title" content={settings.og_title || fullTitle} />
      <meta property="og:description" content={settings.og_description || metaDescription} />
      <meta property="og:site_name" content={siteTitle} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {ogImage && <meta property="og:image:width" content="1200" />}
      {ogImage && <meta property="og:image:height" content="630" />}
      <meta property="og:locale" content="it_IT" />
      {settings.facebook_app_id && <meta property="fb:app_id" content={settings.facebook_app_id} />}

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={settings.og_title || fullTitle} />
      <meta name="twitter:description" content={settings.og_description || metaDescription} />
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

      {/* Preconnect for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      {settings.google_analytics_id && <link rel="preconnect" href="https://www.googletagmanager.com" />}

      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />

      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(schemaOrg)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      {articleSchema && <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>}
      {productSchema && <script type="application/ld+json">{JSON.stringify(productSchema)}</script>}

      {/* Analytics - Conditional based on cookie consent */}
      {settings.google_analytics_id && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${settings.google_analytics_id}`}
          />
          <script>
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${settings.google_analytics_id}', {
                page_path: window.location.pathname,
              });
            `}
          </script>
        </>
      )}

      {settings.facebook_pixel_id && (
        <script>
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${settings.facebook_pixel_id}');
            fbq('track', 'PageView');
          `}
        </script>
      )}
    </Helmet>
  );
};

export default DynamicSEO;
