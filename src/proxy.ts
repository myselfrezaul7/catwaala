import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware({
    locales: ['en', 'bn'],
    defaultLocale: 'en'
});

// Next.js 16: Renamed from 'middleware' to 'proxy'
export function proxy(request: NextRequest) {
    return intlMiddleware(request);
}

export const config = {
    matcher: ['/', '/(bn|en)/:path*']
};
