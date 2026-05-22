import React, { useState, useEffect, useRef } from 'react';
import { Palette, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme, themes, currentTheme } = useTheme();
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex h-9 w-9 items-center justify-center rounded-lg border border-brand-beige/55 bg-white/50 text-brand-charcoal/70 hover:border-brand-brown/40 hover:bg-brand-beige/35 hover:text-brand-brown transition-all duration-200 focus:outline-none hover:scale-105 active:scale-95 cursor-pointer"
        title={`Change Theme (Current: ${currentTheme.name})`}
      >
        <Palette className="h-[18px] w-[18px] transition-transform duration-300 group-hover:rotate-12" />
        {/* Subtle dot showing accent color */}
        <span 
          className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full border border-white shadow-sm transition-colors duration-300"
          style={{ backgroundColor: currentTheme.colors[0] }}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2.5 w-56 origin-top-right rounded-xl border border-brand-beige bg-white/80 p-1.5 shadow-xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200 z-55">
          <div className="px-2.5 py-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-charcoal-light/50">
              Personalize Theme
            </span>
          </div>
          
          <div className="h-px bg-brand-beige/40 my-1" />

          <div className="space-y-0.5">
            {themes.map((themeOption) => {
              const isActive = theme === themeOption.id;
              return (
                <button
                  key={themeOption.id}
                  onClick={() => {
                    setTheme(themeOption.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between rounded-lg px-2.5 py-2 text-left text-sm transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-brand-beige/40 font-semibold text-brand-brown'
                      : 'text-brand-charcoal/80 hover:bg-brand-beige/25 hover:text-brand-charcoal'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {/* Swatches representation */}
                    <div className="flex -space-x-1.5">
                      <span
                        className="h-3.5 w-3.5 rounded-full border border-black/5 shadow-sm"
                        style={{ backgroundColor: themeOption.colors[0] }}
                      />
                      <span
                        className="h-3.5 w-3.5 rounded-full border border-black/5 shadow-sm"
                        style={{ backgroundColor: themeOption.colors[1] }}
                      />
                    </div>
                    <span>{themeOption.name}</span>
                  </div>
                  
                  {isActive && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-brown/10 text-brand-brown">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
