import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  BookOpen, 
  MessageSquare, 
  UploadCloud, 
  ArrowRight,
  ArrowLeft,
  Lightbulb
} from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  // Load user name dynamically from localStorage
  useEffect(() => {
    const savedName = localStorage.getItem('profileName');
    if (savedName) {
      // Pick first name for a warmer, friendly greeting
      const firstName = savedName.trim().split(/\s+/)[0];
      setUserName(firstName);
    }
  }, []);

  return (
    <div className="mx-auto max-w-5xl space-y-6 text-left pb-10">
      {/* Simple Back Navigation for Landing Page */}
      <div className="flex items-center px-1">
        <button
          id="back-to-landing-btn"
          onClick={() => navigate('/')}
          className="group inline-flex items-center gap-2 rounded-xl border border-brand-beige/80 bg-white/70 hover:bg-white px-3.5 py-2 text-xs font-semibold text-brand-charcoal/70 hover:text-brand-brown hover:border-brand-brown/40 shadow-2xs transition-all cursor-pointer"
          title="Return to Landing Page (Sign out)"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Back to Landing Page</span>
        </button>
      </div>

      {/* Warm & Friendly Welcome Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-3xl border border-brand-beige bg-gradient-to-br from-white via-brand-cream/30 to-brand-beige/25 p-7 md:p-10 shadow-sm"
      >
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-brown/10 border border-brand-brown/20 px-3 py-1 text-xs font-semibold text-brand-brown">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Easy Learning Assistant</span>
            </div>

            <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-brand-charcoal">
              Hello, {userName || 'Student'}! 👋
            </h1>

            <p className="text-sm md:text-base text-brand-charcoal/75 leading-relaxed">
              What would you like to learn today? Choose one of the simple options below to start chatting, reading your notes, or testing yourself.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button 
              id="start-chat-banner-btn"
              onClick={() => navigate('/chat')}
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-brown px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-brand-brown/20 transition-all hover:bg-brand-brown/90 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Ask AI a Question</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* 3 Clear, Big Action Cards (Simple for Any Non-Tech User) */}
      <div className="space-y-3">
        <h2 className="font-display text-lg font-bold text-brand-charcoal px-1">
          Start Studying in 1 Click
        </h2>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          
          {/* Action 1: Chat with AI */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            onClick={() => navigate('/chat')}
            className="group cursor-pointer rounded-2xl border border-brand-beige bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-brand-brown/60 hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-brown/10 text-brand-brown mb-5 group-hover:bg-brand-brown group-hover:text-white transition-all">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="font-display text-base font-bold text-brand-charcoal mb-2">
                1. Ask AI Tutor
              </h3>
              <p className="text-xs text-brand-charcoal/70 leading-relaxed mb-6">
                Ask any question about homework, difficult concepts, or topics in plain, easy-to-understand language.
              </p>
            </div>

            <button 
              className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-brown group-hover:underline"
            >
              <span>Start Chatting</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>

          {/* Action 2: Upload Notes */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onClick={() => navigate('/upload')}
            className="group cursor-pointer rounded-2xl border border-brand-beige bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-brand-brown/60 hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-700 mb-5 group-hover:bg-amber-700 group-hover:text-white transition-all">
                <UploadCloud className="h-6 w-6" />
              </div>
              <h3 className="font-display text-base font-bold text-brand-charcoal mb-2">
                2. Upload Notes & Books
              </h3>
              <p className="text-xs text-brand-charcoal/70 leading-relaxed mb-6">
                Upload your chapter PDFs or study notes so the AI can explain lessons straight from your own syllabus.
              </p>
            </div>

            <button 
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 group-hover:underline"
            >
              <span>Upload Materials</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>

          {/* Action 3: Take a Quiz */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            onClick={() => navigate('/quiz')}
            className="group cursor-pointer rounded-2xl border border-brand-beige bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-brand-brown/60 hover:-translate-y-1 flex flex-col justify-between sm:col-span-2 lg:col-span-1"
          >
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-700 mb-5 group-hover:bg-emerald-700 group-hover:text-white transition-all">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="font-display text-base font-bold text-brand-charcoal mb-2">
                3. Practice with Quizzes
              </h3>
              <p className="text-xs text-brand-charcoal/70 leading-relaxed mb-6">
                Generate simple practice tests with multiple-choice questions to test your knowledge and prepare for exams.
              </p>
            </div>

            <button 
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 group-hover:underline"
            >
              <span>Create a Quiz</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>

        </div>
      </div>

      {/* How Pathshala AI Works - Simple 3-Step Guide */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-3xl border border-brand-beige bg-white p-7 md:p-8 shadow-sm space-y-6"
      >
        <div className="flex items-center gap-2.5">
          <Lightbulb className="h-5 w-5 text-brand-brown" />
          <h2 className="font-display text-base font-bold text-brand-charcoal">
            How It Works (Easy Guide)
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          
          <div className="flex items-start gap-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-cream border border-brand-beige font-display text-xs font-bold text-brand-brown">
              1
            </div>
            <div>
              <h4 className="text-sm font-bold text-brand-charcoal mb-1">
                Upload Material
              </h4>
              <p className="text-xs text-brand-charcoal/65 leading-relaxed">
                Add any textbook chapter, article, or classroom notes as a PDF.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-cream border border-brand-beige font-display text-xs font-bold text-brand-brown">
              2
            </div>
            <div>
              <h4 className="text-sm font-bold text-brand-charcoal mb-1">
                Ask Questions
              </h4>
              <p className="text-xs text-brand-charcoal/65 leading-relaxed">
                Chat with your AI study buddy to simplify complex ideas step-by-step.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-cream border border-brand-beige font-display text-xs font-bold text-brand-brown">
              3
            </div>
            <div>
              <h4 className="text-sm font-bold text-brand-charcoal mb-1">
                Check Your Knowledge
              </h4>
              <p className="text-xs text-brand-charcoal/65 leading-relaxed">
                Take quick practice quizzes to see what you learned and get immediate feedback.
              </p>
            </div>
          </div>

        </div>
      </motion.div>


    </div>
  );
}
