import React from "react";
import Item from "./Item";
import Pagination from "./Pagination";


const List = ({ items, total, page, totalPages, itemsPerPage, onPage }) => {
  const offset = (page - 1) * itemsPerPage + 1;
  return (
    <section className="section items-section">
      <div className="count">
        Showing {offset} - {offset + items.length - 1} of {total.toLocaleString()} items
      </div>
      <ul className="items-list">
        {items.map(item => <Item key={item.id} {...item} />)}
      </ul>
      <Pagination page={page} totalPages={totalPages} onPage={onPage} />
    </section>
  );
};

export default List;
