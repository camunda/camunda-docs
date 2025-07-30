---
id: saas-ip-addresses
title: "IP addresses for Camunda connections"
description: "Details on the network configuration for Camunda 8 SaaS clusters."
---

## Inbound Connections

When you [create a cluster](/components/console/manage-clusters/create-cluster.md) in Camunda 8 SaaS, you will receive a set of hostnames to reach the different components of your cluster.

Depending on the cloud provider and the region on which the cluster was created in, the public IP addresses exposed to reach the clusters will be different.

- On Amazon Web Services (AWS), each endpoint is served by multiple IP addresses
- On Google Cloud Platform (GCP), the IP addresses are AnyCast IP addresses and are globally available.

In both cases, these IP addresses are subject to change at any time.

## Outbound Connections

If you use any of the Camunda Connectors, your Camunda cluster will make requests from Camunda SaaS infrastructure towards the external services you configure in your processes.

Depending on the cloud provider, region and type of Connectors you configured, you will see connections being made from different IP addresses.

These outbound IP addresses are subject to change at any time.

To ensure the security of incoming Connectors connections, you can consider:

- Authenticating the requests made by the Camunda Connectors (for instance, see the REST Connectors authentication information in the [REST Connector documentation](/components/connectors/protocol/rest.md#authentication))
- Running the Connectors into your own infrastructure and removing incoming calls from Camunda infrastructure to your own services.
