import { useState } from "react";
import "../CSS Files/remoteSelection.css";
import "../CSS Files/CategoryComponent.css";
import "../CSS Files/App.css";
import Tabs from "../components/TabCreation.tsx";
import portrait from "../assets/Default_pfp.png"
import { FcCheckmark } from "react-icons/fc";
import { IoCheckmarkOutline } from "react-icons/io5";
import { database } from "../fireBase 2.js";
function remoteSelection() {
  const dummyTask = ["Task 1"]; //placeholder
  const dummyUser = ["Jordan"]; //placeholder
  const taskRef = database.ref('leads');
  taskRef.on('child_added', function(snapshot) {
    snapshot.forEach(function(childSnapshot){
       const childData = childSnapshot.val();
    });
  });
  const categoryDesignation = taskRef.categoryId;

  if (categoryDesignation == 'to-do'){
    //have it render
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isActive, setIsActive] = useState(false);



const handleClick = () => {
  setIsActive(!isActive);
    
  }

  return (
    <div className="main-container">
      <div className="categories-wrapper">

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
