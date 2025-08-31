import React from "react";
import "./_api-card.css";

const ApiCard = ({ link, title, image, description }) => {
  return (
    <a href={link} className="api-card" title={title}>
      <img src={image} alt={`${title} icon`} className="api-card-image" />
      <h3>{title}</h3>
      <p>{description}</p>
    </a>
  );
};

const ApiGrid = ({ api }) => {
  return (
    <div className="api-grid">
      {api.map((api, index) => (
        <ApiCard
          key={index}
          link={api.link}
          title={api.title}
          image={api.image}
          description={api.description}
        />
      ))}
    </div>
  );
};

export default ApiGrid;
