---
id: local-kubernetes-cluster
title: "Local Kubernetes Cluster"
description: "Deploy Camunda 8 Self-Managed on Kubernetes local cluster for development purposes using KIND."
---

import { HelmChartValuesFileLocalLink } from "@site/src/components/CamundaDistributions";

You can deploy Camunda 8 Self-Managed on Kubernetes local cluster for development purposes using [KIND](https://kind.sigs.k8s.io/).

In this guide, we will use `KIND`. However, the concept is the same for any other tool like `K3s`, `Minikube`, or `MicroK8s`. The goal in this guide is to reduce the resources required by Camunda components so they can work on a personal machine.

## Preparation

Based on your system, install the CLI tools used in this guide if you don't already have them:

- [kind](https://kind.sigs.k8s.io/docs/user/quick-start)
- [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl)
- [helm](https://helm.sh/docs/intro/install/)

## Create a local Kubernetes cluster

If you have not already, create a local Kubernetes cluster with the following command:

```shell
kind create cluster --name camunda-platform-local
```

Next, switch to the new cluster context using the following command:

```shell
kubectl config use-context kind-camunda-platform-local
```

## Deploy

Now it's time to deploy Camunda 8 on the local Kubernetes cluster.

First, add the Camunda 8 Helm repository using the following command:

```shell
helm repo add camunda https://helm.camunda.io
helm repo update
```

Next, download the Camunda 8 <HelmChartValuesFileLocalLink/>.

Lastly, install Camunda 8 using the custom values file with the following command:

```shell
helm install camunda-platform camunda/camunda-platform --version $HELM_CHART_VERSION \
    -f values-local.yaml
```

This will deploy the same components, but with a set of parameters tailored to a local environment setup.

Depending on your machine hardware and internet connection speed, the services might take some time to get started since it will download the Docker images of all Camunda 8 components to your local KIND cluster.

## Clean

If you don't need the cluster anymore, you can just delete the local KIND cluster:

:::note
This is a destructive action and will destroy all data of Camunda 8 in the local development cluster.
:::

```shell
kind delete cluster --name camunda-platform-local
```

For more details about deployment options, visit the full [Helm deployment guide](../deploy.md).
