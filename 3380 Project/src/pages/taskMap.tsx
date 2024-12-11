import React, { useState, MouseEvent } from "react";
import "../CSS Files/Tasks.css";

interface Task {
  id: number;
  name: string;
  description: string;
  shape: "square" | "circle";
  position: { x: number; y: number };
  size: { width: number; height: number };
}

const TaskMap: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);
  const [taskName, setTaskName] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [taskNameError, setTaskNameError] = useState<boolean>(false);
  const [draggingTaskId, setDraggingTaskId] = useState<number | null>(null);
  const [dragStartOffset, setDragStartOffset] = useState({ x: 0, y: 0 });
  const [resizingTaskId, setResizingTaskId] = useState<number | null>(null);
  const [resizeStartSize, setResizeStartSize] = useState({
    width: 0,
    height: 0,
  });
  const [resizeStartMouse, setResizeStartMouse] = useState({ x: 0, y: 0 });

  const defaultSize = 120;

  const addTask = (shapeType: "square" | "circle", x: number, y: number) => {
    if (!taskName.trim()) {
      setTaskNameError(true);
      return;
    }

    setTasks([
      ...tasks,
      {
        id: tasks.length + 1,
        name: taskName,
        description: taskDescription,
        shape: shapeType,
        position: { x, y },
        size: { width: defaultSize, height: defaultSize },
      },
    ]);
    setTaskName("");
    setTaskDescription("");
    setTaskNameError(false);
  };

  const toggleSidebar = () => setSidebarVisible((prev) => !prev);

  const handleDragStart = (e: MouseEvent, taskId: number) => {
    const task = tasks.find((task) => task.id === taskId);
    if (!task) return;

    setDraggingTaskId(taskId);
    setDragStartOffset({
      x: e.clientX - task.position.x,
      y: e.clientY - task.position.y,
    });
  };

  const handleDragMove = (e: MouseEvent) => {
    if (draggingTaskId === null) return;

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === draggingTaskId
          ? {
              ...task,
              position: {
                x: e.clientX - dragStartOffset.x,
                y: e.clientY - dragStartOffset.y,
              },
            }
          : task
      )
    );
  };

  const handleResizeStart = (e: MouseEvent, taskId: number) => {
    e.stopPropagation();
    const task = tasks.find((task) => task.id === taskId);
    if (!task) return;

    setResizingTaskId(taskId);
    setResizeStartSize({ width: task.size.width, height: task.size.height });
    setResizeStartMouse({ x: e.clientX, y: e.clientY });
  };

  const handleResizeMove = (e: MouseEvent) => {
    if (resizingTaskId === null) return;

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === resizingTaskId
          ? {
              ...task,
              size: {
                width: Math.max(
                  50,
                  resizeStartSize.width + (e.clientX - resizeStartMouse.x)
                ),
                height: Math.max(
                  50,
                  resizeStartSize.height + (e.clientY - resizeStartMouse.y)
                ),
              },
            }
          : task
      )
    );
  };

  const clearAllTasks = () => setTasks([]);
  const deleteRecentTask = () =>
    setTasks((prevTasks) => prevTasks.slice(0, -1));

  return (
    <div
      className="task-board"
      onMouseMove={(e) => {
        handleDragMove(e);
        handleResizeMove(e);
      }}
      onMouseUp={() => {
        setDraggingTaskId(null);
        setResizingTaskId(null);
      }}
    >
      {/* Sidebar */}
      <button className="sidebar-toggle-button" onClick={toggleSidebar}>
        {sidebarVisible ? "Hide Sidebar" : "Show Sidebar"}
      </button>

      <div className={`sidebar ${sidebarVisible ? "visible" : "hidden"}`}>
        <div className="task-input">
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Task Name"
            className={taskNameError ? "error" : ""}
          />
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="Task Description"
          />
        </div>
        <div className="shape-selection">
          <div
            className="task-shape square"
            onClick={() => addTask("square", 50, 50)}
          ></div>
          <div
            className="task-shape circle"
            onClick={() => addTask("circle", 50, 50)}
          ></div>
        </div>
      </div>

      {/* Task Map */}
      <div className="task-map">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`task-shape ${task.shape}`}
            onMouseDown={(e) => handleDragStart(e, task.id)}
            style={{
              left: `${task.position.x}px`,
              top: `${task.position.y}px`,
              width: `${task.size.width}px`,
              height: `${task.size.height}px`,
              position: "absolute",
            }}
          >
            <div className="task-box-shape">
              <h3>{task.name}</h3>
              <p>{task.description}</p>
            </div>
            <div
              className="resize-handle"
              onMouseDown={(e) => handleResizeStart(e, task.id)}
            ></div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="clear-all-btn" onClick={clearAllTasks}>
          Clear All
        </button>
        <button className="delete-recent-btn" onClick={deleteRecentTask}>
          Delete Recent
        </button>
      </div>
    </div>
  );
};

export default TaskMap;
