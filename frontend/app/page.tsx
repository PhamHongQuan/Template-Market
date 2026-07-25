"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  Package,
} from "lucide-react";

import TemplateService from "@/services/template.service";
import { Template } from "@/types/template";
import TemplateCard from "@/components/common/TemplateCard";
import SkeletonCard from "@/components/common/SkeletonCard";
import Button from "@/components/ui/Button";
import { useAuthStore } from "@/stores/auth.store";
import { alert } from "@/lib/alert";
import TemplatePreview from "@/components/creator/templates/TemplatePreview";
import TemplateInspectorDrawer from "@/components/common/TemplateInspectorDrawer";
import { useCartStore } from "@/stores/cart.store";

export default function Home() {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [galleryTemplate, setGalleryTemplate] = useState<Template | null>(null);
  const [addingToCart, setAddingToCart] = useState(false);

  // Inspector
  const [inspectedTemplate, setInspectedTemplate] =
    useState<Template | null>(null);

  // User
  const user = useAuthStore((state) => state.user);

  // Theme
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Templates
  const {
    data: templates = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["templates"],
    queryFn: () => TemplateService.getAll(),
    select: (res) => res.data,
  });

  // Cart
  const openDrawer = useCartStore((state) => state.openDrawer);
  const add = useCartStore((s) => s.add);

  // Theme initialize
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | null;

    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const initialTheme =
      savedTheme || (systemPrefersDark ? "dark" : "light");

    setTheme(initialTheme);

    document.documentElement.setAttribute(
      "data-theme",
      initialTheme
    );
  }, []);

  // Add to cart
  const addToCart = async (template: Template, e?: React.MouseEvent) => {
    e?.stopPropagation();

    if (!user) {
      alert.warning("Please log in.");
      return;
    }

    try {
      await add(template.id);
      alert.success("Added to cart.");
    } catch {
      alert.error("Failed to add to cart.");
    }
  };

  return (
    <div className="">
      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden bg-base-100 py-16 sm:py-24 border-b border-base-200">
        {/* Subtle grid background pattern */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.015] pointer-events-none bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Tagline Badge */}
          <div className="flex justify-center sm:justify-start">
            <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium bg-neutral/5 dark:bg-neutral-content/5 border border-base-300 text-base-content/80">
              <Sparkles size={12} className="text-amber-500" /> Ready for Next.js 15 & Tailwind CSS v4
            </span>
          </div>

          {/* Heading */}
          <div className="mt-6 text-center sm:text-left max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-base-content">
              Production-ready templates for modern builders.
            </h1>
            <p className="mt-6 text-base sm:text-lg text-base-content/60 leading-relaxed max-w-2xl">
              Handcrafted, developer-first templates with ultra-clean structures. Zero bloat, responsive code, TypeScript native, and perfect Lighthouse scores. We build what we would use ourselves.
            </p>
          </div>

          {/* Call to Actions */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center sm:justify-start">
            <a
              href="#templates-catalog"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-sm font-semibold bg-neutral text-neutral-content hover:bg-neutral/90 rounded-md transition-all gap-2"
            >
              View newest templates <ArrowRight size={16} />
            </a>
            <Button
              variant="secondary"
              onClick={() => {
                const latestTemplate = templates[0];
                if (latestTemplate) setInspectedTemplate(latestTemplate);
              }}
              rightIcon={<BookOpen size={16} />}
              className="w-full sm:w-auto text-sm"
            >
              View latest template
            </Button>
          </div>

          {/* Stats Bar */}
          <div className="mt-16 pt-8 border-t border-base-200 grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
            <div>
              <p className="text-2xl sm:text-3xl font-bold tracking-tight text-base-content">100%</p>
              <p className="text-xs sm:text-sm text-base-content/50 mt-1 font-mono">Lighthouse Perf</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold tracking-tight text-base-content">6,500+</p>
              <p className="text-xs sm:text-sm text-base-content/50 mt-1 font-mono">Developer Downloads</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold tracking-tight text-base-content">No-Bloat</p>
              <p className="text-xs sm:text-sm text-base-content/50 mt-1 font-mono">Pure CSS & Component JS</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold tracking-tight text-base-content">Lifetime</p>
              <p className="text-xs sm:text-sm text-base-content/50 mt-1 font-mono">Free Future Updates</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CÁC TEMPLATE ĐÃ ĐƯỢC TẠO */}
      <main id="templates-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-grow">
        {/* 4. TEMPLATES CARD GRID */}
        {isLoading ? (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : isError ? (
          <div className="mt-12 text-center py-16 border border-dashed border-rose-300 rounded-lg">
            <Package size={32} className="mx-auto text-rose-400" />
            <h3 className="mt-4 text-sm font-semibold text-base-content">Failed to load templates</h3>
            <p className="mt-1 text-xs text-base-content/50">Please check the API connection and try again.</p>
          </div>
        ) : templates.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onInspect={setInspectedTemplate}
                onAddToCart={(e) => addToCart(template, e)}
              />
            ))}
          </div>
        ) : (
          <div className="mt-12 text-center py-16 border border-dashed border-base-300 rounded-lg">
            <Package size={32} className="mx-auto text-base-content/30" />
            <h3 className="mt-4 text-sm font-semibold text-base-content">No templates available</h3>
            <p className="mt-1 text-xs text-base-content/50">Templates will appear here once the API returns data.</p>
          </div>
        )}
      </main>

      <TemplateInspectorDrawer
        template={inspectedTemplate}
        loading={addingToCart}
        onClose={() => setInspectedTemplate(null)}
        onOpenGallery={(template, initialIndex) => {
          setGalleryTemplate(template);
          setGalleryIndex(initialIndex);
          setGalleryOpen(true);
        }}
        onPrimaryAction={async (template) => {
          if (!user) {
            alert.warning("Please log in.");
            return;
          }

          try {
            setAddingToCart(true);
            await add(template.id);
            alert.success("Added to cart.");
            setInspectedTemplate(null);
          } catch (error) {
            const message =
              (error as { message?: string })?.message ??
              "Failed to add to cart.";

            alert.error(message);
          } finally {
            setAddingToCart(false);
          }
        }}
      />

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