import React from "react";
import { IoCreateOutline } from "react-icons/io5";
import { IoIosCloud } from "react-icons/io";
import { FaRegNoteSticky } from "react-icons/fa6";
import { GrTree } from "react-icons/gr";

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
          <a href="">
            <IoCreateOutline className="icon" /> Category Creation
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="">
            <IoIosCloud className="icon" /> Remote Selection
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="">
            <FaRegNoteSticky className="icon" /> Update Notes
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="">
            <GrTree className="icon" /> Task Map
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
