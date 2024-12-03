import React from 'react';
import TaskBoard from './components/TaskBoard';
import Login from "./pages/signIn";
import Signup from "./pages/signUp";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "src/UserAuthContext";
import { Route } from 'react-router-dom';
import Home from "./components/Home";
function App() {
    return (
       
        <div className="App">
            <TaskBoard />
        </div>
        <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
        </UserAuthContextProvider>
    );
}

export default App;