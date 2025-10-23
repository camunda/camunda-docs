---
id: data-locations
title: "Data locations"
description: "Data location information for Camunda 8 Saas, such as where your Camunda 8 SaaS data is located and how data is handled."
---

Learn more about where your Camunda 8 SaaS data is located and how data is handled.

## About Camunda 8 SaaS data locations

You can choose GCP or AWS [regions](regions.md) for your cluster, with paired secondary regions for disaster‑recovery backups.

Console and Web Modeler are hosted in the EU on GCP. Single‑tenant clusters run on dedicated infrastructure on the selected cloud provider.

:::caution Processing personal data
Unless specifically mentioned, Camunda does not process personal data on behalf of its customers. It is the responsibility of you as the customer to decide whether to use Camunda for processing personal data.
:::

## Alerts

(Optional) Camunda 8 alerts can notify you when process instances stop with an error.

| Host location          | Handled data                                          | Personal data processing |
| :--------------------- | :---------------------------------------------------- | :----------------------- |
| Belgium, Europe (GCP). | Route alerts containing administrative metadata only. | N/A                      |

:::info

- [Alerts](/components/console/manage-clusters/manage-alerts.md)

:::

## Connector secrets (credentials)

(Optional) This is only used if you create secrets for connectors. Connector secrets are configured and referenced via [Console](/components/console/manage-clusters/manage-secrets.md).

| Host location                                                                                                                                    | Handled data                                                                                        | Personal data processing                                                                                                |
| :----------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------- |
| GCP Secret Manager, [replicated globally](https://cloud.google.com/secret-manager/docs/secret-manager-secrets-comparison) for high availability. | Stores credentials required by Connectors (API keys, tokens, passwords), not business process data. | Not intended for personal data processing. If credentials embed personal identifiers, you must handle this accordingly. |

:::info

- [Connector secrets](/components/console/manage-clusters/manage-secrets.md)
- [Secrets (Self‑Managed)](/self-managed/components/connectors/connectors-configuration.md)

:::

## Console

You can use the Camunda‑hosted [Console](/components/console/introduction-to-console.md) admin UI for cluster and organization management.

| Host location          | Handled data                                                               | Personal data processing                                     |
| :--------------------- | :------------------------------------------------------------------------- | :----------------------------------------------------------- |
| Belgium, Europe (GCP). | Stores administrative metadata and settings, not operational payload data. | Generally minimal, not highly confidential operational data. |

:::info

- [Regions](regions.md)

:::

## Identity

[Identity](/components/identity/identity-introduction.md) is managed by Camunda for SaaS. Single Sign-on (SSO) is supported.

| Host location   | Handled data                                                               | Personal data processing                                                            |
| :-------------- | :------------------------------------------------------------------------- | :---------------------------------------------------------------------------------- |
| Europe (Auth0). | User accounts and authentication metadata. Separate from process payloads. | Account/auth data is processed by design, not “customer‑uploaded operational data”. |

## Orchestration Clusters and backups

You can choose a region in **GCP** or **AWS**. Each [Orchestration Cluster](/components/orchestration-cluster.md) uses a dedicated infrastructure.

| Host location                                                                                                                                                             | Handled data                                                                                                                   | Personal data processing                                                                                                                                                                              |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <p>Backups are per‑cluster.</p><p>Single‑region by default, with optional dual‑region replication at no extra cost (secondary region depends on your primary choice).</p> | Operational data across Zeebe, Operate, Tasklist, and Optimize is backed up consistently for disaster recovery (not archival). | <p>Dependent on your process usage and not by default.</p><p>Only applies if you use Camunda to process personal data.</p><p>Camunda supports [encryption at rest](byok/index.md) and in transit.</p> |

:::info

- [Backups (concept)](/components/saas/backups.md)
- [Console backups](/components/console/manage-clusters/cluster-backups.md)
- [Regions](regions.md)

:::

## REST API connector (traffic routing)

You can use the Camunda‑hosted REST API connector in the EU, or host your own connector runtime (hybrid mode) to keep traffic in your chosen location.

| Host location                                                                           | Handled data                                                            | Personal data processing |
| :-------------------------------------------------------------------------------------- | :---------------------------------------------------------------------- | :----------------------- |
| <ul><li>Belgium, Europe (GCP clusters)</li><li>Germany, Europe (AWS clusters)</li></ul> | Routes REST calls for processes. The proxy does not store payload data. | N/A                      |

:::info

- [REST connector](/components/connectors/protocol/rest.md)
- [Host custom connectors](/components/connectors/custom-built-connectors/host-custom-connector.md)

:::

## Web Modeler

You can use the Camunda‑hosted [Web Modeler](/components/modeler/web-modeler/index.md) in the EU, or [Desktop Modeler](/components/modeler/desktop-modeler/index.md) with Camunda Self‑Managed if you want to control the hosting location.

| Host location          | Handled data                                                            | Personal data processing                                                                         |
| :--------------------- | :---------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------- |
| Belgium, Europe (GCP). | Stores process models (diagrams/designs), not operational payload data. | Typically not processed, only if you as a customer include personal data in your process models. |

:::info

- [Regions](regions.md)

:::
