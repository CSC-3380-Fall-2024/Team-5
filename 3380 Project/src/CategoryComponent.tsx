import React, { useState } from "react";
import "./CSS Files/CategoryComponent.css";
import { AiFillDelete } from "react-icons/ai";
import { IoIosAdd } from "react-icons/io";
import { TiDelete } from "react-icons/ti";


interface CategoryComponentProps {
  onDelete: () => void;
}

function CategoryComponent({ onDelete }: CategoryComponentProps) {
  const [catName, setCatName] = useState<string>(""); //state to update and render category name
  const [tasks, setTasks] = useState<string[]>([""]); //state to update and render tasks

  //called when the user clicks the add task icon
  const addTask = () => {
    setTasks([...tasks, ""]); //adds an empty string to the tasks array to create a new task
  };

  //called when the user starts typing to store the task
  const updateTask = (index: number, value: string) => {
    const updatedTasks = [...tasks]; //fills array with previous tasks
    updatedTasks[index] = value; //updates the task at the specified index
    setTasks(updatedTasks); //updates and renders the new tasks array
  };

  //called when the user clicks the delete task icon
  const deleteTask = (index: number) => {
    const updatedTasks = [...tasks]; //fills array with previous tasks
    updatedTasks.splice(index, 1); //removes 1 task at the specified index
    setTasks(updatedTasks); //updates and renders the new tasks array
  };

  //called when the user presses enter or backspace
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Enter") {
      addTask(); //adds a new task when user presses enter
    }
    if (e.key === "Backspace" && tasks[index].length === 0) { //only deletes when the field is empty
      deleteTask(index); //deletes a task when user presses backspace
    }
  };

  return (
    <div className="cat-container">
      <div className="cat-header">
        <label>
          <input
            type="text"
            value={catName}
            placeholder="Category Name"
            onChange={(e) => setCatName(e.target.value)}
          />
        </label>
      </div>
      <div className="cat-body">
        <ul className="cat-list">
          {tasks.map((task, index) => (
            <li key={index} className="cat-item">
              <input
                type="text"
                value={task}
                placeholder="Task"
                onChange={(e) => updateTask(index, e.target.value)}
                onKeyDown={(e) => handleKeyPress(e, index)}
              />
              <TiDelete className="delete-task-icon" onClick={() => deleteTask(index)} />
            </li>
          ))}
          <IoIosAdd className="add-task-icon" onClick={addTask} />
        </ul>
      </div>
      <AiFillDelete className="delete-category-icon" onClick={onDelete} />
    </div>
  );
}

export default CategoryComponent;