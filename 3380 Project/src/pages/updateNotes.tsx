/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { data } from "../data.js";
import "../styles/updateNotes.css";
import { IoChevronDown } from "react-icons/io5";

function updateNotes() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentDate, setCurrentDate] = useState(new Date());

  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const statusList = ["Start", "Working", "Stuck", "Done"];
  const [statuses, setStatuses] = useState(
    data.map((item) => ({ id: item.id, status: "Select Action" }))
  );

  const handleStatusChange = (id, newStatus) => {
    setStatuses((prevStatuses) =>
      prevStatuses.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  };

  const handleUpdateClick = (id) => {
    if (statuses.find((status) => status.id === id)?.status === "Done") {
      setCurrentDate(new Date());
    }
  };

  function prePage() {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  }

  function changePage(id) {
    setCurrentPage(id);
  }

  function nextPage() {
    if (currentPage !== npage) setCurrentPage(currentPage + 1);
  }

  return (
    <div className="update_note">
      <div className="w-full overflow-x-auto">
        <table className="table-users">
          <thead>
            <tr>
              <th>Project</th>
              <th>Task</th>
              <th>StartDate</th>
              <th>DueDate</th>
              <th>Date Finish</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {records.map((item) => (
              <tr key={item.id}>
                <td>{item.project}</td>
                <td>
                  {item.task}
                  <div className="truncate max-w-[200px]">
                    <span>{item.description}</span>
                  </div>
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
