---
id: zeebe-installation
title: "Overview"
sidebar_label: "Overview"
---

:::danger
Zeebe does not support network file systems (NFS) other types of network storage volumes at this time. Usage of NFS may cause data corruption.
:::

Please refer to the [Installation Guide](/self-managed/platform-deployment/overview.md) for details on how to install Zeebe in a private cloud or on your own hardware.

Within this section you will find detailed information about:

- [Zeebe Gateway](zeebe-gateway/zeebe-gateway-overview.md) - The Zeebe Gateway is a component of the Zeebe cluster; it can be considered the contact point for the Zeebe cluster which allows Zeebe clients to communicate with Zeebe brokers inside a Zeebe cluster.
- [Configuration](configuration/configuration.md) - Explains the configuration options. These configuration options apply to both environments, but not to Camunda 8. In Camunda 8, the configuration is provided for you.
- [Security](security/security.md) - Discusses the security aspects of running Zeebe and how to use them.
- [Operation](operations/zeebe-in-production.md) - Outlines topics that become relevant when you want to operate Zeebe in production.
- [Exporters](exporters/exporters.md) - Zeebe comes packaged with two exporters: [Elasticsearch](exporters/elasticsearch-exporter.md) and [OpenSearch](exporters/opensearch-exporter.md). This section of the docs explains how these exporters can be configured. For a general overview on the exporters concept, refer to our [exporters concept](/self-managed/concepts/exporters.md) page.

:::note
New to BPMN and want to learn more before moving forward? [Visit our Get Started Guides](/docs/guides/getting-started/) to learn about BPMN and orchestration.
:::
