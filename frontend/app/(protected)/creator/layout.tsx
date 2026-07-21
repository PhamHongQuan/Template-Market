import { ReactNode } from "react";
import CreatorSidebar from "@/components/creator/CreatorSidebar";

export default function CreatorLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div className="drawer lg:drawer-open min-h-screen bg-base-200">
            <input
                id="creator-drawer"
                type="checkbox"
                className="drawer-toggle"
            />

            <div className="drawer-content">
                {children}
            </div>

            <div className="drawer-side">
                <label
                    htmlFor="creator-drawer"
                    className="drawer-overlay"
                />

                <CreatorSidebar />
            </div>
        </div>
    );
}