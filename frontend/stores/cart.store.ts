import { create } from "zustand";
import { Template } from "@/types/template";

interface CartState {
  items: Template[];
  isOpen: boolean;
  add: (template: Template) => void;
  remove: (id: number) => void;
  clear: () => void;

  total: number;
  openDrawer: () => void;
  closeDrawer: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,

  add: (template) => {
    if (get().items.some((i) => i.id === template.id)) return;
    set({
      items: [...get().items, template],
    });
  },

  remove: (id) => {
    set({
      items: get().items.filter((i) => i.id !== id),
    });
  },

  clear: () => set({ items: [] }),

  get total() {
    return get().items.reduce((sum, item) => sum + Number(item.price), 0);
  },
  openDrawer: () => set({ isOpen: true }),

  closeDrawer: () => set({ isOpen: false }),
}));
