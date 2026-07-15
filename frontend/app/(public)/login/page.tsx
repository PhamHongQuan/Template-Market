"use client";

import { useState } from "react";
import Link from "next/link";
import AuthService from "../../../services/auth.service";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../../stores/auth.store";
import Loading from "@/components/ui/Loading";
import { alert } from "@/lib/alert";
import GuestGuard from "@/components/auth/GuestGuard";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const login = useAuthStore((state) => state.login);
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        try {
            const result = await AuthService.login({
                email,
                password,
            });

            login(result.data.user, result.data.access_token);
            router.push("/");
        } catch (err: any) {
            alert.error(
                "Login Failed",
                err.response?.data?.message ?? "Email or password is incorrect."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <GuestGuard>
            <div className="min-h-screen flex items-center justify-center bg-base-100 w-md">
                <fieldset className="fieldset bg-base-200 border border-base-300 rounded-box w-full max-w-lg p-6 shadow-lg">
                    <legend className="fieldset-legend text-lg font-semibold">
                        Login
                    </legend>

                    <label className="label">Email</label>
                    <input
                        type="email"
                        name="email"
                        autoComplete="email"
                        className="input w-full"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label className="label mt-2">Password</label>
                    <input
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        className="input w-full"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className="btn btn-neutral w-full mt-6" onClick={handleLogin}>
                        {loading ? <Loading type="bars" size="sm" /> : "Login"}
                    </button>
                    <button
                        className="btn btn-outline w-full mt-3"
                        onClick={() => AuthService.googleLogin()}
                    >
                        <FcGoogle className="text-xl" />
                        Continue with Google
                    </button>
                    <div className="divider my-6">OR</div>

                    <p className="text-center text-sm text-base-content/70">
                        Don't have an account?{" "}
                        <Link
                            href="/register"
                            className="link link-primary font-medium"
                        >
                            Register
                        </Link>
                    </p>
                </fieldset>
            </div>
        </GuestGuard>
    );
}