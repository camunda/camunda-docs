---
id: saas-ip-addresses
title: "Hostnames and IP addresses for Camunda connections"
sidebar_label: Hostnames and IP addresses for Camunda connections
description: "Details on the network configuration for Camunda 8 SaaS clusters."
---

<span class="badge badge--cloud">Camunda 8 SaaS only</span>

Camunda 8 SaaS hostnames and IP addresses for inbound and outbound connections.

:::warning
Inbound and outbound connection IP addresses can change at any time. Camunda does not recommend using an IP allowlist strategy based on trusted IP addresses or ranges, as their stability is not guaranteed.
:::

## Inbound connections

When you [create a cluster](/components/console/manage-clusters/create-cluster.md) in Camunda 8 SaaS, you will receive a set of hostnames for connecting to the different cluster components.

The public IP addresses exposed for connecting to the cluster depends on the cloud provider and [region](/reference/regions.md) the cluster was created in.

- **Amazon Web Services (AWS)**: Each endpoint is served by multiple IP addresses.
- **Google Cloud Platform (GCP)**: IP addresses are AnyCast IP addresses and are globally available.

## Outbound connections

If you use a [Camunda connector](/components/connectors/introduction.md), your cluster sends requests from the Camunda SaaS infrastructure to the external services you configure in your processes.

Depending on the cloud provider, [region](/reference/regions.md), and type of configured connector, connections are made from different IP addresses.

To ensure the security of incoming connector connections, you can:

- Authenticate the requests made by the Camunda connector(s). For example, see [REST connector authentication](/components/connectors/protocol/rest.md#authentication).
- Run the connectors into your own infrastructure and remove incoming calls from the Camunda infrastructure to your own services. For example, see [Self-Managed connectors](/self-managed/connectors-deployment/install-and-start.md).
