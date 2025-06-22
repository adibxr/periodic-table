
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
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-orbitron">
          Interactive Periodic Table
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-inter">
          Explore all 118 elements with interactive 3D models and detailed information
        </p>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Social Media Links */}
        <motion.a
          href="https://github.com/adibxr"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-card border border-border hover:bg-accent transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Github size={20} className="text-foreground" />
        </motion.a>
        
        <motion.a
          href="https://instagram.com/adi.bxr"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-card border border-border hover:bg-accent transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Instagram size={20} className="text-foreground" />
        </motion.a>
        
        {/* Theme Toggle */}
        <motion.button
          onClick={toggleTheme}
          className="p-3 rounded-full bg-card border border-border hover:bg-accent transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {theme === 'dark' ? <Sun size={20} className="text-foreground" /> : <Moon size={20} className="text-foreground" />}
        </motion.button>
      </div>
    </motion.header>
  );
};
