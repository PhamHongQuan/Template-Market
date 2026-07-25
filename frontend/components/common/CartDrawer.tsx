"use client";

import Image from "next/image";
import { ShoppingCart, Trash2, X } from "lucide-react";

import Price from "@/components/common/Price";
import { CartItem } from "@/types/cart";
import Loading from "../ui/Loading";

interface CartDrawerProps {
    items: CartItem[];
    total: number;
    removingId?: number | null;
    open: boolean;
    onClose: () => void;

    onRemoveItem: (id: number) => void | Promise<void>;

    onBrowseTemplates: () => void;
    onCheckout: () => void | Promise<void>;
}

export default function CartDrawer({
    open,
    items,
    removingId = null,
    total,
    onClose,
    onRemoveItem,
    onCheckout,
    onBrowseTemplates,
}: CartDrawerProps) {
    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-[60] flex justify-end bg-black/35 backdrop-blur-xs transition-opacity duration-300"
            onClick={onClose}
        >
            <div
                className="w-full max-w-sm h-full bg-base-100 border-l border-base-200 p-6 flex flex-col justify-between overflow-y-auto relative animate-in slide-in-from-right duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                <div>
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 btn btn-ghost btn-circle btn-sm text-base-content/50 hover:text-base-content cursor-pointer"
                        aria-label="Close Cart"
                    >
                        <X size={18} />
                    </button>

                    <h2 className="flex items-center gap-2 text-xl font-bold">
                        <ShoppingCart size={20} />
                        Your Cart
                    </h2>

                    <p className="mt-1 text-sm text-base-content/60">
                        {items.length} template{items.length !== 1 ? "s" : ""}
                    </p>

                    <div className="mt-8 space-y-4">
                        {items.length > 0 ? (
                            items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex gap-3 rounded-xl border border-base-200 bg-base-100 p-3 transition-all hover:border-neutral/30 hover:shadow-sm"
                                >
                                    <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-base-200 bg-base-200">
                                        {item.template.thumbnail ? (
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${item.template.thumbnail}`}
                                                alt={item.template.title}
                                                fill
                                                sizes="96px"
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center text-base-content/30">
                                                <ShoppingCart size={18} />
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex min-w-0 flex-1 flex-col justify-between">
                                        <div>
                                            <h4 className="truncate text-sm font-semibold text-base-content">
                                                {item.template.title}
                                            </h4>

                                            <p className="mt-1 text-xs text-base-content/50">
                                                {item.template.category.name}
                                            </p>
                                        </div>

                                        <div className="mt-3 flex items-center justify-between">
                                            <Price
                                                value={item.price}
                                                className="text-sm font-bold text-primary"
                                            />

                                            <button
                                                onClick={() => onRemoveItem(item.template.id)}
                                                disabled={removingId === item.template.id}
                                                className="btn btn-ghost btn-xs text-error hover:bg-error/10"
                                                aria-label="Remove template"
                                            >
                                                {removingId === item.template.id ? (
                                                    <Loading type="bars" size="xs" />
                                                ) : (
                                                    <Trash2 size={15} />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12 text-base-content/40">
                                <ShoppingCart size={24} className="mx-auto mb-2 opacity-50" />
                                <p className="text-xs">Your cart is empty.</p>
                                <button
                                    onClick={onBrowseTemplates}
                                    className="mt-4 text-xs font-semibold text-neutral hover:underline cursor-pointer"
                                >
                                    Browse templates
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {items.length > 0 && (
                    <div className="mt-8 border-t border-base-200 pt-5">
                        <div className="mb-5 flex items-center justify-between">
                            <span className="text-sm text-base-content/60">
                                Total
                            </span>

                            <Price
                                value={total}
                                className="text-xl font-bold"
                            />
                        </div>

                        <button
                            onClick={onCheckout}
                            className="btn btn-neutral w-full"
                        >
                            Checkout
                        </button>

                        <p className="mt-3 text-center text-xs text-base-content/40">
                            Instant download after successful payment.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}