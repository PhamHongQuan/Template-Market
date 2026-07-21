import SkeletonCard from "./SkeletonCard";

interface SkeletonGridProps {
    count?: number;
}

export default function SkeletonGrid({
    count = 8,
}: SkeletonGridProps) {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: count }).map((_, index) => (
                <SkeletonCard key={index} />
            ))}
        </div>
    );
}