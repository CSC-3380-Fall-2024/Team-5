import "./App.css";
import { IoChevronDown } from "react-icons/io5";

const tableData = [
  {
    id: 1,
    project: "OOP Programing",
    task: "Coding Payment function",
    prescription:
      "This is sample prescription about task of this project This is sample prescription about task of this project This is sample prescription about task of this project This is sample prescription about task of this project.This is sample prescription about task of this project",
    startDate: "10/03/2024",
    dueDate: "10/17/2024",
    status: "Processing",
    action: "Working",
  },
  {
    id: 2,
    project: "OOP Programing",
    task: "Coding Payment function",
    prescription: "This is sample prescription about task of this project",
    startDate: "10/03/2024",
    dueDate: "10/17/2024",
    status: "Processing",
    action: "Working",
  },
  {
    id: 3,
    project: "OOP Programing",
    task: "Coding Payment function",
    prescription: "This is sample prescription about task of this project",
    startDate: "10/03/2024",
    dueDate: "10/17/2024",
    status: "Processing",
    action: "Working",
  },
  {
    id: 4,
    project: "OOP Programing",
    task: "Coding Payment function",
    prescription: "This is sample prescription about task of this project",
    startDate: "10/03/2024",
    dueDate: "10/17/2024",
    status: "Processing",
    action: "Working",
  },
  {
    id: 5,
    project: "OOP Programing",
    task: "Coding Payment function",
    prescription: "This is sample prescription about task of this project",
    startDate: "10/03/2024",
    dueDate: "10/17/2024",
    status: "Processing",
    action: "Working",
  },
];

function UpdateNote() {
  return (
    <div className="update_note">
      {
        <div>
          <div className="w-full overflow-x-auto">
            <table className="table-users">
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Task</th>
                  <th>StartDate</th>
                  <th>DueDate</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((item) => (
                  <tr>
                    <td>{item.project}</td>

                    <td>
                      {item.task}
                      <div className="truncate max-w-[200px]">
                        <span>{item.prescription}</span>
                      </div>
                    </td>

                    <td>{item.startDate}</td>
                    <td>{item.dueDate}</td>
                    <td>{item.dueDate}</td>
                    <td>
                      <div className="dropdown">
                        <div className="dropdown_select">
                          <span className="dropdown_selected">
                            Action
                            <IoChevronDown className="icon" />
                          </span>
                          <i className="fa fa-caret-down dropdown_caret"></i>
                        </div>
                        <ul className="dropdown_list">
                          <li className="dropdown_item">
                            <span className="dropdown_text">Start</span>
                            <i className="fas fa-plus-circle dropdown_icon"></i>
                          </li>
                          <li className="dropdown_item">
                            <span className="dropdown_text">Working</span>
                            <i className="fas fa-plus-circle dropdown_icon"></i>
                          </li>
                          <li className="dropdown_item">
                            <span className="dropdown_text">Stuck</span>
                            <i className="fas fa-plus-circle dropdown_icon"></i>
                          </li>
                          <li className="dropdown_item">
                            <span className="dropdown_text">Done</span>
                            <i className="fas fa-plus-circle dropdown_icon"></i>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      }
    </div>
  );
}

export default UpdateNote;
