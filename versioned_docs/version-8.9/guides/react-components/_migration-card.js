import React from "react";
import "./_migration-table.css";

const MigrationCard = ({ link, title, image, description }) => {
  return (
    <a href={link} className="migration-card" title={title}>
      <img src={image} alt={`${title} icon`} className="migration-card-image" />
      <h3>{title}</h3>
      <p>{description}</p>
    </a>
  );
};

const MigrationsGrid = ({ migrations }) => {
  return (
    <div className="migration-grid">
      {migrations.map((migration, index) => (
        <MigrationCard
          key={index}
          link={migration.link}
          title={migration.title}
          image={migration.image}
          description={migration.description}
        />
      ))}
    </div>
  );
};

export default MigrationsGrid;
