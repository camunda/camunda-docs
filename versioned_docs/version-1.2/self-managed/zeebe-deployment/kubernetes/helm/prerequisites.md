---
id: prerequisites
title: "Prerequisites"
description: "This document outlines the prerequisites necessary to get started."
---

To use Kubernetes, you must have the following tools installed in your local environment:

- `kubectl`: Kubernetes Control CLI tool, installed and connected to your cluster
- `helm`: Kubernetes Helm CLI tool

You also need a Kubernetes Cluster, here you have several options:

- Local for development you can use: [Kubernetes KIND](https://github.com/kubernetes-sigs/kind), Minikube, MicroK8s.
- Remote: Google GKE, Azure AKS, Amazon EKS, etc.

:::note
You can use free trials from different cloud providers to create a Kubernetes cluster to test Zeebe in the cloud.
::: 

Optional tools related to Zeebe:

- Camunda Modeler: to model/modify business processes. Install Camunda Modeler [here](/components/modeler/camunda-modeler/install-the-modeler.md).
- Zeebe CTL(`zbctl`): command line tool to interact with a Zeebe cluster (local/remote). You can get the `zbctl` tool from the official [Zeebe release page](https://github.com/camunda-cloud/zeebe/releases).


