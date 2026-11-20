import React from 'react';
import { motion } from 'framer-motion';
import type { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  isSelected: boolean;
  onSelect: (id: number) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, isSelected, onSelect }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.button
      type="button"
      variants={itemVariants}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => onSelect(project.id)}
      aria-pressed={isSelected}
      className={`project-card ${isSelected ? 'project-card-selected' : ''}`}
    >
      <span className="project-icon"><span>{project.title.slice(0, 1)}</span></span>
      <span className="project-copy">
          <span className="project-title">
            {project.title}
          </span>
          <span className="project-description">{project.description}</span>
      </span>
      <span className="project-open">Open project</span>
    </motion.button>
  );
};
