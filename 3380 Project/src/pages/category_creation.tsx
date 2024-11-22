import { useRef, useState } from "react";
import CategoryComponent from "../components/CategoryComponent";
import "../CSS Files/CategoryComponent.css";
import { IoIosAdd } from "react-icons/io";
import { useAuth } from "../authContext";
import LogOut from "../components/logOut";

function CategoryCreation() {
  const { user } = useAuth();
  console.log(user);
  const [categories, setCategories] = useState<
    Array<{ id: number; element: JSX.Element }> //usState updates wih an array that has an id and element
  >([]);
  const nextId = useRef(0); //useRef generates a unique id for each category

  //function to spawn a category component
  const createCategory = () => {
    const id = nextId.current++; //generates a unique id for the category
    setCategories((prevCategories) => [
      //updates the categories array with the new category and renders it
      ...prevCategories,
      {
        id,
        element: (
          <CategoryComponent key={id} onDelete={() => deleteCategory(id)} />
        ),
      },
    ]);
  };

  //function to delete a category component
  const deleteCategory = (id: number) => {
    setCategories(
      (prevCategories) =>
        prevCategories.filter((category) => category.id !== id) //filters out the category with the matching id
    );
  };

  return (
    <>
      <div className="main-container">
        <div className="categories-wrapper">
          <div className="create-button-container">
            <button
              type="button"
              className="create-button"
              onClick={createCategory}
            >
              <IoIosAdd className="icon" />
              Create
            </button>
            {user && user.email}
          </div>
          <div className="categories-container">
            {categories.length > 0 ? (
              categories.map((category) => category.element)
            ) : (
              <p className="no-categories">Nothing to Display</p>
            )}
          </div>
        </div>
      </div>
      <div>
        <LogOut></LogOut>
      </div>
    </>
  );
}

export default CategoryCreation;
