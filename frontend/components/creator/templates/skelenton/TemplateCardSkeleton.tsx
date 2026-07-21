import Skeleton from "@/components/common/Skeleton";

export default function TemplateCardSkeleton() {
    return (
        <div className="overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm">
            {/* Thumbnail */}
            <Skeleton className="aspect-video w-full rounded-none" />

            {/* Body */}
            <div className="space-y-5 p-5">
                {/* Title */}
                <div>
                    <Skeleton className="h-6 w-3/4" />

                    <Skeleton className="mt-3 h-6 w-28 rounded-full" />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 rounded-xl border border-base-300 bg-base-200 p-3">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                </div>

                {/* Updated */}
                <div className="flex items-center justify-between border-t border-base-300 pt-4">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-24" />
                </div>

                {/* Buttons */}
                <div className="flex gap-2">
                    <Skeleton className="h-9 flex-1 rounded-lg" />
                    <Skeleton className="h-9 w-10 rounded-lg" />
                </div>
            </div>
        </div>
    );
}