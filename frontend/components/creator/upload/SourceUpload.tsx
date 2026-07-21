"use client";

import { useRef, useState } from "react";

import { useUploadTemplateStore } from "@/stores/uploadTemplate.store";

export default function SourceUpload() {
    const inputRef = useRef<HTMLInputElement>(null);

    const [dragging, setDragging] = useState(false);

    const { source, setSource } = useUploadTemplateStore();

    const handleFile = (file: File) => {
        const isZip =
            file.type === "application/zip" ||
            file.type === "application/x-zip-compressed" ||
            file.name.toLowerCase().endsWith(".zip");

        if (!isZip) {
            alert("Please select a ZIP file.");
            return;
        }

        setSource(file);
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (!file) return;

        handleFile(file);

        e.target.value = "";
    };

    const handleDrop = (
        e: React.DragEvent<HTMLDivElement>
    ) => {
        e.preventDefault();

        setDragging(false);

        const file = e.dataTransfer.files?.[0];

        if (!file) return;

        handleFile(file);
    };

    return (
        <div className="card bg-base-100 border shadow-sm">
            <div className="card-body">
                <h2 className="card-title">
                    Source ZIP
                </h2>

                <input
                    ref={inputRef}
                    type="file"
                    hidden
                    accept=".zip"
                    onChange={handleInputChange}
                />

                <div
                    className={`border-2 border-dashed rounded-xl h-52 flex justify-center items-center cursor-pointer transition ${
                        dragging
                            ? "border-primary bg-primary/5"
                            : "border-base-300"
                    }`}
                    onClick={() => inputRef.current?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDragEnter={() => setDragging(true)}
                    onDragLeave={() => setDragging(false)}
                    onDrop={handleDrop}
                >
                    {source ? (
                        <div className="text-center">
                            <p className="font-semibold">
                                {source.name}
                            </p>

                            <p className="text-sm text-base-content/60 mt-2">
                                {(source.size / 1024 / 1024).toFixed(2)} MB
                            </p>

                            <button
                                type="button"
                                className="btn btn-outline btn-sm mt-4"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    inputRef.current?.click();
                                }}
                            >
                                Change File
                            </button>
                        </div>
                    ) : (
                        <div className="text-center">
                            <p className="font-medium">
                                Drag & Drop ZIP here
                            </p>

                            <p className="text-sm text-base-content/60 mt-2">
                                or click to choose a ZIP file
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}