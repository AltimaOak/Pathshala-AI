import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Send, 
  Mic, 
  Paperclip, 
  Sparkles, 
  GraduationCap, 
  FileText,
  User,
  Volume2,
  Menu,
  X
} from 'lucide-react';
import { EmptyState } from '../components';

export default function Chat() {
  const [messages, setMessages] = useState([]); // STRICTLY empty to start - no fake chats
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Auto-scroll messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Initialize SpeechRecognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputValue(transcript);
        }
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const streamRef = useRef(null);
  const animationFrameRef = useRef(null);
  const visualizerBarsRef = useRef([]);

  // Web Audio Analyzer for Voice Volume visualization
  useEffect(() => {
    if (isRecording) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          streamRef.current = stream;
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          const audioContext = new AudioContext();
          audioContextRef.current = audioContext;

          const source = audioContext.createMediaStreamSource(stream);
          const analyser = audioContext.createAnalyser();
          analyser.fftSize = 32;
          analyserRef.current = analyser;

          source.connect(analyser);

          const bufferLength = analyser.frequencyBinCount;
          const dataArray = new Uint8Array(bufferLength);
          dataArrayRef.current = dataArray;

          const updateVolume = () => {
            if (!analyserRef.current) return;
            analyserRef.current.getByteFrequencyData(dataArray);
            
            // Map frequencies to scaleY values on the bar references
            if (visualizerBarsRef.current) {
              for (let i = 0; i < 8; i++) {
                const barElement = visualizerBarsRef.current[i];
                if (barElement) {
                  // Retrieve frequency data and compute a nice scaling factor
                  const val = dataArray[i] || 0;
                  const scale = Math.max(0.15, (val / 255) * 2.8);
                  barElement.style.transform = `scaleY(${scale})`;
                }
              }
            }
            animationFrameRef.current = requestAnimationFrame(updateVolume);
          };

          updateVolume();
        })
        .catch(err => {
          console.warn("Speech API microphone fallback active:", err);
          
          // Simulated voice visualizer loop if mediaDevices access is pending or disabled
          let phase = 0;
          const updateSimulated = () => {
            phase += 0.15;
            if (visualizerBarsRef.current) {
              for (let i = 0; i < 8; i++) {
                const barElement = visualizerBarsRef.current[i];
                if (barElement) {
                  const val = Math.abs(Math.sin(phase + i * 0.5)) * 2.0 + 0.15;
                  barElement.style.transform = `scaleY(${val})`;
                }
              }
            }
            animationFrameRef.current = requestAnimationFrame(updateSimulated);
          };
          updateSimulated();
        });
    } else {
      // Clean up Web Audio resources
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
      // Reset visualizer bars
      if (visualizerBarsRef.current) {
        visualizerBarsRef.current.forEach(barElement => {
          if (barElement) {
            barElement.style.transform = 'scaleY(0.15)';
          }
        });
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isRecording]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: inputValue.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Dynamic simulated tutor response based on active tutorStyle setting
    setTimeout(() => {
      setIsTyping(false);
      const activeStyle = localStorage.getItem('tutorStyle') || 'socratic';
      
      let responseText = '';
      if (activeStyle === 'socratic') {
        responseText = `That is a great question! Let us break down "${userMessage.text}" step-by-step. What is the first thing that comes to your mind when you think about this?`;
      } else if (activeStyle === 'direct') {
        responseText = `Here is a clear, structured summary regarding "${userMessage.text}":\n\n• Core Concept: Explains the fundamental idea clearly.\n• Key Info: Structured logically for instant learning.\n• Actionable Practice: Try using this in a real example.`;
      } else {
        responseText = `[Practice Exam Mode]\nHow would you define "${userMessage.text}"? Try to explain it in your own words, and I will check your answer!`;
      }

      const aiResponse = {
        id: Date.now() + 1,
        sender: 'ai',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 2000);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
  };

  const handleVoiceInput = () => {
    if (!recognitionRef.current) {
      // Speech recognition fallback simulation if browser doesn't support Web Speech API
      setIsRecording(!isRecording);
      if (!isRecording) {
        setTimeout(() => {
          setInputValue("Can you explain active recall in detail?");
          setIsRecording(false);
        }, 2500);
      }
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  return (
    <div className="flex h-[calc(100vh-8.5rem)] gap-6 overflow-hidden relative">
      
      {/* Mobile Drawer Overlay Backdrop */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden fixed inset-0 z-45 bg-[#0F0E0D]/30 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Mobile Left Chat Sidebar Drawer */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isSidebarOpen ? 0 : "-100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="md:hidden fixed inset-y-0 left-0 z-50 w-64 flex flex-col bg-white p-4 border-r border-brand-beige shadow-2xl h-full"
      >
        <div className="flex items-center justify-between pb-3 border-b border-brand-beige/50 mb-4">
          <h3 className="font-display text-xs font-bold uppercase tracking-wider text-brand-charcoal/70">
            Sessions History
          </h3>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-1 rounded-lg hover:bg-brand-cream/65 transition-colors cursor-pointer"
          >
            <X className="h-4 w-4 text-brand-charcoal/70" />
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center">
          {messages.length === 0 ? (
            <div className="text-center p-3 select-none">
              <MessageSquare className="h-8 w-8 text-brand-brown/30 mx-auto mb-2" />
              <p className="text-xs font-semibold text-brand-charcoal/65">
                No active conversations
              </p>
              <p className="text-[10px] text-brand-charcoal/45 mt-1 leading-normal">
                Your study dialog history starts fresh here.
              </p>
            </div>
          ) : (
            <div className="w-full space-y-1 overflow-y-auto max-h-[400px] text-left">
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-brand-cream border border-brand-beige text-xs text-brand-charcoal font-semibold"
              >
                <MessageSquare className="h-3.5 w-3.5 text-brand-brown" />
                <span className="truncate max-w-[120px]">{messages[0].text}</span>
              </button>
            </div>
          )}
        </div>
      </motion.div>

      {/* Desktop Left Chat Sidebar: History Panel */}
      <motion.div
        initial={false}
        animate={{
          width: isSidebarOpen ? 256 : 0,
          opacity: isSidebarOpen ? 1 : 0,
          marginRight: isSidebarOpen ? 24 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="hidden md:flex flex-col shrink-0 rounded-2xl border border-brand-beige bg-white p-4 shadow-sm overflow-hidden"
      >
        <div className="flex items-center justify-between pb-3 border-b border-brand-beige/50 mb-4 whitespace-nowrap">
          <h3 className="font-display text-xs font-bold uppercase tracking-wider text-brand-charcoal/70">
            Sessions History
          </h3>
          <button 
            onClick={() => setMessages([])} 
            className="text-[10px] font-semibold text-brand-brown hover:underline"
          >
            Clear All
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center">
          {messages.length === 0 ? (
            <div className="text-center p-3 select-none whitespace-normal">
              <MessageSquare className="h-8 w-8 text-brand-brown/30 mx-auto mb-2" />
              <p className="text-xs font-semibold text-brand-charcoal/65">
                No active conversations
              </p>
              <p className="text-[10px] text-brand-charcoal/45 mt-1 leading-normal">
                Your study dialog history starts fresh here.
              </p>
            </div>
          ) : (
            <div className="w-full space-y-1 overflow-y-auto max-h-[400px] text-left">
              <button className="w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-brand-cream border border-brand-beige text-xs text-brand-charcoal font-semibold">
                <MessageSquare className="h-3.5 w-3.5 text-brand-brown" />
                <span className="truncate max-w-[120px]">{messages[0].text}</span>
              </button>
            </div>
          )}
        </div>
      </motion.div>

      {/* Main Chat Frame */}
      <div className="flex flex-1 flex-col rounded-2xl border border-brand-beige bg-white shadow-sm overflow-hidden relative">
        
        {/* Main Chat Frame Header */}
        <div className="flex items-center justify-between border-b border-brand-beige bg-white/70 backdrop-blur-md px-6 py-3.5 select-none relative z-40">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1.5 rounded-lg border border-brand-beige hover:border-brand-brown/40 hover:bg-brand-cream/35 text-brand-charcoal/65 hover:text-brand-brown transition-all cursor-pointer"
              title={isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
            >
              <Menu className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-1.5">
              <GraduationCap className="h-4.5 w-4.5 text-brand-brown" />
              <span className="font-display text-xs font-extrabold uppercase tracking-widest text-brand-charcoal">
                Socratic Study Buddy
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold bg-brand-brown/15 text-brand-brown px-2.5 py-1 rounded-full uppercase tracking-wider">
              Active Session
            </span>
          </div>
        </div>
        
        {/* Floating Real-Time Voice Waveform Assistant Card */}
        <AnimatePresence>
          {isRecording && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="absolute inset-x-6 bottom-20 z-50 flex items-center justify-center pointer-events-none"
            >
              <div className="w-full max-w-sm rounded-2xl border border-brand-brown/25 bg-white/95 p-5 shadow-xl shadow-brand-brown/5 backdrop-blur-md pointer-events-auto text-center flex flex-col items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-brown/40 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-brown"></span>
                  </span>
                  <span className="font-display text-xs font-bold uppercase tracking-wider text-brand-brown">
                    Voice Study Assistant Active
                  </span>
                </div>

                <p className="text-xs font-semibold text-brand-charcoal/80 leading-normal max-w-xs">
                  Speak now! Bouncing in response to your real voice:
                </p>

                {/* Real-time Voice Waveform Visualizer */}
                <div className="flex items-end justify-center gap-1.5 h-16 w-full py-2">
                  {[...Array(8)].map((_, idx) => (
                    <span
                      key={idx}
                      ref={el => {
                        if (visualizerBarsRef.current) {
                          visualizerBarsRef.current[idx] = el;
                        }
                      }}
                      style={{ transform: 'scaleY(0.15)', transition: 'transform 0.05s ease-out' }}
                      className="w-2 bg-brand-brown rounded-full origin-bottom h-full"
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleVoiceInput}
                  className="flex items-center gap-2 rounded-xl bg-brand-brown hover:bg-brand-brown/95 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-brand-brown/20 transition-all active:scale-95 cursor-pointer"
                >
                  <Mic className="h-4 w-4 animate-pulse" />
                  Stop Listening
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Chat Playground Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <AnimatePresence mode="wait">
            {messages.length === 0 ? (
              <motion.div 
                key="welcome"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center text-center h-full max-w-lg mx-auto py-12"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-brown shadow-md shadow-brand-brown/15 mb-4 animate-float">
                  <GraduationCap className="h-8 w-8 text-brand-cream" />
                </div>
                <h3 className="font-display text-xl font-bold text-brand-charcoal">
                  Pathshala AI Study Buddy
                </h3>
                <p className="text-xs text-brand-charcoal/65 mt-2 leading-relaxed max-w-sm">
                  Start learning step-by-step. Ask any question, or upload a textbook PDF in the Study Materials page to ask questions about your files.
                </p>

                {/* Conceptual Socratic suggestions */}
                <div className="grid grid-cols-2 gap-3.5 mt-8 w-full">
                  <button 
                    onClick={() => handleSuggestionClick("How does Pathshala AI help me study?")}
                    className="flex flex-col items-start rounded-xl border border-brand-beige hover:border-brand-brown bg-brand-cream/25 hover:bg-brand-cream/65 p-3.5 text-left transition-all hover:scale-[1.01]"
                  >
                    <Sparkles className="h-4 w-4 text-brand-brown mb-1.5" />
                    <span className="text-[11px] font-bold text-brand-charcoal">Learn & Remember</span>
                    <span className="text-[9px] text-brand-charcoal/50 mt-0.5 leading-normal">Explain how to study and remember concepts easily.</span>
                  </button>
                  <button 
                    onClick={() => handleSuggestionClick("How to think step-by-step?")}
                    className="flex flex-col items-start rounded-xl border border-brand-beige hover:border-brand-brown bg-brand-cream/25 hover:bg-brand-cream/65 p-3.5 text-left transition-all hover:scale-[1.01]"
                  >
                    <Volume2 className="h-4 w-4 text-brand-brown mb-1.5" />
                    <span className="text-[11px] font-bold text-brand-charcoal">Step-by-Step Guide</span>
                    <span className="text-[9px] text-brand-charcoal/50 mt-0.5 leading-normal">Explain how to solve tough problems.</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div key="messages-log" className="space-y-4 text-left">
                {messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`flex items-start gap-3 max-w-2xl ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
                  >
                    {/* Avatar Indicator */}
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${
                      msg.sender === 'user' 
                        ? 'bg-brand-cream border-brand-beige text-brand-charcoal' 
                        : 'bg-brand-brown border-brand-brown/20 text-white'
                    }`}>
                      {msg.sender === 'user' ? <User className="h-4 w-4" /> : <GraduationCap className="h-4.5 w-4.5" />}
                    </div>

                    {/* Chat Bubble content */}
                    <div className={`rounded-2xl px-4 py-3 text-xs shadow-sm border ${
                      msg.sender === 'user' 
                        ? 'bg-brand-cream/60 border-brand-beige text-brand-charcoal rounded-tr-none' 
                        : 'bg-white border-brand-beige text-brand-charcoal rounded-tl-none leading-relaxed'
                    }`}>
                      <p className="font-medium whitespace-pre-wrap">{msg.text}</p>
                      <span className="block text-[8px] text-brand-charcoal/45 mt-1.5 text-right font-semibold">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* AI Typing Loader Component */}
          {isTyping && (
            <div className="flex items-start gap-3 max-w-md text-left">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border bg-brand-brown border-brand-brown/20 text-white">
                <GraduationCap className="h-4.5 w-4.5" />
              </div>
              <div className="rounded-2xl rounded-tl-none border border-brand-beige bg-white px-4 py-3.5 shadow-sm">
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

        {/* Input Bar Section */}
        <div className="border-t border-brand-beige bg-brand-cream/35 px-4 py-4">
          <form onSubmit={handleSend} className="relative flex items-center">
            {/* Attachment Button */}
            <button
              type="button"
              onClick={() => alert("To attach a PDF study material, please navigate to the 'Study Materials' upload dashboard to parse your file.")}
              className="absolute left-3.5 p-1.5 rounded-lg text-brand-charcoal/50 hover:text-brand-brown hover:bg-brand-beige/40 transition-colors"
            >
              <Paperclip className="h-4 w-4" />
            </button>

            {/* Input area */}
            <input
              id="chat-query-input"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={isRecording ? "Listening... Speak clearly into your mic" : "Ask Pathshala AI anything..."}
              className={`w-full h-11 rounded-xl border bg-white pl-11 pr-24 text-xs text-brand-charcoal placeholder-brand-charcoal/35 transition-all focus:outline-none ${
                isRecording 
                  ? 'border-brand-brown ring-2 ring-brand-brown/20 placeholder-brand-brown/60 font-semibold' 
                  : 'border-brand-beige focus:border-brand-brown'
              }`}
            />

            {/* Controls panel: Voice Input + Send buttons */}
            <div className="absolute right-2 flex items-center gap-2">
              {isRecording && (
                <div className="flex items-end gap-[2px] h-3.5 px-1 select-none pointer-events-none">
                  {[0.5, 0.9, 0.6, 0.4].map((speed, idx) => (
                    <motion.span
                      key={idx}
                      animate={{
                        height: ["4px", "14px", "4px"]
                      }}
                      transition={{
                        duration: speed,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="w-[2px] bg-brand-brown rounded-full origin-bottom"
                    />
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={handleVoiceInput}
                className={`p-1.5 rounded-lg transition-all relative ${
                  isRecording 
                    ? 'bg-brand-brown text-white shadow-md shadow-brand-brown/20' 
                    : 'text-brand-charcoal/50 hover:text-brand-brown hover:bg-brand-beige/40'
                }`}
                title={isRecording ? "Listening..." : "Voice Input"}
              >
                {isRecording && (
                  <span className="absolute inset-0 rounded-lg bg-brand-brown animate-ping opacity-75 pointer-events-none" />
                )}
                <Mic className="h-4 w-4 relative z-10" />
              </button>
              
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="flex h-7.5 w-7.5 items-center justify-center rounded-lg bg-brand-brown text-white transition-all hover:bg-brand-brown/95 active:scale-95 disabled:opacity-35 disabled:pointer-events-none"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
