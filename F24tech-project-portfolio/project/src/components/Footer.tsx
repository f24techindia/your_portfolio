import React from 'react';
import { Github, Linkedin, Twitter, Globe } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Footer: React.FC = () => {
  const { data } = usePortfolio();
  const { personalInfo } = data;

  const socialLinks = [
    { icon: Github, url: personalInfo.githubUrl, label: 'GitHub' },
    { icon: Linkedin, url: personalInfo.linkedinUrl, label: 'LinkedIn' },
    { icon: Twitter, url: personalInfo.twitterUrl, label: 'Twitter' },
    { icon: Globe, url: personalInfo.websiteUrl, label: 'Website' }
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-4">{personalInfo.name}</h3>
          <p className="text-gray-400 mb-6">{personalInfo.title}</p>
          
          <div className="flex justify-center gap-6 mb-8">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label={link.label}
              >
                <link.icon size={24} />
              </a>
            ))}
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Built with React, TypeScript, and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};