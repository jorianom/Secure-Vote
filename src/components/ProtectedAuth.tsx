"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "../store/userStore";

const ProtectedAuth = ({ children }: { children: React.ReactNode }) => {
    const { userId } = useUserStore();
    const router = useRouter();

    useEffect(() => {
        if (userId) {
            router.replace("/vote"); // 🔹 Redirige si el usuario está autenticado
        }
    }, [userId, router]);

    return !userId ? children : null; // 🔹 Si hay usuario, no muestra el contenido
};

export default ProtectedAuth;
