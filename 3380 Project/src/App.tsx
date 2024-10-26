import React from "react";
import "./App.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CategoryCreation from "./pages/category_creation";
import RemoteSelection from "./pages/remoteSelection";
import UpdateNotes from "./pages/updateNotes";
import TaskMap from "./pages/taskMap";
import SubjectPage from "./SubjectPage";
import SubjectTabs from "./SubjectTabs";

const App: React.FC = () => {
  return (
    <Router>
      <div className="grid-container">
        <Header />
        <Sidebar />
        <SubjectTabs />
        <Routes>
          <Route path="/" element={<CategoryCreation />} />
          <Route path="remoteSelection" element={<RemoteSelection />} />
          <Route path="updateNotes" element={<UpdateNotes />} />
          <Route path="taskMap" element={<TaskMap />} />
          <Route path="subject/:subjectName" element={<SubjectPage />} />{" "}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
