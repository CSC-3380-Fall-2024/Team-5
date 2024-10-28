/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { data } from "../data.js";
import "../CSS Files/updateNotes.css";
import { IoChevronDown } from "react-icons/io5";

function updateNotes() {
  const [currentDate, setCurrentDate] = useState(new Date()); //useState update the current date

  const [currentPage, setCurrentPage] = useState(1); //useState update current page
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data.slice(firstIndex, lastIndex); //break down data for table showing
  const npage = Math.ceil(data.length / recordsPerPage); //Calculating number of pages
  const numbers = [...Array(npage + 1).keys()].slice(1); // adding pages into a empty array

  const statusList = ["Start", "Working", "Stuck", "Done"]; //list of statuses for a task

  const [textboxVisible, setTextboxVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const handleNoteClick = (index) => {
    setInputValue(data[index].note);
    setTextboxVisible(true);
  };

  const handleSave = (index) => {
    const updatedData = [...data];
    updatedData[index].note = inputValue; // Update the note in the data
    setTextboxVisible(false); // Hide the textbox after saving
  };

  const handleClose = () => {
    setTextboxVisible(false); // Hide the textbox when closing
  };

  //Use an array to store the selected status for each row
  //Example:[{id:1,status:"Start"},{id:2,status:"Done"}]
  const [statuses, setStatuses] = useState(
    data.map((item) => ({ id: item.id, status: "Select Action" }))
  );

  //Click handler: when a dropdown item is clicked, update the state for that specific row using its id or index
  const handleStatusChange = (id, newStatus) => {
    setStatuses((prevStatuses) =>
      prevStatuses.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  };

  //Click handler: when status is Done, set Date Finish is the current date
  const handleUpdateClick = (id) => {
    if (statuses.find((status) => status.id === id)?.status === "Done") {
      setCurrentDate(new Date());
    }
  };

  //Click handler: go back the page before the current page
  function prePage() {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  }

  //Click handler: go to the nth page
  function changePage(id) {
    setCurrentPage(id);
  }

  //Click handler: go to the page after the current page
  function nextPage() {
    if (currentPage !== npage) setCurrentPage(currentPage + 1);
  }

  return (
    <div className="update_note">
      <div className="w-full overflow-x-auto">
        <table className="table-users">
          <thead>
            <tr>
              <th>Member</th>
              <th>Task</th>
              <th>Note</th>
              <th>StartDate</th>
              <th>DueDate</th>
              <th>Date Finish</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {records.map((item) => (
              <tr key={item.id}>
                <td>{item.member}</td>
                <td>{item.task}</td>
                <td onClick={() => handleNoteClick(item.id)}>
                  <div className="truncate max-w-[200px]">{item.note}</div>
                  {textboxVisible && (
                    <div className="textbox">
                      <div className="textbox-header">
                        <h4>Edit Note</h4>
                        <button className="close-button" onClick={handleClose}>
                          X
                        </button>
                      </div>
                      <textarea
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Edit note here"
                      />
                      <button className="save-button" onClick={handleSave}>
                        Save
                      </button>
                    </div>
                  )}
                </td>
                <td>{item.startDate}</td>
                <td>{item.dueDate}</td>
                <td>
                  {statuses.find((status) => status.id === item.id)?.status ===
                  "Done"
                    ? currentDate.toDateString()
                    : ""}
                </td>
                <td>
                  <div className="dropdown">
                    <div className="dropdown_select">
                      <div className="dropdown_selected">
                        <span>
                          {statuses.find((status) => status.id === item.id)
                            ?.status || "Select Action"}
                        </span>
                        <i className="icon">
                          <IoChevronDown />
                        </i>
                      </div>
                      <ul className="dropdown_list">
                        {statusList.map((option) => (
                          <li
                            key={option}
                            className="dropdown_item"
                            onClick={() => {
                              handleStatusChange(item.id, option);
                              handleUpdateClick(item.id);
                            }}
                          >
                            <span className="dropdown_text">{option}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <nav>
        <ul className="pagination">
          <li className="page-item">
            <a href="#" className="page-link" onClick={prePage}>
              Prev
            </a>
          </li>
          {numbers.map((n, i) => (
            <li
              key={i}
              className={`page-item ${
                currentPage === n ? "active" : "inactive"
              }`}
            >
              <a href="#" className="page-link" onClick={() => changePage(n)}>
                {n}
              </a>
            </li>
          ))}
          <li>
            <a href="#" className="page-link" onClick={nextPage}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default updateNotes;
