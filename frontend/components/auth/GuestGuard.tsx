"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { useHydration } from "@/app/hooks/useHydration";

export default function GuestGuard({
    children,
}: {
    children: ReactNode;
}) {
    const router = useRouter();

    const hydrated = useHydration();
    const token = useAuthStore((state) => state.token);

    useEffect(() => {
        if (!hydrated) return;

        if (token) {
            router.replace("/");
        }
    }, [hydrated, token, router]);

    if (!hydrated) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (token) return null;

    return <>{children}</>;
}