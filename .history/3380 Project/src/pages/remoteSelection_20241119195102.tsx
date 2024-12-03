import React, {useRef, useState, } from "react";
import "../CSS Files/remoteSelection.css";
import "../CSS Files/CategoryComponent.css";
import "../CSS Files/App.css"
import Tabs from "../components/TabCreation.tsx";
import portrait from "../assets/Default_pfp.png"
import { FcCheckmark } from "react-icons/fc";
import CheckIcon from '@mui/icons-material/Check';


function remoteSelection() {
 const dummyTask = ["Task 1"]; //placeholder
 //const dummyUser = ["lebron"]//placeholder
  //Updates array that holds user ID and tasks assigned to them

const  [isActive, setIsActive] = useState(false);
const  [isHovering, setIsHovering] = useState(false);

const handleMouseOver = () => {
  setIsHovering(true);
};

const handleMouseOut = () => {
  setIsHovering(false);
};

const handleClick = () => {
  setIsActive(!isActive);
    
  }

  return (
    <div className="main-container">
      <div className="categories-wrapper">

       <div className="task-container">
        {dummyTask.length === 0 ? (<p  className="no-categories">No Tasks</p>) : (dummyTask)
        } 
        <div>
         <img src="https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png" ></img>
         </div>
         
        <button
          className="task-button" 
          onClick={handleClick}
          
          >
           {isActive ? (<FcCheckmark className="task-icon"/>) : (<CheckIcon className="second-icon"/>)}
          </button>
            
          </div>

          
      
      </div>
   </div>
  )
}

export default remoteSelection

