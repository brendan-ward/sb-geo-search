import React from "react";
import Item from "./Item";
import Pagination from "./Pagination";


const List = ({ items, total, page, totalPages, onPage }) => {
  return (
    <section className="section items-section">
      <div className="count">
        Showing {(page * items.length) + 1} - {(page + 1) * items.length} of {total.toLocaleString()} items
      </div>
      <ul className="items-list">
        {items.map(item => <Item key={item.id} {...item} />)}
      </ul>
      <Pagination page={page} totalPages={totalPages} onPage={onPage} />
    </section>
  );
};

export default List;
