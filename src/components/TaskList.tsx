import React from 'react';
import { Project, Task } from '../types';
import AddTaskForm from './AddTaskForm';

interface TaskListProps {
  project: Project;
  onAddTask: (taskName: string) => void;
  onTaskCompletion: (taskId: number) => void;
  onDeleteTask: (taskId: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  project,
  onAddTask,
  onTaskCompletion,
  onDeleteTask,
}) => {
  return (
    <div>
      <h2>{project.name} - Tasks</h2>
      <AddTaskForm onAddTask={onAddTask} />
      <ul className="list-group">
        {project.tasks.map(task => (
          <li key={task.id} className="list-group-item">
            <div className="form-check d-flex justify-content-between align-items-center">
              <div>
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => onTaskCompletion(task.id)}
                  id={`task-${task.id}`}
                />
                <label
                  className={`form-check-label ${
                    task.completed ? 'text-decoration-line-through' : ''
                  }`}
                  htmlFor={`task-${task.id}`}
                >
                  {task.name}
                </label>
              </div>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => onDeleteTask(task.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
