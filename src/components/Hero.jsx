import React, { useEffect, useRef } from 'react';
import { Download } from 'lucide-react';
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGitAlt
} from 'react-icons/fa';
import {
  SiExpress, SiMongodb, SiRedux
} from 'react-icons/si';

const Hero = ({ isVisible, scrollToSection }) => {
  const ring1Ref = useRef(null);
  const ring2Ref = useRef(null);
  const ring3Ref = useRef(null);

  useEffect(() => {
    const loadGSAP = async () => {
      if (!window.gsap) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
        script.async = true;
        document.body.appendChild(script);
        await new Promise(resolve => { script.onload = resolve; });
      }

      const gsap = window.gsap;
      gsap.to(ring1Ref.current, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: 'none',
        transformOrigin: 'center center',
      });
      gsap.to(ring2Ref.current, {
        rotation: -360,
        duration: 30,
        repeat: -1,
        ease: 'none',
        transformOrigin: 'center center',
      });
      gsap.to(ring3Ref.current, {
        rotation: 360,
        duration: 40,
        repeat: -1,
        ease: 'none',
        transformOrigin: 'center center',
      });
    };

    loadGSAP();
  }, []);

  const TechIcon = ({ children, color }) => (
    <div
      className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex items-center justify-center rounded-full text-white text-lg sm:text-xl lg:text-2xl shadow-lg transition-all duration-300 hover:scale-110`}
      style={{
        backgroundColor: color,
        boxShadow: `0 0 15px ${color}`,
        WebkitBackdropFilter: 'blur(4px)',
        backdropFilter: 'blur(4px)',
      }}
    >
      {children}
    </div>
  );

  // Utility to calculate position on a circle
  const getPosition = (radius, angleDeg) => {
    const angle = (angleDeg * Math.PI) / 180;
    return {
      top: `${50 + radius * Math.sin(angle)}%`,
      left: `${50 + radius * Math.cos(angle)}%`,
      transform: 'translate(-50%, -50%)',
      position: 'absolute',
    };
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 w-full overflow-hidden">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div
            className={`text-center lg:text-left transition-all duration-1000 z-10 relative order-1 lg:order-1 mt-8 sm:mt-0 ${
              isVisible?.home ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
              Hi, I'm <span className="text-[#778DA9] whitespace-nowrap">Harsh Pruthi</span>
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4 sm:mb-6 opacity-80">
              Full Stack Web Developer
            </h2>
            <p className="text-base md:text-lg lg:text-xl max-w-2xl mx-auto lg:mx-0 opacity-70 mb-6 sm:mb-8 leading-relaxed">
              I craft clean, functional, and user-friendly web applications.
            </p>
            <div className="flex flex-row gap-4 justify-center sm:justify-start">
              <button
                onClick={() => scrollToSection('projects')}
                className="px-6 py-3 bg-[#415A77] text-white rounded-lg hover:bg-[#8EA4D2] transition-colors text-base font-medium"
              >
                View My Work
              </button>
              <a href="/Harsh_Pruthi.pdf" download>
                <button className="flex items-center gap-2 px-6 py-3 bg-[#415A77] text-white rounded-lg hover:bg-[#8EA4D2] transition-colors text-base font-medium">
                  <Download size={18} />
                  Resume
                </button>
              </a>
            </div>
          </div>

          {/* Orbiting Rings */}
          <div className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] flex items-center justify-center order-2 lg:order-2">
            {/* Ring 1 */}
            <div className="absolute w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 border border-blue-400/20 rounded-full">
              <div ref={ring1Ref} className="relative w-full h-full">
                <div style={getPosition(38, 0)}>
                  <TechIcon color="#E34F26"><FaHtml5 /></TechIcon>
                </div>
                <div style={getPosition(38, 120)}>
                  <TechIcon color="#1572B6"><FaCss3Alt /></TechIcon>
                </div>
                <div style={getPosition(38, 240)}>
                  <TechIcon color="#F7DF1E"><FaJs className="text-black" /></TechIcon>
                </div>
              </div>
            </div>

            {/* Ring 2 */}
            <div className="absolute w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 border border-violet-400/20 rounded-full">
              <div ref={ring2Ref} className="relative w-full h-full">
                <div style={getPosition(48, 0)}>
                  <TechIcon color="#F1502F"><FaGitAlt /></TechIcon>
                </div>
                <div style={getPosition(48, 120)}>
                  <TechIcon color="#61DAFB"><FaReact className="text-black" /></TechIcon>
                </div>
                <div style={getPosition(48, 240)}>
                  <TechIcon color="#764ABC"><SiRedux /></TechIcon>
                </div>
              </div>
            </div>

            {/* Ring 3 */}
            <div className="absolute w-80 h-80 sm:w-[360px] sm:h-[360px] md:w-[440px] md:h-[440px] border border-purple-400/20 rounded-full">
              <div ref={ring3Ref} className="relative w-full h-full">
                <div style={getPosition(50, 0)}>
                  <TechIcon color="#4DB33D"><SiMongodb /></TechIcon>
                </div>
                <div style={getPosition(50, 120)}>
                  <TechIcon color="#339933"><FaNodeJs /></TechIcon>
                </div>
                <div style={getPosition(50, 240)}>
                  <TechIcon color="#000000"><SiExpress /></TechIcon>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;