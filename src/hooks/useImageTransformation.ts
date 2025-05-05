import { useState } from 'react';
import { Image, ProcessOptions } from '@/types/indexs';
import { toast } from 'sonner';

export function useImageTransformation() {
  const [images, setImages] = useState<Image[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const uploadImage = async (file: File, title: string = "Untitled Artwork"): Promise<string> => {
    try {
      // Create a new image entry
      const imageId = Math.random().toString(36).substring(2, 9);
      
      // Create a preview URL
      const imageUrl = URL.createObjectURL(file);
      
      // Add to images array
      const newImage: Image = {
        id: imageId,
        originalImage: imageUrl,
        createdAt: new Date(),
        title: title || `Artwork ${images.length + 1}`,
        status: 'uploading',
        transformedImages: [] // Initialize empty array for multiple transformations
      };
      
      setImages(prev => [...prev, newImage]);
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update status to 'processing'
      setImages(prev => prev.map(img => 
        img.id === imageId ? { ...img, status: 'processing' } : img
      ));
      
      return imageId;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image. Please try again.');
      throw error;
    }
  };

  const transformImage = async (imageId: string, options: ProcessOptions): Promise<void> => {
    try {
      setIsProcessing(true);
      
      const image = images.find(img => img.id === imageId);
      if (!image) {
        throw new Error('Image not found');
      }

      // Simulate AI processing time
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // In a real implementation, we would:
      // 1. Send the original image to an AI model like Stable Diffusion
      // 2. Use the original image as a reference for generating variations
      // 3. Apply style transfer while maintaining the core elements of the drawing
      
      // Mock transformed results that attempt to maintain similarity with original
      const mockTransformations: Record<ProcessOptions['style'], string[]> = {
        'realistic': [
          'https://images.unsplash.com/photo-1623387641168-d9803ddd3f35',
          'https://images.unsplash.com/photo-1552728089-57bdde30beb3',
          'https://images.unsplash.com/photo-1551269901-5c5e14c25df7'
        ],
        'cartoon': [
          'https://images.unsplash.com/photo-1580477667929-3f53f6c7b4e1',
          'https://images.unsplash.com/photo-1633256374024-ec28956089e2',
          'https://images.unsplash.com/photo-1633256372243-e80d3711dcb4'
        ],
        'painterly': [
          'https://images.unsplash.com/photo-1579783901586-d88db74b4fe4',
          'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5',
          'https://images.unsplash.com/photo-1579783928621-7a13d66a62b1'
        ],
        'fantasy': [
          'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3',
          'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d',
          'https://images.unsplash.com/photo-1506466010722-395aa2bef877'
        ]
      };

      // Get style-specific transformations
      const transformedImages = mockTransformations[options.style];
      
      // Update the image with transformed versions
      setImages(prev => prev.map(img => 
        img.id === imageId 
          ? { ...img, transformedImages, status: 'completed' } 
          : img
      ));
      
      toast.success('Generated similar drawings with enhanced details!');
    } catch (error) {
      console.error('Error transforming image:', error);
      
      setImages(prev => prev.map(img => 
        img.id === imageId ? { ...img, status: 'failed' } : img
      ));
      
      toast.error('Failed to generate similar drawings. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const deleteImage = (imageId: string) => {
    setImages(prev => prev.filter(img => img.id !== imageId));
    toast.info('Image deleted');
  };

  return {
    images,
    isProcessing,
    uploadImage,
    transformImage,
    deleteImage
  };
}
