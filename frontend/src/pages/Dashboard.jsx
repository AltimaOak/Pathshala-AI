import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  BookOpen, 
  MessageSquare, 
  FileText, 
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2
} from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();

  // Onboarding sequence cards config
  const onboardingSteps = [
    {
      step: '01',
      title: 'Upload Study Materials',
      desc: 'Add textbook chapters, notes, or essays.',
      path: '/upload',
      icon: FileText
    },
    {
      step: '02',
      title: 'Chat with AI Study Buddy',
      desc: 'Ask questions and get step-by-step guidance.',
      path: '/chat',
      icon: MessageSquare
    },
    {
      step: '03',
      title: 'Make Custom Quizzes',
      desc: 'Test your knowledge with practice questions.',
      path: '/quiz',
      icon: BookOpen
    }
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-8 text-left">
      
      {/* SaaS Welcome Onboarding Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-brand-beige bg-gradient-to-br from-white to-brand-cream/40 p-6 md:p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
      >
        <div className="space-y-2.5 max-w-xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-brown/10 border border-brand-brown/20 px-3 py-1 text-xs font-semibold text-brand-brown">
            <Sparkles className="h-3.5 w-3.5" />
            Your Personal Study Space
          </div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-brand-charcoal md:text-3xl">
            Welcome to Pathshala AI
          </h2>
          <p className="text-sm text-brand-charcoal/70 leading-relaxed">
            Get started by setting up your study space. Follow the checklist below to read your notes, ask questions, and take practice quizzes.
          </p>
        </div>

        <button 
          onClick={() => navigate('/chat')}
          className="group inline-flex items-center justify-center gap-1.5 rounded-xl bg-brand-brown px-5 py-3 text-sm font-semibold text-white shadow-md shadow-brand-brown/15 transition-all hover:bg-brand-brown/95 active:scale-[0.98]"
        >
          Start your first AI session
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </motion.div>

      {/* Onboarding steps list */}
      <div className="grid gap-4 md:grid-cols-3">
        {onboardingSteps.map((step, idx) => {
          const StepIcon = step.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => navigate(step.path)}
              className="group cursor-pointer rounded-2xl border border-brand-beige bg-white p-5 shadow-sm transition-all hover:border-brand-brown/70 hover:scale-[1.01]"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="font-display text-sm font-bold text-brand-brown bg-brand-cream border border-brand-beige px-2 py-0.5 rounded-lg">
                  Step {step.step}
                </span>
                <StepIcon className="h-5 w-5 text-brand-charcoal/40 group-hover:text-brand-brown transition-colors" />
              </div>
              <h3 className="font-display text-sm font-bold text-brand-charcoal group-hover:text-brand-brown transition-colors mb-1.5">
                {step.title}
              </h3>
              <p className="text-xs text-brand-charcoal/65 leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Dynamic Grid: Strictly Authentic Empty States */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        
        {/* Card 1: Study Activity Stats - Zero dummy numbers */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="rounded-2xl border border-brand-beige bg-white/50 p-6 shadow-sm flex flex-col min-h-60"
        >
          <div className="flex items-center gap-2 mb-4 border-b border-brand-beige/40 pb-3">
            <Clock className="h-4.5 w-4.5 text-brand-charcoal/50" />
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-brand-charcoal/70">
              Study Activity
            </h3>
          </div>
          
          <div className="flex-1 flex flex-col justify-center items-center text-center p-4">
            {/* Minimal SVG Graphic */}
            <svg className="h-10 w-10 text-brand-brown/30 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xs font-bold text-brand-charcoal">No study activity yet</p>
            <p className="text-[10px] text-brand-charcoal/50 mt-1 max-w-[200px] leading-normal">
              Your study hours and quiz history will show up here once you start learning.
            </p>
          </div>
        </motion.div>

        {/* Card 2: Uploaded PDF study materials - Zero fake files */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="rounded-2xl border border-brand-beige bg-white/50 p-6 shadow-sm flex flex-col min-h-60"
        >
          <div className="flex items-center gap-2 mb-4 border-b border-brand-beige/40 pb-3">
            <FileText className="h-4.5 w-4.5 text-brand-charcoal/50" />
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-brand-charcoal/70">
              Study Materials
            </h3>
          </div>
          
          <div className="flex-1 flex flex-col justify-center items-center text-center p-4">
            <svg className="h-10 w-10 text-brand-brown/30 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
            </svg>
            <p className="text-xs font-bold text-brand-charcoal">No uploaded PDFs</p>
            <p className="text-[10px] text-brand-charcoal/50 mt-1 max-w-[200px] leading-normal">
              Want to ask questions about your books? Upload your study materials to get started.
            </p>
            <button 
              onClick={() => navigate('/upload')}
              className="text-[10px] font-semibold text-brand-brown hover:underline mt-3"
            >
              Upload Materials →
            </button>
          </div>
        </motion.div>

        {/* Card 3: Generated Quizzes history - Zero mock quizzes */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="rounded-2xl border border-brand-beige bg-white/50 p-6 shadow-sm flex flex-col min-h-60 md:col-span-2 lg:col-span-1"
        >
          <div className="flex items-center gap-2 mb-4 border-b border-brand-beige/40 pb-3">
            <BookOpen className="h-4.5 w-4.5 text-brand-charcoal/50" />
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-brand-charcoal/70">
              Generated Quizzes
            </h3>
          </div>
          
          <div className="flex-1 flex flex-col justify-center items-center text-center p-4">
            <svg className="h-10 w-10 text-brand-brown/30 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-.621-.504-1.125-1.125-1.125H9.75M10.5 3h3m-3 0a.75.75 0 000 1.5h3a.75.75 0 000-1.5m-3 0v11.25m0-11.25c.045.03.09.057.137.08m0 0a4.5 4.5 0 005.364 0c.047-.023.092-.05.137-.08M12 18.75V21m-4.5-9.75h9m-9-3h9m-9 6h9" />
            </svg>
            <p className="text-xs font-bold text-brand-charcoal">No quizzes generated</p>
            <p className="text-[10px] text-brand-charcoal/50 mt-1 max-w-[200px] leading-normal">
              Create practice quizzes to test yourself on any topic.
            </p>
            <button 
              onClick={() => navigate('/quiz')}
              className="text-[10px] font-semibold text-brand-brown hover:underline mt-3"
            >
              Generate a Quiz →
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
