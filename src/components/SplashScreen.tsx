'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

interface SplashScreenProps {
  children?: ReactNode;
}

export default function SplashScreen({ children }: SplashScreenProps) {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/home');
      } else {
        router.push('/register');
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center space-y-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-blue-800 drop-shadow-sm">
          🎯 محتوى ذكي
        </h1>
        <p className="text-lg sm:text-xl text-gray-600">
          توليد محتوى احترافي بلمسة واحدة
        </p>
        {children}
      </div>
    </div>
  );
} 