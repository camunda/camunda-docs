---
id: local-kubernetes-cluster
title: "Local Kubernetes Cluster"
description: "Deploy Camunda Platform 8 Self-Managed on local Kubernetes cluster"
---

You can deploy Camunda Platform 8 Self-Managed on Kubernetes local cluster for development purposes using [KIND](https://kind.sigs.k8s.io/).

In this guide we will use KIND but the idea is the same for any other tool like K3s, Minikube, or MicroK8s. The main idea here is to reduce the resources required by Camunda Platform components so they can work on personal machine.

1. Download the binaries of [KIND](https://kind.sigs.k8s.io/docs/user/quick-start) depending of your system.
2. Download the Camunda Platform values file for KIND [camunda-platform-core-kind-values.yaml](https://github.com/camunda/camunda-platform-helm/blob/main/kind/camunda-platform-core-kind-values.yaml).
3. After initiating the Kubernetes cluster using KIND locally, deploy Camunda Platform using Helm and custom values file:

```
helm install my-camunda-platform camunda-cloud/camunda-platform -f camunda-platform-core-kind-values.yaml
```

This will deploy the same components, but with a set of parameters tailored to a local environment setup.

It might take some time for the services to get started depends on your internet connection speed since it will download the Docker images of all Camunda Platform components to your local KIND cluster.

For more details about deployment options, visit full [Helm deployment guide](../deployment.md).
