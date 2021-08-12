---
id: prerequisites
title: "Prerequisites"
description: "This document outlines the prerequisites necessary to get started."
---

In order to use Kubernetes you need to have the following tools installed in your local environment: 
- `kubectl`: Kubernetes Control CLI tool: installed and connected to your cluster
- `helm`: Kubernetes Helm CLI tool

You also need a Kubernetes Cluster, here you have several options:
  - Local for development you can use: [Kubernetes KIND](https://github.com/kubernetes-sigs/kind), Minikube, MicroK8s
  - Remote: Google GKE, Azure AKS, Amazon EKS, etc.

> Notice that you can use free trials from different cloud providers to create Kubernetes cluster to test Zeebe in the cloud. 

Optional tools related to Zeebe
- Camunda Modeler: to model/modify business processes [Camunda Modeler releases](https://camunda.com/download/modeler/)
- Zeebe CTL(`zbctl`): command line tool to interact with a Zeebe cluster (local/remote). You can get the `zbctl` tool from the official [Zeebe release page](https://github.com/camunda-cloud/zeebe/releases)


