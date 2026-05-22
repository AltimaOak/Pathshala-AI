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

// Premium preloader Framer Motion variants
const overlayVariants = {
  initial: { opacity: 1, y: 0 },
  exit: {
    opacity: 0,
    y: "-100%",
    transition: {
      duration: 0.7,
      ease: [0.76, 0, 0.24, 1],
      when: "afterChildren"
    }
  }
};

const textContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    }
  },
  exit: {
    opacity: 0,
    filter: "blur(12px)",
    y: -20,
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1]
    }
  }
};

const textWrapperVariants = {
  hidden: { letterSpacing: "0.25em" },
  visible: {
    letterSpacing: "0.06em",
    transition: {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const charVariants = {
  hidden: { 
    opacity: 0, 
    y: 15,
    scale: 0.9,
    filter: "blur(4px)",
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      damping: 14,
      stiffness: 110,
    }
  }
};

const subtextVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 0.5,
    y: 0,
    transition: {
      delay: 1.0,
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const logoContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3
    }
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    filter: "blur(10px)",
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1]
    }
  }
};

const logoVariants = {
  hidden: {
    opacity: 0,
    scale: 0.75,
    rotate: -15,
    filter: "blur(12px)",
  },
  visible: {
    opacity: 1,
    scale: [0.75, 1.04, 1],
    rotate: [-15, 4, 0],
    filter: "blur(0px)",
    transition: {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
    }
  }
};

const logoGlowVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: [0.5, 1.1, 1],
    transition: {
      duration: 1.3,
      ease: "easeOut"
    }
  }
};

// Synchronized Landing Page reveal variants
const navbarVariants = {
  hidden: { opacity: 0, y: -25 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const badgeIntroVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const titleVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const subtitleVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const ctaVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const widgetVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.97 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 16
    }
  }
};

