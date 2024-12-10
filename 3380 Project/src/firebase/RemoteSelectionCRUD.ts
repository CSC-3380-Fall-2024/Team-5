import { database } from "./firebase";
import { doc, deleteDoc, collection, addDoc, getDocs } from "firebase/firestore";


//Function to fetch all assigned tasks
export async function fetchAssigned(user: string, teamId: string) {
    try {
      const teamDoc = doc(database, "teams", teamId);
      const memberCollection = collection(teamDoc, "members");
      const nameDoc = doc(memberCollection, user);
      const taskCollection = collection(nameDoc, "task-collection");
      
      
      const snapshot = await getDocs(taskCollection);

      const tasks = snapshot.docs.map(doc => ({
        id: doc.id, 
        description: doc.data().description
        }));
  
      return tasks;
    } catch (error) {
      console.error("error fetching assigned tasks: ", error);
      return [];
    }
  }

//Function to create the task-collection doc
export async function creation(
    teamId: string,
    taskDescription: string,
    user: string
  ) {
    const assigned = collection(
      database,
      `teams/${teamId}/members/${user}/task-collection/`
    );
      const document = await addDoc(assigned, {description: taskDescription} )
  
      console.log("assigned task with ID: ", document.id);
      return document;
  }

//Function to unassign yourself from tasks
export async function unassignYourself(
    teamId: string,
    taskId: string,
    user: string
  ) {
    const taskRef = doc(
      database,
      `teams/${teamId}/members/${user}/task-collection/${taskId}`
    );
    try {
      await deleteDoc(taskRef);
  
      console.log(`task '${taskRef.id}' unassigned from '${user}' `);
    } catch (error) {
      console.error("Error unassign task: ", error);
    }
  }
  export async function getUsers(teamId: string) {
    const querySnapshot = await getDocs(
      collection(database, `teams/${teamId}/members/`)
    );

    const users = querySnapshot.docs.map((doc) => ({
      key: doc.id,
      ...doc.data(),
    }));
    return users;
  }