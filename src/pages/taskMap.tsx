import React from "react";
import TaskBoard from "../components/TaskBoard"; // Ensure the path is correct

const TaskMap = () => {
  return (
    <div>
      <h1>Task Map</h1>
      <p>Manage your tasks here!</p>

      {/* TaskBoard Component */}
      <TaskBoard />
    </div>
  );
};

export default TaskMap;
