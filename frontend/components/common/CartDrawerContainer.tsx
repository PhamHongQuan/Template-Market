"use client";

import CartDrawer from "@/components/common/CartDrawer";
import { useCartStore } from "@/stores/cart.store";
import { alert } from "@/lib/alert";

export default function CartDrawerContainer() {
    const items = useCartStore((s) => s.items);
    const remove = useCartStore((s) => s.remove);
    const clear = useCartStore((s) => s.clear);

    const isOpen = useCartStore((s) => s.isOpen);
    const closeDrawer = useCartStore((s) => s.closeDrawer);

    const total = items.reduce(
        (sum, item) => sum + Number(item.price),
        0
    );

    return (
        <CartDrawer
            open={isOpen}
            items={items}
            total={total}
            onClose={closeDrawer}
            onRemoveItem={remove}
            onBrowseTemplates={closeDrawer}
            onCheckout={() => {
                alert.confirm("Checkout successful!");
                clear();
                closeDrawer();
            }}
        />
    );
}