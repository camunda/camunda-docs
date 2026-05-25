import React from "react";
import "./_idp-table.css";

const IdpCard = ({ link, title, image, description }) => {
  return (
    <a href={link} className="idp-card" title={title}>
      <img src={image} alt={`${title} icon`} className="idp-card-image" />
      <h3>{title}</h3>
      <p>{description}</p>
    </a>
  );
};

const IdpGrid = ({ idp, className, columns = 3 }) => {
  // allow override via className and/or columns prop
  const colsClass = `ts-grid-cols-${columns}`;
  return (
    <div className={`ts-grid ${colsClass} ${className || ""}`.trim()}>
      {idp.map((idp, index) => (
        <IdpCard
          key={index}
          link={idp.link}
          title={idp.title}
          image={idp.image}
          description={idp.description}
        />
      ))}
    </div>
  );
};

export default IdpGrid;
