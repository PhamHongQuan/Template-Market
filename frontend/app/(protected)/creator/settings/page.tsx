"use client";

import { useState } from "react";
import { 
    Settings, 
    Store, 
    CreditCard, 
    Bell, 
    User, 
    Save, 
    CheckCircle2, 
    AlertCircle 
} from "lucide-react";

export default function CreatorSettingsPage() {
    const [activeTab, setActiveTab] = useState("store");
    const [saving, setSaving] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // Form inputs state
    const [storeName, setStoreName] = useState("Temp Market Store");
    const [storeBio, setStoreBio] = useState("Specialized in React, Next.js and Tailwind CSS templates for modern startups.");
    const [contactEmail, setContactEmail] = useState("creator@example.com");
    const [websiteUrl, setWebsiteUrl] = useState("https://myportfolio.com");

    const [paypalEmail, setPaypalEmail] = useState("paypal.creator@example.com");
    const [bankName, setBankName] = useState("Vietinbank");
    const [accountNum, setAccountNum] = useState("102837482938");
    const [accountName, setAccountName] = useState("PHAM HONG QUAN");

    const [notifyNewSale, setNotifyNewSale] = useState(true);
    const [notifyNewPayout, setNotifyNewPayout] = useState(true);
    const [notifyUpdates, setNotifyUpdates] = useState(false);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setSuccessMessage(null);

        setTimeout(() => {
            setSaving(false);
            setSuccessMessage("Settings saved successfully!");
            setTimeout(() => setSuccessMessage(null), 3000);
        }, 1000);
    };

    return (
        <main className="max-w-4xl mx-auto p-4 md:p-8 space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold flex items-center gap-3">
                    <Settings className="text-primary" size={32} /> Store Settings
                </h1>
                <p className="text-base-content/60 mt-1">
                    Manage store metadata, payout configurations, and notifications.
                </p>
            </div>

            {/* Success toast */}
            {successMessage && (
                <div className="alert alert-success shadow-md">
                    <CheckCircle2 size={20} />
                    <span>{successMessage}</span>
                </div>
            )}

            {/* Tabs Selector */}
            <div className="tabs tabs-boxed bg-base-100 border p-1 rounded-xl">
                <button 
                    onClick={() => setActiveTab("store")}
                    className={`tab flex items-center gap-2 rounded-lg py-2 ${activeTab === "store" ? "tab-active bg-primary text-primary-content" : ""}`}
                >
                    <Store size={16} /> Store Profile
                </button>
                <button 
                    onClick={() => setActiveTab("payout")}
                    className={`tab flex items-center gap-2 rounded-lg py-2 ${activeTab === "payout" ? "tab-active bg-primary text-primary-content" : ""}`}
                >
                    <CreditCard size={16} /> Payout Details
                </button>
                <button 
                    onClick={() => setActiveTab("notifications")}
                    className={`tab flex items-center gap-2 rounded-lg py-2 ${activeTab === "notifications" ? "tab-active bg-primary text-primary-content" : ""}`}
                >
                    <Bell size={16} /> Notifications
                </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
                {/* Store profile settings */}
                {activeTab === "store" && (
                    <div className="card bg-base-100 border border-base-300 shadow-sm">
                        <div className="card-body gap-5">
                            <h3 className="card-title text-lg font-bold border-b pb-3">Store Information</h3>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-semibold">Store Display Name</span>
                                </label>
                                <input 
                                    type="text" 
                                    className="input input-bordered w-full"
                                    value={storeName}
                                    onChange={(e) => setStoreName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-semibold">Store Bio / Description</span>
                                </label>
                                <textarea 
                                    className="textarea textarea-bordered w-full"
                                    rows={4}
                                    value={storeBio}
                                    onChange={(e) => setStoreBio(e.target.value)}
                                    placeholder="Write a short summary about your store"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text font-semibold">Contact Email</span>
                                    </label>
                                    <input 
                                        type="email" 
                                        className="input input-bordered w-full"
                                        value={contactEmail}
                                        onChange={(e) => setContactEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text font-semibold">Website / Portfolio URL</span>
                                    </label>
                                    <input 
                                        type="url" 
                                        className="input input-bordered w-full"
                                        value={websiteUrl}
                                        onChange={(e) => setWebsiteUrl(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Payout configuration */}
                {activeTab === "payout" && (
                    <div className="card bg-base-100 border border-base-300 shadow-sm">
                        <div className="card-body gap-5">
                            <h3 className="card-title text-lg font-bold border-b pb-3">Payout Settings</h3>
                            <p className="text-xs text-base-content/50">Configure where you would like to receive your monthly earnings.</p>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-semibold">PayPal Email Address</span>
                                </label>
                                <input 
                                    type="email" 
                                    className="input input-bordered w-full"
                                    value={paypalEmail}
                                    onChange={(e) => setPaypalEmail(e.target.value)}
                                    placeholder="your-paypal-email@example.com"
                                />
                            </div>

                            <div className="divider">OR BANK TRANSFER</div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text font-semibold">Bank Name</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        className="input input-bordered w-full"
                                        value={bankName}
                                        onChange={(e) => setBankName(e.target.value)}
                                    />
                                </div>

                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text font-semibold">Account Number</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        className="input input-bordered w-full"
                                        value={accountNum}
                                        onChange={(e) => setAccountNum(e.target.value)}
                                    />
                                </div>

                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text font-semibold">Account Owner Name</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        className="input input-bordered w-full uppercase"
                                        value={accountName}
                                        onChange={(e) => setAccountName(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Notifications settings */}
                {activeTab === "notifications" && (
                    <div className="card bg-base-100 border border-base-300 shadow-sm">
                        <div className="card-body gap-5">
                            <h3 className="card-title text-lg font-bold border-b pb-3">Notification Preferences</h3>
                            <p className="text-xs text-base-content/50">Manage how you receive alerts and communications.</p>

                            <div className="space-y-4 mt-2">
                                <div className="flex items-center justify-between border-b pb-4">
                                    <div>
                                        <p className="font-semibold text-sm">Email on New Sales</p>
                                        <p className="text-xs text-base-content/60">Receive an email immediately when someone buys a template.</p>
                                    </div>
                                    <input 
                                        type="checkbox" 
                                        className="toggle toggle-primary" 
                                        checked={notifyNewSale}
                                        onChange={(e) => setNotifyNewSale(e.target.checked)}
                                    />
                                </div>

                                <div className="flex items-center justify-between border-b pb-4">
                                    <div>
                                        <p className="font-semibold text-sm">Email on Successful Payout</p>
                                        <p className="text-xs text-base-content/60">Receive an email when your payout request is processed and cleared.</p>
                                    </div>
                                    <input 
                                        type="checkbox" 
                                        className="toggle toggle-primary" 
                                        checked={notifyNewPayout}
                                        onChange={(e) => setNotifyNewPayout(e.target.checked)}
                                    />
                                </div>

                                <div className="flex items-center justify-between pb-2">
                                    <div>
                                        <p className="font-semibold text-sm">Platform & Product Updates</p>
                                        <p className="text-xs text-base-content/60">Receive emails about new features, guides, and creator tips.</p>
                                    </div>
                                    <input 
                                        type="checkbox" 
                                        className="toggle toggle-primary" 
                                        checked={notifyUpdates}
                                        onChange={(e) => setNotifyUpdates(e.target.checked)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Submit action */}
                <div className="flex justify-end pt-4">
                    <button 
                        type="submit" 
                        className="btn btn-primary min-w-32 shadow-md gap-2"
                        disabled={saving}
                    >
                        {saving ? (
                            <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                            <>
                                <Save size={16} /> Save Settings
                            </>
                        )}
                    </button>
                </div>
            </form>
        </main>
    );
}
