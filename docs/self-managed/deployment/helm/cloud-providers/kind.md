---
id: kind
title: "Deploy Camunda 8 to a local kind cluster"
sidebar_label: "kind"
description: "Deploy Camunda 8 Self-Managed on a local Kubernetes cluster using kind for development and testing purposes."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

With this guide, you'll deploy Camunda 8 Self-Managed to a local Kubernetes cluster using [kind (Kubernetes in Docker)](https://kind.sigs.k8s.io/). The setup is optimized for learning, development, and testing, with reduced resource requirements suitable for a personal machine.

While this guide uses kind, the same concepts apply to other local Kubernetes tools, like [K3s](https://k3s.io/), [minikube](https://minikube.sigs.k8s.io/), or [MicroK8s](https://microk8s.io/).

:::warning Local development only
This setup is intended for **local development only** and shouldn't be used in production environments. For production deployments, follow our [cloud provider guides](/self-managed/deployment/helm/cloud-providers/index.md).
:::

If you encounter issues during deployment, refer to the [Troubleshooting](#troubleshooting) section.

## Deployment modes

You can choose from two deployment modes:

| Mode          | Access                        | Requirements                    | Use case                              |
| ------------- | ----------------------------- | ------------------------------- | ------------------------------------- |
| **Domain**    | `https://camunda.example.com` | mkcert, hosts file modification | Full TLS setup, realistic environment |
| **No-domain** | `localhost` via port-forward  | hosts file modification         | Quick setup, minimal configuration    |

### How domain mode works

In domain mode, you'll simulate a production-like environment locally with:

- **Local DNS resolution**
  - You'll configure your machine's `/etc/hosts` file to resolve `camunda.example.com` to `127.0.0.1`.
  - Inside the cluster, you'll configure CoreDNS to rewrite DNS queries for this domain to the Ingress controller, allowing pods to communicate with each other using the same domain name.
- **TLS certificates with mkcert**
  - You'll use [mkcert](https://github.com/FiloSottile/mkcert) to generate locally-trusted certificates by installing a local Certificate Authority (CA) in your system's trust store. This allows your browser to trust the self-signed certificates without security warnings.
  - You'll also mount the CA certificate in the pods that need to make HTTPS calls to other Camunda components.

:::note Firefox compatibility
mkcert requires [NSS](https://github.com/FiloSottile/mkcert#supported-root-stores) to work properly with Firefox. Without it, Firefox will display certificate errors. We recommend using **Chrome** or **Chromium-based browsers** for the best experience with domain mode.
:::

## Prerequisites

Before you begin, you'll need:

- Terminal access with administrator/sudo privileges for modifying the hosts file (`/etc/hosts`)
- A container runtime with at least 4 CPU cores and 8 GB RAM available:
  - [Docker Desktop](https://www.docker.com/products/docker-desktop)
  - [Docker Engine](https://docs.docker.com/engine/install/)
  - [Podman](https://podman.io/docs/installation)
- [kind](https://kind.sigs.k8s.io/docs/user/quick-start/#installation)
- [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl)
- [Helm](https://helm.sh/docs/intro/install/)
- [mkcert](https://github.com/FiloSottile/mkcert#installation) (Domain mode only)

:::tip
You can also use [asdf](https://asdf-vm.com/) to install the tools, with the versions defined in [.tool-versions](https://github.com/camunda/camunda-deployment-references/blob/main/.tool-versions).
:::

## Outcome

By the end of this tutorial, you'll have:

- A local Kubernetes cluster running with kind. This includes one control plane and two worker nodes.
- An Ingress NGINX controller deployed for routing traffic (domain mode only).
- TLS certificates configured with mkcert (domain mode only).
- Camunda 8 Self-Managed fully deployed and accessible.

:::info Other installation profiles
With this guide, you deploy the full Camunda 8 platform with all components. For lighter setups or specific use cases, see the [Helm installation guide](/self-managed/deployment/helm/install/quick-install.md), which covers different installation profiles, such as core only, with Connectors, and with Web Modeler.
:::

## Download the reference architecture

Download the reference architecture files you'll use throughout this guide:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/local/kubernetes/kind-single-region/procedure/get-your-copy.sh
```

You'll run all subsequent commands from `camunda-deployment-references/local/kubernetes/kind-single-region/`.

Before proceeding, take some time to explore the repository structure and understand the configuration files, scripts, and Helm values. This will help you understand what each step does and how to customize the deployment for your needs.

:::tip Quick setup with Makefile
The reference architecture includes a `Makefile` with useful commands to automate the entire deployment process. For a quick setup, you can use:

- `make domain.init` — Full setup with TLS (requires mkcert)
- `make no-domain.init` — Full setup without TLS (uses port-forward)

To clean up, use `make domain.clean` or `make no-domain.clean` respectively.

Run `make help` to see all available targets, or consult the [Makefile](https://github.com/camunda/camunda-deployment-references/blob/main/local/kubernetes/kind-single-region/Makefile) directly.

The following sections detail each step if you prefer to run them manually or want to understand the process. If you've used the quick setup commands above, you can skip ahead to [Accessing Camunda 8](#accessing-camunda-8).
:::

## Create the Kubernetes cluster

First, run the cluster creation script:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/local/kubernetes/kind-single-region/procedure/cluster-create.sh
```

This script:

1. Creates a kind cluster named `camunda-platform-local`.
2. Waits until all nodes are ready.
3. Creates the `camunda` namespace.

In the output, you should see three nodes in `Ready` state.

<details>
<summary>Review the cluster configuration</summary>

The cluster includes one control plane node and two worker nodes with HTTP (80) and HTTPS (443) port mappings for Ingress:

```yaml reference
https://github.com/camunda/camunda-deployment-references/blob/main/local/kubernetes/kind-single-region/configs/kind-cluster-config.yaml
```

</details>

Now that you've created the cluster, you'll need to choose a deployment mode for the next steps:

- [Domain mode](#domain-mode-deployment)
- [No-domain mode](#no-domain-mode-deployment)

## Domain mode deployment {#domain-mode-deployment}

This section covers the full domain mode setup with TLS certificates and Ingress.

If you'd prefer a simpler setup without domain configuration, skip to [No-domain mode deployment](#no-domain-mode-deployment).

### Deploy the Ingress controller

Deploy the [Ingress NGINX controller](https://kubernetes.github.io/ingress-nginx/) to handle incoming traffic:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/local/kubernetes/kind-single-region/procedure/ingress-nginx-deploy.sh
```

This script:

1. Installs Ingress NGINX via Helm.
2. Configures it to run on the control plane node with `hostNetwork: true`.
3. Waits until the controller is ready.

Verify the Ingress controller is running:

```bash
kubectl get pods -n ingress-nginx
```

### Configure DNS resolution

For pods inside the cluster to resolve `camunda.example.com`, configure CoreDNS to rewrite DNS queries:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/local/kubernetes/kind-single-region/procedure/coredns-config.sh
```

This configuration rewrites DNS queries for `camunda.example.com` and `zeebe-camunda.example.com` to the Ingress NGINX controller service (`ingress-nginx-controller.ingress-nginx.svc.cluster.local`), allowing pods to reach Camunda services using the same domain names as external clients.

<details>
<summary>Review the CoreDNS configuration</summary>

```yaml reference
https://github.com/camunda/camunda-deployment-references/blob/main/local/kubernetes/kind-single-region/configs/coredns-configmap.yaml
```

</details>

### Configure your hosts file

Run the hosts file configuration script to resolve `camunda.example.com` locally. The script requires `sudo` privileges, so you'll need to provide your password:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/local/kubernetes/kind-single-region/procedure/hosts-add.sh
```

This adds the following entries to your `/etc/hosts` file:

```
127.0.0.1 camunda.example.com
127.0.0.1 zeebe-camunda.example.com
```

### Generate TLS certificates

Generate locally-trusted TLS certificates, using [mkcert](https://github.com/FiloSottile/mkcert):

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/local/kubernetes/kind-single-region/procedure/certs-generate.sh
```

Using certificates from real certificate authorities (CAs) for local development can be dangerous or impossible, for hosts like `localhost` or `127.0.0.1`, and self-signed certificates cause trust errors. mkcert solves this by automatically creating and installing a local CA in the system root store and generating locally-trusted certificates.

The certificate generation script:

1. Installs the mkcert CA in your system trust store (first run only).
2. Generates certificates for `camunda.example.com`, `zeebe-camunda.example.com` and `*.camunda.example.com`.
3. Stores certificates in `.certs/`.

### Create Kubernetes secrets for TLS

1. Create the TLS secret in Kubernetes. The Ingress controller will use this to serve HTTPS traffic for `camunda.example.com`:

   ```bash reference
   https://github.com/camunda/camunda-deployment-references/blob/main/local/kubernetes/kind-single-region/procedure/certs-create-secret.sh
   ```

2. Then, create a ConfigMap with the CA certificate for pods that need to trust it:

   ```bash reference
   https://github.com/camunda/camunda-deployment-references/blob/main/local/kubernetes/kind-single-region/procedure/certs-create-ca-configmap.sh
   ```

### Deploy Camunda 8

Deploy Camunda 8 with the domain mode Helm values:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/local/kubernetes/kind-single-region/procedure/camunda-deploy-domain.sh
```

This uses the following Helm values:

<details>
<summary>Domain mode Helm values</summary>

```yaml reference
https://github.com/camunda/camunda-deployment-references/blob/main/local/kubernetes/kind-single-region/helm-values/values-domain.yml
```

</details>

<details>
<summary>mkcert CA trust configuration</summary>

```yaml reference
https://github.com/camunda/camunda-deployment-references/blob/main/local/kubernetes/kind-single-region/helm-values/values-mkcert.yml
```

</details>

---

## No-domain mode deployment {#no-domain-mode-deployment}

This section covers the simplified setup using port-forwarding without TLS.

### Configure your hosts file for Keycloak

When running without a domain, Console validates the JWT issuer claim against the configured Keycloak base URL. To keep token issuance consistent and avoid mismatches, the chart configuration sets Keycloak's hostname to its Kubernetes Service name when operating locally. This means you need to map the service hostname to `127.0.0.1` so that browser redirects and token issuer values align.

Add (or update) the following entry in your `/etc/hosts` file:

```text
127.0.0.1  camunda-keycloak
```

The hostname `camunda-keycloak` is derived from the Helm release name (`camunda`) followed by `-keycloak`. If you use a different release name, adjust accordingly (for example, `my-release-keycloak`).

After adding this entry and deploying Camunda 8 in the next step, you'll be able to reach Keycloak at `http://camunda-keycloak:18080/auth`.

**Why port `18080`?** We forward container port `18080` to a non-privileged local port (`18080`) to avoid requiring elevated privileges and to reduce conflicts with other processes using port 18080.

### Deploy Camunda 8

Deploy Camunda 8 with the no-domain mode Helm values:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/local/kubernetes/kind-single-region/procedure/camunda-deploy-no-domain.sh
```

This uses the following Helm values:

<details>
<summary>No-domain mode Helm values</summary>

```yaml reference
https://github.com/camunda/camunda-deployment-references/blob/main/local/kubernetes/kind-single-region/helm-values/values-no-domain.yml
```

</details>

## Verify deployment

Monitor the deployment progress:

```bash
kubectl get pods -n camunda -w
```

Wait until all pods show `Running` status. This may take 5–10 minutes depending on your internet connection and system resources.

You can also use the deployment readiness check script from the root directory of the `camunda-deployment-references` repository. This script requires [jq](https://jqlang.github.io/jq/) to be installed:

```bash
export CAMUNDA_NAMESPACE=camunda
```

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/single-region/procedure/check-deployment-ready.sh
```

Finally, verify the Helm release:

```bash
helm list -n camunda
```

## Accessing Camunda 8

<Tabs groupId="mode" defaultValue="domain" queryString values={[
{label: 'Domain mode', value: 'domain'},
{label: 'No-domain mode', value: 'no-domain'}
]}>

<TabItem value="domain">

| Component           | URL                                            |
| ------------------- | ---------------------------------------------- |
| Operate             | https://camunda.example.com/operate            |
| Tasklist            | https://camunda.example.com/tasklist           |
| Identity            | https://camunda.example.com/identity           |
| Management Identity | https://camunda.example.com/managementidentity |
| Optimize            | https://camunda.example.com/optimize           |
| Zeebe REST API      | https://camunda.example.com/                   |
| Keycloak            | https://camunda.example.com/auth               |

</TabItem>

<TabItem value="no-domain">

Start port-forwarding to access the services:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/local/kubernetes/kind-single-region/procedure/port-forward.sh
```

:::tip Localhost development with kubefwd
For a richer localhost experience, and to avoid managing many individual port-forward commands, you can use [kubefwd](https://github.com/txn2/kubefwd) to forward all services in the target namespace and make them resolvable by their in-cluster DNS names on your workstation. This requires `sudo` to bind privileged ports and modify `/etc/hosts`:

```shell
sudo kubefwd services -n "camunda"
```

Now, you can reach services directly, for example:

- **Identity**: `http://camunda-identity/managementidentity`
- **Keycloak**: `http://camunda-keycloak`
- **Zeebe Gateway gRPC**: `camunda-zeebe-gateway:26500`

You can still use localhost ports if you prefer traditional port-forwarding. Stop kubefwd with **Ctrl+C** when finished. Be aware kubefwd modifies your `/etc/hosts` temporarily, then restores the file when it exits.
:::

| Component            | URL                                |
| -------------------- | ---------------------------------- |
| Zeebe Gateway (gRPC) | localhost:26500                    |
| Zeebe Gateway (HTTP) | http://localhost:8080/             |
| Operate              | http://localhost:8080/operate      |
| Tasklist             | http://localhost:8080/tasklist     |
| Identity             | http://localhost:8080/identity     |
| Management Identity  | http://localhost:8085              |
| Optimize             | http://localhost:8083              |
| Web Modeler          | http://localhost:8070              |
| Console              | http://localhost:8087              |
| Connectors           | http://localhost:8088              |
| Keycloak             | http://camunda-keycloak:18080/auth |

:::tip Connecting to the workflow engine
To interact with the Camunda workflow engine via Zeebe Gateway using the [Orchestration Cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md) or a local client/worker, connect to `localhost:26500` (gRPC) or `http://localhost:8080` (REST).
:::

At any time, run `kubectl get services -n camunda` to get a full list of deployed Camunda components and their network properties.

</TabItem>

</Tabs>

### Default credentials

- **Username**: `admin`
- **Password**: Run the following script

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/local/kubernetes/kind-single-region/procedure/get-password.sh
```

## Cleanup

:::warning Destructive action
This will permanently delete all Camunda 8 data in the local development cluster.
:::

If you used the Makefile for setup, you can use the corresponding clean command:

```bash
# Domain mode
make domain.clean

# No-domain mode
make no-domain.clean
```

Alternatively, you can clean up manually:

```bash
# Delete cluster
kind delete cluster --name camunda-platform-local

# (domain mode) Remove hosts entries (requires sudo)
sudo sed -i '/camunda.example.com/d' /etc/hosts

# (no-domain mode) Remove Keycloak hosts entry (requires sudo)
sudo sed -i '/camunda-keycloak/d' /etc/hosts

# (domain mode) Clean certificates
rm -rf .certs
```

## Troubleshooting

### Pods don't start

Check the pod status and events:

```bash
kubectl get pods -n camunda
kubectl describe pod <pod-name> -n camunda
kubectl logs <pod-name> -n camunda
```

### Browser shows certificate errors (Domain mode)

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

### Ingress doesn't work (Domain mode)

Check the Ingress controller status:

```bash
kubectl get pods -n ingress-nginx
kubectl get ingress -n camunda
```

### Insufficient resources

Ensure your container runtime has enough resources allocated (4+ CPU cores, 8GB+ RAM).

- **Docker Desktop**: Check the [Resources settings](https://docs.docker.com/desktop/settings-and-maintenance/settings/#resources)
- **Docker Engine**: Configure the [Docker daemon](https://docs.docker.com/engine/daemon/) (configuration varies by OS)
- **Podman**: Resources are managed by your system; ensure sufficient resources are available

## Next steps

- [Getting started guide](/guides/getting-started-orchestrate-human-tasks.md): Deploy your first process
- [Camunda APIs](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md): Explore the REST APIs
- [Production Helm deployment](/self-managed/deployment/helm/install/production/index.md): Learn more about Helm chart configuration for production
- [Cloud provider guides](/self-managed/deployment/helm/cloud-providers/index.md): Deploy to cloud platforms like AWS, Azure, or GCP
