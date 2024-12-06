import * as React from "react";
import { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { TiDelete } from "react-icons/ti";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  createBackendTask,
  deleteBackendTask,
  fetchTasks,
  updateBackendTask,
} from "../../firebase/CategoryCreationCrudFunctions";
import "../../CSS Files/Columns.css";

// defines a structure for each task created
export interface Task {
  id: string;
  description: string;
  category: string;
}
const teamId = "B18T0M2TwLngVuq8opN1";

// Modal to accept new tasks
export function AddTaskModal({
  show,
  onHide,
  onAddTask,
}: {
  show: boolean;
  onHide: () => void;
  onAddTask: (taskDescription: string) => void;
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
      handleAddTask();
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
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);

  // renders respective tasks into the ToDoColumn
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const fetchedTasks = await fetchTasks("to-do", teamId);
        console.log("tasks fetched: ", fetchedTasks);
        setTasks(fetchedTasks || []);
      } catch (error) {
        console.error("error loading tasks: ", error);
      }
    };
    loadTasks();
  }, []);

  // adds task to backend and locally
  const addTask = async (taskDescription: string) => {
    try {
      const taskRef = await createBackendTask(teamId, taskDescription, "to-do");
      const newTask: Task = {
        id: taskRef.id,
        description: taskDescription,
        category: "to-do",
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  // deletes task in backend and locally
  const deleteTask = async (taskId: string) => {
    try {
      await deleteBackendTask(teamId, taskId);
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // updates task in backend and locally
  const updateTask = async (taskDescription: string, taskId: string) => {
    try {
      await updateBackendTask(teamId, taskId, taskDescription, "to-do");
      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, description: taskDescription } : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // updates and renders local state of task description while being edited/changed
  const handleChange = (newDescription: string, taskId: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, description: newDescription } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="cat-container">
      <div className="cat-header">
        <h3 className="cat-title">To-Do</h3>
      </div>
      <div className="cat-body">
        <ul className="cat-list">
          {tasks.map((task) => (
            <li key={task.id} className="cat-item">
              <input
                type="text"
                value={task.description}
                onBlur={(e) => updateTask(e.target.value, task.id)}
                onChange={(e) => handleChange(e.target.value, task.id)}
              />
              <TiDelete
                className="delete-task-icon"
                onClick={() => deleteTask(task.id)}
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
