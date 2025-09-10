---
id: web-modeler-console-connectors
sidebar_label: Enable Web Modeler, Console, and Connectors
title: Enable Web Modeler, Console, and Connectors
description: Configure Identity secrets and enable Web Modeler, Console, and Connectors in the Camunda Helm chart.
---

By default, Web Modeler and Console are disabled in the Camunda 8 Helm chart. The Connector runtime is enabled. This page explains how to configure Identity secrets, enable Web Modeler and Console, and manage Connectors.

## Create Identity secrets

In the default configuration, Helm charts automatically generate all required Camunda Identity secrets for communication between Camunda 8 components and Identity.

Due to an issue with a [Bitnami library](https://docs.bitnami.com/general/how-to/troubleshoot-helm-chart-issues/#credential-errors-while-upgrading-chart-releases), running `helm upgrade` may unintentionally regenerate these secrets.

Upgrades are still possible by following the [upgrade guide](/self-managed/installation-methods/helm/upgrade/index.md#upgrading-where-identity-enabled). However, we recommend pre-creating secrets to ensure smoother upgrades, especially when using CI/CD tools such as ArgoCD, FluxCD, or Jenkins.

Example of a pre-created secret:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: identity-secret-for-components
type: Opaque
data:
  operate-secret: VmVyeUxvbmdTdHJpbmc=
  tasklist-secret: VmVyeUxvbmdTdHJpbmc=
  optimize-secret: VmVyeUxvbmdTdHJpbmc=
  connectors-secret: VmVyeUxvbmdTdHJpbmc=
  console-secret: VmVyeUxvbmdTdHJpbmc=
  keycloak-secret: VmVyeUxvbmdTdHJpbmc=
  zeebe-secret: VmVyeUxvbmdTdHJpbmc=
```

Add the following configuration parameters to your `values.yaml` file

```yaml
global:
  identity:
    auth:
      operate:
        existingSecret:
          name: identity-secret-for-components
      tasklist:
        existingSecret:
          name: identity-secret-for-components
      optimize:
        existingSecret:
          name: identity-secret-for-components
      webModeler:
        existingSecret:
          name: identity-secret-for-components
      connectors:
        existingSecret:
          name: identity-secret-for-components
      console:
        existingSecret:
          name: identity-secret-for-components
      zeebe:
        existingSecret:
          name: identity-secret-for-components
```

## Enable Web Modeler

To enable Web Modeler, configure the required values in the Helm chart. For the full list of options, see the [Web Modeler Helm values](https://artifacthub.io/packages/helm/camunda/camunda-platform#webmodeler-parameters).

- Set `webModeler.enabled: true` (disabled by default).
- Configure your SMTP server under `webModeler.restapi.mail`. Web Modeler requires an SMTP server to send notification emails to users.
- Configure the database connection. Web Modeler requires a PostgreSQL database for persistent storage. Other databases are not supported.
  - **Option 1:** Set `postgresql.enabled: true` to install a new PostgreSQL instance using the [Bitnami PostgreSQL Helm chart](https://github.com/bitnami/charts/tree/main/bitnami/postgresql).
  - **Option 2:** Set `postgresql.enabled: false` and connect to an external PostgreSQL instance.

We recommend specifying values in a YAML file and passing it to the `helm install` command.

Minimal configuration file:

```yaml
webModeler:
  enabled: true
  restapi:
    mail:
      smtpHost: smtp.example.com
      smtpPort: 587
      smtpUser: user
      smtpPassword: secret
      # Email address to be displayed as sender of emails from Web Modeler
      fromAddress: no-reply@example.com
postgresql:
  enabled: true
```

To connect Web Modeler to an external database, set `postgresql.enabled: false` and provide values under `webModeler.restapi.externalDatabase`:

```yaml
webModeler:
  restapi:
    externalDatabase:
      url: jdbc:postgresql://postgres.example.com:5432/modeler-db
      user: modeler-user
      password: secret
postgresql:
  # disables the PostgreSQL chart dependency
  enabled: false
```

For more details, see the [Web Modeler Helm values](https://artifacthub.io/packages/helm/camunda/camunda-platform#webmodeler-parameters).

## Enable Console

Console Self-Managed is disabled by default in the Camunda 8 Helm chart. To enable it, set `console.enabled: true` in a YAML file and pass it to the `helm install` command:

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

Alternatively, configure Identity with Ingress. See the [Ingress setup guide](/self-managed/installation-methods/helm/configure/ingress-setup.md).

:::

## Manage Connectors

The Connector runtime is enabled by default. To use connectors, install connector element templates. For details, see [Manage connector templates in Web Modeler](/components/connectors/manage-connector-templates.md) or [Configuring templates in Desktop Modeler](/components/modeler/desktop-modeler/element-templates/configuring-templates.md).

For the full list of options, see the [Connectors Helm values](https://artifacthub.io/packages/helm/camunda/camunda-platform#connectors-parameters).

### Disable Connectors

To disable Connectors, set `connectors.enabled: false` when deploying the Helm chart.

### Polling authentication mode

Connectors use the [Operate API](/apis-tools/operate-api/overview.md) to fetch process definitions that contain inbound connectors. Depending on your Camunda architecture, choose one of the following values for the `inbound.mode` parameter:

- `disabled` — Polling from Operate is disabled. The connector runtime supports only outbound interactions, such as HTTP REST calls.
- `credentials` — The connector runtime authenticates to the Operate API with basic HTTP authentication.
- `oauth` — _(Recommended, and enabled by default)_ The connector runtime authenticates to the Operate API with OAuth 2.0. Camunda uses Keycloak as the default OAuth provider.
