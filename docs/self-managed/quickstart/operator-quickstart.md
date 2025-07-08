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

Make sure you have the following tools installed:

- [Docker](https://docs.docker.com/get-docker/)
- [Kind](https://kind.sigs.k8s.io/docs/user/quick-start/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)
- [Helm](https://helm.sh/docs/intro/install/)
- [zbctl](https://github.com/camunda-community-hub/zeebe-client-go/blob/main/cmd/zbctl/zbctl.md) (Zeebe CLI)

Recommended system resources:

- 4 CPU cores
- 8 GB RAM

## Step 1: Create a Kind cluster

Create a local Kubernetes cluster with containerd support and a local Ingress controller. This maps the necessary ports so that Camunda components (like Operate and Zeebe) are accessible on your host.

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

### Operate

```bash
kubectl port-forward svc/camunda-operate 8080:80 -n camunda
```

Visit [http://localhost:8080](http://localhost:8080).

Log in with:

- Username: demo
- Password: demo

### Tasklist

In a separate terminal:

```bash
kubectl port-forward svc/camunda-tasklist 8081:80 -n camunda
```

Visit [http://localhost:8081](http://localhost:8081).

Log in with:

- Username: demo
- Password: demo

## Step 6: Deploy a sample process

1. [Download and open Camunda Modeler](https://camunda.com/download/modeler/).
2. Create a simple BPMN diagram:

```css
[Start Event] → [User Task: "Review Request"] → [End Event]
```

3. Set the user task properties with an ID of `reviewRequest` and an assignee of `demo`.
4. Save the diagram as `review-request.bpmn`.
5. Deploy it using zbctl:

```bash
zbctl --insecure \
  --address localhost:26500 \
  deploy review-request.bpmn
```

## Step 7: Start a process instance

```bash
zbctl --insecure \
  --address localhost:26500 \
  create instance review-request
```

You should see a process instance ID returned.

## Step 8: View the process in Operate

Go back to [http://localhost:8080](http://localhost:8080) and:

1. Log in with `demo` / `demo`.
2. Navigate to process instances.
3. Confirm your running instance is visible and waiting at the user task.

## Step 9: Complete the task in Tasklist

Visit [http://localhost:8081](http://localhost:8081)

1. Log in with `demo` / `demo`.
2. Find the review request task and complete it.

Once completed, go back to Operate to confirm the process has finished.

## Step 10: Tear down the cluster

When you're finished testing:

```bash
kind delete cluster --name camunda
```

## Next steps

- Connect a custom job worker to Zeebe
- Explore Helm configuration options for production
- Integrate with external identity providers or databases

For more in-depth options, visit the [Camunda Helm chart docs](https://github.com/camunda/camunda-platform-helm).
