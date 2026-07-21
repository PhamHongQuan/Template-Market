"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Upload, Image as ImageIcon, FileArchive, CheckCircle2, AlertCircle } from "lucide-react";

import TemplateService from "@/services/template.service";
import CategoryService from "@/services/category.service";
import TemplateAssetService from "@/services/templateAsset.service";
import { Template } from "@/types/template";
import { Category } from "@/types/category";
import Button from "@/components/ui/Button";
import Loading from "@/components/ui/Loading";
import EditTemplateSkeleton from "@/components/creator/templates/skelenton/EditTemplateSkeleton";

interface EditTemplatePageProps {
    params: Promise<{ id: string }>;
}

interface FormState {
    title: string;
    description: string;
    category_id: number | "";
    price: number;
    status: "draft" | "published";
}

export default function EditTemplatePage({ params }: EditTemplatePageProps) {
    const { id: templateIdStr } = use(params);
    const templateId = Number(templateIdStr);
    const router = useRouter();
    const queryClient = useQueryClient();

    const [categories, setCategories] = useState<Category[]>([]);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // Group basic form fields into a single state object
    const [formData, setFormData] = useState<FormState>({
        title: "",
        description: "",
        category_id: "",
        price: 0,
        status: "draft",
    });

    // Asset File states
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
    const [previewFiles, setPreviewFiles] = useState<File[]>([]);
    const [previewPreviews, setPreviewPreviews] = useState<string[]>([]);
    const [sourceFile, setSourceFile] = useState<File | null>(null);
    const [sourceFileName, setSourceFileName] = useState<string | null>(null);



    // Load categories on mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await CategoryService.getAll();
                setCategories(res.data);
            } catch (err) {
                console.error("Failed to load categories", err);
            }
        };
        fetchCategories();
    }, []);

    // Fetch template details leveraging React Query cache
    const {
        data: templateResponse,
        isLoading: isLoadingTemplate,
        error: queryError
    } = useQuery({
        queryKey: ["template", templateId],
        queryFn: () => TemplateService.getById(templateId),
        // Pre-fill from list cache as placeholder to prevent blank screen, but still trigger background fetch
        placeholderData: () => {
            const cachedList = queryClient.getQueryData<{ data: Template[] }>(["my-templates"]);
            const cachedItem = cachedList?.data?.find((t) => t.id === templateId);
            if (cachedItem) {
                return { data: cachedItem, message: "Loaded from cache", code: 200 };
            }
            return undefined;
        },
        staleTime: 5 * 60 * 1000, // Cache details for 5 minutes
    });

    const template = templateResponse?.data;
    const assets = template?.assets ?? [];

    const thumbnail = template?.thumbnail ?? assets.find((asset) => asset.type === "thumbnail") ?? null;
    const previews = template?.previews?.length
        ? template.previews
        : assets.filter((asset) => asset.type === "preview");
    const source = template?.source ?? assets.find((asset) => asset.type === "source") ?? null;


    // Sync query data into the unified form state
    useEffect(() => {
        if (template) {
            setFormData({
                title: template.title,
                description: template.description || "",
                category_id: template.category?.id ?? "",
                price: Number(template.price),
                status: template.status,
            });
        }
    }, [template]);

    // Handle query error
    useEffect(() => {
        if (queryError) {
            setError((queryError as any).message || "Failed to load template data.");
        }
    }, [queryError]);

    // Form inputs helper
    const updateFormField = (field: keyof FormState, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // Handle thumbnail selection
    const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setThumbnailFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setThumbnailPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle previews selection
    const handlePreviewsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 0) {
            setPreviewFiles(files);
            const filePreviews: string[] = [];
            files.forEach((file) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    filePreviews.push(reader.result as string);
                    if (filePreviews.length === files.length) {
                        setPreviewPreviews(filePreviews);
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    };

    // Handle source ZIP selection
    const handleSourceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSourceFile(file);
            setSourceFileName(file.name);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title.trim()) {
            setError("Title is required.");
            return;
        }
        if (!formData.category_id) {
            setError("Category is required.");
            return;
        }

        try {
            setSaving(true);
            setError(null);
            setSuccess(null);

            // 1. Update basic information
            await TemplateService.update(templateId, {
                title: formData.title,
                description: formData.description,
                category_id: Number(formData.category_id),
                price: formData.price,
                status: formData.status,
            });

            // 2. Upload thumbnail if selected
            if (thumbnailFile) {
                await TemplateAssetService.uploadThumbnail(templateId, thumbnailFile);
            }

            // 3. Upload previews if selected
            if (previewFiles.length > 0) {
                await TemplateAssetService.uploadPreview(templateId, previewFiles);
            }

            // 4. Upload source file if selected
            if (sourceFile) {
                await TemplateAssetService.uploadSource(templateId, sourceFile);
            }

            setSuccess("Template updated successfully!");

            // Invalidate React Query caches to trigger updates on UI list
            queryClient.invalidateQueries({ queryKey: ["my-templates"] });
            queryClient.invalidateQueries({ queryKey: ["template", templateId] });

            setTimeout(() => {
                router.push("/creator/templates");
            }, 1500);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Failed to update template.");
        } finally {
            setSaving(false);
        }
    };

    if (isLoadingTemplate) {
        return <EditTemplateSkeleton />;
    }

    return (
        <main className="max-w-4xl mx-auto p-4 md:p-8">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Link href="/creator/templates" className="btn btn-ghost btn-circle">
                    <ArrowLeft size={24} />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold">Edit Template</h1>
                    <p className="text-base-content/60 mt-1">
                        Modify template parameters and update assets.
                    </p>
                </div>
            </div>

            {/* Alert Messages */}
            {error && (
                <div className="alert alert-error shadow-md mb-6">
                    <AlertCircle size={20} />
                    <span>{error}</span>
                </div>
            )}
            {success && (
                <div className="alert alert-success shadow-md mb-6">
                    <CheckCircle2 size={20} />
                    <span>{success}</span>
                </div>
            )}

            <form onSubmit={handleSave} className="space-y-8">
                {/* Basic Details */}
                <div className="card bg-base-100 border border-base-300 shadow-sm">
                    <div className="card-body gap-5">
                        <h2 className="card-title text-xl font-semibold border-b pb-3">Basic Information</h2>

                        <div className="form-control w-full">
                            <label className="label font-medium">Title</label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                value={formData.title}
                                onChange={(e) => updateFormField("title", e.target.value)}
                                placeholder="Enter template title"
                                required
                            />
                        </div>

                        <div className="form-control w-full">
                            <label className="label font-medium">Description</label>
                            <textarea
                                className="textarea textarea-bordered w-full"
                                rows={5}
                                value={formData.description}
                                onChange={(e) => updateFormField("description", e.target.value)}
                                placeholder="Provide detailed template description"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <div className="form-control w-full">
                                <label className="label font-medium">Category</label>
                                <select
                                    className="select select-bordered w-full"
                                    value={formData.category_id}
                                    onChange={(e) => updateFormField("category_id", Number(e.target.value))}
                                    required
                                >
                                    <option value="">Select category</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-control w-full">
                                <label className="label font-medium">Price ($)</label>
                                <input
                                    type="number"
                                    min="0"
                                    className="input input-bordered w-full"
                                    value={formData.price}
                                    onChange={(e) => updateFormField("price", Number(e.target.value))}
                                    placeholder="0 for free"
                                />
                            </div>

                            <div className="form-control w-full">
                                <label className="label font-medium">Visibility / Status</label>
                                <select
                                    className="select select-bordered w-full"
                                    value={formData.status}
                                    onChange={(e) => updateFormField("status", e.target.value as "draft" | "published")}
                                >
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Thumbnail Asset */}
                <div className="card bg-base-100 border border-base-300 shadow-sm">
                    <div className="card-body">
                        <h2 className="card-title text-xl font-semibold border-b pb-3">Thumbnail</h2>
                        <div className="flex flex-col md:flex-row gap-6 items-center mt-4">
                            {/* Current Image */}
                            <div className="relative aspect-video w-full md:w-64 rounded-xl overflow-hidden bg-base-200 border">
                                {thumbnailPreview ? (
                                    <img
                                        src={thumbnailPreview}
                                        alt="Preview"
                                        className="object-cover w-full h-full"
                                    />
                                ) : thumbnail ? (
                                    <img
                                        src={thumbnail.url}
                                        alt={thumbnail.original_name}
                                        className="object-cover w-full h-full"
                                    />
                                ) : (
                                    <div className="flex h-full flex-col items-center justify-center text-base-content/40">
                                        <ImageIcon size={40} />
                                        <span className="mt-1 text-xs">No Image</span>
                                    </div>
                                )}
                            </div>

                            {/* Upload Button */}
                            <div className="flex-1 w-full">
                                <label className="flex flex-col items-center justify-center border-2 border-dashed border-base-300 rounded-xl p-6 cursor-pointer hover:bg-base-200/50 transition-colors">
                                    <Upload className="text-primary mb-2" size={24} />
                                    <span className="text-sm font-semibold">Upload new thumbnail</span>
                                    <span className="text-xs text-base-content/50 mt-1">PNG, JPG up to 5MB (Replaces current)</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleThumbnailChange}
                                    />
                                </label>
                                {thumbnailFile && (
                                    <p className="text-xs text-primary font-medium mt-2">
                                        Selected: {thumbnailFile.name}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Previews Asset */}
                <div className="card bg-base-100 border border-base-300 shadow-sm">
                    <div className="card-body">
                        <h2 className="card-title text-xl font-semibold border-b pb-3">
                            Preview Images
                        </h2>

                        <div className="space-y-6 mt-4">
                            {/* Current previews */}
                            {previews.length > 0 && (
                                <div>
                                    <p className="text-sm font-medium mb-3">
                                        Current previews
                                    </p>

                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {previews.map((preview) => (
                                            <div
                                                key={preview.id}
                                                className="relative aspect-video overflow-hidden rounded-lg border"
                                            >
                                                <img
                                                    src={preview.url}
                                                    alt={preview.original_name}
                                                    className="w-full h-full object-cover"
                                                />

                                                <div className="absolute top-2 left-2 badge badge-neutral badge-sm">
                                                    Current
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Upload */}
                            <label className="flex flex-col items-center justify-center border-2 border-dashed border-base-300 rounded-xl p-8 cursor-pointer hover:bg-base-200/50 transition-colors">
                                <Upload className="text-primary mb-2" size={28} />
                                <span className="text-sm font-semibold">
                                    Upload preview screenshots
                                </span>
                                <span className="text-xs text-base-content/50 mt-1">
                                    Select multiple images (Will replace current previews)
                                </span>

                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handlePreviewsChange}
                                />
                            </label>

                            {/* New previews */}
                            {previewPreviews.length > 0 && (
                                <div>
                                    <p className="text-sm font-medium text-primary mb-3">
                                        New previews (replace after saving)
                                    </p>

                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {previewPreviews.map((src, idx) => (
                                            <div
                                                key={idx}
                                                className="relative aspect-video overflow-hidden rounded-lg border border-primary"
                                            >
                                                <img
                                                    src={src}
                                                    alt={`Preview ${idx + 1}`}
                                                    className="w-full h-full object-cover"
                                                />

                                                <div className="absolute top-2 left-2 badge badge-primary badge-sm">
                                                    New
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Source Zip File */}
                <div className="card bg-base-100 border border-base-300 shadow-sm">
                    <div className="card-body">
                        <h2 className="card-title text-xl font-semibold border-b pb-3">Source Code File</h2>
                        <div className="flex flex-col md:flex-row gap-6 items-center mt-4">
                            <div className="p-4 rounded-xl bg-base-200 border flex items-center gap-3 w-full md:w-auto">
                                <FileArchive size={36} className="text-warning flex-shrink-0" />
                                <div>
                                    <p className="font-semibold text-sm">ZIP Package</p>
                                    <p className="text-xs text-base-content/60">Currently stored on server</p>
                                </div>
                            </div>

                            <div className="flex-1 w-full">
                                <label className="flex flex-col items-center justify-center border-2 border-dashed border-base-300 rounded-xl p-6 cursor-pointer hover:bg-base-200/50 transition-colors">
                                    <Upload className="text-primary mb-2" size={24} />
                                    <span className="text-sm font-semibold">Upload new ZIP archive</span>
                                    <span className="text-xs text-base-content/50 mt-1">Max 50MB (Replaces current)</span>
                                    <input
                                        type="file"
                                        accept=".zip"
                                        className="hidden"
                                        onChange={handleSourceChange}
                                    />
                                </label>
                                {sourceFileName && (
                                    <p className="text-xs text-primary font-medium mt-2">
                                        Selected: {sourceFileName}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Submit Action */}
                <div className="flex justify-end gap-4 border-t pt-6">
                    <Link href="/creator/templates" className="btn btn-outline min-w-32">
                        Cancel
                    </Link>
                    <Button
                        type="submit"
                        className="min-w-32"
                        disabled={saving}
                    >
                        {saving ? (
                            <Loading />
                        ) : (
                            "Save Changes"
                        )}
                    </Button>
                </div>
            </form>
        </main>
    );
}
