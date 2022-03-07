import { useState, SyntheticEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import CheckIcon from '../../assets/images/check.png';
import TrashIcon from '../../assets/images/trash.png';
import Task from '../Task';

import './Phase.scss';

interface PhaseProps {
  id: string;
  index: number;
  title: string;
  completed: boolean;
  disabled: boolean;
  tasks: { id: string; title: string; completed: boolean }[];
  handleChange: (phaseId: string, taskId: string, completed: boolean) => void;
  handleDelete: (phaseId: string) => void;
  handleAddTask: (phaseId: string, title: string) => void;
}

const Phase = ({
  id,
  index,
  title,
  completed,
  disabled,
  tasks,
  handleChange,
  handleDelete,
  handleAddTask,
}: PhaseProps) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleTaskChange = (taskId: string, completed: boolean) => {
    handleChange(id, taskId, completed);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    handleAddTask(id, newTaskTitle);
  };

  return (
    <div className="Phase">
      <div className="Phase-container">
        <div className="Phase-index">{index}</div>
        <p className="Phase-title">{title}</p>
        <div className="Phase-completed">
          {completed && <img src={CheckIcon} alt="checked" width="40" />}
        </div>

        <div className="Phase-trash" onClick={() => handleDelete(id)}>
          <img src={TrashIcon} alt="checked" width="30" />
        </div>
      </div>

      <div>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="New task"
            type="text"
            value={newTaskTitle}
            onChange={({ target }) => setNewTaskTitle(target.value)}
            className="Phase-input"
          />
          <button className="Phase-btn" type="submit" disabled={!newTaskTitle}>
            Add New Task
          </button>
        </form>
      </div>

      <div className="Phase-tasks">
        {tasks.map(t => (
          <Task
            id={t.id}
            key={uuidv4()}
            checked={t.completed}
            title={t.title}
            onChange={handleTaskChange}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
};

export default Phase;
