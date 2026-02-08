import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/AuthContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
    variable: "--font-ibm-plex-sans",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
    title: {
        default: "Catwaala | Save a Stray, Gain a Friend",
        template: "%s | Catwaala",
    },
    description: "Bangladesh's first dedicated platform for stray cat rescue, adoption, and care. Join our mission to give every street cat a home.",
    keywords: ["cat adoption bangladesh", "stray cat rescue dhaka", "veterinary clinics dhaka", "catwaala", "animal welfare bangladesh"],
    authors: [{ name: "Catwaala Team" }],
    creator: "Catwaala",
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
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${ibmPlexSans.variable} antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
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
                </ThemeProvider>
            </body>
        </html>
    );
}
