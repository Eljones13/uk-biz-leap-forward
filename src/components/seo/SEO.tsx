
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  type?: 'website' | 'article';
  image?: string;
  url?: string;
  date?: string;
  author?: string;
  jsonLd?: any | any[];
}

export const SEO = ({ 
  title, 
  description, 
  type = 'website',
  image = '/placeholder.svg',
  url,
  date,
  author,
  jsonLd
}: SEOProps) => {
  const fullTitle = `${title} | BusinessBuilder Pro`;
  const fullUrl = url ? `https://businessbuilder.pro${url}` : 'https://businessbuilder.pro';
  const fullImageUrl = image.startsWith('http') ? image : `https://businessbuilder.pro${image}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:site_name" content="BusinessBuilder Pro" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      
      {/* Article specific */}
      {type === 'article' && date && (
        <meta property="article:published_time" content={date} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      
      {/* JSON-LD structured data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(jsonLd) ? jsonLd : [jsonLd])}
        </script>
      )}
    </Helmet>
  );
};
