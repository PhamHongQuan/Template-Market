import BasicInformation from "@/components/creator/upload/BasicInformation";
import ThumbnailUpload from "@/components/creator/upload/ThumbnailUpload";
import PreviewUpload from "@/components/creator/upload/PreviewUpload";
import SourceUpload from "@/components/creator/upload/SourceUpload";
import SubmitSection from "@/components/creator/upload/SubmitSection";

export default function UploadTemplatePage() {
    return (
        <main className="max-w-5xl mx-auto p-8">

            <div className="mb-8">

                <h1 className="text-3xl font-bold">

                    Upload Template

                </h1>

                <p className="text-base-content/60 mt-2">

                    Fill in the information below to publish your template.

                </p>

            </div>

            <div className="space-y-8">

                <BasicInformation />

                <ThumbnailUpload />

                <PreviewUpload />

                <SourceUpload />

                <SubmitSection />

            </div>

        </main>
    );
}