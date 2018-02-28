import React from "react";

const Item = ({ id, title, link }) => {
  return (
    <div>
      <a href={link.url} target="_blank" rel="noopener noreferrer">
        <div className="item-title">{title}</div>
      </a>
    </div>
  );
};

export default Item;
