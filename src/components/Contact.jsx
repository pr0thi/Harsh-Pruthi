import React from 'react';
import { Mail, Linkedin, Github } from 'lucide-react';

const Contact = ({ isVisible, isDark }) => {
  return (
    <section id="contact" className={`py-20 px-6 ${isDark ? 'bg-[#0D1B2A]' : 'bg-[#E0E1DD]'}`}>
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className={`text-4xl font-bold mb-8 transform transition-all duration-1000 ${
          isVisible.contact ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          Get In Touch
        </h2>
        <p className={`text-lg mb-12 opacity-80 transform transition-all duration-1000 ${
          isVisible.contact ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          I'm always open to discussing new opportunities and interesting projects.
          Let's create something amazing together!
        </p>
        
        <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center transform transition-all duration-1000 ${
          isVisible.contact ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <a
            href="mailto:harshpruthi2002@gmail.com"
            className={`flex items-center gap-3 px-8 py-4 rounded-lg border transition-colors ${
              isDark 
                ? 'border-gray-600 hover:bg-gray-700' 
                : 'border-gray-300 hover:bg-gray-100'
            }`}
          >
            <Mail size={20} />
            Email Me
          </a>
          <a
            href="https://www.linkedin.com/in/harsh-pruthi/"
            target='_blank'
            className={`flex items-center gap-3 px-8 py-4 rounded-lg border transition-colors ${
              isDark 
                ? 'border-gray-600 hover:bg-gray-700' 
                : 'border-gray-300 hover:bg-gray-100'
            }`}
          >
            <Linkedin size={20} />
            LinkedIn
          </a>
          <a
            href="https://github.com/pr0thi"
            target='_blank'
            className={`flex items-center gap-3 px-8 py-4 rounded-lg border transition-colors ${
              isDark 
                ? 'border-gray-600 hover:bg-gray-700' 
                : 'border-gray-300 hover:bg-gray-100'
            }`}
          >
            <Github size={20} />
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact; 