import React from 'react';
import { MindMapCanvas } from '../../components/MindMapCanvas';
import { Sidebar } from '../../components/Sidebar';
import { MindMapProvider } from '../../context/MindMapContext';
import { Toaster } from '../../components/ui/Toaster';

function App() {
  return (
    <MindMapProvider>
      <div className="flex flex-col md:flex-row h-screen bg-gray-50">
        <Sidebar />
        <MindMapCanvas />
        <Toaster />
      </div>
    </MindMapProvider>
  );
}

export default App;