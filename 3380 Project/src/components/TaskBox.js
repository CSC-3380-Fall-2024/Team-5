import React, { useRef, useEffect, useState } from 'react';

const TaskBox = ({ task, index, updateTaskPosition, deleteTask }) => {
    const boxRef = useRef();
    const [isDragging, setIsDragging] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseDown = (e) => {
        e.preventDefault();
        setIsDragging(true);

        const shiftX = e.clientX - boxRef.current.getBoundingClientRect().left;
        const shiftY = e.clientY - boxRef.current.getBoundingClientRect().top;

        const moveAt = (pageX, pageY) => {
            const newPosition = {
                x: pageX - shiftX,
                y: pageY - shiftY
            };
            updateTaskPosition(index, newPosition);
        };

        const onMouseMove = (e) => {
            moveAt(e.pageX, e.pageY);
        };

        const onMouseUp = () => {
            setIsDragging(false);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    const handleDelete = () => {
        deleteTask(index); // Call the delete function passed as a prop
    };

    useEffect(() => {
        boxRef.current.style.position = 'absolute';
        boxRef.current.style.left = `${task.position.x}px`;
        boxRef.current.style.top = `${task.position.y}px`;
    }, [task.position]);

    return (
        <div
            className="task-box"
            ref={boxRef}
            onMouseDown={handleMouseDown}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
            <h3>{task.name}</h3>
            <p>{task.description}</p>
            {isHovered && (
                <button className="delete-button" onClick={handleDelete}>
                    &times; {/* Unicode for multiplication sign, looks like an "x" */}
                </button>
            )}
        </div>
    );
};

export default TaskBox;