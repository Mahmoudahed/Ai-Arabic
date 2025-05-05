import { useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui2/button';
import { Card, CardContent } from '@/components/ui2/card';
import { Camera, Upload, Image as ImageIcon, Pencil } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import DrawingCanvas from './DrawingCanvas';

interface UploadSectionProps {
  onImageSelect: (file: File) => void;
  isProcessing: boolean;
}

const UploadSection = ({ onImageSelect, isProcessing }: UploadSectionProps) => {
  const [showDrawingCanvas, setShowDrawingCanvas] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        validateAndUploadFile(acceptedFiles[0]);
      }
    },
    onDropRejected: (fileRejections) => {
      const error = fileRejections[0].errors[0];
      if (error.code === 'file-too-large') {
        toast.error('Image is too large. Please upload an image smaller than 5MB');
      } else if (error.code === 'file-invalid-type') {
        toast.error('Please upload an image file (PNG, JPG, JPEG, or GIF)');
      } else {
        toast.error('Error uploading file. Please try again.');
      }
    }
  });
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndUploadFile(e.target.files[0]);
    }
  };
  
  const validateAndUploadFile = (file: File) => {
    if (!file.type.match('image.*')) {
      toast.error('Please upload an image file');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image is too large. Please upload an image smaller than 5MB');
      return;
    }
    
    onImageSelect(file);
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      
      toast.info('Camera feature coming soon!');
      
      stream.getTracks().forEach(track => track.stop());
    } catch (err) {
      toast.error('Could not access camera');
      console.error('Camera access error:', err);
    }
  };

  const handleDrawingSave = async (dataUrl: string) => {
    try {
      // Convert data URL to File object
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const file = new File([blob], "drawing.png", { type: "image/png" });
      
      onImageSelect(file);
      setShowDrawingCanvas(false);
    } catch (error) {
      console.error('Error saving drawing:', error);
      toast.error('Failed to save drawing. Please try again.');
    }
  };

  if (showDrawingCanvas) {
    return (
      <div className="w-full">
        <Button 
          variant="ghost" 
          onClick={() => setShowDrawingCanvas(false)}
          className="mb-4"
        >
          ← Back to Upload Options
        </Button>
        <DrawingCanvas onSave={handleDrawingSave} />
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto px-4">
      <Card 
        className={`border-2 ${isDragActive ? 'border-app-purple border-dashed' : 'border-gray-200'} rounded-2xl shadow-md overflow-hidden transition-all`}
      >
        <CardContent className="p-6">
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <motion.div
              className="flex flex-col items-center justify-center py-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="w-24 h-24 bg-app-background rounded-full flex items-center justify-center mb-6 border-2 border-app-purple"
                animate={{ 
                  y: [0, -8, 0],
                  boxShadow: [
                    '0px 0px 0px rgba(156, 106, 222, 0.3)',
                    '0px 8px 20px rgba(156, 106, 222, 0.5)',
                    '0px 0px 0px rgba(156, 106, 222, 0.3)'
                  ]
                }}
                transition={{ 
                  duration: 2, 
                  ease: "easeInOut", 
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              >
                <ImageIcon size={36} className="text-app-purple" />
              </motion.div>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Create Your Drawing</h3>
              <p className="text-gray-600 text-center mb-6 max-w-md">
                Draw directly, upload a file, or take a picture
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDrawingCanvas(true);
                  }}
                  className="bg-app-purple hover:bg-app-purple/90 text-white font-medium rounded-xl px-6 py-5 flex items-center gap-2"
                  disabled={isProcessing}
                >
                  <Pencil size={18} />
                  Draw Here
                </Button>

                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerFileInput();
                  }}
                  className="bg-app-purple hover:bg-app-purple/90 text-white font-medium rounded-xl px-6 py-5 flex items-center gap-2"
                  disabled={isProcessing}
                >
                  <Upload size={18} />
                  Upload File
                </Button>
                
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    openCamera();
                  }}
                  variant="outline"
                  className="border-app-purple text-app-purple hover:bg-app-purple/10 font-medium rounded-xl px-6 py-5 flex items-center gap-2"
                  disabled={isProcessing}
                >
                  <Camera size={18} />
                  Take Photo
                </Button>
              </div>
              
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              
              <p className="text-xs text-gray-500 mt-6">
                Supported formats: JPG, PNG, GIF (max 5MB)
              </p>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadSection;
