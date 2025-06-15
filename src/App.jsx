import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectDetail from './components/ProjectDetail';
import ParticleBackground from './components/ParticleBackground';
import Chatbox from './components/Chatbox';

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent({ isDark, setIsDark, activeSection, isVisible, isMobileMenuOpen, setIsMobileMenuOpen, scrollToSection }) {
  const location = useLocation();
  const isProjectDetail = location.pathname.startsWith('/projects/');

  return (
    <div className={`min-h-screen transition-colors duration-300 font-montserrat ${
      isDark ? 'bg-[#0d1b2a] text-[#e0e1dd]' : 'bg-[#e0e1dd] text-[#0d1b2a]'
    }`}>
      <ScrollToTop />
      {!isProjectDetail && (
        <>
          <Navbar
            isDark={isDark}
            setIsDark={setIsDark}
            activeSection={activeSection}
            scrollToSection={scrollToSection}
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
          <ParticleBackground isDark={isDark} className="hidden md:block" />
        </>
      )}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero isVisible={isVisible} scrollToSection={scrollToSection} />
              <About isVisible={isVisible} />
              <Experience isVisible={isVisible} isDark={isDark} />
              <Projects isVisible={isVisible} isDark={isDark} />
              <Contact isVisible={isVisible} isDark={isDark} />
              <Footer isDark={isDark} />
              <Chatbox isDark={isDark} />
            </>
          }
        />
        <Route
          path="/projects/:projectId"
          element={<ProjectDetail isDark={isDark} setIsDark={setIsDark} />}
        />
      </Routes>
      <Chatbox isDark={isDark} />
    </div>
  );
}

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

  return (
    <Router>
      <AppContent
        isDark={isDark}
        setIsDark={setIsDark}
        activeSection={activeSection}
        isVisible={isVisible}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        scrollToSection={scrollToSection}
      />
    </Router>
  );
};

export default App;