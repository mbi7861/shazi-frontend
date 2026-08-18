import { apiServiceConfig } from "@/app/config/apiService";

const BASE_URL = apiServiceConfig.imageBaseUrl;
const CURRENCY = process.env.NEXT_PUBLIC_CURRENCY || 'Rs';

export const getImageUrl = (imageUUID, folder = 'products') => {
    if (!imageUUID) return '';
    return `${BASE_URL}/${folder}/${imageUUID}`;
};

/**
 * Resolves a display image UUID from a primary-image field, falling back
 * through an images array (preferring the entry marked is_preview, then
 * the first image). Centralizes the fallback chain that was hand-built
 * wherever a product or product item's image needed to be picked out of
 * the API's image data.
 */
export const resolveImageUUID = (primaryImage, images) => {
    return primaryImage || images?.find((img) => img.is_preview)?.uuid || images?.[0]?.uuid || null;
};

/**
 * Formats a numeric amount with the app's currency prefix.
 * @param {number} amount
 * @param {number} decimals - decimal places to show (default 0)
 */
export const formatMoney = (amount, decimals = 0) => {
    const num = Number(amount) || 0;
    return `${CURRENCY} ${num.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    })}`;
};

export function getOrCreateSessionId() {
    let sessionId = localStorage.getItem('GUEST_SESSION_ID');
    if (!sessionId) {
        sessionId = 'session_' + Math.random().toString(36).substr(2, 16);
        localStorage.setItem('GUEST_SESSION_ID', sessionId);
    }
    return sessionId;
}
