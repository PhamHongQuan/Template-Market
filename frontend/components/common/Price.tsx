interface PriceProps {
    value: number | string;
    currency?: "VND" | "USD" | "EUR";
    locale?: string;
    freeText?: string;
    className?: string;
}

export default function Price({
    value,
    currency = "VND",
    locale = "vi-VN",
    freeText = "Miễn phí",
    className,
}: PriceProps) {
    const amount = Number(value);

    if (amount === 0) {
        return <span className={className}>{freeText}</span>;
    }

    const formatted = new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        maximumFractionDigits: currency === "VND" ? 0 : 2,
    }).format(amount);

    return <span className={className}>{formatted}</span>;
}