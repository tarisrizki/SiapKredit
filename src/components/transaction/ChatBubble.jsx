import React from 'react';
import { motion } from 'framer-motion';

export function ChatBubble({ message }) {
  const isUser = message.sender === 'user';
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={`flex w-full mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div 
        className={`max-w-[85%] px-4 py-2.5 sm:px-5 sm:py-3 text-[15px] leading-relaxed shadow-sm
          ${isUser 
            ? 'bg-primary text-primary-foreground rounded-2xl rounded-tr-sm' 
            : 'bg-card border text-card-foreground rounded-2xl rounded-tl-sm'
          }`}
      >
        <p className="whitespace-pre-line">{message.text}</p>
      </div>
    </motion.div>
  );
}
