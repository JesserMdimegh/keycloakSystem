import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { use } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  
  if (!session || !session.roles?.includes('admin')) {
    console.log('session from admin page:',session);
    console.log("No admin session found, redirecting to login");

    return <div className="p-8">Access Denied. Redirecting to login...</div>;
  }


  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-gray-600 text-sm font-semibold">Total Users</h2>
            <p className="text-3xl font-bold text-gray-900">2</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-gray-600 text-sm font-semibold">Active Sessions</h2>
            <p className="text-3xl font-bold text-gray-900">5</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-gray-600 text-sm font-semibold">System Status</h2>
            <p className="text-3xl font-bold text-green-600">Healthy</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Users</h2>
          </div>
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">John Doe</td>
                <td className="px-6 py-4 text-sm text-gray-600">john@example.com</td>
                <td className="px-6 py-4 text-sm text-gray-600">Admin</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">Jane Smith</td>
                <td className="px-6 py-4 text-sm text-gray-600">jane@example.com</td>
                <td className="px-6 py-4 text-sm text-gray-600">User</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}