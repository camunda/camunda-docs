import React from "react";
import "./_announcements-table.css";

const AnnouncementsCards = ({ link, title, image, description }) => {
  return (
    <a href={link} className="announcements-card" title={title}>
      <img
        src={image}
        alt={`${title} icon`}
        className="announcements-card-image"
      />
      <h3>{title}</h3>
      <p>{description}</p>
    </a>
  );
};

const AnnouncementsGrid = ({ announcements }) => {
  return (
    <div className="announcements-grid">
      {announcements.map((announcements, index) => (
        <AnnouncementsCards
          key={index}
          link={announcements.link}
          title={announcements.title}
          image={announcements.image}
          description={announcements.description}
        />
      ))}
    </div>
  );
};

export default AnnouncementsGrid;
