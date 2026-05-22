import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
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
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6 bg-dot-grid overflow-hidden">
        {/* Ambient drifting glowing blobs */}
        <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-amber-200/25 blur-3xl animate-drift-slow pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] rounded-full bg-[#E8DCCF]/45 blur-3xl animate-drift-slower pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[550px] w-[550px] rounded-full bg-brand-brown/15 blur-3xl opacity-70 pointer-events-none" />

        {/* Ambient background constellation meshes behind the layout */}
        <div className="absolute inset-0 pointer-events-none select-none z-0 hidden lg:block overflow-hidden">
          <motion.div
            style={{ x: bgConstellationX, y: bgConstellationY }}
            animate={{ rotate: [0, 360] }}
            transition={{ repeat: Infinity, duration: 180, ease: "linear" }}
            className="absolute top-[10%] left-[-5%] h-[400px] w-[400px] opacity-15 pointer-events-none"
          >
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="40" cy="60" r="3" fill="#C8A27C" />
              <circle cx="160" cy="50" r="2.5" fill="#C8A27C" />
              <circle cx="100" cy="150" r="4" fill="#8C6A4A" />
              <circle cx="30" cy="140" r="2.5" fill="#C8A27C" />
              <circle cx="170" cy="130" r="3" fill="#8C6A4A" />
              <line x1="40" y1="60" x2="160" y2="50" stroke="#C8A27C" strokeWidth="0.5" strokeDasharray="3 3" />
              <line x1="40" y1="60" x2="100" y2="150" stroke="#C8A27C" strokeWidth="0.5" strokeDasharray="3 3" />
              <line x1="160" y1="50" x2="100" y2="150" stroke="#C8A27C" strokeWidth="0.5" strokeDasharray="3 3" />
              <line x1="40" y1="60" x2="30" y2="140" stroke="#C8A27C" strokeWidth="0.5" strokeDasharray="3 3" />
              <line x1="30" y1="140" x2="100" y2="150" stroke="#C8A27C" strokeWidth="0.5" strokeDasharray="3 3" />
              <line x1="170" y1="130" x2="160" y2="50" stroke="#C8A27C" strokeWidth="0.5" strokeDasharray="3 3" />
              <line x1="170" y1="130" x2="100" y2="150" stroke="#C8A27C" strokeWidth="0.5" strokeDasharray="3 3" />
            </svg>
          </motion.div>
        </div>

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            
            {/* Left Column: Sales Copy & Core CTAs */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-7 flex flex-col items-center lg:items-start">
              <motion.div 
                variants={badgeIntroVariants}
                initial="hidden"
                animate={revealContent ? "visible" : "hidden"}
                className="inline-flex items-center gap-2 rounded-full bg-brand-brown/10 border border-brand-brown/20 px-4 py-1.5 text-xs font-bold text-brand-brown shadow-sm shadow-brand-brown/5"
              >
                <Sparkles className="h-3.5 w-3.5 animate-pulse text-brand-brown" />
                Introducing Pathshala AI
              </motion.div>

              <motion.h1 
                variants={titleVariants}
                initial="hidden"
                animate={revealContent ? "visible" : "hidden"}
                className="font-display text-4xl font-extrabold tracking-tight text-brand-charcoal sm:text-5xl md:text-6xl leading-[1.12] max-w-2xl mx-auto lg:mx-0"
              >
                Your Personal <span className="bg-gradient-to-r from-brand-brown via-[#9C7550] to-brand-brown bg-clip-text text-transparent">AI Learning</span> Companion
              </motion.h1>

              <motion.p 
                variants={subtitleVariants}
                initial="hidden"
                animate={revealContent ? "visible" : "hidden"}
                className="text-base text-brand-charcoal-light/90 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed sm:text-lg"
              >
                A friendly, private study partner that guides you step-by-step instead of just handing you answers. Upload textbook PDFs, learn active concepts, and test yourself with customized quizzes.
              </motion.p>

              <motion.div 
                variants={ctaVariants}
                initial="hidden"
                animate={revealContent ? "visible" : "hidden"}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3 w-full sm:w-auto"
              >
                <Link
                  to="/dashboard"
                  className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-brand-brown px-7 py-4 text-sm font-bold text-white shadow-lg shadow-brand-brown/20 transition-all hover:bg-brand-brown/95 hover:shadow-xl hover:shadow-brand-brown/30 hover:scale-[1.03] active:scale-[0.97]"
                >
                  Start Learning Free
                  <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href="#features"
                  className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-brand-beige bg-white/50 backdrop-blur-md px-7 py-4 text-sm font-bold text-brand-charcoal shadow-sm transition-all hover:bg-white hover:scale-[1.03] hover:border-brand-brown/30 active:scale-[0.97]"
                >
                  Explore Features
                </a>
              </motion.div>

              {/* High-end Value Props for SaaS Visibility */}
              <motion.div
                variants={ctaVariants}
                initial="hidden"
                animate={revealContent ? "visible" : "hidden"}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4 text-xs font-semibold text-brand-charcoal/60"
              >
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4.5 w-4.5 text-brand-brown" />
                  100% Private Study space
                </div>
                <div className="h-1.5 w-1.5 rounded-full bg-brand-beige" />
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-4.5 w-4.5 text-brand-brown" />
                  Socratic Thinking Methodology
                </div>
              </motion.div>
            </div>

            {/* Right Column: Premium Socratic Preview Interface with Framed Floats */}
            <div className="lg:col-span-5 relative mt-16 lg:mt-0 flex justify-center z-10">
              
              {/* Backlight halo glow under mockup */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[380px] w-[380px] rounded-full bg-gradient-to-tr from-brand-brown/20 to-amber-200/20 blur-3xl pointer-events-none z-0" />

              {/* Integrated Parallax Floating Elements */}
              {revealContent && (
                <div className="absolute inset-0 pointer-events-none select-none z-20">
                  
                  {/* Graduation Cap (Top-Left of Card) */}
                  <motion.div
                    style={{ x: capParallaxX, y: capParallaxY }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="absolute -top-12 -left-8 h-20 w-20 z-30"
                  >
                    <motion.div
                      animate={{ y: [0, -8, 0], rotate: [0, 3, -3, 0] }}
                      transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                      className="w-full h-full drop-shadow-[0_12px_24px_rgba(200,162,124,0.22)] filter hover:brightness-105 transition-all duration-300 cursor-pointer pointer-events-auto"
                    >
                      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        <path d="M50 20 L85 32 L50 44 L15 32 Z" fill="#C8A27C" opacity="0.95" stroke="#8C6A4A" strokeWidth="1"/>
                        <path d="M30 40 L30 50 C30 56, 70 56, 70 50 L70 40 L50 46 Z" fill="#8C6A4A" stroke="#C8A27C" strokeWidth="1"/>
                        <ellipse cx="50" cy="32" rx="3.5" ry="1.8" fill="#FAF7F2"/>
                        <path d="M50 32 Q68 34, 76 46 L78 56" stroke="#E8DCCF" strokeWidth="1.8" fill="none"/>
                        <rect x="76" y="54" width="4" height="8" fill="#E8DCCF" rx="1"/>
                      </svg>
                    </motion.div>
                  </motion.div>

                  {/* Holographic Study Notes (Bottom-Left of Card) */}
                  <motion.div
                    style={{ x: notesParallaxX, y: notesParallaxY }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="absolute -bottom-8 -left-10 h-22 w-22 z-30"
                  >
                    <motion.div
                      animate={{ y: [0, 10, 0], rotate: [0, -3, 3, 0] }}
                      transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
                      className="w-full h-full drop-shadow-[0_10px_20px_rgba(200,162,124,0.18)] filter hover:brightness-105 transition-all duration-300 cursor-pointer pointer-events-auto"
                    >
                      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        <path d="M30 20 L80 26 L70 80 L20 74 Z" fill="#FFFFFF" fillOpacity="0.55" stroke="white" strokeWidth="1.5" strokeOpacity="0.85" style={{ backdropFilter: 'blur(8px)' }} />
                        <path d="M36 34 L68 38" stroke="#C8A27C" strokeWidth="3" opacity="0.7" strokeLinecap="round"/>
                        <path d="M33 46 L65 50" stroke="#C8A27C" strokeWidth="3" opacity="0.7" strokeLinecap="round"/>
                        <path d="M30 58 L54 61" stroke="#8C6A4A" strokeWidth="3" opacity="0.6" strokeLinecap="round"/>
                        <path d="M70 66 L72 61 L77 60 L73 56 L74 51 L69 54 L64 52 L67 57 L63 61 L68 61 Z" fill="#C8A27C" opacity="0.9"/>
                      </svg>
                    </motion.div>
                  </motion.div>

                  {/* AI Brain Glass Orb (Top-Right of Card) */}
                  <motion.div
                    style={{ x: orbParallaxX, y: orbParallaxY }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="absolute -top-12 -right-8 h-22 w-22 z-30"
                  >
                    <motion.div
                      animate={{ y: [0, -10, 0], rotate: [0, 4, -4, 0] }}
                      transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                      className="w-full h-full drop-shadow-[0_15px_32px_rgba(200,162,124,0.25)] filter hover:brightness-105 transition-all duration-300 cursor-pointer pointer-events-auto"
                    >
                      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        <defs>
                          <radialGradient id="orbGrad" cx="35%" cy="35%" r="65%">
                            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95"/>
                            <stop offset="35%" stopColor="#FAF7F2" stopOpacity="0.5"/>
                            <stop offset="75%" stopColor="#E8DCCF" stopOpacity="0.3"/>
                            <stop offset="100%" stopColor="#C8A27C" stopOpacity="0.6"/>
                          </radialGradient>
                          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="4" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                          </filter>
                        </defs>
                        <circle cx="50" cy="50" r="41" fill="#C8A27C" opacity="0.25" filter="url(#glow)"/>
                        <circle cx="50" cy="50" r="37" fill="url(#orbGrad)" stroke="#C8A27C" strokeWidth="1.5" strokeOpacity="0.5"/>
                        <path d="M38 50 Q50 35 62 50 T50 72 Z" stroke="#C8A27C" strokeWidth="1" strokeDasharray="3 2" opacity="0.6"/>
                        <circle cx="50" cy="38" r="3" fill="#C8A27C" filter="url(#glow)"/>
                        <circle cx="38" cy="50" r="3.5" fill="#8C6A4A" filter="url(#glow)"/>
                        <circle cx="62" cy="50" r="2.5" fill="#C8A27C" filter="url(#glow)"/>
                        <circle cx="50" cy="62" r="3" fill="#E8DCCF" filter="url(#glow)"/>
                        <line x1="50" y1="38" x2="38" y2="50" stroke="#C8A27C" strokeWidth="0.8" opacity="0.5"/>
                        <line x1="50" y1="38" x2="62" y2="50" stroke="#C8A27C" strokeWidth="0.8" opacity="0.5"/>
                        <line x1="38" y1="50" x2="50" y2="62" stroke="#C8A27C" strokeWidth="0.8" opacity="0.5"/>
                        <line x1="62" y1="50" x2="50" y2="62" stroke="#C8A27C" strokeWidth="0.8" opacity="0.5"/>
                      </svg>
                    </motion.div>
                  </motion.div>

                  {/* Isometric 3D Book (Bottom-Right of Card) */}
                  <motion.div
                    style={{ x: bookParallaxX, y: bookParallaxY }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="absolute -bottom-10 -right-8 h-20 w-20 z-30"
                  >
                    <motion.div
                      animate={{ y: [0, -8, 0], rotate: [0, -3, 3, 0] }}
                      transition={{ repeat: Infinity, duration: 6.5, ease: "easeInOut" }}
                      className="w-full h-full drop-shadow-[0_12px_24px_rgba(200,162,124,0.22)] filter hover:brightness-105 transition-all duration-300 cursor-pointer pointer-events-auto"
                    >
                      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        <path d="M50 30 L20 45 L20 75 L50 60 Z" fill="#C8A27C" opacity="0.95" />
                        <path d="M50 30 L80 45 L80 75 L50 60 Z" fill="#E8DCCF" opacity="0.95" />
                        <path d="M50 30 L50 60" stroke="#8C6A4A" strokeWidth="2.5" />
                        <path d="M50 34 L24 47 L24 72 L50 59 Z" fill="#FAF7F2" />
                        <path d="M50 34 L76 47 L76 72 L50 59 Z" fill="#FFFFFF" />
                        <path d="M50 35 L50 41" stroke="#C8A27C" strokeWidth="2" />
                        <path d="M50 50 L50 56" stroke="#C8A27C" strokeWidth="2" />
                      </svg>
                    </motion.div>
                  </motion.div>
                </div>
              )}

              {/* Socratic Chat Mockup Card */}
              <motion.div
                variants={widgetVariants}
                initial="hidden"
                animate={revealContent ? "visible" : "hidden"}
                className="w-full max-w-[430px] rounded-3xl border border-white/50 bg-white/70 shadow-[0_24px_50px_-12px_rgba(200,162,124,0.25)] backdrop-blur-xl select-none text-left relative z-10 overflow-hidden"
              >
                {/* Simulated browser topbar */}
                <div className="flex items-center justify-between border-b border-brand-beige/40 bg-brand-cream/40 px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-[#FF5F56] shadow-sm"></div>
                    <div className="h-3 w-3 rounded-full bg-[#FFBD2E] shadow-sm"></div>
                    <div className="h-3 w-3 rounded-full bg-[#27C93F] shadow-sm"></div>
                    <span className="text-[10px] font-bold text-brand-charcoal/50 uppercase ml-3 tracking-widest font-sans">
                      LIVE STUDY PREVIEW
                    </span>
                  </div>
                  <span className="text-[9px] font-extrabold bg-brand-brown/15 text-brand-brown px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Socratic Buddy
                  </span>
                </div>

                {/* Simulated Conversation bubbles */}
                <div className="p-5 space-y-4 min-h-[200px] flex flex-col justify-end bg-gradient-to-b from-white/30 to-brand-cream/10">
                  <AnimatePresence>
                    {visibleMessages.map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 12, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex items-start gap-3 max-w-[88%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                      >
                        {/* Bubble avatar badge */}
                        <div className={`flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-xl border text-[9px] font-bold shadow-sm ${
                          msg.sender === 'user' 
                            ? 'bg-brand-beige border-brand-beige/50 text-brand-charcoal' 
                            : 'bg-brand-brown border-brand-brown/10 text-white'
                        }`}>
                          {msg.sender === 'user' ? 'ME' : 'AI'}
                        </div>
                        
                        {/* Dynamic Bubble content */}
                        <div className={`rounded-2xl px-4 py-2.5 text-xs shadow-sm border ${
                          msg.sender === 'user' 
                            ? 'bg-brand-cream/80 border-brand-beige/60 text-brand-charcoal rounded-tr-none font-medium' 
                            : 'bg-white border-brand-beige/30 text-brand-charcoal rounded-tl-none leading-relaxed font-semibold'
                        }`}>
                          <p>{msg.text}</p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Typing Dots */}
                  {isTyping && (
                    <motion.div 
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-3 max-w-[88%]"
                    >
                      <div className="flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-xl border bg-brand-brown border-brand-brown/10 text-white text-[9px] font-bold shadow-sm animate-pulse">
                        AI
                      </div>
                      <div className="rounded-2xl rounded-tl-none border border-brand-beige/40 bg-white px-4 py-3.5 shadow-sm">
                        <div className="flex items-center gap-1.5">
                          <span className="h-2 w-2 animate-bounce rounded-full bg-brand-brown/40"></span>
                          <span className="h-2 w-2 animate-bounce rounded-full bg-brand-brown/70 [animation-delay:0.2s]"></span>
                          <span className="h-2 w-2 animate-bounce rounded-full bg-brand-brown [animation-delay:0.4s]"></span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Floating tooltips docked dynamically */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={revealContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="absolute -top-7 -right-8 hidden xl:flex z-30"
                >
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                    className="flex items-center gap-1.5 rounded-full bg-white border border-brand-beige/80 px-4 py-2 shadow-md shadow-brand-brown/10 text-[10px] font-bold text-brand-charcoal select-none cursor-default"
                  >
                    <ShieldCheck className="h-4 w-4 text-brand-brown" />
                    🔒 100% Private & Secure
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={revealContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                  className="absolute -bottom-7 -left-8 hidden xl:flex z-30"
                >
                  <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                    className="flex items-center gap-1.5 rounded-full bg-white border border-brand-beige/80 px-4 py-2 shadow-md shadow-brand-brown/10 text-[10px] font-bold text-brand-charcoal select-none cursor-default"
                  >
                    <Sparkles className="h-4 w-4 text-brand-brown" />
                    🧠 Active Socratic Guide
                  </motion.div>
                </motion.div>

              </motion.div>

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
