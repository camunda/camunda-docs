import React from "react";
import "./_ao-table.css";

const AoCard = ({ link, title, image, description }) => {
  return (
    <a href={link} className="ao-card" title={title}>
      <img src={image} alt={`${title} icon`} className="ao-card-image" />
      <h3>{title}</h3>
      <p>{description}</p>
    </a>
  );
};

const AoGrid = ({ ao }) => {
  return (
    <div className="ao-grid">
      {ao.map((ao, index) => (
        <AoCard
          key={index}
          link={ao.link}
          title={ao.title}
          image={ao.image}
          description={ao.description}
        />
      ))}
    </div>
  );
};

export default AoGrid;
