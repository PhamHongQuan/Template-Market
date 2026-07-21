"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    User,
    ShoppingBag,
    Download,
    Heart,
    Settings,
    LogOut,
} from "lucide-react";
import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "next/dist/client/components/navigation";
import authService from "@/services/auth.service";
import { useHydration } from "@/app/hooks/useHydration";
import { Camera } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import userService from "@/services/user.service";
import { alert } from "@/lib/alert";

const menus = [
    {
        title: "Overview",
        href: "/profile",
        icon: User,
    },
    {
        title: "Purchased",
        href: "/profile/purchased",
        icon: ShoppingBag,
    },
    {
        title: "Downloads",
        href: "/profile/downloads",
        icon: Download,
    },
    {
        title: "Wishlist",
        href: "/profile/wishlist",
        icon: Heart,
    },
    {
        title: "Settings",
        href: "/profile/settings",
        icon: Settings,
    },
];

export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const hydrated = useHydration();
    const pathname = usePathname();
    const user = useAuthStore((state) => state.user);
    const setUser = useAuthStore((state) => state.setUser);
    const inputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);

    const router = useRouter();

    useEffect(() => {
        authService
            .me()
            .then((response) => setUser(response.data))
            .catch(() => { });
    }, [setUser]);
    const logout = useAuthStore((state) => state.logout);

    if (!hydrated) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    const handleLogout = async () => {
        try {
            authService.logout();
            logout();
            router.push("/");
        } catch (error) {
            console.error(error);
        }
    };


    const handleAvatarChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const file = e.target.files?.[0];

        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            alert.error("Avatar must be less than 2MB.");
            return;
        }

        const formData = new FormData();
        formData.append("avatar", file);

        try {
            setUploading(true);
            const response = await userService.updateAvatar(formData);
            setUser(response.data);
            alert.success("Avatar updated successfully.");
        } catch (error: any) {
            alert.error(error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-5 py-8">
            <div className="grid grid-cols-12 gap-8">

                {/* Sidebar */}

                <aside className="col-span-12 lg:col-span-4 xl:col-span-3">

                    <div className="sticky top-24 rounded-2xl border border-base-300 bg-base-100 shadow-sm">

                        <div className="p-8">

                            <div className="flex flex-col items-center">

                                <div className="relative">

                                    <Image
                                        src={user?.avatar || "/avatar.png"}
                                        alt="Avatar"
                                        width={112}
                                        height={112}
                                        priority
                                        className="w-24 h-24 rounded-full object-cover border"
                                    />

                                    <button
                                        type="button"
                                        className="btn btn-circle btn-primary btn-xs absolute bottom-0 right-0"
                                        onClick={() => inputRef.current?.click()}
                                        disabled={uploading}
                                    >
                                        <Camera size={14} />
                                    </button>

                                    <input
                                        ref={inputRef}
                                        hidden
                                        type="file"
                                        accept="image/*"
                                        onChange={handleAvatarChange}
                                    />

                                </div>

                                <h2 className="mt-5 text-xl font-semibold">
                                    {user?.name}
                                </h2>

                                <p className="mt-1 text-sm text-base-content/60">
                                    {user?.email}
                                </p>

                                <div className="badge badge-outline mt-4">
                                    Member
                                </div>

                            </div>

                            <div className="divider" />

                            <ul className="menu w-full">

                                {menus.map((item) => {
                                    const Icon = item.icon;

                                    const isActive =
                                        item.href === "/profile"
                                            ? pathname === "/profile"
                                            : pathname.startsWith(item.href);

                                    return (
                                        <li key={item.href}>
                                            <Link
                                                href={item.href}
                                                className={`flex h-12 items-center gap-3 rounded-xl px-4 transition-all ${isActive
                                                        ? "bg-neutral text-neutral-content"
                                                        : "hover:bg-base-200"
                                                    }`}
                                            >
                                                <Icon size={20} />
                                                {item.title}
                                            </Link>
                                        </li>
                                    );
                                })}

                            </ul>

                            <div className="divider" />

                            <button
                                className="btn btn-outline w-full justify-start"
                                onClick={handleLogout}
                            >
                                <LogOut size={18} />
                                Logout
                            </button>

                        </div>

                    </div>

                </aside>

                {/* Content */}

                <main className="col-span-12 lg:col-span-9">
                    {children}
                </main>

            </div>
        </div>
    );
}