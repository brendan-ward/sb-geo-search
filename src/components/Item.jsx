import React from "react";

const Item = ({ title, link }) => {
  return (
    <li className="item">
      <a href={link.url} target="_blank" rel="noopener noreferrer">
        {/* <img src={} alt=`image for ${title}` /> */}
      </a>
      <a href={link.url} target="_blank" rel="noopener noreferrer">
        <div className="item-title">{title}</div>
      </a>
    </li>
  );
};

export default Item;
