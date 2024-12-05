import React, { useState } from 'react';
import TaskInput from './TaskInput';
import TaskBox from './TaskBox';
import '../CSS Files/Tasks.css';

interface Task {
  id: string;
  content: string;
  position: {
    x: number;
    y: number;
  };
}

interface TaskBoardProps {}

const TaskBoard: React.FC<TaskBoardProps> = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    const newYPosition = tasks.length * (80 + 20);
    setTasks([...tasks, { ...task, position: { x: 0, y: newYPosition } }]);
  };

  const updateTaskPosition = (index: number, newPosition: { x: number; y: number }) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].position = newPosition;
    setTasks(updatedTasks);
  };

  const deleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="task-board">
      <div className="task-boxes">
        {tasks.map((task, index) => (
          <TaskBox
            key={task.id}
            task={task}
            index={index}
            updateTaskPosition={updateTaskPosition}
            deleteTask={deleteTask}
          />
        ))}
      </div>
      <TaskInput addTask={addTask} />
    </div>
  );
};

export default TaskBoard;
