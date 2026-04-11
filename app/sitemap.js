export const revalidate = 86400;
import axios from 'axios';
import { apiServiceConfig } from './config/apiService';
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
            url: `${baseUrl}about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}shop`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}contact`,
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
    ];
    let productPages = [];

    try {
        const { data } = await axios.get(`${apiServiceConfig.baseURL}/sitemap-products`);
        if (data.status) {
            productPages = data.data.map((product) => ({
                url: `${baseUrl}product/${product.slug ?? product.id}`,
                lastModified: product.updated_at ? new Date(product.updated_at) : new Date(),
                changeFrequency: 'daily',
                priority: 0.7,
            }));
        }
    } catch (error) {
        console.error("Get Products Error:", error);
    }
    return [
        ...staticPages,
        ...productPages
    ];
}