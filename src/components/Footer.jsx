import React from 'react';

const Footer = ({ isDark }) => {
  return (
    <footer id="footer" className={`py-8 px-6 border-t ${isDark ? 'border-[#1a263b]' : 'border-[#778da9]'}`}>
      <div className="container mx-auto text-center opacity-60">
        <p>Crafted with 😃 by Harsh Pruthi</p>
      </div>
    </footer>
  );
};

export default Footer; 