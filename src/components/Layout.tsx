import Head from 'next/head';
import { ReactNode } from 'react';
import { SEOData, ThemeData, LandingPageData } from '@/types/template';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  theme?: ThemeData;
  seoData?: SEOData;
  landingPageData?: LandingPageData;
}

export default function Layout({ 
  children, 
  title = 'Business Template', 
  description = 'Professional business website template',
  theme,
  seoData,
  landingPageData
}: LayoutProps) {
  const keywordsString = seoData?.keywords ? seoData.keywords.join(', ') : '';
  const focusedKeywordsString = seoData?.focusedKeywords ? seoData.focusedKeywords.join(', ') : '';
  
  // Get logo image for Open Graph
  const logoImage = landingPageData?.images?.find((img) => img.slotName === 'logo-image')?.imageUrl;
  const heroImage = landingPageData?.images?.find((img) => img.slotName === 'hero-image-1' || img.category === 'hero')?.imageUrl;
  const ogImage = logoImage || heroImage;
  
  // Generate structured data for business
  const generateStructuredData = () => {
    if (!landingPageData) return null;
    
    const structuredData: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": landingPageData.businessName,
      "description": seoData?.description || description,
      "url": seoData?.canonicalUrl,
      "telephone": landingPageData.businessData?.phone,
      "email": landingPageData.businessData?.email,
      "address": landingPageData.businessData?.address ? {
        "@type": "PostalAddress",
        "streetAddress": landingPageData.businessData.address.street,
        "addressLocality": landingPageData.businessData.address.city,
        "addressRegion": landingPageData.businessData.address.state,
        "postalCode": landingPageData.businessData.address.zipCode
      } : undefined,
      "geo": landingPageData.businessData?.coordinates ? {
        "@type": "GeoCoordinates",
        "latitude": landingPageData.businessData.coordinates.latitude,
        "longitude": landingPageData.businessData.coordinates.longitude
      } : undefined,
      "openingHours": landingPageData.businessData?.businessHours?.filter(h => !h.isClosed).map(h => `${h.day} ${h.hours}`),
      "sameAs": landingPageData.businessData?.socialLinks?.map(link => link.url) || [],
      "areaServed": landingPageData.businessData?.serviceAreas?.map(area => ({
        "@type": "City",
        "name": area.city
      })) || [],
      "image": ogImage,
      "logo": logoImage
    };
    
    // Add services if available
    if (landingPageData.content?.services?.services) {
      structuredData["hasOfferCatalog"] = {
        "@type": "OfferCatalog",
        "name": "Services",
        "itemListElement": landingPageData.content.services.services.map((service, index) => ({
          "@type": "Offer",
          "name": service.name,
          "description": service.description,
          "price": service.price,
          "position": index + 1
        }))
      };
    }
    
    return JSON.stringify(structuredData);
  };
  
  return (
    <>
      <Head>
        <title>{seoData?.title || title}</title>
        <meta name="description" content={seoData?.description || description} />
        <meta name="keywords" content={keywordsString} />
        
        {/* Focused Keywords for better SEO */}
        {focusedKeywordsString && (
          <meta name="keywords" content={focusedKeywordsString} />
        )}
        
        {/* Canonical URL */}
        {seoData?.canonicalUrl && (
          <link rel="canonical" href={seoData.canonicalUrl} />
        )}
        
        {/* Robots meta tag based on isIndex */}
        <meta name="robots" content={seoData?.isIndex ? 'index,follow' : 'noindex,nofollow'} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seoData?.title || title} />
        <meta property="og:description" content={seoData?.description || description} />
        {seoData?.canonicalUrl && (
          <meta property="og:url" content={seoData.canonicalUrl} />
        )}
        {ogImage && (
          <>
            <meta property="og:image" content={ogImage} />
            <meta property="og:image:alt" content={`${landingPageData?.businessName} - ${seoData?.title || title}`} />
          </>
        )}
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={seoData?.title || title} />
        <meta property="twitter:description" content={seoData?.description || description} />
        {ogImage && (
          <meta property="twitter:image" content={ogImage} />
        )}
        
        {/* Additional SEO meta tags */}
        <meta name="author" content={landingPageData?.businessName || 'Business'} />
        <meta name="generator" content="Next.js" />
        <meta name="language" content="en" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Theme Colors */}
        {theme && (
          <meta name="theme-color" content={theme.primaryColor} />
        )}
        
        {/* Structured Data (JSON-LD) */}
        {generateStructuredData() && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: generateStructuredData()!
            }}
          />
        )}
      </Head>
      
      <div className="min-h-screen">
        {children}
      </div>
    </>
  );
}
