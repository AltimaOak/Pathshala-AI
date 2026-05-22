import React from 'react';
import { motion } from 'framer-motion';

export default function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  actionLabel, 
  onAction,
  illustrationType = 'default'
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-brand-beige bg-white/40 p-8 text-center glassmorphic shadow-sm max-w-lg mx-auto"
    >
      {/* Decorative SVG Shapes representing study objects */}
      <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-brand-cream/60 border border-brand-beige">
        {illustrationType === 'pdf' && (
          <svg className="h-12 w-12 text-brand-brown/40 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        )}
        
        {illustrationType === 'chat' && (
          <svg className="h-12 w-12 text-brand-brown/40 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
          </svg>
        )}

        {illustrationType === 'quiz' && (
          <svg className="h-12 w-12 text-brand-brown/40 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-.621-.504-1.125-1.125-1.125H9.75M10.5 3h3m-3 0a.75.75 0 000 1.5h3a.75.75 0 000-1.5m-3 0v11.25m0-11.25c.045.03.09.057.137.08m0 0a4.5 4.5 0 005.364 0c.047-.023.092-.05.137-.08M12 18.75V21m-4.5-9.75h9m-9-3h9m-9 6h9" />
          </svg>
        )}

        {illustrationType === 'default' && Icon && (
          <Icon className="h-10 w-10 text-brand-brown/60" />
        )}

        {/* Small floating particles */}
        <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-brand-brown/15 border border-brand-brown/30"></span>
        <span className="absolute -bottom-2 -left-2 h-5 w-5 rounded-lg bg-brand-beige/50 border border-brand-beige"></span>
      </div>

      {/* Text Info */}
      <h3 className="font-display text-lg font-bold text-brand-charcoal mb-2">
        {title}
      </h3>
      <p className="text-sm text-brand-charcoal/65 leading-relaxed max-w-sm mb-6">
        {description}
      </p>

      {/* Custom Action Call */}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center justify-center rounded-xl bg-brand-brown px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-brown/10 transition-all hover:bg-brand-brown/95 hover:scale-[1.02] active:scale-[0.98]"
        >
          {actionLabel}
        </button>
      )}
    </motion.div>
  );
}
