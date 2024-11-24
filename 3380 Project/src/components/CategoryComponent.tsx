import React, { useState } from "react";
import "../CSS Files/CategoryComponent.css";
import { AiFillDelete } from "react-icons/ai";
import { IoIosAdd } from "react-icons/io";
import { TiDelete } from "react-icons/ti";


interface CategoryComponentProps {
  onDelete: () => void;
}

//set to have a constant category of "to-do","in progress", and "done" that the users can use for tasks
function CategoryComponent({ onDelete }: CategoryComponentProps) {
  const defaultCategories = ["To-Do", "In Progress", "Done"];
  const [tasks, setTasks] = useState<{ [key: string]: string[]}> ({
    "To-Do": [],
    "In Progress": [],
    "Done":[],
  });
  const [newCategory, setNewCategory] = useState<string>("");

  //called when the user clicks the add task icon
  const addTask = (category: string) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [category]: [...prevTasks[category], ""]
    })); 
  }; //calls an empty array and holds previous tasks that have been added

  //called when the user starts typing to store the task
  const updateTask = (category: string, index: number, value: string) => {
    const updatedTasks = {...tasks}; //fills array with previous tasks
    updatedTasks[category][index] = value; //updates the task at the specified index
    setTasks(updatedTasks); //updates and renders the new tasks array
  };

  //called when the user clicks the delete task icon
  const deleteTask = (category:string, index: number) => {
    const updatedTasks = {...tasks}; //fills array with previous tasks
    updatedTasks[category].splice(index, 1); //removes 1 task at the specified index
    setTasks(updatedTasks); //updates and renders the new tasks array
  };

  //called when the user presses enter or backspace
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, category: string, index: number) => {
    if (e.key === "Enter") {
      addTask(category); //adds a new task when user presses enter
    }
    if (e.key === "Backspace" && tasks[index].length === 0) { //only deletes when the field is empty
      deleteTask(category, index); //deletes a task when user presses backspace
    }
  };

    //adds a new custom category that the user may change and rename
  const addCategory = () => {
    if (newCategory.trim() !== "" && !defaultCategories.includes(newCategory)) {
      setTasks((prevTasks) => ({
        ...prevTasks,
        [newCategory]: []
      }));
      setNewCategory(""); //reset category input 
    }
  }
/*
    //removes an existing custom category
  const deleteCategory = (category :string) => {
    if (!defaultCategories.includes(category)) {
      const updatedTasks = {...tasks};
      delete updatedTasks[category];
      setTasks(updatedTasks);
    }
  };
*/
  return (
    <div className="cat-container">
      <div className="category-columns">
      {defaultCategories.map((category) => (
        <div key={category} className="category-columns">
          <div className="cat-header">
            <label>
              <input
                type="text"
                value={category}
                readOnly
                placeholder="Category Name"
                disabled
              />
            </label>
      </div>
      <div className="cat-body">
        <ul className="cat-list">
          {tasks[category].map((task, index) => (
            <li key={index} className="cat-item">
              <input
                type="text"
                value={task}
                placeholder="Task"
                onChange={(e) => updateTask(category, index, e.target.value)}
                onKeyDown = {(e) => handleKeyPress(e, category, index)}
              />
                
                <TiDelete                
                  className="delete-task-icon"
                  onClick={() => deleteTask(category, index)}
                />
            </li> 
          ))}
          <IoIosAdd className="add-task-icon" onClick={() => addTask(category)}
          />
        </ul>
      </div>
      <AiFillDelete
      className="delete-category-icon"
      onClick={() => {}}
      style={{visibility: "hidden"}}
      />
      </div>
    ))}

  {Object.keys(tasks).map((category) => {
    if (!defaultCategories.includes(category)) {
      return (
        <div key={category} className="category-column">
          <div className="cat-header">
            <label>
              <input
                type = "text"
                value = {category}
                onChange={(e) => {}}
                placeholder="Category Name"
              /> 
            </label>
          </div>
        <div className="cat-body">
          <ul className="cat-list">
            {tasks[category].map((task, index) => (
              <li key={index} className="cat-item">
                <input
                  type="text"
                  value={task}
                  placeholder="Task"
                  onChange={(e) => updateTask(category, index, e.target.value)}
                  onKeyDown={(e) => handleKeyPress(e, category, index)}
                />
                <TiDelete className="delete-task-icon" onClick={() => deleteTask(index)} />
              </li>
            ))}
            <IoIosAdd className="add-task-icon" onClick={addTask} />
          </ul>
        </div>
        <AiFillDelete 
        className="delete-category-icon" 
        onClick={() => onDelete()} 
        />
      </div>
    );
  }
  return null;
  })}

    <div className="add-category section">
      <input
        type="text"
        value={newCategory}
        placeholder= "New Category Name"
        onChange= {(e) => setNewCategory(e.target.value)}
      />
        <button onClick={addCategory}> Add Category </button>
      </div>
    </div>
  </div>
  );
}

  

export default CategoryComponent;