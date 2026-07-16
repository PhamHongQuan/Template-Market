"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import AuthService from "@/services/auth.service";
import Loading from "@/components/ui/Loading";
import { alert } from "@/lib/alert";
import GuestGuard from "@/components/auth/GuestGuard";
import Captcha from "@/components/reCaptcha/Captcha";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const captchaRef = useRef<ReCAPTCHA>(null);
    const [captchaToken, setCaptchaToken] = useState("");

    const handleForgotPassword = async () => {
        if (!email.trim()) {
            alert.warning("Validation", "Please enter your email.");
            return;
        }

        if (!captchaToken) {
            alert.warning(
                "Captcha",
                "Please complete the captcha before logging in."
            );
            return;
        }

        setLoading(true);

        try {
            const result = await AuthService.forgotPassword({
                email,
                recaptcha_token: captchaToken,
            });

            alert.success(
                "Success",
                result.message ??
                    "If the email exists, a password reset link has been sent."
            );

            setEmail("");
        } catch (err: any) {
            alert.error(
                "Failed",
                err.response?.data?.message ?? "Something went wrong."
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
                        Forgot Password
                    </legend>

                    <p className="text-sm text-base-content/70 mb-4">
                        Enter your email address and we'll send you a link to
                        reset your password.
                    </p>

                    <label className="label">Email</label>

                    <input
                        type="email"
                        className="input w-full"
                        placeholder="Enter your email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Captcha
                        ref={captchaRef}
                        onChange={setCaptchaToken}
                    />

                    <button
                        className="btn btn-neutral w-full mt-6"
                        onClick={handleForgotPassword}
                        disabled={loading}
                    >
                        {loading ? (
                            <Loading type="bars" size="sm" />
                        ) : (
                            "Send Reset Link"
                        )}
                    </button>

                    <div className="divider my-6">OR</div>

                    <p className="text-center text-sm text-base-content/70">
                        Remember your password?{" "}
                        <Link
                            href="/login"
                            className="link link-primary font-medium"
                        >
                            Back to Login
                        </Link>
                    </p>
                </fieldset>
            </div>
        </GuestGuard>
    );
}