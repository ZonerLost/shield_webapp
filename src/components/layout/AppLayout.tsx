"use client";

import { ReactNode } from "react";
import { Header } from "../ui/Header";
import { usePathname } from "next/navigation";

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const pathname = usePathname();
  const noHeaderRoutes = ["/login", "/signup", "/verify-email", "/forgot-password", "/reset-password", "/404", "/generated-narrative", "/draft-statement", "/role-setup"];

  return (
    <div className="min-h-screen bg-white font-dm-sans flex flex-col">
      {/* Header - only show on non-auth pages */}
      {!noHeaderRoutes.includes(pathname) && <Header />}

      {/* Main Content */}
      <main className="flex-1 min-h-0">
        {children}
      </main>
    </div>
  );
};
