import React from "react";
import "./styles.css";
import { activeVersionURLPath as linkBase } from "../Versions";
import ClusterManagementIcon from "./icons/cluster-management.svg";
import ClusterOrchestrationIcon from "./icons/cluster-orchestration.svg";

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

const Components = () => {
  const componentItems = [
    {
      title: "Camunda Management Cluster",
      icon: ClusterManagementIcon,
      description:
        "Central components that can work with multiple Camunda orchestration clusters",
      // The link should point to the management cluster documentation which is not there yet.
      link: "/self-managed/about-self-managed/",
    },
    {
      title: "Camunda Orchestration Cluster",
      icon: ClusterOrchestrationIcon,
      description:
        "Workers components cluster for workflow execution that could be deployed multiple times",
      link: "/self-managed/orchestration-cluster/",
    },
  ];

  return (
    <div className="sm-components">
      <h2>Components</h2>
      <p>
        A reference for Camunda 8 components, including the management and
        orchestration clusters, detailed configuration guidance for each
        component, and application upgrade instructions.
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

export default Components;
