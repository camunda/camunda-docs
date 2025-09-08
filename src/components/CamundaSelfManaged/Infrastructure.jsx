import React from "react";
import "./styles.css";
import { activeVersionURLPath as linkBase } from "../Versions";
import AWSIcon from "./icons/aws.svg";
import AzureIcon from "./icons/azure.svg";
import GCPIcon from "./icons/gcp.svg";
import OpenShiftIcon from "./icons/openshift.svg";

const InfrastructureCard = ({ link, title, icon: Icon, description }) => {
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

const Infrastructure = () => {
  const infrastructureItems = [
    {
      title: "Amazon",
      icon: AWSIcon,
      description:
        "Deploy Camunda on AWS with EKS, RDS, and other AWS services.",
      link: "/self-managed/installation-methods/helm/cloud-providers/amazon/amazon-eks/",
    },
    {
      title: "Microsoft",
      icon: AzureIcon,
      description:
        "Set up Camunda on Azure with AKS and Azure Database services.",
      link: "/self-managed/installation-methods/helm/cloud-providers/azure/microsoft-aks/",
    },
    {
      title: "Google",
      icon: GCPIcon,
      description:
        "Deploy on Google Cloud Platform with GKE and other GCP services.",
      link: "/self-managed/installation-methods/helm/cloud-providers/gcp/google-gke/",
    },
    {
      title: "Red Hat OpenShift",
      icon: OpenShiftIcon,
      description: "Run Camunda on OpenShift container platform.",
      link: "/self-managed/installation-methods/helm/cloud-providers/openshift/redhat-openshift/",
    },
  ];

  return (
    <div className="sm-infrastructure">
      <h2>Infrastructure</h2>
      <p>
        Provision your cloud infrastructure to deploy Camunda 8
        Self-Managed in a scalable, secure, and production-ready environment.
      </p>
      <div className="sm-grid-4">
        {infrastructureItems.map((item, index) => (
          <InfrastructureCard
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

export default Infrastructure;
