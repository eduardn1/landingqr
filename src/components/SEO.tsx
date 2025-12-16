/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * NESTIFY - SEO Component
 * Dynamic meta tags, Open Graph, Twitter Cards, and JSON-LD structured data
 * 
 * Sviluppato da Eduard Costin Udila @ studiojem.it
 * Web Development & Digital Solutions
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  noindex?: boolean;
  structuredData?: object;
}

const BASE_URL = 'https://nestify.studiojem.it';
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`;
const SITE_NAME = 'Nestify';

// Organization structured data
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Nestify by StudioJEM",
  "url": BASE_URL,
  "logo": `${BASE_URL}/favicon.ico`,
  "description": "Piattaforma all-in-one per la gestione immobiliare intelligente.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Cagliari",
    "addressCountry": "IT"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+39-353-381-1359",
    "contactType": "customer service",
    "email": "info@studiojem.it",
    "availableLanguage": ["Italian", "English"]
  },
  "sameAs": [],
  "founder": {
    "@type": "Person",
    "name": "Eduard Costin Udila"
  }
};

// Software Application structured data
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Nestify",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "EUR",
    "lowPrice": "29",
    "highPrice": "79",
    "offerCount": "3"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "500"
  },
  "featureList": [
    "Gestione immobili",
    "Prenotazioni online",
    "Channel manager",
    "Automazione check-in",
    "Multi-lingua",
    "Analytics dashboard",
    "Comunicazione ospiti",
    "Revenue management"
  ]
};

export const SEO = ({
  title,
  description = "Piattaforma all-in-one per la gestione immobiliare intelligente. Gestisci prenotazioni, comunicazioni e operazioni da un'unica dashboard.",
  keywords = "gestione immobiliare, property management, affitti brevi, airbnb management, booking management, channel manager",
  image = DEFAULT_IMAGE,
  url = BASE_URL,
  type = 'website',
  noindex = false,
  structuredData
}: SEOProps) => {
  const fullTitle = title 
    ? `${title} | ${SITE_NAME}` 
    : `${SITE_NAME} | Gestione Immobiliare Intelligente`;

  const schemas = [
    organizationSchema,
    ...(type === 'website' ? [softwareSchema] : []),
    ...(structuredData ? [structuredData] : [])
  ];

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Eduard Costin Udila - StudioJEM" />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Language */}
      <html lang="it" />
      <meta httpEquiv="content-language" content="it-IT" />
      
      {/* Canonical */}
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={`${SITE_NAME} - Gestione Immobiliare`} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="it_IT" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional SEO */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content={SITE_NAME} />
      
      {/* JSON-LD Structured Data */}
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

// FAQ structured data helper
export const createFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

// BreadcrumbList structured data helper
export const createBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

export default SEO;