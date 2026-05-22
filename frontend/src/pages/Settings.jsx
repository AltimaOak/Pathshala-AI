import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Shield, 
  Database, 
  Sliders, 
  CheckCircle2, 
  Key, 
  Sparkles,
  RefreshCw
} from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  
  // Persistent States
  const [tutorStyle, setTutorStyle] = useState(() => localStorage.getItem('tutorStyle') || 'socratic');
  const [profileName, setProfileName] = useState(() => localStorage.getItem('profileName') || 'Aditya Yadav');
  const [profileEmail, setProfileEmail] = useState(() => localStorage.getItem('profileEmail') || 'aditya@domain.com');
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('apiKey') || '');
  const [dbSpace, setDbSpace] = useState(() => localStorage.getItem('dbSpace') || '12.45');
  
  // UX Interaction States
  const [generatingKey, setGeneratingKey] = useState(false);
  const [isPurging, setIsPurging] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Make sure dbSpace is initialized in localStorage
  useEffect(() => {
    if (!localStorage.getItem('dbSpace')) {
      localStorage.setItem('dbSpace', '12.45');
    }
  }, []);

  const triggerToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    localStorage.setItem('profileName', profileName.trim());
    localStorage.setItem('profileEmail', profileEmail.trim());
    
    // Trigger global storage update event for Navbar
    window.dispatchEvent(new Event('storage'));
    triggerToast("Profile information saved successfully!");
  };

  const handleTutorStyleChange = (style) => {
    setTutorStyle(style);
    localStorage.setItem('tutorStyle', style);
    triggerToast(`AI Persona switched to ${style.toUpperCase()} style.`);
  };

  const handleGenerateApiKey = () => {
    setGeneratingKey(true);
    setTimeout(() => {
      const generated = 'ps_live_' + Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
      setApiKey(generated);
      localStorage.setItem('apiKey', generated);
      setGeneratingKey(false);
      triggerToast("Developer API Key generated successfully!");
    }, 1200);
  };

  const handlePurgeCache = () => {
    setIsPurging(true);
    setTimeout(() => {
      setDbSpace('0.00');
      localStorage.setItem('dbSpace', '0.00');
      setIsPurging(false);
      triggerToast("Sandboxed vector database successfully purged!");
    }, 1200);
  };

  return (
    <div className="mx-auto max-w-4xl text-left relative">
      
      {/* Premium Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 right-6 z-50 flex items-center gap-2 rounded-xl bg-brand-charcoal text-white px-4 py-3 text-xs font-semibold shadow-lg shadow-brand-charcoal/20 border border-white/10"
          >
            <CheckCircle2 className="h-4.5 w-4.5 text-brand-brown animate-pulse" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Intro Header */}
      <div className="mb-8 select-none">
        <h2 className="font-display text-2xl font-bold tracking-tight text-brand-charcoal">
          Settings
        </h2>
        <p className="text-sm text-brand-charcoal/70 mt-1">
          Customize your adaptive tutor persona, manage account details, and check resource limits.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-4">
        {/* Left Side Tab Navigation */}
        <div className="space-y-1">
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold text-left transition-all ${
              activeTab === 'profile'
                ? 'bg-brand-beige/40 text-brand-brown border-l-2 border-brand-brown'
                : 'text-brand-charcoal/75 hover:bg-brand-beige/25 hover:text-brand-charcoal'
            }`}
          >
            <User className="h-4.5 w-4.5" />
            Account Profile
          </button>
          
          <button
            onClick={() => setActiveTab('tutor')}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold text-left transition-all ${
              activeTab === 'tutor'
                ? 'bg-brand-beige/40 text-brand-brown border-l-2 border-brand-brown'
                : 'text-brand-charcoal/75 hover:bg-brand-beige/25 hover:text-brand-charcoal'
            }`}
          >
            <Sliders className="h-4.5 w-4.5" />
            Tutor Persona
          </button>
          
          <button
            onClick={() => setActiveTab('billing')}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold text-left transition-all ${
              activeTab === 'billing'
                ? 'bg-brand-beige/40 text-brand-brown border-l-2 border-brand-brown'
                : 'text-brand-charcoal/75 hover:bg-brand-beige/25 hover:text-brand-charcoal'
            }`}
          >
            <Database className="h-4.5 w-4.5" />
            Storage Quota
          </button>
          
          <button
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold text-left transition-all ${
              activeTab === 'security'
                ? 'bg-brand-beige/40 text-brand-brown border-l-2 border-brand-brown'
                : 'text-brand-charcoal/75 hover:bg-brand-beige/25 hover:text-brand-charcoal'
            }`}
          >
            <Shield className="h-4.5 w-4.5" />
            Security & API
          </button>
        </div>

        {/* Right Side: Tab Contents */}
        <div className="md:col-span-3">
          <AnimatePresence mode="wait">
            
            {/* Account Profile Tab */}
            {activeTab === 'profile' && (
              <motion.div
                key="profile-tab"
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.15 }}
                className="rounded-2xl border border-brand-beige bg-white p-6 shadow-sm space-y-6"
              >
                <div className="border-b border-brand-beige/40 pb-3">
                  <h3 className="font-display text-base font-bold text-brand-charcoal flex items-center gap-2">
                    <User className="h-5 w-5 text-brand-brown" />
                    Account Information
                  </h3>
                  <p className="text-xs text-brand-charcoal/60 mt-0.5">
                    Update your primary credentials utilized inside the learning workspace.
                  </p>
                </div>
                
                <form onSubmit={handleProfileSave} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="settings-name" className="block text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/75 mb-1.5">
                        Your Full Name
                      </label>
                      <input
                        id="settings-name"
                        type="text"
                        required
                        value={profileName}
                        onChange={(e) => setProfileName(e.target.value)}
                        className="w-full h-10 rounded-xl border border-brand-beige bg-white px-3.5 text-xs text-brand-charcoal focus:border-brand-brown focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="settings-email" className="block text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/75 mb-1.5">
                        Email Address
                      </label>
                      <input
                        id="settings-email"
                        type="email"
                        required
                        value={profileEmail}
                        onChange={(e) => setProfileEmail(e.target.value)}
                        className="w-full h-10 rounded-xl border border-brand-beige bg-white px-3.5 text-xs text-brand-charcoal focus:border-brand-brown focus:outline-none"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="inline-flex items-center justify-center rounded-xl bg-brand-brown px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-brand-brown/10 transition-all hover:bg-brand-brown/95 active:scale-[0.98]"
                  >
                    Save Profile Changes
                  </button>
                </form>
              </motion.div>
            )}

            {/* Tutor Persona Tab */}
            {activeTab === 'tutor' && (
              <motion.div
                key="tutor-tab"
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.15 }}
                className="rounded-2xl border border-brand-beige bg-white p-6 shadow-sm space-y-6"
              >
                <div className="border-b border-brand-beige/40 pb-3">
                  <h3 className="font-display text-base font-bold text-brand-charcoal flex items-center gap-2">
                    <Sliders className="h-5 w-5 text-brand-brown" />
                    AI Pedagogical Personality
                  </h3>
                  <p className="text-xs text-brand-charcoal/60 mt-0.5">
                    Customize explanation lengths, Socratic weights, and educational strictness.
                  </p>
                </div>
                
                <div className="space-y-5 text-left">
                  <p className="text-xs text-brand-charcoal/75 leading-relaxed">
                    Select a teaching methodology. Pathshala AI will structure chats and quiz feedback according to this paradigm:
                  </p>
                  
                  <div className="grid gap-3.5 sm:grid-cols-3">
                    <button
                      onClick={() => handleTutorStyleChange('socratic')}
                      className={`flex flex-col items-start p-4 rounded-xl border text-left transition-all ${
                        tutorStyle === 'socratic' 
                          ? 'border-brand-brown bg-brand-cream/40 shadow-sm' 
                          : 'border-brand-beige bg-white hover:bg-brand-cream/10'
                      }`}
                    >
                      <span className="text-xs font-bold text-brand-charcoal">Socratic Method</span>
                      <span className="text-[9px] text-brand-charcoal/50 mt-1.5 leading-normal">
                        Refuses direct answers. Asks conceptual guiding questions.
                      </span>
                    </button>

                    <button
                      onClick={() => handleTutorStyleChange('direct')}
                      className={`flex flex-col items-start p-4 rounded-xl border text-left transition-all ${
                        tutorStyle === 'direct' 
                          ? 'border-brand-brown bg-brand-cream/40 shadow-sm' 
                          : 'border-brand-beige bg-white hover:bg-brand-cream/10'
                      }`}
                    >
                      <span className="text-xs font-bold text-brand-charcoal">Structured Direct</span>
                      <span className="text-[9px] text-brand-charcoal/50 mt-1.5 leading-normal">
                        Provides prompt explanations, formulas, and visual bullet charts.
                      </span>
                    </button>

                    <button
                      onClick={() => handleTutorStyleChange('examiner')}
                      className={`flex flex-col items-start p-4 rounded-xl border text-left transition-all ${
                        tutorStyle === 'examiner' 
                          ? 'border-brand-brown bg-brand-cream/40 shadow-sm' 
                          : 'border-brand-beige bg-white hover:bg-brand-cream/10'
                      }`}
                    >
                      <span className="text-xs font-bold text-brand-charcoal">Rigorous Examiner</span>
                      <span className="text-[9px] text-brand-charcoal/50 mt-1.5 leading-normal">
                        Heavy focus on assessment, terminology checks, and retrieval test drills.
                      </span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Storage Quota Tab */}
            {activeTab === 'billing' && (
              <motion.div
                key="billing-tab"
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.15 }}
                className="rounded-2xl border border-brand-beige bg-white p-6 shadow-sm space-y-6"
              >
                <div className="border-b border-brand-beige/40 pb-3">
                  <h3 className="font-display text-base font-bold text-brand-charcoal flex items-center gap-2">
                    <Database className="h-5 w-5 text-brand-brown" />
                    SaaS Quota Inventory
                  </h3>
                  <p className="text-xs text-brand-charcoal/60 mt-0.5">
                    Monitor sandboxed document vector sizing limits and local study resources.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-brand-charcoal/70">Vector DB Space Used</span>
                    <span className="font-bold text-brand-charcoal">{dbSpace} MB / 50.00 MB</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-brand-cream border border-brand-beige overflow-hidden">
                    <div 
                      className="h-full bg-brand-brown transition-all duration-500"
                      style={{ width: `${(parseFloat(dbSpace) / 50) * 100}%` }}
                    ></div>
                  </div>

                  {parseFloat(dbSpace) > 0 && (
                    <div className="flex justify-end pt-2">
                      <button
                        onClick={handlePurgeCache}
                        disabled={isPurging}
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 px-3.5 py-2 text-xs font-semibold text-red-700 shadow-sm transition-all active:scale-[0.98] disabled:opacity-50"
                      >
                        {isPurging ? (
                          <>
                            <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                            Purging Cache...
                          </>
                        ) : (
                          <>
                            <Database className="h-3.5 w-3.5" />
                            Purge Sandboxed Cache
                          </>
                        )}
                      </button>
                    </div>
                  )}
                  
                  <div className="rounded-xl bg-brand-cream/40 border border-brand-beige/50 p-4 mt-6">
                    <h4 className="text-xs font-bold text-brand-charcoal mb-1 flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-brand-brown" />
                      Free Study Workspace
                    </h4>
                    <p className="text-[10px] text-brand-charcoal/65 leading-relaxed">
                      You are utilizing a free sandboxed node. You get full access to Socratic Chat and Quiz Generations with up to 50MB of parsed files. Enjoy learning!
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Security & API Tab */}
            {activeTab === 'security' && (
              <motion.div
                key="security-tab"
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.15 }}
                className="rounded-2xl border border-brand-beige bg-white p-6 shadow-sm space-y-6"
              >
                <div className="border-b border-brand-beige/40 pb-3">
                  <h3 className="font-display text-base font-bold text-brand-charcoal flex items-center gap-2">
                    <Shield className="h-5 w-5 text-brand-brown" />
                    Security & Developer API Keys
                  </h3>
                  <p className="text-xs text-brand-charcoal/60 mt-0.5">
                    Generate personal keys to hook your Socratic tutor memory to external apps.
                  </p>
                </div>
                
                <div className="space-y-5">
                  <p className="text-xs text-brand-charcoal/75 leading-relaxed">
                    Need Socratic integration inside Notion or Obsidian? Generate an API secret key to sync your vector memory nodes.
                  </p>

                  <div className="space-y-3">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/75">
                      Secret Developer API Key
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          id="api-key-input"
                          type="text"
                          readOnly
                          value={apiKey || '••••••••••••••••••••••••••••••••'}
                          placeholder="Click Generate to create a key..."
                          className="w-full h-10 rounded-xl border border-brand-beige bg-brand-cream/35 pl-3.5 pr-16 text-xs text-brand-charcoal font-mono tracking-wider focus:outline-none"
                        />
                        {apiKey && (
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText(apiKey);
                              triggerToast("API Key copied to clipboard!");
                            }}
                            className="absolute right-2 top-1.5 px-2.5 py-1 rounded-lg bg-brand-brown/10 hover:bg-brand-brown/20 text-brand-brown text-[10px] font-bold transition-all"
                          >
                            Copy
                          </button>
                        )}
                      </div>
                      <button
                        onClick={handleGenerateApiKey}
                        disabled={generatingKey}
                        className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-brand-brown px-4 text-xs font-semibold text-white shadow-sm hover:bg-brand-brown/95 active:scale-95 disabled:opacity-50 shrink-0"
                      >
                        {generatingKey ? (
                          <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <>
                            <Key className="h-3.5 w-3.5" />
                            Generate Key
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
