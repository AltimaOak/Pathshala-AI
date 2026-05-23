import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate real authentic transition to the SaaS dashboard
    navigate('/dashboard');
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: 'spring', 
        stiffness: 100, 
        damping: 15 
      } 
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-cream px-6 py-12 overflow-hidden relative">
      {/* Premium floating ambient backdrop gradients */}
      <motion.div 
        animate={{
          scale: [1, 1.15, 0.9, 1],
          x: [0, 20, -15, 0],
          y: [0, -30, 20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-1/3 h-72 w-72 rounded-full bg-brand-brown/10 blur-3xl pointer-events-none hidden md:block"
      />
      <motion.div 
        animate={{
          scale: [1, 0.9, 1.12, 1],
          x: [0, -20, 15, 0],
          y: [0, 30, -20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-1/4 right-1/3 h-72 w-72 rounded-full bg-brand-brown/5 blur-3xl pointer-events-none hidden md:block"
      />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative w-full max-w-md rounded-2xl border border-brand-beige bg-white p-8 shadow-xl shadow-brand-charcoal/5 glassmorphism z-10"
      >
        {/* Brand Logo & Heading */}
        <motion.div variants={itemVariants} className="flex flex-col items-center text-center mb-8">
          <Link to="/" className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-brown shadow-md shadow-brand-brown/20 mb-4 transition-transform hover:scale-105">
            <GraduationCap className="h-6.5 w-6.5 text-brand-cream" />
          </Link>
          <h2 className="font-display text-2xl font-bold tracking-tight text-brand-charcoal">
            Welcome Back
          </h2>
          <p className="text-sm text-brand-charcoal/65 mt-1.5">
            Sign in to access your personal AI learning workspace.
          </p>
        </motion.div>

        {/* Social Authentication */}
        <motion.div variants={itemVariants} className="mb-6">
          <button 
            id="google-login"
            onClick={() => navigate('/dashboard')}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-brand-beige bg-white py-2.5 text-xs font-semibold text-brand-charcoal transition-all hover:bg-brand-cream/55 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Google
          </button>
        </motion.div>

        {/* Separator */}
        <motion.div variants={itemVariants} className="relative mb-6 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-brand-beige"></div>
          </div>
          <span className="relative bg-white px-3 text-xs font-medium text-brand-charcoal/50 uppercase tracking-wider">
            or continue with email
          </span>
        </motion.div>

        {/* Standard Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div variants={itemVariants}>
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
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal/70">
                Password
              </label>
              <a href="#" className="text-xs font-semibold text-brand-brown hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-11 rounded-xl border border-brand-beige bg-white/70 pl-4 pr-11 text-sm text-brand-charcoal placeholder-brand-charcoal/35 transition-colors focus:border-brand-brown focus:bg-white focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-charcoal/45 hover:text-brand-charcoal transition-colors focus:outline-none cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4.5 w-4.5" />
                ) : (
                  <Eye className="h-4.5 w-4.5" />
                )}
              </button>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <button
              id="login-submit"
              type="submit"
              className="group flex w-full items-center justify-center gap-1.5 h-11 rounded-xl bg-brand-brown text-sm font-semibold text-white shadow-md shadow-brand-brown/10 transition-all hover:bg-brand-brown/95 hover:scale-[1.01] active:scale-[0.99] mt-6 cursor-pointer"
            >
              Sign In
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </motion.div>
        </form>

        {/* Toggle Signup Route */}
        <motion.p variants={itemVariants} className="text-center text-xs font-semibold text-brand-charcoal/70 mt-6">
          New to Pathshala AI?{' '}
          <Link to="/signup" className="text-brand-brown hover:underline font-bold">
            Create an account free
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}
