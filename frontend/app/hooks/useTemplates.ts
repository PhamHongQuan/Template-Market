import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import CategoryService from "@/services/category.service";
import TemplateService from "@/services/template.service";
import { useAuthStore } from "@/stores/auth.store";
import { useCartStore } from "@/stores/cart.store";
import { alert } from "@/lib/alert";
import { Template } from "@/types/template";
import { Category } from "@/types/category";
import axios from "axios";

export function useTemplates() {
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | "all">(
    "all",
  );
  const [page, setPage] = useState(1);
  const perPage = 9; // Number of items per page

  // Auth store
  const user = useAuthStore((state) => state.user);

  // Cart store actions
  const add = useCartStore((state) => state.add);

  // Handle Search Input Debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeyword(keyword);
      setPage(1); // Reset to page 1 when query changes
    }, 400);

    return () => clearTimeout(handler);
  }, [keyword]);

  // Fetch Categories
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await CategoryService.getAll();
      return res.data;
    },
  });

  // Fetch Templates
  const {
    data: apiResponse,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: [
      "templates",
      {
        keyword: debouncedKeyword,
        categoryId: selectedCategoryId,
        page,
        perPage,
      },
    ],
    queryFn: () =>
      TemplateService.getAll({
        keyword: debouncedKeyword || undefined,
        category_id:
          selectedCategoryId === "all" ? undefined : selectedCategoryId,
        page,
        per_page: perPage,
      }),
  });

  // Safely extract templates array and pagination metadata
  const payload = apiResponse?.data;

  const templatesList: Template[] = useMemo(() => {
    if (!payload) return [];
    if (Array.isArray(payload)) return payload;
    const data = (payload as { data?: unknown }).data;
    if (Array.isArray(data)) return data;
    return [];
  }, [payload]);

  const paginationMeta = useMemo<{ last_page?: number } | null>(() => {
    if (payload && !Array.isArray(payload)) {
      const meta = (payload as { meta?: { last_page?: number } }).meta;
      return meta || null;
    }
    return null;
  }, [payload]);

  const totalPages = paginationMeta?.last_page || 1;

  // Handle category selection
  const handleCategorySelect = (categoryId: number | "all") => {
    setSelectedCategoryId(categoryId);
    setPage(1); // Reset to page 1
  };

  // Add to cart handler
  const handleAddToCart = async (template: Template, e?: React.MouseEvent) => {
    e?.stopPropagation();

    if (!user) {
      alert.warning("Please log in first to purchase or download.");
      return;
    }

    try {
      await add(template.id);
      alert.success("Added to cart.");
    } catch (error) {
      const message =
        (error as { message?: string })?.message ??
        "Failed to add to cart.";

      alert.error(message);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setKeyword("");
    setDebouncedKeyword("");
    setSelectedCategoryId("all");
    setPage(1);
  };

  return {
    keyword,
    setKeyword,
    debouncedKeyword,
    selectedCategoryId,
    page,
    setPage,
    categories,
    templatesList,
    paginationMeta,
    totalPages,
    isLoading,
    isError,
    refetch,
    handleCategorySelect,
    handleAddToCart,
    clearFilters,
  };
}
