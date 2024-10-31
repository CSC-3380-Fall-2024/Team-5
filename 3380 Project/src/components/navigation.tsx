import { useState } from "react";
import { data } from "../data";

function Navigation() {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const npage = Math.ceil(data.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  function prePage() {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  }

  function changePage(id) {
    setCurrentPage(id);
  }

  function nextPage() {
    if (currentPage !== npage) setCurrentPage(currentPage + 1);
  }

  return (
    <nav>
      <ul className="pagination">
        <li className="page-item">
          <a href="#" className="page-link" onClick={prePage}>
            Prev
          </a>
        </li>
        {numbers.map((n, i) => (
          <li
            key={i}
            className={`page-item ${currentPage === n ? "active" : "inactive"}`}
          >
            <a href="#" className="page-link" onClick={() => changePage(n)}>
              {n}
            </a>
          </li>
        ))}
        <li>
          <a href="#" className="page-link" onClick={nextPage}>
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
