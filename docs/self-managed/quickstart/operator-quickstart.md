---
id: operator-quickstart
title: "Operator quickstart"
sidebar_label: "Operator"
description: "This quickstart guides platform engineers and DevOps practitioners through deploying Camunda 8 Self-Managed to a local Kubernetes cluster using Kind (Kubernetes in Docker)."
---

This quickstart guides platform engineers and DevOps practitioners through deploying **Camunda 8 Self-Managed** to a local Kubernetes cluster using [Kind (Kubernetes in Docker)](https://kind.sigs.k8s.io/).

Kind is a lightweight way to run Kubernetes clusters locally and is ideal for testing and learning.

:::note
This setup is for **local evaluation only** and not intended for production use.
:::

## Prerequisites

Ensure you have the following tools installed:

- [Docker](https://docs.docker.com/get-docker/)
- [Kind](https://kind.sigs.k8s.io/docs/user/quick-start/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)
- [Helm](https://helm.sh/docs/intro/install/)

Recommended system resources:

- 4 CPU cores
- 8 GB RAM

## Step 1: Create a Kind cluster

Create a local Kubernetes cluster with containerd support and a local ingress controller. This maps the necessary ports so that Camunda components (like Operate and Zeebe) are accessible on your host.

```bash
cat <<EOF | kind create cluster --name camunda --config=-
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
  - role: control-plane
    extraPortMappings:
      - containerPort: 8080
        hostPort: 8080
      - containerPort: 26500
        hostPort: 26500
EOF
```

## Step 2: Add the Camunda Helm repo

To add the Camunda Helm repo, run the following:

```bash
helm repo add camunda https://helm.camunda.io
helm repo update
```

## Step 3: Install Camunda 8

Install the Camunda 8 Self-Managed Helm chart into the cluster:

```bash
helm install camunda camunda/camunda-platform \
  --namespace camunda \
  --create-namespace
```

This installs the core components:

- Zeebe (workflow engine)
- Operate (monitoring)
- Tasklist (user tasks)
- Identity (authentication)
- Keycloak (identity provider)

## Step 4: Verify the pods are running

Check that all components are up:

```bash
kubectl get pods -n camunda
```

Wait until all pods show `STATUS: Running`.

## Step 5: Access the web apps

You can port-forward to access Camunda web apps in your browser:

```bash
kubectl port-forward svc/camunda-operate 8080:80 -n camunda
```

Then, visit [http://localhost:8080](http://localhost:8080)

**Default login:**

- Username: demo
- Password: demo

## Step 6: Tear down the cluster

When you're done testing, delete the Kind cluster:

```bash
kind delete cluster --name camunda
```

## Next steps

- Try deploying a BPMN process using Camunda Modeler.
- Connect a job worker via the Zeebe client.
- Customize the Helm chart for production use in a full Kubernetes cluster.
- For more in-depth configuration and production tips, visit the Camunda Helm Chart docs.
