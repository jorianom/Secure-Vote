'use client'
// import { VoteReceipt } from "@/types";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

// interface VoteConfirmationProps {
//     voteData: VoteReceipt; // Tipo esperado desde la API
// }

export const VoteConfirmation = ({ voteData }) => {
    const truncateHash = (hash: string, length = 6) => {
        return `${hash.substring(0, length)}...${hash.substring(hash.length - length)}`;
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 relative overflow-hidden">
                {/* Sello de autenticidad */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="text-green-500 opacity-10 transform rotate-45">
                        <CheckCircle2 className="w-64 h-64" />
                        <span className="text-4xl font-bold block mt-4">VOTO VERIFICADO</span>
                    </div>
                </div>

                {/* Contenido principal */}
                <div className="relative z-10">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                        Comprobante de Voto
                    </h2>

                    {/* Información del candidato */}
                    <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                        <Image
                            src={voteData.candidate.image}
                            alt={voteData.candidate.name}
                            width={160}
                            height={160}
                            className="w-40 h-40 rounded-full object-cover border-4 border-blue-100"
                        />
                        <div className="text-center md:text-left">
                            <h3 className="text-2xl font-semibold text-gray-900">
                                {voteData.candidate.name}
                            </h3>
                            <p className="text-gray-600 mt-2">
                                ID Candidato: {voteData.candidate.id.toUpperCase()}
                            </p>
                        </div>
                    </div>

                    {/* Detalles de la firma digital */}
                    <div className="space-y-4 bg-gray-50 rounded-lg p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Firma Digital (r)</label>
                                <p className="mt-1 font-mono text-gray-800 break-all">
                                    {truncateHash(voteData.signature.r)}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Firma Digital (s)</label>
                                <p className="mt-1 font-mono text-gray-800 break-all">
                                    {truncateHash(voteData.signature.s)}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Fecha del Voto</label>
                                <p className="mt-1 text-gray-800">
                                    {new Date(voteData.timestamp).toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">ID de Transacción</label>
                                <p className="mt-1 font-mono text-gray-800 break-all">
                                    {truncateHash(voteData.transactionId)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Estado de verificación */}
                    <div className="mt-8 flex items-center justify-center gap-2 text-green-600">
                        <CheckCircle2 className="w-6 h-6" />
                        <span className="font-semibold">Voto autenticado y registrado</span>
                    </div>
                </div>
            </div>
        </div>
    );
};