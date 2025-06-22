
export interface Element {
  atomicNumber: number;
  symbol: string;
  name: string;
  atomicWeight: number;
  group: number | null;
  period: number;
  block: string;
  category: string;
  state: string;
  discoverer?: string;
  electronShells: number[];
  color: string;
  position: { row: number; col: number };
}

export const elements: Element[] = [
  // Period 1
  { atomicNumber: 1, symbol: "H", name: "Hydrogen", atomicWeight: 1.008, group: 1, period: 1, block: "s", category: "nonmetal", state: "gas", discoverer: "Henry Cavendish", electronShells: [1], color: "#ff6b6b", position: { row: 0, col: 0 } },
  { atomicNumber: 2, symbol: "He", name: "Helium", atomicWeight: 4.003, group: 18, period: 1, block: "s", category: "noble gas", state: "gas", discoverer: "Pierre Janssen", electronShells: [2], color: "#4ecdc4", position: { row: 0, col: 17 } },
  
  // Period 2
  { atomicNumber: 3, symbol: "Li", name: "Lithium", atomicWeight: 6.94, group: 1, period: 2, block: "s", category: "alkali metal", state: "solid", discoverer: "Johan August Arfwedson", electronShells: [2, 1], color: "#45b7d1", position: { row: 1, col: 0 } },
  { atomicNumber: 4, symbol: "Be", name: "Beryllium", atomicWeight: 9.012, group: 2, period: 2, block: "s", category: "alkaline earth metal", state: "solid", discoverer: "Louis-Nicolas Vauquelin", electronShells: [2, 2], color: "#96ceb4", position: { row: 1, col: 1 } },
  { atomicNumber: 5, symbol: "B", name: "Boron", atomicWeight: 10.81, group: 13, period: 2, block: "p", category: "metalloid", state: "solid", discoverer: "Joseph Louis Gay-Lussac", electronShells: [2, 3], color: "#feca57", position: { row: 1, col: 12 } },
  { atomicNumber: 6, symbol: "C", name: "Carbon", atomicWeight: 12.01, group: 14, period: 2, block: "p", category: "nonmetal", state: "solid", discoverer: "Ancient", electronShells: [2, 4], color: "#ff9ff3", position: { row: 1, col: 13 } },
  { atomicNumber: 7, symbol: "N", name: "Nitrogen", atomicWeight: 14.01, group: 15, period: 2, block: "p", category: "nonmetal", state: "gas", discoverer: "Daniel Rutherford", electronShells: [2, 5], color: "#54a0ff", position: { row: 1, col: 14 } },
  { atomicNumber: 8, symbol: "O", name: "Oxygen", atomicWeight: 16.00, group: 16, period: 2, block: "p", category: "nonmetal", state: "gas", discoverer: "Joseph Priestley", electronShells: [2, 6], color: "#5f27cd", position: { row: 1, col: 15 } },
  { atomicNumber: 9, symbol: "F", name: "Fluorine", atomicWeight: 19.00, group: 17, period: 2, block: "p", category: "halogen", state: "gas", discoverer: "André-Marie Ampère", electronShells: [2, 7], color: "#00d2d3", position: { row: 1, col: 16 } },
  { atomicNumber: 10, symbol: "Ne", name: "Neon", atomicWeight: 20.18, group: 18, period: 2, block: "p", category: "noble gas", state: "gas", discoverer: "William Ramsay", electronShells: [2, 8], color: "#ff6348", position: { row: 1, col: 17 } },
  
  // Period 3
  { atomicNumber: 11, symbol: "Na", name: "Sodium", atomicWeight: 22.99, group: 1, period: 3, block: "s", category: "alkali metal", state: "solid", discoverer: "Humphry Davy", electronShells: [2, 8, 1], color: "#45b7d1", position: { row: 2, col: 0 } },
  { atomicNumber: 12, symbol: "Mg", name: "Magnesium", atomicWeight: 24.31, group: 2, period: 3, block: "s", category: "alkaline earth metal", state: "solid", discoverer: "Joseph Black", electronShells: [2, 8, 2], color: "#96ceb4", position: { row: 2, col: 1 } },
  { atomicNumber: 13, symbol: "Al", name: "Aluminum", atomicWeight: 26.98, group: 13, period: 3, block: "p", category: "post-transition metal", state: "solid", discoverer: "Hans Christian Ørsted", electronShells: [2, 8, 3], color: "#a4b0be", position: { row: 2, col: 12 } },
  { atomicNumber: 14, symbol: "Si", name: "Silicon", atomicWeight: 28.09, group: 14, period: 3, block: "p", category: "metalloid", state: "solid", discoverer: "Jöns Jacob Berzelius", electronShells: [2, 8, 4], color: "#feca57", position: { row: 2, col: 13 } },
  { atomicNumber: 15, symbol: "P", name: "Phosphorus", atomicWeight: 30.97, group: 15, period: 3, block: "p", category: "nonmetal", state: "solid", discoverer: "Hennig Brand", electronShells: [2, 8, 5], color: "#ff9ff3", position: { row: 2, col: 14 } },
  { atomicNumber: 16, symbol: "S", name: "Sulfur", atomicWeight: 32.07, group: 16, period: 3, block: "p", category: "nonmetal", state: "solid", discoverer: "Ancient", electronShells: [2, 8, 6], color: "#54a0ff", position: { row: 2, col: 15 } },
  { atomicNumber: 17, symbol: "Cl", name: "Chlorine", atomicWeight: 35.45, group: 17, period: 3, block: "p", category: "halogen", state: "gas", discoverer: "Carl Wilhelm Scheele", electronShells: [2, 8, 7], color: "#5f27cd", position: { row: 2, col: 16 } },
  { atomicNumber: 18, symbol: "Ar", name: "Argon", atomicWeight: 39.95, group: 18, period: 3, block: "p", category: "noble gas", state: "gas", discoverer: "Lord Rayleigh", electronShells: [2, 8, 8], color: "#00d2d3", position: { row: 2, col: 17 } },
  
  // Period 4 (transition metals)
  { atomicNumber: 19, symbol: "K", name: "Potassium", atomicWeight: 39.10, group: 1, period: 4, block: "s", category: "alkali metal", state: "solid", discoverer: "Humphry Davy", electronShells: [2, 8, 8, 1], color: "#45b7d1", position: { row: 3, col: 0 } },
  { atomicNumber: 20, symbol: "Ca", name: "Calcium", atomicWeight: 40.08, group: 2, period: 4, block: "s", category: "alkaline earth metal", state: "solid", discoverer: "Humphry Davy", electronShells: [2, 8, 8, 2], color: "#96ceb4", position: { row: 3, col: 1 } },
  { atomicNumber: 21, symbol: "Sc", name: "Scandium", atomicWeight: 44.96, group: 3, period: 4, block: "d", category: "transition metal", state: "solid", discoverer: "Lars Fredrik Nilson", electronShells: [2, 8, 9, 2], color: "#ffd93d", position: { row: 3, col: 2 } },
  { atomicNumber: 22, symbol: "Ti", name: "Titanium", atomicWeight: 47.87, group: 4, period: 4, block: "d", category: "transition metal", state: "solid", discoverer: "William Gregor", electronShells: [2, 8, 10, 2], color: "#ffd93d", position: { row: 3, col: 3 } },
  { atomicNumber: 23, symbol: "V", name: "Vanadium", atomicWeight: 50.94, group: 5, period: 4, block: "d", category: "transition metal", state: "solid", discoverer: "Andrés Manuel del Río", electronShells: [2, 8, 11, 2], color: "#ffd93d", position: { row: 3, col: 4 } },
  { atomicNumber: 24, symbol: "Cr", name: "Chromium", atomicWeight: 51.996, group: 6, period: 4, block: "d", category: "transition metal", state: "solid", discoverer: "Louis Nicolas Vauquelin", electronShells: [2, 8, 13, 1], color: "#ffd93d", position: { row: 3, col: 5 } },
  { atomicNumber: 25, symbol: "Mn", name: "Manganese", atomicWeight: 54.94, group: 7, period: 4, block: "d", category: "transition metal", state: "solid", discoverer: "Carl Wilhelm Scheele", electronShells: [2, 8, 13, 2], color: "#ffd93d", position: { row: 3, col: 6 } },
  { atomicNumber: 26, symbol: "Fe", name: "Iron", atomicWeight: 55.85, group: 8, period: 4, block: "d", category: "transition metal", state: "solid", discoverer: "Ancient", electronShells: [2, 8, 14, 2], color: "#ffd93d", position: { row: 3, col: 7 } },
  { atomicNumber: 27, symbol: "Co", name: "Cobalt", atomicWeight: 58.93, group: 9, period: 4, block: "d", category: "transition metal", state: "solid", discoverer: "Georg Brandt", electronShells: [2, 8, 15, 2], color: "#ffd93d", position: { row: 3, col: 8 } },
  { atomicNumber: 28, symbol: "Ni", name: "Nickel", atomicWeight: 58.69, group: 10, period: 4, block: "d", category: "transition metal", state: "solid", discoverer: "Axel Fredrik Cronstedt", electronShells: [2, 8, 16, 2], color: "#ffd93d", position: { row: 3, col: 9 } },
  { atomicNumber: 29, symbol: "Cu", name: "Copper", atomicWeight: 63.55, group: 11, period: 4, block: "d", category: "transition metal", state: "solid", discoverer: "Ancient", electronShells: [2, 8, 18, 1], color: "#ffd93d", position: { row: 3, col: 10 } },
  { atomicNumber: 30, symbol: "Zn", name: "Zinc", atomicWeight: 65.38, group: 12, period: 4, block: "d", category: "transition metal", state: "solid", discoverer: "Ancient", electronShells: [2, 8, 18, 2], color: "#ffd93d", position: { row: 3, col: 11 } },
  { atomicNumber: 31, symbol: "Ga", name: "Gallium", atomicWeight: 69.72, group: 13, period: 4, block: "p", category: "post-transition metal", state: "solid", discoverer: "Lecoq de Boisbaudran", electronShells: [2, 8, 18, 3], color: "#a4b0be", position: { row: 3, col: 12 } },
  { atomicNumber: 32, symbol: "Ge", name: "Germanium", atomicWeight: 72.63, group: 14, period: 4, block: "p", category: "metalloid", state: "solid", discoverer: "Clemens Winkler", electronShells: [2, 8, 18, 4], color: "#feca57", position: { row: 3, col: 13 } },
  { atomicNumber: 33, symbol: "As", name: "Arsenic", atomicWeight: 74.92, group: 15, period: 4, block: "p", category: "metalloid", state: "solid", discoverer: "Albertus Magnus", electronShells: [2, 8, 18, 5], color: "#feca57", position: { row: 3, col: 14 } },
  { atomicNumber: 34, symbol: "Se", name: "Selenium", atomicWeight: 78.97, group: 16, period: 4, block: "p", category: "nonmetal", state: "solid", discoverer: "Jöns Jacob Berzelius", electronShells: [2, 8, 18, 6], color: "#ff9ff3", position: { row: 3, col: 15 } },
  { atomicNumber: 35, symbol: "Br", name: "Bromine", atomicWeight: 79.90, group: 17, period: 4, block: "p", category: "halogen", state: "liquid", discoverer: "Antoine Jérôme Balard", electronShells: [2, 8, 18, 7], color: "#5f27cd", position: { row: 3, col: 16 } },
  { atomicNumber: 36, symbol: "Kr", name: "Krypton", atomicWeight: 83.80, group: 18, period: 4, block: "p", category: "noble gas", state: "gas", discoverer: "William Ramsay", electronShells: [2, 8, 18, 8], color: "#00d2d3", position: { row: 3, col: 17 } },
];
