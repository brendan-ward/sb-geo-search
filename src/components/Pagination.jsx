import React from "react";

const MAX_PAGE_BUTTONS = 5;  // maximum number of intermediate buttons to show, plus optional first and last buttons

const Pagination = ({ page, totalPages, onPage }) => {

  const halfRange = Math.floor((MAX_PAGE_BUTTONS - 1) / 2);
  let seriesStart = 1;
  if (page > totalPages - MAX_PAGE_BUTTONS) {
    seriesStart = totalPages - MAX_PAGE_BUTTONS;
  }
  else if (page >= MAX_PAGE_BUTTONS) {
    seriesStart = Math.max(page - halfRange, 1);
  }
  const seriesEnd = Math.min(totalPages, seriesStart + MAX_PAGE_BUTTONS);//Math.min(Math.max(page + MAX_PAGE_BUTTONS, totalPages - MAX_PAGE_BUTTONS - 1), totalPages);
  
  let pageNums = [];
  for (let i=seriesStart; i<seriesEnd; i++) {
    pageNums.push(i);
  }

  const showFirst = seriesStart > 1;
  const showLast = seriesEnd <= totalPages;
  const showLeftSpacer = seriesStart - 1 > 1;  // TODO
  const showRightSpacer = seriesEnd < totalPages;

  return (
    <div
      className="pagination is-centered"
      role="navigation"
      aria-label="pagination"
    >
      {page > 1 && (
        <a className="pagination-previous" onClick={() => onPage(page - 1)} aria-label="Go to previous page">
          previous
        </a>
      )}

      <ul className="pagination-list">
        {showFirst &&
          <li>
            <a className={"pagination-link" + ((page === 1)? " is-current": "")}
            onClick={() => onPage(1)} aria-label="Go to page 1">
              1
            </a>
          </li>
        }

        {showLeftSpacer &&
          <li>
            <span className="pagination-ellipsis">&hellip;</span>
          </li>
        }

        {
          pageNums.map(p => renderPageNum(p, page, onPage))
        }

        {showRightSpacer &&
          <li>
            <span className="pagination-ellipsis">&hellip;</span>
          </li>
        }

        {showLast &&
          <li>
            <a className={"pagination-link" + ((page === totalPages)? " is-current": "")} 
            onClick={() => onPage(totalPages)} aria-label="Go to last page">
              {totalPages}
           </a>
          </li>
        }
      </ul>

      {
        page < totalPages && (
          <a className="pagination-next" onClick={() => onPage(page + 1)} aria-label="Go to next page">
            next
        </a>
        )
      }
    </div >
  );
};

const renderPageNum = (pageNum, currentPage, onPage) => {
  return (
      <li key={`page_${pageNum}`}>
            <a
              className={"pagination-link" + ((pageNum === currentPage)? " is-current": "")}
              onClick={(pageNum !== currentPage)? () => onPage(pageNum): null}
              aria-label={`Go to page ${pageNum}`}
            >
              {pageNum}
            </a>
        </li>
  )
}




export default Pagination;
