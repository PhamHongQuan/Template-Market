import { create } from "zustand";
import { User } from "../types/auth";
import { createJSONStorage, persist, StateStorage } from "zustand/middleware";

const EXPIRE_TIME = 1000 * 60 * 60;

const sessionStorageWithExpiry: StateStorage = {
  getItem: (name) => {
    const value = sessionStorage.getItem(name);

    if (!value) return null;

    const item = JSON.parse(value);

    // expiry
    if (Date.now() > item.expiry) {
      sessionStorage.removeItem(name);
      return null;
    }

    return JSON.stringify(item.data);
  },

  setItem: (name, value) => {
    sessionStorage.setItem(
      name,
      JSON.stringify({
        data: JSON.parse(value),
        expiry: Date.now() + EXPIRE_TIME,
      }),
    );
  },

  removeItem: (name) => {
    sessionStorage.removeItem(name);
  },
};

type AuthState = {
  user: User | null;
  token: string | null;

  login: (user: User, token: string) => void;
  logout: () => void;

  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,

      login: (user, token) =>
        set({
          user,
          token,
        }),

      logout: () =>
        set({
          user: null,
          token: null,
        }),

      setUser: (user) => set({ user }),

      setToken: (token) => set({ token }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorageWithExpiry),
    },
  ),
);
