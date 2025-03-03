import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserState {
    userId: string | null;
    name: string | null;
    setUser: (id: string, name: string) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            userId: null,
            name: null,
            setUser: (id, name) => set({ userId: id, name }),
            clearUser: () => set({ userId: null, name: null }),
        }),
        {
            name: "user-storage",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);
