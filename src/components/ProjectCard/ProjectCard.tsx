import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Clock } from 'lucide-react';
import type { Project } from '../../types';


interface ProjectCardProps {
  project: Project;
  isSelected: boolean;
  onSelect: (id: number) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, isSelected, onSelect }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.02, translateY: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(project.id)}
      className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 border ${
        isSelected 
          ? 'bg-gradient-to-br from-indigo-500 to-purple-600 border-transparent shadow-lg shadow-indigo-500/30' 
          : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-500/30 hover:shadow-md'
      }`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className={`font-semibold text-lg ${isSelected ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
            {project.title}
          </h3>
          <p className={`mt-2 text-sm leading-relaxed ${isSelected ? 'text-indigo-100' : 'text-gray-500 dark:text-gray-400'}`}>
            {project.description}
          </p>
        </div>
        <div className={`p-2 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-gray-50 dark:bg-gray-700 text-gray-400'}`}>
          <ChevronRight size={18} />
        </div>
      </div>
      
      <div className={`mt-4 flex items-center gap-4 text-xs font-medium ${isSelected ? 'text-indigo-100' : 'text-gray-400 dark:text-gray-500'}`}>
        <div className="flex items-center gap-1.5">
          <Clock size={14} />
          <span>Updated recently</span>
        </div>
      </div>
    </motion.div>
  );
};
