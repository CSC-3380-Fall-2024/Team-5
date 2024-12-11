import { database } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";

const teamId: string = "Tl7Ph2s1udw5ceTihmDJ";

// function to create a new subject tab for a member
export async function createSubjectTab(
  memberId: string,
  tabName: string
): Promise<any> {
  try {
    // reference to the subject-tabs collection
    const tabsCollectionRef = collection(
      database,
      `teams/${teamId}/members/${memberId}/subject-tabs`
    );

    // add the new tab to firestore
    const newTab = await addDoc(tabsCollectionRef, { name: tabName });

    // log the id of the newly created tab
    console.log("subject tab created with ID: ", newTab.id);

    // return the result with the tab's id
    return newTab;
  } catch (error) {
    // log any errors
    console.error("error creating subject tab: ", error);
    throw error;
  }
}

// fetch all subject tabs for a member
export async function fetchSubjectTabs(
  memberId: string
): Promise<{ id: string; name: string }[]> {
  try {
    const tabsCollectionRef = collection(
      database,
      `teams/${teamId}/members/${memberId}/subject-tabs`
    );

    // log the path of the collection being fetched
    console.log(
      `fetching tabs from path: teams/${teamId}/members/${memberId}/subject-tabs`
    );

    // get all the documents from the collection
    const snapshot = await getDocs(tabsCollectionRef);

    // create an array of tabs with their ids and names
    const tabs = snapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
    }));

    // log the fetched tabs
    console.log("fetched subject tabs: ", tabs);
    return tabs;
  } catch (error) {
    // log any errors
    console.error("error fetching subject tabs: ", error);
    return [];
  }
}

// function to delete a specific subject tab by id
export async function deleteSubjectTab(
  memberId: string,
  tabId: string
): Promise<void> {
  try {
    // reference to specific tab document by id
    const tabRef = doc(
      database,
      `teams/${teamId}/members/${memberId}/subject-tabs/${tabId}`
    );

    // delete the tab from firestore
    await deleteDoc(tabRef);

    // log the id of the deleted tab
    console.log("deleted subject tab with ID: ", tabId);
  } catch (error) {
    console.error("error deleting subject tab: ", error);
    throw error;
  }
}
