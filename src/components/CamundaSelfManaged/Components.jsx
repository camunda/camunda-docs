import React from "react";
import "./styles.css";
import { activeVersionURLPath as linkBase } from "../Versions";
import ModelerIcon from "./icons/icon-modeler.svg";
import ClusterOrchestrationIcon from "./icons/icon-orchestration-cluster.svg";
import ConnectorsIcon from "./icons/icon-connectors.svg";
import OptimizeIcon from "./icons/icon-optimize.svg";
import ConsoleIcon from "./icons/icon-console.svg";
import IdentityIcon from "./icons/icon-identity.svg";

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
        "The core component that powers automation and process orchestration.",
      link: "/self-managed/components/orchestration-cluster/overview",
    },
    {
      title: "Connectors",
      icon: ConnectorsIcon,
      description:
        "Connect processes to external systems, applications, and data.",
      link: "/self-managed/components/connectors/overview",
    },
    {
      title: "Optimize",
      icon: OptimizeIcon,
      description:
        "Business intelligence and analytics for enterprise customers.",
      link: "/self-managed/components/optimize/overview",
    },
    {
      title: "Web Modeler",
      icon: ModelerIcon,
      description:
        "Use Web Modeler and Desktop Modeler to model your BPMN diagrams.",
      link: "/self-managed/components/modeler/web-modeler/overview",
    },
    {
      title: "Console",
      icon: ConsoleIcon,
      description:
        "Manage and monitor your Camunda 8 Self-Managed deployments.",
      link: "/self-managed/components/console/overview",
    },
    {
      title: "Management Identity",
      icon: IdentityIcon,
      description:
        "Manage Camunda users, groups, roles, permissions, and applications.",
      link: "/self-managed/components/management-identity/what-is-identity",
    },
  ];

  return (
    <div className="sm-components">
      <h2>Components</h2>
      <p>
        Camunda 8 components reference, including detailed configuration
        guidance and application upgrade instructions.
      </p>
      <div className="sm-grid">
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
