"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    LayoutDashboard,
    Package,
    Upload,
    DollarSign,
    BarChart3,
    Settings,
} from "lucide-react";

const menus = [
    {
        title: "Dashboard",
        href: "/creator",
        icon: LayoutDashboard,
    },
    {
        title: "My Templates",
        href: "/creator/templates",
        icon: Package,
    },
    {
        title: "Upload Template",
        href: "/creator/upload",
        icon: Upload,
    },
    {
        title: "Analytics",
        href: "/creator/analytics",
        icon: BarChart3,
    },
    {
        title: "Earnings",
        href: "/creator/earnings",
        icon: DollarSign,
    },
    {
        title: "Settings",
        href: "/creator/settings",
        icon: Settings,
    },
];

export default function CreatorSidebar() {

    const pathname = usePathname();

    return (

        <aside className="w-72 min-h-full bg-base-100">

            <div className="p-6">

                <h1 className="font-bold text-2xl">

                    Temp Market

                </h1>

                <p className="text-sm opacity-60">

                    Creator Dashboard

                </p>

            </div>

            <ul className="menu">

                {menus.map((menu) => {

                    const Icon = menu.icon;

                    return (

                        <li key={menu.href}>

                            <Link
                                href={menu.href}
                                className={
                                    pathname === menu.href
                                        ? "active"
                                        : ""
                                }
                            >

                                <Icon size={18} />

                                {menu.title}

                            </Link>

                        </li>

                    );
                })}

            </ul>

        </aside>

    );
}