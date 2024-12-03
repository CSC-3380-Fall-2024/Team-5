import React from 'react';
import TaskBoard from './components/TaskBoard';
import Login from "./pages/signIn"
import Signup from "./pages/signUp"
import { UserAuthContextProvider } from ""
function App() {
    return (
       <UserAuthContextProvider>
        <div className="App">
            <TaskBoard />
        </div>
        </UserAuthContextProvider>
    );
}

export default App;