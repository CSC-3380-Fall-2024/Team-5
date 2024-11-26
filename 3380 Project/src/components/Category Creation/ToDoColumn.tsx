import * as React from "react";
import { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { TiDelete } from "react-icons/ti";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../CSS Files/Columns.css";

export function AddTaskModal({
  show,
  onHide,
  onAddTask,
}: {
  show: boolean;
  onHide: () => void;
  onAddTask: (task: string) => void;
}) {
  const [input, setInput] = useState("");

  const handleAddTask = () => {
    if (input.trim()) {
      onAddTask(input.trim());
      setInput("");
      onHide();
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTask(); //adds a new task when user presses enter
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="custom-modal"
      centered
      style={{ display: "flex", margin: "auto" }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add a Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-input-container">
          <input
            className="task-input"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            placeholder="Enter task description"
            onKeyDown={(e) => handleKeyPress(e)}
          />
          <Button
            variant="outline-primary"
            onClick={handleAddTask}
            style={{
              position: "relative",
              width: "10vh",
              height: "3.5vh",
              justifyContent: "center",
            }}
          >
            <h6>Add</h6>
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

const ToDoColumn: React.FC = () => {
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
        <h3 className="cat-title">To-Do</h3>
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
        <div
          style={{
            fontSize: "12px",
            display: "flex",
            alignContent: "center",
            position: "relative",
            left: "20px",
          }}
        >
          <IoIosAdd
            className="add-task-icon"
            onClick={() => setShowModal(true)}
          />
          <h6 style={{ color: "#8b97ad" }}>Add item</h6>
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
