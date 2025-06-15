import React, { useRef, useEffect } from 'react';

const ParticleBackground = ({ isDark, className = '' }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 50;
    const maxDistance = 150;
    
    // Set canvas size based on container
    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      // Set actual canvas size
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      // Scale canvas back down using CSS
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      
      // Scale the drawing context so everything draws at the higher resolution
      ctx.scale(dpr, dpr);
      
      // Update particle positions if they exist
      if (particlesRef.current.length > 0) {
        particlesRef.current.forEach(particle => {
          if (particle.x > rect.width) particle.x = rect.width;
          if (particle.y > rect.height) particle.y = rect.height;
        });
      }
    };

    // Particle class
    class Particle {
      constructor() {
        const rect = container.getBoundingClientRect();
        this.x = Math.random() * rect.width;
        this.y = Math.random() * rect.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        const rect = container.getBoundingClientRect();
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > rect.width) this.vx *= -1;
        if (this.y < 0 || this.y > rect.height) this.vy *= -1;

        // Keep particles in bounds
        this.x = Math.max(0, Math.min(rect.width, this.x));
        this.y = Math.max(0, Math.min(rect.height, this.y));
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? 'rgba(119, 141, 169, 0.6)' : 'rgba(65, 90, 119, 0.4)';
        ctx.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    particlesRef.current = particles;

    // Animation loop
    const animate = () => {
      const rect = container.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.3;
            ctx.beginPath();
            ctx.strokeStyle = isDark 
            ? `rgba(224, 225, 221, ${opacity})`  
            : `rgba(13, 27, 42, ${opacity})`;   

            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Initial setup
    resizeCanvas();
    animate();

    // Debounced resize handler
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resizeCanvas();
      }, 100);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      clearTimeout(resizeTimeout);
    };
  }, [isDark]);

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{ zIndex: 1 }}
    >
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 pointer-events-none"
        style={{ 
          width: '100%', 
          height: '100%',
          maxWidth: '100%',
          maxHeight: '100%'
        }}
      />
    </div>
  );
};

export default ParticleBackground; 