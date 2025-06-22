
import React from 'react';
import { motion } from 'framer-motion';
import { Element } from '../data/elements';

interface ElementCardProps {
  element: Element;
  onClick: () => void;
  onHover: (atomicNumber: number | null) => void;
  isHovered: boolean;
  isHighlighted: boolean;
}

export const ElementCard: React.FC<ElementCardProps> = ({
  element,
  onClick,
  onHover,
  isHovered,
  isHighlighted
}) => {
  const getCategoryStyle = (category: string) => {
    const styles = {
      'alkali metal': 'from-blue-500 to-blue-600',
      'alkaline earth metal': 'from-green-500 to-green-600',
      'transition metal': 'from-yellow-500 to-yellow-600',
      'post-transition metal': 'from-gray-500 to-gray-600',
      'metalloid': 'from-orange-500 to-orange-600',
      'nonmetal': 'from-pink-500 to-pink-600',
      'halogen': 'from-purple-500 to-purple-600',
      'noble gas': 'from-cyan-500 to-cyan-600',
      'lanthanide': 'from-indigo-500 to-indigo-600',
      'actinide': 'from-red-500 to-red-600'
    };
    return styles[category as keyof typeof styles] || 'from-gray-500 to-gray-600';
  };

  return (
    <motion.div
      className={`
        relative w-full h-full min-h-[60px] rounded-lg cursor-pointer
        backdrop-blur-sm border border-white/20
        transition-all duration-300 ease-out
        ${isHighlighted ? 'opacity-100' : 'opacity-60'}
      `}
      style={{
        background: `linear-gradient(135deg, ${element.color}40, ${element.color}60)`,
      }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: `0 0 20px ${element.color}80`,
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      onHoverStart={() => onHover(element.atomicNumber)}
      onHoverEnd={() => onHover(null)}
      layout
    >
      <motion.div
        className={`
          absolute inset-0 rounded-lg bg-gradient-to-br ${getCategoryStyle(element.category)}
          opacity-80 transition-opacity duration-300
          ${isHovered ? 'opacity-100' : 'opacity-60'}
        `}
        animate={{
          boxShadow: isHovered 
            ? `0 0 30px ${element.color}60, inset 0 0 20px ${element.color}40`
            : '0 0 0px transparent'
        }}
      />
      
      <div className="relative z-10 p-2 h-full flex flex-col justify-between text-white">
        <div className="text-xs font-medium opacity-90 leading-none">
          {element.atomicNumber}
        </div>
        
        <div className="flex-1 flex items-center justify-center">
          <div className="text-lg sm:text-xl font-bold leading-none">
            {element.symbol}
          </div>
        </div>
        
        <div className="text-xs opacity-80 leading-none truncate">
          {element.name}
        </div>
      </div>

      {/* Glow effect for hovered element */}
      <motion.div
        className="absolute inset-0 rounded-lg pointer-events-none"
        animate={{
          background: isHovered 
            ? `radial-gradient(circle, ${element.color}30 0%, transparent 70%)`
            : 'transparent'
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};
