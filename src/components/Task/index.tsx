import './Task.scss';

interface TaskProps {
  id: string;
  checked: boolean;
  disabled: boolean;
  title: string;
  onChange: (id: string, checked: boolean) => void;
}

const Task = ({ checked, title, onChange, id, disabled }: TaskProps) => {
  return (
    <div className="Task">
      <input
        type="checkbox"
        className="Task-checkbox"
        checked={checked}
        onChange={() => onChange(id, checked)}
        disabled={disabled}
      />
      <p>{title}</p>
    </div>
  );
};

export default Task;
