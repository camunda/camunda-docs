import React from "react";
import "./styles.css";
import { activeVersionURLPath as linkBase } from "../Versions";
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
      title: "Orchestration cluster",
      icon: ClusterOrchestrationIcon,
      description:
        "The Orchestration Cluster is the core component of Camunda 8, powering the automation and orchestration of processes.",
      link: "/self-managed/orchestration-cluster/",
    },
    {
      title: "Connectors",
      icon: ClusterOrchestrationIcon,
      description:
        "Camunda connectors are reusable building blocks you can use to easily connect processes to external systems, applications, and data.",
      link: "/self-managed/connectors-deployment/install-and-start",
    },
    {
      title: "Optimize",
      icon: ClusterOrchestrationIcon,
      description:
        "Optimize offers business intelligence tooling for Camunda enterprise customers.",
      link: "/self-managed/optimize-deployment/install-and-start",
    },
  ];

  return (
    <div className="sm-components">
      <h2>Orchestration components</h2>
      <p>
        A reference for Camunda 8 components, including the management and
        orchestration clusters, Connectors, Optimize, and detailed configuration
        guidance for each component, and application upgrade instructions.
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
