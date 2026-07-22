"use client";

import Image from "next/image";
import { Download, Eye, Folder, ImageIcon, Package, X } from "lucide-react";

import Price from "@/components/common/Price";
import { Template } from "@/types/template";

interface TemplateInspectorDrawerProps {
  template: Template | null;
  onClose: () => void;
  onOpenGallery: (template: Template, initialIndex: number) => void;
  onPrimaryAction: (template: Template) => void;
}

export default function TemplateInspectorDrawer({
  template,
  onClose,
  onOpenGallery,
  onPrimaryAction,
}: TemplateInspectorDrawerProps) {
  if (!template) return null;

  const previews = template.previews ?? [];

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/35 backdrop-blur-xs transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg h-full bg-base-100 border-l border-base-200 p-6 flex flex-col justify-between overflow-y-auto relative animate-in slide-in-from-right duration-250"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 btn btn-ghost btn-circle btn-sm text-base-content/50 hover:text-base-content cursor-pointer"
            aria-label="Close Inspector"
          >
            <X size={18} />
          </button>

          <span className="font-mono text-[10px] uppercase font-bold text-neutral">
            {template.category.name}
          </span>

          <h2 className="mt-2 text-2xl font-bold tracking-tight text-base-content pr-8">
            {template.title}
          </h2>

          <div className="mt-2 flex items-center gap-3 text-xs text-base-content/50 font-mono">
            <span>{template.status}</span>
            <span>•</span>
            <Price value={template.price} />
            <span>•</span>
            <span>{template.slug}</span>
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5">
            <span className="inline-flex items-center gap-1 rounded-full border border-base-300 bg-base-200 px-2 py-0.5 text-[10px] font-mono font-semibold text-base-content/75">
              <Folder size={12} />
              {template.category.name}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-base-300 bg-base-200 px-2 py-0.5 text-[10px] font-mono font-semibold text-base-content/75">
              <Eye size={12} />
              {template.view_count.toLocaleString()} views
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-base-300 bg-base-200 px-2 py-0.5 text-[10px] font-mono font-semibold text-base-content/75">
              <Download size={12} />
              {template.download_count.toLocaleString()} downloads
            </span>
          </div>

          <div className="mt-6 aspect-video w-full bg-base-200 border border-base-200 rounded-lg overflow-hidden flex items-center justify-center relative">
            {template.thumbnail?.url ? (
              <Image
                src={template.thumbnail.url}
                alt={template.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-base-200 via-base-100 to-base-200">
                <div className="text-center">
                  <Package size={28} className="mx-auto text-base-content/30" />
                  <p className="mt-3 text-xs font-semibold text-base-content/60">No thumbnail</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-base-content/55 font-mono">About Template</h4>
            <p className="mt-2 text-xs leading-relaxed text-base-content/75">
              {template.description}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4 border-t border-b border-base-200 py-4 font-mono text-center">
            <div>
              <span className="block text-[10px] text-base-content/40">STATUS</span>
              <span className="text-sm font-bold text-base-content capitalize">{template.status}</span>
            </div>
            <div>
              <span className="block text-[10px] text-base-content/40">CREATED</span>
              <span className="text-sm font-bold text-emerald-500">
                {new Intl.DateTimeFormat("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }).format(new Date(template.created_at))}
              </span>
            </div>
            <div>
              <span className="block text-[10px] text-base-content/40">UPDATED</span>
              <span className="text-sm font-bold text-base-content">
                {new Intl.DateTimeFormat("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }).format(new Date(template.updated_at))}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 aspect-video w-full bg-base-200 border border-base-200 rounded-lg overflow-hidden flex items-center justify-center relative">
          {previews.length === 0 ? (
            <div className="flex h-full w-full items-center justify-center bg-base-200 text-base-content/40">
              <ImageIcon size={28} />
            </div>
          ) : (
            <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-px bg-base-300">
              {Array.from({ length: 4 }).map((_, index) => {
                const preview = previews[index];

                return preview ? (
                  <button
                    key={preview.id}
                    type="button"
                    onClick={() => onOpenGallery(template, index + (template.thumbnail ? 1 : 0))}
                    className="relative h-full w-full overflow-hidden"
                  >
                    <img
                      src={preview.url}
                      alt={preview.original_name}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />

                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition hover:opacity-100">
                      <span className="badge badge-neutral">View</span>
                    </div>
                  </button>
                ) : (
                  <div key={index} className="flex items-center justify-center bg-base-200">
                    <ImageIcon size={18} className="text-base-content/20" />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-8 pt-4 border-t border-base-200 bg-base-100 flex items-center justify-between gap-4">
          <div>
            <span className="block text-[10px] font-mono text-base-content/40">TOTAL LICENSE PRICE</span>
            <Price
              value={template.price}
              className="text-xl font-mono font-extrabold text-base-content block"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onPrimaryAction(template)}
              className="btn btn-neutral text-xs font-semibold py-3 rounded-md cursor-pointer"
            >
              {Number(template.price) === 0 ? "Download Layout" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}