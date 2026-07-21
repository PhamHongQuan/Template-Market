import api from "@/lib/axios";
import { Category } from "@/types/category";
import { ApiResponse } from "../types/api";

class CategoryService {
     async getAll() {
        const res = await api.get<ApiResponse<Category[]>>("/categories");

        return res.data;
    }

    async getBySlug(slug: string) {
        const res = await api.get<ApiResponse<Category>>(`/categories/${slug}`);

        return res.data;
    }
}

export default new CategoryService();