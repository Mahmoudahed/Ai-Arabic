
import { useState } from 'react';
import { Button } from 'ui2/button';
import { Card, CardContent } from 'ui2/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'ui2/select';
import { Switch } from 'ui2/switch';
import { Label } from 'ui2/label';
import { ProcessOptions } from '../types/indexs';
import { Brush, Wand2, Palette } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageTransformerProps {
  originalImageUrl: string;
  onTransform: (options: ProcessOptions) => void;
  isProcessing: boolean;
}

const ImageTransformer = ({ originalImageUrl, onTransform, isProcessing }: ImageTransformerProps) => {
  const [options, setOptions] = useState<ProcessOptions>({
    enhanceDetails: true,
    style: 'realistic',
  });

  const handleStyleChange = (value: string) => {
    setOptions({
      ...options,
      style: value as ProcessOptions['style'],
    });
  };

  const handleEnhanceDetailsChange = (checked: boolean) => {
    setOptions({
      ...options,
      enhanceDetails: checked,
    });
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 mt-8">
      <Card className="border-0 shadow-lg rounded-2xl overflow-hidden transform-card">
        <CardContent className="p-0">
          <div className="bubbles-bg p-6">
            <div className="flex flex-col items-center">
              <motion.div 
                className="mb-6 w-full max-w-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                  <img 
                    src={originalImageUrl} 
                    alt="Original Drawing" 
                    className="w-full h-48 object-contain bg-gray-50 p-2"
                  />
                </div>
              </motion.div>

              <motion.h3 
                className="text-xl font-bold text-white mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Transform your drawing into professional art
              </motion.h3>

              <motion.div 
                className="w-full space-y-4 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <Label htmlFor="style" className="text-white font-medium block mb-2">
                    Choose Style
                  </Label>
                  <Select value={options.style} onValueChange={handleStyleChange}>
                    <SelectTrigger id="style" className="bg-white/90 border-0">
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realistic">Realistic</SelectItem>
                      <SelectItem value="cartoon">Cartoon</SelectItem>
                      <SelectItem value="painterly">Painterly</SelectItem>
                      <SelectItem value="fantasy">Fantasy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 flex items-center justify-between">
                  <Label htmlFor="enhance-details" className="text-white font-medium">
                    Enhance Details
                  </Label>
                  <Switch
                    id="enhance-details"
                    checked={options.enhanceDetails}
                    onCheckedChange={handleEnhanceDetailsChange}
                    className="bg-white/50 data-[state=checked]:bg-white"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Button
                  onClick={() => onTransform(options)}
                  disabled={isProcessing}
                  className="bg-white hover:bg-white/90 text-app-purple font-bold rounded-xl px-8 py-6 flex items-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <Brush size={18} />
                      </motion.div>
                      Creating professional versions...
                    </>
                  ) : (
                    <>
                      <Palette size={18} className="animate-pulse" />
                      Create Multiple Versions
                    </>
                  )}
                </Button>
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImageTransformer;
