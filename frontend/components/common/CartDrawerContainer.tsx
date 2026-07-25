"use client";

import CartDrawer from "@/components/common/CartDrawer";
import { useCartStore } from "@/stores/cart.store";
import { alert } from "@/lib/alert";
import { useState } from "react";

export default function CartDrawerContainer() {
  const cart = useCartStore((s) => s.cart);
  const [removingId, setRemovingId] = useState<number | null>(null);

  const remove = useCartStore((s) => s.remove);
  const clear = useCartStore((s) => s.clear);

  const isOpen = useCartStore((s) => s.drawerOpen);
  const closeDrawer = useCartStore((s) => s.closeDrawer);

  const handleRemoveItem = async (id: number) => {
    try {
      setRemovingId(id);

      await remove(id);

      alert.success("Template removed from cart.");
    } catch (error) {
      const message =
        (error as { message?: string })?.message ??
        "Failed to remove template.";

      alert.error(message);
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <CartDrawer
      open={isOpen}
      removingId={removingId}
      items={cart?.items ?? []}
      total={cart?.total ?? 0}
      onClose={closeDrawer}
      onRemoveItem={handleRemoveItem}
      onBrowseTemplates={closeDrawer}
      onCheckout={async () => {
        alert.confirm("Checkout successful!");
        await clear();
        closeDrawer();
      }}
    />
  );
}