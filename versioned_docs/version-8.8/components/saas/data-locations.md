---
id: data-locations
title: "Data locations"
description: ""
---

Learn more about where your Camunda 8 SaaS data is located and how data is handled.

## About Camunda 8 SaaS data locations

You can choose GCP or AWS [regions](regions.md) for your cluster, with paired secondary regions for disaster‑recovery backups.

Console and Web Modeler are hosted in the EU on GCP. Single‑tenant clusters run on dedicated infrastructure on the selected cloud provider.

:::caution Processing personal data
Unless specifically mentioned, Camunda does not process personal data on behalf of its customers. It is the responsibility of you as the customer to decide whether to use Camunda for processing personal data.
:::

## Camunda Orchestration clusters and backups

| Your choices                                                                                             | Host location                                                                                                                                                       | Handled data                                                                                                            | Personal data processing                                                                                                                           |
| :------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| Choose a region in **GCP** or **AWS**; each Camunda Orchestration clusters use dedicated infrastructure. | Backups are per‑cluster; **single‑region by default** with optional **dual‑region replication** at no extra cost (secondary region depends on your primary choice). | Operational data across Zeebe, Operate, Tasklist, Optimize backed up consistently for disaster recovery (not archival). | Depends on your process usage and not by default; only if you use Camunda to process personal. Camunda supports encryption at rest and in transit. |

:::info

- [Backups (concept)](https://docs.camunda.io/docs/components/concepts/backups/)
- [Console backups](https://docs.camunda.io/docs/components/console/manage-clusters/create-backups/)
- [Regions](https://docs.camunda.io/docs/reference/regions/)

:::

## REST API Connector (traffic routing)

| Your choices                                                                                                                                                      | Host location                                                                             | Handled data                                                            | Personal data processing |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------- | :---------------------------------------------------------------------- | :----------------------- |
| <ul><li>Use Camunda‑hosted REST API Connector in the EU.</li><li>Host your own connector runtime (hybrid mode) to keep traffic in your chosen location.</li></ul> | <p>EU:</p><ul><li>Belgium (for GCP clusters)</li><li>Germany (for AWS clusters)</li></ul> | Routes REST calls for processes; the proxy does not store payload data. | -                        |

:::info

- [REST connector](/components/connectors/protocol/rest.md)
- [Host custom connectors](/components/connectors/custom-built-connectors/host-custom-connector.md)

:::

## Connector secrets (credentials)

| Your choices                                                                                                                          | Host location                                                                                                                                    | Handled data                                                                                        | Personal data processing                                                                                  |
| :------------------------------------------------------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------- |
| <p>Optional — only used if you create secrets for connectors</p><p>Connectors' secrets are configured and referenced through Console. | GCP Secret Manager, [replicated globally](https://cloud.google.com/secret-manager/docs/secret-manager-secrets-comparison) for high availability. | Stores credentials required by Connectors (API keys, tokens, passwords), not business process data. | Not intended for personal data processing; if credentials embed personal identifiers, handle accordingly. |

:::info

- [Manage secrets](https://docs.camunda.io/docs/components/console/manage-clusters/manage-secrets/)
- [Secret provider (self‑managed)](https://docs.camunda.io/docs/self-managed/connectors-deployment/connectors-configuration/)

:::

## Web Modeler

| Your choices                                                                                       | Host location      | Handled data                                                            | Personal data processing                                                             |
| :------------------------------------------------------------------------------------------------- | :----------------- | :---------------------------------------------------------------------- | :----------------------------------------------------------------------------------- |
| Use Camunda‑hosted Web Modeler in EU, or Desktop Modeler/self‑managed to control hosting location. | EU (GCP: Belgium). | Stores process models (diagrams/designs), not operational payload data. | Typically not. Only if you as customer include personal data in your process models. |

:::info

- [Regions (hosting note)](https://docs.camunda.io/docs/reference/regions/)

:::

## Identity

| Your choices                                | Host location   | Handled data                                                               | Personal data processing                                                     |
| :------------------------------------------ | :-------------- | :------------------------------------------------------------------------- | :--------------------------------------------------------------------------- |
| Managed by Camunda for SaaS; SSO supported. | Europe (Auth0). | User accounts and authentication metadata; separate from process payloads. | Yes — account/auth data by design, not “customer‑uploaded operational data.” |

## Console

| Your choices                                                     | Host location      | Handled data                                                               | Personal data processing                                     |
| :--------------------------------------------------------------- | :----------------- | :------------------------------------------------------------------------- | :----------------------------------------------------------- |
| Camunda‑hosted admin UI for cluster and organization management. | EU (GCP: Belgium). | Stores administrative metadata and settings, not operational payload data. | Generally minimal; not highly confidential operational data. |

:::info

- [Regions (hosting note)](https://docs.camunda.io/docs/reference/regions/)

:::

## Alerts

| Your choices      | Host location     | Handled data                                          | Personal data processing |
| :---------------- | :---------------- | :---------------------------------------------------- | :----------------------- |
| Usage is optional | EU (GCP: Belgium) | Route alerts containing administrative metadata only. | \-                       |

:::info

- [Alerts](https://docs.camunda.io/docs/components/console/manage-clusters/manage-alerts/)

:::
