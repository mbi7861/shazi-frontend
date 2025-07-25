'use client';
import React from 'react';
import axiosInstance from '@/app/api/axiosInstance';
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';
import {useAppContext} from "@/context/AppContext";

export default function GoogleAuth({ isLogin, onClose }) {
    const { setUserData } = useAppContext();
    const router = useRouter();

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
                    console.log('Google Auth Code:', code);
                    popup.close();
                    clearInterval(pollTimer);

                    // 🔁 Send auth code to Laravel backend
                    loginWithGoogle(code);
                }
            } catch (e) {
                // Ignore CORS error until redirect back to our domain
            }
        }, 500);
    };

    const loginWithGoogle = async (code) => {
        try {
            const endpoint = isLogin
                ? 'auth/social-login/google'
                : 'auth/social-register/google';
            const response = await axiosInstance.post(endpoint, { code });

            if (response?.data?.status) {
                const token = response.data.data.session.session_token;
                localStorage.setItem('AUTH-TOKEN', token);
                setUserData(response.data.data.profile);
                toast.success('Google login successful!');
                onClose?.(); // Close auth modal
                router.push('/'); // Redirect if needed
            } else {
                toast.error(response.data.msg || 'Google login failed.');
            }
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.msg || 'Something went wrong during Google login.');
        }
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
