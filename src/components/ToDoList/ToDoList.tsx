import React, { useState, useEffect, ChangeEvent, useCallback } from 'react';
import { Button, Checkbox, TextInput, Tile } from '@carbon/react';
import './ToDoList.scss';

interface Task {
  text: string;
  isCompleted: boolean;
}

const LOCAL_STORAGE_KEY = 'tasks';

const ToDoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState<string>('');

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = useCallback(() => {
    if (newTask.trim()) {
      setTasks(prevTasks => [...prevTasks, { text: newTask, isCompleted: false }]);
      setNewTask('');
    }
  }, [newTask]);

  const toggleTask = useCallback((index: number) => {
    setTasks(prevTasks =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  }, []);

  const deleteTask = useCallback((index: number) => {
    setTasks(prevTasks => prevTasks.filter((_, i) => i !== index));
  }, []);

  const handleNewTaskChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  }, []);

  return (
    <div className="todo-list-container">
      <Tile className="todo-list-tile">
        <div className="task-input-container">
          <TextInput
            id="new-task"
            labelText="New Task"
            value={newTask}
            onChange={handleNewTaskChange}
            placeholder="Enter a new task"
          />
          <Button onClick={addTask} className="add-task-button">Add Task</Button>
        </div>
        <ul className="todo-list">
          {tasks.map((task, index) => (
            <li key={index} className="todo-list-item">
              <Checkbox
                id={`task-${index}`}
                labelText={task.text}
                checked={task.isCompleted}
                onChange={() => toggleTask(index)}
              />
              <Button kind="ghost" onClick={() => deleteTask(index)} className="delete-button">Delete</Button>
            </li>
          ))}
        </ul>
      </Tile>
    </div>
  );
};

export default ToDoList;
