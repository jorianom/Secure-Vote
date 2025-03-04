"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "../store/userStore";

const ProtectedAuth = ({ children }: { children: React.ReactNode }) => {
    const { userId } = useUserStore();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("userId:", userId);
        if (!userId) {
            router.push("/"); // 🔹 Redirige a Home si no tiene userId
        } else {
            setLoading(false); // 🔹 Si está autenticado, muestra la página
        }
    }, [userId]);

    if (loading) return <p className="text-center text-gray-500">Redirecting...</p>;

    return <>{children}</>;
};

export default ProtectedAuth;
