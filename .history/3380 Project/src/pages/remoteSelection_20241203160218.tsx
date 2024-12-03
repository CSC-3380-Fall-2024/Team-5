import { useState } from "react";
import "../CSS Files/remoteSelection.css";
import "../CSS Files/CategoryComponent.css";
import "../CSS Files/App.css";
import Tabs from "../components/TabCreation.tsx";
import portrait from "../assets/Default_pfp.png";
import { FcCheckmark } from "react-icons/fc";
import { IoCheckmarkOutline } from "react-icons/io5";
import "../firebase/firebaseCrud.ts";
import "../fireBase 2.js"

function remoteSelection() {
  const taskRef = database.ref('categoryId');
  taskRef.on('child_added', function())
  const dummyTask = ["Task 1"]; //placeholder
  const dummyUser = ["Jordan"]; //placeholder
  
  
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="main-container">
      <div className="categories-wrapper">
        <div className="task-container">
          {dummyTask.length === 0 ? (
            <p className="no-categories">No Tasks</p>
          ) : (
            dummyTask
          )}
          {isActive && <p className="user">{dummyUser}</p>}

          <button className="task-button" onClick={handleClick}>
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
