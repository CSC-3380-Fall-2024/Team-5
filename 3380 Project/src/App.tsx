import "./CSS Files/App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CategoryCreation from "./pages/category_creation";
import RemoteSelection from "./pages/remoteSelection";
import UpdateNotes from "./pages/updateNotes";
import TaskMap from "./pages/taskMap";
<<<<<<< HEAD
import SignUp from "./pages/signUp";
import SignIn from "./pages/signIn";
=======
import SubjectPage from "./pages/SubjectPage";
import SubjectTabs from "./components/SubjectTabs";

>>>>>>> 40ced36c8dc96141e052e2a64bf978c616e92a6a
function App() {
  return (
    <Router>
      <div className="grid-container">
        <Header />
        <Sidebar />
        <SubjectTabs />
        <main className="main-container">
          <Routes>
            <Route path="/" element={<CategoryCreation />} />
            <Route path="remoteSelection" element={<RemoteSelection />} />
            <Route path="updateNotes" element={<UpdateNotes />} />
            <Route path="taskMap" element={<TaskMap />} />
<<<<<<< HEAD
            <Route path="signUp" element={<SignUp />} />
            <Route path="signIn" element={<SignIn />} />
=======
            <Route path="subject/:subjectName" element={<SubjectPage />} />{" "}
>>>>>>> 40ced36c8dc96141e052e2a64bf978c616e92a6a
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
