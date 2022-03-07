import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState, SyntheticEvent } from 'react';
import Phase from '../Phase';
import initialData from '../../initialData';
import './Phases.scss';

type Task = { id: string; title: string; completed: boolean };
type PhaseType = {
  id: string;
  title: string;
  completed: boolean;
  tasks: Task[];
};

const Phases = () => {
  const phaseJson = localStorage.getItem('all-phases');
  const initalState = phaseJson !== null ? JSON.parse(phaseJson) : initialData;

  const [allPhases, setAllPhases] = useState(initalState);
  const [uselessFact, setuselessFact] = useState('');
  const [showFact, setShowFact] = useState(false);
  const [newPhaseTitle, setNewPhaseTitle] = useState('');

  const handleChange = (
    phaseId: string,
    taskId: string,
    completed: boolean
  ) => {
    //  create copy of state to alter
    const allPhasesCopy = [...allPhases];
    const selectedPhase = allPhasesCopy.find(phase => phase.id === phaseId);
    const selectedPhaseIndex = allPhasesCopy.findIndex(
      phase => phase.id === phaseId
    );

    const selectedTaskIndex = selectedPhase?.tasks.findIndex(
      (task: Task) => task.id === taskId
    );

    if (selectedTaskIndex !== undefined) {
      allPhasesCopy[selectedPhaseIndex].tasks[selectedTaskIndex].completed =
        !completed;

      const incompleteTask = allPhasesCopy[selectedPhaseIndex].tasks.find(
        (task: Task) => task.completed !== true
      );

      if (!incompleteTask) {
        allPhasesCopy[selectedPhaseIndex].completed = true;
      } else {
        allPhasesCopy[selectedPhaseIndex].completed = false;
      }
    }

    // update state to updated/altered copy
    setAllPhases(allPhasesCopy);
  };

  const fetchFact = async () => {
    try {
      const response = await fetch(
        'https://uselessfacts.jsph.pl/random.json?language=en'
      );
      const data = await response.json();
      setuselessFact(data?.text);
      setShowFact(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    localStorage.setItem('all-phases', JSON.stringify(allPhases));

    const incompletePhase = allPhases.find(
      (phase: PhaseType) => phase.completed !== true
    );

    if (!incompletePhase) {
      fetchFact();
    } else {
      setShowFact(false);
    }
  }, [allPhases]);

  const addPhase = (e: SyntheticEvent) => {
    e.preventDefault();

    setAllPhases([
      ...allPhases,
      {
        id: uuidv4(),
        title: newPhaseTitle,
        completed: false,
        tasks: [],
      },
    ]);

    setNewPhaseTitle('');
  };

  const removePhase = (phaseId: string) => {
    //  create copy of state to alter
    const allPhasesCopy = [...allPhases];

    const selectedPhaseIndex = allPhasesCopy.findIndex(
      phase => phase.id === phaseId
    );

    allPhasesCopy.splice(selectedPhaseIndex, 1);

    // update state to updated/altered copy
    setAllPhases(allPhasesCopy);
  };

  const addTask = (phaseId: string, title: string) => {
    const allPhasesCopy = [...allPhases];

    const selectedPhaseIndex = allPhasesCopy.findIndex(
      phase => phase.id === phaseId
    );

    allPhasesCopy[selectedPhaseIndex].tasks = [
      ...allPhasesCopy[selectedPhaseIndex].tasks,
      { id: uuidv4(), title, completed: false },
    ];

    setAllPhases(allPhasesCopy);
  };

  return (
    <div className="Phases">
      <div style={{ marginBottom: '1.5rem' }}>
        <form onSubmit={addPhase}>
          <input
            placeholder="Add a new phase"
            value={newPhaseTitle}
            onChange={({ target }) => setNewPhaseTitle(target.value)}
            style={{ marginBottom: '2rem' }}
            type="text"
            className="Phases-input"
          />
          <button
            type="submit"
            className="Phases-btn"
            disabled={!newPhaseTitle}
          >
            Add New Phase
          </button>
        </form>
      </div>
      {allPhases.map((data: PhaseType, i: number) => {
        const { tasks } = data;
        const incompleteTask = tasks.find(task => task.completed !== true);
        const disabled = i > 0 ? !allPhases[i - 1].completed : false;

        const isComplete = tasks.length ? !incompleteTask : false;
        return (
          <div key={uuidv4()} style={{ marginBottom: '3rem' }}>
            <Phase
              id={data.id}
              index={i + 1}
              title={data.title}
              completed={isComplete}
              tasks={tasks}
              handleChange={handleChange}
              disabled={disabled}
              handleDelete={removePhase}
              handleAddTask={addTask}
            />
          </div>
        );
      })}
      {showFact && (
        <p className="Phases-fact">
          {' '}
          I did't need to know that: <em>{uselessFact}</em>{' '}
        </p>
      )}
    </div>
  );
};

export default Phases;
