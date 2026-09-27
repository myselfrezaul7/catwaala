import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
    const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.google.com https://www.gstatic.com https://va.vercel-scripts.com https://apis.google.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' blob: data: https://images.unsplash.com https://*.firebaseapp.com https://*.googleapis.com https://lh3.googleusercontent.com https://www.google.com https://*.tile.openstreetmap.org https://*.basemaps.cartocdn.com https://ui-avatars.com;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' https://firestore.googleapis.com https://*.firebaseio.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://firebaseinstallations.googleapis.com https://firebasestorage.googleapis.com https://*.googleapis.com https://firebaseremoteconfig.googleapis.com https://*.google-analytics.com https://*.analytics.google.com https://api.web3forms.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-src 'self' https://www.google.com https://www.recaptcha.net https://catwaala-animal-welfare.firebaseapp.com;
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
`;
    // Replace newlines with spaces
    const contentSecurityPolicyHeaderValue = cspHeader
        .replace(/\s{2,}/g, ' ')
        .trim();

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-nonce', nonce);
    requestHeaders.set(
        'Content-Security-Policy',
        contentSecurityPolicyHeaderValue
    );

    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });

    response.headers.set(
        'Content-Security-Policy',
        contentSecurityPolicyHeaderValue
    );

    response.headers.set('X-Frame-Options', 'SAMEORIGIN');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set(
        'Permissions-Policy',
        'camera=(self), microphone=(), geolocation=(self)'
    );
    response.headers.set(
        'Strict-Transport-Security',
        'max-age=63072000; includeSubDomains; preload'
    );

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        {
            source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
            missing: [
                { type: 'header', key: 'next-router-prefetch' },
                { type: 'header', key: 'purpose', value: 'prefetch' },
            ],
        },
    ],
};
