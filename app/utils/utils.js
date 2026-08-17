import { apiServiceConfig } from "@/app/config/apiService";

const BASE_URL = apiServiceConfig.imageBaseUrl;

export const getImageUrl = (imageUUID, folder = 'products') => {
    if (!imageUUID) return '';
    return `${BASE_URL}/${folder}/${imageUUID}`;
};

export function getOrCreateSessionId() {
    let sessionId = localStorage.getItem('GUEST_SESSION_ID');
    if (!sessionId) {
        sessionId = 'session_' + Math.random().toString(36).substr(2, 16);
        localStorage.setItem('GUEST_SESSION_ID', sessionId);
    }
    return sessionId;
}
