"use client";

import { Category } from "@/types/category";
import CategoryService from "@/services/category.service";
import { useEffect, useState } from "react";
import { useUploadTemplateStore } from "@/stores/uploadTemplate.store";

export default function BasicInformation() {
    const [categories, setCategories] = useState<Category[]>([]);
    const { basic, setBasic } = useUploadTemplateStore();


    useEffect(() => {
        const fetchCategories = async () => {
            const res = await CategoryService.getAll();

            setCategories(res.data);
        };

        fetchCategories();
    }, []);

    return (
        <div className="card bg-base-100 border shadow-sm">
            <div className="card-body">
                <h2 className="card-title">Basic Information</h2>

                <div className="grid gap-5">
                    <div>
                        <label className="label">Title</label>

                        <input className="input input-bordered w-full" type="text"
                            value={basic.title}
                            onChange={(e) => setBasic({ title: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="label">Description</label>

                        <textarea className="textarea textarea-bordered w-full" rows={5}
                            value={basic.description}
                            onChange={(e) => setBasic({ description: e.target.value })}
                        />
                    </div>

                    <div className="grid md:grid-cols-3 gap-5">
                        <div>
                            <label className="label">Category</label>

                            <select
                                className="select select-bordered w-full"
                                value={basic.category_id ?? ""}
                                onChange={(e) =>
                                    setBasic({
                                        category_id: Number(e.target.value),
                                    })
                                }
                            >
                                <option value="">Select category</option>

                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="label">Price</label>

                            <input className="input input-bordered w-full"
                                type="number"
                                value={basic.price}
                                onChange={(e) => setBasic({ price: Number(e.target.value) })}
                            />
                        </div>

                        <div>
                            <label className="label">Visibility</label>

                            <select className="select select-bordered">
                                <option>Public</option>

                                <option>Private</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
