import { useEffect, useRef, useState } from "react";
import CategoryComponent from "../components/Category Creation/CategoryComponent";
import "../CSS Files/CategoryComponent.css";
import { IoIosAdd } from "react-icons/io";
import ToDoColumn from "../components/Category Creation/ToDoColumn";
import InProgressColumn from "../components/Category Creation/InProgressColumn";
import DoneColumn from "../components/Category Creation/DoneColumn";
import {
  createBackendCategory,
  deleteBackendCategory,
  fetchBackendCategories,
} from "../firebase/CRUD/CategoryCreationCrudFunctions";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";

// Category type to define category structure
export interface Category {
  id: string;
  title: string;
  element: JSX.Element;
}
const teamId = "B18T0M2TwLngVuq8opN1";

// Custom hook so global states can be used throughout code
export const useCategory = () => {
  const [showTitleModal, setShowTitleModal] = useState(false);
  const [category, setCategory] = useState<Category[]>([]);

  // Fetches Categories from the backend and loads them into local state
  const loadCategories = async () => {
    try {
      const fetchedCategories = await fetchBackendCategories(teamId);
      const updatedCategories = fetchedCategories.map((cat) => ({
        id: cat.id,
        title: cat.title,
        element: (
          <CategoryComponent // Creates a component filled with new data
            key={cat.id}
            categoryId={cat.id}
            onDelete={() => deleteCategory(cat.id)}
            title={cat.title}
          />
        ),
      }));
      setCategory(updatedCategories); // Sets new Category type into local state
    } catch (error) {
      console.error("error loading tasks: ", error);
    }
  };
  // deletes entire category and it's contents both from the backend and local state
  const deleteCategory = async (catId: string) => {
    await deleteBackendCategory(teamId, catId);
    setCategory(
      (prevCategories) =>
        prevCategories.filter((category) => category.id !== catId) // filters out the category with the matching id and discards old state
    );
  };

  // UseEffect hook to fetch new data when something is changed
  useEffect(() => {
    loadCategories();
  }, []);

  // outputs needed states to be used elsewhere
  return {
    category,
    setCategory,
    showTitleModal,
    setShowTitleModal,
    loadCategories,
    deleteCategory,
  };
};

// Modal to add a title when a custom category is created
export function AddTitleModal({
  show,
  onHide,
  onAddTitle,
}: {
  show: boolean;
  onHide: () => void;
  onAddTitle: (title: string) => void;
}) {
  const [input, setInput] = useState("");

  // keeps input field blank after submit and hides modal
  const handleAddTitle = () => {
    if (input.trim()) {
      onAddTitle(input.trim());
      setInput("");
      onHide();
    }
  };

  // Function for 'enter' key functionality
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTitle();
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="custom-modal"
      centered
      style={{ display: "flex", margin: "auto" }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add a Title to Your Category
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-input-container">
          <input
            className="title-input"
            onChange={(e) => setInput(e.target.value)} // saves input in local state
            value={input}
            placeholder="Title"
            onKeyDown={(e) => handleKeyPress(e)}
          />
          <Button
            variant="outline-primary"
            onClick={handleAddTitle}
            style={{
              position: "relative",
              width: "10vh",
              height: "3.5vh",
              justifyContent: "center",
            }}
          >
            <h6>Create</h6>
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

const CategoryCreation: React.FC = () => {
  // defines needed states from custom hook
  const {
    category,
    setCategory,
    showTitleModal,
    setShowTitleModal,
    deleteCategory,
  } = useCategory();

  // renders a custom category and stores title data in the backend
  const addCategory = async (title: string) => {
    try {
      const catRef = await createBackendCategory(teamId, title);
      const newCategory: Category = {
        id: catRef.id,
        title: title,
        element: (
          <CategoryComponent
            key={catRef.id}
            categoryId={catRef.id}
            onDelete={() => deleteCategory(catRef.id)}
            title={title}
          />
        ),
      };
      setCategory((prevCategories) => [...prevCategories, newCategory]);
    } catch (error) {
      console.error("error adding category: ", error);
    }
  };

  return (
    <>
      <div className="main-container">
        <div className="categories-wrapper">
          <div className="create-button-container">
            <button
              type="button"
              className="create-button"
              onClick={() => setShowTitleModal(true)}
            >
              <IoIosAdd className="icon" />
              <h4 style={{ display: "contents" }}>Create</h4>
            </button>
          </div>
          <div className="categories-container">
            {/* Renders three main categories */}
            <ToDoColumn />
            <InProgressColumn />
            <DoneColumn />
            {category.map((cat) => cat.element)}
          </div>
        </div>
        <AddTitleModal
          show={showTitleModal}
          onHide={() => setShowTitleModal(false)}
          onAddTitle={(title) => addCategory(title)}
        />
      </div>
    </>
  );
};

export default CategoryCreation;
