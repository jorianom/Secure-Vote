import ProtectedAuth from "@/components/ProtectedAuth";
import { AuthForm } from "../components/AuthForm";

export default function Home() {
  return (
    <ProtectedAuth>
      <AuthForm />
    </ProtectedAuth>
  );
}
