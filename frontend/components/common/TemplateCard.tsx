"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Folder, Eye, Download, ArrowRight, Package } from "lucide-react";
import { Template } from "@/types/template";
import Price from "@/components/common/Price";


interface TemplateCardProps {
    template: Template;
    onInspect: (template: Template) => void;
    onAddToCart: (e: React.MouseEvent) => void;
}

export default function TemplateCard({
    template,
    onInspect,
}: TemplateCardProps) {

    const renderThumbnail = () => {
        if (template.thumbnail?.url) {
            return (
                <Image
                    src={template.thumbnail.url}
                    alt={template.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
            );
        }

        return (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-base-200 via-base-100 to-base-200">
                <div className="text-center">
                    <Package size={28} className="mx-auto text-base-content/30" />
                    <p className="mt-3 text-xs font-semibold text-base-content/60">No thumbnail</p>
                </div>
            </div>
        );
    };

    return (
        <div
            onClick={() => onInspect(template)}
            className="border border-base-200 dark:border-base-300 bg-base-100 hover:border-base-content/45 hover:-translate-y-0.5 active:translate-y-0 duration-200 transition-all rounded-lg overflow-hidden group cursor-pointer flex flex-col justify-between"
        >
            {/* Thumbnail Header */}
            <div className="aspect-video w-full relative overflow-hidden bg-base-200 border-b border-base-200">
                {renderThumbnail()}

                {/* Inspect Overlay */}
                <div className="absolute inset-0 bg-base-100/20 backdrop-blur-2xs opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-3">
                    <span className="bg-neutral text-neutral-content px-3 py-1.5 text-xs font-semibold rounded shadow-md flex items-center gap-1.5">
                        Inspect template <ArrowRight size={12} />
                    </span>
                </div>

                {/* Status Badge */}
                <div className="absolute top-2 left-2 inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-base-100/90 dark:bg-zinc-950/90 border border-base-200 text-[10px] font-semibold text-base-content/80 font-mono shadow-xs">
                    <span className="uppercase">{template.status}</span>
                </div>

                {/* Price Badge */}
                <div className="absolute top-2 right-2 inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-base-100/90 dark:bg-zinc-950/90 border border-base-200 text-[10px] font-semibold text-base-content/80 font-mono shadow-xs">
                    <Price value={template.price} />
                </div>

                {/* Category Badge */}
                <div className="absolute bottom-2 left-2 inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-500/90 dark:bg-emerald-600/90 text-[10px] font-bold text-white font-mono shadow-xs">
                    <span>{template.category.name}</span>
                </div>
            </div>

            {/* Content Body */}
            <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                    <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-base text-base-content group-hover:text-neutral transition-colors">
                            {template.title}
                        </h3>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-base-content/45">
                            {template.slug}
                        </span>
                    </div>

                    <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-base-300 bg-base-200 px-2.5 py-1 text-[11px] text-base-content/70">
                        <Folder size={13} />
                        <span>{template.category.name}</span>
                    </div>

                    <p className="mt-2 text-xs text-base-content/60 leading-relaxed line-clamp-2">
                        {template.description}
                    </p>
                </div>

                <div className="mt-4 pt-4 border-t border-base-200/60">
                    <div className="grid grid-cols-2 gap-3 text-[10px] font-mono text-base-content/60">
                        <div className="flex items-center gap-1.5">
                            <Eye size={12} />
                            <span>{template.view_count.toLocaleString()} views</span>
                        </div>
                        <div className="flex items-center gap-1.5 justify-end">
                            <Download size={12} />
                            <span>{template.download_count.toLocaleString()} downloads</span>
                        </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-2">
                        <span className="text-[10px] text-base-content/40 font-mono">
                            Updated{" "}
                            {new Intl.DateTimeFormat("vi-VN", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                            }).format(new Date(template.updated_at))}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
