---
id: supported-environments
title: "Supported environments"
description: "Let's take a closer look at supported environments alongside Zeebe, Operate, and Tasklist."
---

## Zeebe

- **Zeebe Broker/Gateway**: The cluster components of Zeebe require OpenJDK 11+ and optional if the Elasticsearch exporter is used Elasticsearch 7.14.x.
- **Zeebe Java Client**: The Java client for Zeebe requires OpenJDK 8+.
- **Zeebe Go Client**: The Go client for Zeebe requires Go 1.13+.
- **zbctl**: The Zeebe CLI supports latest versions of Windows, MacOS, and Linux.

## Camunda Operate

- **Operate Web App/Importer/Archiver**: The server components of Camunda
  Operate require OpenJDK 11+ and Elasticsearch 7.14.x.
- **Operate Browser App**: Requires the latest version of Chrome, Firefox, or
  Edge on Windows, MacOS, and Linux.

## Camunda Tasklist

- **Tasklist Web App/Importer/Archiver**: The server components of Camunda
  Tasklist require OpenJDK 11+ and Elasticsearch 7.14.x.
- **Tasklist Browser App**: Requires the latest version of Chrome, Firefox, or
  Edge on Windows, MacOS, and Linux.

## Optimize

Run Camunda Optimize in a Java-runnable environment. The following environments are supported:

### Web Browser

- Google Chrome latest [recommended]
- Mozilla Firefox latest
- Microsoft Edge latest

### Elasticsearch

- Elasticsearch 7.8.0+, 7.9.0+, 7.10.0+, 7.11.0+, 7.12.0+, 7.13.0+, 7.14.0+, 7.15.0+
- Any minor version above the ones listed in the previous point is likely to be supported as well, but this hasn't been tested. For this reason, Camunda doesn't give any warranty.
- Any major version smaller or greater than ElasticSearch 7 will be rejected by Optimize. For example, Optimize won't work with ElasticSearch 6.X or 8.X.
- For the supported versions mentioned before, the Elasticsearch community as well as any professional version is supported. However, bear in mind that the professional edition comes with additional safety features that allow you to secure Elasticsearch. If you use the community edition, securing Elasticsearch needs to be done manually.

### Java Runtime

Optimize tries to support LTS versions of Java for as long as reasonably possible. Non-LTS versions newer than the supported LTS versions may also work, but we recommend using one of the releases listed below.

- Oracle JDK/JRE 11
- Open JDK/JRE 11 including builds of the following products:
 - Adopt OpenJDK

### Docker

[Docker CE](https://docs.docker.com/install/) 17.03 or newer

### DMN - Decision Model and Notation Standard

DMN [1.1](https://www.omg.org/spec/DMN/1.1), [1.2](https://www.omg.org/spec/DMN/1.2) or [1.3](https://www.omg.org/spec/DMN/1.3)

### Camunda Platform

Production versions of the Camunda Engine version 7.14.0+, 7.15.0+ and 7.16.0+ with REST API and history with level `full` enabled are supported. [Development (alpha) versions](https://docs.camunda.org/enterprise/release-policy/#community-vs-enterprise-releases) are not supported. For optimal performance, we always recommend running the latest version of the Camunda Engine. To ensure correct logging of user operations using the REST API, they should always be performed with user authentication. Alternatively, `restrictUserOperationLogToAuthenticatedUsers` should be set to `false` in the connected engine, this setting allows user operations to be logged even if there is no user authentication context for the request.