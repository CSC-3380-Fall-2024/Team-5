/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { data } from "../data.js";
import "../CSS Files/updateNotes.css";
import TableRow from "../components/tableRow";
import Pagination from "../components/Pagination";
import InputModal from "../components/inputModal";
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
          task: user.task,
          note: user.note,
          startDate: task.startDate,
          dueDate: task.dueDate,
          dateFinish: task.dateFinish,
          action: user.action,
        }));
      })
      .flat(); // Flatten the array because map() returns an array of arrays

    setTableData(combinedData); // Update the table state with combined data
  }, [users]);

  const [currentPage, setCurrentPage] = useState(1); //useState update current page
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = tableData.slice(firstIndex, lastIndex); //break down data for table showing
  const npage = Math.ceil(tableData.length / recordsPerPage); //Calculating number of pages

  const [textboxVisible, setTextboxVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputType, setInputType] = useState(""); // Track which field ("Task" or "Note")
  const [currentIndex, setCurrentIndex] = useState(null);

  //Use an array to store the selected status for each row
  //Example:[{id:1,status:"Start"},{id:2,status:"Done"}]
  const [statuses, setStatuses] = useState(
    data.map((item) => ({ id: item.id, status: "Select Action" }))
  );

  const handleFieldClick = (index, field) => {
    setInputValue(tableData[index][field]);
    setCurrentIndex(index);
    setInputType(field); // Set the field type (either "task" or "note")
    setTextboxVisible(true);
  };

  const handleSave = (value) => {
    const updatedData = [...tableData];
    updatedData[currentIndex][inputType] = value; // Update the correct field (task or note)
    setInputValue(updatedData[currentIndex][inputType]); //Call the parent function to update data
    setTextboxVisible(false); // Hide the textbox after saving
    setCurrentIndex(null);
    updateDoc(doc(database, `teams/${teamId}/members/`, auth.currentUser.uid), {
      [inputType]: value, //Update the corresponding field in the database
    });
  };

  const handleClose = () => {
    setTextboxVisible(false); // Hide the textbox when closing
    setCurrentIndex(null); //Reset current index
  };

  console.log(tableData);
  //Click handler: when a dropdown item is clicked, update the state for that specific row using its id or index
  const handleStatusChange = (id, newStatus) => {
    setStatuses((prevStatuses) =>
      prevStatuses.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
    // Save the updated action to Firestore for the correct user
    updateDoc(doc(database, `teams/${teamId}/members/`, auth.currentUser.uid), {
      action: newStatus, // Save the selected action to Firestore
    }).catch((error) => console.error("Error updating action:", error));
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
              <TableRow
                key={index}
                row={row}
                handleNoteClick={(id) => handleFieldClick(id, "note")}
                handleTaskClick={(id) => handleFieldClick(id, "task")} // Add this line to handle task click
                statuses={statuses}
                handleStatusChange={handleStatusChange}
                handleUpdateClick={handleUpdateClick}
                currentDate={currentDate}
              />
            ))}
          </tbody>
        </table>
        {textboxVisible && (
          <InputModal
            label={inputType === "task" ? "Task" : "Note"} // Display the correct label based on the field type
            value={inputValue}
            setValue={setInputValue}
            onSave={handleSave}
            onClose={handleClose}
          />
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        npage={npage}
        changePage={changePage}
        prePage={prePage}
        nextPage={nextPage}
      />
    </div>
  );
}
export default updateNotes;
