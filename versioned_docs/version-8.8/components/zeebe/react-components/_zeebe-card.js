import React from "react";
import Markdown from "react-markdown";
import "./_zeebe-table.css";

// This component renders a grid of cards
// Used by the Zeebe components overview page
// Used by the Backup and Restore page

const ZeebeCard = ({ link, title, image, description }) => {
  return (
    <a href={link} className="zeebe-card" title={title}>
      <img src={image} alt={`${title} icon`} className="zeebe-card-image" />
      <h3>{title}</h3>
      <Markdown>{description}</Markdown>
    </a>
  );
};

const ZeebeGrid = ({ zeebe }) => {
  return (
    <div className="zeebe-grid">
      {zeebe.map((zeebe, index) => (
        <ZeebeCard
          key={index}
          link={zeebe.link}
          title={zeebe.title}
          image={zeebe.image}
          description={zeebe.description}
        />
      ))}
    </div>
  );
};

export default ZeebeGrid;
