---
id: multi-namespace
sidebar_label: Multi-namespace deployment
title: Configure a multi-namespace deployment
description: Configure Camunda Hub and Management Identity separately from an Orchestration Cluster with the Camunda 8.10 Helm chart.
---

A multi-namespace deployment runs Camunda Hub and Management Identity in a Hub namespace and runs the Orchestration Cluster in another namespace.

This configuration supports Camunda 8.10. Camunda Hub contains Web Modeler and Console. Console isn't a separate deployment in 8.10.

The chart models this as a deployment topology instead of treating namespace placement as component configuration:

- `combined` is the default and preserves the existing single-release, single-namespace behavior.
- `hub` deploys the Hub plane and describes one or more remote Orchestration Clusters.
- `orchestration` deploys one workload plane and consumes a Hub-plane connection.

This contract separates the relationship between releases from the umbrella chart packaging. The design is intended to remain usable if Hub and orchestration are published as separate charts in the future.

## Before you begin

Prepare the following resources:

- An OpenID Connect (OIDC) provider that both namespaces can reach. The example uses an external Keycloak instance and Management Identity-managed client registration.
- Separate public hostnames and TLS certificates for the Hub and orchestration namespaces.
- External PostgreSQL databases for Management Identity and Camunda Hub.
- A supported secondary storage backend for the Orchestration Cluster and Optimize.
- Network policies that permit Domain Name System (DNS) traffic and required cross-namespace service traffic.

The examples use `camunda` as the release name in both namespaces, `hub` as the Hub namespace, and `orchestration` as the orchestration namespace. If you change the release name or namespaces, update every Kubernetes service name.

