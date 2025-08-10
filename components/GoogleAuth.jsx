'use client';
import React from 'react';

export default function GoogleAuth({ isLogin, loginWithGoogle }) {


    const handleGoogleSignIn = () => {
        const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
        const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;

        const url = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=openid%20email%20profile&access_type=offline&prompt=select_account`;

        const popup = window.open(url, 'googleLogin', 'width=500,height=600');

        const pollTimer = setInterval(() => {
            try {
                if (!popup || popup.closed) {
                    clearInterval(pollTimer);
                    return;
                }

                const popupUrl = popup.location.href;

                if (popupUrl.includes('?code=')) {
                    console.log(popupUrl)
                    const urlParams = new URL(popupUrl).searchParams;
                    const code = urlParams.get('code');
                    popup.close();
                    clearInterval(pollTimer);
                    loginWithGoogle({ code: code, status: true });
                }
            } catch (e) {
                console.log(e)
                // loginWithGoogle({ code: null, status: false });
            }
        }, 500);
    };

    return (
        <button
            onClick={handleGoogleSignIn}
            className="w-full border border-gray-300 rounded-md py-2 flex justify-center items-center gap-2 mb-3"
        >
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
                alt="Google"
                className="w-4 h-4"
            />
            Continue with Google
        </button>
    );
}
