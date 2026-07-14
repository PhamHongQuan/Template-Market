"use client";

import { useState } from "react";
import { useAuthStore } from "@/stores/auth.store";
import userService from "@/services/user.service";
import { alert } from "@/lib/alert";
import Loading from "@/components/ui/Loading";

export default function SettingsPage() {
    const user = useAuthStore((state) => state.user);
    const [profileLoading, setProfileLoading] = useState(false);
    const [passwordLoading, setPasswordLoading] = useState(false);

    const [name, setName] = useState(user?.name ?? "");
    const [email, setEmail] = useState(user?.email ?? "");
    const [phone, setPhone] = useState(user?.phone ?? "");
    const [bio, setBio] = useState(user?.bio ?? "");

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleUpdateProfile = async () => {
        setProfileLoading(true);
        try {
            const response = await userService.updateProfile({
                name,
                email,
                phone,
                bio,
            });

            useAuthStore.getState().setUser(response.data);

            alert.success("Profile updated successfully.");
        } catch (error: any) {
            alert.error(error.message);
        } finally {
            setProfileLoading(false);
        }
    };

    const handleChangePassword = async () => {
        setPasswordLoading(true);
        try {
            if (newPassword !== confirmPassword) {
                alert.error("Passwords do not match.");
                return;
            }

            await userService.updatePassword({
                current_password: currentPassword,
                password: newPassword,
            });

            alert.success("Password updated successfully.");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error: any) {
            alert.error(error.message);
        } finally {
            setPasswordLoading(false);
        }
    };

    return (
        <div className="space-y-8">

            <div>
                <h1 className="text-4xl font-bold">
                    Settings
                </h1>

                <p className="opacity-70 mt-2">
                    Manage your account settings.
                </p>
            </div>

            {/* Profile */}

            <div className="card bg-base-200 shadow-xl">

                <div className="card-body">

                    <h2 className="card-title">
                        Profile Information
                    </h2>

                    <div className="grid md:grid-cols-2 gap-5 mt-4">

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">
                                Full Name
                            </legend>

                            <input
                                className="input input-bordered w-full"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">
                                Email
                            </legend>

                            <input
                                className="input input-bordered w-full"
                                value={email}
                                readOnly
                            />
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">
                                Phone
                            </legend>

                            <input
                                className="input input-bordered w-full"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </fieldset>
                    </div>

                    <fieldset className="fieldset mt-5">
                        <legend className="fieldset-legend">
                            Bio
                        </legend>

                        <textarea
                            className="textarea textarea-bordered w-full"
                            rows={4}
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                    </fieldset>

                    <button
                        onClick={handleUpdateProfile}
                        className="btn btn-neutral min-w-40"
                        disabled={profileLoading}
                    >
                        {profileLoading ? <Loading type="bars" size="sm" /> : "Save Changes"}
                    </button>

                </div>

            </div>

            {/* Password */}

            <div className="card bg-base-200 shadow-xl">

                <div className="card-body">

                    <h2 className="card-title">
                        Change Password
                    </h2>

                    <p className="text-sm opacity-70">
                        Choose a strong password to keep your account secure.
                    </p>

                    <div className="grid gap-5 mt-4">

                        <fieldset className="fieldset">

                            <legend className="fieldset-legend">
                                Current Password
                            </legend>

                            <input
                                type="password"
                                className="input input-bordered w-full"
                                value={currentPassword}
                                onChange={(e) =>
                                    setCurrentPassword(e.target.value)
                                }
                            />

                        </fieldset>

                        <fieldset className="fieldset">

                            <legend className="fieldset-legend">
                                New Password
                            </legend>

                            <input
                                type="password"
                                className="input input-bordered w-full"
                                value={newPassword}
                                onChange={(e) =>
                                    setNewPassword(e.target.value)
                                }
                            />

                        </fieldset>

                        <fieldset className="fieldset">

                            <legend className="fieldset-legend">
                                Confirm Password
                            </legend>

                            <input
                                type="password"
                                className="input input-bordered w-full"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />

                        </fieldset>

                    </div>


                    <button
                        onClick={handleChangePassword}
                        className="btn btn-neutral min-w-40"
                        disabled={passwordLoading}
                    >
                        {passwordLoading ? <Loading type="bars" size="sm" /> : "Change Password"}
                    </button>


                </div>

            </div>

        </div>
    );
}