import {
    DollarSign,
    Download,
    Eye,
    Package,
} from "lucide-react";

import DashboardHeader from "@/components/creator/DashboardHeader";
import StatsCard from "@/components/creator/StatsCard";
import RecentTemplateCard from "@/components/creator/RecentTemplateCard";

const recentTemplates = [
    {
        id: 1,
        title: "Modern Portfolio",
        category: "Portfolio",
        thumbnail: "https://placehold.co/600x400",
        downloads: 124,
        views: 912,
    },
    {
        id: 2,
        title: "Business Landing",
        category: "Business",
        thumbnail: "https://placehold.co/600x400",
        downloads: 86,
        views: 643,
    },
    {
        id: 3,
        title: "Restaurant UI",
        category: "Landing Page",
        thumbnail: "https://placehold.co/600x400",
        downloads: 52,
        views: 301,
    },
];

export default function CreatorDashboardPage() {
    return (
        <main className="p-8">

            <DashboardHeader />

            <section className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                <StatsCard
                    title="Templates"
                    value="12"
                    icon={<Package size={20} />}
                />

                <StatsCard
                    title="Downloads"
                    value="2,431"
                    icon={<Download size={20} />}
                />

                <StatsCard
                    title="Views"
                    value="18,942"
                    icon={<Eye size={20} />}
                />

                <StatsCard
                    title="Revenue"
                    value="$1,280"
                    icon={<DollarSign size={20} />}
                />

            </section>

            <section className="mt-10">

                <div className="flex items-center justify-between mb-5">

                    <h2 className="text-xl font-bold">
                        Recent Templates
                    </h2>

                </div>

                <div className="grid gap-6 lg:grid-cols-3">

                    {recentTemplates.map((template) => (
                        <RecentTemplateCard
                            key={template.id}
                            {...template}
                        />
                    ))}

                </div>

            </section>

        </main>
    );
}