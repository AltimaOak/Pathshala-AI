import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  GraduationCap, 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  Lightbulb,
  Target,
  Brain,
  Zap,
  MessageSquare, 
  FileText, 
  ShieldCheck, 
  HelpCircle, 
  ChevronDown,
  Search,
  ThumbsUp,
  ThumbsDown,
  Check,
  Send,
  X,
  MessageCircle,
  ChevronUp
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

  // Back to Navigation floating button visibility on scroll
  const [showBackToNav, setShowBackToNav] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToNav(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Interactive FAQ states
  const [activeCategory, setActiveCategory] = useState('all');
  const [faqFeedbacks, setFaqFeedbacks] = useState({});

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

  // Mouse coordinates for 3D parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for mouse movements
  const springConfig = { damping: 25, stiffness: 100 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Calculate normalized position relative to center (-0.5 to 0.5)
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) - 0.5;
      const y = (e.clientY / innerHeight) - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Deep Background Layer parallax transforms (subtle shift)
  const bgConstellationX = useTransform(smoothMouseX, [-0.5, 0.5], [-12, 12]);
  const bgConstellationY = useTransform(smoothMouseY, [-0.5, 0.5], [-12, 12]);

  // Graduation Cap (Top-Left) parallax transforms
  const capParallaxX = useTransform(smoothMouseX, [-0.5, 0.5], [-25, 25]);
  const capParallaxY = useTransform(smoothMouseY, [-0.5, 0.5], [-25, 25]);

  // Holographic Study Notes (Bottom-Left) parallax transforms
  const notesParallaxX = useTransform(smoothMouseX, [-0.5, 0.5], [-35, 35]);
  const notesParallaxY = useTransform(smoothMouseY, [-0.5, 0.5], [-35, 35]);

  // AI Brain Glass Orb (Top-Right) parallax transforms
  const orbParallaxX = useTransform(smoothMouseX, [-0.5, 0.5], [-30, 30]);
  const orbParallaxY = useTransform(smoothMouseY, [-0.5, 0.5], [-30, 30]);

  // Isometric 3D Book (Bottom-Right) parallax transforms
  const bookParallaxX = useTransform(smoothMouseX, [-0.5, 0.5], [-22, 22]);
  const bookParallaxY = useTransform(smoothMouseY, [-0.5, 0.5], [-22, 22]);

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
      category: "general",
      question: "Is Pathshala AI different from standard AI tools?",
      answer: "Yes. Standard AI chatbots just copy and paste the answers for you, which doesn't help you learn. Pathshala AI acts like a real teacher—asking you helpful questions and guiding you step-by-step so you actually understand the concepts."
    },
    {
      category: "socratic",
      question: "What is the Socratic study method?",
      answer: "The Socratic method is a learning approach based on asking and answering questions to stimulate critical thinking. Instead of immediately giving you the answer, Pathshala AI asks gentle, guided questions to help you figure it out yourself, enhancing memory retention by up to 4x."
    },
    {
      category: "socratic",
      question: "Can it generate practice quizzes and tests?",
      answer: "Absolutely! You can instantly convert any uploaded chapter or lecture note into interactive multiple-choice questions, flashcards, or short-answer quizzes with detailed feedback for every single answer choice."
    },
    {
      category: "security",
      question: "Can it read scanned textbooks and custom PDFs?",
      answer: "Absolutely. Our app reads through tables, headings, and formatting in your files. It securely saves this information in your private study space so your AI study guide can explain concepts perfectly using your own materials."
    },
    {
      category: "security",
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

      {/* Hero Section Recreated From Reference & Fully Theme-Responsive */}
      <section className="relative min-h-[92vh] lg:min-h-screen flex items-center pt-28 pb-16 md:pt-36 md:pb-24 px-6 md:px-10 lg:px-16 overflow-hidden bg-brand-cream transition-colors duration-500">
        
        {/* Photographic Study Desk Background Asset */}
        <div 
          className="absolute inset-0 bg-cover pointer-events-none select-none z-0"
          style={{ 
            backgroundImage: `url('/hero-study-desk.jpg')`,
            backgroundPosition: 'right 25% center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }}
        />

        {/* Dynamic Studio Lighting & Legibility Gradient Overlays using Theme Variables */}
        <div 
          className="absolute inset-0 pointer-events-none z-0 hidden md:block transition-all duration-500"
          style={{
            background: 'linear-gradient(90deg, var(--brand-cream) 0%, var(--brand-cream) 36%, color-mix(in srgb, var(--brand-cream) 94%, transparent) 48%, color-mix(in srgb, var(--brand-cream) 45%, transparent) 68%, transparent 100%)'
          }}
        />
        {/* Mobile / Tablet vertical overlay */}
        <div 
          className="absolute inset-0 pointer-events-none z-0 md:hidden bg-brand-cream/90 transition-colors duration-500"
        />

        {/* Atmospheric Theme Tint over the Desk Image - adapts automatically to Forest Sage, Sunset Clay, etc. */}
        <div 
          className="absolute inset-0 mix-blend-color pointer-events-none z-0 transition-colors duration-500"
          style={{ backgroundColor: 'var(--hero-tint, transparent)' }}
        />
        <div 
          className="absolute inset-0 mix-blend-multiply pointer-events-none z-0 transition-colors duration-500"
          style={{ backgroundColor: 'var(--hero-ambient, transparent)' }}
        />

        <div className="mx-auto max-w-7xl w-full relative z-10 py-6">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            
            {/* Left Column: Headline, Description, CTAs, and Trust Badges */}
            <div className="lg:col-span-7 text-left space-y-6 sm:space-y-7 max-w-2xl">
              
              {/* Badge: Introducing Pathshala AI */}
              <motion.div 
                variants={badgeIntroVariants}
                initial="hidden"
                animate={revealContent ? "visible" : "hidden"}
                className="inline-flex items-center gap-2 rounded-full bg-brand-beige/70 border border-brand-beige px-3.5 py-1 text-xs font-semibold text-brand-terracotta shadow-xs backdrop-blur-xs transition-colors duration-300"
              >
                <Sparkles className="h-3.5 w-3.5 text-brand-terracotta fill-brand-terracotta/20 transition-colors duration-300" />
                <span>Introducing Pathshala AI</span>
              </motion.div>

              {/* Serif Headline matching reference editorial styling */}
              <motion.h1 
                variants={titleVariants}
                initial="hidden"
                animate={revealContent ? "visible" : "hidden"}
                className="font-serif-hero text-5xl sm:text-6xl lg:text-[72px] leading-[1.08] tracking-tight text-brand-charcoal transition-colors duration-300"
              >
                Your Personal AI <br />
                <span className="text-brand-terracotta font-normal transition-colors duration-300">
                  Learning Companion
                </span>
              </motion.h1>

              {/* Subtitle / Value Proposition */}
              <motion.p 
                variants={subtitleVariants}
                initial="hidden"
                animate={revealContent ? "visible" : "hidden"}
                className="text-base sm:text-lg text-brand-charcoal-light leading-relaxed max-w-xl font-sans transition-colors duration-300"
              >
                A friendly, private study partner that guides you step-by-step instead of just handing you answers. Upload textbook PDFs, learn active concepts, and test yourself with customized quizzes.
              </motion.p>

              {/* Dual Action CTAs */}
              <motion.div 
                variants={ctaVariants}
                initial="hidden"
                animate={revealContent ? "visible" : "hidden"}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2"
              >
                <Link
                  to="/signup"
                  className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-brand-coffee hover:opacity-95 px-8 py-3.5 text-sm sm:text-base font-semibold text-white shadow-md shadow-brand-coffee/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Start Learning Free</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                
                <a
                  href="#features"
                  className="inline-flex items-center justify-center rounded-full bg-brand-beige/50 hover:bg-brand-beige/80 border border-brand-beige px-8 py-3.5 text-sm sm:text-base font-semibold text-brand-charcoal transition-all hover:scale-[1.02] active:scale-[0.98] backdrop-blur-xs text-center"
                >
                  Explore Features
                </a>
              </motion.div>

              {/* Bottom Trust Indicators */}
              <motion.div
                variants={ctaVariants}
                initial="hidden"
                animate={revealContent ? "visible" : "hidden"}
                className="flex flex-wrap items-center gap-4 sm:gap-6 pt-5 text-xs sm:text-sm font-medium text-brand-charcoal transition-colors duration-300"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4.5 w-4.5 text-brand-terracotta transition-colors duration-300" />
                  <span>100% Private Study Space</span>
                </div>
                
                <div className="hidden sm:block h-3.5 w-[1px] bg-brand-beige transition-colors duration-300" />
                
                <div className="flex items-center gap-2">
                  <Brain className="h-4.5 w-4.5 text-brand-terracotta transition-colors duration-300" />
                  <span>Smart Learning Path</span>
                </div>
                
                <div className="hidden sm:block h-3.5 w-[1px] bg-brand-beige transition-colors duration-300" />
                
                <div className="flex items-center gap-2">
                  <Zap className="h-4.5 w-4.5 text-brand-terracotta transition-colors duration-300" />
                  <span>Active Concepts & Quizzes</span>
                </div>
              </motion.div>

            </div>

            {/* Right Column: Handwritten Note & 3 Floating Feature Cards */}
            <div className="lg:col-span-5 relative mt-8 lg:mt-0 flex flex-col items-center lg:items-end z-10">
              
              {/* Handwritten "Learn Smarter Not Harder" playful annotation with sketched arrow */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={revealContent ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="absolute -top-16 left-2 lg:-left-16 hidden md:flex flex-col items-center pointer-events-none select-none z-20"
              >
                <span className="font-handwriting text-2xl lg:text-3xl font-bold text-brand-terracotta -rotate-6 tracking-wide leading-tight text-center drop-shadow-xs transition-colors duration-300">
                  Learn<br />Smarter<br />Not Harder
                </span>
                <svg 
                  className="w-10 h-7 text-brand-terracotta -rotate-12 mt-1 opacity-85 transition-colors duration-300" 
                  viewBox="0 0 50 30" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M 8,5 Q 22,18 42,19" />
                  <path d="M 33,13 L 42,19 L 34,25" />
                </svg>
              </motion.div>

              {/* Stacked 3 Floating Feature Cards */}
              <div className="w-full max-w-[420px] space-y-4">
                
                {/* Card 1: Upload & Learn */}
                <motion.div
                  initial={{ opacity: 0, x: 25, y: 15 }}
                  animate={revealContent ? { opacity: 1, x: 0, y: 0 } : { opacity: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  whileHover={{ y: -3, scale: 1.01 }}
                  className="group relative rounded-2xl border border-white/80 hover:border-brand-beige bg-white/85 hover:bg-white/95 p-4 sm:p-5 shadow-[0_12px_28px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.1)] backdrop-blur-md transition-all duration-300 cursor-pointer"
                >
                  <Link to="/upload" className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-beige/60 text-brand-coffee group-hover:bg-brand-beige group-hover:text-brand-terracotta transition-colors duration-300">
                        <BookOpen className="h-6 w-6 stroke-[1.8]" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-base text-brand-charcoal group-hover:text-brand-coffee transition-colors duration-300">
                          Upload & Learn
                        </h3>
                        <p className="text-xs text-brand-charcoal-light mt-0.5 transition-colors duration-300">
                          Turn your PDFs into understandable lessons
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-brand-charcoal-light/60 group-hover:text-brand-coffee group-hover:translate-x-1 transition-all shrink-0" />
                  </Link>
                </motion.div>

                {/* Card 2: Concept Clarity */}
                <motion.div
                  initial={{ opacity: 0, x: 25, y: 15 }}
                  animate={revealContent ? { opacity: 1, x: 0, y: 0 } : { opacity: 0 }}
                  transition={{ delay: 0.45, duration: 0.6 }}
                  whileHover={{ y: -3, scale: 1.01 }}
                  className="group relative rounded-2xl border border-white/80 hover:border-brand-beige bg-white/85 hover:bg-white/95 p-4 sm:p-5 shadow-[0_12px_28px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.1)] backdrop-blur-md transition-all duration-300 cursor-pointer"
                >
                  <Link to="/chat" className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-beige/60 text-brand-coffee group-hover:bg-brand-beige group-hover:text-brand-terracotta transition-colors duration-300">
                        <Lightbulb className="h-6 w-6 stroke-[1.8]" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-base text-brand-charcoal group-hover:text-brand-coffee transition-colors duration-300">
                          Concept Clarity
                        </h3>
                        <p className="text-xs text-brand-charcoal-light mt-0.5 transition-colors duration-300">
                          Step-by-step explanations in simple language
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-brand-charcoal-light/60 group-hover:text-brand-coffee group-hover:translate-x-1 transition-all shrink-0" />
                  </Link>
                </motion.div>

                {/* Card 3: Practice & Improve */}
                <motion.div
                  initial={{ opacity: 0, x: 25, y: 15 }}
                  animate={revealContent ? { opacity: 1, x: 0, y: 0 } : { opacity: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  whileHover={{ y: -3, scale: 1.01 }}
                  className="group relative rounded-2xl border border-white/80 hover:border-brand-beige bg-white/85 hover:bg-white/95 p-4 sm:p-5 shadow-[0_12px_28px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.1)] backdrop-blur-md transition-all duration-300 cursor-pointer"
                >
                  <Link to="/quiz" className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-beige/60 text-brand-coffee group-hover:bg-brand-beige group-hover:text-brand-terracotta transition-colors duration-300">
                        <Target className="h-6 w-6 stroke-[1.8]" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-base text-brand-charcoal group-hover:text-brand-coffee transition-colors duration-300">
                          Practice & Improve
                        </h3>
                        <p className="text-xs text-brand-charcoal-light mt-0.5 transition-colors duration-300">
                          Custom quizzes to track your progress
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-brand-charcoal-light/60 group-hover:text-brand-coffee group-hover:translate-x-1 transition-all shrink-0" />
                  </Link>
                </motion.div>

              </div>

            </div>

          </div>
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
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-2xl border border-brand-beige bg-white p-6 shadow-sm hover:border-brand-brown/40 transition-all duration-200 text-left cursor-pointer select-none"
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
                  whileTap={{ scale: 0.95 }}
                  className="relative z-10 rounded-2xl border border-brand-beige bg-white p-6 shadow-sm flex flex-col items-center text-center group hover:border-brand-brown/40 transition-all duration-200 cursor-pointer select-none"
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
          <div className="text-center mb-12 space-y-2">
            <h2 className="font-display text-2xl font-bold tracking-tight text-brand-charcoal sm:text-3xl">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-brand-charcoal/70 max-w-md mx-auto">
              Have questions about how Pathshala AI works? Here are some simple answers.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {[
              { id: 'all', label: 'All FAQs' },
              { id: 'general', label: 'General' },
              { id: 'socratic', label: 'Socratic Buddy' },
              { id: 'security', label: 'Privacy & Trust' }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => { setActiveCategory(tab.id); setActiveFaq(null); }}
                className={`relative px-4 py-2 rounded-full text-xs font-bold transition-colors duration-300 select-none cursor-pointer ${
                  activeCategory === tab.id 
                    ? 'text-white' 
                    : 'text-brand-charcoal/75 hover:text-brand-charcoal hover:bg-brand-cream/45'
                }`}
              >
                {activeCategory === tab.id && (
                  <motion.span
                    layoutId="activeFaqTab"
                    className="absolute inset-0 bg-brand-brown rounded-full z-0"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* FAQ Accordion List */}
          <div className="space-y-3.5 text-left">
            <AnimatePresence mode="popLayout">
              {faqs
                .filter(faq => activeCategory === 'all' || faq.category === activeCategory)
                .map((faq) => (
                    <motion.div 
                      key={faq.question}
                      layout
                      initial={{ opacity: 0, scale: 0.99 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.99 }}
                      transition={{ duration: 0.2 }}
                      whileHover={{ scale: 1.002 }}
                      className="rounded-xl border border-brand-beige bg-white shadow-sm overflow-hidden cursor-pointer"
                    >
                      <button
                        type="button"
                        onClick={() => setActiveFaq(activeFaq === faq.question ? null : faq.question)}
                        className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-brand-cream/10"
                      >
                        <span className="font-display text-xs font-bold text-brand-charcoal flex gap-2">
                          <HelpCircle className="h-4.5 w-4.5 text-brand-brown shrink-0" />
                          {faq.question}
                        </span>
                        <ChevronDown className={`h-4.5 w-4.5 text-brand-charcoal/45 transition-transform duration-200 ${activeFaq === faq.question ? 'rotate-180' : ''}`} />
                      </button>

                      <AnimatePresence initial={false}>
                        {activeFaq === faq.question && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="px-5 pb-5 pt-1 border-t border-brand-beige/25 text-xs text-brand-charcoal/70 leading-relaxed pl-11">
                              <div>{faq.answer}</div>
                              
                              {/* Helpful feedback row */}
                              <div className="mt-4 pt-4 border-t border-brand-beige/25 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-brand-charcoal/50 font-bold">
                                <span>Was this answer helpful?</span>
                                <div className="flex gap-2">
                                  {faqFeedbacks[faq.question] ? (
                                    <motion.div 
                                      initial={{ scale: 0.8, opacity: 0 }}
                                      animate={{ scale: 1, opacity: 1 }}
                                      className="flex items-center gap-1.5 text-brand-brown bg-brand-brown/10 px-3 py-1 rounded-lg border border-brand-brown/20 font-bold"
                                    >
                                      <Check className="h-3.5 w-3.5" />
                                      {faqFeedbacks[faq.question] === 'helpful' ? 'Glad to help! 🚀' : 'Feedback recorded. Thanks! ✍️'}
                                    </motion.div>
                                  ) : (
                                    <>
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setFaqFeedbacks(prev => ({ ...prev, [faq.question]: 'helpful' }));
                                        }}
                                        className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-brand-beige bg-brand-cream/35 hover:bg-brand-brown hover:border-brand-brown hover:text-white transition-all duration-200 select-none cursor-pointer active:scale-95"
                                      >
                                        <ThumbsUp className="h-3 w-3" /> Yes
                                      </button>
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setFaqFeedbacks(prev => ({ ...prev, [faq.question]: 'not-helpful' }));
                                        }}
                                        className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-brand-beige bg-brand-cream/35 hover:bg-brand-brown hover:border-brand-brown hover:text-white transition-all duration-200 select-none cursor-pointer active:scale-95"
                                      >
                                        <ThumbsDown className="h-3 w-3" /> No
                                      </button>
                                    </>
                                  )}
                                </div>
                              </div>

                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
            </AnimatePresence>
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

      {/* Simple Back to Navigation floating button */}
      <AnimatePresence>
        {showBackToNav && (
          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full border border-brand-beige bg-white/95 px-4 py-2.5 text-xs font-bold text-brand-charcoal shadow-lg backdrop-blur-md transition-all hover:border-brand-brown hover:text-brand-brown hover:scale-105 active:scale-95 cursor-pointer"
            title="Back to Navigation"
          >
            <ChevronUp className="h-4 w-4 text-brand-brown" />
            <span>Back to Navigation</span>
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
