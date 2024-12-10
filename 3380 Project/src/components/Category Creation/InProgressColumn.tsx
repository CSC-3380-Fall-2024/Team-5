import * as React from "react";
import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { IoIosAdd } from "react-icons/io";
import { TiDelete } from "react-icons/ti";
import { AddTaskModal, Task } from "./ToDoColumn";
import {
  createBackendTask,
  deleteBackendTask,
  fetchTasks,
  updateBackendTask,
} from "../../firebase/CategoryCreationCrudFunctions";

const InProgressColumn: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);

  // loads respective tasks into local state of 'inProgress' column
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const fetchedTasks = await fetchTasks("in-progress", teamId);
        console.log("tasks fetched: ", fetchedTasks);
        setTasks(fetchedTasks || []);
      } catch (error) {
        console.error("error loading tasks: ", error);
      }
    };
    loadTasks();
  }, []);

  const teamId = "B18T0M2TwLngVuq8opN1";

  const addTask = async (taskDescription: string) => {
    try {
      const taskRef = await createBackendTask(
        teamId,
        taskDescription,
        "in-progress"
      );
      const newTask: Task = {
        id: taskRef.id,
        description: taskDescription,
        category: "in-progress",
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      await deleteBackendTask(teamId, taskId);
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const updateTask = async (taskDescription: string, taskId: string) => {
    try {
      await updateBackendTask(teamId, taskId, taskDescription, "in-progress");
      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, description: taskDescription } : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleChange = (newDescription: string, taskId: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, description: newDescription } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="cat-container">
      <div className="cat-header">
        <h3 className="cat-title">In Progress</h3>
      </div>
      <div className="cat-body">
        <ul className="cat-list">
          {tasks.map((task, index) => (
            <li key={index} className="cat-item" style={{}}>
              <input
                type="text"
                value={task.description}
                onChange={(e) => handleChange(e.target.value, task.id)}
                onBlur={(e) => updateTask(e.target.value, task.id)}
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
          <h6 style={{ color: "#b1b1b1" }}>Add item</h6>
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

export default InProgressColumn;
