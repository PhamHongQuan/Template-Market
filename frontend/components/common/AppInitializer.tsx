"use client";

import { useEffect } from "react";

import { useAuthStore } from "@/stores/auth.store";
import { useCartStore } from "@/stores/cart.store";

export default function AppInitializer({
    children,
}: {
    children: React.ReactNode;
}) {
    const token = useAuthStore((state) => state.token);
    const fetchCart = useCartStore((state) => state.fetchCart);

    useEffect(() => {
        if (token) {
            fetchCart();
        }
    }, [token, fetchCart]);

    return <>{children}</>;
}