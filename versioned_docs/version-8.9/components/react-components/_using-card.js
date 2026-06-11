import React from "react";
import "./_using-table.css";

const UsingCard = ({ link, title, image, description }) => {
  return (
    <a href={link} className="using-card" title={title}>
      <img src={image} alt={`${title} icon`} className="using-card-image" />
      <h3>{title}</h3>
      <p>{description}</p>
    </a>
  );
};

const UsingGrid = ({ using }) => {
  return (
    <div className="using-grid">
      {using.map((using, index) => (
        <UsingCard
          key={index}
          link={using.link}
          title={using.title}
          image={using.image}
          description={using.description}
        />
      ))}
    </div>
  );
};

export default UsingGrid;
