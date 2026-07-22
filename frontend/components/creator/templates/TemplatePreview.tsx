"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
    ChevronLeft,
    ChevronRight,
    Download,
    Eye,
    Folder,
    Package,
    X,
} from "lucide-react";

import { Template, TemplateAsset } from "@/types/template";
import Price from "@/components/common/Price";

interface TemplatePreviewProps {
    open: boolean;
    initialIndex?: number;
    template: Template | null;
    onClose: () => void;
}

export default function TemplatePreview({
    open,
    template,
    initialIndex = 0,
    onClose,
}: TemplatePreviewProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const gallery = useMemo<TemplateAsset[]>(() => {
        if (!template) return [];

        return [
            ...(template.thumbnail ? [template.thumbnail] : []),
            ...(template.previews ?? []),
        ];
    }, [template]);

    useEffect(() => {
        setCurrentIndex(initialIndex);
    }, [template, initialIndex]);

    useEffect(() => {
        if (!open) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }

            if (gallery.length <= 1) return;

            if (e.key === "ArrowLeft") {
                setCurrentIndex((prev) =>
                    prev === 0 ? gallery.length - 1 : prev - 1
                );
            }

            if (e.key === "ArrowRight") {
                setCurrentIndex((prev) =>
                    prev === gallery.length - 1 ? 0 : prev + 1
                );
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [gallery.length, onClose, open]);

    if (!open || !template) return null;

    const currentImage = gallery[currentIndex];

    const prev = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? gallery.length - 1 : prev - 1
        );
    };

    const next = () => {
        setCurrentIndex((prev) =>
            prev === gallery.length - 1 ? 0 : prev + 1
        );
    };

    return (
        <dialog className="modal modal-open">
            <div className="modal-box max-w-7xl p-0 bg-base-100">
                {/* Header */}

                <div className="flex items-center justify-between px-6 py-4 border-b border-base-300">
                    <div>
                        <h3 className="font-bold text-xl">
                            {template.title}
                        </h3>

                        <p className="text-sm text-base-content/60">
                            {template.slug}
                        </p>
                    </div>

                    <button
                        className="btn btn-circle btn-ghost"
                        onClick={onClose}
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 p-6">

                    {/* Gallery */}

                    <div className="lg:col-span-2">

                        <div className="relative aspect-video rounded-xl overflow-hidden border border-base-300 bg-base-200">

                            {currentImage ? (
                                <Image
                                    src={currentImage.url}
                                    alt={template.title}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 66vw"
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center">
                                    <Package
                                        size={40}
                                        className="text-base-content/30"
                                    />
                                </div>
                            )}

                            {gallery.length > 1 && (
                                <>
                                    <button
                                        onClick={prev}
                                        className="btn btn-circle btn-sm absolute left-3 top-1/2 -translate-y-1/2"
                                    >
                                        <ChevronLeft size={18} />
                                    </button>

                                    <button
                                        onClick={next}
                                        className="btn btn-circle btn-sm absolute right-3 top-1/2 -translate-y-1/2"
                                    >
                                        <ChevronRight size={18} />
                                    </button>
                                </>
                            )}
                        </div>

                        {gallery.length > 1 && (
                            <div className="mt-4 flex gap-3 overflow-x-auto pb-2">

                                {gallery.map((image, index) => (
                                    <button
                                        key={image.id}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`relative w-36 aspect-video shrink-0 rounded-lg overflow-hidden border-2 transition-all ${currentIndex === index
                                            ? "border-primary"
                                            : "border-base-300 hover:border-primary/50"
                                            }`}
                                    >
                                        <Image
                                            src={image.url}
                                            alt=""
                                            fill
                                            sizes="144px"
                                            className="object-cover"
                                        />
                                    </button>
                                ))}

                            </div>
                        )}
                    </div>

                    {/* Information */}

                    <div className="space-y-5">

                        <div>
                            <span className="badge badge-success badge-outline">
                                {template.category.name}
                            </span>
                        </div>

                        <div>
                            <Price
                                value={template.price}
                                className="text-3xl font-bold"
                            />
                        </div>

                        <p className="text-sm leading-7 text-base-content/70 whitespace-pre-wrap">
                            {template.description}
                        </p>

                        <div className="divider" />

                        <div className="space-y-3 text-sm">

                            <div className="flex justify-between">
                                <span className="flex items-center gap-2">
                                    <Eye size={16} />
                                    Views
                                </span>

                                <span>
                                    {template.view_count.toLocaleString()}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="flex items-center gap-2">
                                    <Download size={16} />
                                    Downloads
                                </span>

                                <span>
                                    {template.download_count.toLocaleString()}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="flex items-center gap-2">
                                    <Folder size={16} />
                                    Category
                                </span>

                                <span>
                                    {template.category.name}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span>Status</span>

                                <span className="uppercase">
                                    {template.status}
                                </span>
                            </div>

                        </div>

                    </div>

                </div>
            </div>

            <form
                method="dialog"
                className="modal-backdrop"
                onClick={onClose}
            >
                <button>close</button>
            </form>
        </dialog>
    );
}