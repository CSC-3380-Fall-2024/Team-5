import { database } from "./firebase";
import { doc, setDoc, getDoc, deleteDoc, updateDoc, collection, addDoc, query, where, getDocs } from "firebase/firestore";

// Main Category Functions

// Creates a new task in a 'tasks' collection and is assigned a description and category
export async function createBackendTask(
  teamId: string,
  taskDescription: string,
  taskCategory: string
) {
  const taskRef = collection(
    database,
    `teams/${teamId}/tasks`
  );
    const document = await addDoc(taskRef, {description: taskDescription, category: taskCategory} )

    console.log("task created with ID: ", document.id);
    return document;
}

// Deletes the document of a task using it's id
export async function deleteBackendTask(
  teamId: string,
  taskId: string
) {
  const taskRef = doc(
    database,
    `teams/${teamId}/tasks/${taskId}`
  );
  try {
    await deleteDoc(taskRef);

    console.log(`task '${taskRef.id}' deleted `);
  } catch (error) {
    console.error("Error deleting task: ", error);
  }
}

// Updates a task document's "description" field
export async function updateBackendTask(
  teamId: string,
  taskId: string,
  taskDescription: string,
  taskCategory: string
) {
  const taskRef = doc(
    database,
    `teams/${teamId}/tasks/${taskId}`
  );
  try {
    await updateDoc(taskRef, {
      description: taskDescription,
      category: taskCategory
    });
    console.log(`task '${taskRef.id}' updated `);
  } catch (error) {
    console.error("Error updating task: ", error);
  }
}

// fetches all documents inside of the 'tasks' collection and returns it as an array
export async function fetchTasks(category: string, teamId: string) {
  try {
    const teamDoc = doc(database, "teams", teamId);
    const taskCollection = collection(teamDoc, "tasks");

    const q = query(taskCollection,
      where("category", "==", category)
    );
    const snapshot = await getDocs(q);
    const tasks = snapshot.docs.map(doc => ({
      id: doc.id, 
      description: doc.data().description, 
      category: doc.data().category}));

    return tasks;
  } catch (error) {
    console.error("error fetching tasks: ", error);
    return [];
  }
}
// END Main Categories functions 

// Custom Category Functions

// Creates a document inside 'custom-categories' and is assigned a title
export async function createBackendCategory(teamId:string, catTitle: string) {
  const catRef = collection(
    database, 'teams', teamId, 'custom-categories'
  );
    const document = await addDoc(catRef, {title: catTitle} )

    console.log("category created with ID: ", document.id);
    return document
}

// Creates a document within the subcollection 'tasks' which is inside a 'custom-categories' document (teams -> custom-categories -> document -> tasks)
export async function createBackendCategoryTask(teamId:string, categoryId: string, taskDescription:string) {
  const taskRef = collection(database, `teams/${teamId}/custom-categories/${categoryId}/tasks`)
  try {
    const document = await addDoc(taskRef, {description: taskDescription});
    console.log(`Custom category task added with id: `, document.id);
    return document;
  } catch (error) {
    console.error(`Error adding custom category task: `, error);
  }
}

// Deletes a document in 'custom-categories' and any subcollections within it
export async function deleteBackendCategory(teamId:string, categoryId:string) {
  try {
  const collectionRef = collection(database, `teams/${teamId}/custom-categories/${categoryId}/tasks`);
  const collectionSnapshot = await getDocs(collectionRef);
  
  const deleteDocs = collectionSnapshot.docs.map((docSnap) => 
    deleteDoc(doc(database, `teams/${teamId}/custom-categories/${categoryId}/tasks/${docSnap.id}`)))
  await Promise.all(deleteDocs); // deletes inner subcollection and it's documents first
  console.log("docs deleted from: ", collectionRef.id)

  const catRef = doc(database, `teams/${teamId}/custom-categories/${categoryId}`);
  await deleteDoc(catRef); //deletes document in 'custom-categories'
  console.log(`deleted all data from ${catRef.id} successfully`)

  } catch (error) {
    console.error("error deleting docs in collection: ", error);
  }
}

// Deletes a task document within a custom category (teams -> custom-categories -> document -> tasks -> document to be deleted)
export async function deleteBackendCategoryTask(
  teamId: string,
  taskId: string,
  categoryId: string
) {
  const taskRef = doc(
    database,
    `teams/${teamId}/custom-categories/${categoryId}/tasks/${taskId}`
  );
  try {
    await deleteDoc(taskRef);

    console.log(`task '${taskRef.id}' deleted `);
  } catch (error) {
    console.error("Error deleting task: ", error);
  }
}

// Updates description of a task document that's within 'custom-categories'
export async function updateBackendCategoryTask(
  teamId: string,
  categoryId: string,
  taskId: string,
  taskDescription: string,
) {
  const taskRef = doc(
    database,
    `teams/${teamId}/custom-categories/${categoryId}/tasks/${taskId}`
  );
  try {
    await updateDoc(taskRef, {
      description: taskDescription,
    });
    console.log(`custom category task '${taskRef.id}' updated `);
  } catch (error) {
    console.error("Error updating custom category task: ", error);
  }
}

// fetches all documents within 'custom-categories'
export async function fetchBackendCategories(teamId:string) {
  try {
    const teamDoc = doc(database, "teams", teamId);
    const customCatCollection = collection(teamDoc, "custom-categories");

    const q = query(customCatCollection);
    const snapshot = await getDocs(q);
    const categories = snapshot.docs.map(doc => ({
      id: doc.id, 
      title: doc.data().title }))

    return categories;
  } catch (error) {
    console.error("error fetching custom categories: ", error);
    return [];
  }
}

// fetches all documents in a specific custom category's subcollection 'tasks' (to retrieve the tasks inside it's respective category)
export async function fetchBackendCategoryTasks(teamId:string, categoryId: string) {
  try {
    const teamDoc = doc(database, "teams", teamId);
    const tasksCollection = collection(teamDoc, "custom-categories", categoryId, "tasks");

    const q = query(tasksCollection);
    const snapshot = await getDocs(q);
    const tasks = snapshot.docs.map(doc => ({
      id: doc.id, 
      description: doc.data().description }))

    return tasks;
  } catch (error) {
    console.error("error fetching custom categories: ", error);
    return [];
  }
}

// Updates the 'title' field of a 'custom-categories' document 
export async function updateBackendCategoryTitle(
  teamId: string,
  categoryId: string,
  newTitle: string,
) {
  const taskRef = doc(
    database,
    `teams/${teamId}/custom-categories/${categoryId}/`
  );
  try {
    await updateDoc(taskRef, {
      title: newTitle,
    });
    console.log(`custom category title '${taskRef.id}' updated `);
  } catch (error) {
    console.error("Error updating custom category task: ", error);
  }
}

// END Custom Category Functions
