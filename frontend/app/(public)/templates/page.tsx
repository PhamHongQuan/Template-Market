"use client";

import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import { Template } from "@/types/template";

import TemplateInspectorDrawer from "@/components/common/TemplateInspectorDrawer";
import TemplatePreview from "@/components/creator/templates/TemplatePreview";
import Pagination from "@/components/common/Pagination";

import { useTemplates } from "../../hooks/useTemplates";
import TemplatesToolbar from "../../../components/templates/TemplatesToolbar";
import TemplateGrid from "../../../components/templates/TemplateGrid";

export default function TemplatesPage() {
  const {
    keyword,
    setKeyword,
    debouncedKeyword,
    selectedCategoryId,
    page,
    setPage,
    categories,
    templatesList,
    paginationMeta,
    totalPages,
    isLoading,
    isError,
    refetch,
    handleCategorySelect,
    handleAddToCart,
    clearFilters,
  } = useTemplates();

  // UI state for details inspector
  const [inspectedTemplate, setInspectedTemplate] = useState<Template | null>(null);

  // UI state for image gallery preview
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [galleryTemplate, setGalleryTemplate] = useState<Template | null>(null);

  return (
    <div className="py-8 space-y-8 min-h-screen">
      {/* 1. Header Section */}
      <div className="text-center sm:text-left space-y-3">
        <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-semibold text-neutral">
          <Sparkles size={12} className="text-amber-500" />
          <span>Explore Premium Layouts</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-base-content">
          Templates Marketplace
        </h1>
        <p className="text-sm text-base-content/60 max-w-xl">
          Browse through our curated directory of high-performance, developer-first templates. Use filters to narrow down your selection.
        </p>
      </div>

      {/* 2, 3, 4. Search & Filters Bar, Pills, and Active Filters */}
      <TemplatesToolbar
        keyword={keyword}
        setKeyword={setKeyword}
        debouncedKeyword={debouncedKeyword}
        selectedCategoryId={selectedCategoryId}
        categories={categories}
        handleCategorySelect={handleCategorySelect}
        clearFilters={clearFilters}
      />

      {/* 5. Main Templates Grid / Loading states */}
      <TemplateGrid
        isLoading={isLoading}
        isError={isError}
        refetch={refetch}
        templatesList={templatesList}
        onInspect={setInspectedTemplate}
        onAddToCart={handleAddToCart}
        clearFilters={clearFilters}
      />

      {/* 6. Pagination Bar */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        totalItems={undefined}
        itemsCountOnPage={templatesList.length}
        onPageChange={setPage}
        isLoading={isLoading}
      />

      {/* 7. Template Details Drawer Inspector */}
      <TemplateInspectorDrawer
        template={inspectedTemplate}
        onClose={() => setInspectedTemplate(null)}
        onOpenGallery={(template, initialIndex) => {
          setGalleryTemplate(template);
          setGalleryIndex(initialIndex);
          setGalleryOpen(true);
        }}
        onPrimaryAction={(template) => handleAddToCart(template)}
      />

      {/* 8. Gallery Previews Modal */}
      <TemplatePreview
        open={galleryOpen}
        template={galleryTemplate}
        initialIndex={galleryIndex}
        onClose={() => {
          setGalleryOpen(false);
          setGalleryTemplate(null);
        }}
      />
    </div>
  );
}
