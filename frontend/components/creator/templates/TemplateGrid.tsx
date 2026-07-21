"use client";

import { useQuery } from "@tanstack/react-query";

import TemplateService from "@/services/template.service";

import TemplateCard from "./TemplateCard";
import TemplateGridSkeleton from "./skelenton/TemplateGridSkeleton";

export default function TemplateGrid() {
    const {
        data: templates = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["my-templates"],
        queryFn: () => TemplateService.getMyTemplates(),
        select: (res) => res.data,
    });

    if (isLoading) {
        return <TemplateGridSkeleton count={3} />;
    }

    if (isError) {
        return (
            <div className="alert alert-error">
                Failed to load templates.
            </div>
        );
    }

    if (templates.length === 0) {
        return (
            <div className="hero border rounded-xl py-16">
                <div className="hero-content text-center">
                    <div>
                        <h2 className="text-2xl font-bold">
                            No templates yet
                        </h2>

                        <p className="text-base-content/60 mt-2">
                            Upload your first template to start selling.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((template) => (
                <TemplateCard
                    key={template.id}
                    template={template}
                />
            ))}
        </div>
    );
}