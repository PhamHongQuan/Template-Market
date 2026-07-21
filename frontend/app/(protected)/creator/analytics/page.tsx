"use client";

import { useState } from "react";
import { 
    BarChart3, 
    Eye, 
    Download, 
    TrendingUp, 
    Calendar, 
    ArrowUpRight, 
    Layers,
    UserCheck
} from "lucide-react";
import StatsCard from "@/components/creator/StatsCard";

export default function AnalyticsPage() {
    const [timeRange, setTimeRange] = useState("7d");

    // Mock data for analytics
    const stats = {
        views: { title: "Total Views", value: "24,890", trend: "+12.3%" },
        downloads: { title: "Downloads", value: "1,420", trend: "+8.5%" },
        conversion: { title: "Conversion Rate", value: "5.7%", trend: "+2.1%" },
        revenue: { title: "Est. Earnings", value: "$4,250", trend: "+15.2%" }
    };

    // Custom charts using clean SVG structures for rich look
    const chartData = [
        { day: "Mon", views: 400, downloads: 40 },
        { day: "Tue", views: 800, downloads: 90 },
        { day: "Wed", views: 600, downloads: 70 },
        { day: "Thu", views: 1200, downloads: 140 },
        { day: "Fri", views: 900, downloads: 100 },
        { day: "Sat", views: 1400, downloads: 190 },
        { day: "Sun", views: 1600, downloads: 220 },
    ];

    const topTemplates = [
        { id: 1, title: "Modern Portfolio Next.js", views: 5600, downloads: 410, revenue: "$1,640" },
        { id: 2, title: "SaaS Dashboard Tailwind", views: 4200, downloads: 350, revenue: "$1,400" },
        { id: 3, title: "E-Commerce Frontend Kit", views: 3800, downloads: 280, revenue: "$980" },
        { id: 4, title: "Minimalist Blog Template", views: 1900, downloads: 120, revenue: "$0" },
    ];

    return (
        <main className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Analytics</h1>
                    <p className="text-base-content/60 mt-1">
                        Track the performance of your store and templates.
                    </p>
                </div>

                <div className="flex items-center gap-2 bg-base-100 p-1.5 rounded-xl border">
                    <button 
                        onClick={() => setTimeRange("7d")}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${timeRange === "7d" ? "bg-primary text-primary-content" : "hover:bg-base-200"}`}
                    >
                        7 Days
                    </button>
                    <button 
                        onClick={() => setTimeRange("30d")}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${timeRange === "30d" ? "bg-primary text-primary-content" : "hover:bg-base-200"}`}
                    >
                        30 Days
                    </button>
                    <button 
                        onClick={() => setTimeRange("12m")}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${timeRange === "12m" ? "bg-primary text-primary-content" : "hover:bg-base-200"}`}
                    >
                        12 Months
                    </button>
                </div>
            </div>

            {/* Stats Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="relative group overflow-hidden rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                    <div className="flex justify-between items-start">
                        <div>
                            <span className="text-xs font-semibold tracking-wider text-base-content/50 uppercase">Total Views</span>
                            <h3 className="text-3xl font-bold mt-2">{stats.views.value}</h3>
                            <span className="inline-flex items-center gap-1 text-xs text-success font-semibold mt-2">
                                <TrendingUp size={12} /> {stats.views.trend} vs last week
                            </span>
                        </div>
                        <div className="rounded-xl bg-blue-500/10 p-3 text-blue-500">
                            <Eye size={24} />
                        </div>
                    </div>
                </div>

                <div className="relative group overflow-hidden rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                    <div className="flex justify-between items-start">
                        <div>
                            <span className="text-xs font-semibold tracking-wider text-base-content/50 uppercase">Downloads</span>
                            <h3 className="text-3xl font-bold mt-2">{stats.downloads.value}</h3>
                            <span className="inline-flex items-center gap-1 text-xs text-success font-semibold mt-2">
                                <TrendingUp size={12} /> {stats.downloads.trend} vs last week
                            </span>
                        </div>
                        <div className="rounded-xl bg-green-500/10 p-3 text-green-500">
                            <Download size={24} />
                        </div>
                    </div>
                </div>

                <div className="relative group overflow-hidden rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                    <div className="flex justify-between items-start">
                        <div>
                            <span className="text-xs font-semibold tracking-wider text-base-content/50 uppercase">Conversion Rate</span>
                            <h3 className="text-3xl font-bold mt-2">{stats.conversion.value}</h3>
                            <span className="inline-flex items-center gap-1 text-xs text-success font-semibold mt-2">
                                <TrendingUp size={12} /> {stats.conversion.trend} vs last week
                            </span>
                        </div>
                        <div className="rounded-xl bg-purple-500/10 p-3 text-purple-500">
                            <UserCheck size={24} />
                        </div>
                    </div>
                </div>

                <div className="relative group overflow-hidden rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                    <div className="flex justify-between items-start">
                        <div>
                            <span className="text-xs font-semibold tracking-wider text-base-content/50 uppercase">Estimated Earnings</span>
                            <h3 className="text-3xl font-bold mt-2">{stats.revenue.value}</h3>
                            <span className="inline-flex items-center gap-1 text-xs text-success font-semibold mt-2">
                                <TrendingUp size={12} /> {stats.revenue.trend} vs last week
                            </span>
                        </div>
                        <div className="rounded-xl bg-yellow-500/10 p-3 text-yellow-500">
                            <BarChart3 size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Performance Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Traffic Trend Chart */}
                <div className="card bg-base-100 border border-base-300 shadow-sm lg:col-span-2">
                    <div className="card-body">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="card-title text-lg font-bold">Traffic & Conversion Trend</h3>
                                <p className="text-xs text-base-content/50">Daily views vs downloads count</p>
                            </div>
                            <div className="flex gap-4 text-xs">
                                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-blue-500 inline-block"></span> Views</span>
                                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-green-500 inline-block"></span> Downloads</span>
                            </div>
                        </div>

                        {/* Beautiful Visual SVG Chart mock */}
                        <div className="relative h-64 w-full flex items-end justify-between pt-6 border-b border-l border-base-300">
                            {chartData.map((data, index) => {
                                const viewsHeight = `${(data.views / 1800) * 100}%`;
                                const downloadsHeight = `${(data.downloads / 250) * 100}%`;

                                return (
                                    <div key={index} className="flex-1 flex flex-col items-center group relative h-full justify-end px-2">
                                        {/* Tooltip */}
                                        <div className="absolute bottom-full mb-2 bg-neutral text-neutral-content text-[10px] p-2 rounded shadow opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10 flex flex-col gap-0.5">
                                            <span className="font-bold">{data.day}</span>
                                            <span>Views: {data.views}</span>
                                            <span>Downloads: {data.downloads}</span>
                                        </div>

                                        {/* Bars Container */}
                                        <div className="w-full flex items-end justify-center gap-1 h-full">
                                            <div 
                                                style={{ height: viewsHeight }} 
                                                className="w-4 sm:w-6 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t transition-all duration-500 hover:brightness-110"
                                            />
                                            <div 
                                                style={{ height: downloadsHeight }} 
                                                className="w-4 sm:w-6 bg-gradient-to-t from-green-600 to-green-400 rounded-t transition-all duration-500 hover:brightness-110"
                                            />
                                        </div>

                                        {/* Label */}
                                        <span className="text-xs text-base-content/60 mt-2">{data.day}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Performance Breakdown Circular */}
                <div className="card bg-base-100 border border-base-300 shadow-sm">
                    <div className="card-body flex flex-col justify-between">
                        <div>
                            <h3 className="card-title text-lg font-bold">Category Distribution</h3>
                            <p className="text-xs text-base-content/50">Downloads grouped by categories</p>
                        </div>

                        {/* Circular graphic */}
                        <div className="flex justify-center items-center py-6">
                            <div className="relative w-40 h-40 flex items-center justify-center">
                                {/* SVG Circle Progress Ring representing categories mock */}
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="80" cy="80" r="70" stroke="oklch(var(--b2))" strokeWidth="16" fill="transparent" />
                                    {/* Category 1: Next.js - 55% */}
                                    <circle cx="80" cy="80" r="70" stroke="oklch(var(--p))" strokeWidth="16" fill="transparent" 
                                        strokeDasharray="439.8" strokeDashoffset="197.9" strokeLinecap="round" />
                                    {/* Category 2: Tailwind - 30% */}
                                    <circle cx="80" cy="80" r="70" stroke="oklch(var(--s))" strokeWidth="16" fill="transparent" 
                                        strokeDasharray="439.8" strokeDashoffset="307.8" strokeLinecap="round" className="transform origin-center rotate-198" />
                                </svg>
                                <div className="absolute text-center">
                                    <span className="text-2xl font-black">1.4K</span>
                                    <span className="block text-[10px] text-base-content/50 uppercase tracking-wider">Downloads</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between items-center">
                                <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-primary inline-block"></span> Next.js Templates</span>
                                <span className="font-bold">55%</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-secondary inline-block"></span> Tailwind UI Kits</span>
                                <span className="font-bold">30%</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-neutral inline-block"></span> Other Templates</span>
                                <span className="font-bold">15%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Top Templates Leaderboard */}
            <div className="card bg-base-100 border border-base-300 shadow-sm">
                <div className="card-body">
                    <h3 className="card-title text-lg font-bold mb-4">Top Performing Templates</h3>
                    
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>Template Name</th>
                                    <th>Views</th>
                                    <th>Downloads</th>
                                    <th>Conversion</th>
                                    <th>Revenue</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topTemplates.map((item) => (
                                    <tr key={item.id} className="hover:bg-base-200/50 transition-colors">
                                        <td className="font-medium text-base-content">{item.title}</td>
                                        <td>{item.views.toLocaleString()}</td>
                                        <td>{item.downloads.toLocaleString()}</td>
                                        <td>
                                            <div className="flex items-center gap-2">
                                                <div className="w-16 bg-base-300 rounded-full h-2">
                                                    <div 
                                                        className="bg-primary h-2 rounded-full" 
                                                        style={{ width: `${(item.downloads / item.views) * 100 * 10}%` }}
                                                    />
                                                </div>
                                                <span className="text-xs font-semibold">
                                                    {((item.downloads / item.views) * 100).toFixed(1)}%
                                                </span>
                                            </div>
                                        </td>
                                        <td className="font-bold text-success">{item.revenue}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
}
