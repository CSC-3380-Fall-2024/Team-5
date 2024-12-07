import { useState } from "react";
import "../CSS Files/remoteSelection.css";
import "../CSS Files/CategoryComponent.css";
import "../CSS Files/App.css";
import Tabs from "../components/TabCreation.tsx";
//import portrait from "../assets/Default_pfp.svg.png";
import { FcCheckmark } from "react-icons/fc";
import { IoCheckmarkOutline } from "react-icons/io5";

function remoteSelection() {
  const dummyTask = ["swag"]; //placeholder
  //const dummyUser = ["lebron"]//placeholder
  //Updates array that holds user ID and tasks assigned to them

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="main-container">
      <div className="categories-wrapper">
        <Tabs>
          <div className="Tasks">
            <div className="task-container">
              {dummyTask.length === 0 ? (
                <p className="no-categories">No Tasks</p>
              ) : (
                dummyTask
              )}
              <button className="task-button" onClick={handleClick}>
                {isActive ? (
                  <FcCheckmark className="task-icon" />
                ) : (
                  <IoCheckmarkOutline className="second-icon" />
                )}
              </button>
              test
            </div>
          </div>
          <div className="Users">test</div>
        </Tabs>
      </div>
    </div>
  );
}

export default remoteSelection;
