import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Menu, X, ArrowRight } from 'lucide-react';

export default function LandingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Monitor scroll height to add borders/shadows dynamically
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
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
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'border-b border-brand-beige bg-brand-cream/80 py-3 backdrop-blur-md shadow-sm' 
        : 'bg-transparent py-5'
    }`}>
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Brand */}
          <Link to="/" className="flex items-center group">
            <img src="/logo.png" alt="Pathshala AI Logo" className="h-11 w-auto object-contain transition-transform group-hover:scale-[1.02]" />
          </Link>

          {/* Public Desktop Navigation Links */}
          <div className="hidden items-center gap-8 md:flex">
            <button 
              onClick={() => handleScrollTo('features')} 
              className="text-sm font-medium text-brand-charcoal/75 transition-colors hover:text-brand-brown"
            >
              Features
            </button>
            <button 
              onClick={() => handleScrollTo('how-it-works')} 
              className="text-sm font-medium text-brand-charcoal/75 transition-colors hover:text-brand-brown"
            >
              How It Works
            </button>
            <button 
              onClick={() => handleScrollTo('faq')} 
              className="text-sm font-medium text-brand-charcoal/75 transition-colors hover:text-brand-brown"
            >
              FAQ
            </button>
          </div>

          {/* Action CTAs */}
          <div className="hidden items-center gap-4 md:flex">
            <Link 
              to="/login" 
              className="text-sm font-semibold text-brand-charcoal/80 transition-colors hover:text-brand-brown"
            >
              Sign In
            </Link>
            <Link 
              to="/dashboard" 
              className="group inline-flex items-center gap-1.5 rounded-xl bg-brand-brown px-4 py-2 text-sm font-semibold text-white shadow-md shadow-brand-brown/10 transition-all hover:bg-brand-brown/95 hover:scale-[1.02] active:scale-[0.98]"
            >
              Start Learning
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile Menu Icon */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-1.5 text-brand-charcoal hover:bg-brand-beige/30 md:hidden transition-colors"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="border-b border-brand-beige bg-brand-cream/95 py-6 px-6 backdrop-blur-lg md:hidden animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-5">
            <button 
              onClick={() => handleScrollTo('features')} 
              className="text-left text-base font-semibold text-brand-charcoal/85 hover:text-brand-brown transition-colors"
            >
              Features
            </button>
            <button 
              onClick={() => handleScrollTo('how-it-works')} 
              className="text-left text-base font-semibold text-brand-charcoal/85 hover:text-brand-brown transition-colors"
            >
              How It Works
            </button>
            <button 
              onClick={() => handleScrollTo('faq')} 
              className="text-left text-base font-semibold text-brand-charcoal/85 hover:text-brand-brown transition-colors"
            >
              FAQ
            </button>
            
            <div className="h-px bg-brand-beige/50 my-2"></div>
            
            <div className="flex flex-col gap-3">
              <Link 
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center rounded-xl border border-brand-beige bg-white py-2.5 text-center text-sm font-semibold text-brand-charcoal"
              >
                Sign In
              </Link>
              <Link 
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-brand-brown py-2.5 text-center text-sm font-semibold text-white shadow-md shadow-brand-brown/10"
              >
                Start Learning
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
