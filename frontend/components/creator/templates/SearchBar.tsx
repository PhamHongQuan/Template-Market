"use client";

import { Search, X } from "lucide-react";
import { useState } from "react";

export default function SearchBar() {
    const [keyword, setKeyword] = useState("");

    return (
        <div className="relative">
            <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50"
            />

            <input
                type="text"
                placeholder="Search templates..."
                className="input input-bordered w-full pl-11 pr-11"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />

            {keyword && (
                <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    onClick={() => setKeyword("")}
                >
                    <X
                        size={18}
                        className="text-base-content/50 hover:text-base-content"
                    />
                </button>
            )}
        </div>
    );
}