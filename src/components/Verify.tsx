"use client"
import { useState } from "react";

interface ErrorAPI {
    error: string;
}
import { verifyVote } from "@/services/userService";

export const Verify = () => {
    const [signature, setSignature] = useState({
        document_number: "",
        public_base64: "",
        r: "",
        s: ""
    });
    const [verification, setVerification] = useState("");
    const [error, setError] = useState("");

    const handleVerify = async () => {
        try {
            if (!signature.public_base64 || !signature.r || !signature.s) {
                setError("Debes completar todos los campos.");
                return;
            }
            const data = await verifyVote(signature);
            if (!data.valid) {
                setError(data.message);
                return;
            }
            console.log("data", data);
            setVerification(data.message);
            setError("");
            setTimeout(() => {
                setVerification("");
            }, 3000);

        } catch (error) {
            console.error("Error al verificar el voto:", error);
            if (error) {
                setError((error as ErrorAPI).error);
            } else {
                setError("An unknown error occurred.");
            }
            setVerification("");
            setTimeout(() => {
                setError("");
            }, 3000);
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Verificar Voto</h2>
            <label htmlFor="publicKey">Clave Pública</label>
            <input
                type="text"
                value={signature.public_base64}
                onChange={(e) => setSignature({ ...signature, public_base64: e.target.value })}
                placeholder="Ingresa clave pública"
                className="w-full p-2 border rounded-md mb-4"
            />
            <label htmlFor="publicKey">Firma Digital s</label>
            <input
                type="text"
                value={signature.s}
                onChange={(e) => setSignature({ ...signature, s: e.target.value })}
                placeholder="Ingresa la firma digital, s"
                className="w-full p-2 border rounded-md mb-4"
            />
            <label htmlFor="publicKey">Firma Digital r</label>
            <input
                type="text"
                value={signature.r}
                onChange={(e) => setSignature({ ...signature, r: e.target.value })}
                placeholder="Ingresa la firma digital, r"
                className="w-full p-2 border rounded-md"
            />
            <button
                onClick={handleVerify}
                className="mt-4 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
                Verificar
            </button>
            {verification && (
                <p className="mt-4 text-green-600">✅ {verification}</p>
            )}
            {error && <p className="mt-4 text-red-600">❌ {error}</p>}
        </div>
    );
};
