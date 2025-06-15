import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Github, ChevronLeft, ChevronRight, Youtube } from 'lucide-react';
import { projects, categories } from '../data/projects';
import { Link } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';

const Projects = ({ isVisible, isDark }) => {
  const [projectFilter, setProjectFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(0);
  const [projectsPerPage, setProjectsPerPage] = useState(1);
  const sliderRef = useRef(null);

  useEffect(() => {
    function updateProjectsPerPage() {
      if (window.innerWidth >= 1024) {
        setProjectsPerPage(3);
      } else if (window.innerWidth >= 768) {
        setProjectsPerPage(2);
      } else {
        setProjectsPerPage(1);
      }
    }
    updateProjectsPerPage();
    window.addEventListener('resize', updateProjectsPerPage);
    return () => window.removeEventListener('resize', updateProjectsPerPage);
  }, []);

  const filteredProjects =
    projectFilter === 'All'
      ? projects
      : projects.filter(project => project.category === projectFilter);

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  // For sliding, always render all cards, but only show the current page's worth
  const getVisibleProjects = () => filteredProjects;

  const goToNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const goToPrev = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (projectsPerPage === 1) goToNext();
    },
    onSwipedRight: () => {
      if (projectsPerPage === 1) goToPrev();
    },
    trackMouse: true,
  });

  // Calculate translateX percentage
  const translateX = `-${currentPage * (100)}%`;

  // Card width for responsive
  const getCardWidth = () => {
    if (projectsPerPage === 1) return '100%';
    if (projectsPerPage === 2) return '50%';
    return '33.3333%';
  };

  return (
    <section id="projects" className="py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Title */}
        <h2
          className={`text-4xl font-bold text-center mb-12 transform transition-all duration-1000 ${
            isVisible.projects ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          Projects
        </h2>

        {/* Filters */}
        <div
          className={`flex flex-wrap justify-center gap-4 mb-12 transform transition-all duration-1000 ${
            isVisible.projects ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          {categories.map(category => (
            <button
              key={category}
              onClick={() => {
                setProjectFilter(category);
                setCurrentPage(0);
              }}
              className={`px-6 py-2 rounded-full transition-colors ${
                projectFilter === category
                  ? 'bg-[#415A77] text-white'
                  : isDark
                  ? 'bg-gray-800 hover:bg-gray-700 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-black'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Project Cards */}
        <div className="relative overflow-hidden">
          <div
            ref={sliderRef}
            {...(projectsPerPage === 1 ? swipeHandlers : {})}
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              width: '100%',
              transform: `translateX(${translateX})`,
            }}
          >
            {getVisibleProjects().map((project) => (
              <div
                key={project.id}
                style={{ width: getCardWidth(), flex: '0 0 auto' }}
                className="px-2 box-border"
              >
                <Link
                  to={`/projects/${project.id}`}
                  className="group cursor-pointer transform hover:scale-105 transition-transform duration-300"
                >
                  <div
                    className={`h-full flex flex-col rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow ${
                      isDark ? 'bg-gray-800' : 'bg-white'
                    }`}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            isDark
                              ? 'bg-blue-900 text-blue-200'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {project.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                      <p className="opacity-70 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                        {project.technologies.slice(0, 3).map((tech, index) => (
                          <span
                            key={index}
                            className={`px-2 py-1 rounded text-sm ${
                              isDark
                                ? 'bg-gray-700 text-gray-300'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2 py-1 rounded text-sm opacity-50">
                            +{project.technologies.length - 3} more
                          </span>
                        )}
                      </div>
                      <div className="flex gap-3 mt-2">
                        <ExternalLink
                          size={20}
                          className="text-blue-500 group-hover:scale-110 transition-transform"
                        />
                        <Github
                          size={20}
                          className="text-blue-500 group-hover:scale-110 transition-transform"
                        />
                        <Youtube
                        size={20}
                          className="text-blue-500 group-hover:scale-110 transition-transform"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={goToPrev}
              disabled={currentPage === 0}
              className="p-2 disabled:opacity-50"
            >
              <ChevronLeft />
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i === currentPage ? 'bg-[#415A77]' : 'bg-gray-400'
                  }`}
                ></div>
              ))}
            </div>

            <button
              onClick={goToNext}
              disabled={
                currentPage === totalPages - 1 || filteredProjects.length <= projectsPerPage
              }
              className="p-2 disabled:opacity-50"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
