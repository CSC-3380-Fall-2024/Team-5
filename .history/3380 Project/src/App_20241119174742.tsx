import "./CSS Files/App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CategoryCreation from "./pages/category_creation";
import RemoteSelection from "./pages/remoteSelection";
import UpdateNotes from "./pages/updateNotes";
import TaskMap from "./pages/taskMap";
function App() {
  const userData = 
  [
    
     user: "LeBron"
     task: "Task 1"
     image: "../src/assets/Default_pfp.svg.png"
  ];
  return (
    <Router>
      <div className="grid-container">
        <Header />
        <Sidebar />
        <main className="main-container">
          <Routes>
            <Route path="/" element={<CategoryCreation />} />
            <Route path="remoteSelection" element={<RemoteSelection />} />
            <Route path="updateNotes" element={<UpdateNotes />} />
            <Route path="taskMap" element={<TaskMap />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
