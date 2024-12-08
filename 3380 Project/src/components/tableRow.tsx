import { IoChevronDown } from "react-icons/io5";

function TableRow({
  row,
  handleNoteClick,
  handleTaskClick,
  statuses,
  handleStatusChange,
  handleUpdateClick,
  currentDate,
}) {
  const status =
    statuses.find((status) => status.id === row.id)?.status || "Select Action";

  return (
    <tr key={row.id}>
      <td>
        {row.firstName} {row.lastName}
      </td>
      <td onClick={() => handleTaskClick(row.id)}>
        <div className="truncate max-w-[200px]">
          {row.task || "Click to add"}
        </div>
      </td>
      <td onClick={() => handleNoteClick(row.id)}>
        <div className="truncate max-w-[200px]">
          {row.note || "Click to add"}
        </div>
      </td>
      <td>{row.startDate}</td>
      <td>{row.dueDate}</td>
      <td>{status === "Done" ? currentDate.toDateString() : ""}</td>
      <td>
        <div className="dropdown">
          <div className="dropdown_select">
            <div className="dropdown_selected">
              <span>{row.action || status}</span>
              <i className="icon">
                <IoChevronDown />
              </i>
            </div>
            <ul className="dropdown_list">
              {["Start", "Working", "Stuck", "Done"].map((option) => (
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
  );
}

export default TableRow;
