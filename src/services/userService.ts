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

// Obtener lista de usuarios
export const getUsers = async () => {
    try {
        const response = await axiosClient.get("/users");
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Método para votar
export const voteCandidate = async (document_number: string, candidate: string) => {
    try {
        const response = await axiosClient.post("/votes/vote", {
            document_number,
            candidate,
            // signedVote, // 🔹 Enviar firma digital
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const hasUserVoted = async (voterId: string) => {
    try {
        const response = await axiosClient.get(`/votes/has-voted/${voterId}`);
        return response.data.hasVoted;
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