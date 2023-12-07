---
id: security-instructions
title: "Security instructions"
description: "Learn how to secure your Optimize distribution against potential attacks."
---

<span class="badge badge--platform">Camunda Platform 7 only</span>

This page provides an overview of how to secure a Camunda Optimize installation. For Camunda's security policy, a list of security notices, and a guide on how to report vulnerabilities, visit the [general security documentation](https://docs.camunda.org/security/).

This guide also identifies areas where we consider security issues to be relevant for the Camunda Optimize product and list those in the subsequent sections. Compliance for those areas is ensured based on common industry best practices and influenced by security requirements of standards like OWASP Top 10 and others.

It is essential to know that Optimize does not operate on its own, but needs the Camunda Platform engine to import the data from and Elasticsearch to store the data. A detailed description of the setup can be found in the [architecture overview]({{< ref "/technical-guide/optimize-explained/import/import-overview.md" >}}) guide. There are three components that are affected by security which are detailed in the following subsections:

- [Secure Elasticsearch](#secure-elasticsearch)

## Secure the engine

The BPMN platform with its process engine is a full standalone application which has a dedicated [security](https://docs.camunda.org/manual/latest/user-guide/security/) guide. The sections that are of major importance for the communication with Optimize are: [enabling authentication for the REST API](https://docs.camunda.org/manual/latest/user-guide/security/#enabling-authentication-for-the-rest-api/#enabling-authentication-for-the-rest-api) and [enabling SSL/HTTPS](https://docs.camunda.org/manual/latest/user-guide/security/#enabling-authentication-for-the-rest-api).

## Secure Optimize

Optimize already comes with a myriad of settings and security mechanism by default. In the following you will find the parts that still need manual adjustments.

### Disable HTTP

For security reasons, we recommend using Optimize over HTTPS and disabling HTTP. You can disable HTTP by setting the HTTP property in the container settings to an empty/null value. Consult the respective section in the [configuration guide](./configuration.md#container) for the more details.

### Fine tune Optimize security headers

Over time, various client-side security mechanisms have been developed to protect web applications from various attacks. Some of these security mechanisms are only activated if the web application sends the corresponding HTTP headers in its server responses.

Optimize adds several of these headers which can be fine-tuned in the [configuration](./configuration.md#security) to ensure appropriate security.

### Authentication

Authentication controls who can access Optimize. Read all about how to restrict the application access in the [user access management guide](./user-management.md).

### Authorization

Authorization controls what data a user can access and change in Optimize once authenticated. Authentication is a prerequisite to authorization. Read all about how to restrict the data access in the [authorization management guide](./authorization-management.md).

## Secure Elasticsearch

Optimize stores its data in Elasticsearch, which is a search engine that acts as a document-based datastore. To protect access to this data, Elasticsearch must be configured correctly. The documentation guide on [how to secure Elasticsearch](./secure-elasticsearch.md) provides a detailed description on how to restrict data access and secure the connection to Elasticsearch.
