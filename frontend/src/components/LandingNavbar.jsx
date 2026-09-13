import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import ThemeSelector from './ThemeSelector';

export default function LandingNavbar() {
  const { theme, setTheme, themes } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('features');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Monitor auth state
  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(!!localStorage.getItem('token'));
    };
    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  // Monitor scroll height to add borders/shadows dynamically
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper function to handle smooth scrolling to landing page sections
  const handleScrollTo = (id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
      isScrolled 
        ? 'border-b border-brand-beige bg-brand-cream/90 py-3 backdrop-blur-md shadow-xs' 
        : 'bg-transparent py-5'
    }`}>
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex items-center justify-between">
          
          {/* Logo Brand matching reference */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center text-brand-coffee group-hover:scale-105 transition-transform">
              <GraduationCap className="h-8 w-8 stroke-[2.2]" />
            </div>
            <span className="font-display font-extrabold text-lg md:text-xl tracking-wider text-brand-charcoal">
              PATHSHALA AI
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden items-center gap-9 md:flex">
            <button 
              onClick={() => handleScrollTo('features')} 
              className={`text-sm font-medium transition-colors relative py-1 cursor-pointer ${
                activeSection === 'features' 
                  ? 'text-brand-charcoal font-semibold' 
                  : 'text-brand-charcoal-light/80 hover:text-brand-charcoal'
              }`}
            >
              Features
              {activeSection === 'features' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-terracotta rounded-full transition-colors" />
              )}
            </button>
            <button 
              onClick={() => handleScrollTo('how-it-works')} 
              className={`text-sm font-medium transition-colors relative py-1 cursor-pointer ${
                activeSection === 'how-it-works' 
                  ? 'text-brand-charcoal font-semibold' 
                  : 'text-brand-charcoal-light/80 hover:text-brand-charcoal'
              }`}
            >
              How It Works
              {activeSection === 'how-it-works' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-terracotta rounded-full transition-colors" />
              )}
            </button>
            <button 
              onClick={() => handleScrollTo('faq')} 
              className={`text-sm font-medium transition-colors relative py-1 cursor-pointer ${
                activeSection === 'faq' 
                  ? 'text-brand-charcoal font-semibold' 
                  : 'text-brand-charcoal-light/80 hover:text-brand-charcoal'
              }`}
            >
              FAQ
              {activeSection === 'faq' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-terracotta rounded-full transition-colors" />
              )}
            </button>
          </div>

            {/* Action CTAs */}
            <div className="hidden items-center gap-3.5 md:flex">
              {/* Theme Selector */}
              <ThemeSelector />

              {isLoggedIn ? (
                <Link 
                  to="/dashboard" 
                  className="rounded-full bg-brand-coffee hover:opacity-95 px-5 py-2 text-xs md:text-sm font-semibold text-white shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Dashboard →
                </Link>
              ) : (
                <>
                  {/* Sign In Button */}
                  <Link 
                    to="/login" 
                    className="rounded-full bg-brand-beige/50 hover:bg-brand-beige/80 border border-brand-beige px-5 py-2 text-xs md:text-sm font-medium text-brand-charcoal transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Sign In
                  </Link>

                  {/* Get Started Button */}
                  <Link 
                    to="/signup" 
                    className="rounded-full bg-brand-coffee hover:opacity-95 px-5 py-2 text-xs md:text-sm font-medium text-white shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>

          {/* Mobile Menu Icon */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-brand-charcoal hover:bg-brand-beige/50 md:hidden transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="border-b border-brand-beige bg-brand-cream/98 py-6 px-6 backdrop-blur-lg md:hidden">
          <div className="flex flex-col gap-5">
            <button 
              onClick={() => handleScrollTo('features')} 
              className="text-left text-base font-semibold text-brand-charcoal hover:text-brand-terracotta transition-colors"
            >
              Features
            </button>
            <button 
              onClick={() => handleScrollTo('how-it-works')} 
              className="text-left text-base font-semibold text-brand-charcoal hover:text-brand-terracotta transition-colors"
            >
              How It Works
            </button>
            <button 
              onClick={() => handleScrollTo('faq')} 
              className="text-left text-base font-semibold text-brand-charcoal hover:text-brand-terracotta transition-colors"
            >
              FAQ
            </button>
            
            <div className="h-px bg-brand-beige my-1" />

            {/* Mobile Theme Selector */}
            <div className="flex flex-col gap-2 py-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-charcoal-light/60">
                Theme Accent
              </span>
              <div className="flex items-center gap-2">
                {themes.map((themeOption) => {
                  const isActive = theme === themeOption.id;
                  return (
                    <button
                      key={themeOption.id}
                      onClick={() => setTheme(themeOption.id)}
                      className={`flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border text-xs font-semibold transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'border-brand-brown bg-brand-beige/40 text-brand-brown'
                          : 'border-brand-beige bg-white text-brand-charcoal hover:bg-brand-beige/10'
                      }`}
                    >
                      <span
                        className="h-3 w-3 rounded-full border border-black/5"
                        style={{ backgroundColor: themeOption.colors[0] }}
                      />
                      <span>{themeOption.name.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="h-px bg-brand-beige my-1" />
            
            <div className="flex flex-col gap-3">
              {isLoggedIn ? (
                <Link 
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center rounded-full bg-brand-coffee py-2.5 text-center text-sm font-semibold text-white shadow-sm"
                >
                  Go to Dashboard →
                </Link>
              ) : (
                <>
                  <Link 
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center rounded-full border border-brand-beige bg-brand-beige/50 py-2.5 text-center text-sm font-semibold text-brand-charcoal"
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center rounded-full bg-brand-coffee py-2.5 text-center text-sm font-semibold text-white shadow-sm"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
