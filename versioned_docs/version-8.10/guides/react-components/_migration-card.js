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

const MigrationsGrid = ({ migrations, className, columns = 3 }) => {
  // allow override via className and/or columns prop
  const colsClass = `migration-grid-cols-${columns}`;
  return (
    <div className={`migration-grid ${colsClass} ${className || ""}`.trim()}>
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
