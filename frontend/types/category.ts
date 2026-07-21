export interface Category {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    thumbnail: string | null;

    templates_count?: number;

    created_at: string;
    updated_at: string;
}

