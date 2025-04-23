'use client';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { isSignedIn, user } = useUser();
  const router = useRouter();

  if (!isSignedIn) {
    router.push('/login');
    return null;
  }

  return (
    <div className="dashboard">
      <h1>Welcome, {user.firstName || 'User'}!</h1>
      <p>This is your protected dashboard.</p>
    </div>
  );
}