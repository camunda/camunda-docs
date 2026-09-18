---
id: index
sidebar_label: "Install the deployment topology"
title: "Install the Camunda 8.10 deployment topology"
description: "Install Camunda 8.10 Self-Managed as separate Hub, Orchestration Cluster, and Optimize Helm releases."
---

import HelmV4Required from '../../_partials/_helm-v4-required.md'

Install Camunda 8.10 Self-Managed as separate Helm releases: one Hub release, one release per Orchestration Cluster, and one Optimize release per Physical Tenant.

This is the baseline topology for a new 8.10 production deployment. Each release declares its role through `global.topology.mode`, so the Hub plane and each execution plane have independent lifecycles. For the reasoning, the release-role reference, and the limits of this model, see [Camunda 8.10 deployment topology](/self-managed/reference-architecture/deployment-topology.md).

A single `combined` release remains supported and remains the chart default. Use it for evaluation and proofs of concept. See [quick developer install](/self-managed/deployment/helm/install/quick-install.md).

<HelmV4Required />

## Install order

Install in dependency order, and confirm each release is healthy before starting the next.

1. Namespace-local Secret projections and TLS certificates.
2. The [Hub release](./hub-release.md).
3. One or more [Orchestration Cluster releases](./orchestration-release.md).
4. One [Optimize release](./optimize-release.md) per Physical Tenant, including the default tenant.

The Hub release comes first because it runs Management Identity and, for a Keycloak-administered deployment, creates the OIDC clients the other releases authenticate with.

