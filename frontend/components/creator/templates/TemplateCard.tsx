import Image from "next/image";
import Link from "next/link";
import {
    Download,
    Eye,
    Folder,
    Pencil,
    Trash2,
} from "lucide-react";

import Price from "@/components/common/Price";
import { Template } from "@/types/template";

interface TemplateCardProps {
    template: Template;
}

export default function TemplateCard({
    template,
}: TemplateCardProps) {
    return (
        <div className="group overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            {/* Thumbnail */}
            <div className="relative aspect-video overflow-hidden bg-base-200">
                <Image
                    src={template.thumbnail?.url ?? "/images/no-image.png"}
                    alt={template.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Status */}
                <div className="absolute left-3 top-3">
                    <span className="badge badge-neutral capitalize shadow">
                        {template.status}
                    </span>
                </div>

                {/* Price */}
                <div className="absolute right-3 top-3 rounded-xl bg-base-100/90 px-3 py-1.5 shadow-md backdrop-blur">
                    <Price
                        value={template.price}
                        className="text-sm font-semibold text-base-content"
                    />
                </div>
            </div>

            {/* Body */}
            <div className="space-y-5 p-5">
                {/* Title */}
                <div>
                    <h2 className="line-clamp-1 text-lg font-semibold text-base-content">
                        {template.title}
                    </h2>

                    <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-base-300 bg-base-200 px-3 py-1 text-xs">
                        <Folder size={13} />
                        <span>{template.category.name}</span>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 rounded-xl border border-base-300 bg-base-200 p-3">
                    <div className="flex items-center gap-2 text-sm text-base-content/70">
                        <Eye size={16} />
                        <span>{template.view_count.toLocaleString()}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-base-content/70">
                        <Download size={16} />
                        <span>{template.download_count.toLocaleString()}</span>
                    </div>
                </div>

                {/* Updated */}
                <div className="flex items-center justify-between border-t border-base-300 pt-4 text-sm text-base-content/60">
                    <span>Updated</span>

                    <span>
                        {new Intl.DateTimeFormat("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                        }).format(new Date(template.updated_at))}
                    </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                    <Link
                        href={`/creator/templates/${template.id}/edit`}
                        className="btn btn-outline btn-sm flex-1"
                    >
                        <Pencil size={16} />
                        Edit
                    </Link>

                    <button
                        type="button"
                        className="btn btn-outline btn-sm"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}