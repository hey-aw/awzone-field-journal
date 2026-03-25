"use client";

import type { ReactNode } from "react";
import { NeonAuthUIProvider } from "@neondatabase/auth/react";
import { authClient } from "@/lib/auth/client";

type UiAuthClient = React.ComponentProps<typeof NeonAuthUIProvider>["authClient"];

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <NeonAuthUIProvider authClient={authClient as unknown as UiAuthClient}>
      {children}
    </NeonAuthUIProvider>
  );
}
