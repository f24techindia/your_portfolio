import React from 'react';
import { Menu, X, Settings } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  showAdminPanel: boolean;
  setShowAdminPanel: (show: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  isMenuOpen,
  setIsMenuOpen,
  showAdminPanel,
  setShowAdminPanel
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Palak Diwakar
          </h1>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            
            <button
              onClick={() => setShowAdminPanel(!showAdminPanel)}
              className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors duration-200"
              aria-label="Admin panel"
            >
              <Settings size={20} />
            </button>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
              aria-label="Menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};