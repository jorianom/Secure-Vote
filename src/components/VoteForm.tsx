'use client'
import axios from "axios";
import { useState } from "react";

const candidates = [
  { id: "candidato1", name: "María García", image: "https://picsum.photos/200/300" },
  { id: "candidato2", name: "Carlos Rodríguez", image: "https://picsum.photos/200/200" },
  { id: "candidato3", name: "Ana Fernández", image: "https://picsum.photos/400/300" },
  { id: "candidato4", name: "Luis Martínez", image: "https://picsum.photos/300/300" }
];

export const VoteForm = ({ voterId }: { voterId: string }) => {
    const [selectedCandidate, setSelectedCandidate] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [voteSuccess, setVoteSuccess] = useState(false);

    const handleVote = async () => {
        if (!selectedCandidate) return;
        
        setIsSubmitting(true);
        try {
            const response = await axios.post("http://localhost:3001/api/vote", {
                voterId,
                candidate: selectedCandidate,
            });
            console.log("Voto firmado:", response.data.signedVote);
            setVoteSuccess(true);
        } catch (error) {
            console.error("Error al votar:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
            <div className="max-w-4xl w-full space-y-8">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                    Elecciones 2024
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {candidates.map((candidate) => (
                        <div
                            key={candidate.id}
                            onClick={() => setSelectedCandidate(candidate.id)}
                            className={`cursor-pointer p-6 rounded-xl transition-all duration-300 ${
                                selectedCandidate === candidate.id
                                    ? "bg-blue-50 border-2 border-blue-500"
                                    : "bg-white border-2 border-gray-200 hover:border-blue-300"
                            }`}
                        >
                            <div className="flex flex-col items-center">
                                <img
                                    src={candidate.image}
                                    alt={candidate.name}
                                    className="w-32 h-32 rounded-full object-cover mb-4"
                                />
                                <h3 className="text-xl font-semibold text-gray-800 text-center">
                                    {candidate.name}
                                </h3>
                                <span className="text-sm text-gray-500 mt-2">
                                    {candidate.id.toUpperCase()}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <button
                        onClick={handleVote}
                        disabled={!selectedCandidate || isSubmitting}
                        className={`px-8 py-3 rounded-lg font-medium text-lg ${
                            selectedCandidate && !isSubmitting
                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        } transition-colors duration-300`}
                    >
                        {isSubmitting ? "Enviando voto..." : "Confirmar Voto"}
                    </button>
                </div>

                {voteSuccess && (
                    <div className="text-center mt-4 text-green-600 font-medium">
                        ¡Voto registrado exitosamente!
                    </div>
                )}
            </div>
        </div>
    );
};