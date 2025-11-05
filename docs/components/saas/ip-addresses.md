---
id: saas-ip-addresses
title: "Hostnames and IP addresses for Camunda connections"
sidebar_label: Hostnames and IP addresses for Camunda connections
description: "Details on the network configuration for Camunda 8 SaaS clusters."
---

<span class="badge badge--cloud">Camunda 8 SaaS only</span>

Camunda 8 SaaS hostnames and IP addresses for inbound and outbound connections.

## Static outbound IP addresses

Camunda SaaS uses static IP addresses for some of its services. The addresses can be retrieved using the [Camunda Management API `/meta/ip-ranges` endpoint](https://console.cloud.camunda.io/customer-api/openapi/docs/#/default/GetMeta).
Although infrequent, we may change these IP addresses from time to time and any change will be published through the API at least 24 hours in advance. If you rely on these IP addresses for your network configuration, we strongly recommend to fetch the latest version at least once every 24 hours.

:::note

Under normal circumstances, changes to these IP addresses will be communicated in advance. However, in case of emergency, it may not be possible to prepublish these changes.

:::

## Inbound connections

When you [create a cluster](/components/console/manage-clusters/create-cluster.md) in Camunda 8 SaaS, you will receive a set of hostnames for connecting to the different cluster components.

The public IP addresses exposed for connecting to the cluster depends on the cloud provider and [region](/components/saas/regions.md) the cluster was created in.

- **Amazon Web Services (AWS)**: Each endpoint is served by multiple IP addresses.
- **Google Cloud Platform (GCP)**: IP addresses are AnyCast IP addresses and are globally available.

## Outbound connections

If you use a [Camunda connector](/components/connectors/introduction.md), your cluster sends requests from the Camunda SaaS infrastructure to the external services you configure in your processes.

Depending on the cloud provider, [region](/components/saas/regions.md), and type of configured connector, connections are made from different IP addresses.

To ensure the security of incoming connector connections, you can:

- Authenticate the requests made by the Camunda connector(s). For example, see [REST connector authentication](/components/connectors/protocol/rest.md#authentication).
- Run the connectors into your own infrastructure and remove incoming calls from the Camunda infrastructure to your own services. For example, see [Self-Managed connectors](/self-managed/components/connectors/overview.md).
