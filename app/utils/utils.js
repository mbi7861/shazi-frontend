import { apiServiceConfig } from "@/app/config/apiService";

const BASE_URL = apiServiceConfig.imageBaseUrl;

export const getImageUrl = (imageUUID, folder = 'products') => {
    if (!imageUUID) return '';
    return `${BASE_URL}/${folder}/${imageUUID}`;
};

Array.prototype.toDict = function (key) {
    let dict = {}
    for (let i = 0; i < this.length; i++) {
        dict[this[i][key]] = this[i]
    }
    return dict
}
export function getOrCreateSessionId() {
    let sessionId = localStorage.getItem('GUEST_SESSION_ID');
    if (!sessionId) {
        sessionId = 'session_' + Math.random().toString(36).substr(2, 16);
        localStorage.setItem('GUEST_SESSION_ID', sessionId);
    }
    return sessionId;
}
