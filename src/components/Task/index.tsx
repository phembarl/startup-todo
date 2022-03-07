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
      <label
        style={{ marginTop: '1rem', marginBottom: '1rem', cursor: 'pointer' }}
      >
        <input
          type="checkbox"
          className="Task-checkbox"
          checked={checked}
          onChange={() => onChange(id, checked)}
          disabled={disabled}
        />
        {title}
      </label>
    </div>
  );
};

export default Task;
