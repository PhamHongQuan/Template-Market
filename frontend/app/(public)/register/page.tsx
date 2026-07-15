"use client";

import Loading from "@/components/ui/Loading";
import Link from "next/link";
import { useState } from "react";
import AuthService from "../../../services/auth.service";
import { alert } from "@/lib/alert";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";


export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const login = useAuthStore((state) => state.login);
    const router = useRouter();

    const handleRegister = async () => {
        if (!name || !email || !password || !confirmPassword) {
            alert.warning("Validation", "Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            alert.warning("Validation", "Password confirmation does not match.");
            return;
        }

        setLoading(true);

        try {
            const result = await AuthService.register({
                name,
                email,
                password,
                password_confirmation: confirmPassword,
            });

            login(result.data.user, result.data.access_token);

            alert.success(
                "Registration Successful",
            );

            router.push("/");
        } catch (err: any) {
            alert.error(
                "Registration Failed",
                err.message ?? "An error occurred while registering."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-100 w-md">
            <fieldset className="fieldset bg-base-200 border border-base-300 rounded-box w-full max-w-lg p-6 shadow-lg">
                <legend className="fieldset-legend text-lg font-semibold">
                    Register
                </legend>

                <label className="label">Full Name</label>
                <input
                    type="text"
                    className="input w-full"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <label className="label mt-2">Email</label>
                <input
                    type="email"
                    className="input w-full"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label className="label mt-2">Password</label>
                <input
                    type="password"
                    className="input w-full"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <label className="label mt-2">Confirm Password</label>
                <input
                    type="password"
                    className="input w-full"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button className="btn btn-neutral w-full mt-6"
                    onClick={handleRegister}
                >
                    {loading ? <Loading type="bars" size="sm" /> : "Register"}
                </button>

                <div className="divider my-6">OR</div>

                <p className="text-center text-sm text-base-content/70">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="link link-primary font-medium"
                    >
                        Login
                    </Link>
                </p>
            </fieldset>
        </div>
    );
}