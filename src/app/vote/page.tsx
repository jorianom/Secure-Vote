import { CheckVoteStatus } from "@/components/CheckVoteStatus ";
import ProtectedAuth from "@/components/ProtectedAuth";

export default function Vote() {
    return (
        <ProtectedAuth>
            <CheckVoteStatus />
        </ProtectedAuth>
    );
}
