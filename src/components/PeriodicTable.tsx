
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ElementCard } from './ElementCard';
import { ElementModal } from './ElementModal';
import { SearchAndFilters } from './SearchAndFilters';
import { Header } from './Header';
import { elements, Element } from '../data/elements';

export const PeriodicTable = () => {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [hoveredElement, setHoveredElement] = useState<number | null>(null);

  const filteredElements = elements.filter(element => {
    const matchesSearch = element.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         element.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         element.atomicNumber.toString().includes(searchTerm);
    const matchesCategory = categoryFilter === 'all' || element.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleElementClick = (element: Element) => {
    setSelectedElement(element);
  };

  const handleCloseModal = () => {
    setSelectedElement(null);
  };

  // Create a 10x18 grid for the periodic table
  const createGrid = () => {
    const grid = Array(10).fill(null).map(() => Array(18).fill(null));
    
    filteredElements.forEach(element => {
      const { row, col } = element.position;
      if (row < 10 && col < 18) {
        grid[row][col] = element;
      }
    });
    
    return grid;
  };

  const grid = createGrid();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        <Header />

        <SearchAndFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-18 gap-1 mb-8 max-w-6xl mx-auto"
          style={{ gridTemplateColumns: 'repeat(18, minmax(0, 1fr))' }}
        >
          {grid.map((row, rowIndex) =>
            row.map((element, colIndex) => (
              <div key={`${rowIndex}-${colIndex}`} className="aspect-square">
                {element ? (
                  <ElementCard
                    element={element}
                    onClick={() => handleElementClick(element)}
                    onHover={setHoveredElement}
                    isHovered={hoveredElement === element.atomicNumber}
                    isHighlighted={filteredElements.includes(element)}
                  />
                ) : (
                  <div className="w-full h-full" />
                )}
              </div>
            ))
          )}
        </motion.div>

        {/* Element count display */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-4"
        >
          <p className="text-gray-300">
            Showing {filteredElements.length} of {elements.length} elements
          </p>
        </motion.div>

        <AnimatePresence>
          {selectedElement && (
            <ElementModal
              element={selectedElement}
              onClose={handleCloseModal}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
