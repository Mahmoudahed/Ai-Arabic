'use client';

import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, Circle, Rect, PencilBrush } from "fabric";
import { Button } from "@/components/ui2/button";
import { Brush, Eraser, Square, Circle as CircleIcon, Wand2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface DrawingCanvasProps {
  onSave: (dataUrl: string) => void;
}

const DrawingCanvas = ({ onSave }: DrawingCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<FabricCanvas | null>(null);
  const [currentTool, setCurrentTool] = useState<string>("brush");
  const [brushColor, setBrushColor] = useState<string>("#000000");
  const [brushSize, setBrushSize] = useState<number>(5);
  const [isTransforming, setIsTransforming] = useState(false);

  useEffect(() => {
    if (canvasRef.current) {
      const fabricCanvas = new FabricCanvas(canvasRef.current, {
        width: 800,
        height: 600,
        backgroundColor: "#ffffff",
      });
      setCanvas(fabricCanvas);

      return () => {
        fabricCanvas.dispose();
      };
    }
  }, []);

  const handleToolChange = (tool: string) => {
    if (!canvas) return;
    setCurrentTool(tool);

    switch (tool) {
      case "brush":
        canvas.isDrawingMode = true;
        canvas.freeDrawingBrush = new PencilBrush(canvas);
        canvas.freeDrawingBrush.color = brushColor;
        canvas.freeDrawingBrush.width = brushSize;
        break;
      case "eraser":
        canvas.isDrawingMode = true;
        canvas.freeDrawingBrush = new PencilBrush(canvas);
        canvas.freeDrawingBrush.color = "#ffffff";
        canvas.freeDrawingBrush.width = brushSize * 2;
        break;
      case "rectangle":
        canvas.isDrawingMode = false;
        const rect = new Rect({
          left: 100,
          top: 100,
          width: 100,
          height: 100,
          fill: brushColor,
          stroke: brushColor,
          strokeWidth: 2,
        });
        canvas.add(rect);
        break;
      case "circle":
        canvas.isDrawingMode = false;
        const circle = new Circle({
          left: 100,
          top: 100,
          radius: 50,
          fill: brushColor,
          stroke: brushColor,
          strokeWidth: 2,
        });
        canvas.add(circle);
        break;
    }
  };

  const handleSave = async () => {
    if (!canvas) return;
    setIsTransforming(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const dataUrl = canvas.toDataURL({
      format: "png",
      quality: 1,
      multiplier: 1
    });
    
    // Add some visual effects to simulate AI transformation
    canvas.backgroundColor = "#f0f0f0";
    canvas.renderAll();
    
    setTimeout(() => {
      onSave(dataUrl);
      setIsTransforming(false);
      toast.success("Your drawing has been transformed with AI!");
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-white rounded-lg shadow-lg">
      <div className="flex gap-2 mb-4">
        <Button
          onClick={() => handleToolChange("brush")}
          className={`px-4 py-2 rounded-md transition-all duration-200 ${
            currentTool === "brush"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <Brush className="w-5 h-5 mr-2" />
          Brush
        </Button>
        <Button
          onClick={() => handleToolChange("eraser")}
          className={`px-4 py-2 rounded-md transition-all duration-200 ${
            currentTool === "eraser"
              ? "bg-red-600 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <Eraser className="w-5 h-5 mr-2" />
          Eraser
        </Button>
        <Button
          onClick={() => handleToolChange("rectangle")}
          className={`px-4 py-2 rounded-md transition-all duration-200 ${
            currentTool === "rectangle"
              ? "bg-green-600 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <Square className="w-5 h-5 mr-2" />
          Rectangle
        </Button>
        <Button
          onClick={() => handleToolChange("circle")}
          className={`px-4 py-2 rounded-md transition-all duration-200 ${
            currentTool === "circle"
              ? "bg-purple-600 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <CircleIcon className="w-5 h-5 mr-2" />
          Circle
        </Button>
      </div>

      <div className="flex gap-4 mb-4">
        <input
          type="color"
          value={brushColor}
          onChange={(e) => setBrushColor(e.target.value)}
          className="w-12 h-12 rounded-md cursor-pointer border-2 border-gray-200 hover:border-gray-300 transition-colors"
        />
        <input
          type="range"
          min="1"
          max="20"
          value={brushSize}
          onChange={(e) => setBrushSize(Number(e.target.value))}
          className="w-32"
        />
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          className="border-2 border-gray-200 rounded-lg shadow-inner"
        />
        <AnimatePresence>
          {isTransforming && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center"
            >
              <div className="text-white text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="mb-4"
                >
                  <Sparkles className="w-12 h-12" />
                </motion.div>
                <p className="text-xl font-semibold">Transforming your drawing with AI...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Button
        onClick={handleSave}
        disabled={isTransforming}
        className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-md hover:from-purple-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
      >
        <Wand2 className="w-5 h-5" />
        Transform with AI
      </Button>
    </div>
  );
};

export default DrawingCanvas;
