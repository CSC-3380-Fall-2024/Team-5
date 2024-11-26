import * as React from "react";
import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { IoIosAdd } from "react-icons/io";
import { TiDelete } from "react-icons/ti";
import {AddTaskModal} from './ToDoColumn';

interface ToDoComponentProps {
  onDelete: () => void;
}

const ToDoColumn: React.FC<ToDoComponentProps> = ({ onDelete }) => {
  const [tasks, setTasks] = useState<string[]>([]);
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
        <h3 className="cat-title">Done</h3>
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
      </div>
    </div>
  );
};
export default ToDoColumn;
