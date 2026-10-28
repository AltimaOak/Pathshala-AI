import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { register, googleLogin } from "../services/auth";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    await register({
      name,
      email,
      password,
    });

    alert("Account Created Successfully!");

    navigate("/login");

  } catch (error) {

    alert(error.message);

  }
};

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      
      const response = await googleLogin({
        name: decoded.name,
        email: decoded.email
      });
      
      localStorage.setItem("token", response.access_token);
      localStorage.setItem("profileName", response.name);
      localStorage.setItem("profileEmail", response.email);
      
      window.dispatchEvent(new Event('storage'));
      
      alert("Google Login Successful!");
      navigate("/dashboard");
    } catch (error) {
      alert("Google authentication failed: " + error.message);
    }
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
            Create Your Account
          </h2>
          <p className="text-sm text-brand-charcoal/65 mt-1.5">
            Get started with Pathshala AI for free today.
          </p>
        </motion.div>

        {/* Social Authentication */}
        <motion.div variants={itemVariants} className="mb-6 flex justify-center" id="google-signup">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => alert("Google signup failed")}
            shape="rectangular"
            theme="outline"
            size="large"
            width="380"
            text="signup_with"
          />
        </motion.div>

        {/* Separator */}
        <motion.div variants={itemVariants} className="relative mb-6 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-brand-beige"></div>
          </div>
          <span className="relative bg-white px-3 text-xs font-medium text-brand-charcoal/50 uppercase tracking-wider">
            or register with email
          </span>
        </motion.div>

        {/* Standard Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div variants={itemVariants}>
            <label htmlFor="fullname" className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal/70 mb-1.5">
              Full Name
            </label>
            <input
              id="fullname"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full h-11 rounded-xl border border-brand-beige bg-white/70 px-4 text-sm text-brand-charcoal placeholder-brand-charcoal/35 transition-colors focus:border-brand-brown focus:bg-white focus:outline-none"
            />
          </motion.div>

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
            <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal/70 mb-1.5">
              Create Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="•••••••• (Min 8 chars)"
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

          <motion.div variants={itemVariants} className="flex items-start gap-2.5 pt-1">
            <input
              id="terms"
              type="checkbox"
              required
              className="mt-0.5 h-4 w-4 rounded border-brand-beige text-brand-brown focus:ring-brand-brown cursor-pointer"
            />
            <label htmlFor="terms" className="text-xs leading-normal text-brand-charcoal/75 select-none cursor-pointer">
              I agree to the{' '}
              <a href="#" className="font-semibold text-brand-brown hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="font-semibold text-brand-brown hover:underline">
                Privacy Policy
              </a>.
            </label>
          </motion.div>

          <motion.div variants={itemVariants}>
            <button
              id="signup-submit"
              type="submit"
              className="group flex w-full items-center justify-center gap-1.5 h-11 rounded-xl bg-brand-brown text-sm font-semibold text-white shadow-md shadow-brand-brown/10 transition-all hover:bg-brand-brown/95 hover:scale-[1.01] active:scale-[0.99] mt-6 cursor-pointer"
            >
              Create Free Account
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </motion.div>
        </form>

        {/* Toggle Login Route */}
        <motion.p variants={itemVariants} className="text-center text-xs font-semibold text-brand-charcoal/70 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-brand-brown hover:underline font-bold">
            Sign in
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}
