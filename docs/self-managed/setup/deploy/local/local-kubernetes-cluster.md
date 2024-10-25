---
id: local-kubernetes-cluster
title: "Local Kubernetes cluster"
description: "Deploy Camunda 8 Self-Managed on your Kubernetes local cluster for development purposes using kind."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

You can deploy Camunda 8 Self-Managed on your Kubernetes local cluster for development purposes using [kind](https://kind.sigs.k8s.io/).

In this guide, we will use **kind**. However, the concept is the same for other tools like K3s, minikube, or MicroK8s. The goal in this guide is to reduce the resources required by Camunda components so they can work on a personal machine.

## Preparation

Based on your system, install the CLI tools used in this guide if you don't already have them:

- [kind](https://kind.sigs.k8s.io/docs/user/quick-start)
- [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl)
- [Helm](https://helm.sh/docs/intro/install/)

## Create a local Kubernetes cluster

At this stage, you should consider how to connect to the future Camunda 8 cluster. If you are setting up Camunda 8 for the first time, we recommend using **port-forwarding** which will be described later in this article, but for now, continue to create the kind cluster.

If you are familiar with Camunda 8 deployment and are looking to start process automation development, consider using Ingress. The first step will be to complete the Ingress configuration section prerequisites in [connect to Camunda 8 components](./?c8-connectivity=ingress#connecting-to-camunda-8-components) before continuing.

If you have not done so already, create a local Kubernetes cluster with the following command:

```sh
kind create cluster --name camunda-platform-local
```

Next, switch to the new cluster context using the following command:

```sh
kubectl cluster-info --context kind-camunda-platform-local
```

## Deploy

Now it's time to deploy Camunda 8 on the local Kubernetes cluster:

1. Add the Camunda 8 Helm repository using the following command:

```
helm repo add camunda https://helm.camunda.io
helm repo update
```

2. Download the Camunda 8 Helm chart values file designed for the kind cluster: [camunda-platform-core-kind-values.yaml](https://github.com/camunda/camunda-platform-helm/blob/main/kind/camunda-platform-core-kind-values.yaml).

:::note
If you are deploying Camunda 8 with Ingress configuration, make sure to add additional values to the file you just downloaded `camunda-platform-core-kind-values.yaml` as described in [connecting to Camunda 8 components](#connecting-to-camunda-8-components).
:::

3. Install Camunda 8 using the `camunda-platform-core-kind-values.yaml` file you downloaded previously. This file might contain additional values if you are adding Ingress, TLS, or using a variety of other configuration properties. See [Camunda Helm chart parameters](https://artifacthub.io/packages/helm/camunda/camunda-platform#parameters).

4. Execute the following command:

```sh
helm install camunda-platform camunda/camunda-platform \
    -f camunda-platform-core-kind-values.yaml
```

This will deploy Camunda 8 components (Optimize, Connectors, and Zeebe), but with a set of parameters tailored to a local environment setup.

Depending on your machine hardware and internet connection speed, the services might take some time to get started as it will download the Docker images of all Camunda 8 components to your local kind cluster.

5. Check that each pod is running and ready with `kubectl get pods`. If one or more of your pods are pending for long time, it means it cannot be scheduled onto a node. Usually, this happens because there are insufficient resources that prevent it. Use the `kubectl describe <POD NAME>` command to check its status.

## Connecting to Camunda 8 components

Camunda services deployed in a Kubernetes cluster are not accessible from outside the cluster. To connect to your Camunda 8 cluster, use either port-forwarding or Kubernetes Ingress.

:::note
The setup described here skips Identity setup and uses a default basic authentication with username and password as 'demo/demo'.
:::

<Tabs groupId="c8-connectivity" defaultValue="port-forward" queryString values={
[
{label: 'Port-forwarding', value: 'port-forward' },
{label: 'Ingress configuration', value: 'ingress' }
]}>

<TabItem value="port-forward">

To interact with the Camunda services inside a Kubernetes cluster without Ingress setup, you can use the [kubectl port-forward](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_port-forward/) command to route traffic from your local machine to the services running in the kind cluster. This is useful for quick tests or for development purposes.

First, port-forward each of the components. Use a separate terminal for each command. Then, each component can be accessed at `http://localhost:PORT` (for example, Optimize will have the address `http://localhost:8083`). To get a full list of port mappings, run `helm status camunda-platform`.

## Connecting to the workflow engine

To interact with the Camunda workflow engine via Zeebe Gateway using the [Camunda 8 API](/apis-tools/camunda-api-rest/camunda-api-rest-overview.md) or a local client/worker from outside the Kubernetes cluster, run `kubectl port-forward` to the Zeebe gateway as follows:

```sh
kubectl port-forward svc/camunda-zeebe-gateway 26500:26500
```

:::note
The command `helm status camunda-platform` will print port-forward command examples for each deployed Camunda 8 component as reference.
:::

:::note
To get a full list of the deployed Camunda components and their network properties, run `kubectl get services`. In Kubernetes, a service is a method for exposing a network application that is running as one or more pods in your cluster.
:::

</TabItem>

<TabItem value="ingress">
  
Camunda 8 Self-Managed has multiple web applications and gRPC services. Both can be accessed using Kubernetes Ingress.

In this example, we will use a combined Ingress configuration. For more information, refer to [combined and separated Ingress setup](/self-managed/setup/guides/ingress-setup.md).

## Prerequisites

1. Add local host mapping so you can resolve the domain name that will be used to access the Camunda 8 cluster `camunda.local` to the local IP address `127.0.0.1`. If you are using Mac or Linux, modify the `/etc/hosts` file. For Windows, modify `c:\Windows\System32\Drivers\etc\hosts`. Add the following two lines:

```sh
127.0.0.1 camunda.local
127.0.0.1 zeebe.camunda.local
```

Now, your OS will resolve `camunda.local` addresses to the local IP address. Later in this section, we will connect this IP address to Camunda 8 services running inside the kind cluster.

2. The kind cluster must be created with `extraPortMappings` and `node-labels`. Create a `kind.config` file:

```yaml
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
  - role: control-plane
    kubeadmConfigPatches:
      - |
        kind: InitConfiguration
        nodeRegistration:
          kubeletExtraArgs:
            node-labels: "ingress-ready=true"
    extraPortMappings:
      - containerPort: 80
        hostPort: 80
      - containerPort: 443
        hostPort: 443
      - containerPort: 26500
        hostPort: 26500
      - containerPort: 18080
        hostPort: 18080
```

Modify the `kind create cluster` command to use the configuration file above. You might need to delete and re-create this cluster if you are planning to enable Ingress (see [delete kind cluster](#clean)):

```sh
kind create cluster --name camunda-platform-local --config kind.config
```

3. Install the ingress-nginx Ingress controller:

```sh
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml
```

For more information, refer to the [kind Ingress documentation](https://kind.sigs.k8s.io/docs/user/ingress/#ingress-nginx).

:::note
ingress-ngnix controller resources (pods, services, etc.) will be deployed into the `ingress-nginx` namespace. It may take a few minutes to download container images and configure deployments.
Make sure all pods are running with the `kubectl get pods --namespace ingress-nginx` command before continuing.
:::

## Ingress configuration in Camunda 8 Helm charts

In this document, we will use the combined Ingress configuration. However, there is one quirk with this particular setup to be aware of - Zeebe Gateway uses gRPC, which uses HTTP/2. This means the Zeebe Gateway has to use its own subdomain `zeebe.camunda.local` instead of context path (such as `/zeebe`).

Add the following values to `camunda-platform-core-kind-values.yaml` to allow Camunda 8 components to be discovered by the Ingress controller.

```yaml
global:
  ingress:
    enabled: true
    className: nginx
    host: "camunda.local"

operate:
  contextPath: "/operate"

tasklist:
  contextPath: "/tasklist"

zeebeGateway:
  ingress:
    enabled: true
    className: nginx
    host: "zeebe.camunda.local"
```

Proceed to install the Camunda Helm chart described in the [deploy](#deploy) section above.

</TabItem>
</Tabs>

## Clean

If you don't need the cluster anymore, you can just delete the local KIND cluster:

:::note
This is a destructive action and will destroy all data of Camunda 8 in the local development cluster.
:::

```sh
kind delete cluster --name camunda-platform-local
```

For more details about deployment options, visit the full [Helm deployment guide](/self-managed/setup/install.md).
