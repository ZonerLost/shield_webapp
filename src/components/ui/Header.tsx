"use client";

import { Logo, MenuIcon, BellIcon, MoreDotsIcon } from "./Icons";
import { useRouter, usePathname } from "next/navigation";

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-placeholder-gray">
      {/* Left side - Menu */}
      <div className="flex items-center">
        <button className="hover:bg-icons-bg rounded-lg transition-colors cursor-pointer"
        onClick={() => {
          router.push("/settings");
        }}>
          <MenuIcon />
        </button>
      </div>

      {/* Center - Logo */}
      <div className="flex items-center space-x-2 cursor-pointer" 
      onClick={() => {
        router.push("/");
      }}>
        <Logo className="h-8 w-8" />
        <span className="text-xl font-normal text-black font-dm-sans">
          ShieldSystems
        </span>
      </div>

      {/* Right side - Notifications or Chat History */}
      <div className="flex items-center">
        {pathname === "/" && (
          <button className="hover:bg-icons-bg rounded-lg transition-colors cursor-pointer"
          onClick={() => {
            router.push("/notifications");
          }}>
            <BellIcon />
          </button>
        )}
        {pathname === "/chat" && (
          <button className="hover:bg-icons-bg rounded-lg transition-colors cursor-pointer"
          onClick={() => {
            router.push("/chat-history");
          }}>
            <MoreDotsIcon />
          </button>
        )}
      </div>
    </div>
  );
};