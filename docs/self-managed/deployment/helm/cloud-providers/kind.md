---
id: kind
title: "Deploy Camunda 8 to a local kind cluster"
sidebar_label: "kind"
description: "Deploy Camunda 8 Self-Managed on a local Kubernetes cluster using kind for development and testing purposes."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

import IdentitySecret from './\_partials/\_identity-secret.md'

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

## Secondary storage options

In addition to the deployment mode, you must choose a [secondary storage](/self-managed/concepts/secondary-storage/index.md) backend. The `SECONDARY_STORAGE` environment variable controls which backend the deployment scripts use. You must set it explicitly before running any deployment command — there is no default.

| Value           | Operators deployed                    | Components                                                  |
| --------------- | ------------------------------------- | ----------------------------------------------------------- |
| `elasticsearch` | ECK, CloudNativePG, Keycloak Operator | Full platform including Optimize                            |
| `postgres`      | CloudNativePG, Keycloak Operator      | All components except Optimize (uses PostgreSQL RDBMS mode) |

The `postgres` option uses [RDBMS secondary storage](/self-managed/concepts/secondary-storage/index.md) (available since 8.9), which replaces Elasticsearch with PostgreSQL for Operate, Tasklist, and the Orchestration Cluster REST API. This results in a lighter deployment with fewer operators and lower resource consumption. Optimize is not available in this mode because it depends on Elasticsearch's aggregation API for analytics — this is an architectural constraint, not a temporary gap.

Once you've chosen your backend, export the variable so all subsequent commands pick it up automatically:

