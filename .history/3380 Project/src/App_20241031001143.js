import React from 'react';
import TaskBoard from './components/TaskBoard';

function App() {
    return (
        <UserAuthContextProvider></UserAuthContextProvider>
        <div className="App">
            <TaskBoard />
        </div>
    );
}

export default App;