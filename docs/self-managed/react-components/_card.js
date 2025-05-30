import React from "react";
import "./_card-table.css";

const Card = ({ link, title, image, description }) => {
  return (
    <a href={link} className="idp-card" title={title}>
      {image && <img src={image} alt={`${title} icon`} className="idp-card-image" />}
      <h3>{title}</h3>
      <p>{description}</p>
    </a>
  );
};

const CardGrid = ({ card }) => {
  return (
    <div className="idp-grid">
      {card.map((card, index) => (
        <Card
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

export default CardGrid;