The Hub release always deploys from the 8.10 chart. Each Orchestration Cluster release can deploy from the 8.7, 8.8, 8.9, or 8.10 chart, using its own chart and values, so clusters upgrade independently of the Hub. See [requirements by chart version](./orchestration-release.md#requirements-by-chart-version).

## Before you begin

Prepare the following resources:

- An OpenID Connect (OIDC) provider that every namespace can reach, with a pinned issuer. The examples use an external Keycloak instance with Management Identity-managed client registration.
- Separate public hostnames and TLS certificates for the Hub and orchestration namespaces.
- External PostgreSQL databases for Management Identity and Camunda Hub.
- A supported secondary storage backend for the Orchestration Cluster, and Elasticsearch or OpenSearch for Optimize.
- Network policies that permit Domain Name System (DNS) traffic and the required cross-namespace service traffic.

Camunda 8.10 bundles no Elasticsearch, PostgreSQL, or Keycloak subcharts, so these must exist before you install. See [deploy required dependencies](/self-managed/deployment/helm/configure/operator-based-infrastructure.md).

The examples use `camunda` as the release name in every namespace, `hub` as the Hub namespace, and `orchestration` as the orchestration namespace. If you change a release name or namespace, update every Kubernetes service name that references it.

Select a supported chart version from the [Helm chart version matrix](https://helm.camunda.io/camunda-platform/version-matrix/), then set it before installation:

```sh
export HELM_CHART_VERSION=<15.x-chart-version>
```

## Allow required network traffic

If you enforce NetworkPolicies, allow the following traffic in addition to your database and secondary-storage connections:

| Source                  | Destination                                               | Ports                   | Purpose                                                 |
| ----------------------- | --------------------------------------------------------- | ----------------------- | ------------------------------------------------------- |
| All namespaces          | Cluster DNS                                               | `53/TCP`, `53/UDP`      | Resolve cross-namespace service names                   |
| Camunda Hub             | `camunda-zeebe-gateway.orchestration.svc.cluster.local`   | `26500/TCP`, `8080/TCP` | Deploy processes and call the Orchestration Cluster API |
| Camunda Hub             | `camunda-zeebe.orchestration.svc.cluster.local`           | `9600/TCP`              | Check Orchestration Cluster application readiness       |
| Camunda Hub             | `camunda-optimize.<optimize-namespace>.svc.cluster.local` | `80/TCP`                | Check Optimize readiness                                |
| Camunda Hub             | `camunda-connectors.orchestration.svc.cluster.local`      | `8080/TCP`              | Check Connectors readiness                              |
| Orchestration namespace | `camunda-identity.hub.svc.cluster.local`                  | `80/TCP`                | Use central Management Identity                         |
| Optimize namespace      | `camunda-identity.hub.svc.cluster.local`                  | `80/TCP`                | Use central Management Identity                         |
| All namespaces          | Your OIDC provider                                        | Provider HTTPS port     | Authenticate users and clients                          |

Restrict policies to the listed workloads and namespaces instead of allowing unrestricted cross-namespace traffic.

## Manage secrets across namespaces

Kubernetes Secrets are namespace-scoped. When Management Identity administers an external Keycloak, create each workload client secret in both the Hub namespace and the workload namespace with identical values. With another OIDC provider, Management Identity doesn't consume the workload client secrets, so project them only into the workload namespaces.

The following examples use these Secrets:

| Secret                   | Key                     | Required namespaces                 | Purpose                                                  |
| ------------------------ | ----------------------- | ----------------------------------- | -------------------------------------------------------- |
| `keycloak-admin`         | `password`              | `hub`                               | Keycloak administration for Management Identity          |
| `identity-first-user`    | `password`              | `hub`                               | Initial Management Identity user                         |
| `identity-database`      | `password`              | `hub`                               | Management Identity database                             |
| `hub-database`           | `password`              | `hub`                               | Camunda Hub database                                     |
| `hub-pusher`             | `app-key`, `app-secret` | `hub`                               | Stable Camunda Hub WebSocket credentials across upgrades |
| `orchestration-oidc`     | `client-secret`         | `hub`, `orchestration`              | Orchestration OIDC client                                |
| `connectors-oidc`        | `client-secret`         | `hub`, `orchestration`              | Connectors OIDC client                                   |
| `optimize-oidc`          | `client-secret`         | `hub`, Optimize namespace           | Optimize OIDC client, one per Physical Tenant            |
| `secondary-storage`      | `password`              | `orchestration`, Optimize namespace | Elasticsearch password for Orchestration and Optimize    |
| `hub-tls`                | `tls.crt`, `tls.key`    | `hub`                               | Hub Ingress TLS                                          |
| `orchestration-tls`      | `tls.crt`, `tls.key`    | `orchestration`                     | Orchestration HTTP Ingress TLS                           |
| `orchestration-grpc-tls` | `tls.crt`, `tls.key`    | `orchestration`                     | Orchestration gRPC Ingress TLS                           |

Use an external secret manager to synchronize the values. Don't store production credentials directly in a Helm values file. See [secret management](/self-managed/deployment/helm/configure/secret-management.md).

## Deploy with GitOps

The topology values are deterministic and don't require cluster discovery or imperative deployment tooling. Store each release's values with its own Helm release definition.

Apply resources in the [install order](#install-order). For Flux, make each orchestration `HelmRelease` depend on the Hub release:

```yaml
spec:
  dependsOn:
    # This is the Flux HelmRelease metadata.name, not Helm's releaseName.
    - name: <hub-helmrelease-name>
      namespace: hub
```

For Argo CD, use sync waves or separate Applications so the Hub release becomes healthy before orchestration releases are synchronized, and each orchestration release before its Optimize releases.

For Keycloak-managed registration, client Secret names can be identical across namespaces, but Kubernetes Secrets remain namespace-scoped. Project both copies from the same external secret source to prevent drift.

The standalone chart-managed PersistentVolumeClaims for Management Identity, Optimize, and Connectors render when the corresponding component's `persistence.enabled` value is `true`, even when the release topology suppresses that component's workload. This behavior keeps PVC ownership declarative and produces the same desired resources with Helm, Argo CD, and Flux. Set `persistence.enabled` to `false` only after you no longer need the chart to manage that claim and have verified your GitOps pruning and storage reclaim policies.

:::warning
Orchestration Cluster broker PVCs are StatefulSet volume claim templates and don't follow this standalone PVC behavior. Changing a release to `hub` mode suppresses the Orchestration Cluster StatefulSet. Preserve and migrate broker storage separately when you move an existing cluster between releases or namespaces.
:::

## Upgrade an existing deployment

This guide covers fresh releases.

To upgrade an existing 8.9 deployment, first complete the in-place version upgrade while preserving the existing release name, namespace, Orchestration Cluster primary storage, and external data services. See [upgrade Camunda 8.9 to 8.10 using Helm](/self-managed/upgrade/helm/890-to-8100.md).

Adopting this topology afterwards is a separate operation with its own data and rollback planning. See [move from a combined release to the split topology](/self-managed/upgrade/helm/combined-to-split-topology.md).

## Existing configurations

The default `global.topology.mode: combined` preserves the existing single-release and single-namespace behavior.

Existing multi-namespace configurations that use `global.identity.auth.*.alwaysRegister`, component authentication values under disabled components, or manual `camundaHub.restapi.clusters` remain supported. This release doesn't deprecate or remove those values.

In `hub` mode, topology values replace the legacy Identity registration presets. An explicitly configured `camundaHub.restapi.clusters` or legacy `webModeler.restapi.clusters` list still takes precedence over generated Hub inventory.

Any future removal must retain compatibility for at least one minor release, emit GitOps-visible deprecation warnings with migration guidance, and occur only in the next major chart release according to the Helm chart deprecation policy.
