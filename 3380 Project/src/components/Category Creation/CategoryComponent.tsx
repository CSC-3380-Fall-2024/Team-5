import { useState } from "react";
import '../../CSS Files/CategoryComponent.css';
import { AiFillDelete } from "react-icons/ai";
import { IoIosAdd } from "react-icons/io";
import { TiDelete } from "react-icons/ti";
import { createTask, updateTask } from "../../firebase/firebaseCrud";
import { AddTaskModal } from "./ToDoColumn";

interface CategoryComponentProps {
  onDelete: () => void;
}
const teamId = "Tl7Ph2s1udw5ceTihmDJ";
const categoryId = "to-do";
const taskId = "rvYTZyNdZairBPAKWP60";
const taskDescription = "I am testing this function...Did it work??";

//set to have a constant category of "to-do","in progress", and "done" that the users can use for tasks
function CategoryComponent({ onDelete }: CategoryComponentProps) {
  const [catName, setCatName] = useState<string>(""); //state to update and render category name
  const [tasks, setTasks] = useState<string[]>([]); //state to update and render tasks
  const [showModal, setShowModal] = useState(false);

   const addTask = (task: string) => {
    if (task.trim()) {
      setTasks([...tasks, task]);
    }
  };

  const deleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const updateTask = (index: number, newTask: string) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = newTask;
    setTasks(updatedTasks);
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
            <li key={index} className="cat-item" style={{}}>
              <input
                type="text"
                value={task}
                onChange={(e) => updateTask(index, e.target.value)}
              />
              <TiDelete
                className="delete-task-icon"
                onClick={() => deleteTask(index)}
              />
            </li>
          ))}
        </ul>
        <div style={{fontSize: "12px", display: "flex", alignContent: "center", position: "relative", left: "20px"}}>
          <IoIosAdd
            className="add-task-icon"
            onClick={() => setShowModal(true)}
          />
          <h6 style={{color: "#8b97ad"}}>Add item</h6>
        </div>

        <AddTaskModal
          show={showModal}
          onHide={() => setShowModal(false)}
          onAddTask={addTask}
        />
        <AiFillDelete className="delete-category-icon" onClick={onDelete} />
      </div>
    </div>
  );
};

export default CategoryComponent;
