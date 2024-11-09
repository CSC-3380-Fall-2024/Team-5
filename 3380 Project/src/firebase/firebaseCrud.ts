import {db} from './firebase'
import { doc, setDoc, getDoc, deleteDoc, updateDoc} from 'firebase/firestore'

export async function createTask(teamId: string, categoryid: string, taskDescription: string) {

    const taskRef = doc(db, `teams/${teamId}/categories/${categoryId}/tasks`);
    try {
        await setDoc(taskRef, {
            description: taskDescription
        })
        
        console.log("task created with ID: ", taskRef.id);
    
}   catch (error) {
        console.error("Error creating task: ", error);
}
}

export async function deleteTask(teamId: string, categoryid: string, taskId: string) {

    const taskRef = doc(db, `teams/${teamId}/categories/${categoryId}/tasks/${taskId}`);
    try {
        await deleteDoc(taskRef)
        
        console.log(`task '${taskRef.id}' deleted `);
    
}   catch (error) {
        console.error("Error deleting task: ", error);
}
}

export async function updateTask(teamId: string, categoryid: string, taskId: string, taskDescription: string) {

    const taskRef = doc(db, `teams/${teamId}/categories/${categoryId}/tasks/${taskId}`);
    try {
        await updateDoc(taskRef,
            {
                description: taskDescription
            })
            console.log(`task '${taskRef.id}' updated `);
        } 
        catch (error) {
            console.error("Error updating task: ", error);
        }
}

const teamId = "Tl7Ph2s1udw5ceTihmDJ";
const categoryId = "to-do";
const taskId = "rvYTZyNdZairBPAKWP60";
const taskDescription = "I am testing this function...Did it work??";









