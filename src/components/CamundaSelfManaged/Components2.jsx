import React from "react";
import "./styles.css";
import { activeVersionURLPath as linkBase } from "../Versions";
import ClusterManagementIcon from "./icons/cluster-management.svg";

const ComponentCard = ({ link, title, icon: Icon, description }) => {
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

const Components2 = () => {
  const componentItems = [
    {
      title: "Web Modeler",
      icon: ClusterManagementIcon,
      description:
        "Design and implement your first diagram using Modeler, a component of Camunda.",
      link: "/self-managed/modeler/web-modeler/installation",
    },
    {
      title: "Console",
      icon: ClusterManagementIcon,
      description:
        "Camunda Console (Self-Managed) provides a centralized interface for monitoring and managing your Camunda 8 deployments.",
      link: "/self-managed/console-deployment/overview",
    },
    {
      title: "Identity",
      icon: ClusterManagementIcon,
      description:
        "Use Identity to manage users, groups, roles, permissions, and applications within the Camunda 8 platform.",
      link: "/self-managed/identity/what-is-identity",
    },
  ];

  return (
    <div className="sm-components">
      <h2>Management components</h2>
      <p>
        A reference for Camunda 8 management components, including Web Modeler,
        Console, Identity, detailed configuration guidance for each component,
        and application upgrade instructions.
      </p>
      <div className="sm-grid-2">
        {componentItems.map((item, index) => (
          <ComponentCard
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

export default Components2;