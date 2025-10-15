import React from "react";
import "./_apitools-card.css";

const ApiCard = ({ link, title, image, description, type }) => {
  return (
    <a href={link} className="apitools-card" title={title}>
      <img src={image} alt={`${title} icon`} className="apitools-card-image" />
      <h3>{title}</h3>
      <p>{description}</p>
      {type && (
        <div className="apitools-type" style={{ marginBottom: "0px" }}>
          <span
            className={`badge badge--${type.toLowerCase()}`}
            style={{ marginBottom: "0px" }}
          >
            {type}
          </span>
        </div>
      )}
    </a>
  );
};

const ApiGrid = ({ api }) => {
  return (
    <div className="apitools-grid">
      {api.map((api, index) => (
        <ApiCard
          key={index}
          link={api.link}
          title={api.title}
          image={api.image}
          description={api.description}
          type={api.type}
        />
      ))}
    </div>
  );
};

export default ApiGrid;
