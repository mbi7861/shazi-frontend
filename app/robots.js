import { apiServiceConfig } from './config/apiService';

export default function robots() {
    const baseUrl = apiServiceConfig.siteUrl;

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/checkout', '/cart', '/my-orders'],
        },
        sitemap: `${baseUrl}sitemap.xml`,
    };
}
