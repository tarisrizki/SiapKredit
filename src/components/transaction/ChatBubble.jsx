import React from 'react';

export function ChatBubble({ message }) {
  const isUser = message.sender === 'user';
  
  return (
    <div className={`flex w-full mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div 
        className={`max-w-[85%] sm:max-w-[75%] px-4 py-2 rounded-2xl ${
          isUser 
            ? 'bg-brand-100 text-brand-800 rounded-tr-none' 
            : 'bg-white text-gray-700 border border-gray-200 rounded-tl-none shadow-sm'
        }`}
      >
        <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{message.text}</p>
      </div>
    </div>
  );
}
