---
id: multi-namespace
sidebar_label: Multi-namespace deployment
title: Configure a multi-namespace deployment
description: Configure Camunda Hub and Management Identity separately from an Orchestration Cluster with the Camunda 8.10 Helm chart.
---

A multi-namespace deployment runs Camunda Hub and Management Identity in a management namespace and runs the Orchestration Cluster in another namespace.

This configuration supports Camunda 8.10. Camunda Hub contains Web Modeler and Console. Console isn't a separate deployment in 8.10.

## Before you begin

Prepare the following resources:

- An external Keycloak instance that both namespaces can reach. The example uses Management Identity to register clients in Keycloak.
- Separate public hostnames and TLS certificates for the management and orchestration namespaces.
- External PostgreSQL databases for Management Identity and Camunda Hub.
- A supported secondary storage backend for the Orchestration Cluster and Optimize.
- Network policies that permit Domain Name System (DNS) traffic and required cross-namespace service traffic.

The examples use release name `camunda`, management namespace `management-and-modeling`, and orchestration namespace `orchestration`. If you change the release name or namespaces, update every Kubernetes service name.

Use Helm 4 and a chart 15.x version that supports Camunda 8.10. Select a supported version from the [Helm chart version matrix](https://helm.camunda.io/camunda-platform/version-matrix/), then set it before installation:

```sh
export HELM_CHART_VERSION=<15.x-chart-version>
```

## Allow required network traffic

If you enforce NetworkPolicies, allow the following traffic in addition to your database and secondary-storage connections:

| Source                  | Destination                                                  | Ports                   | Purpose                                                 |
| ----------------------- | ------------------------------------------------------------ | ----------------------- | ------------------------------------------------------- |
| Both namespaces         | Cluster DNS                                                  | `53/TCP`, `53/UDP`      | Resolve cross-namespace service names                   |
| Camunda Hub             | `camunda-zeebe-gateway.orchestration.svc.cluster.local`      | `26500/TCP`, `8080/TCP` | Deploy processes and call the Orchestration Cluster API |
| Camunda Hub             | `camunda-zeebe.orchestration.svc.cluster.local`              | `9600/TCP`              | Check Orchestration Cluster application readiness       |
| Camunda Hub             | `camunda-optimize.orchestration.svc.cluster.local`           | `80/TCP`                | Check Optimize readiness                                |
| Camunda Hub             | `camunda-connectors.orchestration.svc.cluster.local`         | `8080/TCP`              | Check Connectors readiness                              |
| Orchestration namespace | `camunda-identity.management-and-modeling.svc.cluster.local` | `80/TCP`                | Use central Management Identity                         |
| Both namespaces         | Your OIDC provider                                           | Provider HTTPS port     | Authenticate users and clients                          |

Restrict policies to the listed workloads and namespaces instead of allowing unrestricted cross-namespace traffic.

## Manage secrets across namespaces

Kubernetes Secrets are namespace-scoped. Create the client secrets used by both central Management Identity and a remote workload in both namespaces with identical values.

The following example uses these Secrets:

| Secret                   | Key                     | Required namespaces                        | Purpose                                                  |
| ------------------------ | ----------------------- | ------------------------------------------ | -------------------------------------------------------- |
| `keycloak-admin`         | `password`              | `management-and-modeling`                  | Keycloak administration for Management Identity          |
| `identity-first-user`    | `password`              | `management-and-modeling`                  | Initial Management Identity user                         |
| `identity-database`      | `password`              | `management-and-modeling`                  | Management Identity database                             |
| `hub-database`           | `password`              | `management-and-modeling`                  | Camunda Hub database                                     |
| `hub-pusher`             | `app-key`, `app-secret` | `management-and-modeling`                  | Stable Camunda Hub WebSocket credentials across upgrades |
| `orchestration-oidc`     | `client-secret`         | `management-and-modeling`, `orchestration` | Orchestration OIDC client                                |
| `connectors-oidc`        | `client-secret`         | `management-and-modeling`, `orchestration` | Connectors OIDC client                                   |
| `optimize-oidc`          | `client-secret`         | `management-and-modeling`, `orchestration` | Optimize OIDC client                                     |
| `management-tls`         | `tls.crt`, `tls.key`    | `management-and-modeling`                  | Management Ingress TLS                                   |
| `orchestration-tls`      | `tls.crt`, `tls.key`    | `orchestration`                            | Orchestration HTTP Ingress TLS                           |
| `orchestration-grpc-tls` | `tls.crt`, `tls.key`    | `orchestration`                            | Orchestration gRPC Ingress TLS                           |

Use an external secret manager to synchronize the values. Don't store production credentials directly in a Helm values file.

## Configure the management namespace

Create `management-and-modeling-values.yaml`. The `alwaysRegister` values instruct central Management Identity to register clients for workloads deployed by another Helm release. The `clusters` entry connects Camunda Hub to the remote Orchestration Cluster.

```yaml
global:
  host: management.example.com
  ingress:
    enabled: true
    className: nginx
    tls:
      enabled: true
      secretName: management-tls
  security:
    authentication:
      method: oidc
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
        redirectUrl: https://management.example.com/modeler
      optimize:
        alwaysRegister: true
        redirectUrl: https://orchestration.example.com/optimize
        secret:
          existingSecret: optimize-oidc
          existingSecretKey: client-secret
      orchestration:
        alwaysRegister: true
      connectors:
        alwaysRegister: true

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
    clusters:
      - id: orchestration
        name: Orchestration
        # Match this to the Camunda version deployed by your selected chart.
        version: "8.10.x"
        authentication: BEARER_TOKEN
        url:
          grpc: grpc://camunda-zeebe-gateway.orchestration.svc.cluster.local:26500
          rest: http://camunda-zeebe-gateway.orchestration.svc.cluster.local:8080
          web-app: https://orchestration.example.com/orchestration
        components:
          - name: Optimize
            type: optimize
            version: "8.10.x"
            urls:
              webapp: https://orchestration.example.com/optimize
              readiness: http://camunda-optimize.orchestration.svc.cluster.local:80/optimize/api/readyz
          - name: Connectors
            type: connectors
            version: "8.10.x"
            urls:
              rest: http://camunda-connectors.orchestration.svc.cluster.local:8080/connectors
              readiness: http://camunda-connectors.orchestration.svc.cluster.local:8080/connectors/actuator/health/readiness
          - name: Operate
            type: operate
            version: "8.10.x"
            urls:
              webapp: https://orchestration.example.com/orchestration/operate
              readiness: http://camunda-zeebe.orchestration.svc.cluster.local:9600/orchestration/actuator/health/readiness
          - name: Tasklist
            type: tasklist
            version: "8.10.x"
            urls:
              webapp: https://orchestration.example.com/orchestration/tasklist
              readiness: http://camunda-zeebe.orchestration.svc.cluster.local:9600/orchestration/actuator/health/readiness
          - name: Orchestration Admin
            type: admin
            version: "8.10.x"
            urls:
              webapp: https://orchestration.example.com/orchestration/admin
              readiness: http://camunda-zeebe.orchestration.svc.cluster.local:9600/orchestration/actuator/health/readiness
          - name: Orchestration Cluster
            type: orchestration
            version: "8.10.x"
            urls:
              grpc: grpc://camunda-zeebe-gateway.orchestration.svc.cluster.local:26500
              rest: http://camunda-zeebe-gateway.orchestration.svc.cluster.local:8080
              readiness: http://camunda-zeebe.orchestration.svc.cluster.local:9600/orchestration/actuator/health/readiness

orchestration:
  enabled: false
  security:
    authentication:
      oidc:
        redirectUrl: https://orchestration.example.com/orchestration
        secret:
          existingSecret: orchestration-oidc
          existingSecretKey: client-secret

connectors:
  enabled: false
  security:
    authentication:
      oidc:
        secret:
          existingSecret: connectors-oidc
          existingSecretKey: client-secret

optimize:
  enabled: false
```

Adapt the Keycloak endpoints and client configuration for your environment. See [external Keycloak](./authentication-and-authorization/external-keycloak.md). If you use another OIDC provider, create and manage the clients in that provider instead of using `alwaysRegister`; see [external OIDC provider](./authentication-and-authorization/external-oidc-provider.md).

Install the management release:

```sh
helm install camunda camunda/camunda-platform \
  --version "$HELM_CHART_VERSION" \
  --namespace management-and-modeling \
  --create-namespace \
  --values management-and-modeling-values.yaml
```

## Configure the orchestration namespace

Create `orchestration-values.yaml`. The Management Identity URL uses the management release's internal Kubernetes service. The OIDC client IDs and secrets must match the clients registered by Management Identity.

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
  identity:
    service:
      url: http://camunda-identity.management-and-modeling.svc.cluster.local:80/identity
    auth:
      enabled: true
      type: KEYCLOAK
      publicIssuerUrl: https://login.example.com/realms/camunda-platform
      issuerBackendUrl: https://login.example.com/realms/camunda-platform
      authUrl: https://login.example.com/realms/camunda-platform/protocol/openid-connect/auth
      tokenUrl: https://login.example.com/realms/camunda-platform/protocol/openid-connect/token
      jwksUrl: https://login.example.com/realms/camunda-platform/protocol/openid-connect/certs
      optimize:
        redirectUrl: https://orchestration.example.com/optimize
        secret:
          existingSecret: optimize-oidc
          existingSecretKey: client-secret

identity:
  enabled: false

camundaHub:
  enabled: false

orchestration:
  enabled: true
  contextPath: /orchestration
  ingress:
    grpc:
      enabled: true
      className: nginx
      host: zeebe.orchestration.example.com
      tls:
        enabled: true
        secretName: orchestration-grpc-tls
  security:
    authentication:
      oidc:
        redirectUrl: https://orchestration.example.com/orchestration
        secret:
          existingSecret: orchestration-oidc
          existingSecretKey: client-secret

connectors:
  enabled: true
  security:
    authentication:
      oidc:
        secret:
          existingSecret: connectors-oidc
          existingSecretKey: client-secret

optimize:
  enabled: true
  contextPath: /optimize
```

Add the values for your secondary storage backend before installation. See [database configuration](./database/index.md).

Install the orchestration release after the management release is ready:

```sh
helm install camunda camunda/camunda-platform \
  --version "$HELM_CHART_VERSION" \
  --namespace orchestration \
  --create-namespace \
  --values orchestration-values.yaml
```

## Add another Orchestration Cluster

The `alwaysRegister` values register one set of Orchestration Cluster, Connectors, and Optimize clients. They don't create a separate client set for every orchestration namespace.

To add another Orchestration Cluster, provision its clients and redirect URLs directly in your OIDC provider. Configure the additional Helm release with those client IDs and secrets, then add its endpoint to `camundaHub.restapi.clusters`. Use unique credentials when you need security isolation between clusters.
