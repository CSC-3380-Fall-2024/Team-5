import React, { useState } from "react";
import { IoCreateOutline } from "react-icons/io5";
import { IoIosCloud } from "react-icons/io";
import { FaRegNoteSticky } from "react-icons/fa6";
import { GrTree } from "react-icons/gr";
import { Link } from "react-router-dom";

import { IoArrowForwardCircle, IoArrowBackCircle } from "react-icons/io5";

function Sidebar() {
  const [isCollapsed, setIsCollaped] = useState(false);
  const toggleSidebar = () => {
    setIsCollaped(!isCollapsed);
  }
  return (
    <aside id="sidebar" className={isCollapsed? "collapsed" : "expanded"}>
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <h1 className="sidebar-header">Task Management</h1>
        </div>
        <span className="icon close_icon">X</span>
      </div>

      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isCollapsed ? (
          <IoArrowForwardCircle className="toggle-icon"/>
        ) : (
          <IoArrowBackCircle className="toggle-icon"/>
        )}
      </button>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <Link to="/categorycreation">
            <IoCreateOutline className="icon" /> {isCollapsed ? "" : "Category Creation"}
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/remoteSelection">
            <IoIosCloud className="icon" /> {isCollapsed ? "" : "Remote Selection"}
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/updateNotes">
            <FaRegNoteSticky className="icon" /> {isCollapsed ? "" : "Update Notes"}
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/taskMap">
            <GrTree className="icon" /> {isCollapsed ? "" : "Task Map"}
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;

