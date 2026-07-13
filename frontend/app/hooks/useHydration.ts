"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/auth.store";

export function useHydration() {
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(useAuthStore.persist.hasHydrated());

        const unsubscribe = useAuthStore.persist.onFinishHydration(() => {
            setHydrated(true);
        });

        return unsubscribe;
    }, []);

    return hydrated;
}