import React from 'react';
import { Project } from '../types';
import { sanitize } from '../utils';

interface ProjectListProps {
  projects: Project[];
  selectedProject: Project | null;
  onSelectProject: (project: Project) => void;
  onDeleteProject: (projectId: number) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  selectedProject,
  onSelectProject,
  onDeleteProject,
}) => {
  return (
    <ul className="list-group">
      {projects.map(project => (
        <li
          key={project.id}
          className={`list-group-item d-flex justify-content-between align-items-center ${
            selectedProject?.id === project.id ? 'active' : ''
          }`}
          onClick={() => onSelectProject(project)}
          style={{ cursor: 'pointer' }}
        >
          {sanitize(project.name)}
          <button
            className="btn btn-danger btn-sm"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteProject(project.id);
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ProjectList;
