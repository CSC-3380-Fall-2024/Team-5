/*
import React from "react";
import {DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskBox from './TaskBox';
import TaskInuput from './TaskInput'; 
import './App.css';

const TaskBoard = () => {
    const [tasks, setTasks] = useState([]);
  
    const handleAddTask = (task) => {
      setTasks([...tasks, task]);
    };
  
    const handleDragEnd = (result) => {
      if (!result.destination) return;
  
      const reorderedTasks = Array.from(tasks);
      const [removed] = reorderedTasks.splice(result.source.index, 1);
      reorderedTasks.splice(result.destination.index, 0, removed);
      setTasks(reorderedTasks);
    };
  
    return (
      <div className="App">
        <h1>Task Map</h1>
        <TaskInuput onAddTask={handleAddTask} />
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="taskBoard">
            {(provided) => (
              <div
                className="task-container"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {tasks.map((task, index) => (
                  <TaskBox key={task.id} task={task} index={index} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  };
  
  export default TaskBoard;
  */

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