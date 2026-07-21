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
        e.stopPropagation();

        setDragging(false);

        handleFiles(e.dataTransfer.files);
    };

    return (
        <div className="card bg-base-100 border shadow-sm">
            <div className="card-body">
                <h2 className="card-title">
                    Preview Images
                </h2>

                <input
                    ref={inputRef}
                    type="file"
                    hidden
                    multiple
                    accept="image/*"
                    onChange={handleInputChange}
                />

                <div
                    className={`mt-5 border-2 border-dashed rounded-xl p-5 cursor-pointer transition
                        ${
                            dragging
                                ? "border-primary bg-primary/10"
                                : "border-base-300 hover:bg-base-200/50"
                        }`}
                    onClick={() => inputRef.current?.click()}
                    onDrop={handleDrop}
                    onDragOver={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                    onDragEnter={() => setDragging(true)}
                    onDragLeave={() => setDragging(false)}
                >
                    {previews.length === 0 ? (
                        <div className="h-48 flex flex-col justify-center items-center text-center">
                            <p className="font-medium">
                                Drag & Drop preview images here
                            </p>

                            <p className="text-sm text-base-content/60 mt-2">
                                or click to choose images
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-5">
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

                            <div className="text-center text-sm text-base-content/60">
                                Click or drag & drop to add more images
                            </div>
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
        <div
            className="relative group"
            onClick={(e) => e.stopPropagation()}
        >
            <img
                src={previewUrl}
                alt={file.name}
                className="w-full aspect-video object-cover rounded-lg border"
            />

            <button
                type="button"
                className="absolute top-2 right-2 
                    w-6 h-6 rounded-full
                    bg-black text-white
                    text-xs opacity-0 
                    group-hover:opacity-100
                    transition"
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