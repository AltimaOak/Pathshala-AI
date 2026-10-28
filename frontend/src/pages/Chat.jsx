import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  MessageSquare, 
  ArrowUp, 
  Mic, 
  Paperclip, 
  Sparkles, 
  GraduationCap, 
  FileText,
  User,
  Volume2,
  Copy,
  Check,
  RotateCcw,
  Plus,
  Trash2,
  PanelLeftClose,
  PanelLeft,
  ChevronDown,
  BookOpen,
  HelpCircle,
  Lightbulb,
  Zap,
  StopCircle
} from 'lucide-react';

// Code Block with Language Badge & Copy Button (ChatGPT Style)
function CodeBlock({ language, value }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-3 overflow-hidden rounded-xl border border-zinc-800 bg-[#1e1e24] text-zinc-100 shadow-md">
      <div className="flex items-center justify-between border-b border-zinc-800/80 bg-[#18181b] px-4 py-1.5 text-xs text-zinc-400 font-mono">
        <span className="font-semibold uppercase tracking-wider">{language || 'code'}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded px-2 py-0.5 text-xs text-zinc-300 hover:bg-zinc-700/60 hover:text-white transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy code</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-xs font-mono leading-relaxed selection:bg-brand-brown/40">
        <code>{value}</code>
      </pre>
    </div>
  );
}

