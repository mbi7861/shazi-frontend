'use client';
import { useEffect } from 'react';

export default function GoogleCallback() {
    useEffect(() => {
        if (window.opener) {
            window.opener.postMessage({ url: window.location.href }, '*');
        }
        window.close();
    }, []);

    return <p>Processing Google login...</p>;
}
