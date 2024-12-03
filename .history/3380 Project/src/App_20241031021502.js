import React from 'react';
import TaskBoard from './components/TaskBoard';
import Login from "./pages/signIn";
import Signup from "./pages/signUp";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "src/UserAuthContext";
import { Route } from 'react-router-dom';
function App() {
    return (
       <UserAuthContextProvider>
        <Routes>
            <Route
                path="/home"
                element={<ProtectedRoute>

                </ProtectedRoute>}
        <div className="App">
            <TaskBoard />
        </div>
        </UserAuthContextProvider>
    );
}

export default App;