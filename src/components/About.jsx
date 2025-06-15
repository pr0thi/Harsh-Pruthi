import React from 'react';
import { MapPin, University } from 'lucide-react';

const About = ({ isVisible }) => {
  return (
    <section id="about" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className={`grid md:grid-cols-2 gap-12 items-center transform transition-all duration-1000 ${
          isVisible.about ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="order-2 md:order-1">
            <h2 className="text-4xl font-bold mb-6">About Me</h2>
            <p className="text-lg mb-6 opacity-80">
            I'm Harsh Pruthi, a passionate Full Stack Web Developer with a strong focus on building intuitive, scalable, and user-centric applications. My experience spans across frontend and backend technologies, with a knack for creating seamless user experiences using React, TypeScript, and modern web tools.</p>
            <p className="text-lg mb-6 opacity-80">
            I thrive in collaborative environments and continuously seek to refine my skills while staying updated with industry trends. Outside of coding, I'm driven by a curiosity to learn, build, and make a meaningful impact through technology.
            
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <University size={20} className="text-[#778DA9]" />
                <span>B.Tech in Computer Science</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={20} className="text-[#778DA9]" />
                <span>New Delhi, India</span>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <img
              src="./pf.jpeg"
              alt="Harsh Pruthi"
              className="w-120 h-120 rounded-full object-cover shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 