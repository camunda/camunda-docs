---
sidebar_label: Enable additional components
title: Enable additional Camunda components
description: Enable optional components like Camunda Hub, Management Identity, and Optimize in the Camunda Helm chart.
---

The default Helm deployment includes the [Orchestration Cluster](/reference/glossary.md#orchestration-cluster) and Connectors. This page explains how to enable other Camunda components.

## Default vs. additional components

### Enabled by default

- Orchestration Cluster (Zeebe, Zeebe Gateway, Operate, Tasklist, Orchestration Cluster Admin)
- Connectors

### Additional components (must be explicitly enabled)

- Camunda Hub
- Management Identity
- Optimize

## Management Identity

Identity management has two distinct scopes:

- **Orchestration Cluster Admin** - Manages authentication and authorization for core orchestration components (Zeebe, Operate, Tasklist) and their APIs. This is built into the Orchestration Cluster and does not require Management Identity.
- **Management Identity** - Controls access to Camunda Hub and Optimize. This is a separate component that must be explicitly enabled.

Management Identity must be enabled if you want to use any of the following components:

- Camunda Hub
- Optimize

Check the [authentication and authorization](/self-managed/deploy-to-production/kubernetes/authentication/index.md) guide for detailed steps on enabling and configuring Management Identity.

:::info
If you enable Camunda Hub or Optimize without enabling Management Identity, these components will not function properly, as they require authentication. The Orchestration Cluster (Zeebe, Operate, Tasklist, and Orchestration Cluster Admin) does not depend on Management Identity.
:::

## Camunda Hub

Enable Camunda Hub with the following configuration options. If you're upgrading from Camunda 8.9, see the [Camunda Hub consolidation migration steps](/self-managed/manage/upgrade/helm/890-to-8100.md#consolidate-console-and-web-modeler-into-camunda-hub).

- Set `camundaHub.enabled: true`.
- **Enable Management Identity** (required for authentication) - see [authentication and authorization](/self-managed/deploy-to-production/kubernetes/authentication/index.md).
- Configure your SMTP server in `camundaHub.restapi.extraConfiguration`. Camunda Hub requires an SMTP server to send notification emails.
- Configure an external PostgreSQL connection under `camundaHub.restapi.externalDatabase`. Provision PostgreSQL externally, such as with a managed service or the [CloudNativePG operator](/self-managed/deploy-to-production/plan/kubernetes-operators.md).

We recommend specifying values in a YAML file and passing it to the `helm install` command.

Minimal configuration file:

```yaml
camundaHub:
  enabled: true
  restapi:
    mail:
      secret:
        existingSecret: "camunda-credentials-webmodeler"
        existingSecretKey: "webmodeler-smtp-user-password"
    externalDatabase:
      url: jdbc:postgresql://postgres.example.com:5432/modeler-db
      username: modeler-user
      secret:
        existingSecret: "camunda-credentials-webmodeler"
        existingSecretKey: "webmodeler-postgresql-user-password"
    extraConfiguration:
      - file: mail.yaml
        content: |
          spring:
            mail:
              host: smtp.example.com
              port: 587
              username: user
          camunda:
            modeler:
              mail:
                from-address: no-reply@example.com
```

For more details, see the [Camunda Hub Helm values](https://artifacthub.io/packages/helm/camunda/camunda-platform#camundahub-parameters).

:::note
When using `kubectl port-forward` to log in to Camunda Hub with [Keycloak deployed via the Keycloak Operator](/self-managed/deploy-to-production/plan/kubernetes-operators.md), you must also port-forward the Keycloak service so the OpenID Connect (OIDC) redirect works:

```bash
kubectl port-forward svc/keycloak-service 18080:18080
```

Alternatively, configure Identity with Ingress. See the [Ingress setup guide](/self-managed/deploy-to-production/kubernetes/configure/ingress/ingress-setup.md).

:::

## Optimize

Optimize is disabled by default in the Camunda 8 Helm chart. To enable it:

- Set `optimize.enabled: true` in a values file.
- **Enable Management Identity** (required for authentication) - see [authentication and authorization](/self-managed/deploy-to-production/kubernetes/authentication/index.md).

```yaml
optimize:
  enabled: true
```

For a full list of options, see the [Optimize Helm values](https://artifacthub.io/packages/helm/camunda/camunda-platform#optimize-parameters).

:::note
Disabling Optimize removes the legacy Elasticsearch/OpenSearch exporter from the broker's static configuration. However, it does not remove the exporter from the dynamic configuration, which prevents log compaction and increases disk usage. See [Disable an exporter](/self-managed/components/orchestration-cluster/zeebe/operations/management-api.md#disable-an-exporter) for the additional step required to fully disable it.
:::
