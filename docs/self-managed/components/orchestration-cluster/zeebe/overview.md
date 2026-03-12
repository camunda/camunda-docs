---
id: overview
title: "Zeebe on Self-Managed"
sidebar_label: "Overview"
description: "About Zeebe"
---

<!--
:::danger
Zeebe does not support network file systems (NFS) other types of network storage volumes at this time. Usage of NFS may cause data corruption.
:::
-->

[Zeebe](/components/zeebe/zeebe-overview.md) is the process automation engine component within the Orchestration Cluster.

Within this section you will find detailed information about:

- [Zeebe Gateway](zeebe-gateway/zeebe-gateway-overview.md) - The Zeebe Gateway is a component of the Zeebe cluster; it can be considered the contact point for the Zeebe cluster which allows Zeebe clients to communicate with Zeebe brokers inside a Zeebe cluster.
- [Configuration](configuration/configuration.md) - Explains the configuration options. These configuration options apply to both environments, but not to Camunda 8. In Camunda 8, the configuration is provided for you.
- [Security](security/security.md) - Discusses the security aspects of running Zeebe and how to use them.
- [Operation](operations/zeebe-in-production.md) - Outlines topics that become relevant when you want to operate Zeebe in production.
- [Exporters](exporters/exporters.md) - Zeebe includes built-in exporters for [Elasticsearch](exporters/elasticsearch-exporter.md), [OpenSearch](exporters/opensearch-exporter.md), [Camunda Exporter](exporters/camunda-exporter.md), and RDBMS (see [RDBMS configuration](/self-managed/concepts/databases/relational-db/configuration.md)). This section explains how exporters can be configured. For a general overview, refer to our [exporters concept](/self-managed/concepts/exporters.md) page. For broader guidance on secondary storage options, see [secondary storage](/self-managed/concepts/secondary-storage/index.md).

:::note
New to BPMN and want to learn more before moving forward? [Visit our getting started guide](/components/modeler/bpmn/automating-a-process-using-bpmn.md) to learn about automating a process using BPMN.
:::
