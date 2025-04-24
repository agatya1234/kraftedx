// app/dashboard/page.tsx
'use client';

import { useUser, useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  if (!user) {
    router.push('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-indigo-600">Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/')}
                className="px-4 py-2 text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => signOut(() => router.push('/'))}
                className="px-4 py-2 text-red-600 hover:text-red-700 transition-colors"
              >
                Logout
              </button>
              <div className="ml-4">
                <img
                  className="h-8 w-8 rounded-full"
                  src={user.imageUrl}
                  alt={user.fullName || 'User avatar'}
                />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Welcome Section */}
          <div className="px-6 py-5 border-b border-gray-200 bg-indigo-50">
            <h2 className="text-2xl font-semibold text-gray-800">
              Welcome, {user.firstName || 'User'}!
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              {user.primaryEmailAddress?.emailAddress}
            </p>
          </div>

          {/* Dashboard Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {/* Account Details Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Account Information
              </h3>
              <dl className="grid grid-cols-1 gap-x-4 gap-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {user.fullName || 'Not provided'}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Email Address</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {user.primaryEmailAddress?.emailAddress}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Account Created</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {new Date(user.createdAt || '').toLocaleDateString()}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-4">
                <button
                  onClick={() => router.push('/settings')}
                  className="w-full button-style bg-green-500 hover:bg-green-600"
                >
                  Account Settings
                </button>
                <button
                  onClick={() => signOut(() => router.push('/'))}
                  className="w-full button-style bg-red-500 hover:bg-red-600"
                >
                  Secure Logout
                </button>
              </div>
            </div>

            {/* Recent Activity Card */}
            <div className="md:col-span-2 bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Recent Activity
              </h3>
              <div className="border-t border-gray-200">
                <div className="pt-4 text-sm text-gray-600">
                  {user.lastSignInAt ? (
                    <>
                      Last login: {new Date(user.lastSignInAt).toLocaleString()}
                    </>
                  ) : (
                    'No recent activity'
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}