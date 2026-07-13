import clsx from "clsx";

type LoadingProps = {
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    type?: "spinner" | "dots" | "ring" | "ball" | "bars" | "infinity";
};

export default function Loading({
    size = "md",
    type = "spinner",
}: LoadingProps) {
    return (
        <span
            className={clsx(
                "loading",
                `loading-${type}`,
                `loading-${size}`
            )}
        />
    );
}