// Public Landing Page
export default function Home() {
  const [activeFaq, setActiveFaq] = useState(null);

  // Cinematic preloader state transitions
  const [loaderStep, setLoaderStep] = useState(1);
  const [revealContent, setRevealContent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Step 1: Text reveal animation runs from 0s to 1.8s
    const textTimer = setTimeout(() => {
      setLoaderStep(2);
    }, 1800);

    // Step 2: Logo reveal runs from 1.8s to 3.8s
    // At 3.8s, the curtain reveal transitions into the landing page
    const revealTimer = setTimeout(() => {
      setRevealContent(true);
    }, 3800);

    // At 4.3s, the preloader is fully unmounted
    const completeTimer = setTimeout(() => {
      setIsLoading(false);
    }, 4300);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(revealTimer);
      clearTimeout(completeTimer);
    };
  }, []);

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
      title: "Study Directly from Your PDFs",
      desc: "Pathshala AI reads your textbook chapters, understands key ideas, and answers questions using your study materials."
    },
    {
      icon: MessageSquare,
      title: "Friendly AI Study Guide",
      desc: "Instead of just giving you the answers, your study guide asks helpful questions to guide you to the right answer yourself."
    },
    {
      icon: BookOpen,
      title: "Quick Quiz Maker",
      desc: "Instantly create custom quizzes, multiple-choice questions, and quick reviews based on your notes to test what you learned."
    },
    {
      icon: ShieldCheck,
      title: "100% Private & Secure",
      desc: "Your books, answers, and study notes are completely private, protected, and locked to your personal account."
    }
  ];

  // How it works steps data
  const steps = [
    {
      step: "01",
      icon: FileText,
      title: "Upload Your Study Files",
      desc: "Drag and drop your textbook chapters, study guides, or lecture notes. Our app securely saves your files in your private study space."
    },
    {
      step: "02",
      icon: MessageSquare,
      title: "Chat with Your AI Guide",
      desc: "Ask your AI Study Buddy questions. Instead of just showing the final answers, it helps you think and guides you step-by-step."
    },
    {
      step: "03",
      icon: BookOpen,
      title: "Test Yourself with Quizzes",
      desc: "Turn your files into custom practice quizzes and multiple-choice questions with helpful explanations to help you remember everything."
    }
  ];

  // Socratic FAQs
  const faqs = [
    {
      question: "Is Pathshala AI different from standard AI tools?",
      answer: "Yes. Standard AI chatbots just copy and paste the answers for you, which doesn't help you learn. Pathshala AI acts like a real teacher—asking you helpful questions and guiding you step-by-step so you actually understand the concepts."
    },
    {
      question: "Can it read scanned textbooks and custom PDFs?",
      answer: "Absolutely. Our app reads through tables, headings, and formatting in your files. It securely saves this information in your private study space so your AI study guide can explain concepts perfectly using your own materials."
    },
    {
      question: "Is my study data secure and private?",
      answer: "Yes, privacy is our primary focus. All files you upload are kept completely private and isolated to your account. Your files are never shared with anyone else and are never used to train public AI models."
    }
  ];

  return (
    <div className="min-h-screen bg-brand-cream text-brand-charcoal overflow-x-hidden selection:bg-brand-brown selection:text-white">
      
      {/* Brand Preloader Overlay */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="preloader-curtain"
            variants={overlayVariants}
            initial="initial"
            exit="exit"
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0F0E0D]"
          >
            {/* Ambient Background Gold/Warm Radial Mesh */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,162,124,0.06)_0%,transparent_65%)] pointer-events-none" />

            <AnimatePresence mode="wait">
              {loaderStep === 1 ? (
                /* STEP 1: Text reveal with stagger and character spacing */
                <motion.div
                  key="loader-text-step"
                  variants={textContainerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex flex-col items-center text-center px-6 max-w-lg w-full relative z-10"
                >
                  <motion.h2 
                    variants={textWrapperVariants}
                    className="font-display text-3xl md:text-4xl font-extrabold uppercase text-white tracking-widest"
                  >
                    {"PATHSHALA AI".split("").map((char, index) => (
                      <motion.span
                        key={index}
                        variants={charVariants}
                        className="inline-block font-sans"
                        style={{ 
                          marginRight: char === " " ? "0.4em" : "0.02em",
                        }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </motion.h2>
                  <motion.p
                    variants={subtextVariants}
                    className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#C8A27C] mt-4"
                  >
                    Your Personal AI Study Partner
                  </motion.p>
                </motion.div>
              ) : (
                /* STEP 2: Brand Logo reveal with rotation, scale, blur, and dashed halo ring */
                <motion.div
                  key="loader-logo-step"
                  variants={logoContainerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="relative flex flex-col items-center justify-center p-12 text-center"
                >
                  {/* Halo Ambient Glowing Backdrop */}
                  <motion.div 
                    variants={logoGlowVariants}
                    className="absolute h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(200,162,124,0.18)_0%,transparent_70%)] blur-xl pointer-events-none"
                  />

                  {/* Thin elegant spinning dashed halo */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                    className="absolute h-36 w-36 rounded-full border border-dashed border-brand-brown/25"
                  />

                  {/* High fidelity book-brain brand logo */}
                  <motion.div
                    variants={logoVariants}
                    className="relative z-10 flex items-center justify-center"
                  >
                    <img 
                      src="/logo.png" 
                      alt="Pathshala AI Logo" 
                      className="h-20 w-auto object-contain drop-shadow-[0_0_20px_rgba(200,162,124,0.25)]" 
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Landing Sticky Glass Navbar */}
      <motion.div
        variants={navbarVariants}
        initial="hidden"
        animate={revealContent ? "visible" : "hidden"}
        className="w-full relative z-40"
      >
        <LandingNavbar />
      </motion.div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6">
        {/* Floating gradient mesh background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[450px] w-[450px] rounded-full bg-brand-brown/10 blur-3xl opacity-60"></div>
        
        <div className="mx-auto max-w-5xl text-center space-y-6 relative">
          <motion.div 
            variants={badgeIntroVariants}
            initial="hidden"
            animate={revealContent ? "visible" : "hidden"}
            className="inline-flex items-center gap-1.5 rounded-full bg-brand-brown/10 border border-brand-brown/20 px-3.5 py-1 text-xs font-bold text-brand-brown"
          >
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            Introducing Pathshala AI
          </motion.div>

          <motion.h1 
            variants={titleVariants}
            initial="hidden"
            animate={revealContent ? "visible" : "hidden"}
            className="font-display text-4xl font-extrabold tracking-tight text-brand-charcoal sm:text-5xl md:text-6xl max-w-4xl mx-auto leading-tight"
          >
            Your Personal <span className="text-brand-brown">AI Learning</span> Companion
          </motion.h1>

          <motion.p 
            variants={subtitleVariants}
            initial="hidden"
            animate={revealContent ? "visible" : "hidden"}
            className="text-base text-brand-charcoal/70 max-w-2xl mx-auto leading-relaxed sm:text-lg"
          >
            A friendly AI study partner that helps you learn instead of just copying answers. Upload your textbook PDFs, ask questions step-by-step, and practice with custom quizzes.
          </motion.p>

          <motion.div 
            variants={ctaVariants}
            initial="hidden"
            animate={revealContent ? "visible" : "hidden"}
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
            variants={widgetVariants}
            initial="hidden"
            animate={revealContent ? "visible" : "hidden"}
            className="relative mx-auto mt-16 max-w-xl rounded-2xl border border-brand-beige bg-white/75 p-5 shadow-xl backdrop-blur-md select-none text-left"
          >
            {/* Header elements for preview card */}
            <div className="flex items-center justify-between border-b border-brand-beige/50 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400"></div>
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-400"></div>
                <div className="h-2.5 w-2.5 rounded-full bg-green-400"></div>
                <span className="text-[10px] font-bold text-brand-charcoal/50 uppercase ml-2 tracking-wider">
                  Live Chat Preview
                </span>
              </div>
              <span className="text-[9px] font-semibold bg-brand-brown/15 text-brand-brown px-2 py-0.5 rounded-full">
                AI Guide: Step-by-Step
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
              initial={{ opacity: 0, y: 20 }}
              animate={revealContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute -top-6 -right-12 hidden md:flex"
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="flex items-center gap-1.5 rounded-full bg-white border border-brand-beige/80 px-3.5 py-1.5 shadow-md shadow-brand-brown/5 text-[10px] font-bold text-brand-charcoal select-none"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-brand-brown animate-pulse" />
                🔒 100% Private & Secure
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={revealContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="absolute -bottom-6 -left-12 hidden md:flex"
            >
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                className="flex items-center gap-1.5 rounded-full bg-white border border-brand-beige/80 px-3.5 py-1.5 shadow-md shadow-brand-brown/5 text-[10px] font-bold text-brand-charcoal select-none"
              >
                <Sparkles className="h-3.5 w-3.5 text-brand-brown animate-pulse" />
                🧠 Active Learning Guide
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Bento Grid Features Section */}
      <section id="features" className="py-20 md:py-28 px-6 bg-white/35 border-t border-b border-brand-beige/50">
        <div className="mx-auto max-w-6xl">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
            <h2 className="font-display text-2xl font-bold tracking-tight text-brand-charcoal sm:text-3xl">
              Designed to Help You Learn Deeply
            </h2>
            <p className="text-sm text-brand-charcoal/70">
              Our study space uses step-by-step chat guidance and custom practice quizzes to help you remember concepts easily.
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
              How It Works
            </motion.div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-brand-charcoal sm:text-3xl">
              How Pathshala AI Works
            </h2>
            <p className="text-sm text-brand-charcoal/70">
              Our friendly study space is built to help you learn, practice, and keep your notes 100% secure.
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
              Have questions about how Pathshala AI works? Here are some simple answers.
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
              Helping you study better with interactive questions and custom practice quizzes.
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
