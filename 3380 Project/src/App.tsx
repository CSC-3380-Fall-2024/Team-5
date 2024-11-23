import "./CSS Files/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CategoryCreation from "./pages/category_creation";
import RemoteSelection from "./pages/remoteSelection";
import UpdateNotes from "./pages/updateNotes";
import TaskMap from "./pages/taskMap";
import SignUp from "./pages/signUp";
import {SignIn} from "./pages/signIn";
import SubjectPage from "./pages/SubjectPage";
import BaseLayout from "./components/BaseLayout";

import { AuthProvider } from "./authContext";
import ProtectedRoute from "./components/Protected";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="signUp" element={<SignUp />} />
          <Route path="signIn" element={<SignIn />} />

          <Route
            path="categoryCreation"
            element={
              <ProtectedRoute>
                <BaseLayout>
                  <CategoryCreation />
                </BaseLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/remoteSelection"
            element={
              <ProtectedRoute>
                <BaseLayout>
                  <RemoteSelection />
                </BaseLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="updateNotes"
            element={
              <ProtectedRoute>
                <BaseLayout>
                  <UpdateNotes />
                </BaseLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="taskMap"
            element={
              <ProtectedRoute>
                <BaseLayout>
                  <TaskMap />
                </BaseLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="subject/:subjectName"
            element={
              <ProtectedRoute>
                <BaseLayout>
                  <SubjectPage />
                </BaseLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
