"use client";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import { voteCandidate } from "@/services/userService";
import { useUserStore } from "@/store/userStore";

const candidates = [
    { id: "candidato1", name: "María García", image: "https://picsum.photos/200/300" },
    { id: "candidato2", name: "Carlos Rodríguez", image: "https://picsum.photos/200/200" },
    { id: "candidato3", name: "Ana Fernández", image: "https://picsum.photos/400/300" },
    { id: "candidato4", name: "Luis Martínez", image: "https://picsum.photos/300/300" }
];

export const VoteForm = ({ voterId }: { voterId: string }) => {
    const { userId } = useUserStore();
    const [selectedCandidate, setSelectedCandidate] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [voteSuccess, setVoteSuccess] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [error, setError] = useState<string | null>(null);
    console.log("error", error);
    useEffect(() => {
        setIsClient(true); // 🔹 Asegura que el componente solo se renderice en el cliente
    }, []);

    if (!isClient) return null; // 🔹 Evita el renderizado en el servidor (SSR)

    if (voterId === null || !isClient) return null; // 🔹 Evita el renderizado en el servidor (SSR)


    const handleVote = async () => {
        if (!selectedCandidate || !userId) return;
        setIsSubmitting(true);
        setError(null);

        try {
            await voteCandidate(userId, selectedCandidate);
            setVoteSuccess(true);
            setTimeout(() => window.location.href = '/vote', 3000);
        } catch (err) {
            console.error("Error al enviar el voto:", err);
            setError("Error al enviar el voto.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 rounded-lg py-12 px-4">
            <div className="max-w-4xl w-full space-y-8">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                    Elecciones 2024
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {candidates.map((candidate) => (
                        <button
                            key={candidate.id}
                            onClick={() => setSelectedCandidate(candidate.id)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    setSelectedCandidate(candidate.id);
                                }
                            }}
                            className={`cursor-pointer p-6 rounded-xl transition-all duration-300 ${selectedCandidate === candidate.id
                                ? "bg-blue-50 border-2 border-blue-500"
                                : "bg-white border-2 border-gray-200 hover:border-blue-300"
                                }`}
                        >
                            <div className="flex flex-col items-center">
                                <Image
                                    src={candidate.image}
                                    alt={candidate.name}
                                    width={128}
                                    height={128}
                                    className="w-32 h-32 rounded-full object-cover mb-4"
                                />
                                <h3 className="text-xl font-semibold text-gray-800 text-center">
                                    {candidate.name}
                                </h3>
                                <span className="text-sm text-gray-500 mt-2">
                                    {candidate.id.toUpperCase()}
                                </span>
                            </div>
                        </button>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <button
                        onClick={handleVote}
                        disabled={!selectedCandidate || isSubmitting}
                        className={`px-8 py-3 rounded-lg font-medium text-lg ${selectedCandidate && !isSubmitting
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            } transition-colors duration-300`}
                    >
                        {isSubmitting ? "Enviando voto..." : "Confirmar Voto"}
                    </button>
                </div>

                {voteSuccess && (
                    <div className="text-center mt-4 text-green-600 font-medium">
                        ¡Voto registrado exitosamente! Espera un momento...
                    </div>
                )}
            </div>
        </div>
    );
};

VoteForm.propTypes = {
    voterId: PropTypes.string.isRequired // 🛡️ Valida que voterId sea string y obligatorio
};