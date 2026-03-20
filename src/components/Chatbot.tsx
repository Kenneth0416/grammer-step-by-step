"use client";

import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Example {
  sentence: string;
  translation: string;
  highlight?: string;
}

interface ChatbotProps {
  lessonTitle: string;
  unitTitle: string;
  unitType: string;
  isQuiz: boolean;
  unitExamples: Example[];
}

export function Chatbot({ lessonTitle, unitTitle, unitType, isQuiz, unitExamples }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const prevUnitRef = useRef<string>('');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Welcome message when opening chatbot
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = isQuiz
        ? "Hi! I'm here to help you think through the quiz questions. I won't give you direct answers, but I'll guide you to find them yourself! 🤔\n\nYou can ask me in English or Chinese (繁體/简体)."
        : `Hi! I'm your grammar tutor assistant. Feel free to ask me anything about "${unitTitle}"! 📚\n\nYou can ask me in English or Chinese (繁體/简体).`;

      setMessages([{ role: 'assistant', content: welcomeMessage }]);
      prevUnitRef.current = unitTitle;
    }
  }, [isOpen, isQuiz, unitTitle, messages.length]);

  // Detect unit change and notify chatbot
  useEffect(() => {
    if (isOpen && messages.length > 0 && prevUnitRef.current && prevUnitRef.current !== unitTitle) {
      const contextChangeMessage = isQuiz
        ? `💪 **Quiz time!** Let's tackle "${unitTitle}" together!\n\nRemember, I won't give you the answers directly, but I'll help you think it through. You've got this! 🎯`
        : `🎯 **Moving on!** Let's explore "${unitTitle}" now.\n\nWhat would you like to know about this topic? I'm here to help! ✨`;

      setMessages(prev => [...prev, { role: 'assistant', content: contextChangeMessage }]);
      prevUnitRef.current = unitTitle;
    }
  }, [unitTitle, isQuiz, isOpen, messages.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    const newMessages = [...messages, { role: 'user' as const, content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    // Add empty assistant message for streaming
    setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

    try {
      const requestBody = {
        messages: newMessages,
        context: {
          lessonTitle,
          unitTitle,
          unitType,
          isQuiz,
          pageExamples: unitExamples.map(ex => ex.sentence)
        }
      };

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) throw new Error('No reader available');

      let accumulatedContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter(line => line.trim() !== '');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            try {
              const json = JSON.parse(data);
              if (json.content) {
                accumulatedContent += json.content;
                // Update the last message with accumulated content
                setMessages(prev => {
                  const newMessages = [...prev];
                  newMessages[newMessages.length - 1] = {
                    role: 'assistant',
                    content: accumulatedContent
                  };
                  return newMessages;
                });
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.'
        };
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const chatContent = (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-academic-blue to-academic-blue-dark text-white p-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🤖</span>
          <div>
            <h3 className="font-display font-semibold">Grammar Tutor</h3>
            <p className="text-xs opacity-80">{isQuiz ? 'Quiz Helper' : 'Learning Assistant'}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full hover:bg-white/20 transition-colors flex items-center justify-center"
            aria-label="Close chatbot"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                msg.role === 'user'
                  ? 'bg-academic-blue text-white'
                  : 'bg-gray-100 text-text-primary'
              }`}
            >
              {msg.role === 'assistant' ? (
                msg.content === '' && isLoading ? (
                  // Show loading animation for empty message
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                ) : (
                  <div className="font-body text-sm prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                )
              ) : (
                <p className="font-body text-sm whitespace-pre-wrap">{msg.content}</p>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isQuiz ? "Ask for a hint..." : "Ask me anything..."}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-academic-blue font-body text-sm"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="w-10 h-10 rounded-full bg-academic-blue text-white hover:bg-academic-blue-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            aria-label="Send message"
          >
            ➤
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-academic-blue to-academic-blue-dark text-white shadow-xl transition-all duration-300 flex items-center justify-center ${
          isOpen ? 'scale-0 pointer-events-none' : 'scale-100'
        }`}
        aria-label="Open chatbot"
      >
        <span className="text-2xl">🤖</span>
      </button>

      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-all duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      <div
        className={`fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl transition-all duration-300 flex flex-col origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
        }`}
      >
        {chatContent}
      </div>
    </>
  );
}
