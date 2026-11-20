import React from "react";
import "./_ts-card.css";

const ApiCard = ({
  link,
  title,
  image,
  description,
  type,
  ctaLabel,
  ctaLink,
}) => {
  const hasFooter = ctaLabel || ctaLink;
  const actionHref = ctaLink || link;
  const actionText = ctaLabel || "Learn more";
  return (
    <a href={link} className="ts-card" title={title}>
      {image && (
        <img src={image} alt={`${title} icon`} className="ts-card-image" />
      )}
      <h3>{title}</h3>
      <p>{description}</p>
      {hasFooter && (
        <div className="ts-card-footer">
          <a href={actionHref} className="ts-card-cta">
            {actionText}
          </a>
        </div>
      )}
    </a>
  );
};

const ApiGrid = ({ api, className, columns = 3 }) => {
  // allow override via className and/or columns prop
  const colsClass = `ts-grid-cols-${columns}`;
  return (
    <div className={`ts-grid ${colsClass} ${className || ""}`.trim()}>
      {api.map((item, index) => (
        <ApiCard
          key={index}
          link={item.link}
          title={item.title}
          image={item.image}
          description={item.description}
          type={item.type}
          ctaLabel={item.ctaLabel}
          ctaLink={item.ctaLink}
        />
      ))}
    </div>
  );
};

export default ApiGrid;
