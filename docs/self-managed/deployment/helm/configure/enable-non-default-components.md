---
id: enable-non-default-components
sidebar_label: Non-default components
title: Helm chart non-default components enabling
description: Configure non-default components such as Management Identity, Web Modeler, Console, and Optimize in the Camunda Helm chart.
---

In the Camunda 8.8 Helm chart (version 13.x.x), only the Orchestration Cluster and Connectors are enabled by default. The rest of the applications are disabled, including Management Identity, Modeler, Console, and Optimize. This page explains how to configure these components and manage Connectors.

## Management Identity

Check the [authentication and authorization](./authentication-and-authorization/index.md) guide for steps of enabling Management Identity.

## Web Modeler

To enable Web Modeler, configure the required values in the Helm chart. For the full list of options, see the [Web Modeler Helm values](https://artifacthub.io/packages/helm/camunda/camunda-platform#webmodeler-parameters).

- Set `webModeler.enabled: true` (disabled by default).
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

Console Self-Managed is disabled by default in the Camunda 8 Helm chart. To enable it, set `console.enabled: true` in the values file:

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

Alternatively, configure Identity with Ingress. See the [Ingress setup guide](/self-managed/deployment/helm/configure/ingress/ingress-setup.md).

:::

## Optimize

Optimize is disabled by default in the Camunda 8 Helm chart. To enable it, set `optimize.enabled: true` in a values file:

```yaml
optimize:
  enabled: true
```

For a full list of options, see the [Optimize Helm values](https://artifacthub.io/packages/helm/camunda/camunda-platform#optimize-parameters).

## Connectors

The Connector runtime is enabled by default. To use connectors, install connector element templates. For details, see [Manage connector templates in Web Modeler](/components/connectors/manage-connector-templates.md) or [Configuring templates in Desktop Modeler](/components/modeler/desktop-modeler/element-templates/configuring-templates.md).

For the full list of options, see the [Connectors Helm values](https://artifacthub.io/packages/helm/camunda/camunda-platform#connectors-parameters).

### Disable Connectors

To disable Connectors, set `connectors.enabled: false` when deploying the Helm chart.

### Polling authentication mode

Connectors use the [Operate API](/apis-tools/operate-api/overview.md) to fetch process definitions that contain inbound connectors. Depending on your Camunda architecture, choose one of the following values for the `inbound.mode` parameter:

- `disabled` — Polling from Operate is disabled. The connector runtime supports only outbound interactions, such as HTTP REST calls.
- `credentials` — The connector runtime authenticates to the Operate API with basic HTTP authentication.
- `oauth` — _(Recommended, and enabled by default)_ The connector runtime authenticates to the Operate API with OAuth 2.0. Camunda uses Keycloak as the default OAuth provider.
