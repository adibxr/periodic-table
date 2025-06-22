
import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';

interface SearchAndFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  categoryFilter: string;
  onCategoryChange: (category: string) => void;
}

export const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  searchTerm,
  onSearchChange,
  categoryFilter,
  onCategoryChange
}) => {
  const categories = [
    { value: 'all', label: 'All Elements' },
    { value: 'alkali metal', label: 'Alkali Metals' },
    { value: 'alkaline earth metal', label: 'Alkaline Earth' },
    { value: 'transition metal', label: 'Transition Metals' },
    { value: 'post-transition metal', label: 'Post-transition' },
    { value: 'metalloid', label: 'Metalloids' },
    { value: 'nonmetal', label: 'Nonmetals' },
    { value: 'halogen', label: 'Halogens' },
    { value: 'noble gas', label: 'Noble Gases' },
    { value: 'lanthanide', label: 'Lanthanides' },
    { value: 'actinide', label: 'Actinides' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 flex flex-col md:flex-row gap-4 max-w-4xl mx-auto"
    >
      {/* Search Box */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
        <input
          type="text"
          placeholder="Search elements by name, symbol, or atomic number..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
        />
      </div>

      {/* Category Filter */}
      <div className="relative">
        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
        <select
          value={categoryFilter}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="pl-10 pr-8 py-3 bg-card border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all appearance-none cursor-pointer min-w-[200px]"
        >
          {categories.map((category) => (
            <option key={category.value} value={category.value} className="bg-card text-foreground">
              {category.label}
            </option>
          ))}
        </select>
      </div>
    </motion.div>
  );
};
