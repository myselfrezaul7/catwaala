import createMiddleware from 'next-intl/middleware';

const intlMiddleware = createMiddleware({
    locales: ['en', 'bn'],
    defaultLocale: 'en'
});

// Next.js 16: Renamed from 'middleware' to 'proxy'
export function proxy(request: Request) {
    return intlMiddleware(request);
}

export const config = {
    matcher: ['/', '/(bn|en)/:path*']
};
