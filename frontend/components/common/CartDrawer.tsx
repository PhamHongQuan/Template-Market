"use client";

import { Folder, ShoppingCart, X } from "lucide-react";

import Price from "@/components/common/Price";
import { Template } from "@/types/template";

interface CartDrawerProps {
    open: boolean;
    items: Template[];
    total: number;
    onClose: () => void;
    onRemoveItem: (templateId: number) => void;
    onCheckout: () => void;
    onBrowseTemplates: () => void;
}

export default function CartDrawer({
    open,
    items,
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

                    <h2 className="text-lg font-bold tracking-tight text-base-content flex items-center gap-2">
                        <ShoppingCart size={18} /> Your Cart
                    </h2>
                    <p className="text-xs text-base-content/50 mt-1 font-mono">{items.length} items selected</p>

                    <div className="mt-8 space-y-4">
                        {items.length > 0 ? (
                            items.map((item) => (
                                <div key={item.id} className="flex items-start justify-between gap-3 p-3 bg-base-200/50 border border-base-200 rounded-md">
                                    <div className="flex items-start gap-2.5">
                                        <div className="h-8 w-8 bg-neutral/5 rounded flex items-center justify-center shrink-0 text-base-content/60">
                                            <Folder size={14} />
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-semibold text-base-content leading-none">{item.title}</h4>
                                            <span className="text-[10px] text-base-content/40 font-mono mt-1 block uppercase">{item.category.name}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-1.5 font-mono">
                                        <Price value={item.price} className="text-xs font-bold text-base-content" />
                                        <button
                                            onClick={() => onRemoveItem(item.id)}
                                            className="text-[10px] text-rose-500 hover:underline cursor-pointer"
                                        >
                                            Remove
                                        </button>
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
                    <div className="mt-8 pt-4 border-t border-base-200">
                        <div className="flex items-center justify-between font-mono mb-4 text-xs">
                            <span className="text-base-content/50">SUBTOTAL:</span>
                            <Price value={total} className="text-base font-bold text-base-content" />
                        </div>
                        <button
                            onClick={onCheckout}
                            className="w-full btn btn-neutral text-xs font-semibold py-3 rounded-md cursor-pointer"
                        >
                            Checkout and Download
                        </button>
                        <span className="block text-center text-[10px] text-base-content/40 mt-3 font-mono">
                            Safe checkout. 100% money back guarantee.
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}