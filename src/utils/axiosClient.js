import { useUserStore } from "@/store/userStore";
import axios from "axios";
import { logout } from "./cookies";

const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

// // Interceptor de respuesta para manejar errores globalmente
// axiosClient.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         console.error("Error en la API:", error.response?.data || error.message);
//         return Promise.reject(error);
//     }
// );
// 🔹 Interceptor para manejar errores globales
axiosClient.interceptors.response.use(
    (response) => response, // ✅ Devolver la respuesta normal si no hay errores
    (error) => {
        if (error.response?.status === 403) {
            console.error("🔴 Token inválido o expirado, cerrando sesión...");

            // 🔹 Cerrar sesión (borrar usuario de Zustand o localStorage)
            useUserStore.getState().clearUser(); // Asegúrate de que este método existe
            logout();
            alert("Tu sesión ha expirado, vuelve a iniciar sesión.");
            // 🔹 Redirigir al login
            window.location.href = "/";
        }

        return Promise.reject(error);
    }
);
export default axiosClient;
