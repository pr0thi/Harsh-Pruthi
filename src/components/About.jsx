import React from 'react';
import { Mail, MapPin } from 'lucide-react';

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
              I'm a passionate full-stack developer with over 4 years of experience in creating 
              modern web applications. I love turning complex problems into simple, beautiful, 
              and intuitive solutions.
            </p>
            <p className="text-lg mb-6 opacity-80">
              When I'm not coding, you can find me exploring new technologies, contributing to 
              open-source projects, or sharing my knowledge through tech blogs and mentoring.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-[#778DA9]" />
                <span>harshpruthi2002@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={20} className="text-[#778DA9]" />
                <span>New Delhi, India</span>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <img
              src="https://media.licdn.com/dms/image/v2/D5603AQEEXLxFc1_3MQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1683425009589?e=1755129600&v=beta&t=nD-UOhYZ4rDGK_ML-_0pixQ1DiW6nuxSWVBYWSCpXYM"
              alt="Harsh Pruthi"
              className="w-80 h-80 rounded-full object-cover shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 