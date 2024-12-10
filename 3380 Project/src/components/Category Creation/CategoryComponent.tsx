import { useEffect, useState } from "react";
import "../../CSS Files/CategoryComponent.css";
import { AiFillDelete } from "react-icons/ai";
import { IoIosAdd } from "react-icons/io";
import { TiDelete } from "react-icons/ti";
import { Task, AddTaskModal } from "../Category Creation/ToDoColumn";
import {
  AddTitleModal,
  useCategory,
  Category,
} from "../../pages/category_creation";
import {
  createBackendCategoryTask,
  deleteBackendCategoryTask,
  fetchBackendCategoryTasks,
  updateBackendCategoryTask,
  updateBackendCategoryTitle,
} from "../../firebase/CategoryCreationCrudFunctions";

// defines a structure for each category component
interface CategoryComponentProps {
  categoryId: string;
  title: string;
  onDelete: () => void;
}

const teamId = "B18T0M2TwLngVuq8opN1";

function CategoryComponent({
  categoryId,
  title,
  onDelete,
}: CategoryComponentProps) {
  const [tasks, setTasks] = useState<Task[]>([]); //inherits 'Task' type from 'ToDoColumn' and saves tasks locally for custom categories
  const [showTaskModal, setShowTaskModal] = useState(false); // Used to enable Add Task modal
  const [editTitle, setEditTitle] = useState(title); // Used to update the title in real time by storing value in local state
  const {
    category,
    setCategory,
    showTitleModal,
    setShowTitleModal,
  } = useCategory(); // defines needed states

  // fetches task data from backend and loads it into local state to render
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const fetchedTasks = await fetchBackendCategoryTasks(
          teamId,
          categoryId
        );
        console.log("tasks fetched: ", fetchedTasks);
        const updatedTasks = fetchedTasks.map((task) => ({
          id: task.id,
          description: task.description,
          category: "custom",
        }));
        setTasks(updatedTasks);
      } catch (error) {
        console.error("error loading tasks: ", error);
      }
    };
    loadTasks();
  }, []);

  // adds task to backend and renders it with local state
  const addTask = async (taskDescription: string) => {
    try {
      const taskRef = await createBackendCategoryTask(
        teamId,
        categoryId,
        taskDescription
      );
      const newTask: Task = {
        id: taskRef?.id || "",
        description: taskDescription,
        category: "custom",
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  // deletes task from the backend and from the local state
  const deleteTask = async (taskId: string, categoryId: string) => {
    try {
      await deleteBackendCategoryTask(teamId, taskId, categoryId);
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // updates task description from the backend and locally
  const updateTask = async (taskDescription: string, taskId: string) => {
    try {
      await updateBackendCategoryTask(
        teamId,
        categoryId,
        taskId,
        taskDescription
      );
      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, description: taskDescription } : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Updates title from the backend and at it's respective category locally
  const updateCategoryTitle = async (newTitle: string, catId: string) => {
    try {
      await updateBackendCategoryTitle(teamId, catId, newTitle);
      const updatedTitle = category.map((cat) =>
        cat.id === catId ? { ...cat, title: newTitle } : cat
      );
      setCategory(updatedTitle);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // updates and renders local state in real time while task is being edited
  const handleTaskChange = (newDescription: string, taskId: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, description: newDescription } : task
    );
    setTasks(updatedTasks);
  };

  // updates and renders local state while title is being edited
  const handleTitleChange = (newTitle: string) => {
    setEditTitle(newTitle);
  };

  return (
    <div className="cat-container">
      <div className="cat-header">
        <label>
          <input
            value={editTitle} // set to local state
            onChange={(e) => handleTitleChange(e.target.value)} // updates local state while editing
            onBlur={
              (e) =>
                updateBackendCategoryTitle(teamId, categoryId, e.target.value) //updates on the backend when user clicks away, indicating they are done editng
            }
          />
        </label>
      </div>
      <div className="cat-body">
        <ul className="cat-list">
          {tasks.map((task, index) => (
            <li key={index} className="cat-item" style={{}}>
              <input
                type="text"
                value={task.description}
                onChange={(e) => handleTaskChange(e.target.value, task.id)} //similar functionality as title editing
                onBlur={(e) => updateTask(e.target.value, task.id)}
              />
              <TiDelete
                className="delete-task-icon"
                onClick={() => deleteTask(task.id, categoryId)}
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
            onClick={() => setShowTaskModal(true)}
          />
          <h6 style={{ color: "#b1b1b1" }}>Add item</h6>
        </div>
        <AddTitleModal
          show={showTitleModal}
          onHide={() => setShowTitleModal(false)}
          onAddTitle={(title) => updateCategoryTitle(title, categoryId)}
        />
        <AddTaskModal
          show={showTaskModal}
          onHide={() => setShowTaskModal(false)}
          onAddTask={addTask}
        />
        <AiFillDelete className="delete-category-icon" onClick={onDelete} />
      </div>
    </div>
  );
}

export default CategoryComponent;
