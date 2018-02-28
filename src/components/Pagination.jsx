import React from "react";

const Pagination = ({ page, totalPages, onPage }) => {
  return (
    <nav
      className="pagination is-centered"
      role="navigation"
      aria-label="pagination"
    >
      {page > 0 && (
        <a className="pagination-previous" onClick={() => onPage(page - 1)}>
          Previous
        </a>
      )}

      <ul className="pagination-list">
        <li>
          <a className="pagination-link" aria-label="Goto page 1">
            1
          </a>
        </li>
        <li>
          <span className="pagination-ellipsis">&hellip;</span>
        </li>
        <li>
          <a className="pagination-link" aria-label="Goto page 45">
            45
          </a>
        </li>
        <li>
          <a
            className="pagination-link is-current"
            aria-label="Page 46"
            aria-current="page"
          >
            46
          </a>
        </li>
        <li>
          <a className="pagination-link" aria-label="Goto page 47">
            47
          </a>
        </li>
        <li>
          <span className="pagination-ellipsis">&hellip;</span>
        </li>
        <li>
          <a className="pagination-link" aria-label="Goto page 86">
            86
          </a>
        </li>
      </ul>

      {page < totalPages && (
        <a className="pagination-next" onClick={() => onPage(page + 1)}>
          Next page
        </a>
      )}
    </nav>
  );
};

export default Pagination;
