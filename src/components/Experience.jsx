import React from 'react';
import { Calendar } from 'lucide-react';
import { experiences } from '../data/experiences';

const Experience = ({ isVisible, isDark }) => {
  return (
    <section
      id="experience"
      className={`py-20 px-6 ${
        isDark ? 'bg-[#0D1B2A]' : 'bg-[#E0E1DD]'
      }`}
    >
      <div className="container mx-auto max-w-4xl">
        <h2
          className={`text-4xl font-bold text-center mb-16 transform transition-all duration-1000 ${
            isVisible.experience
              ? 'translate-y-0 opacity-100'
              : 'translate-y-10 opacity-0'
          }`}
        >
          Experience
        </h2>

        <div className="relative">
          {/* Main timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[#415A77]"></div>

          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className={`relative mb-12 ml-16 transform transition-all duration-1000 ${
                isVisible.experience
                  ? 'translate-x-0 opacity-100'
                  : 'translate-x-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Timeline dot with hover effect */}
              <div className="absolute -left-12 top-2 w-4 h-4 bg-[#415A77] rounded-full border-4 border-white dark:border-gray-900 transition-all duration-300 hover:scale-125 hover:bg-blue-600"></div>

          
              <div
                className={`p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  isDark ? 'bg-[#1B263B]' : 'bg-[#778DA9]'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Calendar size={16} className="text-[#E0E1DD]" />
                  <span className="text-sm text-[#E0E1DD] font-medium">
                    {exp.duration}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{exp.company}</h3>
                <div className="flex justify-between">
                  <h4 className="text-lg font-medium mb-3 opacity-80">
                    {exp.title}
                  </h4>
                  <h5 className="text-lg font-medium mb-3 opacity-80">
                    {exp.location}
                  </h5>
                </div>
                <p className="opacity-70">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
