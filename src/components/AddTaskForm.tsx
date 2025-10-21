import React, { useState } from 'react';

interface AddTaskFormProps {
  onAddTask: (taskName: string) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAddTask }) => {
  const [newTaskName, setNewTaskName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskName.trim() === '') return;
    onAddTask(newTaskName);
    setNewTaskName('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="New task name"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">Add Task</button>
      </div>
    </form>
  );
};

export default AddTaskForm;
