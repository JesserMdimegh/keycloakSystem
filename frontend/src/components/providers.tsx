"use client";

import { SessionProvider } from "next-auth/react";
import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';
export function Providers({ children }: { children: React.ReactNode }) {
  return <NextAuthSessionProvider refetchInterval={0}>
      {children}
    </NextAuthSessionProvider>;
}
