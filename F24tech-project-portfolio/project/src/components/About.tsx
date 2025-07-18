import React from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const About: React.FC = () => {
  const { data } = usePortfolio();
  const { personalInfo, skills, education } = data;

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Passionate about creating beautiful designs and user experiences
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Get to Know Me
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              {personalInfo.bio}
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="text-purple-600" size={20} />
                <span className="text-gray-700 dark:text-gray-300">{personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-purple-600" size={20} />
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  {personalInfo.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-purple-600" size={20} />
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  {personalInfo.phone}
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Skills & Education
            </h3>
            
            <div className="mb-8">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Technical Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Education
              </h4>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div
                    key={edu.id}
                    className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
                  >
                    <h5 className="font-medium text-gray-900 dark:text-white">
                      {edu.degree}
                    </h5>
                    <p className="text-purple-600 dark:text-purple-400 font-medium">
                      {edu.institution}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {edu.duration} • {edu.location}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};