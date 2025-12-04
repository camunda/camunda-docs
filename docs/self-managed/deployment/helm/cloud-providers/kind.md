---
id: kind
title: "Deploy Camunda 8 on kind (local development)"
sidebar_label: "kind (local)"
description: "Deploy Camunda 8 Self-Managed on a local Kubernetes cluster using kind for development and testing purposes."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

This guide provides a step-by-step tutorial for deploying Camunda 8 Self-Managed on a local Kubernetes cluster using [kind (Kubernetes in Docker)](https://kind.sigs.k8s.io/). This setup is ideal for development, testing, and learning purposes.

:::info Other local Kubernetes tools
While this guide uses kind, the same concepts apply to other local Kubernetes tools like [K3s](https://k3s.io/), [minikube](https://minikube.sigs.k8s.io/), or [MicroK8s](https://microk8s.io/). The goal is to reduce the resources required by Camunda components so they can run on a personal machine.
:::

:::warning Local development only
This setup is intended for **local development only** and should not be used in production environments. For production deployments, refer to our [cloud provider guides](/self-managed/deployment/helm/cloud-providers/index.md).
:::

## Overview

Two deployment modes are available:

| Mode          | Access                        | Requirements                    | Use case                              |
| ------------- | ----------------------------- | ------------------------------- | ------------------------------------- |
| **Domain**    | `https://camunda.example.com` | mkcert, hosts file modification | Full TLS setup, realistic environment |
| **No-domain** | `localhost` via port-forward  | None                            | Quick setup, minimal configuration    |

### How domain mode works

In domain mode, we simulate a production-like environment locally by:

1. **Local DNS resolution**: Your machine's `/etc/hosts` file is configured to resolve `camunda.example.com` to `127.0.0.1`. Inside the cluster, CoreDNS is configured to rewrite DNS queries for this domain to the Ingress controller, allowing pods to communicate with each other using the same domain name.

2. **TLS certificates with mkcert**: [mkcert](https://github.com/FiloSottile/mkcert) generates locally-trusted certificates by installing a local Certificate Authority (CA) in your system's trust store. This allows your browser to trust the self-signed certificates without security warnings. The CA certificate is also mounted into pods that need to make HTTPS calls to other Camunda components.

:::note Firefox compatibility
mkcert requires [NSS](https://github.com/FiloSottile/mkcert#supported-root-stores) to work properly with Firefox. Without it, Firefox will display certificate errors. We recommend using **Chrome** or **Chromium-based browsers** for the best experience with domain mode.
:::

## Prerequisites

Before you begin, ensure you have:

- **Docker** installed and running ([Docker Desktop](https://www.docker.com/products/docker-desktop) or Docker Engine)
- **4+ CPU cores** and **8GB+ RAM** available for Docker
- Terminal access with administrator/sudo privileges (for hosts file modification in domain mode)

### Required tools

The following tools are required. Install them using [asdf](https://asdf-vm.com/) with the versions defined in [.tool-versions](https://github.com/camunda/camunda-deployment-references/blob/feature/kind-local/.tool-versions), or manually via the official installation guides:

- [kind](https://kind.sigs.k8s.io/docs/user/quick-start/#installation)
- [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl)
- [Helm](https://helm.sh/docs/intro/install/)
- [mkcert](https://github.com/FiloSottile/mkcert#installation) (domain mode only)

## Outcome

By the end of this tutorial, you will have:

- A local Kubernetes cluster running with kind (1 control-plane + 2 worker nodes)
- (Domain mode) Ingress NGINX controller deployed for traffic routing
- (Domain mode) TLS certificates configured with mkcert
- Camunda 8 Self-Managed fully deployed and accessible

## Obtain the reference architecture

Download the reference architecture files that will be used throughout this guide:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/feature/kind-local/local/kubernetes/kind-single-region/procedure/get-your-copy.sh
```

Navigate to the reference architecture directory:

```bash
cd local/kubernetes/kind-single-region
```

All subsequent commands should be run from this directory.

:::info Explore the repository
Before proceeding, take some time to explore the repository structure and understand the configuration files, scripts, and Helm values. This will help you understand what each step does and how to customize the deployment for your needs.
:::

:::tip Makefile utilities
The reference architecture includes a `Makefile` with useful commands to automate the deployment process. Run `make help` to see all available targets, or consult the [Makefile](https://github.com/camunda/camunda-deployment-references/blob/feature/kind-local/local/kubernetes/kind-single-region/Makefile) directly.
:::

## Create the Kubernetes cluster

Create a kind cluster with the provided configuration. This configuration sets up a cluster with one control-plane node and two worker nodes, with port mappings for Ingress.

The cluster is configured with port mappings for HTTP (80) and HTTPS (443) traffic:

```yaml reference
https://github.com/camunda/camunda-deployment-references/blob/feature/kind-local/local/kubernetes/kind-single-region/configs/kind-cluster-config.yaml
```

Run the cluster creation script:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/feature/kind-local/local/kubernetes/kind-single-region/procedure/cluster-create.sh
```

This script:

1. Creates a kind cluster named `camunda-platform-local`
2. Waits for all nodes to be ready
3. Creates the `camunda` namespace

Verify the cluster is running:

```bash
kubectl get nodes
```

You should see three nodes in `Ready` state.

Switch to the new cluster context:

```bash
kubectl cluster-info --context kind-camunda-platform-local
```

## Domain mode deployment {#domain-mode-deployment}

:::tip Quick setup without TLS
If you prefer a simpler setup without domain configuration, skip to [No-domain mode deployment](#no-domain-mode-deployment).
:::

This section covers the full domain mode setup with TLS certificates and Ingress.

### Deploy the Ingress controller

Deploy the Ingress NGINX controller to handle incoming traffic:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/feature/kind-local/local/kubernetes/kind-single-region/procedure/ingress-nginx-deploy.sh
```

This script:

1. Installs Ingress NGINX via Helm
2. Configures it to run on the control-plane node with `hostNetwork: true`
3. Waits for the controller to be ready

Verify the Ingress controller is running:

```bash
kubectl get pods -n ingress-nginx
```

### Configure DNS resolution

For pods inside the cluster to resolve `camunda.example.com`, configure CoreDNS to rewrite DNS queries:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/feature/kind-local/local/kubernetes/kind-single-region/procedure/coredns-config.sh
```

This configuration rewrites DNS queries for `camunda.example.com` and `zeebe-camunda.example.com` to the Ingress NGINX controller service (`ingress-nginx-controller.ingress-nginx.svc.cluster.local`), allowing pods to reach Camunda services using the same domain names as external clients.

<details>
<summary>CoreDNS configuration</summary>

```yaml reference
https://github.com/camunda/camunda-deployment-references/blob/feature/kind-local/local/kubernetes/kind-single-region/configs/coredns-configmap.yaml
```

</details>

### Configure local hosts file

Add entries to your `/etc/hosts` file to resolve `camunda.example.com` locally:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/feature/kind-local/local/kubernetes/kind-single-region/procedure/hosts-add.sh
```

This adds the following entry:

```
127.0.0.1 camunda.example.com
```

:::note
This step requires `sudo` privileges. You will be prompted for your password.
:::

### Generate TLS certificates

Using certificates from real certificate authorities (CAs) for local development can be dangerous or impossible (for hosts like `localhost` or `127.0.0.1`), and self-signed certificates cause trust errors. [mkcert](https://github.com/FiloSottile/mkcert) solves this by automatically creating and installing a local CA in the system root store, and generating locally-trusted certificates.

Generate locally-trusted TLS certificates using mkcert:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/feature/kind-local/local/kubernetes/kind-single-region/procedure/certs-generate.sh
```

This script:

1. Installs the mkcert CA in your system trust store (first run only)
2. Generates certificates for `camunda.example.com` and `*.camunda.example.com`
3. Stores certificates in the `.certs/` directory

### Create Kubernetes secrets for TLS

Create the TLS secret in Kubernetes. This secret will be used by the Ingress controller to serve HTTPS traffic for `camunda.example.com`:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/feature/kind-local/local/kubernetes/kind-single-region/procedure/certs-create-secret.sh
```

Create a ConfigMap with the CA certificate for pods that need to trust it:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/feature/kind-local/local/kubernetes/kind-single-region/procedure/certs-create-ca-configmap.sh
```

### Deploy Camunda 8

Deploy Camunda 8 with the domain mode Helm values:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/feature/kind-local/local/kubernetes/kind-single-region/procedure/camunda-deploy-domain.sh
```

This uses the following Helm values:

<details>
<summary>Domain mode Helm values</summary>

```yaml reference
https://github.com/camunda/camunda-deployment-references/blob/feature/kind-local/local/kubernetes/kind-single-region/helm-values/values-domain.yml
```

</details>

<details>
<summary>mkcert CA trust configuration</summary>

```yaml reference
https://github.com/camunda/camunda-deployment-references/blob/feature/kind-local/local/kubernetes/kind-single-region/helm-values/values-mkcert.yml
```

</details>

---

## No-domain mode deployment {#no-domain-mode-deployment}

This section covers the simplified setup using port-forwarding without TLS.

### Deploy Camunda 8

Deploy Camunda 8 with the no-domain mode Helm values:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/feature/kind-local/local/kubernetes/kind-single-region/procedure/camunda-deploy-no-domain.sh
```

This uses the following Helm values:

<details>
<summary>No-domain mode Helm values</summary>

```yaml reference
https://github.com/camunda/camunda-deployment-references/blob/feature/kind-local/local/kubernetes/kind-single-region/helm-values/values-no-domain.yml
```

</details>

:::info Other installation profiles
This guide deploys the full Camunda 8 platform with all components. For lighter setups or specific use cases, see the [Helm installation guide](/self-managed/deployment/helm/install/quick-install.md) which covers different installation profiles (core only, with Connectors, with Web Modeler, etc.).
:::

---

## Verify deployment

Monitor the deployment progress:

```bash
kubectl get pods -n camunda -w
```

Wait until all pods show `Running` status. This may take 5-10 minutes depending on your internet connection and system resources.

You can also use the deployment readiness check script:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/feature/kind-local/generic/kubernetes/single-region/procedure/check-deployment-ready.sh
```

Verify the Helm release:

```bash
helm list -n camunda
```

## Accessing Camunda 8

<Tabs groupId="mode" defaultValue="domain" queryString values={[
{label: 'Domain mode', value: 'domain'},
{label: 'No-domain mode', value: 'no-domain'}
]}>

<TabItem value="domain">

| Component      | URL                                  |
| -------------- | ------------------------------------ |
| Operate        | https://camunda.example.com/operate  |
| Tasklist       | https://camunda.example.com/tasklist |
| Identity       | https://camunda.example.com/identity |
| Optimize       | https://camunda.example.com/optimize |
| Zeebe REST API | https://camunda.example.com/         |
| Keycloak       | https://camunda.example.com/auth     |

</TabItem>

<TabItem value="no-domain">

Start port-forwarding to access the services:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/feature/kind-local/local/kubernetes/kind-single-region/procedure/port-forward.sh
```

:::tip Localhost development with kubefwd
For a richer localhost experience (and to avoid managing many individual port-forward commands), you can use [kubefwd](https://github.com/txn2/kubefwd) to forward all Services in the target namespace and make them resolvable by their in-cluster DNS names on your workstation.

Example (requires `sudo` to bind privileged ports and modify `/etc/hosts`):

```shell
sudo kubefwd services -n "camunda"
```

After this runs, you can reach services directly, for example:

- Identity: `http://camunda-identity/managementidentity`
- Keycloak: `http://camunda-keycloak`
- Zeebe Gateway gRPC: `camunda-zeebe-gateway:26500`

You can still use localhost ports if you prefer traditional port-forwarding. Stop kubefwd with **Ctrl+C** when finished. Be aware kubefwd modifies your `/etc/hosts` temporarily; it restores the file when it exits.
:::

| Component            | URL                            |
| -------------------- | ------------------------------ |
| Zeebe Gateway (gRPC) | localhost:26500                |
| Zeebe Gateway (HTTP) | http://localhost:8080/         |
| Operate              | http://localhost:8080/operate  |
| Tasklist             | http://localhost:8080/tasklist |
| Identity             | http://localhost:8080/identity |
| Optimize             | http://localhost:8083          |
| Web Modeler          | http://localhost:8070          |
| Console              | http://localhost:8087          |
| Connectors           | http://localhost:8085          |
| Keycloak             | http://localhost:18080         |

:::tip Connecting to the workflow engine
To interact with the Camunda workflow engine via Zeebe Gateway using the [Orchestration Cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md) or a local client/worker, connect to `localhost:26500` (gRPC) or `http://localhost:8080` (REST).
:::

:::note
Run `kubectl get services -n camunda` to get a full list of deployed Camunda components and their network properties.
:::

</TabItem>

</Tabs>

### Default credentials

- **Username**: `admin`

Get the password:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/feature/kind-local/local/kubernetes/kind-single-region/procedure/get-password.sh
```

## Cleanup

:::warning Destructive action
This will destroy all data of Camunda 8 in the local development cluster.
:::

```bash
# Uninstall Camunda
helm uninstall camunda -n camunda

# Delete cluster
kind delete cluster --name camunda-platform-local

# (domain mode) Remove hosts entries (requires sudo)
sudo sed -i '' '/camunda.example.com/d' /etc/hosts

# (domain mode) Clean certificates
rm -rf .certs
```

## Troubleshooting

### Pods not starting

Check pod status and events:

```bash
kubectl get pods -n camunda
kubectl describe pod <pod-name> -n camunda
kubectl logs <pod-name> -n camunda
```

### Certificate errors in browser (domain mode)

Ensure the mkcert CA is installed:

```bash
mkcert -install
```

Regenerate certificates:

```bash
./procedure/certs-generate.sh
./procedure/certs-create-secret.sh
kubectl rollout restart deployment -n camunda
```

### Ingress not working

Check Ingress controller status:

```bash
kubectl get pods -n ingress-nginx
kubectl get ingress -n camunda
```

### Insufficient resources

Ensure Docker has enough resources allocated (4+ CPU cores, 8GB+ RAM). Check Docker Desktop settings or `/etc/docker/daemon.json`.

## Next steps

- [Getting started guide](/guides/getting-started-orchestrate-human-tasks.md): Deploy your first process
- [Camunda APIs](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md): Explore the REST APIs
- [Helm deployment guide](/self-managed/deployment/helm/install/quick-install.md): Learn more about Helm chart configuration
- [Production deployment](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/amazon-eks.md): Deploy to a production-ready cluster
