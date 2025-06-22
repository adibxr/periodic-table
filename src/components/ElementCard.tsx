
import React from 'react';
import { motion } from 'framer-motion';
import { Element } from '../data/elements';
import { useTheme } from './ThemeProvider';
import { getElementColors, getCategoryGradient } from '../utils/elementColors';

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
  const { theme } = useTheme();
  const elementColor = getElementColors(element.category, theme);
  const gradientClasses = getCategoryGradient(element.category, theme);

  return (
    <motion.div
      className={`
        relative w-full h-full min-h-[60px] rounded-lg cursor-pointer
        backdrop-blur-sm border border-white/20
        transition-all duration-300 ease-out
        ${isHighlighted ? 'opacity-100' : 'opacity-60'}
      `}
      style={{
        background: `linear-gradient(135deg, ${elementColor}40, ${elementColor}60)`,
      }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: `0 0 20px ${elementColor}80`,
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      onHoverStart={() => onHover(element.atomicNumber)}
      onHoverEnd={() => onHover(null)}
      layout
    >
      <motion.div
        className={`
          absolute inset-0 rounded-lg bg-gradient-to-br ${gradientClasses}
          opacity-80 transition-opacity duration-300
          ${isHovered ? 'opacity-100' : 'opacity-60'}
        `}
        animate={{
          boxShadow: isHovered 
            ? `0 0 30px ${elementColor}60, inset 0 0 20px ${elementColor}40`
            : '0 0 0px transparent'
        }}
      />
      
      <div className="relative z-10 p-2 h-full flex flex-col justify-between text-white font-inter">
        <div className="text-xs font-medium opacity-90 leading-none">
          {element.atomicNumber}
        </div>
        
        <div className="flex-1 flex items-center justify-center">
          <div className="text-lg sm:text-xl font-bold leading-none font-orbitron">
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
            ? `radial-gradient(circle, ${elementColor}30 0%, transparent 70%)`
            : 'transparent'
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};
