'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaCog, FaRobot, FaLightbulb, FaArchive, FaImage, FaVideo, FaVolumeUp, FaMicrophone, FaFile, FaTextHeight, FaFootballBall } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useTranslation } from '../i18n/client';
import { auth } from '../../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Link from 'next/link';

interface ContentType {
  id: string;
  icon: any;
  title: string;
}

export default function HomePage({ params: { lng } }: { params: { lng: string } }) {
  const router = useRouter();
  const { t } = useTranslation(lng);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/register');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const goToSettings = () => {
    router.push(`/settings`);
  };

  const LINKS = [
    {
      href: '/generate',
      label: 'توليد المحتوى',
      icon: <FaLightbulb className="text-2xl" />,
    },
    {
      href: '/saved',
      label: 'الأرشيف',
      icon: <FaArchive className="text-2xl" />,
    },

    {
      href: '/chat',
      label: 'Chat with AI',
      icon: <FaRobot className="text-2xl" />,
    },
    {
      href: '/document-scanner',
      label: ' مسح وتحويل المستندات',
      icon: <FaFile className="text-2xl" />,
    },

    {
      href: '/text-to-spech',
      label: 'تحويل النص الى صوت',
      icon: <FaVolumeUp className="text-2xl" />,
    },

    {
      href: '/mindmap',
      label: 'توليد الخريطة الذهنية',
      icon: <FaImage className="text-2xl" />,
    },
    
    {
      href: '/Falgs-name',
      label: ' تصميم علم من الاسم ',
      icon: <FaImage className="text-2xl" />,
    },
    {
      href: '/gnerate-logo-name',
      label: 'تصميم لوجو',
      icon: <FaImage className="text-2xl" />,
    },
    {
      href: '/Football-Tashkil',
      label: ' خطة لاعيبن كرة القدم',
      icon: <FaFootballBall className="text-2xl" />,
    },
    


  ]

  return (
    <main className="min-h-screen p-4 sm:p-6 md:p-10 bg-gradient-to-b from-[#e0f2fe] via-white to-[#f0f9ff]">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 text-center w-full relative">
            <span className="block">{t('home.title')}</span>
            <motion.button
              onClick={goToSettings}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-600 hover:text-blue-600 p-2"
              whileHover={{ rotate: 90 }}
              transition={{ duration: 0.3 }}
            >
              <FaCog className="text-2xl md:text-3xl" />
            </motion.button>
          </h1>
        </div>

        <div className="mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow hover:from-blue-600 hover:to-blue-800 transition-all duration-300 text-center"
              >
                {link.icon} {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
