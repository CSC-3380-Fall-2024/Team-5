import "./CSS Files/App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CategoryCreation from "./pages/category_creation";
import RemoteSelection from "./pages/remoteSelection";
import UpdateNotes from "./pages/updateNotes";
import TaskMap from "./pages/taskMap";
import SignUp from "./pages/signUp";
import SignIn from "./pages/signIn";
import SubjectPage from "./pages/SubjectPage";
import SubjectTabs from "./components/SubjectTabs";
import { AuthProvider, useAuth } from "./authContext";
import ProtectedRoute from "./components/Protected";
import LogOut from "./components/logOut";

function App() {
  //const { getContacts } = useAuth();
  return (
    <Router>
      <div className="grid-container">
        <Header />
        <Sidebar />
        <SubjectTabs />
        <logOut />

        <main className="main-container">
          <AuthProvider>
            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route
                path="CategoryCreation"
                element={
                  <ProtectedRoute>
                    <CategoryCreation />
                  </ProtectedRoute>
                }
              />
              <Route
                path="remoteSelection"
                element={
                  <ProtectedRoute>
                    <RemoteSelection />
                  </ProtectedRoute>
                }
              />
              <Route
                path="updateNotes"
                element={
                  <ProtectedRoute>
                    <UpdateNotes />
                  </ProtectedRoute>
                }
              />
              <Route
                path="taskMap"
                element={
                  <ProtectedRoute>
                    <TaskMap />
                  </ProtectedRoute>
                }
              />
              <Route path="signUp" element={<SignUp />} />
              <Route path="signIn" element={<SignIn />} />
              <Route
                path="subject/:subjectName"
                element={<SubjectPage />}
              />{" "}
              <Route path="logOut" element={<LogOut/>} />
            </Routes>
          </AuthProvider>
        </main>
      </div>
    </Router>
  );
}

export default App;
