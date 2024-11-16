import { database } from "./firebase";
import { doc, setDoc, getDoc, deleteDoc, updateDoc, query, collection, where, addDoc } from "firebase/firestore";

export async function createTask(
  teamId: string,
  taskType: string,
  taskDescription: string
) {
  const taskRef = collection(
    database,
    `teams/${teamId}/tasks`
  );
  try {
    const taskDoc = await addDoc(taskRef, {
      description: taskDescription,
      category: taskType,
    });

    console.log("task created with ID: ", taskDoc.id);
  } catch (error) {
    console.error("Error creating task: ", error);
    return undefined;
  }
}

export async function deleteTask(
  teamId: string,
  taskId: string
) {
  const taskRef = doc(
    database,
    `teams/${teamId}/tasks/${taskId}`
  );
  try {
    await deleteDoc(taskRef);

    const taskRef = doc(db, `teams/${teamId}/categories/${categoryId}/tasks/${taskId}`);
    try {
        await deleteDoc(taskRef)
        
        console.log(`task '${taskRef.id}' deleted `);
    
}   catch (error) {
        console.error("Error deleting task: ", error);
}
}

export async function updateTask(
  teamId: string,
  taskId: string,
  taskDescription: string
) {
  const taskRef = doc(
    database,
    `teams/${teamId}/tasks/${taskId}`
  );
  try {
    await updateDoc(taskRef, {
      description: taskDescription,
    });
    console.log(`task '${taskRef.id}' updated `);
  } catch (error) {
    console.error("Error updating task: ", error);
  }
}
