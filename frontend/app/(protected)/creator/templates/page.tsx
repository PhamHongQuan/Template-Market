import Link from "next/link";
import SearchBar from "@/components/creator/templates/SearchBar";
import FilterBar from "@/components/creator/templates/FilterBar";
import TemplateGrid from "@/components/creator/templates/TemplateGrid";
import Button from "@/components/ui/Button";

export default function MyTemplatesPage() {
    return (
        <main className="max-w-7xl mx-auto p-8">

            <div className="flex items-center justify-between mb-8">

                <div>
                    <h1 className="text-3xl font-bold">
                        My Templates
                    </h1>

                    <p className="text-base-content/60 mt-2">
                        Manage all templates you've uploaded.
                    </p>
                </div>

                <Link href="/creator/upload">
                    <Button>
                        Upload Template
                    </Button>
                </Link>

            </div>

            <div className="space-y-6">

                <SearchBar />

                <FilterBar />

                <TemplateGrid />

            </div>

        </main>
    );
}