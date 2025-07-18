import React, { useState } from 'react';
import { Plus, X, Save } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const SkillsForm: React.FC = () => {
  const { data, updateSkills } = usePortfolio();
  const [skills, setSkills] = useState<string[]>(data.skills);
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleSave = () => {
    updateSkills(skills);
    alert('Skills updated successfully!');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        Skills
      </h3>

      <div className="mb-6">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new skill"
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <button
            onClick={handleAddSkill}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Plus size={20} />
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="flex items-center gap-2 px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full"
            >
              {skill}
              <button
                onClick={() => handleRemoveSkill(skill)}
                className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200"
              >
                <X size={16} />
              </button>
            </span>
          ))}
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Save size={20} />
          Save Skills
        </button>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
          Current Skills ({skills.length})
        </h4>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm border border-gray-200 dark:border-gray-600"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};