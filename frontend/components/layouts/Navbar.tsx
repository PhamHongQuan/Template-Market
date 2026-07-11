"use client";

import {
  ChevronDown,
  Search,
  User,
  Sun,
  Moon,
  ShoppingCart,
  LogOut
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { User as UserType } from "../../types/auth";
import { useRouter } from "next/dist/client/components/navigation";
import authService from "@/services/auth.service";
import { useAuthStore } from "@/stores/auth.store";

export default function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);


  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    sessionStorage.setItem("theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  }

  const handleLogout = async () => {
    try {
      await authService.logout();

      logout();

      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-base-200/80 bg-base-100/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 text-base-content">
          <div className="h-9 w-9 bg-neutral text-neutral-content rounded-lg flex items-center justify-center font-bold tracking-wider">
            DC
          </div>
          <div>
            <span className="font-semibold text-lg tracking-tight">DevCraft</span>
          </div>
        </Link>

        {/* Action controls */}
        <div className="flex items-center gap-6">

          {/* Search Toggle (Desktop only shortcut label indicator) */}
          <div className="relative hidden lg:block w-78">
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-base-content/40">
              <Search size={20} />
            </span>
            <input
              type="text"
              placeholder="Quick search..."
              className="w-full text-xs py-1.5 pl-10 pr-7 bg-base-200 border-none rounded-md focus:outline-none focus:ring-1 focus:ring-base-content/20 transition-all font-mono"
            />
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle btn-sm text-base-content/80 hover:bg-base-200"
            aria-label="Toggle theme">
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Cart Button */}
          {/* <div className="relative">
            <button
              className="btn btn-ghost btn-circle btn-sm text-base-content/80 hover:bg-base-200 relative"
              aria-label="Open shopping cart"
            > Cart
              <ShoppingCart size={18} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-neutral text-[9px] font-bold text-neutral-content animate-pulse">
                  {cart.length}
                </span>
              )}
            </button>
          </div> */}


          {/* Auth Links */}
          <div className="hidden sm:flex items-center gap-2">
            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-2 py-2 cursor-pointer text-base-content/80 hover:text-base-content transition-colors">
                  <User size={18} />
                  <span className="text-sm font-medium">{user.name}</span>
                  <ChevronDown
                    size={16}
                    className="transition-transform group-hover:rotate-180"
                  />
                </button>

                <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-base-300 bg-base-100 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <Link
                    href="/cart"
                    className="flex items-center gap-2 px-4 py-3 hover:bg-base-200"
                  >
                    <ShoppingCart size={16} />
                    Cart
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-3 hover:bg-base-200 text-red-500 cursor-pointer"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/login" className="py-2">
                Login
              </Link>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}


