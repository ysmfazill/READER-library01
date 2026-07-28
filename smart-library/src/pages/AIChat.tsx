import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { BookCard } from '../components/BookCard';
import { sendMessage, generateId } from '../utils/aiEngine';
import type { ChatMessage } from '../utils/aiEngine';

const QUICK_PROMPTS = [
  'Recommend books on AI',
  'What is machine learning?',
  'Give me a reading tip',
  'What are your top rated books?',
];

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([{
    id: 'welcome',
    role: 'assistant',
    content: "Hello! 👋 I'm **Aethelgard AI**. I can recommend books, search the library, or share reading tips. What would you like to explore?",
    timestamp: new Date().toISOString(),
    type: 'text'
  }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => { scrollToBottom(); }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    
    const userMsg: ChatMessage = {
      id: generateId(),
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await sendMessage(text);
      setMessages(prev => [...prev, response]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  const location = useLocation();
  const initialQueryTriggered = useRef(false);

  useEffect(() => {
    const state = location.state as { initialQuery?: string } | null;
    if (state?.initialQuery && !initialQueryTriggered.current) {
      initialQueryTriggered.current = true;
      handleSend(state.initialQuery);
    }
  }, [location.state]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  };

  // Basic markdown parser for bold text in chat
  const renderMarkdown = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold text-primary">{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen relative overflow-hidden flex flex-col">
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-tr from-secondary/5 via-transparent to-primary/5" />
      </div>

      <Navbar />
      <Sidebar />

      <main className="md:ml-sidebar-width pt-20 px-4 md:px-8 pb-4 flex-1 flex flex-col h-screen max-h-screen overflow-hidden">
        
        {/* Chat Header */}
        <div className="flex items-center gap-4 py-4 border-b border-outline-variant/20 shrink-0">
          <div className="w-12 h-12 rounded-xl ai-gradient-bg flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>neurology</span>
          </div>
          <div>
            <h1 className="font-headline-md text-headline-sm font-bold">Aethelgard AI</h1>
            <p className="text-label-sm text-primary flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Research Assistant Online
            </p>
          </div>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto py-6 space-y-6 scroll-hide pr-2">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] md:max-w-[70%] flex flex-col gap-3 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                
                {/* Bubble */}
                <div className={`px-5 py-3.5 rounded-2xl ${
                  msg.role === 'user' 
                    ? 'bg-primary text-white rounded-br-sm' 
                    : 'glass-card bg-surface/80 rounded-bl-sm border border-primary/10 shadow-sm'
                }`}>
                  <p className="text-body-md whitespace-pre-wrap leading-relaxed">
                    {msg.role === 'user' ? msg.content : renderMarkdown(msg.content)}
                  </p>
                </div>

                {/* Inline Books (if any) */}
                {msg.books && msg.books.length > 0 && (
                  <div className="flex overflow-x-auto gap-4 py-2 w-full snap-x pb-4">
                    {msg.books.map(book => (
                      <div key={book.id} className="w-[160px] md:w-[200px] shrink-0 snap-start">
                        <BookCard book={book} />
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Tip visualizer */}
                {msg.type === 'tip' && (
                  <div className="w-full bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex gap-3 text-amber-700 dark:text-amber-400">
                    <span className="material-symbols-outlined shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>tips_and_updates</span>
                    <p className="text-sm font-medium">{renderMarkdown(msg.content)}</p>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="glass-card bg-surface/80 rounded-2xl rounded-bl-sm border border-primary/10 px-5 py-4 flex gap-1 items-center">
                <span className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 rounded-full bg-primary/80 animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        {messages.length < 3 && (
          <div className="flex gap-2 overflow-x-auto pb-4 shrink-0 scroll-hide">
            {QUICK_PROMPTS.map(prompt => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                className="px-4 py-2 rounded-full border border-primary/20 text-primary text-label-sm font-semibold hover:bg-primary hover:text-white transition-all whitespace-nowrap"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {/* Input Area */}
        <div className="shrink-0 bg-surface-container-low rounded-2xl p-2 flex items-end gap-2 border border-outline-variant/30 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 transition-all shadow-sm">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about books, topics, or reading tips..."
            className="flex-1 bg-transparent border-none resize-none px-4 py-3 max-h-[120px] text-body-md focus:outline-none"
            rows={1}
            style={{ minHeight: '48px' }}
          />
          <button
            onClick={() => handleSend(input)}
            disabled={!input.trim() || isTyping}
            className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center transition-all ${
              input.trim() && !isTyping 
                ? 'ai-gradient-bg text-white hover:opacity-90 active:scale-95 shadow-md shadow-primary/20' 
                : 'bg-surface-container-high text-on-surface-variant/50 cursor-not-allowed'
            }`}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
          </button>
        </div>
        
        <p className="text-center text-[10px] text-on-surface-variant/50 mt-2 shrink-0">
          Aethelgard AI can make mistakes. Consider verifying critical information.
        </p>

      </main>
    </div>
  );
};

export default AIChat;
