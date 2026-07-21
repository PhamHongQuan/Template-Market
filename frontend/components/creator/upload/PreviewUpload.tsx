"use client";

import { useMemo, useRef, useState } from "react";

import { useUploadTemplateStore } from "@/stores/uploadTemplate.store";

export default function PreviewUpload() {
    const inputRef = useRef<HTMLInputElement>(null);

    const [dragging, setDragging] = useState(false);

    const { previews, addPreview, removePreview } =
        useUploadTemplateStore();

    const handleFiles = (files: FileList | null) => {
        if (!files) return;

        Array.from(files).forEach((file) => {
            if (!file.type.startsWith("image/")) return;

            addPreview(file);
        });
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        handleFiles(e.target.files);

        e.target.value = "";
    };

    const handleDrop = (
        e: React.DragEvent<HTMLDivElement>
    ) => {
        e.preventDefault();

        setDragging(false);

        handleFiles(e.dataTransfer.files);
    };

    return (
        <div className="card bg-base-100 border shadow-sm">
            <div className="card-body">
                <div className="flex justify-between items-center">
                    <h2 className="card-title">
                        Preview Images
                    </h2>

                    <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() => inputRef.current?.click()}
                    >
                        Add Images
                    </button>
                </div>

                <input
                    ref={inputRef}
                    type="file"
                    hidden
                    multiple
                    accept="image/*"
                    onChange={handleInputChange}
                />

                <div
                    className={`mt-5 border-2 border-dashed rounded-xl p-5 transition ${
                        dragging
                            ? "border-primary bg-primary/5"
                            : "border-base-300"
                    }`}
                    onDragOver={(e) => {
                        e.preventDefault();
                    }}
                    onDragEnter={() => setDragging(true)}
                    onDragLeave={() => setDragging(false)}
                    onDrop={handleDrop}
                >
                    {previews.length === 0 ? (
                        <div className="h-48 flex flex-col justify-center items-center text-center">
                            <p className="font-medium">
                                Drag & Drop preview images here
                            </p>

                            <p className="text-sm text-base-content/60 mt-2">
                                or click "Add Images"
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {previews.map((file, index) => (
                                <PreviewItem
                                    key={`${file.name}-${index}`}
                                    file={file}
                                    index={index}
                                    onRemove={removePreview}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function PreviewItem({
    file,
    index,
    onRemove,
}: {
    file: File;
    index: number;
    onRemove: (index: number) => void;
}) {
    const previewUrl = useMemo(
        () => URL.createObjectURL(file),
        [file]
    );

    return (
        <div className="relative group">
            <img
                src={previewUrl}
                alt={file.name}
                className="w-full aspect-video object-cover rounded-lg border"
            />

            <button
                type="button"
                className="btn btn-circle btn-error btn-xs absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition"
                onClick={() => onRemove(index)}
            >
                ✕
            </button>

            <p className="text-xs mt-2 truncate">
                {file.name}
            </p>
        </div>
    );
}