'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Sidebar } from '../../components/Sidebar';
import { MindMapProvider } from '../../context/MindMapContext';
import { Toaster } from '../../components/ui/Toaster';

// Create a fallback loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen bg-gray-50">
    <div className="text-2xl font-bold text-gray-400">Loading Mind Map...</div>
  </div>
);

// Dynamically import components with SSR disabled
const DynamicMindMap = dynamic(
  () => import('../../components/MindMapView'),
  { 
    ssr: false,
    loading: () => <LoadingFallback />
  }
);

export default function MindMapPage() {
  return (
    <MindMapProvider>
      <div className="flex flex-col md:flex-row h-screen bg-gray-50">
        <Sidebar />
        <Suspense fallback={<LoadingFallback />}>
          <DynamicMindMap />
        </Suspense>
        <Toaster />
      </div>
    </MindMapProvider>
  );
}