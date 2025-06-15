import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectDetail from './components/ProjectDetail';
import ParticleBackground from './components/ParticleBackground';

const App = () => {
  const [isDark, setIsDark] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState({
    home: true,
    about: true,
    experience: true,
    projects: true,
    contact: true
  });
  const [selectedProject, setSelectedProject] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const hasAnimatedRef = useRef({
    home: false,
    about: false,
    experience: false,
    projects: false,
    contact: false,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const sectionVisibility = {};
  
        entries.forEach((entry) => {
          const sectionId = entry.target.id;
  
          if (entry.isIntersecting && !hasAnimatedRef.current[sectionId]) {
            hasAnimatedRef.current[sectionId] = true;
  
            setIsVisible((prev) => ({
              ...prev,
              [sectionId]: true,
            }));
          }
  
          sectionVisibility[sectionId] = entry.intersectionRatio;
        });
  
        const mostVisibleSection = Object.entries(sectionVisibility)
          .sort((a, b) => b[1] - a[1])[0]?.[0];
  
        if (mostVisibleSection) {
          setActiveSection(mostVisibleSection);
        }
      },
      {
        threshold: Array.from({ length: 11 }, (_, i) => i / 10),
        rootMargin: '-20% 0px -60% 0px',
      }
    );
  
    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });
  
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBackToProjects = () => {
    setSelectedProject(null);
    setIsVisible({
      home: true,
      about: true,
      experience: true,
      projects: true,
      contact: true
    });
    setTimeout(() => {
      scrollToSection('projects');
    }, 100);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 font-montserrat ${
      isDark ? 'bg-[#0d1b2a] text-[#e0e1dd]' : 'bg-[#e0e1dd] text-[#0d1b2a]'
    }`}>
      {selectedProject ? (
        <ProjectDetail
          project={selectedProject}
          isDark={isDark}
          onBack={handleBackToProjects}
        />
      ) : (
        <>
          <Navbar
            isDark={isDark}
            setIsDark={setIsDark}
            activeSection={activeSection}
            scrollToSection={scrollToSection}
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
          <ParticleBackground isDark={isDark} />
          <Hero isVisible={isVisible} scrollToSection={scrollToSection} />
          <About isVisible={isVisible} />
          <Experience isVisible={isVisible} isDark={isDark} />
          <Projects isVisible={isVisible} isDark={isDark} setSelectedProject={setSelectedProject} />
          <Contact isVisible={isVisible} isDark={isDark} />
          <Footer isDark={isDark} />
        </>
      )}
    </div>
  );
};

export default App;