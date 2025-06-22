
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Instagram, Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-between items-center mb-8"
    >
      <div className="text-center flex-1">
        <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Interactive Periodic Table
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Explore all 118 elements with interactive 3D models and detailed information
        </p>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Social Media Links */}
        <motion.a
          href="https://github.com/adibxr"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-slate-800/50 backdrop-blur-sm border border-white/20 text-white hover:bg-slate-700/50 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Github size={20} />
        </motion.a>
        
        <motion.a
          href="https://instagram.com/adibxr"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-slate-800/50 backdrop-blur-sm border border-white/20 text-white hover:bg-slate-700/50 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Instagram size={20} />
        </motion.a>
        
        {/* Theme Toggle */}
        <motion.button
          onClick={toggleTheme}
          className="p-3 rounded-full bg-slate-800/50 backdrop-blur-sm border border-white/20 text-white hover:bg-slate-700/50 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </motion.button>
      </div>
    </motion.header>
  );
};
