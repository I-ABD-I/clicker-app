import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Simple Clicker Website",
    description: "Simple Clicker Website",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
