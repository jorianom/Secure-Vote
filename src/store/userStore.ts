import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserState {
    userId: string | null;
    name: string | null;
    token: string | null;
    setUser: (id: string, name: string) => void;
    setUserLogin: (id: string, name: string, token: string) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            userId: null,
            name: null,
            token: null,
            setUser: (id, name) => set({ userId: id, name }),
            setUserLogin: (id, name, token) => set({ userId: id, name, token }),
            clearUser: () => set({ userId: null, name: null }),
        }),
        {
            name: "user-storage",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);
