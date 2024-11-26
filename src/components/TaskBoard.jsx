import React, { useState } from 'react';
  import TaskInput from './TaskInput';
  import TaskBox from './TaskBox';
  import '../CSS Files/Tasks.css';

  

  const TaskBoard = () => {
    const [tasks, setTasks] = useState([]);
    const [draggingTaskIndex, setDraggingTaskIndex] = useState(null);
    const [resizingTaskIndex, setResizingTaskIndex] = useState(null);
    const [dragStartOffset, setDragStartOffset] = useState({ x: 0, y: 0 });
    const [resizeStartSize, setResizeStartSize] = useState({ width: 0, height: 0 });
    const [resizeStartMouse, setResizeStartMouse] = useState({ x: 0, y: 0 });

    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');

    const addTask = (task, x, y) => {
        const defaultSize = 120; 
        setTasks([
            ...tasks,
            {
                ...task,
                position: { x, y },
                size: { width: defaultSize, height: defaultSize },
            },
        ]);
    };

    const handleDragStart = (e, index) => {
        const task = tasks[index];
        setDraggingTaskIndex(index);
        setDragStartOffset({
            x: e.clientX - task.position.x,
            y: e.clientY - task.position.y,
        });
    };

    const handleDragMove = (e) => {
        if (draggingTaskIndex !== null) {
            const updatedTasks = [...tasks];
            updatedTasks[draggingTaskIndex].position = {
                x: e.clientX - dragStartOffset.x,
                y: e.clientY - dragStartOffset.y,
            };
            setTasks(updatedTasks);
        }
    };

    const handleDragEnd = () => {
        setDraggingTaskIndex(null);
    };

    const handleResizeStart = (e, index) => {
        e.stopPropagation(); 
        const task = tasks[index];
        setResizingTaskIndex(index);
        setResizeStartSize({ width: task.size.width, height: task.size.height });

        setResizeStartMouse({
            x: e.clientX,
            y: e.clientY,
        });
    };

    const handleResizeMove = (e) => {
        if (resizingTaskIndex !== null) {
            const updatedTasks = [...tasks];
            const dx = e.clientX - resizeStartMouse.x;
            const dy = e.clientY - resizeStartMouse.y;

            updatedTasks[resizingTaskIndex].size = {
                width: Math.max(50, resizeStartSize.width + dx), 
                height: Math.max(50, resizeStartSize.height + dy),
            };


            updatedTasks[resizingTaskIndex].position = {
                x: updatedTasks[resizingTaskIndex].position.x,
                y: updatedTasks[resizingTaskIndex].position.y,
            };

            setTasks(updatedTasks);
        }
    };

    const handleResizeEnd = () => {
        setResizingTaskIndex(null);
    };

    const handleTaskInputChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const handleDropNewShape = (shapeType, e) => {
        e.preventDefault();
        const taskContainer = e.target.getBoundingClientRect();
        const x = e.clientX - taskContainer.left;
        const y = e.clientY - taskContainer.top;

        if (taskName && taskDescription) {
            addTask({ name: taskName, description: taskDescription, shape: shapeType }, x, y);
        }
    };

    return (
        <div
            className="task-board"
            onMouseMove={(e) => {
                handleDragMove(e);
                handleResizeMove(e);
            }}
            onMouseUp={() => {
                handleDragEnd();
                handleResizeEnd();
            }}
        >
            <div className="task-sidebar">
                <div className="task-input">
                    <input
                        type="text"
                        value={taskName}
                        onChange={handleTaskInputChange(setTaskName)}
                        placeholder="Enter task name"
                    />
                    <textarea
                        value={taskDescription}
                        onChange={handleTaskInputChange(setTaskDescription)}
                        placeholder="Enter task description"
                    />
                </div>
                <div className="shape-selection">
                    <div
                        className="task-shape square"
                        draggable={!!taskName && !!taskDescription}
                        onDragStart={(e) => handleDropNewShape('square', e)}
                        style={{ width: '70px', height: '70px' }}
                    >
                    </div>

                    <div
                        className="task-shape circle"
                        draggable={!!taskName && !!taskDescription}
                        onDragStart={(e) => handleDropNewShape('circle', e)}
                        style={{ width: '70px', height: '70px', borderRadius: '50%' }}
                    >
                    </div>   
                </div>

            </div>
            <div
                className="task-map"
                onDrop={(e) => e.preventDefault()}
                onDragOver={(e) => e.preventDefault()}
            >
                {tasks.map((task, index) => (
                    <div
                        className={`task-shape ${task.shape}`}
                        key={index}
                        style={{
                            left: `${task.position.x}px`,
                            top: `${task.position.y}px`,
                            width: `${task.size.width}px`,
                            height: `${task.size.height}px`,
                            position: 'absolute',
                            borderRadius: task.shape === 'circle' ? '50%' : '0',
                            
                        }}
                        onMouseDown={(e) => handleDragStart(e, index)}
                    >
                        <div className="task-box-shape">
                            <h3>{task.name}</h3>
                            <p>{task.description}</p>
                        </div>                      
                        <div
                            className="resize-handle"
                            onMouseDown={(e) => handleResizeStart(e, index)}
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                width: '10px',
                                height: '10px',
                                backgroundColor: 'blue',
                                cursor: 'nwse-resize',
                            }}
                        ></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskBoard;