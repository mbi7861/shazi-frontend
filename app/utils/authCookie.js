// Shared AUTH-TOKEN cookie options.
// `secure` is only set in production because it requires HTTPS — a secure
// cookie is silently dropped by the browser over plain http://localhost.
export const AUTH_COOKIE_NAME = 'AUTH-TOKEN';

export const AUTH_COOKIE_OPTIONS = {
    expires: 7,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
};
