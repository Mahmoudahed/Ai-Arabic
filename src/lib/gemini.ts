import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API with the API key
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

// Helper function to convert file to GenerativeAI.Part
export const fileToGenerativePart = (file: File): Promise<{ inlineData: { data: string; mimeType: string } }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64Data = (reader.result as string).split(',')[1];
      resolve({
        inlineData: {
          data: base64Data,
          mimeType: file.type
        }
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const generateContent = async (
  contentType: string,
  domain: string,
  objective: string,
  dialect: string,
  imageFiles?: File[]
) => {
  try {
    // Use the latest Gemini model
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const prompt = `Generate a ${contentType} in ${dialect} Arabic for a ${domain} business. 
    The objective is ${objective}. Make it engaging and professional.`;
    
    let contentParts: any[] = [prompt];
    
    if (imageFiles && imageFiles.length > 0) {
      const imageParts = await Promise.all(
        imageFiles.map(file => fileToGenerativePart(file))
      );
      contentParts = [...contentParts, ...imageParts];
    }

    const result = await model.generateContent(contentParts);
    const response = await result.response;
    const text = response.text();
    
    if (!text) {
      throw new Error('No content was generated');
    }
    
    return text;
  } catch (error) {
    console.error('Error generating content:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to generate content: ${error.message}`);
    }
    throw new Error('An unknown error occurred while generating content');
  }
}; 