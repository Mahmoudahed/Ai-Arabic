'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import TextReader from '@/components/TextReader';

const Index = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-900 p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
          Text Whisperer
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Transform your text into natural-sounding speech
        </p>
      </div>
      
      <TextReader />
      
      <Button
        onClick={() => router.push('/chat')}
        className="mt-8 gap-2 bg-indigo-600 hover:bg-indigo-700 text-white"
      >
        <MessageSquare className="h-4 w-4" />
        Try Chat Mode
      </Button>
    </div>
  );
};

export default Index;
