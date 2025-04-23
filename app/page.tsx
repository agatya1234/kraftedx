'use client';

import { useUser, useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const { isSignedIn } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  return (
    <div className="container">
      <h1>Welcome to the App</h1>
      <div className="auth-section">
        {isSignedIn ? (
          <button className="auth-button danger" onClick={() => signOut()}>Logout</button>
        ) : (
          <button className="auth-button" onClick={() => router.push('/login')}>Login</button>
        )}
      </div>
    </div>
  );
}
