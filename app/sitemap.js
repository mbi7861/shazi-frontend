export const revalidate = 86400;
import { apiServiceConfig } from './config/apiService';
import { fetchSitemapProductsSSR } from '@/lib/serverApi';

export default async function sitemap() {

    const baseUrl = apiServiceConfig.siteUrl;
    const staticPages = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}about-us`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}all-products`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}contact-us`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}categories`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}privacy-policy`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}terms-of-service`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
    ];

    const result = await fetchSitemapProductsSSR();
    const productPages = result.success
        ? result.data.map((product) => ({
            url: `${baseUrl}product/${product.slug ?? product.id}`,
            lastModified: product.updated_at ? new Date(product.updated_at) : new Date(),
            changeFrequency: 'daily',
            priority: 0.7,
        }))
        : [];

    return [
        ...staticPages,
        ...productPages
    ];
}
