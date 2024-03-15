---
id: local-kubernetes-cluster
title: "Local Kubernetes Cluster"
description: "Deploy Camunda 8 Self-Managed on Kubernetes local cluster for development purposes using KIND."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

You can deploy Camunda 8 Self-Managed on Kubernetes local cluster for development purposes using [KIND](https://kind.sigs.k8s.io/).

In this guide, we will use `KIND`. However, the concept is the same for any other tool like `K3s`, `Minikube`, or `MicroK8s`. The goal in this guide is to reduce the resources required by Camunda components so they can work on a personal machine.

## Preparation

Based on your system, install the CLI tools used in this guide if you don't already have them:

- [kind](https://kind.sigs.k8s.io/docs/user/quick-start)
- [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl)
- [helm](https://helm.sh/docs/intro/install/)

## Create a local Kubernetes cluster

At this stage, you should consider how to connect to the future Camunda 8 cluster. If you are setting up Camunda 8 for the first time, we recommend using **port-forwarding**, in which case you may continue to the create KIND cluster.
If you are familiar with Camunda 8 deployment and are looking to start process automation development, consider using Ingress. In this case, complete the Ingress configuration Prerequisites section [Connecting](#connecting-to-camunda-8-components) to Camunda 8 components](#connecting-to-camunda-8-components).

If you have not done it already, create a local Kubernetes cluster with the following command:

```sh
kind create cluster --name camunda-platform-local
```

Next, switch to the new cluster context using the following command:

```sh
kubectl cluster-info --context kind-camunda-platform-local
```

## Deploy

Now it's time to deploy Camunda 8 on the local Kubernetes cluster.

First, add the Camunda 8 Helm repository using the following command:

```
helm repo add camunda https://helm.camunda.io
helm repo update
```

Next, download the Camunda 8 Helm chart values file designed for the KIND cluster: [camunda-platform-core-kind-values.yaml](https://github.com/camunda/camunda-platform-helm/blob/main/kind/camunda-platform-core-kind-values.yaml).

:::note
If you are deploying Camunda 8 with Ingress configuration, make sure to add additional values to the file you just downloaded `camunda-platform-core-kind-values.yaml` as described in the [Connecting to Camunda 8 components](#connecting-to-camunda-8-components) section.
:::

Lastly, install Camunda 8 using the `camunda-platform-core-kind-values.yaml` file downloaded in a previous step. This file might contain additional value if you are adding Ingress, TLS, or using a variety of other configuration properties [Camunda Helm Chart Parameters](https://artifacthub.io/packages/helm/camunda/camunda-platform#parameters) )
Execute the following command:

```sh
helm install camunda-platform camunda/camunda-platform \
    -f camunda-platform-core-kind-values.yaml
```

This will deploy Camunda 8 components (Optimize, Connectors, and Zeebe), but with a set of parameters tailored to a local environment setup.

Depending on your machine hardware and internet connection speed, the services might take some time to get started since it will download the Docker images of all Camunda 8 components to your local KIND cluster.
Check that each pod is running and ready with `kubectl get pods`. If one or more of your pods are pending for long time, it means it cannot be scheduled onto a node. Usually, this happens because there are insufficient resources that prevent it. Use the `kubectl describe <POD NAME>` command to check its status.

## Connecting to Camunda 8 components

Camunda services deployed in a Kubernetes cluster are not accessible from outside the cluster. To connect to your Camunda 8 cluster, you can use either Port-forwarding or Kubernetes Ingress.
Please note, that the setup described here skips Identity setup and uses a default basic authentication with username and password as 'demo/demo'.

<Tabs groupId="c8-connectivity">
  <TabItem value="port-forward" label="Port-Forwarding">

To interact with the Camunda services inside a Kubernetes cluster without Ingress setup, you can use [kubectl port-forward](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_port-forward/) command to route traffic from your local machine to the services running in the `KIND` cluster. This is useful for quick tests or for development purposes.

First, port-forward each of the components. Use a separate terminal for each command:
Then each component could be accessed on http://localhost:PORT (e.g., Optimize will have the address http://localhost:8083). A full list of port mapping contains in a helm deployment status i.e. `helm status camunda-platform`

### Connecting to the workflow engine

To interact with the Camunda workflow engine via Zeebe Gateway using [zbctl](https://docs.camunda.io/docs/apis-tools/cli-client/) or a local client/worker from outside the Kubernetes cluster, run `kubectl port-forward` to the Zeebe gateway as follows:

```sh
kubectl port-forward svc/camunda-zeebe-gateway 26500:26500
```

:::note
Command `helm status camunda-platform` will print port-forward comand examples for each deployed Camunda 8 component as a reference.
:::

:::note
To get a full list of the deployed Camunda components and their network properties, run `kubectl get services`. In Kubernetes, a Service is a method for exposing a network application that is running as one or more Pods in your cluster.
:::

  </TabItem>

  <TabItem value="Ingress" label="Ingress Configuration">
  
Camunda 8 Self-Managed has multiple web applications and gRPC services. Both can be accessed using Kubernetes Ingress.
In this example, we will use a combined ingress configuration. For more information, please refer to the [Combined and separated Ingress setup](https://docs.camunda.io/docs/self-managed/platform-deployment/helm-kubernetes/guides/ingress-setup/) guide.

#### Prerequisites:

1. Add local host mapping so that we can resolve the domain name that will be used to access Camunda 8 cluster `camunda.local` to the local IP address `127.0.0.1`.
   If you are using Mac or Linux, you need to modify `/etc/hosts` file, for Windows, you need to modify `c:\Windows\System32\Drivers\etc\hosts`. Add following two lines:

```sh
127.0.0.1 camunda.local
127.0.0.1 zeebe.camunda.local
```

Now, your OS will resolve `camunda.local` addresses to the local IP address, later in this section, we will connect this IP address to Camunda 8 services running inside of the KIND cluster.

2. The `KIND` cluster must be created with `extraPortMappings` and `node-labels`. Create `kind.config` file as following:

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

Modify KIND create cluster command to use the above configuration file. You might need to delete and re-create this cluster if you are planning to enable Ingress (see [Delete KIND cluster](#clean) ):

```sh
kind create cluster --name camunda-platform-local --config kind.config
```

3. Install `ingress-nginx` ingress controller:

```sh
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml
```

For more information, please refer to [kind Ingress documenation](https://kind.sigs.k8s.io/docs/user/ingress/#ingress-nginx)

:::note
ingress-ngnix controller resources (pods, services, etc) will be deployed into `ingress-nginx` namespace. It may take a few minutes to download container images and configure deployments.
Make sure that all pods are running with `kubectl get pods --namespace ingress-nginx` command before continuing.
:::

### Ingress configuration in Camunda 8 Helm Charts:

In this article, we will use the combined Ingress configuration. However, there is one quirk with this particular setup to be aware of - Zeebe Gateway uses gRPC, which uses HTTP/2. This means that Zeebe Gateway has to use its own subdomain `zeebe.camunda.local` instead of context path (i.e `/zeebe`).

Add the following values to the `camunda-platform-core-kind-values.yaml` to allow Camunda 8 components discovered by the Ingress controller.

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

zeebe-gateway:
ingress:
    enabled: true
    className: nginx
    host: "zeebe.camunda.local"
```

Proceed to install Camunda HELM Chart [Deploy](#deploy)

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

For more details about deployment options, visit the full [Helm deployment guide](../deploy.md).
