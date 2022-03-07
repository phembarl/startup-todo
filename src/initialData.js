import { v4 as uuidv4 } from 'uuid';

const initialData = [
  {
    id: uuidv4(),
    title: 'Foundation',
    completed: false,
    tasks: [
      { id: uuidv4(), title: 'Setup virtual office', completed: false },
      { id: uuidv4(), title: 'Set mission & vision', completed: false },
      { id: uuidv4(), title: 'Select business name', completed: false },
      { id: uuidv4(), title: 'Buy domains', completed: false },
    ],
  },
  {
    id: uuidv4(),
    title: 'Discovery',
    completed: false,
    tasks: [
      { id: uuidv4(), title: 'Create road map', completed: false },
      { id: uuidv4(), title: 'Competitor analysis', completed: false },
    ],
  },
];

export default initialData;
