import React from 'react';
import { Layout } from '@/components/Layout';
import { FlagGenerator } from '@/components/FlagGenerator';
import { Footer } from '@/components/Footrs';

function App() {
  return (
    <Layout>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <FlagGenerator />
        </main>
        <Footer />
      </div>
    </Layout>
  );
}

export default App;