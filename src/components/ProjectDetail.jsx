import React from 'react';
import { ArrowLeft, ExternalLink, Github, Youtube } from 'lucide-react';

const ProjectDetail = ({ project, isDark, onBack }) => {
  if (!project) return null;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-[#0D1B2A] text-[#E0E1DD]' : 'bg-[#E0E1DD] text-[#0D1B2A]'}`}>
      <div className="container mx-auto px-6 py-8">
        <button
          onClick={onBack}
          className={`flex items-center gap-2 mb-8 px-4 py-2 rounded-lg transition-colors ${
            isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          <ArrowLeft size={20} />
          Back to Projects
        </button>
        
        <div className="max-w-4xl mx-auto">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-64 object-cover rounded-lg mb-8"
          />
          
          <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
          <p className="text-xl mb-6 opacity-80">{project.fullDescription}</p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm ${
                      isDark ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Key Features</h3>
              <ul className="space-y-2">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Challenges & Solutions</h3>
            <p className="opacity-80">{project.challenges}</p>
          </div>
          
          <div className="flex gap-4">
            <a
              href={project.liveUrl}
              target="_blank"
              className="flex items-center gap-2 px-6 py-3 bg-[#415A77] text-white rounded-lg hover:bg-[#778DA9] transition-colors"
            >
              <ExternalLink size={20} />
              Live Demo
            </a>
            <a
              href={project.youtube}
              target="_blank"
              className="flex items-center gap-2 px-6 py-3 bg-[#415A77] text-white rounded-lg hover:bg-[#778DA9] transition-colors"
            >
              <Youtube size={20} />
              Live Demo
            </a>
            {project.githubUrl=="#"?<></>:<a
              href={project.githubUrl}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg border transition-colors ${
                isDark 
                  ? 'border-gray-600 hover:bg-gray-800' 
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Github size={20} />
              View Code
            </a>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail; 