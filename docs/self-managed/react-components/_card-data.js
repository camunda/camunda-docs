import IconConfig from "../assets/icon-config.png";
import IconRefArch from "../assets/icon-sm-refarch.png";
import IconUpdate from "../assets/icon-sm-update.png";
import IconC8Run from "../assets/icon-sm-c8run.png";
import IconDocker from "../assets/icon-sm-docker.png";
import IconKubernetes from "../assets/icon-sm-kubernetes.png";
import IconManual from "../assets/icon-sm-manual.png";
import IconJar from "../assets/icon-sm-jar.png";

// Getting started cards on introduction page
export const gettingStartedCards = [
  {
    link: "../setup/deploy/local/c8run",
    title: "Camunda 8 Run",
    image: IconC8Run,
    description: "Install and run our simplified, single-application Camunda 8 configuration.",
  },
  {
    link: "../setup/deploy/local/docker-compose",
    title: "Docker Compose",
    image: IconDocker,
    description: "Use a Docker Compose configuration to run Camunda Self-Managed.",
  },
  {
    link: "../setup/deploy/local/local-kubernetes-cluster",
    title: "Local Kubernetes cluster",
    image: IconKubernetes,
    description: "Deploy Camunda 8 Self-Managed on your local Kubernetes cluster.",
  },
];

// Installation cards on introduction page
export const installCards = [
  {
    link: "../setup/install",
    title: "Helm",
    image: IconKubernetes,
    description: "Use Kubernetes and Helm to deploy and run Camunda 8 Self-Managed.",
  },
  {
    link: "../setup/deploy/other/docker",
    title: "Docker",
    image: IconDocker,
    description: "Use Docker to deploy and run Camunda 8 Self-Managed.",
  },
  {
    link: "../setup/deploy/local/manual",
    title: "Manual",
    image: IconManual,
    description: "Manually install Camunda 8 on a local or virtual machine.",
  },
];

// Reference architectures cards on introduction page
export const referenceCards = [
  {
    link: "../reference-architecture/kubernetes",
    title: "Kubernetes",
    image: IconKubernetes,
    description: "Deploy Camunda 8 Self-Managed within a Kubernetes cluster.",
  },
  {
    link: "../setup/deploy/other/docker",
    title: "Manual Jar",
    image: IconJar,
    description: "Use Docker to deploy and run Camunda 8 Self-Managed.",
  },
  {
    link: "../setup/deploy/local/manual",
    title: "Manual",
    image: IconManual,
    description: "Manually install Camunda 8 on a local or virtual machine.",
  },
    {
    link: "../reference-architecture/kubernetes",
    title: "Kubernetes",
    image: IconKubernetes,
    description: "Deploy Camunda 8 Self-Managed within a Kubernetes cluster.",
  },
  {
    link: "../setup/deploy/other/docker",
    title: "Manual Jar",
    image: IconJar,
    description: "Use Docker to deploy and run Camunda 8 Self-Managed.",
  },
  {
    link: "../setup/deploy/local/manual",
    title: "Manual",
    image: IconManual,
    description: "Manually install Camunda 8 on a local or virtual machine.",
  },
];

// Update cards on introduction page
export const updateCards = [
  {
    link: "../reference-architecture/kubernetes",
    title: "Update",
    image: "",
    description: "Upgrade Helm charts, and update your installation version.",
  },
  {
    link: "../setup/deploy/other/docker",
    title: "Configure",
    image: "",
    description: "Configure Camunda 8 beyond the default values.",
  },
];
