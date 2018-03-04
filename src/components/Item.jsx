import React from "react";

const Item = ({title, link, previewImage, summary, browseCategories}) => {
  const categories = (browseCategories)
    ? browseCategories.join(', ')
    : null;

  summary = (summary)
    ? summary.trim(' ')
    : null;

  return (
    <li className="item">
      <a href={link.url} target="_blank" rel="noopener noreferrer">
        {(previewImage)
          ? <img src={previewImage.thumbnail.uri} alt="thumbnail image" />
          : <div className="no-image">
            no image available
          </div>
        }

      </a>
      <a href={link.url} target="_blank" rel="noopener noreferrer">
        <div className="item-title">{title}</div>
      </a>

      <p className="summary">
        {(summary)
          ? summary
          : "Abstract not available"
        }
      </p>

      {categories && 
        <div className="categories">
          <span className="field-name">Categories: </span>
          {categories}
        </div>
      }
    </li>
  );
};

export default Item;
