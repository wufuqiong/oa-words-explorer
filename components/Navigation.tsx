import React from 'react';
import { Home, BookOpen, Gamepad2, Printer } from 'lucide-react';
import { AppMode } from '../types';

interface NavigationProps {
  currentMode: AppMode;
  setMode: (mode: AppMode) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentMode, setMode }) => {
  const navItems = [
    { mode: AppMode.HOME, label: 'Home', icon: <Home size={20} /> },
    { mode: AppMode.LEARN, label: 'Learn', icon: <BookOpen size={20} /> },
    { mode: AppMode.PRACTICE, label: 'Play', icon: <Gamepad2 size={20} /> },
    { mode: AppMode.WORKSHEETS, label: 'Print', icon: <Printer size={20} /> },
  ];

  return (
    <nav className="no-print fixed bottom-0 left-0 right-0 md:top-0 md:bottom-auto bg-white/90 backdrop-blur-md border-t md:border-b border-gray-200 p-4 z-50">
      <div className="max-w-5xl mx-auto flex justify-around items-center">
        {navItems.map((item) => (
          <button
            key={item.mode}
            onClick={() => setMode(item.mode)}
            className={`flex flex-col md:flex-row items-center gap-1 md:gap-2 px-3 md:px-4 py-2 rounded-xl transition-colors ${
              currentMode === item.mode 
                ? 'text-blue-600 bg-blue-50' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            {item.icon}
            <span className="text-[10px] md:text-sm font-bold">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;