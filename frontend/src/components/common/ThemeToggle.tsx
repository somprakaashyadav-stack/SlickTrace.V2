import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-full border border-slate-300 dark:border-slate-700 shadow-2xs">
      {/* Light Button */}
      <button
        onClick={() => setTheme('light')}
        type="button"
        className={`flex items-center justify-center w-6 h-6 rounded-full transition-all cursor-pointer ${
          theme === 'light'
            ? 'bg-white text-amber-500 shadow-xs'
            : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
        }`}
        title="Switch to Institutional Light Theme"
      >
        <Sun className="w-3.5 h-3.5 fill-amber-400/20" />
      </button>

      {/* Dark Button */}
      <button
        onClick={() => setTheme('dark')}
        type="button"
        className={`flex items-center justify-center w-6 h-6 rounded-full transition-all cursor-pointer ${
          theme === 'dark'
            ? 'bg-slate-900 text-cyan-400 shadow-xs'
            : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
        }`}
        title="Switch to Tactical Dark Theme"
      >
        <Moon className="w-3.5 h-3.5 fill-cyan-400/20" />
      </button>
    </div>
  );
};
