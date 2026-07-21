"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import TemplateService from "@/services/template.service";
import TemplateAssetService from "@/services/templateAsset.service";

import { useUploadTemplateStore } from "@/stores/uploadTemplate.store";
import { useAuthStore } from "@/stores/auth.store";

export default function SubmitSection() {
    const router = useRouter();

    const user = useAuthStore((state) => state.user);

    const {
        basic,
        thumbnail,
        previews,
        source,
        loading,
        setLoading,
        reset,
    } = useUploadTemplateStore();

    const handleSubmit = async () => {
        try {
            if (!user) {
                alert("Please login.");
                return;
            }

            if (!basic.category_id) {
                alert("Please select a category.");
                return;
            }

            if (!basic.title.trim()) {
                alert("Please enter a title.");
                return;
            }

            if (!thumbnail) {
                alert("Please upload a thumbnail.");
                return;
            }

            if (previews.length === 0) {
                alert("Please upload preview images.");
                return;
            }

            if (!source) {
                alert("Please upload the source ZIP.");
                return;
            }

            setLoading(true);

            const template = await TemplateService.create({
                category_id: basic.category_id,
                title: basic.title,
                description: basic.description,
                price: basic.price,
                status: basic.status,
            });

            const templateId = template.data.id;

            await TemplateAssetService.uploadThumbnail(
                templateId,
                thumbnail
            );

            await TemplateAssetService.uploadPreview(
                templateId,
                previews
            );

            await TemplateAssetService.uploadSource(
                templateId,
                source
            );

            alert("Template uploaded successfully.");

            reset();

            router.push("/creator");
        } catch (error) {
            console.error(error);

            alert("Upload failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-end gap-3">
            <Link
                href="/creator"
                className="btn btn-outline"
            >
                Cancel
            </Link>

            <button
                className="btn btn-primary"
                disabled={loading}
                onClick={handleSubmit}
            >
                {loading
                    ? "Publishing..."
                    : "Publish Template"}
            </button>
        </div>
    );
}