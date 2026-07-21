"use client";

import { useState } from "react";

export default function FilterBar() {
    const [category, setCategory] = useState("");
    const [status, setStatus] = useState("");
    const [sort, setSort] = useState("newest");

    return (
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
            <div className="flex flex-wrap gap-4">
                <select
                    className="select select-bordered"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    <option>React</option>
                    <option>Laravel</option>
                    <option>Next.js</option>
                    <option>Vue</option>
                </select>

                <select
                    className="select select-bordered"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="">All Status</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                </select>

                <select
                    className="select select-bordered"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="price_high">Price ↓</option>
                    <option value="price_low">Price ↑</option>
                    <option value="views">Views</option>
                    <option value="downloads">Downloads</option>
                </select>
            </div>

            <button
                className="btn btn-outline"
                onClick={() => {
                    setCategory("");
                    setStatus("");
                    setSort("newest");
                }}
            >
                Reset Filters
            </button>
        </div>
    );
}