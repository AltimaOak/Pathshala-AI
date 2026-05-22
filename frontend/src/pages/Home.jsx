import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  MessageSquare, 
  FileText, 
  ShieldCheck, 
  HelpCircle, 
  ChevronDown,
  Quote
} from 'lucide-react';
import { LandingNavbar } from '../components';

// Public Landing Page
export default function Home() {
  const [activeFaq, setActiveFaq] = useState(null);

  // Bento features data
  const features = [
    {
      icon: FileText,
      title: "Contextual PDF Digest (RAG)",
      desc: "Pathshala AI parses complex textbook chapters, vectorizes concepts, and answers directly from your study materials."
    },
    {
      icon: MessageSquare,
      title: "Socratic AI Tutoring",
      desc: "Unlike standard chatbots that copy answers, our tutor prompts you with questions, guiding you to deduce answers yourself."
    },
    {
      icon: BookOpen,
      title: "Active Recall Quizzes",
      desc: "Instantly compile custom assessments, MCQs, and flashcard checks based on your specific notes to trigger active learning."
    },
    {
      icon: ShieldCheck,
      title: "Sandboxed Privacy",
      desc: "Your textbooks, answers, and study statistics are fully sandboxed, encrypted, and isolated to your personal student node."
    }
  ];


  // Testimonials data
  const testimonials = [
    {
      quote: "Pathshala AI behaves like a real tutor. It refuses to copy answers, prompting me to figure out physics formulas on my own.",
      author: "Aditya Y.",
      role: "Engineering Student"
    },
    {
      quote: "The ability to generate instant conceptual quizzes directly from my history PDF notes has completely re-shaped my revision routine.",
      author: "Sneha M.",
      role: "Medical Candidate"
    }
  ];

  // Socratic FAQs
  const faqs = [
    {
      question: "Is Pathshala AI different from generic chatbots?",
      answer: "Yes. Traditional chatbots generate immediate direct copy-paste answers, encouraging passive scrolling. Pathshala AI utilizes the Socratic method—guiding you with inquiries, conceptual checkpoints, and custom active recall prompts to help you learn deeply, not just complete tasks."
    },
    {
      question: "Can it understand complex scanned textbooks?",
      answer: "Absolutely. Our pipeline parses files, analyzing tables, headers, and text formatting. It chunks this data to cache it into your private Vector DB, allowing your AI tutor to retrieve and explain concepts accurately."
    },
    {
      question: "Is my study data secure and private?",
      answer: "Yes, privacy is our first principle. All files uploaded to Pathshala AI are sandboxed and fully isolated. They are never utilized to train public LLMs or accessed by any third party."
    }
  ];

  return (
    <div className="min-h-screen bg-brand-cream text-brand-charcoal overflow-x-hidden selection:bg-brand-brown selection:text-white">
      
      {/* Landing Sticky Glass Navbar */}
      <LandingNavbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6">
        {/* Floating gradient mesh background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[450px] w-[450px] rounded-full bg-brand-brown/10 blur-3xl opacity-60"></div>
        
        <div className="mx-auto max-w-5xl text-center space-y-6 relative">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 rounded-full bg-brand-brown/10 border border-brand-brown/20 px-3.5 py-1 text-xs font-bold text-brand-brown"
          >
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            Introducing Pathshala AI
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl font-extrabold tracking-tight text-brand-charcoal sm:text-5xl md:text-6xl max-w-4xl mx-auto leading-tight"
          >
            Your Personal <span className="text-brand-brown">AI Learning</span> Companion
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base text-brand-charcoal/70 max-w-2xl mx-auto leading-relaxed sm:text-lg"
          >
            An elegant Socratic tutor that refrains from just copying answers. Upload textbook PDFs, query concepts step-by-step, and test retention with instant quizzes.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4"
          >
            <Link
              to="/dashboard"
              className="group flex w-full sm:w-auto items-center justify-center gap-1.5 rounded-xl bg-brand-brown px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-brown/15 transition-all hover:bg-brand-brown/95 hover:scale-[1.02] active:scale-[0.98]"
            >
              Start Learning Free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="#features"
              className="flex w-full sm:w-auto items-center justify-center gap-1.5 rounded-xl border border-brand-beige bg-white/70 px-6 py-3.5 text-sm font-semibold text-brand-charcoal shadow-sm transition-all hover:bg-white hover:scale-[1.02] active:scale-[0.98]"
            >
              Explore Features
            </a>
          </motion.div>
        </div>
      </section>

      {/* Bento Grid Features Section */}
      <section id="features" className="py-20 md:py-28 px-6 bg-white/35 border-t border-b border-brand-beige/50">
        <div className="mx-auto max-w-6xl">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
            <h2 className="font-display text-2xl font-bold tracking-tight text-brand-charcoal sm:text-3xl">
              Engineered for Deep Retention
            </h2>
            <p className="text-sm text-brand-charcoal/70">
              Our educational pipeline leverages Socratic dialogues and active recall to build long-term conceptual mastery.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feat, idx) => {
              const FeatIcon = feat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="rounded-2xl border border-brand-beige bg-white p-6 shadow-sm hover:border-brand-brown/40 transition-colors text-left"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-cream border border-brand-beige">
                    <FeatIcon className="h-5 w-5 text-brand-brown" />
                  </div>
                  <h3 className="font-display text-sm font-bold text-brand-charcoal mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-brand-charcoal/65 leading-relaxed">
                    {feat.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>


      {/* Minimal Testimonials */}
      <section id="testimonials" className="py-20 px-6 bg-white/35 border-t border-b border-brand-beige/50">
        <div className="mx-auto max-w-5xl">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
            <h2 className="font-display text-2xl font-bold tracking-tight text-brand-charcoal sm:text-3xl">
              Praise for Socratic Dialogue
            </h2>
            <p className="text-sm text-brand-charcoal/70">
              See how learners accelerate their understanding using Pathshala AI.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            {testimonials.map((test, idx) => (
              <div 
                key={idx}
                className="rounded-2xl border border-brand-beige bg-white p-6 shadow-sm flex flex-col justify-between text-left"
              >
                <div className="space-y-4">
                  <Quote className="h-6 w-6 text-brand-brown/30" />
                  <p className="text-xs font-semibold text-brand-charcoal/80 leading-relaxed italic">
                    "{test.quote}"
                  </p>
                </div>
                
                <div className="mt-6 border-t border-brand-beige/40 pt-4 flex justify-between items-center">
                  <div>
                    <h4 className="font-display text-xs font-bold text-brand-charcoal">{test.author}</h4>
                    <p className="text-[10px] text-brand-charcoal/50 font-semibold">{test.role}</p>
                  </div>
                  <span className="flex h-5 w-5 items-center justify-center rounded bg-brand-cream text-[9px] font-bold text-brand-brown">
                    ★
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Socratic FAQ Section */}
      <section id="faq" className="py-20 md:py-28 px-6">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-16 space-y-2">
            <h2 className="font-display text-2xl font-bold tracking-tight text-brand-charcoal sm:text-3xl">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-brand-charcoal/70 max-w-md mx-auto">
              Clear clarifications regarding tutoring styles, file privacy, and technology specifications.
            </p>
          </div>

          <div className="space-y-3.5 text-left">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="rounded-xl border border-brand-beige bg-white shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-brand-cream/10"
                >
                  <span className="font-display text-xs font-bold text-brand-charcoal flex gap-2">
                    <HelpCircle className="h-4.5 w-4.5 text-brand-brown shrink-0" />
                    {faq.question}
                  </span>
                  <ChevronDown className={`h-4.5 w-4.5 text-brand-charcoal/45 transition-transform duration-200 ${activeFaq === idx ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence initial={false}>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-5 pb-5 pt-1 border-t border-brand-beige/25 text-xs text-brand-charcoal/70 leading-relaxed pl-11">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-brand-beige bg-white py-16 px-6">
        <div className="mx-auto max-w-6xl grid gap-10 md:grid-cols-4 text-left">
          
          {/* Logo & brand copy */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center">
              <img src="/logo.png" alt="Pathshala AI Logo" className="h-14 w-auto object-contain" />
            </div>
            <p className="text-xs text-brand-charcoal/65 leading-relaxed max-w-xs">
              Reframing educational technology through cognitive Socratic inquiry and structured active recall metrics.
            </p>
          </div>

          {/* Quick SaaS links */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/45">
              Platform Features
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-brand-charcoal/70">
              <li><Link to="/dashboard" className="hover:text-brand-brown">Dashboard</Link></li>
              <li><Link to="/chat" className="hover:text-brand-brown">Socratic Chat</Link></li>
              <li><Link to="/quiz" className="hover:text-brand-brown">Quiz Compiler</Link></li>
              <li><Link to="/upload" className="hover:text-brand-brown">Study Files</Link></li>
            </ul>
          </div>

          {/* Newsletter / Contact form */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/45">
              Stay Updated
            </h4>
            <form onSubmit={(e) => { e.preventDefault(); alert("Newsletter subscription confirmed!"); e.target.reset(); }} className="space-y-2">
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="name@domain.com"
                className="w-full h-9 rounded-lg border border-brand-beige bg-white px-3 text-xs text-brand-charcoal placeholder-brand-charcoal/30 focus:border-brand-brown focus:outline-none"
              />
              <button
                type="submit"
                className="w-full h-9 rounded-lg bg-brand-brown text-xs font-bold text-white shadow-sm transition-all hover:bg-brand-brown/95 active:scale-95"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

        <div className="mx-auto max-w-6xl border-t border-brand-beige/50 pt-8 mt-12 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold text-brand-charcoal/50">
          <p>© 2026 Pathshala AI Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-brand-brown">Terms</a>
            <a href="#" className="hover:text-brand-brown">Privacy</a>
            <a href="#" className="hover:text-brand-brown">Contact</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
