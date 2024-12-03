import "./CSS Files/App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CategoryCreation from "./pages/category_creation";
import RemoteSelection from "./pages/remoteSelection";
import UpdateNotes from "./pages/updateNotes";
import TaskMap from "./pages/taskMap";
import SignUp from "./pages/signUp";
import Login from "./pages/signIn";
import SubjectPage from "./pages/SubjectPage";
import SubjectTabs from "./components/SubjectTabs";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./UserAuthContext";

function App() {
  return (
    
    <Router>
      
      <div className="grid-container">
      
        <Header />
        <Sidebar />
        <SubjectTabs />
        
        <main className="main-container">
        <UserAuthContextProvider>
          <Routes>
          
            <Route path="/home" element={<ProtectedRoute<CategoryCreation />} />
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="remoteSelection" element={<RemoteSelection />} />
            <Route path="updateNotes" element={<UpdateNotes />} />
            <Route path="taskMap" element={<TaskMap />} />
            <Route path="signUp" element={<SignUp />} />
            <Route path="signIn" element={<Login />} />
            <Route path="subject/:subjectName" element={<SubjectPage />} />{" "}
          </Routes>
          </UserAuthContextProvider>
        </main>
        
      </div>
      
    </Router>
    
  );
}

export default App;
