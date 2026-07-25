import React from "react";
import { Package } from "lucide-react";
import { Template } from "@/types/template";
import TemplateCard from "@/components/common/TemplateCard";
import SkeletonCard from "@/components/common/SkeletonCard";

interface TemplateGridProps {
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
  templatesList: Template[];
  onInspect: (template: Template) => void;
  onAddToCart: (template: Template, e?: React.MouseEvent) => void;
  clearFilters: () => void;
}

export default function TemplateGrid({
  isLoading,
  isError,
  refetch,
  templatesList,
  onInspect,
  onAddToCart,
  clearFilters,
}: TemplateGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-16 border border-dashed border-rose-200 rounded-2xl bg-rose-50/10">
        <Package size={40} className="mx-auto text-rose-400 animate-pulse" />
        <h3 className="mt-4 text-base font-bold text-base-content">
          Could not load templates
        </h3>
        <p className="mt-2 text-xs text-base-content/50 max-w-xs mx-auto">
          We encountered a network error while fetching templates. Please check your connection and reload.
        </p>
        <button onClick={() => refetch()} className="btn btn-sm btn-neutral mt-4 cursor-pointer">
          Retry Connection
        </button>
      </div>
    );
  }

  if (templatesList.length === 0) {
    return (
      <div className="text-center py-20 border border-dashed border-base-300 rounded-2xl bg-base-200/10">
        <Package size={40} className="mx-auto text-base-content/20" />
        <h3 className="mt-4 text-base font-semibold text-base-content">
          No matching templates found
        </h3>
        <p className="mt-2 text-xs text-base-content/50 max-w-xs mx-auto">
          We couldn&apos;t find any templates matching your search criteria. Try using different keywords or clearing your category filter.
        </p>
        <button
          onClick={clearFilters}
          className="btn btn-sm btn-outline border-base-300 mt-4 cursor-pointer"
        >
          Reset Filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templatesList.map((template) => (
        <TemplateCard
          key={template.id}
          template={template}
          onInspect={onInspect}
          onAddToCart={(e) => onAddToCart(template, e)}
        />
      ))}
    </div>
  );
}
