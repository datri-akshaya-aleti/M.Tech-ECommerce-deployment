import { create } from "zustand";
import type { AuthResponse } from "../types/auth";

interface AuthStore {
    user: AuthResponse | null;
    login: (user: AuthResponse) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: JSON.parse(localStorage.getItem("user") || "null"),
    login: (user) => {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", user.token);
        set({ user: user });
    },
    logout: () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        set({ user: null });
    },
}));