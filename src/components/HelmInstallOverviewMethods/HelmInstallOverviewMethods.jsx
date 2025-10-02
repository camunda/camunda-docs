import React from "react";
import "./styles.css";
import { activeVersionURLPath as linkBase } from "../Versions";
import UserDevIcon from "./icons/user-developer.svg";
import UserOpsIcon from "./icons/user-administrator.svg";

const HelmInstallOverviewCard = ({ link, title, icon: Icon, description }) => {
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

const HelmInstallOverviewMethods = () => {
  const helmInstallOverviewCards = [
    {
      title: "Orchestration Cluster only",
      icon: UserDevIcon,
      description:
        "Deploys only a small set of necessary components (Orchestration Cluster and connectors). Quicker and good enough for most development and testing.",
      link: "/self-managed/deployment/helm/install/#orchestration-cluster-only",
    },
    {
      title: "Full Cluster",
      icon: UserOpsIcon,
      description:
        "Deploys Orchestration Cluster, Connectors, Management Identity, Console, and Optimize.",
      link: "/self-managed/deployment/helm/install/#full-cluster",
    },
  ];

  return (
    <div className="sm-helm-install-overview">
      <p>
        There are two main ways to install Camunda Helm Charts, depending on your requirements.
      </p>
      <div className="sm-grid-2">
        {helmInstallOverviewCards.map((item, index) => (
          <HelmInstallOverviewCard
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

export default HelmInstallOverviewMethods;
