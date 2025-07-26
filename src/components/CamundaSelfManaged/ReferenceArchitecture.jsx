import React from "react";
import "./styles.css";
import { activeVersionURLPath as linkBase } from "../Versions";
import K8sIcon from "./icons/kubernetes.svg";
import JarIcon from "./icons/jar.svg";

const ArchitectureCard = ({ link, title, icon: Icon, description }) => {
  return (
    <a href={`${linkBase()}${link}`} className="sm-card" title={title}>
      <div className="sm-icon">
        <Icon />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </a>
  );
};

const ReferenceArchitecture = () => {
  const architectureItems = [
    {
      title: "Kubernetes",
      icon: K8sIcon,
      description:
        "Reference architecture for deploying Camunda on Kubernetes clusters",
      link: "/self-managed/reference-architecture/kubernetes/",
    },
    {
      title: "Manual",
      icon: JarIcon,
      description:
        "Reference architecture for traditional JAR-based deployment patterns",
      link: "/self-managed/reference-architecture/manual/",
    },
  ];

  return (
    <div className="sm-reference-architecture">
      <h2>Reference Architecture</h2>
      <p>
        Reference architectures provide a comprehensive blueprint for designing
        and implementing scalable, robust, and adaptable systems.
      </p>
      <div className="sm-grid-2">
        {architectureItems.map((item, index) => (
          <ArchitectureCard
            key={index}
            title={item.title}
            icon={item.icon}
            description={item.description}
            link={item.link}
          />
        ))}
      </div>
    </div>
  );
};

export default ReferenceArchitecture;
