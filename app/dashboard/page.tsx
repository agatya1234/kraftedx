
'use client';

import { useUser, useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  
  const handleLogout = async () => {
    try {
      await signOut();
      
      localStorage.clear();
      sessionStorage.clear();
      
      window.location.href = '/'; 
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    if (isLoaded && !user) {
     
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = '/';
    }
  }, [isLoaded, user]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!user) {
    
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
       
        
        <button
        onClick={handleLogout} 
        className="w-full button-style bg-red-500 hover:bg-red-600"
      >
        Secure Logout
      </button>
      </nav>

      

      
    </div>
  );
}