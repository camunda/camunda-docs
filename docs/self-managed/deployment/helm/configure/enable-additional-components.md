---
id: enable-additional-components
sidebar_label: Enable additional components
title: Enable additional Camunda components
description: Enable optional components like Management Identity, Web Modeler, Console, and Optimize in the Camunda Helm chart.
---

Starting with Camunda 8.8, the Helm chart reflects a new architecture where Zeebe, Zeebe Gateway, Operate, and Tasklist are consolidated into a single [Orchestration Cluster](/reference/glossary.md#orchestration-cluster). As a result, the default deployment includes only the Orchestration Cluster, and Connectors. This page explains how to enable additional components you may need.

## Default vs. additional components

### Enabled by default (8.8+)

- Orchestration Cluster (Zeebe, Zeebe Gateway, Operate, Tasklist)
- Connectors

### Additional components (must be explicitly enabled)

- Console
- Management Identity
- Web Modeler
- Optimize
- Elasticsearch
- OpenSearch
- RDBMS
- PostgreSQL (Bitnami subchart) - only if needed for Web Modeler or Identity
- Keycloak (Bitnami subchart) - only if using internal authentication

:::note Upgrading from 8.7?
In Camunda 8.7, more components were enabled by default. If you're upgrading from 8.7 and used any of the components listed above, you must explicitly enable them in your 8.8 `values.yaml`.

See the [8.7 to 8.8 upgrade guide](/self-managed/deployment/helm/upgrade/helm-870-880.md#ensure-required-components) for upgrade-specific instructions.
:::

## Management Identity

In Camunda 8.8, identity management is split into two distinct scopes:

- **Orchestration Cluster Identity** - Manages authentication and authorization for core orchestration components (Zeebe, Operate, Tasklist) and their APIs. This is built into the Orchestration Cluster and does not require Management Identity.
- **Management Identity** - Controls access for management and modeling components (Web Modeler, Console, Optimize). This is a separate component that must be explicitly enabled.

Management Identity must be enabled if you want to use any of the following components:

- Web Modeler
- Console
- Optimize

Check the [authentication and authorization](./authentication-and-authorization/index.md) guide for detailed steps on enabling and configuring Management Identity.

:::info
If you enable Web Modeler, Console, or Optimize without enabling Management Identity, these components will not function properly as they require authentication. The Orchestration Cluster (Zeebe, Operate, Tasklist) does not depend on Management Identity.
:::

## Web Modeler

To enable Web Modeler, configure the required values in the Helm chart. For the full list of options, see the [Web Modeler Helm values](https://artifacthub.io/packages/helm/camunda/camunda-platform#webmodeler-parameters).

- Set `webModeler.enabled: true` (disabled by default).
- **Enable Management Identity** (required for authentication) - see [authentication and authorization](./authentication-and-authorization/index.md).
- Configure your SMTP server under `webModeler.restapi.mail`. Web Modeler requires an SMTP server to send notification emails to users.
- Configure the database connection. Web Modeler requires a PostgreSQL database for persistent storage. Other databases are not supported.
  - **Option 1:** Set `webModelerPostgresql.enabled: true` to install a new PostgreSQL instance using the [Bitnami PostgreSQL Helm chart](https://github.com/bitnami/charts/tree/main/bitnami/postgresql).
  - **Option 2:** Set `webModelerPostgresql.enabled: false` and connect to an external PostgreSQL instance.

We recommend specifying values in a YAML file and passing it to the `helm install` command.

Minimal configuration file:

```yaml
webModeler:
  enabled: true
  restapi:
    mail:
      # Email address to be displayed as sender of emails from Web Modeler.
      fromAddress: no-reply@example.com
      smtpHost: smtp.example.com
      smtpPort: 587
      smtpUser: user
      smtpPassword: secret
      # Also, the key "webModeler.restapi.mail.smtpPassword" could be used,
      # but it's not secure to save sensitive data in the values file.
      secret:
        existingSecret: "camunda-credentials-webmodeler"
        existingSecretKey: "webmodeler-smtp-user-password"

webModelerPostgresql:
  enabled: true
```

To connect Web Modeler to an external database, set `webModelerPostgresql.enabled: false` and provide values under `webModeler.restapi.externalDatabase`:

```yaml
webModeler:
  restapi:
    externalDatabase:
      url: jdbc:postgresql://postgres.example.com:5432/modeler-db
      user: modeler-user
      # Also, the key "webModeler.restapi.externalDatabase.password" could be used,
      # but it's not secure to save sensitive data in the values file.
      secret:
        existingSecret: "camunda-credentials-webmodeler"
        existingSecretKey: "webmodeler-postgresql-user-password"

webModelerPostgresql:
  # Disables the PostgreSQL chart dependency.
  enabled: false
```

For more details, see the [Web Modeler Helm values](https://artifacthub.io/packages/helm/camunda/camunda-platform#webmodeler-parameters).

## Console

Console Self-Managed is disabled by default in the Camunda 8 Helm chart. To enable it:

- Set `console.enabled: true` in the values file.
- **Enable Management Identity** (required for authentication) - see [authentication and authorization](./authentication-and-authorization/index.md).

```yaml
console:
  enabled: true
```

For a full list of options, see the [Console Helm values](https://artifacthub.io/packages/helm/camunda/camunda-platform#console-parameters).

:::note
Console requires the Identity component for authentication. The Camunda Helm chart installs Identity by default. If you log in to Console using port-forward, you must also port-forward the Keycloak service:

```
kubectl port-forward svc/<RELEASE-NAME>-keycloak 18080:80
```

If you're using Keycloak deployed via the Keycloak Operator (such as in the [vendor-supported infrastructure guide](/self-managed/deployment/helm/configure/vendor-supported-infrastructure.md)), use `kubectl port-forward svc/keycloak-service 18080:8080` instead.

Alternatively, configure Identity with Ingress. See the [Ingress setup guide](/self-managed/deployment/helm/configure/ingress/ingress-setup.md).

:::

## Optimize

Optimize is disabled by default in the Camunda 8 Helm chart. To enable it:

- Set `optimize.enabled: true` in a values file.
- **Enable Management Identity** (required for authentication) - see [authentication and authorization](./authentication-and-authorization/index.md).

```yaml
optimize:
  enabled: true
```

For a full list of options, see the [Optimize Helm values](https://artifacthub.io/packages/helm/camunda/camunda-platform#optimize-parameters).
