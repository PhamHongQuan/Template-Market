import { create } from "zustand";
import { User } from "../types/auth";
import { persist } from "zustand/middleware";

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
    },
  ),
);
