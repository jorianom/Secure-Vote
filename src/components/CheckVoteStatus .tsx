'use client';
import { useEffect, useState } from "react";
import { useUserStore } from "../store/userStore";
import { hasUserVoted } from "@/services/userService";
import { VoteForm } from "./VoteForm";
import { VoteConfirmation } from "./VoteConfirmation ";
const mockVoteData = {
    candidate: {
        id: "candidato1",
        name: "María García",
        image: "https://picsum.photos/200/300", // Imagen de ejemplo
    },
    signature: {
        r: "3a7f8b9c4d5e6f708192a3b4c5d6e7f8", // Firma digital r
        s: "b2e4f6a8c0d1e2f3a4b5c6d7e8f9a0b1", // Firma digital s
    },
    timestamp: "2023-10-05T14:30:00Z", // Fecha y hora del voto
    transactionId: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef", // ID de transacción en blockchain
};
export const CheckVoteStatus = () => {
    const { userId } = useUserStore();
    const [hasVoted, setHasVoted] = useState<boolean | null>(null);

    useEffect(() => {
        const checkVote = async () => {
            if (!userId) {
                setHasVoted(false);
                return;
            }
            try {
                const result = await hasUserVoted(userId);
                setHasVoted(result);
            } catch (error) {
                setHasVoted(false);
            }
        };
        checkVote();
    }, [userId]);

    if (hasVoted === null || userId === null) {
        return <p>Cargando...</p>;
    }

    return (
        <div>
            {hasVoted === true && userId ? (
                <VoteConfirmation voteData={mockVoteData} />
            ) : (
                <VoteForm voterId={userId} />
            )

            }
        </div>
    );
};