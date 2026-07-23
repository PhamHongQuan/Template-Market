"use client";

import {
  ChevronDown,
  Search,
  User,
  Sun,
  Moon,
  Palette,
  LogOut,
  ShoppingCart
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/dist/client/components/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { useCartStore } from "@/stores/cart.store";


export default function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  const cart = useCartStore((state) => state.cart);
  const openDrawer = useCartStore((state) => state.openDrawer);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  }

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

          {/* Auth Links */}
          <div className="hidden sm:flex items-center gap-2">
            {user && (
              <button
                onClick={openDrawer}
                className="btn btn-ghost btn-circle relative"
                aria-label="Shopping cart"
              >
                <ShoppingCart size={18} />

                {(cart?.items.length ?? 0) > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-5 h-5 rounded-full bg-neutral text-neutral-content text-[10px] flex items-center justify-center px-1 font-bold">
                    {cart!.items.length}
                  </span>
                )}
              </button>
            )}

            {user ? (
              <div className="relative group">
                {/* Trigger */}
                <div className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 transition-colors hover:bg-base-200">
                  <User size={18} />

                  <span className="text-sm font-medium">
                    {user.name}
                  </span>

                  <ChevronDown
                    size={16}
                    className="transition-transform duration-200 group-hover:rotate-180"
                  />
                </div>

                {/* Dropdown */}
                <div className="invisible absolute right-0 top-full z-50 mt-2 w-44 translate-y-2 rounded-xl border border-base-300 bg-base-100 p-2 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-base-200"
                  >
                    <User size={16} />
                    Profile
                  </Link>

                  <Link
                    href="/creator"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-base-200"
                  >
                    <Palette size={16} />
                    Creator
                  </Link>

                  <button
                    onClick={() => {
                      useAuthStore.getState().logout();
                      router.push("/login");
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-base-200 cursor-pointer"
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


