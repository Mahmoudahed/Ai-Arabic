
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="py-8 px-4 mt-10">
      <div className="max-w-5xl mx-auto flex flex-col items-center justify-center">
        <motion.div 
          className="flex items-center gap-2 mb-4"
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-gray-600">Made with</span>
          <Heart size={16} className="text-app-pink fill-app-pink animate-pulse" />
          <span className="text-gray-600">for budding artists</span>
        </motion.div>
        
        <div className="text-xs text-gray-500 text-center">
          <p>Art-to-Life transforms children's drawings into realistic images using AI.</p>
          <p>© 2025 Art-to-Life Generator. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
