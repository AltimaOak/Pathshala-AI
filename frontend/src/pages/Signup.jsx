import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate real authentic transition to the SaaS dashboard onboarding
    navigate('/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-cream px-6 py-12">
      {/* Floating light gradient shapes */}
      <div className="absolute top-1/4 left-1/3 h-72 w-72 rounded-full bg-brand-brown/10 blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/3 h-72 w-72 rounded-full bg-brand-brown/5 blur-3xl"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md rounded-2xl border border-brand-beige bg-white p-8 shadow-xl shadow-brand-charcoal/5 glassmorphism"
      >
        {/* Brand Logo & Heading */}
        <div className="flex flex-col items-center text-center mb-8">
          <Link to="/" className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-brown shadow-md shadow-brand-brown/20 mb-4 transition-transform hover:scale-105">
            <GraduationCap className="h-6.5 w-6.5 text-brand-cream" />
          </Link>
          <h2 className="font-display text-2xl font-bold tracking-tight text-brand-charcoal">
            Create Your Account
          </h2>
          <p className="text-sm text-brand-charcoal/65 mt-1.5">
            Get started with Pathshala AI for free today.
          </p>
        </div>

        {/* Social Authentication */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button 
            id="google-signup"
            onClick={() => navigate('/dashboard')}
            className="flex items-center justify-center gap-2 rounded-xl border border-brand-beige bg-white py-2.5 text-xs font-semibold text-brand-charcoal transition-all hover:bg-brand-cream/55 hover:scale-[1.01] active:scale-[0.99]"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Google
          </button>
          <button 
            id="apple-signup"
            onClick={() => navigate('/dashboard')}
            className="flex items-center justify-center gap-2 rounded-xl border border-brand-beige bg-white py-2.5 text-xs font-semibold text-brand-charcoal transition-all hover:bg-brand-cream/55 hover:scale-[1.01] active:scale-[0.99]"
          >
            {/* Apple custom SVG icon */}
            <svg className="h-4 w-4 text-brand-charcoal fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.129 22 16.991 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            Apple
          </button>
        </div>

        {/* Separator */}
        <div className="relative mb-6 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-brand-beige"></div>
          </div>
          <span className="relative bg-white px-3 text-xs font-medium text-brand-charcoal/50 uppercase tracking-wider">
            or register with email
          </span>
        </div>

        {/* Standard Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fullname" className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal/70 mb-1.5">
              Full Name
            </label>
            <input
              id="fullname"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Aditya Yadav"
              className="w-full h-11 rounded-xl border border-brand-beige bg-white/70 px-4 text-sm text-brand-charcoal placeholder-brand-charcoal/35 transition-colors focus:border-brand-brown focus:bg-white focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal/70 mb-1.5">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@domain.com"
              className="w-full h-11 rounded-xl border border-brand-beige bg-white/70 px-4 text-sm text-brand-charcoal placeholder-brand-charcoal/35 transition-colors focus:border-brand-brown focus:bg-white focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal/70 mb-1.5">
              Create Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="•••••••• (Min 8 chars)"
              className="w-full h-11 rounded-xl border border-brand-beige bg-white/70 px-4 text-sm text-brand-charcoal placeholder-brand-charcoal/35 transition-colors focus:border-brand-brown focus:bg-white focus:outline-none"
            />
          </div>

          <div className="flex items-start gap-2.5 pt-1">
            <input
              id="terms"
              type="checkbox"
              required
              className="mt-0.5 h-4 w-4 rounded border-brand-beige text-brand-brown focus:ring-brand-brown"
            />
            <label htmlFor="terms" className="text-xs leading-normal text-brand-charcoal/75 select-none">
              I agree to the{' '}
              <a href="#" className="font-semibold text-brand-brown hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="font-semibold text-brand-brown hover:underline">
                Privacy Policy
              </a>.
            </label>
          </div>

          <button
            id="signup-submit"
            type="submit"
            className="group flex w-full items-center justify-center gap-1.5 h-11 rounded-xl bg-brand-brown text-sm font-semibold text-white shadow-md shadow-brand-brown/10 transition-all hover:bg-brand-brown/95 hover:scale-[1.01] active:scale-[0.99] mt-6"
          >
            Create Free Account
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </form>

        {/* Toggle Login Route */}
        <p className="text-center text-xs font-semibold text-brand-charcoal/70 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-brand-brown hover:underline">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
