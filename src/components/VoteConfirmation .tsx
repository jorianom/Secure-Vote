'use client'
import { CheckCircle2 } from "lucide-react";

interface VoteData {
    candidate: {
        image: string;
        name: string;
    };
    document_number: string;
    r: string;
    s: string;
    created_at: string;
    transaction_id: string;
    public_base64: string;
}

interface VoteConfirmationProps {
    voteData: VoteData;
    name: string;
}

export const VoteConfirmation = ({ voteData, name }: VoteConfirmationProps) => {
    const truncateHash = (hash: string, length = 6) => {
        return `${hash.substring(0, length)}...${hash.substring(hash.length - length)}`;
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-6 md:p-8 relative overflow-hidden">
                {/* Sello de autenticidad */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="text-green-500 opacity-10 transform rotate-45">
                        <CheckCircle2 className="w-48 h-48 md:w-64 md:h-64" />
                        <span className="text-2xl md:text-4xl font-bold block mt-4">VOTO VERIFICADO</span>
                    </div>
                </div>

                {/* Contenido principal */}
                <div className="relative z-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6 md:mb-8">
                        Comprobante de Voto
                    </h2>

                    {/* Información del candidato */}
                    <div className="flex flex-col items-center gap-4 mb-6 md:mb-8">
                        <div className="text-center">
                            <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
                                {name}
                            </h3>
                            <p className="text-gray-600 mt-1 md:mt-2">
                                {voteData.document_number}
                            </p>
                        </div>
                    </div>

                    {/* Detalles de la firma digital */}
                    <div className="space-y-4 bg-gray-50 rounded-lg p-4 md:p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Firma Digital (r)</label>
                                <div className="mt-2 w-full p-2 border border-gray-300 rounded-lg bg-gray-50">
                                    <p className="font-mono text-gray-800 text-xs md:text-sm whitespace-pre-wrap break-words">
                                        {voteData.r}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Firma Digital (s)</label>
                                <div className="mt-2 w-full p-2 border border-gray-300 rounded-lg bg-gray-50">
                                    <p className="font-mono text-gray-800 text-xs md:text-sm whitespace-pre-wrap break-words">
                                        {voteData.s}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Fecha del Voto</label>
                                <p className="mt-1 text-gray-800 text-sm md:text-base">
                                    {new Date(voteData.created_at).toLocaleString("es-ES", { timeZone: "America/Bogota" })}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">ID de Transacción</label>
                                <p className="mt-1 font-mono text-gray-800 text-xs md:text-sm break-all">
                                    {truncateHash(voteData.transaction_id)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Estado de verificación */}
                    <div className="mt-6 md:mt-8 flex items-center justify-center gap-2 text-green-600">
                        <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6" />
                        <span className="text-sm md:text-base font-semibold">Voto autenticado y registrado</span>
                    </div>

                    {/* Clave pública */}
                    <div className="mt-6 md:mt-8 flex flex-col items-center justify-center gap-2 text-green-600">
                        <span className="text-sm md:text-base font-semibold">PUBLIC KEY:</span>
                        <div className="w-full p-2 border border-green-300 rounded-lg bg-gray-50 overflow-x-auto">
                            <pre className="text-xs font-mono whitespace-pre-wrap break-words">
                                {voteData.public_base64}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};