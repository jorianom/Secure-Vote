'use client';

interface VoteData {
    name: string;
    candidate: {
        id: string;
        name: string;
        image: string;
    };
    r: string;
    s: string;
    transaction_id: string;
    timestamp: string;
    transactionId: string;
    document_number: string;
    created_at: string;
}
import { useEffect, useState } from "react";
import { useUserStore } from "../store/userStore";
import { hasUserVoted } from "@/services/userService";
import { VoteForm } from "./VoteForm";
import { VoteConfirmation } from "./VoteConfirmation ";

export const CheckVoteStatus = () => {
    const [dataVote, setDataVote] = useState<VoteData | null>(null);
    const { userId, name } = useUserStore();
    const [hasVoted, setHasVoted] = useState<boolean | null>(null);

    useEffect(() => {
        const checkVote = async () => {
            if (!userId) {
                setHasVoted(false);
                return;
            }
            try {
                const result = await hasUserVoted(userId);
                console.log('hasUserVoted:', result);
                setHasVoted(result.hasVoted);
                setDataVote(result.vote as VoteData);
            } catch (error) {
                console.error("Error al verificar voto:", error);
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
            {hasVoted === true && userId && dataVote ? (
                <VoteConfirmation voteData={dataVote} name={name || ''} />
            ) : (
                <VoteForm voterId={userId} />
            )

            }
        </div>
    );
};