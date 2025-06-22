
export const getElementColors = (category: string, theme: 'light' | 'dark') => {
  const lightColors = {
    'alkali metal': '#3b82f6',
    'alkaline earth metal': '#10b981',
    'transition metal': '#f59e0b',
    'post-transition metal': '#6b7280',
    'metalloid': '#f97316',
    'nonmetal': '#ec4899',
    'halogen': '#8b5cf6',
    'noble gas': '#06b6d4',
    'lanthanide': '#6366f1',
    'actinide': '#ef4444'
  };

  const darkColors = {
    'alkali metal': '#60a5fa',
    'alkaline earth metal': '#34d399',
    'transition metal': '#fbbf24',
    'post-transition metal': '#9ca3af',
    'metalloid': '#fb923c',
    'nonmetal': '#f472b6',
    'halogen': '#a78bfa',
    'noble gas': '#22d3ee',
    'lanthanide': '#818cf8',
    'actinide': '#f87171'
  };

  const colors = theme === 'dark' ? darkColors : lightColors;
  return colors[category as keyof typeof colors] || (theme === 'dark' ? '#9ca3af' : '#6b7280');
};

export const getCategoryGradient = (category: string, theme: 'light' | 'dark') => {
  const baseColor = getElementColors(category, theme);
  const lightGradients = {
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

  const darkGradients = {
    'alkali metal': 'from-blue-400 to-blue-500',
    'alkaline earth metal': 'from-green-400 to-green-500',
    'transition metal': 'from-yellow-400 to-yellow-500',
    'post-transition metal': 'from-gray-400 to-gray-500',
    'metalloid': 'from-orange-400 to-orange-500',
    'nonmetal': 'from-pink-400 to-pink-500',
    'halogen': 'from-purple-400 to-purple-500',
    'noble gas': 'from-cyan-400 to-cyan-500',
    'lanthanide': 'from-indigo-400 to-indigo-500',
    'actinide': 'from-red-400 to-red-500'
  };

  const gradients = theme === 'dark' ? darkGradients : lightGradients;
  return gradients[category as keyof typeof gradients] || (theme === 'dark' ? 'from-gray-400 to-gray-500' : 'from-gray-500 to-gray-600');
};
