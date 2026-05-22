import React, { useState, useEffect } from 'react';
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
  ChevronDown
} from 'lucide-react';
import { LandingNavbar } from '../components';

// Public Landing Page
export default function Home() {
  const [activeFaq, setActiveFaq] = useState(null);

  // Simulated Chat Dialogue states for Hero preview
  const [isTyping, setIsTyping] = useState(false);
  const [visibleMessages, setVisibleMessages] = useState([]);

  const demoDialogue = [
    { sender: 'user', text: "Explain why sound travels faster in warm air." },
    { sender: 'ai', text: "A great question! Let's think about temperature. What is temperature a measure of, at the molecular level?" },
    { sender: 'user', text: "It's the average kinetic energy of the molecules." },
    { sender: 'ai', text: "Exactly! So in warmer air, how do you think the molecules behave when a pressure wave travels through them?" }
  ];

  useEffect(() => {
    let active = true;
    
    const runDialogue = async () => {
      if (!active) return;
      setVisibleMessages([]);
      setIsTyping(false);
      
      const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      
      await sleep(1000);
      
      // Step 0: User Msg
      if (!active) return;
      setVisibleMessages(prev => [...prev, demoDialogue[0]]);
      
      // Step 1: AI Typing
      await sleep(1200);
      if (!active) return;
      setIsTyping(true);
      await sleep(1500);
      if (!active) return;
      setIsTyping(false);
      setVisibleMessages(prev => [...prev, demoDialogue[1]]);
      
      // Step 2: User Msg
      await sleep(2200);
      if (!active) return;
      setVisibleMessages(prev => [...prev, demoDialogue[2]]);
      
      // Step 3: AI Typing
      await sleep(1200);
      if (!active) return;
      setIsTyping(true);
      await sleep(1500);
      if (!active) return;
      setIsTyping(false);
      setVisibleMessages(prev => [...prev, demoDialogue[3]]);
      
      // Hold for final read, then restart
      await sleep(5500);
      if (active) {
        runDialogue();
      }
    };
    
    runDialogue();
    return () => {
      active = false;
    };
  }, []);

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

  // How it works steps data
  const steps = [
    {
      step: "01",
      icon: FileText,
      title: "Index Your Materials",
      desc: "Drop textbook chapters, PDF study guides, or lecture notes. Our pipeline chunks and indexes the content securely into your sandboxed Vector DB."
    },
    {
      step: "02",
      icon: MessageSquare,
      title: "Interactive Socratic Chat",
      desc: "Converse with your AI Study Buddy. Instead of giving flat, copy-paste answers, it guides your deductive thinking with conceptual prompts."
    },
    {
      step: "03",
      icon: BookOpen,
      title: "Active Recall Compiler",
      desc: "Trigger active retention by compiling custom mock quizzes and conceptual MCQs directly from your files with real pedagogical feedback."
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

          {/* Animated Interactive Socratic Chat Preview Widget */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 80 }}
            className="relative mx-auto mt-16 max-w-xl rounded-2xl border border-brand-beige bg-white/75 p-5 shadow-xl backdrop-blur-md select-none text-left"
          >
            {/* Header elements for preview card */}
            <div className="flex items-center justify-between border-b border-brand-beige/50 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400"></div>
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-400"></div>
                <div className="h-2.5 w-2.5 rounded-full bg-green-400"></div>
                <span className="text-[10px] font-bold text-brand-charcoal/50 uppercase ml-2 tracking-wider">
                  Live Socratic Dialogue Preview
                </span>
              </div>
              <span className="text-[9px] font-semibold bg-brand-brown/15 text-brand-brown px-2 py-0.5 rounded-full">
                Pedagogy: Active
              </span>
            </div>

            {/* Chat message space */}
            <div className="space-y-4 min-h-[160px] flex flex-col justify-end">
              <AnimatePresence>
                {visibleMessages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex items-start gap-2.5 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                  >
                    <div className={`flex h-6.5 w-6.5 shrink-0 items-center justify-center rounded-lg border text-[10px] font-bold ${
                      msg.sender === 'user' ? 'bg-brand-cream border-brand-beige text-brand-charcoal' : 'bg-brand-brown border-brand-brown/20 text-white'
                    }`}>
                      {msg.sender === 'user' ? 'S' : 'P'}
                    </div>
                    <div className={`rounded-xl px-3.5 py-2 text-[11px] shadow-sm border ${
                      msg.sender === 'user' 
                        ? 'bg-brand-cream/60 border-brand-beige text-brand-charcoal rounded-tr-none' 
                        : 'bg-white border-brand-beige text-brand-charcoal rounded-tl-none leading-relaxed font-medium'
                    }`}>
                      <p className="font-semibold">{msg.text}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Dot indicator */}
              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2.5 max-w-[85%]"
                >
                  <div className="flex h-6.5 w-6.5 shrink-0 items-center justify-center rounded-lg border bg-brand-brown border-brand-brown/20 text-white text-[10px] font-bold">
                    P
                  </div>
                  <div className="rounded-xl rounded-tl-none border border-brand-beige bg-white px-3.5 py-2 shadow-sm">
                    <div className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-brown/40"></span>
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-brown/70 [animation-delay:0.2s]"></span>
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-brown [animation-delay:0.4s]"></span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Decorative Floating Badges */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-6 -right-12 hidden md:flex items-center gap-1.5 rounded-full bg-white border border-brand-beige/80 px-3.5 py-1.5 shadow-md shadow-brand-brown/5 text-[10px] font-bold text-brand-charcoal select-none"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-brand-brown animate-pulse" />
              🔒 Sandbox Isolated
            </motion.div>

            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-12 hidden md:flex items-center gap-1.5 rounded-full bg-white border border-brand-beige/80 px-3.5 py-1.5 shadow-md shadow-brand-brown/5 text-[10px] font-bold text-brand-charcoal select-none"
            >
              <Sparkles className="h-3.5 w-3.5 text-brand-brown animate-pulse" />
              🧠 Socratic Pedagogy
            </motion.div>
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


      {/* Socratic How It Works Section */}
      <section id="how-it-works" className="py-20 md:py-28 px-6 bg-white/35 border-t border-b border-brand-beige/50">
        <div className="mx-auto max-w-5xl">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1 rounded-full bg-brand-brown/10 border border-brand-brown/20 px-3 py-1 text-[10px] font-bold text-brand-brown uppercase tracking-wider select-none"
            >
              The Learning Cycle
            </motion.div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-brand-charcoal sm:text-3xl">
              How Pathshala AI Works
            </h2>
            <p className="text-sm text-brand-charcoal/70">
              Our closed-loop pedagogical system is designed for active retention, deep comprehension, and complete sandboxed security.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 relative">
            {/* Connecting decorative dotted line for desktop */}
            <div className="hidden md:block absolute top-1/2 left-[12%] right-[12%] h-0.5 border-t-2 border-dashed border-brand-beige -translate-y-12 z-0"></div>
            
            {steps.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 100, damping: 15, delay: idx * 0.15 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="relative z-10 rounded-2xl border border-brand-beige bg-white p-6 shadow-sm flex flex-col items-center text-center group hover:border-brand-brown/40 transition-colors"
                >
                  {/* Step Number Badge */}
                  <span className="absolute top-4 right-4 font-mono text-[10px] font-bold text-brand-brown bg-brand-brown/10 border border-brand-brown/25 px-2.5 py-0.5 rounded-full select-none animate-pulse">
                    Step {step.step}
                  </span>

                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-cream border border-brand-beige group-hover:scale-105 transition-transform">
                    <StepIcon className="h-6 w-6 text-brand-brown" />
                  </div>
                  
                  <h3 className="font-display text-sm font-bold text-brand-charcoal mb-2 group-hover:text-brand-brown transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-brand-charcoal/65 leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
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
