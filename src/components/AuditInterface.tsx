'use client'
import { getVoteCount } from "@/services/userService";
import Image from "next/image";
import { useEffect, useState } from "react";

interface CandidateResult {
    id: string;
    name: string;
    image: string;
    votes: number;
    percentage: number;
}

export const AuditInterface = () => {
    const [results, setResults] = useState<CandidateResult[]>([]);
    const [totalVotes, setTotalVotes] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const data = await getVoteCount();
                const total = data.reduce((sum: number, candidate: CandidateResult) => sum + candidate.votes, 0);
                const resultsWithPercentage = data.map((candidate: CandidateResult) => ({
                    ...candidate,
                    percentage: total > 0 ? (candidate.votes / total) * 100 : 0
                }));

                setResults(resultsWithPercentage);
                setTotalVotes(total);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching results:", error);
                setIsLoading(false);
            }
        };

        // Polling cada 5 segundos para actualización en vivo
        const interval = setInterval(fetchResults, 5000);
        fetchResults(); // Carga inicial

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 rounded-lg p-8 flex items-center justify-center">
            <div className="max-w-4xl w-full space-y-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Auditoría en Tiempo Real</h1>
                    <p className="text-xl text-gray-600">
                        Total de votos registrados: {totalVotes}
                    </p>
                </div>

                {isLoading ? (
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {results.map((candidate) => (
                            <div key={candidate.id} className="bg-white rounded-xl p-6 shadow-lg">
                                <div className="flex items-center gap-6">
                                    <div className="w-20 h-20"> {/* Contenedor con tamaño fijo */}
                                        <Image
                                            src={candidate.image}
                                            alt={candidate.name}
                                            width={80}
                                            height={80}
                                            className="rounded-full object-cover border-4 border-blue-100 aspect-square"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-2">
                                            <h3 className="text-xl font-semibold text-gray-900">
                                                {candidate.name}
                                            </h3>
                                            <span className="text-lg font-medium text-blue-600">
                                                {candidate.percentage.toFixed(1)}%
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-blue-500 rounded-full transition-all duration-500"
                                                    style={{ width: `${candidate.percentage}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-gray-600">
                                                {candidate.votes} votos
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Gráfico adicional */}
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-xl font-semibold mb-4">Distribución de Votos</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {results.map((candidate) => (
                            <div key={candidate.id} className="flex items-center gap-4">
                                <div className="w-8 h-8 rounded-full bg-blue-500"></div>
                                <div className="flex-1">
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm font-medium">{candidate.name}</span>
                                        <span className="text-sm text-gray-500">
                                            {candidate.votes} ({candidate.percentage.toFixed(1)}%)
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                                            style={{ width: `${candidate.percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};