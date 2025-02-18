---
id: security-instructions
title: "Security instructions"
description: "Learn how to secure your Optimize distribution against potential attacks."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

This page provides an overview of how to secure a Camunda Optimize installation. For Camunda's security policy, a list of security notices, and a guide on how to report vulnerabilities, visit the [general security documentation](https://docs.camunda.org/security/).

This guide also identifies areas where we consider security issues to be relevant for the Camunda Optimize product and list those in the subsequent sections. Compliance for those areas is ensured based on common industry best practices and influenced by security requirements of standards like OWASP Top 10 and others.

<Tabs groupId="security" queryString values={
[
{label: 'Optimize', value: 'optimize' },
{label: 'Database', value: 'database' }
]
}>

<TabItem value='optimize'>

Optimize already comes with a myriad of settings and security mechanism by default. In the following you will find the parts that still need manual adjustments.

## Disable HTTP

For security reasons, we recommend using Optimize over HTTPS and disabling HTTP. You can disable HTTP by setting the HTTP property in the container settings to an empty/null value. Consult the respective section in the [configuration guide](./system-configuration.md#container) for the more details.

## Fine tune Optimize security headers

Over time, various client-side security mechanisms have been developed to protect web applications from various attacks. Some of these security mechanisms are only activated if the web application sends the corresponding HTTP headers in its server responses.

Optimize adds several of these headers which can be fine-tuned in the [configuration](./system-configuration.md#security) to ensure appropriate security.

</TabItem>

<TabItem value='database'>

Optimize stores its data in Elasticsearch or OpenSearch, which are search engines that act as a document-based datastore. To protect access to this data, the database should be configured carefully as well. Refer to the official security guidelines for [ElasticSearch](https://www.elastic.co/guide/en/elasticsearch/reference/master/secure-cluster.html#secure-cluster) or [OpenSearch](https://opensearch.org/docs/latest/getting-started/security).

Within the Optimize configuration, you can then enable SSL and/or the credentials to be used when Camunda Optimize connects to the database. See [Elasticsearch Security](./system-configuration.md#elasticsearch-security) or [OpenSearch Security](./system-configuration.md#opensearch-security) for details.

</TabItem>
</Tabs>
