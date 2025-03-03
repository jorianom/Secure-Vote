import axios from "axios";

const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL, 
    headers: {
        "Content-Type": "application/json"
    }
});

// Interceptor de respuesta para manejar errores globalmente
axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("Error en la API:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default axiosClient;
