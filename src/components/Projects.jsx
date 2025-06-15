import React, { useState } from 'react';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import { projects, categories } from '../data/projects';

const Projects = ({ isVisible, isDark, setSelectedProject }) => {
  const [projectFilter, setProjectFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(0);

  const filteredProjects =
    projectFilter === 'All'
      ? projects
      : projects.filter(project => project.category === projectFilter);

  const projectsPerPage = 3;
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const paginatedProjects = filteredProjects.slice(
    currentPage * projectsPerPage,
    (currentPage + 1) * projectsPerPage
  );

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
        <div className="relative">
          <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-8">
            {paginatedProjects.map((project, index) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`group cursor-pointer transform transition-all duration-500 hover:scale-105 ${
                  isVisible.projects ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
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
                    </div>
                  </div>
                </div>
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
