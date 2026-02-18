import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { EmergencyFAB } from "@/components/shared/EmergencyFAB";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { LanguageProvider } from "@/contexts/LanguageContext";

const ibmPlexSans = IBM_Plex_Sans({
    variable: "--font-ibm-plex-sans",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
    themeColor: "#f43f5e",
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
};

export const metadata: Metadata = {
    title: {
        default: "Catwaala | Save a Stray, Gain a Friend",
        template: "%s | Catwaala",
    },
    description: "Bangladesh's first dedicated platform for stray cat rescue, adoption, and care. Join our mission to give every street cat a home.",
    keywords: ["cat adoption bangladesh", "stray cat rescue dhaka", "veterinary clinics dhaka", "catwaala", "animal welfare bangladesh"],
    authors: [{ name: "Catwaala Team" }],
    creator: "Catwaala",
    icons: {
        icon: "/logo.png",
        shortcut: "/logo.png",
        apple: "/logo.png",
    },
    manifest: "/manifest.json",
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: "Catwaala",
    },
    formatDetection: {
        telephone: false,
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://catwaala.com",
        title: "Catwaala | Save a Stray, Gain a Friend",
        description: "Connect with rescued cats, find vets, and report strays in Bangladesh.",
        siteName: "Catwaala",
    },
    twitter: {
        card: "summary_large_image",
        title: "Catwaala | Save a Stray, Gain a Friend",
        description: "Helping street cats in Bangladesh find loving homes.",
        creator: "@catwaala",
    },
    metadataBase: new URL("https://catwaala.com"),
    alternates: {
        canonical: "./",
    },
    verification: {
        google: "hupCVTRe4rmruCdhQMfoGSShCmcE4ZUUn8pXAoFX2Qg",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${ibmPlexSans.variable} antialiased`}>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Organization",
                            name: "Catwaala",
                            url: "https://catwaala.com",
                            logo: "https://catwaala.com/logo.png",
                            sameAs: ["https://twitter.com/catwaala"],
                            contactPoint: {
                                "@type": "ContactPoint",
                                telephone: "+880-123-456789",
                                contactType: "customer service",
                            },
                        }),
                    }}
                />
                <AuthProvider>
                    <FavoritesProvider>
                        <ThemeProvider
                            attribute="class"
                            defaultTheme="system"
                            enableSystem
                            disableTransitionOnChange
                        >
                            <LanguageProvider>
                                <div className="flex flex-col min-h-screen">
                                    <Header />
                                    <main className="flex-grow pt-20">
                                        {children}
                                    </main>
                                    <Footer />
                                </div>
                                <EmergencyFAB />
                                <Toaster position="top-center" richColors />
                            </LanguageProvider>
                        </ThemeProvider>
                    </FavoritesProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
