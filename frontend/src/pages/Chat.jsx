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
  Volume2
} from 'lucide-react';
import { EmptyState } from '../components';

export default function Chat() {
  const [messages, setMessages] = useState([]); // STRICTLY empty to start - no fake chats
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

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
        responseText = `To investigate "${userMessage.text}" Socratic-style, let us break this down. What is the core assumption we make here, and how can we evaluate its validity using first principles?`;
      } else if (activeStyle === 'direct') {
        responseText = `Here is a structured explanation for "${userMessage.text}":\n\n• Core Concept: Addressing the conceptual framework directly based on textbook foundations.\n• Key Steps: Breaking down this concept into high-fidelity bullet points for fast comprehension.\n• Summary: Applying standard formulas and direct deductive answers provides the most straightforward review path.`;
      } else {
        responseText = `Rigorous assessment mode active for: "${userMessage.text}". Let's verify your terminology and active recall under exam conditions:\n\n1. Define the exact fundamental mechanics operating here.\n2. State the two primary terminologies or laws you would use to defend this argument in a test environment.`;
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
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Simulate speech-to-text input
      setTimeout(() => {
        setInputValue("Can you explain active recall in detail?");
        setIsRecording(false);
      }, 3000);
    }
  };

  return (
    <div className="flex h-[calc(100vh-8.5rem)] gap-6 overflow-hidden">
      
      {/* Left Chat Sidebar: History Panel - STRICTLY Empty State to start */}
      <div className="hidden w-64 shrink-0 flex-col rounded-2xl border border-brand-beige bg-white p-4 shadow-sm md:flex">
        <div className="flex items-center justify-between pb-3 border-b border-brand-beige/50 mb-4">
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
              <button className="w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-brand-cream border border-brand-beige text-xs text-brand-charcoal font-semibold">
                <MessageSquare className="h-3.5 w-3.5 text-brand-brown" />
                <span className="truncate max-w-[120px]">{messages[0].text}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Chat Frame */}
      <div className="flex flex-1 flex-col rounded-2xl border border-brand-beige bg-white shadow-sm overflow-hidden">
        
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
                  Pathshala AI Tutor
                </h3>
                <p className="text-xs text-brand-charcoal/65 mt-2 leading-relaxed max-w-sm">
                  Start an authentic learning dialog. Ask a conceptual question, or upload a textbook PDF in the Study Materials folder to chat directly from its context.
                </p>

                {/* Conceptual Socratic suggestions */}
                <div className="grid grid-cols-2 gap-3.5 mt-8 w-full">
                  <button 
                    onClick={() => handleSuggestionClick("Explain Socratic active recall method.")}
                    className="flex flex-col items-start rounded-xl border border-brand-beige hover:border-brand-brown bg-brand-cream/25 hover:bg-brand-cream/65 p-3.5 text-left transition-all hover:scale-[1.01]"
                  >
                    <Sparkles className="h-4 w-4 text-brand-brown mb-1.5" />
                    <span className="text-[11px] font-bold text-brand-charcoal">Active Recall</span>
                    <span className="text-[9px] text-brand-charcoal/50 mt-0.5 leading-normal">Explain how testing memory works.</span>
                  </button>
                  <button 
                    onClick={() => handleSuggestionClick("Deconstruct Socratic first principles reasoning.")}
                    className="flex flex-col items-start rounded-xl border border-brand-beige hover:border-brand-brown bg-brand-cream/25 hover:bg-brand-cream/65 p-3.5 text-left transition-all hover:scale-[1.01]"
                  >
                    <Volume2 className="h-4 w-4 text-brand-brown mb-1.5" />
                    <span className="text-[11px] font-bold text-brand-charcoal">First Principles</span>
                    <span className="text-[9px] text-brand-charcoal/50 mt-0.5 leading-normal">Explain deductive conceptual reasoning.</span>
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
              placeholder="Ask Pathshala AI anything..."
              className="w-full h-11 rounded-xl border border-brand-beige bg-white pl-11 pr-24 text-xs text-brand-charcoal placeholder-brand-charcoal/35 transition-colors focus:border-brand-brown focus:outline-none"
            />

            {/* Controls panel: Voice Input + Send buttons */}
            <div className="absolute right-2 flex items-center gap-1">
              <button
                type="button"
                onClick={handleVoiceInput}
                className={`p-1.5 rounded-lg transition-all ${
                  isRecording 
                    ? 'bg-red-500 text-white animate-pulse' 
                    : 'text-brand-charcoal/50 hover:text-brand-brown hover:bg-brand-beige/40'
                }`}
                title={isRecording ? "Recording voice..." : "Voice Input"}
              >
                <Mic className="h-4 w-4" />
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
