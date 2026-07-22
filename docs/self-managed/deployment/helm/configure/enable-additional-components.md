---
id: enable-additional-components
sidebar_label: Enable additional components
title: Enable additional Camunda components
description: Enable optional components like Management Identity, Web Modeler, Console, and Optimize in the Camunda Helm chart.
---

Starting with Camunda 8.8, the Helm chart reflects a new architecture where Zeebe, Zeebe Gateway, Operate, Tasklist, and Admin (formerly Orchestration Cluster Identity) are consolidated into a single [Orchestration Cluster](/reference/glossary.md#orchestration-cluster). As a result, the default deployment includes only the Orchestration Cluster and Connectors. This page explains how to enable additional components you may need.

## Default vs. additional components

### Enabled by default (8.8+)

- Orchestration Cluster (Zeebe, Zeebe Gateway, Operate, Tasklist, Orchestration Cluster Admin)
- Connectors

### Additional components (must be explicitly enabled)

- Camunda Hub (Web Modeler + Console; one consolidated component as of 8.10)
- Management Identity
- Optimize
- OpenSearch (when using OpenSearch as the secondary store)

External infrastructure dependencies (provision and connect externally — they are no longer bundled as Helm subcharts):

- PostgreSQL (required for Camunda Hub / Web Modeler and for Management Identity)
- Keycloak (required when using internal authentication for Identity)
- Elasticsearch (when using Elasticsearch as the secondary store)

:::note 8.10 removed the bundled Bitnami subcharts
The `identityKeycloak`, `identityPostgresql`, `webModelerPostgresql`, and `elasticsearch` Bitnami subcharts that shipped with the Camunda 8 Helm chart through 8.9 are removed in 8.10. The chart rejects these keys with a hard constraint error. Connect to externally managed services instead — see [Bundled Bitnami subcharts removed](/self-managed/upgrade/helm/890-to-8100.md#bundled-bitnami-subcharts-removed) for replacement guidance.
:::

:::note Upgrading from 8.7?
In Camunda 8.7, more components were enabled by default. If you're upgrading from 8.7 and used any of the components listed above, you must explicitly enable them in your 8.8 `values.yaml`.

See the [8.7 to 8.8 upgrade guide](/versioned_docs/version-8.8/self-managed/upgrade/helm/870-to-880.md#ensure-required-components) for upgrade-specific instructions.
:::

## Management Identity

In Camunda 8.8, identity management is split into two distinct scopes:

- **Orchestration Cluster Admin** - Manages authentication and authorization for core orchestration components (Zeebe, Operate, Tasklist) and their APIs. This is built into the Orchestration Cluster and does not require Management Identity.
- **Management Identity** - Controls access for management and modeling components (Web Modeler, Console, Optimize). This is a separate component that must be explicitly enabled.

Management Identity must be enabled if you want to use any of the following components:

- Web Modeler
- Console
- Optimize

Check the [authentication and authorization](./authentication-and-authorization/index.md) guide for detailed steps on enabling and configuring Management Identity.

:::info
If you enable Web Modeler, Console, or Optimize without enabling Management Identity, these components will not function properly as they require authentication. The Orchestration Cluster (Zeebe, Operate, Tasklist, and Orchestration Cluster Admin) does not depend on Management Identity.
:::

## Web Modeler and Console (Camunda Hub)

:::note Camunda 8.10+
Starting with Camunda 8.10, Web Modeler and Console ship as a single component called **Camunda Hub**. Enabling Camunda Hub turns on both the Web Modeler editor and the Console UI; Console is no longer a separate deployment. Set `camundaHub.enabled: true` to enable them together.

The legacy 8.9 keys `webModeler.enabled: true` and `console.enabled: true` still work as a backward-compatibility shim — each toggles the corresponding feature inside the Camunda Hub component — but they emit deprecation warnings during `helm upgrade`. See the [8.9 to 8.10 upgrade guide](/self-managed/upgrade/helm/890-to-8100.md#camunda-hub-consolidation) for the migration path.
:::

To enable Camunda Hub:

- Set `camundaHub.enabled: true` (disabled by default).
- **Enable Management Identity** (required for authentication) — see [authentication and authorization](./authentication-and-authorization/index.md).
- Configure your SMTP server under `camundaHub.webModeler.restapi.mail`. Web Modeler requires an SMTP server to send notification emails.
- Configure an external PostgreSQL connection under `camundaHub.webModeler.restapi.externalDatabase`. The bundled `webModelerPostgresql` Bitnami subchart is no longer available — provision PostgreSQL externally (managed RDS, CloudSQL, Azure Database, or self-hosted via the [CloudNativePG operator](/self-managed/deployment/helm/configure/operator-based-infrastructure.md)).

We recommend specifying values in a YAML file and passing it to the `helm install` command.

Minimal configuration file:

```yaml
camundaHub:
  enabled: true
  webModeler:
    restapi:
      mail:
        # Email address to be displayed as sender of emails from Web Modeler.
        fromAddress: no-reply@example.com
        smtpHost: smtp.example.com
        smtpPort: 587
        smtpUser: user
        # Prefer existingSecret over inline smtpPassword in values.yaml.
        secret:
          existingSecret: "camunda-credentials-webmodeler"
          existingSecretKey: "webmodeler-smtp-user-password"
      externalDatabase:
        url: jdbc:postgresql://postgres.example.com:5432/modeler-db
        username: modeler-user
        # Prefer existingSecret over inline password in values.yaml.
        secret:
          existingSecret: "camunda-credentials-webmodeler"
          existingSecretKey: "webmodeler-postgresql-user-password"
```

For the full list of options, see the [Camunda Hub Helm values](https://artifacthub.io/packages/helm/camunda/camunda-platform#camundahub-parameters).

:::note Ingress access for Console
The Console UI is served by the Camunda Hub component under the Web Modeler ingress route. When using `kubectl port-forward` with [Keycloak deployed via the Keycloak Operator](/self-managed/deployment/helm/configure/operator-based-infrastructure.md), you must also port-forward the Keycloak service so the OIDC redirect works:

```bash
kubectl port-forward svc/keycloak-service 18080:18080
```

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

:::note
Disabling Optimize removes the legacy Elasticsearch/OpenSearch exporter from the broker's static configuration. However, it does not remove the exporter from the dynamic configuration, which prevents log compaction and increases disk usage. See [Disable an exporter](/self-managed/components/orchestration-cluster/zeebe/operations/management-api.md#disable-an-exporter) for the additional step required to fully disable it.
:::
