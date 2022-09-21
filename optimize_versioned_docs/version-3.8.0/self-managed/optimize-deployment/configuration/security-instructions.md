---
id: security-instructions
title: "Security instructions"
description: "Learn how to secure your Optimize distribution against potential attacks."
---

This page provides an overview of how to secure a Camunda Optimize installation. For Camunda's security policy, a list of security notices, and a guide on how to report vulnerabilities, visit the [general security documentation](https://docs.camunda.org/security/).

This guide also identifies areas where we consider security issues to be relevant for the Camunda Optimize product and list those in the subsequent sections. Compliance for those areas is ensured based on common industry best practices and influenced by security requirements of standards like OWASP Top 10 and others.

## Secure the Camunda Platform 7 connection

<span class="badge badge--platform">Camunda Platform 7 only</span>

:::note Important!
Optimize does not operate on its own, but needs the Camunda Platform 7 engine to import the data from and Elasticsearch to store the data. A detailed description of the setup can be found in the [architecture overview](../advanced-features/import-guide.md) guide.
:::

The BPMN platform with its process engine is a full standalone application which has a dedicated [security](https://docs.camunda.org/manual/latest/user-guide/security/) guide. The sections that are of major importance for the communication with Optimize are: [enabling authentication for the REST API](https://docs.camunda.org/manual/latest/user-guide/security/#enabling-authentication-for-the-rest-api/#enabling-authentication-for-the-rest-api) and [enabling SSL/HTTPS](https://docs.camunda.org/manual/latest/user-guide/security/#enabling-authentication-for-the-rest-api).

## Secure Optimize

Optimize already comes with a myriad of settings and security mechanism by default. In the following you will find the parts that still need manual adjustments.

### Disable HTTP

For security reasons, we recommend using Optimize over HTTPS and disabling HTTP. You can disable HTTP by setting the HTTP property in the container settings to an empty/null value. Consult the respective section in the [configuration guide](./system-configuration.md#container) for the more details.

### Fine tune Optimize security headers

Over time, various client-side security mechanisms have been developed to protect web applications from various attacks. Some of these security mechanisms are only activated if the web application sends the corresponding HTTP headers in its server responses.

Optimize adds several of these headers which can be fine-tuned in the [configuration](./system-configuration.md#security) to ensure appropriate security.

### Authentication

<span class="badge badge--platform">Camunda Platform 7 only</span>

Authentication controls who can access Optimize. Read all about how to restrict the application access in the [user access management guide](./user-management.md).

### Authorization

<span class="badge badge--platform">Camunda Platform 7 only</span>

Authorization controls what data a user can access and change in Optimize once authenticated. Authentication is a prerequisite to authorization. Read all about how to restrict the data access in the [authorization management guide](./authorization-management.md).

## Secure Elasticsearch

Optimize stores its data in Elasticsearch, which is a search engine that acts as a document-based datastore. To protect access to this data, Elasticsearch should be configured carefully as well. Refer to the official [Secure the Elastic Stack](https://www.elastic.co/guide/en/elasticsearch/reference/master/secure-cluster.html#secure-cluster) documentation of Elasticsearch.

Within the Optimize configuration, you can then enable SSL and/or the credentials to be used when Camunda Optimize connects to Elasticsearch. See [Elasticsearch Security](./system-configuration.md#elasticsearch-security) for details.
