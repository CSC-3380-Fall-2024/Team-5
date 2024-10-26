import React, {useRef, useState, } from "react";
import "../CSS Files/remote.css";
import "../CSS Files/CategoryComponent.css";
import "../CSS Files/App.css"
import Tabs from "../components/TabCreation";
import portrait from "../assets/Default_pfp.svg.png"
import { FcCheckmark } from "react-icons/fc";
import CheckIcon from '@mui/icons-material/Check'; //Run npm install @mui/material 


function remoteSelection() {
 const dummyTask = ["swag"]; //placeholder
 //const dummyUser = ["lebron"]//placeholder
  

const  [isActive, setIsActive] = useState(false);

//Flag to check if the task button is selected or not
const handleClick = () => {
  setIsActive(!isActive);
    
  }

  return (
    <div className="main-container">
      <div className="categories-wrapper">
      <Tabs>
       <div label="Tasks">
        <div className="task-container">
          {dummyTask.length === 0 ? (<p  className="no-categories">No Tasks</p>) : (dummyTask)
          } 
        
          <button
            className="task-button" 
            onClick={handleClick}
          
            >
            {isActive ? (<FcCheckmark className="task-icon"/>) : (<CheckIcon className="second-icon"/>)}
            </button>
             test
            </div>

          </div>
          <div label="Users">
             <img src = {portrait} />
              test
         </div>
      </Tabs>
    </div>
   </div>
  );
}

export default remoteSelection