// Markdown Formatter Component
function FormattedMessage({ content }) {
  return (
    <div className="prose prose-sm max-w-none text-brand-charcoal leading-relaxed space-y-2">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-lg md:text-xl font-bold tracking-tight text-brand-charcoal mt-4 mb-2 pb-1 border-b border-brand-beige/60">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-base md:text-lg font-bold text-brand-charcoal mt-3.5 mb-1.5">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-sm md:text-base font-bold text-brand-charcoal mt-3 mb-1">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-xs md:text-sm text-brand-charcoal/90 leading-relaxed mb-2.5 last:mb-0">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-5 my-2 space-y-1 text-xs md:text-sm text-brand-charcoal/90">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-5 my-2 space-y-1 text-xs md:text-sm text-brand-charcoal/90">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed pl-0.5">
              {children}
            </li>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-brand-charcoal">
              {children}
            </strong>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-brand-brown/70 bg-brand-brown/5 pl-3.5 py-1.5 my-2.5 rounded-r-lg italic text-brand-charcoal/80 text-xs md:text-sm">
              {children}
            </blockquote>
          ),
          hr: () => (
            <hr className="my-4 border-t border-brand-beige" />
          ),
          table: ({ children }) => (
            <div className="my-3 overflow-x-auto rounded-lg border border-brand-beige/80">
              <table className="min-w-full divide-y divide-brand-beige text-xs text-left">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="bg-brand-cream/80 px-3.5 py-2 font-bold text-brand-charcoal">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-3.5 py-2 text-brand-charcoal/85 border-t border-brand-beige/40">
              {children}
            </td>
          ),
          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            const codeString = String(children).replace(/\n$/, '');
            if (!inline && match) {
              return <CodeBlock language={match[1]} value={codeString} />;
            } else if (!inline && codeString.includes('\n')) {
              return <CodeBlock language="text" value={codeString} />;
            }
            return (
              <code className="rounded bg-brand-cream border border-brand-beige px-1.5 py-0.5 font-mono text-[11px] font-semibold text-brand-brown">
                {children}
              </code>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);
  const [tutorStyle, setTutorStyle] = useState(localStorage.getItem('tutorStyle') || 'balanced');
  const [isStyleDropdownOpen, setIsStyleDropdownOpen] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState(null);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const recognitionRef = useRef(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

  // Auto-scroll
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Auto-resize input textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }
  }, [inputValue]);

  // Speech Recognition setup
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsRecording(true);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputValue(prev => prev ? `${prev} ${transcript}` : transcript);
        }
      };
      recognition.onerror = () => setIsRecording(false);
      recognition.onend = () => setIsRecording(false);
      recognitionRef.current = recognition;
    }
  }, []);

  const handleVoiceToggle = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser. Please use Chrome or Edge.");
      return;
    }
    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  // Text-To-Speech Reader
  const handleSpeak = (messageId, text) => {
    if (!('speechSynthesis' in window)) return;

    if (speakingMessageId === messageId) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
      return;
    }

    window.speechSynthesis.cancel();
    // Clean markdown symbols for cleaner speech
    const cleanText = text.replace(/[*#`_~\[\]]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.onend = () => setSpeakingMessageId(null);
    utterance.onerror = () => setSpeakingMessageId(null);
    setSpeakingMessageId(messageId);
    window.speechSynthesis.speak(utterance);
  };

  // Submit message
  const handleSend = async (textOverride) => {
    const textToSend = (typeof textOverride === 'string' ? textOverride : inputValue).trim();
    if (!textToSend || isTyping) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    setIsTyping(true);

    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          tutor_style: tutorStyle,
          session_id: 'default'
        })
      });

      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }

      const data = await res.json();
      const aiResponse = {
        id: Date.now() + 1,
        sender: 'ai',
        text: data.response || "No response received.",
        sources: data.sources || [],
        suggested_questions: data.suggested_questions || [],
        model: data.model || 'gemini',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiResponse]);
    } catch (err) {
      console.warn("Backend chat request failed:", err);
      const fallbackResponse = {
        id: Date.now() + 1,
        sender: 'ai',
        text: `Unable to connect to Pathshala AI backend (${API_URL}). Please verify that your backend server is running on port 8000.`,
        sources: [],
        suggested_questions: ["Retry question", "Check backend status"],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Clear chat
  const handleClearChat = async () => {
    setMessages([]);
    window.speechSynthesis?.cancel();
    setSpeakingMessageId(null);
    try {
      await fetch(`${API_URL}/chat/clear`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: 'default' })
      });
    } catch (err) {
      console.warn("Failed to clear backend memory:", err);
    }
  };

  const handleStyleChange = (style) => {
    setTutorStyle(style);
    localStorage.setItem('tutorStyle', style);
    setIsStyleDropdownOpen(false);
  };

  const tutorStyles = [
    { id: 'balanced', label: 'Balanced Tutor', desc: 'Clear, encouraging, structured walkthroughs' },
    { id: 'socratic', label: 'Socratic Coach', desc: 'Asks guiding hints & interactive questions' },
    { id: 'simple', label: 'Concept & Analogy', desc: 'Simple explanations using vivid analogies' },
    { id: 'exam', label: 'Exam & Prep Mode', desc: 'Formulas, definitions, and high-yield revision' }
  ];

  const quickPrompts = [
    { title: "Explain a core concept", desc: "How does photosynthesis convert light into glucose?", icon: Lightbulb },
    { title: "Step-by-step problem", desc: "Walk me through calculating kinetic energy with an example", icon: Zap },
    { title: "Practice quiz question", desc: "Quiz me on cell structure and organelles with 3 MCQs", icon: HelpCircle },
    { title: "Summarize study guide", desc: "Summarize the key takeaways from Chapter 1", icon: BookOpen }
  ];

  return (
    <div className="flex h-[calc(100vh-5rem)] md:h-[calc(100vh-4.5rem)] w-full overflow-hidden rounded-2xl border border-brand-beige/80 bg-white shadow-sm relative">
      
      {/* ========================================================
          LEFT SIDEBAR: CHATGPT STYLE HISTORY & NEW CHAT
          ======================================================== */}
      <AnimatePresence initial={false}>
        {isSidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 260, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="hidden md:flex flex-col border-r border-brand-beige/80 bg-[#faf8f5] overflow-hidden shrink-0 select-none"
          >
            {/* New Chat Button */}
            <div className="p-3">
              <button
                onClick={handleClearChat}
                className="w-full flex items-center justify-between rounded-xl border border-brand-beige bg-white px-3.5 py-2.5 text-xs font-semibold text-brand-charcoal shadow-2xs hover:bg-brand-cream/60 hover:border-brand-brown/40 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <Plus className="h-4 w-4 text-brand-brown transition-transform group-hover:rotate-90" />
                  <span>New Chat</span>
                </div>
                <span className="text-[10px] text-brand-charcoal/40 font-mono">Ctrl+K</span>
              </button>
            </div>

            {/* Conversation History List */}
            <div className="flex-1 overflow-y-auto px-3 space-y-1">
              <div className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/50">
                Recent Conversations
              </div>

              {messages.length === 0 ? (
                <div className="p-4 text-center text-xs text-brand-charcoal/50">
                  <p>No chat history yet.</p>
                  <p className="text-[11px] mt-1 text-brand-charcoal/40">Ask a question to start!</p>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="flex items-center justify-between rounded-lg bg-brand-brown/10 border border-brand-brown/20 px-3 py-2 text-xs font-medium text-brand-charcoal group">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <MessageSquare className="h-3.5 w-3.5 text-brand-brown shrink-0" />
                      <span className="truncate max-w-[140px] text-xs">
                        {messages[0]?.text || "Current Session"}
                      </span>
                    </div>
                    <button
                      onClick={handleClearChat}
                      className="opacity-0 group-hover:opacity-100 p-1 text-brand-charcoal/40 hover:text-red-600 transition-all cursor-pointer"
                      title="Clear chat"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Footer: Mode info */}
            <div className="border-t border-brand-beige/80 p-3 bg-white/60">
              <div className="flex items-center gap-2 px-2 py-1.5 text-xs text-brand-charcoal/70">
                <Sparkles className="h-4 w-4 text-brand-brown" />
                <span className="font-semibold text-brand-charcoal">Gemini 3.1 Flash-Lite</span>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ========================================================
          MAIN CHAT CANVAS (CHATGPT FULL LAYOUT)
          ======================================================== */}
      <div className="flex flex-1 flex-col h-full bg-white relative overflow-hidden">
        
        {/* Top Floating Header */}
        <header className="flex h-13 items-center justify-between border-b border-brand-beige/60 px-4 select-none shrink-0 bg-white/80 backdrop-blur-md z-30">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1.5 rounded-lg border border-brand-beige/70 text-brand-charcoal/65 hover:text-brand-brown hover:bg-brand-cream/50 transition-colors cursor-pointer"
              title={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              {isSidebarOpen ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeft className="h-4 w-4" />}
            </button>

            {/* Tutor Style Selector Pill */}
            <div className="relative">
              <button
                onClick={() => setIsStyleDropdownOpen(!isStyleDropdownOpen)}
                className="flex items-center gap-1.5 rounded-xl border border-brand-beige bg-brand-cream/40 px-3 py-1.5 text-xs font-semibold text-brand-charcoal hover:bg-brand-cream transition-colors cursor-pointer"
              >
                <GraduationCap className="h-3.5 w-3.5 text-brand-brown" />
                <span>{tutorStyles.find(s => s.id === tutorStyle)?.label}</span>
                <ChevronDown className="h-3 w-3 text-brand-charcoal/50" />
              </button>

              {isStyleDropdownOpen && (
                <div className="absolute left-0 top-full mt-1.5 w-60 rounded-xl border border-brand-beige bg-white p-1.5 shadow-lg z-50">
                  {tutorStyles.map(st => (
                    <button
                      key={st.id}
                      onClick={() => handleStyleChange(st.id)}
                      className={`w-full text-left rounded-lg px-3 py-2 text-xs transition-colors cursor-pointer ${
                        tutorStyle === st.id ? 'bg-brand-brown/10 text-brand-brown font-bold' : 'hover:bg-brand-cream/60 text-brand-charcoal'
                      }`}
                    >
                      <div className="font-semibold">{st.label}</div>
                      <div className="text-[10px] text-brand-charcoal/60 mt-0.5">{st.desc}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 text-[11px] font-medium text-emerald-800">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Ready</span>
            </span>

            {messages.length > 0 && (
              <button
                onClick={handleClearChat}
                className="flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs text-brand-charcoal/60 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            )}
          </div>
        </header>

        {/* Message Feed Area */}
        <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8 space-y-6">
          {messages.length === 0 ? (
            /* ========================================================
               CHATGPT WELCOME / EMPTY STATE
               ======================================================== */
            <div className="max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[75%] text-center px-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-brown/10 border border-brand-brown/20 text-brand-brown mb-5 shadow-xs">
                <GraduationCap className="h-8 w-8" />
              </div>
              
              <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-brand-charcoal">
                What can I help you learn today?
              </h2>
              <p className="text-xs md:text-sm text-brand-charcoal/65 mt-2 max-w-md leading-relaxed">
                Ask any question, explore uploaded study materials, or practice step-by-step problem solving.
              </p>

              {/* 4 Quick Suggestion Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mt-8 text-left">
                {quickPrompts.map((p, idx) => {
                  const Icon = p.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSend(p.desc)}
                      className="group flex flex-col justify-between p-4 rounded-xl border border-brand-beige/80 bg-white hover:border-brand-brown/40 hover:bg-brand-cream/30 hover:shadow-xs transition-all cursor-pointer text-left"
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <Icon className="h-4 w-4 text-brand-brown group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-bold text-brand-charcoal">{p.title}</span>
                      </div>
                      <p className="text-[11px] text-brand-charcoal/60 leading-normal line-clamp-2">
                        {p.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* ========================================================
               ACTIVE CONVERSATION FEED
               ======================================================== */
            <div className="max-w-3xl mx-auto space-y-7">
              {messages.map((msg) => (
                <div key={msg.id} className="space-y-3">
                  {msg.sender === 'user' ? (
                    /* User Message (Right Aligned Bubble) */
                    <div className="flex justify-end">
                      <div className="max-w-xl rounded-2xl rounded-tr-xs bg-brand-brown text-white px-4.5 py-3 text-xs md:text-sm leading-relaxed shadow-sm">
                        <p className="whitespace-pre-wrap">{msg.text}</p>
                      </div>
                    </div>
                  ) : (
                    /* Assistant Message (ChatGPT Full-Width Style) */
                    <div className="flex items-start gap-3.5 group">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-brown text-white shadow-2xs mt-1">
                        <GraduationCap className="h-4 w-4" />
                      </div>

                      <div className="flex-1 space-y-2 overflow-hidden">
                        {/* Formatted Markdown Content */}
                        <div className="rounded-2xl border border-brand-beige/60 bg-[#faf8f5]/60 p-4.5 shadow-2xs">
                          <FormattedMessage content={msg.text} />

                          {/* Grounded Study Citations */}
                          {msg.sources && msg.sources.length > 0 && (
                            <div className="mt-4 pt-3 border-t border-brand-beige/60 flex flex-wrap gap-1.5 items-center">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/50 mr-1">
                                Sources:
                              </span>
                              {msg.sources.map((src, sIdx) => (
                                <span
                                  key={sIdx}
                                  className="inline-flex items-center gap-1 rounded-md bg-white border border-brand-beige px-2 py-0.5 text-[10px] font-medium text-brand-brown shadow-2xs"
                                >
                                  <FileText className="h-3 w-3" />
                                  <span>{src.source} (p. {src.page})</span>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Action Toolbar below AI answer */}
                        <div className="flex items-center gap-1 pt-1 text-brand-charcoal/45">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(msg.text);
                            }}
                            className="p-1.5 rounded-lg hover:text-brand-charcoal hover:bg-brand-cream transition-colors cursor-pointer"
                            title="Copy response"
                          >
                            <Copy className="h-3.5 w-3.5" />
                          </button>

                          <button
                            onClick={() => handleSpeak(msg.id, msg.text)}
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                              speakingMessageId === msg.id 
                                ? 'text-brand-brown bg-brand-brown/10' 
                                : 'hover:text-brand-charcoal hover:bg-brand-cream'
                            }`}
                            title={speakingMessageId === msg.id ? "Stop speaking" : "Read aloud"}
                          >
                            {speakingMessageId === msg.id ? (
                              <StopCircle className="h-3.5 w-3.5 text-brand-brown animate-pulse" />
                            ) : (
                              <Volume2 className="h-3.5 w-3.5" />
                            )}
                          </button>

                          <span className="text-[10px] text-brand-charcoal/40 ml-2">
                            {msg.timestamp}
                          </span>
                        </div>

                        {/* Follow-up Suggestion Chips */}
                        {msg.suggested_questions && msg.suggested_questions.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {msg.suggested_questions.map((q, qIdx) => (
                              <button
                                key={qIdx}
                                onClick={() => handleSend(q)}
                                className="inline-flex items-center gap-1 text-[11px] bg-white hover:bg-brand-cream text-brand-charcoal/85 border border-brand-beige hover:border-brand-brown/40 rounded-full px-3 py-1 font-medium transition-all hover:scale-[1.01] active:scale-95 text-left cursor-pointer shadow-2xs"
                              >
                                <span>💡</span>
                                <span>{q}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Animation */}
              {isTyping && (
                <div className="flex items-start gap-3.5 max-w-3xl mx-auto">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-brown text-white shadow-2xs mt-1">
                    <GraduationCap className="h-4 w-4" />
                  </div>
                  <div className="rounded-2xl border border-brand-beige/80 bg-[#faf8f5] px-4 py-3 shadow-2xs">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-brand-brown/40"></span>
                      <span className="h-2 w-2 animate-bounce rounded-full bg-brand-brown/70 [animation-delay:0.2s]"></span>
                      <span className="h-2 w-2 animate-bounce rounded-full bg-brand-brown [animation-delay:0.4s]"></span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* ========================================================
            BOTTOM FLOATING INPUT BAR (SIGNATURE CHATGPT DESIGN)
            ======================================================== */}
        <div className="border-t border-brand-beige/60 bg-white/80 backdrop-blur-md px-4 pt-3 pb-4">
          <div className="max-w-3xl mx-auto w-full">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="relative flex flex-col rounded-3xl border border-brand-beige/90 bg-white shadow-md shadow-black/5 focus-within:border-brand-brown focus-within:ring-2 focus-within:ring-brand-brown/10 transition-all p-2"
            >
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isRecording ? "Listening to your voice..." : "Ask Pathshala AI anything (Shift + Enter for new line)..."}
                rows={1}
                className="w-full resize-none border-0 bg-transparent px-3 pt-1.5 pb-2 text-xs md:text-sm text-brand-charcoal placeholder-brand-charcoal/40 focus:outline-none max-h-44 leading-relaxed"
              />

              <div className="flex items-center justify-between pt-1 px-1">
                {/* Left icons: Attachment */}
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      window.location.href = '/upload';
                    }}
                    className="p-1.5 rounded-full text-brand-charcoal/50 hover:text-brand-brown hover:bg-brand-cream/70 transition-colors cursor-pointer"
                    title="Upload study document (PDF)"
                  >
                    <Paperclip className="h-4 w-4" />
                  </button>
                </div>

                {/* Right icons: Mic + Circular Send Button */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handleVoiceToggle}
                    className={`p-1.5 rounded-full transition-all cursor-pointer ${
                      isRecording 
                        ? 'bg-red-500 text-white animate-pulse shadow-sm' 
                        : 'text-brand-charcoal/50 hover:text-brand-brown hover:bg-brand-cream/70'
                    }`}
                    title={isRecording ? "Stop listening" : "Voice dictation"}
                  >
                    <Mic className="h-4 w-4" />
                  </button>

                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isTyping}
                    className={`flex h-8 w-8 items-center justify-center rounded-full transition-all cursor-pointer ${
                      inputValue.trim() && !isTyping
                        ? 'bg-brand-brown text-white shadow-xs hover:scale-105 active:scale-95'
                        : 'bg-brand-cream text-brand-charcoal/30 pointer-events-none'
                    }`}
                    title="Send message"
                  >
                    <ArrowUp className="h-4 w-4 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            </form>

            <p className="text-[10px] text-center text-brand-charcoal/40 mt-2 select-none">
              Pathshala AI may produce mistakes. Verify critical academic definitions with your textbooks.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
