import axios from "axios";
import axiosClient from "../utils/axiosClient";
import { useUserStore } from "@/store/userStore";

// Registrar un usuario
export const registerUser = async (userData: { document_type: string; document_number: string; name: string; password: string; birthDate: string; }) => {
    try {
        const response = await axiosClient.post("/api/users/register", userData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data || error.message;
        } else {
            throw error;
        }
    }
};
export const loginUser = async (userData: { document_number: string; password: string; document_type: string; }) => {
    try {
        const response = await axiosClient.post("/api/users/login", userData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data || error.message;
        } else {
            throw error;
        }
    }
};
// Obtener lista de usuarios
export const getUsers = async () => {
    try {
        const response = await axiosClient.get("/api/users");
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data || error.message;
        } else {
            throw error;
        }
    }
};

// Método para votar
export const voteCandidate = async (userId: string, candidate: string) => {
    try {
        const token = useUserStore.getState().token; // 🔹 Obtener el token del estado global

        const response = await axiosClient.post(
            "/api/votes/vote",
            { userId, candidate },
            {
                headers: {
                    Authorization: `Bearer ${token}`, // 🔹 Enviar token en los headers
                },
            }
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data || error.message;
        } else {
            throw error;
        }
    }
};

export const hasUserVoted = async (voterId: string) => {
    try {
        const response = await axiosClient.get(`/api/votes/has-voted/${voterId}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data || error.message;
        } else {
            throw error;
        }
    }
};

export const getVoteCount = async () => {
    try {
        const response = await axiosClient.get("/api/votes/count");
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data || error.message;
        } else {
            throw error;
        }
    }
};