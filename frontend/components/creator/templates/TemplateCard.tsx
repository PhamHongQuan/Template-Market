import Image from "next/image";
import Link from "next/link";
import {
    Eye,
    Download,
    Pencil,
    Trash2,
    Folder,
} from "lucide-react";

import { Template } from "@/types/template";
import Price from "@/components/common/Price";

interface TemplateCardProps {
    template: Template;
}

export default function TemplateCard({
    template,
}: TemplateCardProps) {
    const statusColor =
        template.status === "published"
            ? "badge-success"
            : "badge-warning";

    return (
        <div className="group overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            {/* Thumbnail */}
            <div className="relative aspect-video overflow-hidden">
                <Image
                    src={template.thumbnail?.url ?? "/images/no-image.png"}
                    alt={template.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute left-3 top-3">
                    <span className={`badge ${statusColor}`}>
                        {template.status}
                    </span>
                </div>

                <div className="absolute right-3 top-3 rounded-lg bg-base-100/90 px-3 py-1 text-sm font-bold shadow backdrop-blur">
                    <Price
                        value={template.price}
                        className="text-lg font-bold text-primary"
                    />
                </div>
            </div>

            {/* Body */}
            <div className="space-y-4 p-5">
                {/* Title */}
                <div>
                    <h2 className="line-clamp-1 text-lg font-bold">
                        {template.title}
                    </h2>

                    <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-base-200 px-3 py-1 text-xs">
                        <Folder size={14} />
                        {template.category.name}
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 rounded-xl bg-base-200 p-3">
                    <div className="flex items-center gap-2 text-sm">
                        <Eye size={16} className="text-primary" />
                        <span>{template.view_count}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                        <Download
                            size={16}
                            className="text-success"
                        />
                        <span>{template.download_count}</span>
                    </div>
                </div>

                {/* Updated */}
                <div className="flex justify-between text-sm text-base-content/60">
                    <span>Updated</span>

                    <span>
                        {new Date(
                            template.updated_at
                        ).toLocaleDateString()}
                    </span>
                </div>

                {/* Buttons */}
                <div className="flex gap-2 pt-2">
                    <Link
                        href={`/creator/templates/${template.id}/edit`}
                        className="btn btn-primary btn-sm flex-1"
                    >
                        <Pencil size={16} />
                        Edit
                    </Link>

                    <button className="btn btn-outline btn-error btn-sm">
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}