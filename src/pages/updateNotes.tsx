/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { data } from "../data.js";
import "../CSS Files/updateNotes.css";
import { IoChevronDown } from "react-icons/io5";
import Users from "../components/User.jsx";
import { useAuth } from "../authContext";
import { auth, database } from "../firebase/firebase";
import { updateDoc, doc } from "firebase/firestore";

function updateNotes() {
  const teamId = "Tl7Ph2s1udw5ceTihmDJ";
  const { users } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date()); //useState update the current date
  //useState to mamage table data
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    // Process the user list and task data into table rows
    const combinedData = users
      .map((user, index) => {
        // Match user with the task data based on userId (index in this case)
        const taskData = data.filter((task) => task.id === index);
        return taskData.map((task) => ({
          id: task.id,
          firstName: user.firstName,
          lastName: user.lastName,
          date: task.date,
          task: task.task,
          note: task.note,
          startDate: task.startDate,
          dueDate: task.dueDate,
          dateFinish: task.dateFinish,
          action: task.action,
        }));
      })
      .flat(); // Flatten the array because map() returns an array of arrays

    setTableData(combinedData); // Update the table state with combined data
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const [currentPage, setCurrentPage] = useState(1); //useState update current page
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = tableData.slice(firstIndex, lastIndex); //break down data for table showing
  const npage = Math.ceil(tableData.length / recordsPerPage); //Calculating number of pages
  const numbers = [...Array(npage + 1).keys()].slice(1); // adding pages into a empty array

  const statusList = ["Start", "Working", "Stuck", "Done"]; //list of statuses for a task

  const [textboxVisible, setTextboxVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [currentIndex, setCurrentIndex] = useState(null);

  const handleNoteClick = (index) => {
    setInputValue(tableData[index].note);
    setCurrentIndex(index);
    setTextboxVisible(true);
  };

  const handleSave = () => {
    const updatedData = [...tableData];
    updatedData[currentIndex].note = inputValue; // Update the note in the data
    setInputValue(updatedData[currentIndex].note); //Call the parent function to update data
    setTextboxVisible(false); // Hide the textbox after saving
    setCurrentIndex(null);
    updateDoc(doc(database, `teams/${teamId}/members/`, auth.currentUser.uid), {
      note: inputValue,
    });
  };

  const handleClose = () => {
    setTextboxVisible(false); // Hide the textbox when closing
    setCurrentIndex(null); //Reset current index
  };
  //Use an array to store the selected status for each row
  //Example:[{id:1,status:"Start"},{id:2,status:"Done"}]
  const [statuses, setStatuses] = useState(
    data.map((item) => ({ id: item.id, status: "Select Action" }))
  );
  console.log(tableData);
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
            {records.map((row, index) => (
              <tr key={index}>
                <td>
                  {row.firstName} {row.lastName}
                </td>
                <td>{row.task}</td>
                <td onClick={() => handleNoteClick(row.id)}>
                  <div className="truncate max-w-[200px]">
                    {row.note || "Click to add"}
                  </div>
                </td>
                <td>{row.startDate}</td>
                <td>{row.dueDate}</td>
                <td>
                  {statuses.find((status) => status.id === row.id)?.status ===
                  "Done"
                    ? currentDate.toDateString()
                    : ""}
                </td>
                <td>
                  <div className="dropdown">
                    <div className="dropdown_select">
                      <div className="dropdown_selected">
                        <span>
                          {statuses.find((status) => status.id === row.id)
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
                              handleStatusChange(row.id, option);
                              handleUpdateClick(row.id);
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
        {textboxVisible && (
          <div className="modal-overlay">
            <div className="popup-form">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                autoFocus
              />
              <button onClick={handleSave}>Save</button>
              <button onClick={handleClose}>Close</button>
            </div>
          </div>
        )}
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
