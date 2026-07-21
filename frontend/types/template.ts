import { Category } from "./category";

export type TemplateAssetType =
    | "thumbnail"
    | "preview"
    | "source";

export interface TemplateAsset {
    id: number;

    type: TemplateAssetType;

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

    thumbnail?: TemplateAsset | null;
    source?: TemplateAsset | null;
    previews?: TemplateAsset[];
    assets?: TemplateAsset[];
}

export interface CreateTemplateRequest {
  title: string;
  category_id: number;
  description: string;
  price: number;
  status?: "draft" | "published";
}

export interface UpdateTemplateRequest {
  title?: string;
  category_id?: number;
  description?: string;
  price?: number;
  status?: "draft" | "published";
}
