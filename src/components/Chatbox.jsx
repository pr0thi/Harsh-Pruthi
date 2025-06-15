import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { chatData } from '../data/chatdata';

const Chatbox = ({ isDark }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);

  const theme = {
    dark: {
      bg: 'bg-[#1b263b]',
      text: 'text-[#e0e1dd]',
      border: 'border-[#778da9]',
      button: 'bg-[#778da9] text-[#0d1b2a] hover:bg-[#415a77]',
      input: 'bg-transparent text-[#e0e1dd] border-[#778da9]',
    },
    light: {
      bg: 'bg-[#e0e1dd]',
      text: 'text-[#0d1b2a]',
      border: 'border-[#415a77]',
      button: 'bg-[#415a77] text-[#e0e1dd] hover:bg-[#1b263b]',
      input: 'bg-transparent text-[#0d1b2a] border-[#415a77]',
    },
  };

  const currentTheme = isDark ? theme.dark : theme.light;

  const handleUserInput = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      const input = e.target.value.trim().toLowerCase();
      let response =
        "Sorry, I didn't understand that. Try asking about projects, skills, or contact info.";

      if (input.includes('project')) {
        response =
          'Here are a few of my projects:\n' +
          chatData.projects
            .slice(0, 3)
            .map((p) => `• ${p.title}: ${p.description}`)
            .join('\n');
      } else if (input.includes('skills') || input.includes('tech')) {
        response = `I work with: ${chatData.skills.join(', ')}`;
      } else if (input.includes('contact') || input.includes('email')) {
        response = `You can reach me at: ${chatData.contact.email}`;
      } else if (input.includes('experience')) {
        response = chatData.experience
          .map((exp) => `• ${exp.role} at ${exp.company} (${exp.year})`)
          .join('\n');
      } else {
        const faqMatch = Object.entries(chatData.faqs).find(([q]) =>
          input.includes(q)
        );
        if (faqMatch) response = faqMatch[1];
      }

      setMessages((prev) => [
        ...prev,
        { from: 'user', text: e.target.value },
        { from: 'bot', text: response },
      ]);
      e.target.value = '';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div
          className={`w-72 h-96 p-4 rounded-xl shadow-lg border flex flex-col ${currentTheme.bg} ${currentTheme.text} ${currentTheme.border}`}
        >
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold">Chat Assistant</h4>
            <button onClick={() => setIsOpen(false)}>
              <X className={`${currentTheme.text}`} />
            </button>
          </div>

          <div className="overflow-y-auto h-64 mb-2 text-sm space-y-1">
          {messages.length === 0 ? (
            <div className="text-gray-400 space-y-2">
              <p className="italic">Ask me something below 👇</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {[
                  'Show me your projects',
                  'What stack do you use?',
                  'How can I contact you?',
                ].map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      setMessages((prev) => [
                        ...prev,
                        { from: 'user', text: prompt },
                        {
                          from: 'bot',
                          text:
                            prompt.toLowerCase().includes('project')
                              ? 'Here are a few of my projects:\n' +
                                chatData.projects
                                  .slice(0, 3)
                                  .map((p) => `• ${p.title}: ${p.description}`)
                                  .join('\n')
                              : prompt.toLowerCase().includes('stack')
                              ? `I work with: ${chatData.skills.join(', ')}`
                              : `You can reach me at: ${chatData.contact.email}`,
                        },
                      ])
                    }
                    className={`px-3 py-1 text-xs rounded-full border ${
                      isDark
                        ? 'bg-[#415a77] text-white border-[#778da9] hover:bg-[#1b263b]'
                        : 'bg-[#778da9] text-white border-[#415a77] hover:bg-[#415a77]'
                    } transition-colors`}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <p
                key={idx}
                className={`whitespace-pre-wrap ${
                  msg.from === 'user' ? 'text-right font-medium' : 'text-left'
                }`}
              >
                {msg.text}
              </p>
            ))
          )}
          
          </div>

          <input
            type="text"
            placeholder="Type your query and press Enter..."
            onKeyDown={handleUserInput}
            className={`w-full p-2 rounded-md outline-none border ${currentTheme.input}`}
          />

          <p className="text-xs mt-2 text-gray-400">
            Try: "Show me your projects", "What stack do you use?", "How can I contact you?"
          </p>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className={`p-3 rounded-full shadow-lg ${currentTheme.button} transition-colors duration-300`}
        >
          <MessageSquare className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default Chatbox;
