import { AuthProvider } from "@/contexts/auth";
import { ReactNode } from "react";

export default function Contexts({ children }: { children: ReactNode }) {
  return (
    <>
      <AuthProvider>{children}</AuthProvider>
    </>
  );
}