```bash
export SECONDARY_STORAGE=postgres   # or: elasticsearch
```

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
- [`yq`](https://github.com/mikefarah/yq) (the Go-based implementation from Mike Farah, required by the operator deployment scripts)
- [envsubst](https://www.gnu.org/software/gettext/manual/html_node/envsubst-Invocation.html) (Domain mode only; part of the `gettext` package)
- [mkcert](https://github.com/FiloSottile/mkcert#installation) (Domain mode only)

:::tip
You can also use [asdf](https://asdf-vm.com/) to install the tools, with the versions defined in [.tool-versions](https://github.com/camunda/camunda-deployment-references/blob/main/.tool-versions).
:::

## Outcome

By the end of this tutorial, you'll have:

- A local Kubernetes cluster running with kind. This includes one control plane and two worker nodes.
- A Contour Ingress controller deployed for routing traffic (domain mode only).
- TLS certificates configured with mkcert (domain mode only).
- Prerequisite services deployed via Kubernetes operators:
  - Elasticsearch via ECK (used as secondary storage in this guide; RDBMS is a supported alternative — see [configure RDBMS in Helm](/self-managed/deployment/helm/configure/database/rdbms.md))
  - PostgreSQL (CloudNativePG)
  - Keycloak (Keycloak Operator)
- Camunda 8 Self-Managed fully deployed and accessible, connected to the operator-managed services.

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
The reference architecture includes a `Makefile` with useful commands to automate the entire deployment process. If you [exported `SECONDARY_STORAGE`](#secondary-storage-options) above, you can omit it from these commands. Otherwise, set it inline:

```bash
# PostgreSQL secondary storage (lighter, no Optimize)
SECONDARY_STORAGE=postgres make domain.init      # With TLS (requires mkcert)
SECONDARY_STORAGE=postgres make no-domain.init   # With port-forward

# Elasticsearch secondary storage (full platform with Optimize)
SECONDARY_STORAGE=elasticsearch make domain.init      # With TLS (requires mkcert)
SECONDARY_STORAGE=elasticsearch make no-domain.init   # With port-forward
```

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

Deploy the [Contour Ingress controller](https://projectcontour.io/) to handle incoming traffic:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/local/kubernetes/kind-single-region/procedure/contour-deploy.sh
```

This script:

1. Installs Contour via Helm.
2. Configures Envoy to run on the control plane node with `hostNetwork: true`.
3. Waits until the Envoy deployment is ready.

Verify the Ingress controller is running:

```bash
kubectl get pods -n projectcontour
```

### Configure DNS resolution

For pods inside the cluster to resolve `camunda.example.com`, configure CoreDNS to rewrite DNS queries:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/local/kubernetes/kind-single-region/procedure/coredns-config.sh
```

This configuration rewrites DNS queries for `camunda.example.com` and `zeebe-camunda.example.com` to the Contour Envoy service (`contour-envoy.projectcontour.svc.cluster.local`), allowing pods to reach Camunda services using the same domain names as external clients.

<details>
<summary>Review the CoreDNS configuration</summary>

```yaml reference
https://github.com/camunda/camunda-deployment-references/blob/main/local/kubernetes/kind-single-region/configs/coredns-configmap-contour.yaml
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

1. Create the TLS secret in Kubernetes. The Ingress controller will use this to serve HTTPS traffic for `camunda.example.com`. This also creates a `camunda-keycloak-tls` secret for the Keycloak Ingress:

   ```bash reference
   https://github.com/camunda/camunda-deployment-references/blob/main/local/kubernetes/kind-single-region/procedure/certs-create-secret.sh
   ```

2. Then, create a ConfigMap with the CA certificate for pods that need to trust it:

   ```bash reference
   https://github.com/camunda/camunda-deployment-references/blob/main/local/kubernetes/kind-single-region/procedure/certs-create-ca-configmap.sh
   ```

### Deploy prerequisite services

Before deploying Camunda, you need to deploy the external services it depends on. These dependencies are deployed using Kubernetes operators as described in [Deploy infrastructure with Kubernetes operators](/self-managed/deployment/helm/configure/operator-based-infrastructure.md):

- Elasticsearch via [ECK (Elastic Cloud on Kubernetes)](https://www.elastic.co/guide/en/cloud-on-k8s/current/index.html) — used as secondary storage in this guide.
- PostgreSQL via [CloudNativePG](https://cloudnative-pg.io/)
- Keycloak via the [Keycloak Operator](https://www.keycloak.org/operator/installation)

:::note Secondary storage alternatives
This guide uses Elasticsearch (via ECK) as the secondary storage backend. RDBMS (PostgreSQL, MySQL, MariaDB, Oracle) is a supported alternative for the Orchestration Cluster. To use RDBMS instead, skip the Elasticsearch operator deployment and see [configure RDBMS in Helm](/self-managed/deployment/helm/configure/database/rdbms.md).
:::

Run the operator deployment script, specifying the domain deployment mode:

Make sure the Go-based version of `yq` is available before you run this script. The Python-based `yq` package is not supported and can fail when the script deploys filtered CloudNativePG clusters.

```bash
CAMUNDA_MODE=domain ./procedure/operators-deploy.sh
```

This script installs each operator and its custom resources, then waits for all instances to be ready. When `SECONDARY_STORAGE=postgres`, the ECK operator and Elasticsearch cluster are skipped, and an additional PostgreSQL cluster (`pg-camunda`) is deployed for RDBMS secondary storage.

<IdentitySecret />

### Deploy Camunda 8

Deploy Camunda 8 with the domain mode Helm values. The deployment script layers the [operator-based Helm values](https://github.com/camunda/camunda-deployment-references/tree/main/generic/kubernetes/operator-based) to connect Camunda to the external PostgreSQL and Keycloak instances, and to the secondary storage backend you selected:

```bash
./procedure/camunda-deploy-domain.sh
```

The script selects the appropriate Helm values based on your [exported `SECONDARY_STORAGE`](#secondary-storage-options) value. With `elasticsearch`, it includes the Elasticsearch values overlay. With `postgres`, it includes the RDBMS values overlay and disables Elasticsearch and Optimize.

<details>
<summary>Deploy script source</summary>

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/local/kubernetes/kind-single-region/procedure/camunda-deploy-domain.sh
```

</details>

:::note Using RDBMS instead of Elasticsearch
If you chose RDBMS as your secondary storage backend, skip the Elasticsearch overlay merge below and follow the [configure RDBMS in Helm](/self-managed/deployment/helm/configure/database/rdbms.md) guide to configure the Orchestration Cluster components.
:::

This uses the following Helm values:

<details>
<summary>Domain mode Helm values (kind-specific)</summary>

```yaml reference
https://github.com/camunda/camunda-deployment-references/blob/main/local/kubernetes/kind-single-region/helm-values/values-domain.yml
```

</details>

<details>
<summary>Operator-based Helm values (external Elasticsearch, PostgreSQL, Keycloak)</summary>

The deployment script layers the following shared operator values before the kind-specific values:

- [`camunda-elastic-values.yml`](https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/operator-based/elasticsearch/camunda-elastic-values.yml): Connects Camunda to the ECK-managed Elasticsearch (Elasticsearch secondary storage only).
- [`camunda-rdbms-values.yml`](https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/operator-based/postgresql/camunda-rdbms-values.yml): Configures PostgreSQL RDBMS as secondary storage and disables Elasticsearch and Optimize (PostgreSQL secondary storage only).
- [`camunda-keycloak-domain-values.yml`](https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/operator-based/keycloak/camunda-keycloak-domain-values.yml): Connects Camunda to the operator-managed Keycloak (domain mode).
- [`camunda-identity-values.yml`](https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/operator-based/postgresql/camunda-identity-values.yml): Configures Identity to use the CloudNativePG PostgreSQL.
- [`camunda-webmodeler-values.yml`](https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/operator-based/postgresql/camunda-webmodeler-values.yml): Configures Web Modeler to use the CloudNativePG PostgreSQL.

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

### Deploy prerequisite services

Before deploying Camunda, you need to deploy the external services it depends on. These dependencies are deployed using Kubernetes operators as described in [Deploy infrastructure with Kubernetes operators](/self-managed/deployment/helm/configure/operator-based-infrastructure.md):

- Elasticsearch via [ECK (Elastic Cloud on Kubernetes)](https://www.elastic.co/guide/en/cloud-on-k8s/current/index.html) — used as secondary storage in this guide
- PostgreSQL via [CloudNativePG](https://cloudnative-pg.io/)
- Keycloak via the [Keycloak Operator](https://www.keycloak.org/operator/installation)

Run the operator deployment script, specifying the no-domain deployment mode:

Make sure the Go-based version of `yq` is available before you run this script. The Python-based `yq` package is not supported and can fail when the script deploys filtered CloudNativePG clusters.

```bash
CAMUNDA_MODE=no-domain ./procedure/operators-deploy.sh
```

This script installs each operator and its custom resources, then waits for all instances to be ready. When `SECONDARY_STORAGE=postgres`, the ECK operator and Elasticsearch cluster are skipped, and an additional PostgreSQL cluster (`pg-camunda`) is deployed for RDBMS secondary storage.

### Configure your hosts file for Keycloak

The Keycloak operator configures Keycloak with `keycloak-service` as its hostname. The JWT tokens issued by Keycloak use this hostname in the `iss` claim. To ensure your browser can resolve this hostname during the OIDC login flow, add the following entry to your `/etc/hosts` file:

```text
127.0.0.1  keycloak-service
```

Alternatively, you can run `make hosts.add-keycloak` to add this entry automatically.

After adding this entry and deploying Camunda 8 in the next step, you'll be able to reach Keycloak at `http://keycloak-service:18080/auth`.

**Why port `18080`?** The Keycloak instance is configured to listen on port `18080` (via `httpPort` in the operator CR) to avoid conflicts with the Zeebe Gateway HTTP endpoint, which uses port `8080` locally.

<IdentitySecret />

### Deploy Camunda 8

Deploy Camunda 8 with the no-domain mode Helm values. The deployment script layers the [operator-based Helm values](https://github.com/camunda/camunda-deployment-references/tree/main/generic/kubernetes/operator-based) to connect Camunda to the external PostgreSQL and Keycloak instances, and to the secondary storage backend you selected:

```bash
./procedure/camunda-deploy-no-domain.sh
```

The script selects the appropriate Helm values based on your [exported `SECONDARY_STORAGE`](#secondary-storage-options) value. With `elasticsearch`, it includes the Elasticsearch values overlay. With `postgres`, it includes the RDBMS values overlay and disables Elasticsearch and Optimize.

<details>
<summary>Deploy script source</summary>

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/local/kubernetes/kind-single-region/procedure/camunda-deploy-no-domain.sh
```

</details>

:::note Using RDBMS instead of Elasticsearch
If you chose RDBMS as your secondary storage backend, skip the Elasticsearch overlay merge below and follow the [configure RDBMS in Helm](/self-managed/deployment/helm/configure/database/rdbms.md) guide to configure the Orchestration Cluster components.
:::

This uses the following Helm values:

<details>
<summary>No-domain mode Helm values (kind-specific)</summary>

```yaml reference
https://github.com/camunda/camunda-deployment-references/blob/main/local/kubernetes/kind-single-region/helm-values/values-no-domain.yml
```

</details>

<details>
<summary>Operator-based Helm values (external Elasticsearch, PostgreSQL, Keycloak)</summary>

The deployment script layers the following shared operator values before the kind-specific values:

- [`camunda-elastic-values.yml`](https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/operator-based/elasticsearch/camunda-elastic-values.yml): Connects Camunda to the ECK-managed Elasticsearch (Elasticsearch secondary storage only).
- [`camunda-rdbms-values.yml`](https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/operator-based/postgresql/camunda-rdbms-values.yml): Configures PostgreSQL RDBMS as secondary storage and disables Elasticsearch and Optimize (PostgreSQL secondary storage only).
- [`camunda-keycloak-no-domain-values.yml`](https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/operator-based/keycloak/camunda-keycloak-no-domain-values.yml): Connects Camunda to the operator-managed Keycloak (no-domain mode).
- [`camunda-identity-values.yml`](https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/operator-based/postgresql/camunda-identity-values.yml): Configures Identity to use the CloudNativePG PostgreSQL.
- [`camunda-webmodeler-values.yml`](https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/operator-based/postgresql/camunda-webmodeler-values.yml): Configures Web Modeler to use the CloudNativePG PostgreSQL.

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

:::note
Optimize is only available with Elasticsearch secondary storage. If you deployed with `SECONDARY_STORAGE=postgres`, Optimize is disabled.
:::

| Component                      | URL                                            | Availability                         |
| ------------------------------ | ---------------------------------------------- | ------------------------------------ |
| Operate                        | https://camunda.example.com/operate            | All                                  |
| Tasklist                       | https://camunda.example.com/tasklist           | All                                  |
| Admin                          | https://camunda.example.com/admin              | All                                  |
| Management Identity            | https://camunda.example.com/managementidentity | All                                  |
| Optimize                       | https://camunda.example.com/optimize           | Elasticsearch secondary storage only |
| Orchestration Cluster REST API | https://camunda.example.com/                   | All                                  |
| Keycloak                       | https://camunda.example.com/auth               | All                                  |

</TabItem>

<TabItem value="no-domain">

:::note
Optimize is only available with Elasticsearch secondary storage. If you deployed with `SECONDARY_STORAGE=postgres`, Optimize is disabled and its port-forward is skipped automatically.
:::

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

- **Management Identity**: `http://camunda-identity/managementidentity`
- **Keycloak**: `http://keycloak-service:18080/auth`
- **Zeebe Gateway gRPC**: `camunda-zeebe-gateway:26500`

You can still use localhost ports if you prefer traditional port-forwarding. Stop kubefwd with **Ctrl+C** when finished. Be aware kubefwd modifies your `/etc/hosts` temporarily, then restores the file when it exits.
:::

| Component            | URL                                | Availability                         |
| -------------------- | ---------------------------------- | ------------------------------------ |
| Zeebe Gateway (gRPC) | localhost:26500                    | All                                  |
| Zeebe Gateway (HTTP) | http://localhost:8080/             | All                                  |
| Operate              | http://localhost:8080/operate      | All                                  |
| Tasklist             | http://localhost:8080/tasklist     | All                                  |
| Admin                | http://localhost:8080/admin        | All                                  |
| Management Identity  | http://localhost:8085              | All                                  |
| Optimize             | http://localhost:8083              | Elasticsearch secondary storage only |
| Web Modeler          | http://localhost:8070              | All                                  |
| Console              | http://localhost:8087              | All                                  |
| Connectors           | http://localhost:8088              | All                                  |
| Keycloak             | http://keycloak-service:18080/auth | All                                  |

:::tip Connecting to the Orchestration Cluster
To interact with the Orchestration Cluster via Zeebe Gateway using the [Orchestration Cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md) or a local client/worker, connect to `localhost:26500` (gRPC) or `http://localhost:8080` (REST).
:::

At any time, run `kubectl get services -n camunda` to get a full list of deployed Camunda components and their network properties.

</TabItem>

</Tabs>

### Default credentials

#### Camunda admin

- **Username**: `admin`
- **Password**: Run the following script

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/local/kubernetes/kind-single-region/procedure/get-password.sh
```

#### Keycloak admin

The Keycloak operator generates a separate set of admin credentials stored in the `keycloak-initial-admin` secret. These credentials are different from the Camunda admin credentials and are used to access the Keycloak administration console.

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/local/kubernetes/kind-single-region/procedure/get-keycloak-password.sh
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
sudo sed -i '/keycloak-service/d' /etc/hosts

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
kubectl get pods -n projectcontour
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
