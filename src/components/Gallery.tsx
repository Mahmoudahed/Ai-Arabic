
import React from 'react';
import { Card, CardContent } from 'ui2/card';
import { Button } from 'ui2/button';
import { Trash2, Download } from 'lucide-react';
import { Image } from '../types/indexs';
import { motion } from 'framer-motion';

interface GalleryProps {
  images: Image[];
  onDeleteImage: (id: string) => void;
}

const Gallery = ({ images, onDeleteImage }: GalleryProps) => {
  const completedImages = images.filter(img => img.status === 'completed');
  
  if (completedImages.length === 0) {
    return null;
  }

  const downloadImage = (url: string, title: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title}-transformed.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Transformed Drawings</h2>
      
      {completedImages.map((image) => (
        <motion.div 
          key={image.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4 items-start">
            {/* Original Image */}
            <div className="w-full md:w-1/4">
              <Card className="overflow-hidden">
                <CardContent className="p-2">
                  <div className="bg-gray-50 p-2 rounded-md">
                    <img 
                      src={image.originalImage} 
                      alt="Original Drawing" 
                      className="w-full h-48 object-contain rounded"
                    />
                  </div>
                  <div className="pt-4 px-2 pb-2">
                    <h3 className="font-semibold text-gray-800">Original Drawing</h3>
                    <p className="text-sm text-gray-600">{image.title}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Transformed Images */}
            <div className="w-full md:w-3/4">
              <h3 className="text-lg font-medium text-gray-700 mb-3">Professional Versions:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {image.transformedImages?.map((transformedUrl, index) => (
                  <motion.div 
                    key={`${image.id}-transformed-${index}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden h-full flex flex-col">
                      <CardContent className="p-2 flex-1 flex flex-col">
                        <div className="bg-gray-50 p-2 rounded-md flex-1">
                          <img 
                            src={transformedUrl} 
                            alt={`Transformed Drawing ${index + 1}`} 
                            className="w-full h-40 object-cover rounded"
                          />
                        </div>
                        <div className="pt-2 pb-1 flex justify-between items-center">
                          <span className="text-sm text-gray-600">Version {index + 1}</span>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => downloadImage(transformedUrl, `${image.title}-v${index+1}`)}
                            className="p-1 h-8 w-8"
                          >
                            <Download size={16} />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDeleteImage(image.id)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 border-red-200"
            >
              <Trash2 size={16} className="mr-1" /> Delete
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Gallery;
