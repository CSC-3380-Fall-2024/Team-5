import React, { useState } from 'react';
  import TaskInput from './TaskInput';
  import TaskBox from './TaskBox';
  import './Tasks.css';
  
  const TaskBoard = () => {
      const [tasks, setTasks] = useState([]);
  
      const addTask = (task) => {
          const newYPosition = tasks.length * (80 + 20); // Spacing logic
          setTasks([...tasks, { ...task, position: { x: 0, y: newYPosition } }]);
      };
  
      const updateTaskPosition = (index, newPosition) => {
          const updatedTasks = [...tasks];
          updatedTasks[index].position = newPosition;
          setTasks(updatedTasks);
      };
  
      const deleteTask = (index) => {
          const updatedTasks = tasks.filter((_, i) => i !== index);
          setTasks(updatedTasks);
      };
  
      return (
          <div className="task-board">
              <div className="task-boxes">
                  {tasks.map((task, index) => (
                      <TaskBox
                          key={index}
                          task={task}
                          index={index}
                          updateTaskPosition={updateTaskPosition}
                          deleteTask={deleteTask} // Pass delete function as a prop
                      />
                  ))}
              </div>
              <TaskInput addTask={addTask} />
          </div>
      );
  };
  
  export default TaskBoard;