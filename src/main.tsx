import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Project, Task } from './types';
import { useLocalStorage } from './useLocalStorage';
import ProjectList from './components/ProjectList';
import TaskList from './components/TaskList';
import AddProjectForm from './components/AddProjectForm';

const App = () => {
  const [projects, setProjects] = useLocalStorage<Project[]>('projects', []);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleAddProject = (projectName: string) => {
    const newProject: Project = {
      id: Date.now(),
      name: projectName,
      tasks: [],
    };
    setProjects([...projects, newProject]);
  };

  const handleDeleteProject = (projectId: number) => {
    const updatedProjects = projects.filter(project => project.id !== projectId);
    setProjects(updatedProjects);

    if (selectedProject?.id === projectId) {
      setSelectedProject(null);
    }
  };

  const handleAddTask = (taskName: string) => {
    if (!selectedProject) return;

    const newTask: Task = {
      id: Date.now(),
      name: taskName,
      completed: false,
    };

    const updatedProject = {
      ...selectedProject,
      tasks: [...selectedProject.tasks, newTask],
    };

    const updatedProjects = projects.map(project =>
      project.id === selectedProject.id ? updatedProject : project
    );

    setProjects(updatedProjects);
    setSelectedProject(updatedProject);
  };

  const handleTaskCompletion = (taskId: number) => {
    if (!selectedProject) return;

    const updatedTasks = selectedProject.tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );

    const updatedProject = { ...selectedProject, tasks: updatedTasks };

    const updatedProjects = projects.map(project =>
      project.id === selectedProject.id ? updatedProject : project
    );

    setProjects(updatedProjects);
    setSelectedProject(updatedProject);
  };

  const handleDeleteTask = (taskId: number) => {
    if (!selectedProject) return;

    const updatedTasks = selectedProject.tasks.filter(task => task.id !== taskId);

    const updatedProject = { ...selectedProject, tasks: updatedTasks };

    const updatedProjects = projects.map(project =>
      project.id === selectedProject.id ? updatedProject : project
    );

    setProjects(updatedProjects);
    setSelectedProject(updatedProject);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <h2>Projects</h2>
          <AddProjectForm onAddProject={handleAddProject} />
          <ProjectList
            projects={projects}
            selectedProject={selectedProject}
            onSelectProject={setSelectedProject}
            onDeleteProject={handleDeleteProject}
          />
        </div>
        <div className="col-md-8">
          {selectedProject ? (
            <TaskList
              project={selectedProject}
              onAddTask={handleAddTask}
              onTaskCompletion={handleTaskCompletion}
              onDeleteTask={handleDeleteTask}
            />
          ) : (
            <div>
              <h2>No project selected</h2>
              <p>Please select a project to view its tasks.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<React.StrictMode><App /></React.StrictMode>);
}
