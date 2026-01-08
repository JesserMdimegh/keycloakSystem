// src/app/debug/page.tsx
'use client';

import { useSession } from 'next-auth/react';

export default function DebugPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div className="p-8">Loading...</div>;
  }

  if (!session) {
    return <div className="p-8">Not authenticated</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Debug Session Data</h1>
      
      <div className="bg-white shadow rounded p-6 mb-4">
        <h2 className="text-xl font-bold mb-2">User Info</h2>
        <p><strong>ID:</strong> {session.user?.id}</p>
        <p><strong>Name:</strong> {session.user?.name}</p>
        <p><strong>Email:</strong> {session.user?.email}</p>
      </div>

      <div className="bg-white shadow rounded p-6 mb-4">
        <h2 className="text-xl font-bold mb-2">Realm Roles</h2>
        {session.roles && session.roles.length > 0 ? (
          <ul className="list-disc list-inside">
            {session.roles.map((role) => (
              <li key={role}>{role}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No realm roles</p>
        )}
      </div>

      <div className="bg-white shadow rounded p-6 mb-4">
        <h2 className="text-xl font-bold mb-2">Client Roles</h2>
        {session.clientRoles && session.clientRoles.length > 0 ? (
          <ul className="list-disc list-inside">
            {session.clientRoles.map((role) => (
              <li key={role}>{role}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No client roles</p>
        )}
      </div>

      <div className="bg-gray-100 p-4 rounded">
        <h2 className="text-xl font-bold mb-2">Full Session Object</h2>
        <pre className="overflow-auto text-xs">
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>
    </div>
  );
}