import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ToDoList from '../components/ToDoList/ToDoList';

describe('ToDoList Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders the component', () => {
    render(<ToDoList />);
    expect(screen.getByText('New Task')).toBeInTheDocument();
    expect(screen.getByText('Add Task')).toBeInTheDocument();
  });

  test('adds a new task', () => {
    render(<ToDoList />);
    const input = screen.getByLabelText('New Task');
    const button = screen.getByText('Add Task');

    fireEvent.change(input, { target: { value: 'Test Task' } });
    fireEvent.click(button);

    expect(screen.getByLabelText('Test Task')).toBeInTheDocument();
  });

  test('toggles a task', () => {
    render(<ToDoList />);
    const input = screen.getByLabelText('New Task');
    const button = screen.getByText('Add Task');

    fireEvent.change(input, { target: { value: 'Test Task' } });
    fireEvent.click(button);

    const checkbox = screen.getByLabelText('Test Task');
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  test('deletes a task', () => {
    render(<ToDoList />);
    const input = screen.getByLabelText('New Task');
    const button = screen.getByText('Add Task');

    fireEvent.change(input, { target: { value: 'Test Task' } });
    fireEvent.click(button);

    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    expect(screen.queryByLabelText('Test Task')).not.toBeInTheDocument();
  });

  test('tasks are saved to and loaded from localStorage', () => {
    localStorage.setItem('tasks', JSON.stringify([{ text: 'Saved Task', completed: false }]));

    render(<ToDoList />);

    expect(screen.getByLabelText('Saved Task')).toBeInTheDocument();
  });
});
