import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Suspense } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { NProgressProvider } from "@/components/providers/NProgressProvider";
import { ToastProvider } from "@/components/providers/ToastProvider";
import { NotFoundProvider } from "@/contexts/NotFoundContext";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Shield Systems - Securing Your Digital Future",
  description: "Shield Systems provides comprehensive security solutions for your digital infrastructure and data protection needs.",
  icons: {
    icon: '/fav-icon.png',
    apple: '/app-icon.png',
  },
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
              <ToastProvider>
                <AppLayout>
                  {children}
                </AppLayout>
              </ToastProvider>
            </NProgressProvider>
          </Suspense>
        </NotFoundProvider>
      </body>
    </html>
  );
}
