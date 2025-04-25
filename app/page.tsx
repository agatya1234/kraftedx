
'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  if (isSignedIn) {
    router.push('/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-900">Welcome to Our App</h1>
        <p className="text-center text-gray-600 mb-8">
          Please sign in or create an account to continue
        </p>
        <div className="space-y-4">
          <button
            onClick={() => router.push('/signup')}
            className="button-style bg-indigo-500 hover:bg-indigo-600"
          >
            Create New Account
          </button>
          <button
            onClick={() => router.push('/login')}
            className="button-style bg-green-500 hover:bg-green-600"
          >
            Login to Existing Account
          </button>
        </div>
      </div>
    </div>
  );
}