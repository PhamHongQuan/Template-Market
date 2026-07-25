import React, { useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  itemsCountOnPage?: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsCountOnPage = 0,
  onPageChange,
  isLoading = false,
}: PaginationProps) {
  const pageNumbers = useMemo(() => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  }, [currentPage, totalPages]);

  if (totalPages <= 1 || isLoading) {
    return null;
  }

  return (
    <div className="flex justify-center items-center gap-2 pt-6">
      <div className="join border border-base-300">
        {/* Prev Button */}
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="join-item btn btn-sm bg-base-100 hover:bg-base-200 border-r border-base-300 text-base-content disabled:bg-base-200/50 disabled:text-base-content/30 cursor-pointer"
          aria-label="Previous Page"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Page Buttons */}
        {pageNumbers.map((p, index) => {
          if (p === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="join-item btn btn-sm btn-disabled bg-base-100 text-base-content/40 cursor-default"
              >
                ...
              </span>
            );
          }

          return (
            <button
              key={`page-${p}`}
              onClick={() => onPageChange(Number(p))}
              className={`join-item btn btn-sm cursor-pointer ${
                currentPage === p
                  ? "btn-neutral text-neutral-content font-bold"
                  : "bg-base-100 hover:bg-base-200 text-base-content font-medium"
              }`}
            >
              {p}
            </button>
          );
        })}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="join-item btn btn-sm bg-base-100 hover:bg-base-200 border-l border-base-300 text-base-content disabled:bg-base-200/50 disabled:text-base-content/30 cursor-pointer"
          aria-label="Next Page"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {(totalItems !== undefined || itemsCountOnPage > 0) && (
        <div className="text-xs text-base-content/50 ml-3 font-mono hidden sm:inline-block">
          Page {currentPage} of {totalPages} ({totalItems ?? itemsCountOnPage} items)
        </div>
      )}
    </div>
  );
}
