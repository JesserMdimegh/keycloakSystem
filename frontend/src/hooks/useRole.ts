// src/hooks/useRole.ts
'use client';

import { useSession } from 'next-auth/react';

export function useRole() {
  const { data: session } = useSession();

  const hasRole = (role: string): boolean => {
    return session?.roles?.includes(role) || false;
  };

  const hasAnyRole = (roles: string[]): boolean => {
    return roles.some(role => session?.roles?.includes(role)) || false;
  };

  const hasAllRoles = (roles: string[]): boolean => {
    return roles.every(role => session?.roles?.includes(role)) || false;
  };

  const hasClientRole = (role: string): boolean => {
    return session?.clientRoles?.includes(role) || false;
  };

  return {
    roles: session?.roles || [],
    clientRoles: session?.clientRoles || [],
    hasRole,
    hasAnyRole,
    hasAllRoles,
    hasClientRole,
  };
}