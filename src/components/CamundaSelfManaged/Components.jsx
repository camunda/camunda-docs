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
      link: "/self-managed/components/orchestration-cluster/overview",
    },
    {
      title: "Connectors",
      icon: ClusterOrchestrationIcon,
      description:
        "Camunda connectors are reusable building blocks you can use to easily connect processes to external systems, applications, and data.",
      link: "/self-managed/components/connectors/overview",
    },
    {
      title: "Optimize",
      icon: ClusterOrchestrationIcon,
      description:
        "Optimize offers business intelligence tooling for Camunda enterprise customers.",
      link: "/self-managed/components/optimize/overview",
    },
    {
      title: "Web Modeler",
      icon: ClusterOrchestrationIcon,
      description:
        "Design and implement your first diagram using Modeler, a component of Camunda.",
      link: "/self-managed/components/modeler/web-modeler/overview",
    },
    {
      title: "Console",
      icon: ClusterOrchestrationIcon,
      description:
        "Camunda Console (Self-Managed) provides a centralized interface for monitoring and managing your Camunda 8 deployments.",
      link: "/self-managed/components/console/overview",
    },
    {
      title: "Management Identity",
      icon: ClusterOrchestrationIcon,
      description:
        "Use Identity to manage users, groups, roles, permissions, and applications within the Camunda 8 platform.",
      link: "/self-managed/components/management-identity/what-is-identity",
    },
  ];

  return (
    <div className="sm-components">
      <h2>Components</h2>
      <p>
        A reference for Camunda 8 components, including detailed configuration 
        guidance for each component and application upgrade instructions.
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
