import React from "react";
import "./_connectors-table.css";

const ConnectorCard = ({ link, title, image, description }) => {
  return (
    <a href={link} className="connector-card" title={title}>
      <img src={image} alt={`${title} icon`} className="connector-card-image" />
      <h3>{title}</h3>
      <p>{description}</p>
    </a>
  );
};

const ConnectorsGrid = ({ connectors }) => {
  return (
    <div className="connector-grid">
      {connectors.map((connector, index) => (
        <ConnectorCard
          key={index}
          link={connector.link}
          title={connector.title}
          image={connector.image}
          description={connector.description}
        />
      ))}
    </div>
  );
};

export default ConnectorsGrid;
