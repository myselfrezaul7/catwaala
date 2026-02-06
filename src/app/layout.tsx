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
    title: "Catwaala | Cat Adoption & Welfare",
    description: "Improving lives of street cats in Bangladesh. Adopt, rescue, and support our feline friends.",
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
