import { useEffect, useState } from "react";
import "../CSS Files/remoteSelection.css";
import "../CSS Files/CategoryComponent.css";
import "../CSS Files/App.css";
import { FcCheckmark } from "react-icons/fc";
import { IoCheckmarkOutline } from "react-icons/io5";
import { fetchTasks } from "../firebase/CategoryCreationCrudFunctions.js";

const teamId = "B18T0M2TwLngVuq8opN1";

//Interface solely to store data into useState array later
interface Tasks {
  id: string;
  description: string;
}
function remoteSelection() {

  const [task, setTask] = useState<Tasks[]>([]);
  const [isActive, setIsActive] = useState(false);
  //loads tasks
  const loadTasks = async () => {
    try {
      const fetchedTasks = await fetchTasks("to-do", teamId);
      const updatedTasks = fetchedTasks.map((tasks) => ({
        id: tasks.id,
        description: tasks.description,
      }));
      setTask(updatedTasks); //LOAD THE TASKS I BEG OF YOU
    } catch (error) {
      console.error("error loading tasks: ", error);
    }
  };
  //once a change has been made, load tasks from to-do
  useEffect(() => {
    loadTasks();
    console.log("loaded tasks")
  }, []);
  
  

  //handles click op

  const handleClick = () => {
    setIsActive(!isActive);
  };
 
  return (
    <div className="main-container">
      <div className="categories-wrapper">
        <div className="task-container">
          {task.length === 0 ? (
            <p className="no-categories">No Tasks</p>
          ) : (
           task.map((tasks) => tasks.description)
          )}
          {isActive && <p className="user">{"Jordan"}</p>}

          <button className="task-button"  onClick={() => handleClick}>
            {isActive ? (
              <FcCheckmark className="task-icon" />
            ) : (
              <IoCheckmarkOutline className="second-icon" />
            )}
          </button>
            
          </div>

          
      
      </div>
    </div>
  );
}

export default remoteSelection;
