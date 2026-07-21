import TemplateCardSkeleton from "./TemplateCardSkeleton";

interface TemplateGridSkeletonProps {
    count?: number;
}

export default function TemplateGridSkeleton({
    count = 8,
}: TemplateGridSkeletonProps) {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {Array.from({ length: count }).map((_, index) => (
                <TemplateCardSkeleton key={index} />
            ))}
        </div>
    );
}