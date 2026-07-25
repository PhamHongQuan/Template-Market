import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import CartService from "@/services/cart.service";
import { Cart } from "@/types/cart";

type CartState = {
  cart: Cart | null;
  drawerOpen: boolean;
  loading: boolean;

  fetchCart: () => Promise<void>;
  add: (templateId: number, quantity?: number) => Promise<void>;
  update: (itemId: number, quantity: number) => Promise<void>;
  remove: (itemId: number) => Promise<void>;
  clear: () => Promise<void>;

  openDrawer: () => void;
  closeDrawer: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: null,
      drawerOpen: false,
      loading: false,

      fetchCart: async () => {
        set({ loading: true });

        try {
          const res = await CartService.getCart();

          set({
            cart: res.data,
            loading: false,
          });
        } catch {
          set({ loading: false });
        }
      },

      add: async (templateId, quantity = 1) => {
        set({ loading: true });

        try {
          const res = await CartService.addToCart({
            template_id: templateId,
            quantity,
          });

          set({
            cart: res.data,
            drawerOpen: true,
            loading: false,
          });
        } catch (error) {
          set({ loading: false });
          throw error;
        }
      },

      update: async (itemId, quantity) => {
        const res = await CartService.updateItem(itemId, {
          quantity,
        });

        set({
          cart: res.data,
        });
      },

      remove: async (itemId) => {
        const res = await CartService.removeItem(itemId);

        set({
          cart: res.data,
        });
      },

      clear: async () => {
        await CartService.clearCart();

        set({
          cart: null,
        });
      },

      openDrawer: () => set({ drawerOpen: true }),
      closeDrawer: () => set({ drawerOpen: false }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        cart: state.cart,
      }),
    },
  ),
);
