import React from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { Category } from "@/types/category";

interface TemplatesToolbarProps {
  keyword: string;
  setKeyword: (keyword: string) => void;
  debouncedKeyword: string;
  selectedCategoryId: number | "all";
  categories: Category[];
  handleCategorySelect: (categoryId: number | "all") => void;
  clearFilters: () => void;
}

export default function TemplatesToolbar({
  keyword,
  setKeyword,
  debouncedKeyword,
  selectedCategoryId,
  categories,
  handleCategorySelect,
  clearFilters,
}: TemplatesToolbarProps) {
  return (
    <div className="space-y-6">
      {/* 2. Search & Filters Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center bg-base-200/50 p-4 rounded-xl border border-base-200 backdrop-blur-xs">
        {/* Search Input */}
        <div className="relative md:col-span-2">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/40">
            <Search size={18} />
          </span>
          <input
            type="text"
            placeholder="Search templates by title, description..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="input input-bordered w-full pl-10 pr-10 bg-base-100 text-sm focus:outline-hidden border-base-300"
          />
          {keyword && (
            <button
              onClick={() => {
                setKeyword("");
              }}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-base-content/40 hover:text-base-content/80 cursor-pointer"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Dynamic Category Dropdown */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-base-content/50" />
          <select
            value={selectedCategoryId}
            onChange={(e) => {
              const val = e.target.value;
              handleCategorySelect(val === "all" ? "all" : Number(val));
            }}
            className="select select-bordered w-full bg-base-100 text-sm border-base-300"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 3. Category Filter Pills */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-base-content/40 mr-1">
          Categories:
        </span>
        <button
          onClick={() => handleCategorySelect("all")}
          className={`btn btn-sm rounded-full transition-all text-xs font-semibold cursor-pointer ${
            selectedCategoryId === "all"
              ? "btn-neutral"
              : "btn-outline border-base-300 text-base-content/75 hover:bg-base-200"
          }`}
        >
          All Templates
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategorySelect(category.id)}
            className={`btn btn-sm rounded-full transition-all text-xs font-semibold cursor-pointer ${
              selectedCategoryId === category.id
                ? "btn-neutral"
                : "btn-outline border-base-300 text-base-content/75 hover:bg-base-200"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* 4. Active Filter Metadata */}
      {(debouncedKeyword || selectedCategoryId !== "all") && (
        <div className="flex items-center justify-between text-xs text-base-content/65 bg-base-200/30 px-3 py-2 rounded-lg border border-dashed border-base-200">
          <div>
            Showing templates
            {selectedCategoryId !== "all" && (
              <span>
                {" "}
                in{" "}
                <span className="font-semibold text-base-content">
                  {categories.find((c) => c.id === selectedCategoryId)?.name}
                </span>
              </span>
            )}
            {debouncedKeyword && (
              <span>
                {" "}
                matching &ldquo;
                <span className="font-semibold text-base-content">{debouncedKeyword}</span>
                &rdquo;
              </span>
            )}
          </div>
          <button
            onClick={clearFilters}
            className="text-neutral hover:underline font-semibold flex items-center gap-1 cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
