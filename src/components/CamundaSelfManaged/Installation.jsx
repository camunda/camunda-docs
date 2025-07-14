import React from "react";
import "./styles.css";
import { activeVersionURLPath as linkBase } from "../Versions";
import K8sIcon from "./icons/kubernetes.svg";
import DockerIcon from "./icons/docker.svg";
import JarIcon from "./icons/jar.svg";

const InstallationCard = ({ link, title, icon: Icon, description }) => {
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

const Installation = () => {
  const InstallationItems = [
    {
      title: "Kubernetes with Helm",
      icon: K8sIcon,
      description:
        "Deploy Camunda on Kubernetes using Helm charts for easy management",
      link: "/self-managed/installation-methods/helm/",
    },
    {
      title: "Docker",
      icon: DockerIcon,
      description: "Run individual Camunda components in Docker containers",
      link: "/self-managed/installation-methods/docker/",
    },
    {
      title: "Manual JAR",
      icon: JarIcon,
      description: "Direct installation and configuration using JAR files",
      link: "/self-managed/installation-methods/manual/manual-install/",
    },
  ];

  return (
    <div className="sm-installation">
      <h2>Installation Methods</h2>
      <p>
        The recommended approaches for installing Camunda 8 Self-Managed in
        production-ready environments, whether in the Cloud or on-premises.
      </p>
      <div className="sm-grid sm-grid-horizontal">
        {InstallationItems.map((item, index) => (
          <InstallationCard
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

export default Installation;
