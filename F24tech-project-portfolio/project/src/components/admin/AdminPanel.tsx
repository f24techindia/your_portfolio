import React, { useState } from 'react';
import { X, User, Briefcase, GraduationCap, FolderOpen, Settings, Upload, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { LoginForm } from './LoginForm';
import { PersonalInfoForm } from './PersonalInfoForm';
import { ProjectsForm } from './ProjectsForm';
import { ExperienceForm } from './ExperienceForm';
import { EducationForm } from './EducationForm';
import { SkillsForm } from './SkillsForm';
import { ResumeForm } from './ResumeForm';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const { isAuthenticated, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Settings },
    { id: 'resume', label: 'Resume', icon: Upload }
  ];

  if (!isOpen) return null;

  if (!isAuthenticated) {
    return <LoginForm isOpen={isOpen} onClose={onClose} />;
  }

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="relative bg-white dark:bg-gray-900 w-full max-w-6xl mx-auto my-4 rounded-lg shadow-xl overflow-hidden">
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-64 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Admin Panel
                </h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={logout}
                    className="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors"
                    title="Logout"
                  >
                    <LogOut size={20} className="text-red-500 dark:text-red-400" />
                  </button>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <X size={20} className="text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
            
            <nav className="p-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <tab.icon size={20} />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Main content */}
          <div className="flex-1 overflow-auto">
            <div className="p-6">
              {activeTab === 'personal' && <PersonalInfoForm />}
              {activeTab === 'projects' && <ProjectsForm />}
              {activeTab === 'experience' && <ExperienceForm />}
              {activeTab === 'education' && <EducationForm />}
              {activeTab === 'skills' && <SkillsForm />}
              {activeTab === 'resume' && <ResumeForm />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};