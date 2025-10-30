---
id: data-locations
title: "Data locations"
description: "Data location information for Camunda 8 Saas, such as where your Camunda 8 SaaS data is located and how data is handled."
---

Learn more about where your Camunda 8 SaaS data is located and how data is handled.

## About Camunda 8 SaaS data locations

- Console and the Web Modeler are hosted in the EU.
- Camunda Orchestration Clusters can be created either on AWS (Amazon Web Services) or GCP (Google Cloud Platform), in the [region](regions.md) of your choice.

:::caution Processing personal data
Unless specifically mentioned, Camunda does not process personal data on behalf of its customers. It is the responsibility of you as the customer to decide whether to use Camunda for processing personal data.
:::

:::note planned changes from GCP to AWS
Some components are changing from GCP to AWS as part of planned improvements to Camunda 8 SaaS. For example, Console and connector secrets are planned to change to AWS hosting in December 2025.
:::

## Alerts

Camunda 8 [Alerts](/components/console/manage-clusters/manage-alerts.md) can notify you when process instances stop with an error.

| Host location     | Data handled                                          | Personal data processing |
| :---------------- | :---------------------------------------------------- | :----------------------- |
| Belgium, EU (GCP) | Route alerts containing administrative metadata only. | N/A                      |

:::note optional
Camunda 8 Alerts are optional. This information only applies if you use Alerts.
:::

## Connector secrets (credentials)

This only applies if you want to create [connector secrets](/components/console/manage-clusters/manage-secrets.md) and are using the Camunda-hosted connector version. Connector secrets are configured and referenced via Console.

- If you want to control the location where the secrets are stored, you can also [host your own connector runtime](/components/connectors/custom-built-connectors/host-custom-connector.md).
- If you want to use your own secret management solution, see [Secrets (Self‑Managed)](/self-managed/components/connectors/connectors-configuration.md).

| Host location                                                                                                                                                                                                                                                                       | Data handled                                                                                        | Personal data processing                                                                                                                                                                                                                                         |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <p>GCP Secret Manager, [replicated globally](https://cloud.google.com/secret-manager/docs/secret-manager-secrets-comparison) for high availability.</p><p>Connector secrets for clusters created in an AWS region will be stored inside AWS Secret Manager (Germany, EU), only.</p> | Stores credentials required by connectors (API keys, tokens, passwords), not business process data. | <p>Not intended for personal data processing.</p><p>If you embed personal data in connector secrets, note the global replication of data. You should review if your company has specific data residency requirements, and use connector secrets accordingly.</p> |

:::note optional
Connector secrets are optional. This information only applies if you use connector secrets.
:::

## Console

The Camunda‑hosted [Console](/components/console/introduction-to-console.md) admin UI is used for cluster and organization management.

| Host location                                                        | Data handled                                      | Personal data processing                                                                                                                                                        |
| :------------------------------------------------------------------- | :------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <p>Belgium, EU (GCP)</p><p>From December 2025: Germany, EU (AWS)</p> | Only stores administrative metadata and settings. | Limited to account/authentication data to access Camunda Platform SaaS. It does not include personal data in scope of [Data Processing Agreements](https://legal.camunda.com/). |

## Identity

[Identity](/components/identity/identity-introduction.md) is managed by Camunda for SaaS. Single Sign-on (SSO) is supported.

| Host location                       | Data handled                                                               | Personal data processing                                                                                                                                                                      |
| :---------------------------------- | :------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Germany, EU (Auth0 as part of Okta) | User accounts and authentication metadata. Separate from process payloads. | Limited to account/authentication data by design to access the Camunda Platform SaaS. It does not include personal data in scope of [Data Processing Agreements](https://legal.camunda.com/). |

:::info Learn more

- [Identity](/components/identity/identity-introduction.md)
- [Connect to an identity provider](/components/console/manage-organization/external-sso.md)

:::

## Orchestration Clusters and backups

You can choose a [region in **GCP** or **AWS**](regions.md). Each [Orchestration Cluster](/components/orchestration-cluster.md) uses a dedicated infrastructure.

| Host location                                                                                                                                                                                                                                                                                                                 | Data handled                                                                                                                                                | Personal data processing                                                                                                    |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| <p>Orchestration Clusters are created on AWS or GCP, in one of the available [regions](regions.md).</p><p>Backups are single‑region by default, in the same region as the Orchestration Cluster.</p><p>Optionally, you can replicate backups in a [secondary region](regions.md), depending on the chosen primary region.</p> | All data uploaded to Camunda in Orchestration Clusters during customers’ process orchestration (used in Zeebe, Operate, Tasklist, Optimize and Connectors). | Dependent on the data you sent to Camunda in the Orchestration Clusters. Camunda does not process personal data by default. |

:::info Learn More

- [Backups (concept)](/components/saas/backups.md)
- [Console backups](/components/console/manage-clusters/cluster-backups.md)

:::

## REST connector (traffic routing)

For security reasons, REST API requests made by the [REST connector](/components/connectors/protocol/rest.md) are all routed through a dedicated HTTPS proxy hosted by Camunda in the EU. The REST connector uses either an AWS or a GCP-hosted HTTPS proxy, depending on your chosen Orchestration Cluster cloud provider.

As a customer, you can either use the Camunda‑hosted REST connector, or [host your own connector runtime](/components/connectors/custom-built-connectors/host-custom-connector.md) (hybrid mode) to keep traffic in your chosen location.

| Host location                                                                   | Data handled                                                                                                                                                                                                    | Personal data processing                                                                                                  |
| :------------------------------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| <ul><li>Belgium, EU (GCP clusters)</li><li>Germany, EU (AWS clusters)</li></ul> | <p>All data uploaded to Camunda in an Orchestration Cluster and processed specifically by the REST API Connector.</p><p>Use of the REST API Connector is optional, and depends on the customers’ workflows.</p> | Dependent on the data you send to Camunda in an Orchestration Cluster. Camunda does not process personal data by default. |

:::note optional
Use of the REST connector is optional. This information only applies if you use the REST connector.
:::

## Web Modeler

You can use the Camunda‑hosted [Web Modeler](/components/modeler/web-modeler/index.md) in the EU, or [Desktop Modeler](/components/modeler/desktop-modeler/index.md) with Camunda Self‑Managed if you want to control the hosting location.

| Host location     | Data handled                                    | Personal data processing                   |
| :---------------- | :---------------------------------------------- | :----------------------------------------- |
| Belgium, EU (GCP) | Stores process models (diagrams/designs), only. | Not intended for personal data processing. |
