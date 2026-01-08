// src/app/users/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { userApi, User } from '@/src/lib/api';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { logout } from '@/src/lib/logout';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const { data: session, status } = useSession();
  const router = useRouter();
  const logout = async () => {
  await signOut({
    redirect: false,
  });

  window.location.href =
    "http://localhost:8080/realms/my-realm/protocol/openid-connect/logout" +
    "?post_logout_redirect_uri=http://localhost:3000";
};


  useEffect(() => {
    if (status === 'unauthenticated') {
      console.log('User is not authenticated, redirecting to login.');
      router.push('/login');
    } else if (status === 'authenticated' ) {
      fetchUsers();
    }
  }, [status, router]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userApi.getAll();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await userApi.create(newUser);
      setNewUser({ name: '', email: '' });
      fetchUsers(); // Refresh list
    } catch (err) {
      setError('Failed to create user');
      console.error(err);
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await userApi.delete(id);
      fetchUsers(); // Refresh list
    } catch (err) {
      setError('Failed to delete user');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (

    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        
        <h1 className="text-4xl font-bold">Users Management</h1>
        <div className="flex items-center gap-4">
          <span>Welcome, {session?.user?.name}</span>
          { session &&
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>}
        </div>
      </div>



      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Create User Form */}
      {session?.roles?.includes('admin') &&
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-8">
        <h2 className="text-2xl font-bold mb-4">Create New User</h2>
        <form onSubmit={handleCreateUser} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create User
          </button>
        </form>
      </div>}

      {/* Users List */}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
        <h2 className="text-2xl font-bold mb-4">Users List</h2>
        {users.length === 0 ? (
          <p className="text-gray-500">No users found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{user.id}</td>
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}