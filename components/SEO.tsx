
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    canonical?: string;
    type?: string;
    name?: string;
    image?: string;
}

export default const SEO = ({
    title,
    description = 'Catwaala - Rescuing stray cats in Bangladesh & finding them forever homes.',
    canonical,
    type = 'website',
    name = 'Catwaala',
    image = 'https://www.catwaala.com/og-image.jpg'
}: SEOProps) => {
    const siteUrl = 'https://www.catwaala.com';
    const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl;
    const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;

    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{title} | Catwaala</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={fullCanonical} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={fullCanonical} />
            <meta property="og:site_name" content={name} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Helmet>
    );
}
