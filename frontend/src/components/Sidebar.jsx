import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  MessageSquare,
  BookOpen,
  FileText,
  Settings,
  LogOut,
  GraduationCap
} from 'lucide-react';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/chat', label: 'AI Study Buddy', icon: MessageSquare },
  { path: '/quiz', label: 'Quiz Generator', icon: BookOpen },
  { path: '/upload', label: 'Study Materials', icon: FileText },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="sticky top-0 left-0 z-40 flex h-screen w-64 flex-col border-r border-brand-beige/55 bg-brand-cream px-4 py-6">
      {/* Brand Logo */}
      <div className="flex flex-col items-start px-2 mb-8 select-none">
        <img src="/logo.png" alt="Pathshala AI Logo" className="h-16 w-auto object-contain" />
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-brand-brown bg-brand-beige/35 font-semibold'
                    : 'text-brand-charcoal/70 hover:bg-brand-beige/20 hover:text-brand-charcoal'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Icon */}
                  <Icon className={`h-5 w-5 transition-transform duration-200 group-hover:scale-105 ${
                    isActive ? 'text-brand-brown' : 'text-brand-charcoal/50 group-hover:text-brand-charcoal/70'
                  }`} />
                  
                  {/* Label */}
                  <span>{item.label}</span>

                  {/* Active Background Glow Bar */}
                  {isActive && (
                    <motion.div
                      layoutId="active-indicator"
                      className="absolute left-0 top-1/4 h-1/2 w-1 rounded-r-full bg-brand-brown"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer / Logout Section */}
      <div className="border-t border-brand-beige/50 pt-4">
        <NavLink
          to="/login"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600/85 hover:bg-red-50 hover:text-red-700 transition-colors"
        >
          <LogOut className="h-5 w-5 text-red-500/70" />
          <span>Sign Out</span>
        </NavLink>
      </div>
    </aside>
  );
}
