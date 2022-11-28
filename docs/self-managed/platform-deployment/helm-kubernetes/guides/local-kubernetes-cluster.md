---
id: local-kubernetes-cluster
title: "Local Kubernetes Cluster"
description: "Deploy Camunda Platform 8 Self-Managed on local Kubernetes cluster"
---

You can deploy Camunda Platform 8 Self-Managed on Kubernetes local cluster for development purposes using [KIND](https://kind.sigs.k8s.io/).

In this guide we will use `KIND` but the idea is the same for any other tool like `K3s`, `Minikube`, or `MicroK8s`. The main idea here is to reduce the resources required by Camunda Platform components so they can work on personal machine.

## Preparation

Based on your system, install the CLI tools used in this guide if you don't have them:

- [kind](https://kind.sigs.k8s.io/docs/user/quick-start)
- [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl)
- [helm](https://helm.sh/docs/intro/install/)

## Create local Kubernetes cluster

If you didn't do that already, create the local Kubernetes cluster:

```sh
kind create cluster --name camunda-platform-local
```

Now make sure to switch to the new cluster context:

```
kubectl cluster-info --context kind-camunda-platform-local
```

## Deploy

Now it's time to deploy Camunda Platform 8 on the local Kubernetes cluster.

First, add Camunda Platform 8 Helm repository:

```
helm repo add camunda https://helm.camunda.io
helm repo update
```

Second, download the Camunda Platform 8 values file for KIND [camunda-platform-core-kind-values.yaml](https://github.com/camunda/camunda-platform-helm/blob/main/kind/camunda-platform-core-kind-values.yaml).

Finally, install Camunda Platform 8 using the custom values file:

```
helm install dev camunda/camunda-platform \
    -f camunda-platform-core-kind-values.yaml
```

This will deploy the same components, but with a set of parameters tailored to a local environment setup.

Depending on your machine hardware and Internet connection speed, the services might take some time to get started since it will download the Docker images of all Camunda Platform 8 components to your local KIND cluster.

## Clean

If you don't need the cluster anymore, you can just delete the local KIND cluster:

:::note
This is a destructive action and will destroy all data of Camunda Platform 8 in the local development cluster.
:::

```sh
kind delete cluster --name camunda-platform-local
```

In the end, for more details about deployment options, visit the full [Helm deployment guide](../deploy.md).
