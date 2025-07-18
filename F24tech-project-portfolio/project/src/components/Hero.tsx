import React from 'react';
import { Github, Linkedin, Twitter, Globe, Download } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Hero: React.FC = () => {
  const { data } = usePortfolio();
  const { personalInfo, resume } = data;

  const socialLinks = [
    { icon: Github, url: personalInfo.githubUrl, label: 'GitHub' },
    { icon: Linkedin, url: personalInfo.linkedinUrl, label: 'LinkedIn' },
    { icon: Twitter, url: personalInfo.twitterUrl, label: 'Twitter' },
    { icon: Globe, url: personalInfo.websiteUrl, label: 'Website' }
  ];

  const downloadResume = () => {
    if (resume) {
      const link = document.createElement('a');
      link.href = resume.fileUrl;
      link.download = resume.fileName;
      link.click();
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Hi, I'm{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                {personalInfo.name}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6">
              {personalInfo.title}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
              {personalInfo.bio}
            </p>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 border border-gray-200 dark:border-gray-600"
                >
                  <link.icon size={20} />
                  <span>{link.label}</span>
                </a>
              ))}
            </div>

            {resume && (
              <button
                onClick={downloadResume}
                className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 mx-auto lg:mx-0"
              >
                <Download size={20} />
                Download Resume
              </button>
            )}
          </div>
          
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-8 border-white dark:border-gray-700 shadow-2xl">
                <img
                  src={personalInfo.profileImage}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">PD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};