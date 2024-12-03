import React from "react";
import { IoCreateOutline } from "react-icons/io5";
import { IoIosCloud } from "react-icons/io";
import { FaRegNoteSticky } from "react-icons/fa6";
import { GrTree } from "react-icons/gr";
import { Link } from "react-router-dom";
import  LogOut  from "../components/logOut";


function Sidebar() {
  return (
    <aside id="sidebar">
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <h1 className="sidebar-header">Task Management</h1>
        </div>
        <span className="icon close_icon">X</span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <Link to="/categoryCreation">
            <IoCreateOutline className="icon" /> Category Creation
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/remoteSelection">
            <IoIosCloud className="icon" /> Remote Selection
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/updateNotes">
            <FaRegNoteSticky className="icon" /> Update Notes
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/taskMap">
            <GrTree className="icon" /> Task Map
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/signUp">
            <GrTree className="icon" /> Sign up
          </Link>
        </li>
        <li className ="sidebar-list-item">
          {LogOut()}
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
