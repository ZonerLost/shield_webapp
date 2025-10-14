import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Suspense } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { NProgressProvider } from "@/components/providers/NProgressProvider";
import { NotFoundProvider } from "@/contexts/NotFoundContext";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "ShieldSystems - Securing Your Digital Future",
  description: "ShieldSystems provides comprehensive security solutions for your digital infrastructure and data protection needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} antialiased`}
      >
        <NotFoundProvider>
          <Suspense fallback={null}>
            <NProgressProvider>
              <AppLayout>
                {children}
              </AppLayout>
            </NProgressProvider>
          </Suspense>
        </NotFoundProvider>
      </body>
    </html>
  );
}
