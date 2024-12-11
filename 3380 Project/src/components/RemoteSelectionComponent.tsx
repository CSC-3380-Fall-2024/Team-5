import { useEffect, useState } from "react";
import "../CSS Files/remoteSelection.css";
import "../CSS Files/CategoryComponent.css";
import "../CSS Files/App.css";
import { FcCheckmark } from "react-icons/fc";
import { IoCheckmarkOutline } from "react-icons/io5";
import { fetchTasks } from "../firebase/CRUD/CategoryCreationCrudFunctions";
import {
  creation,
  fetchAssigned,
  unassignYourself,
  getUsers,
} from "../firebase/CRUD/RemoteSelectionCRUD";
import { auth } from "../firebase/firebase";
//interface so tsx stops yelling at me
interface RemoteSelectionProps {
  id: string;
  description: string;
}
interface Task {
  id: string;
  description: string;
  name: string;
}
//team id
const teamId = "B18T0M2TwLngVuq8opN1";
//user route
const userId = "Tl7Ph2s1udw5ceTihmDJ";

function RemoteComponent({ id, description }: RemoteSelectionProps) {
  const [tasks, setTasks] = useState<Task[]>([]); //tasks to render
  const [assignBack, setAssignBack] = useState<RemoteSelectionProps[]>([]); //assigned tasks
  const [signUp, setSignUp] = useState(false); //signing up for tasks
  const [pillarId, setPillarId] = useState(""); //putting the id here because ive lost control of my life
  const [username, setUsername] = useState(""); //username storage

  useEffect(() => {
    // gets the username of the current user
    const displayName = auth.currentUser.displayName;
    //stores it in backend
    setUsername(displayName);
    const loadTasks = async () => {
      try {
        const fetchedTasks = await fetchTasks("to-do", teamId); //fetches all tasks in to-do
        const updatedTasks = fetchedTasks.map((tasks) => ({
          //wowie it maps it
          id: tasks.id,
          description: tasks.description,
          name: displayName,
        }));
        //this literally impedes nothing i have no idea why its red i love and hate comp sci
        setTasks(updatedTasks); //LOAD THE TASKS I BEG OF YOU
      } catch (error) {
        console.error("error loading tasks: ", error);
      }
      //loads assignment
      try {
        const fetchedAssignment = await fetchAssigned(username, teamId);
        const updatedAssignment = fetchedAssignment.map((assignBack) => ({
          id: assignBack.id,
          description: assignBack.description,
          name: displayName,
        }));
        setAssignBack(updatedAssignment);
      } catch (error) {
        console.error("error loading assignments: ", error);
      }
    };
    loadTasks();
    console.log("loaded tasks in selection component");
    //half finished way to check each user for the assignment
    //const gonnaCheck = async () => {    //checking to see if any user has the task assigned to them
    //try {
    //const fetchedUsers = await getUsers(userId);
    //const usersWith
    //}
    //}
  }, []);
  const displayName = auth.currentUser.displayName;
  //assign yourself a task, and have that data stored in the backend
  const assignTask = async (taskDescription: string) => {
    try {
      const taskRef = await creation(userId, taskDescription, username);

      const newTask: RemoteSelectionProps = {
        id: taskRef?.id || "",
        description: taskDescription,
      };
      setPillarId(taskRef?.id);
      setAssignBack((newTask) => [...newTask]);
    } catch (error) {
      console.error("error creating assignment: ", error);
    }
  };
  //unassigns task
  const unassignTask = async (
    groupId: string,
    taskId: string,
    user: string
  ) => {
    try {
      await unassignYourself(groupId, taskId, user);
      const filterTasks = assignBack.filter(
        (assignBack) => assignBack.id != taskId
      );
      setAssignBack(filterTasks);
    } catch (error) {
      console.error("Error unassigning task:", error);
    }
  };

  let tmpItem = ""; //empty value
  tasks.map((tasks) => {
    if (tasks.id == id) {
      tmpItem = tasks.description; //changes tmpItem to the mapped value we want
    }
  });
  // On click operations
  const handleClick = async () => {
    if (signUp == false) {
      assignTask(description);
      setSignUp(!signUp);
    } else {
      unassignTask(userId, pillarId, username);
      setSignUp(!signUp);
    }
  };
  return (
    <div className="task-container">
      {tmpItem}

      {signUp && <p className="user">({username})</p>}

      <button className="task-button" onClick={handleClick}>
        {signUp ? (
          <FcCheckmark className="task-icon" />
        ) : (
          <IoCheckmarkOutline className="second-icon" />
        )}
      </button>
    </div>
  );
}

export default RemoteComponent;
