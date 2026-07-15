"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import AuthService from "@/services/auth.service";
import GuestGuard from "@/components/auth/GuestGuard";
import Loading from "@/components/ui/Loading";
import { alert } from "@/lib/alert";

export default function ResetPasswordPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [email, setEmail] = useState("");
    const [token, setToken] = useState("");

    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = searchParams.get("token");
        const email = searchParams.get("email");

        if (!token || !email) {
            alert.error(
                "Invalid Link",
                "This password reset link is invalid or has expired."
            );

            router.replace("/login");
            return;
        }

        setToken(token);
        setEmail(email);
    }, [searchParams, router]);

    const handleResetPassword = async () => {
        if (!password || !passwordConfirmation) {
            alert.warning(
                "Validation",
                "Please fill in all required fields."
            );
            return;
        }

        if (password !== passwordConfirmation) {
            alert.warning(
                "Validation",
                "Password confirmation does not match."
            );
            return;
        }

        setLoading(true);

        try {
            const result = await AuthService.resetPassword({
                email,
                token,
                password,
                password_confirmation: passwordConfirmation,
            });

            alert.success(
                "Success",
                result.message ?? "Password has been reset successfully."
            );

            router.replace("/login");
        } catch (err: any) {
            alert.error(
                "Reset Failed",
                err.response?.data?.message ?? "Unable to reset password."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <GuestGuard>
            <div className="min-h-screen flex items-center justify-center bg-base-100">
                <fieldset className="fieldset bg-base-200 border border-base-300 rounded-box w-full max-w-lg p-6 shadow-lg">
                    <legend className="fieldset-legend text-lg font-semibold">
                        Reset Password
                    </legend>

                    <p className="text-sm text-base-content/70 mb-4">
                        Enter your new password below.
                    </p>

                    <label className="label">Email</label>

                    <input
                        type="email"
                        className="input w-full"
                        value={email}
                        readOnly
                    />

                    <label className="label mt-4">
                        New Password
                    </label>

                    <input
                        type="password"
                        className="input w-full"
                        placeholder="New password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <label className="label mt-4">
                        Confirm Password
                    </label>

                    <input
                        type="password"
                        className="input w-full"
                        placeholder="Confirm password"
                        autoComplete="new-password"
                        value={passwordConfirmation}
                        onChange={(e) =>
                            setPasswordConfirmation(e.target.value)
                        }
                    />

                    <button
                        className="btn btn-neutral w-full mt-6"
                        onClick={handleResetPassword}
                        disabled={loading}
                    >
                        {loading ? (
                            <Loading type="bars" size="sm" />
                        ) : (
                            "Reset Password"
                        )}
                    </button>

                    <div className="divider my-6">OR</div>

                    <p className="text-center text-sm text-base-content/70">
                        Back to{" "}
                        <Link
                            href="/login"
                            className="link link-primary font-medium"
                        >
                            Login
                        </Link>
                    </p>
                </fieldset>
            </div>
        </GuestGuard>
    );
}