Use Helm 4 and a chart 15.x version that supports Camunda 8.10. Select a supported version from the [Helm chart version matrix](https://helm.camunda.io/camunda-platform/version-matrix/), then set it before installation:

```sh
export HELM_CHART_VERSION=<15.x-chart-version>
```

## Allow required network traffic

If you enforce NetworkPolicies, allow the following traffic in addition to your database and secondary-storage connections:

| Source                  | Destination                                             | Ports                   | Purpose                                                 |
| ----------------------- | ------------------------------------------------------- | ----------------------- | ------------------------------------------------------- |
| Both namespaces         | Cluster DNS                                             | `53/TCP`, `53/UDP`      | Resolve cross-namespace service names                   |
| Camunda Hub             | `camunda-zeebe-gateway.orchestration.svc.cluster.local` | `26500/TCP`, `8080/TCP` | Deploy processes and call the Orchestration Cluster API |
| Camunda Hub             | `camunda-zeebe.orchestration.svc.cluster.local`         | `9600/TCP`              | Check Orchestration Cluster application readiness       |
| Camunda Hub             | `camunda-optimize.orchestration.svc.cluster.local`      | `80/TCP`                | Check Optimize readiness                                |
| Camunda Hub             | `camunda-connectors.orchestration.svc.cluster.local`    | `8080/TCP`              | Check Connectors readiness                              |
| Orchestration namespace | `camunda-identity.hub.svc.cluster.local`                | `80/TCP`                | Use central Management Identity                         |
| Both namespaces         | Your OIDC provider                                      | Provider HTTPS port     | Authenticate users and clients                          |

Restrict policies to the listed workloads and namespaces instead of allowing unrestricted cross-namespace traffic.

## Manage secrets across namespaces

Kubernetes Secrets are namespace-scoped. When Management Identity administers an external Keycloak, create each workload client secret in both namespaces with identical values. With another OIDC provider, Management Identity doesn't consume the workload client secrets, so project them only into the orchestration namespace.

The following example uses these Secrets:

| Secret                   | Key                     | Required namespaces    | Purpose                                                  |
| ------------------------ | ----------------------- | ---------------------- | -------------------------------------------------------- |
| `keycloak-admin`         | `password`              | `hub`                  | Keycloak administration for Management Identity          |
| `identity-first-user`    | `password`              | `hub`                  | Initial Management Identity user                         |
| `identity-database`      | `password`              | `hub`                  | Management Identity database                             |
| `hub-database`           | `password`              | `hub`                  | Camunda Hub database                                     |
| `hub-pusher`             | `app-key`, `app-secret` | `hub`                  | Stable Camunda Hub WebSocket credentials across upgrades |
| `orchestration-oidc`     | `client-secret`         | `hub`, `orchestration` | Orchestration OIDC client                                |
| `connectors-oidc`        | `client-secret`         | `hub`, `orchestration` | Connectors OIDC client                                   |
| `optimize-oidc`          | `client-secret`         | `hub`, `orchestration` | Optimize OIDC client                                     |
| `secondary-storage`      | `password`              | `orchestration`        | Elasticsearch password for Orchestration and Optimize    |
| `hub-tls`                | `tls.crt`, `tls.key`    | `hub`                  | Hub Ingress TLS                                          |
| `orchestration-tls`      | `tls.crt`, `tls.key`    | `orchestration`        | Orchestration HTTP Ingress TLS                           |
| `orchestration-grpc-tls` | `tls.crt`, `tls.key`    | `orchestration`        | Orchestration gRPC Ingress TLS                           |

Use an external secret manager to synchronize the values. Don't store production credentials directly in a Helm values file.

## Configure the Hub namespace

Create `hub-values.yaml`. The cluster record is the source for both Management Identity presets and Camunda Hub inventory. Hub mode suppresses the umbrella chart's default Orchestration, Optimize, and Connectors workloads, so you don't configure disabled components in this release.

```yaml
global:
  host: hub.example.com
  ingress:
    enabled: true
    className: nginx
    tls:
      enabled: true
      secretName: hub-tls
  security:
    authentication:
      method: oidc
  topology:
    mode: hub
    clusters:
      - id: orchestration
        name: Orchestration
        namespace: orchestration
        releaseName: camunda
        host: orchestration.example.com
        # Match this to the Camunda version deployed by your selected chart.
        version: "8.10.x"
        contextPaths:
          orchestration: /orchestration
          optimize: /optimize
          connectors: /connectors
        components:
          orchestration:
            enabled: true
            clientId: orchestration
            audience: orchestration-api
            redirectUrl: https://orchestration.example.com/orchestration
            secret:
              existingSecret: orchestration-oidc
              existingSecretKey: client-secret
          optimize:
            enabled: true
            clientId: optimize
            audience: optimize-api
            redirectUrl: https://orchestration.example.com/optimize
            secret:
              existingSecret: optimize-oidc
              existingSecretKey: client-secret
          connectors:
            enabled: true
            clientId: connectors
            secret:
              existingSecret: connectors-oidc
              existingSecretKey: client-secret
  identity:
    keycloak:
      url:
        protocol: https
        host: login.example.com
        port: 443
      contextPath: /
      realm: /realms/camunda-platform
      auth:
        adminUser: admin
        secret:
          existingSecret: keycloak-admin
          existingSecretKey: password
    auth:
      enabled: true
      type: KEYCLOAK
      publicIssuerUrl: https://login.example.com/realms/camunda-platform
      issuerBackendUrl: https://login.example.com/realms/camunda-platform
      authUrl: https://login.example.com/realms/camunda-platform/protocol/openid-connect/auth
      tokenUrl: https://login.example.com/realms/camunda-platform/protocol/openid-connect/token
      jwksUrl: https://login.example.com/realms/camunda-platform/protocol/openid-connect/certs
      camundaHub:
        redirectUrl: https://hub.example.com/modeler

identity:
  enabled: true
  contextPath: /identity
  firstUser:
    secret:
      existingSecret: identity-first-user
      existingSecretKey: password
  externalDatabase:
    enabled: true
    host: identity-postgresql.example.com
    port: 5432
    username: identity
    database: identity
    secret:
      existingSecret: identity-database
      existingSecretKey: password

camundaHub:
  enabled: true
  contextPath: /modeler
  restapi:
    mail:
      fromAddress: noreply@example.com
    externalDatabase:
      url: jdbc:postgresql://hub-postgresql.example.com:5432/hub
      username: hub
      secret:
        existingSecret: hub-database
        existingSecretKey: password
    pusher:
      client:
        secret:
          existingSecret: hub-pusher
          existingSecretKey: app-key
      secret:
        existingSecret: hub-pusher
        existingSecretKey: app-secret
```

Adapt the Keycloak endpoints and client configuration for your environment. See [external Keycloak](./authentication-and-authorization/external-keycloak.md).

Management Identity can administer clients only in an external Keycloak instance when you provide Keycloak administrator credentials. For Microsoft Entra ID or a generic OIDC provider, first complete the provider setup, including Management Identity's confidential client, initial administrator claims, Hub clients, mapping rules, and each workload client. Then add the matching client IDs and audiences to the topology records. Management Identity initializes only its permission and role model from those records. See [external OIDC provider](./authentication-and-authorization/external-oidc-provider.md).

Identity preset initialization is additive. Removing or renaming a topology entry doesn't delete the corresponding clients, resource servers, permissions, or roles from Keycloak or Management Identity. Remove obsolete resources explicitly after the related workload is retired. Existing Keycloak users also don't automatically receive roles added by a later topology update; assign the canonical roles or configured per-cluster roles through your normal access-management process.

By default, every cluster contributes permissions to the canonical `Orchestration` and `Optimize` roles. Assigning either role grants access to every declared cluster of that component type. Set `components.<component>.roleName` to a unique value in each Hub topology entry when users must be authorized per cluster.

Install the Hub release:

```sh
helm install camunda camunda/camunda-platform \
  --version "$HELM_CHART_VERSION" \
  --namespace hub \
  --create-namespace \
  --values hub-values.yaml
```

## Configure the orchestration namespace

Create `orchestration-values.yaml`. An orchestration release is self-contained and uses the existing component values for its enabled state and authentication configuration. `global.topology.mode` selects the release role but doesn't duplicate component configuration.

Set `identity.enabled: false` because Management Identity runs only in the Hub release. Keep `global.identity.auth.enabled: true` to enable OIDC authentication for the orchestration workloads, and set `global.identity.service.url` to the Hub release's Identity service. The component client IDs, audiences, redirects, and secrets must match the clients declared in the Hub release's cluster inventory.

```yaml
global:
  host: orchestration.example.com
  ingress:
    enabled: true
    className: nginx
    tls:
      enabled: true
      secretName: orchestration-tls
  security:
    authentication:
      method: oidc
  topology:
    mode: orchestration
  identity:
    service:
      url: http://camunda-identity.hub.svc.cluster.local:80/identity
    auth:
      enabled: true
      type: KEYCLOAK
      publicIssuerUrl: https://login.example.com/realms/camunda-platform
      issuerBackendUrl: https://login.example.com/realms/camunda-platform
      authUrl: https://login.example.com/realms/camunda-platform/protocol/openid-connect/auth
      tokenUrl: https://login.example.com/realms/camunda-platform/protocol/openid-connect/token
      jwksUrl: https://login.example.com/realms/camunda-platform/protocol/openid-connect/certs
      optimize:
        clientId: optimize
        audience: optimize-api
        redirectUrl: https://orchestration.example.com/optimize
        secret:
          existingSecret: optimize-oidc
          existingSecretKey: client-secret

identity:
  enabled: false

orchestration:
  enabled: true
  contextPath: /orchestration
  security:
    authentication:
      oidc:
        clientId: orchestration
        audience: orchestration-api
        redirectUrl: https://orchestration.example.com/orchestration
        secret:
          existingSecret: orchestration-oidc
          existingSecretKey: client-secret
  data:
    secondaryStorage:
      type: elasticsearch
      elasticsearch:
        url: https://elasticsearch.example.com:9200
        auth:
          username: camunda
          secret:
            existingSecret: secondary-storage
            existingSecretKey: password
  ingress:
    grpc:
      enabled: true
      className: nginx
      host: zeebe.orchestration.example.com
      tls:
        enabled: true
        secretName: orchestration-grpc-tls

connectors:
  enabled: true
  contextPath: /connectors
  security:
    authentication:
      oidc:
        clientId: connectors
        secret:
          existingSecret: connectors-oidc
          existingSecretKey: client-secret

optimize:
  enabled: true
  contextPath: /optimize
  database:
    elasticsearch:
      enabled: true
      external: true
      url:
        protocol: https
        host: elasticsearch.example.com
        port: 9200
      auth:
        username: camunda
        secret:
          existingSecret: secondary-storage
          existingSecretKey: password
```

This example uses Elasticsearch as shared secondary storage. Enabling Optimize automatically enables the Legacy Zeebe Exporter, which writes the records Optimize reads. The Orchestration Cluster and Optimize settings must point to the same backend, and the `secondary-storage` Secret must exist in the orchestration namespace.

For OpenSearch, relational database, TLS, and custom index-prefix configuration, see [database configuration](./database/index.md). If you customize the Legacy Zeebe Exporter prefix, configure Optimize to read the same prefix as described in [configure Elasticsearch and OpenSearch index prefixes](./database/elasticsearch/configure-elasticsearch-prefix-indices.md#optimize-specific-configuration).

Install the orchestration release after the Hub release is ready:

```sh
helm install camunda camunda/camunda-platform \
  --version "$HELM_CHART_VERSION" \
  --namespace orchestration \
  --create-namespace \
  --values orchestration-values.yaml
```

## Add another Orchestration Cluster

Add another entry to `global.topology.clusters` in the management release and install another orchestration release. Configure that release's existing component authentication values to match the new management inventory entry. Use unique client IDs, audiences, and secrets for isolation.

If orchestration releases share Elasticsearch or OpenSearch, configure a unique `orchestration.index.prefix` for every release. Configure a unique Optimize record prefix with `optimize.database.elasticsearch.prefix` or `optimize.database.opensearch.prefix`, and configure a unique Optimize application index prefix with `CAMUNDA_OPTIMIZE_ELASTICSEARCH_SETTINGS_INDEX_PREFIX`. Reusing any of these prefixes can mix one cluster's records with another cluster's Operate, Tasklist, or Optimize data. See [configure Elasticsearch and OpenSearch index prefixes](./database/elasticsearch/configure-elasticsearch-prefix-indices.md).

For Keycloak, Management Identity creates every declared client. For another OIDC provider, provision the clients before applying the Helm releases.

Generated internal service URLs in the management inventory use Kubernetes service DNS, so this pattern supports multiple namespaces in the same Kubernetes cluster. For workloads in another Kubernetes cluster, provide equivalent cross-cluster DNS and routing or configure explicit `grpcUrl`, `restUrl`, `readinessUrl`, `operateUrl`, `tasklistUrl`, `adminUrl`, and component web application URL overrides. Set each orchestration release's `global.identity.service.url` to an address from which it can reach Management Identity.

## Deploy with GitOps

The topology values are deterministic and don't require cluster discovery or imperative deployment tooling. Store the management and orchestration values with their respective Helm release definitions.

Apply resources in this order:

1. Namespace-local Secret projections and TLS certificates.
2. The management release.
3. One or more orchestration releases.

For Flux, make each orchestration `HelmRelease` depend on the management release:

```yaml
spec:
  dependsOn:
    # This is the Flux HelmRelease metadata.name, not Helm's releaseName.
    - name: <management-helmrelease-name>
      namespace: management-and-modeling
```

For Argo CD, use sync waves or separate Applications so the management release becomes healthy before orchestration releases are synchronized.

For Keycloak-managed registration, client Secret names can be identical across namespaces, but Kubernetes Secrets remain namespace-scoped. Project both copies from the same external secret source to prevent drift.

The standalone chart-managed PVCs for Management Identity, Optimize, and Connectors render when the corresponding component's `persistence.enabled` value is `true`, even when the release topology suppresses that component's workload. This behavior keeps PVC ownership declarative and produces the same desired resources with Helm, Argo CD, and Flux. Set `persistence.enabled` to `false` only after you no longer need the chart to manage that claim and have verified your GitOps pruning and storage reclaim policies.

Orchestration Cluster broker PVCs are StatefulSet volume claim templates and don't follow this standalone PVC behavior. Changing a release to management mode suppresses the Orchestration Cluster StatefulSet. Preserve and migrate broker storage separately when you move an existing cluster between releases or namespaces.

## Upgrade and topology migration scope

This guide covers fresh management and orchestration releases. It doesn't define a data migration procedure for converting an existing combined release into split releases.

Before you adopt this topology during a version upgrade, complete the supported in-place version upgrade while preserving the existing release name, namespace, Orchestration Cluster primary storage, and external data services. For Camunda 8.9 to 8.10 requirements, see [upgrade from 8.9 to 8.10](/self-managed/upgrade/helm/890-to-8100.md).

Moving an existing Orchestration Cluster to another release or namespace requires a separate migration plan for its broker persistent volumes, cluster identity, and secondary-storage indices. Installing a fresh orchestration release creates a new, empty Orchestration Cluster; secondary storage doesn't replace the broker logs and snapshots that contain active process state.

## Existing configurations

The default `global.topology.mode: combined` preserves the existing single-release and single-namespace behavior.

Existing multi-namespace configurations that use `global.identity.auth.*.alwaysRegister`, component authentication values under disabled components, or manual `camundaHub.restapi.clusters` remain supported. This release doesn't deprecate or remove those values.

In management mode, topology values replace the legacy Identity registration presets. An explicitly configured `camundaHub.restapi.clusters` or legacy `webModeler.restapi.clusters` list still takes precedence over generated Hub inventory.

Any future removal must retain compatibility for at least one minor release, emit GitOps-visible deprecation warnings with migration guidance, and occur only in the next major chart release according to the Helm chart deprecation policy.
