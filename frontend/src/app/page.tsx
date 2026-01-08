// src/app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-5xl font-bold mb-8">My App</h1>
      <Link
        href="/users"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded text-xl"
      >
        Go to Users
      </Link>
    </div>
  );
}