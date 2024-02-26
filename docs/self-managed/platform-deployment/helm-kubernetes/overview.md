---
id: overview
title: "Camunda 8 on Kubernetes"
sidebar_label: "Overview"
description: "An overview of Kubernetes, its environments, and officially supported platforms"
---

We strongly recommend using Kubernetes and Helm to deploy and run Camunda 8 Self-Managed in production.

There are many ways you can provision and configure a Kubernetes cluster, and there are a number of architectural choices you need to make. Will your workers run in the Kubernetes cluster or external to it? You will need to configure your Kubernetes cluster and modify this to suit the architecture you are building.

## Kubernetes environments

You can install Camunda 8 on your [CNCF Certified Kubernetes](https://www.cncf.io/training/certification/software-conformance/) environment of choice, e.g.:

- [Kubernetes KIND](https://github.com/kubernetes-sigs/kind), Minikube, K3s, and MicroK8s for local development.
- [Red Hat OpenShift](./platforms/redhat-openshift.md), an enterprise ready solution with a focus on security.
- Cloud service providers:
    - [Amazon EKS](./platforms/amazon-eks/amazon-eks.md)
    - [Google GKE](./platforms/google-gke.md)
    - [Azure AKS](./platforms/microsoft-aks.md)

## Officially supported platforms

With the right configuration, Camunda 8 Self-Managed can be deployed on any Kubernetes distribution (Cloud or on-premise). 
- Camunda 8 self-managed supports the following [CNCF Certified Kubernetes distributions](https://www.cncf.io/training/certification/software-conformance/). Some distributions include custom patches or upstream source code changes. Camunda will not provide support for issues arising from these changes.
- We test and validate a [limited list of platforms](./platforms/platforms.md).

## Versioning

Starting from the Camunda v8.4 (January 2024), the Camunda 8 **Helm chart** version is decoupled from the version of the application (e.g., the chart version is 9.0.0 and the application version is 8.4.x).

For more details about the applications version included in the Helm chart, review the [full version matrix](https://helm.camunda.io/camunda-platform/version-matrix/).

## Use Helm to install on Kubernetes

There are several alternatives to deploy applications to a Kubernetes cluster, but we recommend using our provided Helm charts to deploy a set of components into your cluster. Helm allows you to choose exactly what chart (set of components) you want to install and how these components need to be configured.

At [helm.camunda.io](https://helm.camunda.io/), you'll find a Helm chart to configure a 3-broker cluster with:

- Two Elasticsearch instances
- Operate
- Two Zeebe Gateways
- Tasklist.

This size is comparable with the Production-S cluster plan in [Camunda 8 SaaS](https://camunda.com/get-started/). It should be sufficient for 80% of use cases.

Refer to the [documentation on Camunda's Helm charts](./deploy.md) for details.

To do, you must have the following tools installed in your local environment:

- `kubectl`: Kubernetes Control CLI tool, installed and connected to your cluster
- `helm`: Kubernetes Helm CLI tool

## Useful tools related to Camunda

- **Camunda Desktop Modeler**: [To model/modify business processes](/components/modeler/desktop-modeler/index.md).
- **Zeebe CTL (`zbctl`)**: Command line tool to interact with a Zeebe cluster (local/remote). You can get the `zbctl` tool from the official [Zeebe release page](https://github.com/camunda-cloud/zeebe/releases).
