import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../CSS Files/SubjectTabs.css";

import {
  createSubjectTab,
  fetchSubjectTabs,
  deleteSubjectTab,
} from "../firebase/SubjectTabsCrudFunctions";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

const SubjectTabs: React.FC = () => {
  const [tabs, setTabs] = useState<{ id: string; name: string }[]>([]);
  const [newTabName, setNewTabName] = useState<string>("");
  const [showInput, setShowInput] = useState<boolean>(false);
  const [activeTabIndex, setActiveTabIndex] = useState<number | null>(null);
  const [memberId, setMemberId] = useState<string | null>(null);
  const [previousPage, setPreviousPage] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setMemberId(user.uid); // set the user id if they are logged in
      } else {
        setMemberId(null); // clear the user id if they are logged out
      }
    });

    return () => unsubscribe();
  }, [auth]);

  // fetch tabs if the user is logged in
  useEffect(() => {
    if (memberId) {
      const fetchTabs = async (): Promise<void> => {
        try {
          const tabsFromFirestore = await fetchSubjectTabs(memberId); // get tabs from firestore
          setTabs(tabsFromFirestore);
        } catch (error) {
          console.error("Error fetching tabs: ", error); // if theres an error log it
        }
      };

      fetchTabs();
    }
  }, [memberId]); // only run this when the memberid changes

  // track of the last page visited
  useEffect(() => {
    const allowedPages: string[] = [
      "/taskMap",
      "/updateNotes",
      "/remoteSelection",
      "/categoryCreation",
    ];
    if (allowedPages.includes(location.pathname)) {
      setPreviousPage(location.pathname);
    }
  }, [location]);

  // add new tab
  const addTab = async (): Promise<void> => {
    if (newTabName.trim()) {
      try {
        const result = await createSubjectTab(memberId!, newTabName); // create the tab in firestore
        setTabs([...tabs, { id: result.id, name: newTabName }]); // add the new tab to the state
        resetNewTabName(); // clear input field
      } catch (error) {
        console.error("Error adding tab: ", error); // log any errors
      }
    }
  };

  // delete tab
  const deleteTab = async (index: number): Promise<void> => {
    const tabToDelete = tabs[index]; // get the tab to delete
    try {
      await deleteSubjectTab(memberId!, tabToDelete.id); // delete the tab from firestore
      const updatedTabs = tabs.filter((_, tabIndex) => tabIndex !== index); // remove the tab from list
      setTabs(updatedTabs);

      // if no tabs are left go back to the previous page
      if (updatedTabs.length === 0 && previousPage) {
        navigate(previousPage);
      } else if (activeTabIndex === index) {
        setActiveTabIndex(null);
      }
    } catch (error) {
      console.error("Error deleting tab: ", error);
    }
  };

  // go to page if tab is clicked
  const handleTabClick = (tab: string, index: number): void => {
    navigate(`/subject/${encodeURIComponent(tab)}`); // navigate to the tab page
    setActiveTabIndex(index);
  };

  // reset the new tab name input field
  const resetNewTabName = (): void => {
    setNewTabName("");
    setShowInput(false);
  };

  return (
    <div className="subject-tabs-container">
      {}
      {tabs.map((tab, index) => (
        <div
          key={tab.id}
          className={`tab ${index === activeTabIndex ? "active" : ""}`} // add active class if its the selected tab
          style={{
            zIndex: activeTabIndex === index ? 10 : tabs.length - index, // make it appear on top
          }}
          onClick={() => handleTabClick(tab.name, index)}
        >
          {/* limit character length */}
          {tab.name.length > 10 ? `${tab.name.substring(0, 10)}...` : tab.name}

          {/* show x if tab is active */}
          {index === activeTabIndex && (
            <button
              onClick={(e) => {
                e.stopPropagation(); // prevent clicking the delete button from opening the tab
                deleteTab(index);
              }}
              className="delete-button"
            >
              X
            </button>
          )}
        </div>
      ))}

      {/* button showing input field for adding a tab */}
      <div className="add-tab" onClick={() => setShowInput(!showInput)}>
        +
      </div>

      {/* input field to add new tab */}
      {showInput && (
        <div className="add-tab-input">
          <input
            type="text"
            value={newTabName}
            onChange={(e) => setNewTabName(e.target.value)} // update input value on change
            placeholder="Subject Name"
          />
          <span
            className={`add-tab-icon ${showInput ? "active" : ""}`}
            onClick={addTab}
          >
            ENTER
          </span>
        </div>
      )}
    </div>
  );
};

export default SubjectTabs;
