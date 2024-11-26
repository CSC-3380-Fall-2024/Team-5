import React, { useState } from "react";
function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${month}/${date}/${year}`;
}

const ItemList = () => {
  const [currentDate, setCurrentDate] = useState(getDate());
  const [isShowed, setIsShowed] = useState(false);

  const handleClick = (event) => {
    console.log("Item clicked:", event.target.textContent);
  };

  const handleUpdateClick = () => {
    setCurrentDate(getDate());
    setIsShowed(true);
    console.log({ currentDate });
  };
  return (
    <ul>
      {" "}
      {currentDate}
      <li onClick={handleClick}>Item 1</li>
      <li onClick={handleClick}>Item 2</li>
      <li onClick={handleUpdateClick}>
        {isShowed && currentDate ? currentDate : "date"}
      </li>
    </ul>
  );
};

export default ItemList;
