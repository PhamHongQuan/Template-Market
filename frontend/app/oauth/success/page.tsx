"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import AuthService from "@/services/auth.service";
import { useAuthStore } from "@/stores/auth.store";
import Loading from "@/components/ui/Loading";

export default function OAuthSuccessPage() {
    const router = useRouter();
    const params = useSearchParams();

    const login = useAuthStore((s) => s.login);
    const setToken = useAuthStore((s) => s.setToken);

    useEffect(() => {
        const handleGoogleLogin = async () => {
            const token = params.get("token");

            if (!token) {
                router.replace("/login");
                return;
            }

            try {
                setToken(token);

                const result = await AuthService.me();

                login(result.data, token);

                router.replace("/");
            } catch {
                useAuthStore.getState().logout();

                router.replace("/login");
            }
        };

        handleGoogleLogin();
    }, [params, router, login, setToken]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Loading type="bars" size="lg" />
        </div>
    );
}