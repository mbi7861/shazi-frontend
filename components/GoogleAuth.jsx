'use client';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';

// Create a separate component that uses the hook
function GoogleSignInButtonInner({ loginWithGoogle }) {
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      loginWithGoogle({
        code: codeResponse.code,
        status: true
      });
    },
    onError: (error) => {
      console.error('Google Login Failed:', error);
    },
    flow: 'auth-code',
    ux_mode: 'popup',
  });

  return (
    <button
      onClick={() => login()}
      className="w-full border border-gray-300 rounded-md py-2 flex justify-center items-center gap-2 mb-3 hover:bg-gray-50 transition-colors"
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

export default function GoogleSignInButton({ loginWithGoogle }) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <GoogleSignInButtonInner loginWithGoogle={loginWithGoogle} />
    </GoogleOAuthProvider>
  );
}