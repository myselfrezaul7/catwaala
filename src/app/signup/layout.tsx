import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Create an Account",
    description: "Join the Catwaala community to adopt, foster, and help street cats across Bangladesh.",
    robots: { index: false, follow: true },
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
