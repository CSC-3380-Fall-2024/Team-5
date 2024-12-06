function Pagination({ currentPage, npage, changePage, prePage, nextPage }) {
  const numbers = [...Array(npage + 1).keys()].slice(1);

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

export default Pagination;
