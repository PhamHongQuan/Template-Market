import Link from "next/link";

export default function RegisterPage() {
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
                />

                <label className="label mt-2">Email</label>
                <input
                    type="email"
                    className="input w-full"
                    placeholder="Enter your email"
                />

                <label className="label mt-2">Password</label>
                <input
                    type="password"
                    className="input w-full"
                    placeholder="Enter your password"
                />

                <label className="label mt-2">Confirm Password</label>
                <input
                    type="password"
                    className="input w-full"
                    placeholder="Confirm your password"
                />

                <button className="btn btn-neutral w-full mt-6">
                    Create Account
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