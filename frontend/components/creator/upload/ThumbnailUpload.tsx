"use client";

import { useRef, useState } from "react";

import { useUploadTemplateStore } from "@/stores/uploadTemplate.store";

export default function ThumbnailUpload() {
    const inputRef = useRef<HTMLInputElement>(null);

    const [dragging, setDragging] = useState(false);

    const { thumbnail, setThumbnail } = useUploadTemplateStore();

    const handleFile = (file: File) => {
        if (!file.type.startsWith("image/")) {
            alert("Please select an image.");
            return;
        }

        setThumbnail(file);
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (!file) return;

        handleFile(file);
    };

    const handleDrop = (
        e: React.DragEvent<HTMLDivElement>
    ) => {
        e.preventDefault();
        e.stopPropagation();

        setDragging(false);

        const file = e.dataTransfer.files?.[0];

        if (!file) return;

        handleFile(file);
    };

    const handleDragOver = (
        e: React.DragEvent<HTMLDivElement>
    ) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDragEnter = () => {
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    return (
        <div className="card bg-base-100 border shadow-sm">
            <div className="card-body">
                <h2 className="card-title">
                    Thumbnail
                </h2>

                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleInputChange}
                />

                <div
                    className={`border-2 border-dashed rounded-xl h-64 flex flex-col justify-center items-center cursor-pointer transition
                        ${dragging
                            ? "border-primary bg-primary/10"
                            : "border-base-300"
                        }`}
                    onClick={() => inputRef.current?.click()}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                >
                    {thumbnail ? (
                        <>
                            <img
                                src={URL.createObjectURL(thumbnail)}
                                alt="Thumbnail"
                                className="max-h-48 rounded-lg object-contain"
                            />

                            <p className="mt-3 text-sm">
                                {thumbnail.name}
                            </p>
                        </>
                    ) : (
                        <>
                            <p className="font-medium">
                                Drag & Drop thumbnail here
                            </p>

                            <p className="text-sm text-base-content/60 mt-2">
                                or click to choose an image
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}