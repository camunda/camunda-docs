import IconConfig from "../assets/icon-config.png";
import IconPrereqs from "../assets/icon-config.png";
import IconExample from "../assets/icon-config.png";
import IconC8Run from "../assets/icon-sm-c8run.png";
import IconDocker from "../assets/icon-sm-docker.png";
import IconKubernetes from "../assets/icon-sm-kubernetes.png";

// Getting started cards on introduction page
export const gettingStartedCards = [
  {
    link: "../setup/deploy/local/c8run",
    title: "Camunda 8 Run",
    image: IconC8Run,
    description:
      "Install and run a simplified, single-application Camunda configuration.",
  },
  {
    link: "../setup/deploy/local/docker-compose",
    title: "Docker Compose",
    image: IconDocker,
    description:
      "Use a Docker Compose configuration to run Camunda Self-Managed.",
  },
  {
    link: "../setup/deploy/local/local-kubernetes-cluster",
    title: "Local Kubernetes cluster",
    image: IconKubernetes,
    description:
      "Deploy Camunda 8 Self-Managed on your Kubernetes local cluster.",
  },
];

// Installation cards on introduction page
export const installCards = [
  {
    link: "../setup/overview",
    title: "Install",
    image: IconConfig,
    description:
      "Install Camunda 8 Self-Managed using Helm, Docker, or manually.",
  },
  {
    link: "../reference-architecture",
    title: "Reference architectures",
    image: IconPrereqs,
    description:
      "Deployment guidance for enterprise architects, developers, and IT.",
  },
  {
    link: "../update",
    title: "Update",
    image: IconExample,
    description:
      "Learn how to upgrade via Helm and update to a newer version.",
  },
];
