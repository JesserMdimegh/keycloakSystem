'use client';

import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const handleLogin = async () => {
    await signIn('keycloak', {
      callbackUrl: '/users',
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

        <button
          onClick={handleLogin}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded w-full"
        >
          Sign in with Keycloak
        </button>
      </div>
    </div>
  );
}
