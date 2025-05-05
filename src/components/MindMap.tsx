'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui2/button';
import { Textarea } from '@/components/ui2/textarea';
import { Card, CardContent } from '@/components/ui2/card';
import { Loader2, Brain, AlertCircle, RefreshCw, Key } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface MindMapData {
  mainTopic: string;
  subtopics: {
    topic: string;
    details: string[];
  }[];
}

export default function MindMap() {
  const [text, setText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [mindMapData, setMindMapData] = useState<MindMapData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [hasApiKey, setHasApiKey] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if API key is configured
    const checkApiKey = async () => {
      try {
        const response = await fetch('/api/generate-mindmap', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: 'test' }),
        });

        const data = await response.json();
        setHasApiKey(response.status !== 401);
      } catch (error) {
        setHasApiKey(false);
      }
    };

    checkApiKey();
  }, []);

  const generateMindMap = async (isRetry = false) => {
    if (!text.trim()) {
      toast.error('Please enter some text to generate a mind map');
      return;
    }

    if (isRetry) {
      setRetryCount(prev => prev + 1);
    } else {
      setRetryCount(0);
    }

    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-mindmap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          setHasApiKey(false);
          throw new Error('Mindmeister API key not configured. Please add your API key to continue.');
        }
        if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please try again later.');
        }
        if (response.status === 500) {
          throw new Error(data.error || 'Failed to generate mind map. Please try again.');
        }
        throw new Error(data.error || 'Failed to generate mind map');
      }

      if (!data.mindMapData) {
        throw new Error('No mind map data received');
      }

      // Validate the mind map data structure
      if (!data.mindMapData.mainTopic || !Array.isArray(data.mindMapData.subtopics)) {
        throw new Error('Invalid mind map structure received');
      }

      if (data.mindMapData.subtopics.length === 0) {
        throw new Error('No subtopics generated');
      }

      // Validate each subtopic
      for (const subtopic of data.mindMapData.subtopics) {
        if (!subtopic.topic || !Array.isArray(subtopic.details) || subtopic.details.length === 0) {
          throw new Error('Invalid subtopic structure received');
        }
      }

      setMindMapData(data.mindMapData);
      toast.success('Mind map generated successfully!');
    } catch (error) {
      console.error('Error generating mind map:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate mind map';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRetry = () => {
    if (retryCount >= 3) {
      toast.error('Maximum retry attempts reached. Please try again later.');
      return;
    }
    generateMindMap(true);
  };

  if (hasApiKey === false) {
    return (
      <div className="w-full max-w-4xl mx-auto p-4">
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <Key className="w-12 h-12 text-yellow-600" />
              <h2 className="text-2xl font-bold text-yellow-800">API Key Required</h2>
              <p className="text-yellow-700">
                To use the mind map generator, you need to configure your Mindmeister API key.
                Please add your API key to the environment variables.
              </p>
              <p className="text-sm text-yellow-600">
                Create a .env.local file in your project root and add:
                <br />
                <code className="bg-yellow-100 px-2 py-1 rounded">MINDMEISTER_API_KEY=your_api_key_here</code>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-gray-800">Generate Mind Map</h2>
            <p className="text-gray-600">
              Enter your text and let Mindmeister create a structured mind map for you.
            </p>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your text here..."
              className="min-h-[200px]"
              disabled={isGenerating}
            />
            <div className="flex gap-4">
              <Button
                onClick={() => generateMindMap(false)}
                disabled={isGenerating}
                className="bg-gradient-to-r from-purple-500 to-blue-600 text-white hover:from-purple-600 hover:to-blue-700 flex-1"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4 mr-2" />
                    Generate Mind Map
                  </>
                )}
              </Button>
              {error && (
                <Button
                  onClick={handleRetry}
                  disabled={isGenerating || retryCount >= 3}
                  variant="outline"
                  className="border-red-200 text-red-600 hover:bg-red-50"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Retry
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-red-600">
                <AlertCircle className="w-5 h-5" />
                <p>{error}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {mindMapData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-6">
                <h3 className="text-xl font-bold text-gray-800">{mindMapData.mainTopic}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mindMapData.subtopics.map((subtopic, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-gray-50 rounded-lg p-4"
                    >
                      <h4 className="font-semibold text-gray-800 mb-2">{subtopic.topic}</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {subtopic.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="text-gray-600 text-sm">
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
} 