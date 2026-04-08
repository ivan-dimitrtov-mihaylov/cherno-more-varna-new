/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Sparkles, User, Bot, Loader2 } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const SYSTEM_PROMPT = `
You are the AI Concierge for Hotel Cherno More in Varna, Bulgaria. 
Your goal is to assist guests with information about the hotel and local attractions.
Hotel Details:
- Location: Blvd. Slivnitsa 33, Varna, Bulgaria (Heart of the city).
- Features: 199 renovated rooms, 14 floors, Casino Cherno More (24/7), Restaurant Panorama (15th floor), Conference Center with 3 halls.
- History: Opened in 1978, designed by arch. Simeon Dimitrov.
- Atmosphere: Professional, luxurious, yet welcoming.
- Language: You can speak Bulgarian and English. If the user asks in Bulgarian, reply in Bulgarian.
Keep your answers concise, helpful, and premium in tone.
If asked about booking, suggest they use the "Book Now" button on the site.
`;

export default function AIConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([
    { role: "bot", text: "Здравейте! Аз съм вашият виртуален асистент в хотел Черно Море. С какво мога да ви помогна днес?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      const chat = model.startChat({
        history: messages.map(m => ({
          role: m.role === "user" ? "user" : "model",
          parts: [{ text: m.text }],
        })),
        generationConfig: {
          maxOutputTokens: 500,
        },
      });

      // Send the system prompt context with the first message if needed, 
      // but here we just append it to the prompt for better focus.
      const result = await chat.sendMessage(`${SYSTEM_PROMPT}\n\nUser Question: ${userMessage}`);
      const response = await result.response;
      const text = response.text();

      setMessages((prev) => [...prev, { role: "bot", text: text }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages((prev) => [...prev, { role: "bot", text: "Съжалявам, възникна техническа грешка. Моля, опитайте отново по-късно." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[90]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-20 right-0 w-[350px] md:w-[400px] h-[500px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-zinc-100"
          >
            {/* Header */}
            <div className="bg-zinc-900 p-5 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-500/30">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold tracking-tight">AI Консиерж</h4>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Hotel Cherno More</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-grow overflow-y-auto p-5 space-y-4 no-scrollbar bg-zinc-50/50"
            >
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                    m.role === "user" 
                      ? "bg-zinc-900 text-white rounded-tr-none" 
                      : "bg-white border border-zinc-100 text-zinc-700 rounded-tl-none shadow-sm"
                  }`}>
                    {m.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-zinc-100 p-4 rounded-2xl rounded-tl-none shadow-sm flex gap-2">
                    <Loader2 className="w-4 h-4 text-amber-500 animate-spin" />
                    <span className="text-xs text-zinc-400">Мисли...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-zinc-100">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Задайте въпрос..."
                  className="w-full pl-5 pr-12 py-3 bg-zinc-50 border border-zinc-100 rounded-full text-sm outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-1.5 w-9 h-9 bg-zinc-900 hover:bg-zinc-800 disabled:opacity-50 text-white rounded-full flex items-center justify-center transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-zinc-900 text-white rounded-full shadow-2xl flex items-center justify-center relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-amber-500 opacity-0 group-hover:opacity-10 transition-opacity" />
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        {!isOpen && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full border-2 border-white"
          />
        )}
      </motion.button>
    </div>
  );
}
