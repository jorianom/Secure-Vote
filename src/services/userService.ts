import { useUserStore } from "@/store/userStore";
import axiosClient from "../utils/axiosClient";

// Registrar un usuario
export const registerUser = async (userData) => {
    try {
        const response = await axiosClient.post("/users/register", userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
export const loginUser = async (userData) => {
    try {
        const response = await axiosClient.post("/users/login", userData);
        console.log("Usuario logueado: " + response);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
// Obtener lista de usuarios
export const getUsers = async () => {
    try {
        const response = await axiosClient.get("/users");
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};


// 🔹 Enviar un voto con el token de autenticación
export const voteCandidate = async (userId: string, candidate: string) => {
    try {
        const token = useUserStore.getState().token; // 🔹 Obtener el token del estado global

        const response = await axiosClient.post(
            "/votes/vote",
            { userId, candidate },
            {
                headers: {
                    Authorization: `Bearer ${token}`, // 🔹 Enviar token en los headers
                },
            }
        );

        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const hasUserVoted = async (voterId: string) => {
    try {
        const response = await axiosClient.get(`/votes/has-voted/${voterId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getVoteCount = async () => {
    try {
        const response = await axiosClient.get("/votes/count");
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};