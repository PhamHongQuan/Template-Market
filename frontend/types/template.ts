import { Category } from "./category";

export interface TemplateAsset {
    id: number;
    type: "thumbnail" | "preview" | "source";
    original_name: string;
    path: string;
    url: string;
    mime_type: string;
    extension: string;
    size: number;
    sort_order: number;
    created_at: string;
}

export interface Template {
    id: number;
    title: string;
    slug: string;
    description: string;
    price: string;
    status: "draft" | "published";

    view_count: number;
    download_count: number;

    created_at: string;
    updated_at: string;

    category: Category;

    thumbnail: TemplateAsset | null;
}