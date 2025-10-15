import React from "react";
import "./_api-card.css";

const ApiCard = ({ link, title, image, description }) => {
  return (
    <a href={link} className="api-card" title={title}>
      <div className="api-card-header">
        <img
          src={image}
          alt={`${title} icon`}
          className="inline-image"
          style={{
            marginRight: "0.5rem",
          }}
        />
        <h3>{title}</h3>
      </div>
      <p>{description}</p>
    </a>
  );
};

const ApiGrid = ({ items }) => {
  return (
    <div className="api-grid">
      {items.map((card, index) => (
        <ApiCard
          key={index}
          link={card.link}
          title={card.title}
          image={card.image}
          description={card.description}
        />
      ))}
    </div>
  );
};

export default ApiGrid;
