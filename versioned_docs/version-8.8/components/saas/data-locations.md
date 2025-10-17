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

## REST API Connector (traffic routing)

| Your choices                                                                                                                                                  | Host location                                                                             | Handled data                                                            | Personal data processing |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------- | :---------------------------------------------------------------------- | :----------------------- |
| <ul><li>Use Camunda‑hosted REST API Connector in EU.</li><li>Host your own connector runtime (hybrid mode) to keep traffic in your chosen location.</li></ul> | <p>EU:</p><ul><li>Belgium (for GCP clusters)</li><li>Germany (for AWS clusters)</li></ul> | Routes REST calls for processes; the proxy does not store payload data. | -                        |

:::info

- [REST connector](/components/connectors/protocol/rest.md)
- [Host custom connectors](/components/connectors/custom-built-connectors/host-custom-connectors/)

:::
