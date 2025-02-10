import React from "react";
import "./_connectors-table.css";

const ConnectorCard = ({ link, title, image, description }) => {
  return (
    <a href={link} className="connector-small-link" title={title}>
      <div className="connector-small">
        <img
          src={image}
          alt={`${title} icon`}
          className="connector-small-image"
        />
        {title}
      </div>
    </a>
  );
};

const ConnectorsGridSml = ({ connectors }) => {
  return (
    <div className="connector-small-grid">
      {connectors.map((connector, index) => (
        <ConnectorCard
          key={index}
          link={connector.link}
          title={connector.title}
          image={connector.image}
        />
      ))}
    </div>
  );
};

export default ConnectorsGridSml;
