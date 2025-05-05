'use client';
import React, { useRef, useEffect } from 'react';
import { Download } from 'lucide-react';
import { FlagStripe } from './FlagStripe';
import { FlagSymbol } from './FlagSymbol';

interface FlagDisplayProps {
  flagData: any;
  name: string;
  isGenerating: boolean;
}

export const FlagDisplay: React.FC<FlagDisplayProps> = ({ 
  flagData, 
  name,
  isGenerating 
}) => {
  const flagRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const downloadFlag = async () => {
    if (!flagRef.current || !name || !flagData) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size based on flag dimensions
    const flagElement = flagRef.current;
    canvas.width = flagElement.offsetWidth * 2;
    canvas.height = flagElement.offsetHeight * 2;
    ctx.scale(2, 2);

    // Draw background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw stripes with patterns
    const stripeWidth = flagElement.offsetWidth / flagData.stripes.length;
    flagData.stripes.forEach((stripe: any, index: number) => {
      ctx.save();
      
      // Apply pattern transformations
      ctx.translate(index * stripeWidth + stripeWidth / 2, flagElement.offsetHeight / 2);
      if (stripe.pattern.rotation) {
        ctx.rotate((stripe.pattern.rotation * Math.PI) / 180);
      }
      ctx.translate(-(index * stripeWidth + stripeWidth / 2), -flagElement.offsetHeight / 2);

      // Draw the stripe with pattern
      ctx.fillStyle = stripe.color;
      switch (stripe.pattern.type) {
        case 'diagonal':
          ctx.transform(1, 0.2, 0, 1, 0, 0);
          break;
        case 'triangular':
          const path = new Path2D();
          path.moveTo(index * stripeWidth + stripeWidth / 2, 0);
          path.lineTo((index + 1) * stripeWidth, flagElement.offsetHeight);
          path.lineTo(index * stripeWidth, flagElement.offsetHeight);
          path.closePath();
          ctx.fill(path);
          break;
        case 'wave':
          ctx.beginPath();
          const amplitude = flagElement.offsetHeight / 4;
          const frequency = 2 * Math.PI / flagElement.offsetHeight;
          ctx.moveTo(index * stripeWidth, 0);
          for (let y = 0; y < flagElement.offsetHeight; y++) {
            const x = index * stripeWidth + Math.sin(y * frequency) * amplitude;
            ctx.lineTo(x, y);
          }
          ctx.lineTo((index + 1) * stripeWidth, flagElement.offsetHeight);
          ctx.lineTo(index * stripeWidth, flagElement.offsetHeight);
          ctx.closePath();
          ctx.fill();
          break;
        default:
          ctx.fillRect(
            index * stripeWidth,
            0,
            stripeWidth,
            flagElement.offsetHeight
          );
      }
      
      ctx.restore();
    });

    // Draw symbol
    if (flagData.lastSymbol) {
      ctx.font = `bold ${flagElement.offsetHeight / 3}px Arial`;
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(
        flagData.lastSymbol.symbol,
        flagElement.offsetWidth / 2,
        flagElement.offsetHeight / 2
      );
    }

    // Create download link
    const link = document.createElement('a');
    link.download = `${name}-flag.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  if (!name) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-md h-96 flex items-center justify-center">
        <p className="text-gray-400 text-lg">Enter your name to generate a flag</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Your Flag</h3>
        <button
          onClick={downloadFlag}
          disabled={!flagData || isGenerating}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="w-4 h-4 mr-2" />
          Download
        </button>
      </div>

      <div
        ref={flagRef}
        className={`relative border-2 border-gray-300 rounded-lg overflow-hidden transition-opacity duration-300 ${
          isGenerating ? 'opacity-50' : 'opacity-100'
        }`}
        style={{ aspectRatio: '3/2', minHeight: '200px' }}
      >
        {flagData ? (
          <>
            <div className="absolute inset-0 flex">
              {flagData.stripes.map((stripe: any, index: number) => (
                <FlagStripe 
                  key={index} 
                  color={stripe.color} 
                  widthPercent={100 / flagData.stripes.length} 
                  isAnimating={isGenerating}
                  delay={index * 0.05}
                  pattern={stripe.pattern}
                />
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              {flagData.lastSymbol && (
                <FlagSymbol 
                  symbol={flagData.lastSymbol.symbol} 
                  size="large"
                  isAnimating={isGenerating}
                />
              )}
            </div>
          </>
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <p className="text-gray-400">Generating flag...</p>
          </div>
        )}
      </div>
      
      {/* Hidden canvas for flag download */}
      <canvas
        ref={canvasRef}
        style={{ display: 'none' }}
      />
    </div>
  );
};