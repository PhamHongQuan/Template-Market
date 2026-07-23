"use client";

import CartDrawer from "@/components/common/CartDrawer";
import { useCartStore } from "@/stores/cart.store";
import { alert } from "@/lib/alert";

export default function CartDrawerContainer() {
  const cart = useCartStore((s) => s.cart);

  const remove = useCartStore((s) => s.remove);
  const clear = useCartStore((s) => s.clear);

  const isOpen = useCartStore((s) => s.drawerOpen);
  const closeDrawer = useCartStore((s) => s.closeDrawer);

  return (
    <CartDrawer
      open={isOpen}
      items={cart?.items ?? []}
      total={cart?.total ?? 0}
      onClose={closeDrawer}
      onRemoveItem={remove}
      onBrowseTemplates={closeDrawer}
      onCheckout={async () => {
        alert.confirm("Checkout successful!");

        await clear();
        closeDrawer();
      }}
    />
  );
}