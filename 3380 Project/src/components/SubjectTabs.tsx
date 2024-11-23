import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS Files/SubjectTabs.css";

const SubjectTabs: React.FC = () => {
  const [tabs, setTabs] = useState<string[]>([]);
  const [newTabName, setNewTabName] = useState<string>("");
  const [showInput, setShowInput] = useState<boolean>(false);
  const [activeTabIndex, setActiveTabIndex] = useState<number | null>(null);

  const navigate = useNavigate();

  // add a new tab
  const addTab = () => {
    if (newTabName.trim()) {
      setTabs([...tabs, newTabName]);
      resetNewTabName();
    }
  };

  // delete a tab
  const deleteTab = (index: number) => {
    setTabs(tabs.filter((_, tabIndex) => tabIndex !== index));
    if (activeTabIndex === index) setActiveTabIndex(null);
  };

  // handle tab click and navigation
  const handleTabClick = (tab: string, index: number) => {
    navigate(`/subject/${encodeURIComponent(tab)}`);
    setActiveTabIndex(index);
  };

  // reset the new tab name state
  const resetNewTabName = () => {
    setNewTabName("");
    setShowInput(false);
  };

  return (
    <div className="subject-tabs-container">
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={`tab ${index === activeTabIndex ? "active" : ""}`} // apply active class to active tab
          style={{
            zIndex: activeTabIndex === index ? 10 : tabs.length - index, // adjust layering
          }}
          onClick={() => handleTabClick(tab, index)}
        >
          {tab.length > 10 ? `${tab.substring(0, 10)}...` : tab}
          {index === activeTabIndex && ( // show delete button when tab is active
            <button
              onClick={(e) => {
                e.stopPropagation(); // ensure delete action works as intended
                deleteTab(index);
              }}
              className="delete-button"
            >
              X
            </button>
          )}
        </div>
      ))}

      <div className="add-tab" onClick={() => setShowInput(!showInput)}>
        +
      </div>
      {showInput && (
        <div className="add-tab-input">
          <input
            type="text"
            value={newTabName}
            onChange={(e) => setNewTabName(e.target.value)} // update input value on change
            placeholder="Name Subject"
          />
          <button onClick={addTab}>Add</button>
        </div>
      )}
    </div>
  );
};

export default SubjectTabs;
