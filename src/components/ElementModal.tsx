
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { Element } from '../data/elements';
import { AtomicModel3D } from './AtomicModel3D';

interface ElementModalProps {
  element: Element;
  onClose: () => void;
}

export const ElementModal: React.FC<ElementModalProps> = ({ element, onClose }) => {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Generate Wikipedia URL
  const wikipediaUrl = `https://en.wikipedia.org/wiki/${element.name}`;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      
      {/* Modal */}
      <motion.div
        className="relative w-full max-w-4xl bg-slate-900/95 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 50 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        {/* Header */}
        <div 
          className="p-6 border-b border-white/10"
          style={{
            background: `linear-gradient(135deg, ${element.color}20, ${element.color}40)`
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div 
                className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold text-white"
                style={{ background: element.color }}
              >
                {element.symbol}
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">{element.name}</h2>
                <p className="text-gray-300">Atomic Number {element.atomicNumber}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Wikipedia Link */}
              <motion.a
                href={wikipediaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink size={18} />
                <span className="text-sm">Wikipedia</span>
              </motion.a>
              
              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 transition-colors text-white"
              >
                <X size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* 3D Model */}
          <div className="h-80 bg-slate-800/50 rounded-xl border border-white/10 overflow-hidden">
            <AtomicModel3D element={element} />
          </div>

          {/* Element Info */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800/50 rounded-lg p-4 border border-white/10">
                <div className="text-gray-400 text-sm mb-1">Atomic Weight</div>
                <div className="text-white text-lg font-semibold">{element.atomicWeight}</div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4 border border-white/10">
                <div className="text-gray-400 text-sm mb-1">State</div>
                <div className="text-white text-lg font-semibold capitalize">{element.state}</div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4 border border-white/10">
                <div className="text-gray-400 text-sm mb-1">Group</div>
                <div className="text-white text-lg font-semibold">{element.group || 'N/A'}</div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4 border border-white/10">
                <div className="text-gray-400 text-sm mb-1">Period</div>
                <div className="text-white text-lg font-semibold">{element.period}</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-800/50 rounded-lg p-4 border border-white/10">
                <div className="text-gray-400 text-sm mb-2">Classification</div>
                <div className="text-white capitalize font-semibold">{element.category}</div>
              </div>
              
              <div className="bg-slate-800/50 rounded-lg p-4 border border-white/10">
                <div className="text-gray-400 text-sm mb-2">Block</div>
                <div className="text-white uppercase font-semibold">{element.block}-block</div>
              </div>

              {element.discoverer && (
                <div className="bg-slate-800/50 rounded-lg p-4 border border-white/10">
                  <div className="text-gray-400 text-sm mb-2">Discoverer</div>
                  <div className="text-white font-semibold">{element.discoverer}</div>
                </div>
              )}

              <div className="bg-slate-800/50 rounded-lg p-4 border border-white/10">
                <div className="text-gray-400 text-sm mb-2">Electron Configuration</div>
                <div className="text-white font-mono text-sm">
                  {element.electronShells.map((shell, index) => (
                    <span key={index}>
                      {index + 1}s<sup>{shell}</sup>
                      {index < element.electronShells.length - 1 ? ' ' : ''}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
