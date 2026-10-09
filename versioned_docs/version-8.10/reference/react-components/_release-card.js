import React from "react";
import "./_release-table.css";

const ReleaseCard = ({ link, title, image, description }) => {
  return (
    <a href={link} className="release-card" title={title}>
      <img src={image} alt={`${title} icon`} className="release-card-image" />
      <h3>{title}</h3>
      <p>{description}</p>
    </a>
  );
};

const ReleasesGrid = ({ releases }) => {
  return (
    <div className="release-grid">
      {releases.map((release, index) => (
        <ReleaseCard
          key={index}
          link={release.link}
          title={release.title}
          image={release.image}
          description={release.description}
        />
      ))}
    </div>
  );
};

export default ReleasesGrid;
