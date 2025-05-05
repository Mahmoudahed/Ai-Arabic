'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from '@/app/i18n/client';
import { FaTrash, FaCopy, FaArrowLeft } from 'react-icons/fa';
import toast from 'react-hot-toast';

interface SavedContent {
  id: string;
  content: string;
  domain: string;
  objective: string;
  language: string;
  dialect?: string;
  date: string;
}

export default function SavedPage({ params: { lng } }: { params: { lng: string } }) {
  const { t } = useTranslation(lng);
  const [savedContent, setSavedContent] = useState<SavedContent[]>([]);

  useEffect(() => {
    // Load saved content from localStorage
    const saved = localStorage.getItem('savedContent');
    if (saved) {
      setSavedContent(JSON.parse(saved));
    }
  }, []);

  const handleDelete = (id: string) => {
    const updatedContent = savedContent.filter(item => item.id !== id);
    setSavedContent(updatedContent);
    localStorage.setItem('savedContent', JSON.stringify(updatedContent));
    toast.success(t('saved.deleted'));
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success(t('saved.copied'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e0f2fe] via-white to-[#f0f9ff] p-4 sm:p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <button
            onClick={() => window.history.back()}
            className="text-gray-600 hover:text-blue-600 p-2"
          >
            <FaArrowLeft className="text-2xl" />
          </button>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center w-full">
            {t('Saved')}
          </h1>
        </div>

        {savedContent.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-600">{t('Saved No Content')}</p>
          </div>
        ) : (
          <div className="space-y-6">
            {savedContent.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{item.domain}</h3>
                    <p className="text-sm text-gray-600">{item.objective}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {item.language} {item.dialect ? `(${item.dialect})` : ''} - {new Date(item.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleCopy(item.content)}
                      className="p-2 text-blue-600 hover:text-blue-800"
                      title={t('saved.copy')}
                    >
                      <FaCopy />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-red-600 hover:text-red-800"
                      title={t('saved.delete')}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="whitespace-pre-wrap text-gray-800">{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 