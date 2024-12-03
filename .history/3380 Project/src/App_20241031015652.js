import React from 'react';
import TaskBoard from './components/TaskBoard';
import 
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