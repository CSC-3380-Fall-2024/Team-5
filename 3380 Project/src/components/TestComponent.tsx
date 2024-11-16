import React, { useState } from "react";
import "../CSS Files/CategoryComponent.css";
import { AiFillDelete } from "react-icons/ai";
import { IoIosAdd } from "react-icons/io";
import { TiDelete } from "react-icons/ti";
import { createTask, updateTask, deleteTask } from "../firebase/firebaseCrud";

interface CategoryComponentProps {
  onDelete: () => void;
}
const teamId = "pCH0HpCWXtRMAUKsUJFQ";

function CategoryComponent({ onDelete }: CategoryComponentProps) {
  const [catName, setCatName] = useState<string>(""); //state to update and render category name
  const [tasks, setTasks] = useState<{ id: string; description: string }[]>([]); //state to update and render tasks

  //called when the user clicks the add task icon
  const addTask = async () => {
    try {
      const newTaskDescription = "New Task";
      const taskId = await createTask(teamId, "to-do", newTaskDescription);

      if (taskId) {
        setTasks((prevTasks) => [
          ...prevTasks,
          { id: taskId, description: newTaskDescription },
        ]);
      }
    } catch (error) {
      console.error("Error adding task: ", error);
    }
  };

  //called when the user starts typing to store the task
  const updatedTask = (index: number, value: string) => {
    const updatedTasks = [...tasks]; //fills array with previous tasks
    updatedTasks[index].description = value; //updates the task at the specified index
    setTasks(updatedTasks); //updates and renders the new tasks array
    const taskId = tasks[index].id;
    updateTask(teamId, taskId, tasks[index].description);
  };

  //called when the user clicks the delete task icon
  const deleteTasks = (index: number) => {
    const updatedTasks = [...tasks]; //fills array with previous tasks
    updatedTasks.splice(index, 1); //removes 1 task at the specified index
    setTasks(updatedTasks); //updates and renders the new tasks array
    const taskId = tasks[index].id;
    deleteTask(teamId, taskId);
  };

  //called when the user presses enter or backspace
  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Enter") {
      addTask(); //adds a new task when user presses enter
    }
    if (e.key === "Backspace" && tasks[index].description.length === 0) {
      //only deletes when the field is empty
      deleteTasks(index); //deletes a task when user presses backspace
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
                value={task.description}
                placeholder="Task"
                onChange={(e) => updatedTask(index, e.target.value)}
                onKeyDown={(e) => handleKeyPress(e, index)}
              />
              <TiDelete
                className="delete-task-icon"
                onClick={() => deleteTasks(index)}
              />
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
