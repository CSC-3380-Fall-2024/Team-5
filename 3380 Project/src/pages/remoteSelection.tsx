import { useEffect, useState } from "react";
import RemoteSelectionComponent from "../components/RemoteSelectionComponent.tsx"
import "../CSS Files/remoteSelection.css";
import "../CSS Files/CategoryComponent.css";
import "../CSS Files/App.css";

import { fetchTasks } from "../firebase/CRUD/CategoryCreationCrudFunctions.ts";
import { auth } from "../firebase/firebase.ts";

const teamId = "B18T0M2TwLngVuq8opN1";

//Interface solely to store data into useState array later
export interface Tasks {
  id: string;
  description: string;
  element: JSX.Element;
}

function remoteSelection() {

  const [task, setTask] = useState<Tasks[]>([]);
  //loads tasks
  const loadTasks = async () => {
    try {
      const fetchedTasks = await fetchTasks("to-do", teamId);
      const updatedTasks = fetchedTasks.map((tasks) => ({
        id: tasks.id,
        description: tasks.description,
        element: (
        <RemoteSelectionComponent
          id={tasks.id}
          description={tasks.description}
        />
        ),
      }));
      setTask(updatedTasks); //LOAD THE TASKS I BEG OF YOU
      
    } catch (error) {
      console.error("error loading tasks: ", error);
    }
  };
  //once a change has been made, load tasks from to-do
  useEffect(() => {
    loadTasks();
    console.log("loaded tasks")
  }, []);
  
  


 
  return (
    <div className="main-container">
        <div className="categories-container">
         {task.map((tasks) => tasks.element)}
      </div>
    </div>
  );
}

export default remoteSelection;
