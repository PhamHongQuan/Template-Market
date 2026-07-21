"use client";

import { useState } from "react";
import { 
    DollarSign, 
    TrendingUp, 
    ArrowUpRight, 
    ArrowDownLeft, 
    Wallet, 
    CreditCard, 
    Send,
    CheckCircle,
    Clock
} from "lucide-react";

export default function EarningsPage() {
    const [withdrawAmount, setWithdrawAmount] = useState("");
    const [requesting, setRequesting] = useState(false);

    // Mock data for earnings
    const balance = {
        available: 1250.50,
        lifetime: 5430.00,
        pending: 350.00,
        lastPayout: 800.00
    };

    const transactions = [
        { id: "TXN-9021", date: "2026-07-15", type: "sale", desc: "SaaS Dashboard Tailwind (Sale)", amount: 35.00, status: "completed" },
        { id: "TXN-9020", date: "2026-07-14", type: "sale", desc: "Modern Portfolio Next.js (Sale)", amount: 49.00, status: "completed" },
        { id: "TXN-8991", date: "2026-07-10", type: "payout", desc: "Withdrawal to Paypal (....@gmail.com)", amount: -800.00, status: "completed" },
        { id: "TXN-8954", date: "2026-07-08", type: "sale", desc: "E-Commerce Frontend Kit (Sale)", amount: 79.00, status: "completed" },
        { id: "TXN-8923", date: "2026-07-05", type: "sale", desc: "SaaS Dashboard Tailwind (Sale)", amount: 35.00, status: "completed" },
        { id: "TXN-8901", date: "2026-07-01", type: "payout", desc: "Withdrawal to Bank Account", amount: -450.00, status: "completed" },
    ];

    const handleWithdrawSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const amt = parseFloat(withdrawAmount);
        if (isNaN(amt) || amt <= 0) {
            alert("Please enter a valid withdrawal amount.");
            return;
        }
        if (amt > balance.available) {
            alert("Amount exceeds your available balance.");
            return;
        }

        setRequesting(true);
        setTimeout(() => {
            alert(`Withdrawal request for $${amt} submitted successfully.`);
            setWithdrawAmount("");
            setRequesting(false);
        }, 1200);
    };

    return (
        <main className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold">Earnings & Payouts</h1>
                <p className="text-base-content/60 mt-1">
                    Manage your balance, request payouts, and view transaction history.
                </p>
            </div>

            {/* Balances Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Available */}
                <div className="relative group overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-base-100 p-6 shadow-sm transition-all duration-300">
                    <div className="flex justify-between items-start">
                        <div>
                            <span className="text-xs font-semibold tracking-wider text-primary uppercase">Available Balance</span>
                            <h3 className="text-4xl font-extrabold mt-2 text-base-content">${balance.available.toLocaleString(undefined, {minimumFractionDigits: 2})}</h3>
                            <p className="text-xs text-base-content/50 mt-2">Ready to withdraw anytime</p>
                        </div>
                        <div className="rounded-xl bg-primary text-primary-content p-3 shadow-md">
                            <Wallet size={24} />
                        </div>
                    </div>
                </div>

                {/* Lifetime */}
                <div className="relative group overflow-hidden rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                    <div className="flex justify-between items-start">
                        <div>
                            <span className="text-xs font-semibold tracking-wider text-base-content/50 uppercase">Lifetime Earnings</span>
                            <h3 className="text-3xl font-bold mt-2">${balance.lifetime.toLocaleString(undefined, {minimumFractionDigits: 2})}</h3>
                            <span className="inline-flex items-center gap-1 text-xs text-success font-semibold mt-2">
                                <TrendingUp size={12} /> +18.4% growth this month
                            </span>
                        </div>
                        <div className="rounded-xl bg-success/10 text-success p-3">
                            <DollarSign size={24} />
                        </div>
                    </div>
                </div>

                {/* Pending */}
                <div className="relative group overflow-hidden rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                    <div className="flex justify-between items-start">
                        <div>
                            <span className="text-xs font-semibold tracking-wider text-base-content/50 uppercase">Pending Clearance</span>
                            <h3 className="text-3xl font-bold mt-2">${balance.pending.toLocaleString(undefined, {minimumFractionDigits: 2})}</h3>
                            <p className="text-xs text-base-content/50 mt-2">Cleared within 7 days of sale</p>
                        </div>
                        <div className="rounded-xl bg-warning/10 text-warning p-3">
                            <Clock size={24} />
                        </div>
                    </div>
                </div>

                {/* Last Payout */}
                <div className="relative group overflow-hidden rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                    <div className="flex justify-between items-start">
                        <div>
                            <span className="text-xs font-semibold tracking-wider text-base-content/50 uppercase">Last Payout</span>
                            <h3 className="text-3xl font-bold mt-2">${balance.lastPayout.toLocaleString(undefined, {minimumFractionDigits: 2})}</h3>
                            <p className="text-xs text-base-content/50 mt-2">Processed on July 10, 2026</p>
                        </div>
                        <div className="rounded-xl bg-blue-500/10 text-blue-500 p-3">
                            <CreditCard size={24} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Withdraw Form */}
                <div className="card bg-base-100 border border-base-300 shadow-sm lg:col-span-1">
                    <div className="card-body">
                        <h3 className="card-title text-lg font-bold border-b pb-3 mb-4">Request Withdrawal</h3>
                        
                        <form onSubmit={handleWithdrawSubmit} className="space-y-5">
                            <div>
                                <label className="label">
                                    <span className="label-text font-medium">Select Payout Method</span>
                                </label>
                                <select className="select select-bordered w-full">
                                    <option>PayPal (....@gmail.com)</option>
                                    <option>Bank Account (Vietinbank)</option>
                                    <option>Payoneer</option>
                                </select>
                            </div>

                            <div>
                                <label className="label">
                                    <span className="label-text font-medium">Amount to Withdraw ($)</span>
                                    <span className="label-text-alt text-primary font-semibold cursor-pointer" onClick={() => setWithdrawAmount(balance.available.toString())}>
                                        Withdraw Max
                                    </span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-base-content/50">$</span>
                                    <input 
                                        type="number" 
                                        step="0.01" 
                                        min="1"
                                        max={balance.available}
                                        placeholder="0.00" 
                                        className="input input-bordered w-full pl-8"
                                        value={withdrawAmount}
                                        onChange={(e) => setWithdrawAmount(e.target.value)}
                                        required
                                    />
                                </div>
                                <label className="label mt-1">
                                    <span className="label-text-alt text-base-content/50">Minimum withdrawal: $10.00</span>
                                </label>
                            </div>

                            <button 
                                type="submit" 
                                className="btn btn-primary w-full shadow-md gap-2"
                                disabled={requesting || balance.available < 10}
                            >
                                {requesting ? (
                                    <span className="loading loading-spinner loading-sm"></span>
                                ) : (
                                    <>
                                        <Send size={16} /> Submit Request
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Transaction list */}
                <div className="card bg-base-100 border border-base-300 shadow-sm lg:col-span-2">
                    <div className="card-body">
                        <h3 className="card-title text-lg font-bold border-b pb-3 mb-4">Transaction History</h3>

                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Details</th>
                                        <th>Status</th>
                                        <th className="text-right">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map((txn) => (
                                        <tr key={txn.id} className="hover:bg-base-200/50 transition-colors">
                                            <td className="text-xs text-base-content/60">{txn.date}</td>
                                            <td>
                                                <div className="font-semibold text-sm">{txn.desc}</div>
                                                <div className="text-[10px] text-base-content/50">{txn.id}</div>
                                            </td>
                                            <td>
                                                <span className={`badge badge-sm gap-1 ${txn.status === "completed" ? "badge-success" : "badge-warning"}`}>
                                                    {txn.status === "completed" ? <CheckCircle size={10} /> : <Clock size={10} />}
                                                    {txn.status}
                                                </span>
                                            </td>
                                            <td className={`font-bold text-right ${txn.amount > 0 ? "text-success" : "text-base-content"}`}>
                                                {txn.amount > 0 ? `+$${txn.amount.toFixed(2)}` : `-$${Math.abs(txn.amount).toFixed(2)}`}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
