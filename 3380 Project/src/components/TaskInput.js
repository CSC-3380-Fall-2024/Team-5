import React, { useState } from 'react';

  const TaskInput = ({ addTask }) => {
      const [name, setName] = useState('');
      const [description, setDescription] = useState('');
  
      const handleSubmit = (e) => {
          e.preventDefault();
          if (name && description) {
              addTask({ name, description });
              setName('');
              setDescription('');
          }
      };
  
      return (
          <form className="task-input" onSubmit={handleSubmit}>
              <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Task Name" 
                  required 
              />
              <input 
                  type="text" 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  placeholder="Task Description" 
                  required 
              />
              <button type="submit">Add Task</button>
          </form>
      );
  };
  
  export default TaskInput;