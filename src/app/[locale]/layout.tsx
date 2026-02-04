import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/AuthContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';

const ibmPlexSans = IBM_Plex_Sans({
    variable: "--font-ibm-plex-sans",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
    title: "Catwaala | Cat Adoption & Welfare",
    description: "Improving lives of street cats in Bangladesh. Adopt, rescue, and support our feline friends.",
};

export default async function RootLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    const locales = ['en', 'bn'];
    if (!locales.includes(locale)) {
        notFound();
    }

    const messages = await getMessages();

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className={`${ibmPlexSans.variable} antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <NextIntlClientProvider messages={messages}>
                        <AuthProvider>
                            <FavoritesProvider>
                                <div className="flex flex-col min-h-screen">
                                    <Header />
                                    <main className="flex-grow pt-24">
                                        {children}
                                    </main>
                                    <Footer />
                                </div>
                            </FavoritesProvider>
                        </AuthProvider>
                    </NextIntlClientProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
