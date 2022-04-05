---
id: index
title: "Kubernetes deployment"
sidebar_label: "Overview"
---

We recommend you to use Kubernetes when deploying Camunda Cloud Self-Managed to production.

This chapter is divided into the following sections:

- [General information](index.md#general-information)
- [Prerequisites](index.md#prerequisites)
- [Getting to know and installing Camunda Cloud Helm charts](./helm/installing-helm.md)
- [Accessing Operate from outside a Kubernetes cluster](./helm/accessing-operate-tasklist.md)

## General information

### Broker

Zeebe broker nodes need to be deployed as a [StatefulSet](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/) 
to preserve the identity of cluster nodes. StatefulSets require persistent storage, which must be allocated in advance. Depending on your 
cloud provider, the persistent storage differs as it is provider-specific.

At [helm.camunda.io](https://helm.camunda.io/), you'll find a Helm chart to configure a three-broker cluster with two Elasticsearch instances,
Operate, two Zeebe Gateways and Tasklist. This size is comparable with the Production-S cluster plan in Camunda Cloud SaaS. It should be sufficient 
for 80% of use cases.

There are many ways you can provision and configure a Kubernetes cluster, and there are a number of architectural choices 
you need to make. Will your workers run in the Kubernetes cluster or external to it?

You will need to configure your Kubernetes cluster and modify this to suit the architecture you are building.

### Gateway

Zeebe gateway is deployed as a stateless service.

We support [Kubernetes startup and liveness probes](../operations/health.md#gateway) for Zeebe gateway.

### Helm

There are several alternatives to deploy applications to a Kubernetes cluster, but the following sections use Helm charts 
to deploy a set of components into your cluster.

Helm allows you to choose exactly what chart (set of components) you want to install and how these components need to be configured.

These Helm charts are continuously being improved and released to the [Camunda Cloud Helm Chart Repository](https://github.com/camunda-community-hub/camunda-cloud-helm).

You are free to choose your Kubernetes provider as our Helm charts are not cloud provider-specific.

We encourage [reporting issues](https://github.com/camunda-community-hub/camunda-cloud-helm/issues) if you find them.

## Prerequisites

To use Kubernetes, you must have the following tools installed in your local environment:

- `kubectl`: Kubernetes Control CLI tool, installed and connected to your cluster
- `helm`: Kubernetes Helm CLI tool

You also need a Kubernetes cluster. You have several options:

- Local for development, you can use [Kubernetes KIND](https://github.com/kubernetes-sigs/kind), Minikube, and MicroK8s.
- Remote: Google GKE, Azure AKS, Amazon EKS, etc.

:::note 
Be aware that we only officially support the GKE environment.
Feel free to try different trials from cloud providers to create a Kubernetes cluster to test Camunda Cloud Self-Managed in your cloud.
:::

Optional tools related to Camunda Cloud:

- Camunda Modeler: to model/modify business processes. Install Camunda Modeler [here](/components/modeler/desktop-modeler/install-the-modeler.md).
- Zeebe CTL(`zbctl`): command line tool to interact with a Zeebe cluster (local/remote). You can get the `zbctl` tool from the official
[Zeebe release page](https://github.com/camunda-cloud/zeebe/releases).
