---
id: supported-environments
title: "Supported environments"
description: "Find out where to run Camunda 8 components for SaaS and Self-Managed, including Optimize for both Camunda 8 and Camunda 7."
---

## Web Browser

- Google Chrome latest [recommended]
- Mozilla Firefox latest
- Microsoft Edge latest

## Desktop Modeler

- Windows 7 / 10
- Mac OS X 10.11
- Ubuntu LTS (latest)

## Clients

- **Zeebe Java Client**: OpenJDK 8+
- **Zeebe Go Client**: Go 1.13+
- **zbctl**: Windows, MacOS, and Linux (latest)

_See more community-maintained Camunda 8 clients [here](/apis-tools/community-clients/index.md)._

## Camunda 8 Self-Managed

We highly recommend running Camunda 8 Self-Managed in a Kubernetes environment. We provide officially supported [Helm Charts](/self-managed/platform-deployment/helm-kubernetes/overview.md) for this. Please follow the [Installation Guide](/self-managed/platform-deployment/overview.md) to learn more about installation possibilities.

Requirements for the components can be seen below:

| Component   | Java version | Other requirements                                                                                                                                        |
| ----------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Zeebe       | OpenJDK 17+  | Elasticsearch 8.7.x+, Amazon OpenSearch 2.5.x+ (only if [OpenSearch exporter](../self-managed/zeebe-deployment/exporters/opensearch-exporter.md) is used) |
| Operate     | OpenJDK 17+  | Elasticsearch 8.7.x+, Amazon OpenSearch 2.5.x+                                                                                                            |
| Tasklist    | OpenJDK 17+  | Elasticsearch 8.7.x+, Amazon OpenSearch 2.5.x+                                                                                                            |
| Identity    | OpenJDK 17+  | Keycloak 21.x, 22.x<br/>PostgreSQL 14.x, 15.x                                                                                                             |
| Optimize    | OpenJDK 11+  | Elasticsearch 8.7.x+, Amazon OpenSearch 2.5.x+                                                                                                            |
| Web Modeler | -            | Keycloak 21.x, 22.x<br/>PostgreSQL 13.x, 14.x, 15.x, Amazon Aurora PostgreSQL 13.x, 14.x, 15.x (other database systems are currently not supported)       |

:::note Amazon OpenSearch Support
To use Amazon OpenSearch, the relevant OpenSearch image must be downloaded from [DockerHub](/self-managed/platform-deployment/docker.md/#docker-images).
::: |

:::note Elasticsearch support
Camunda 8 works with the [default distribution](https://www.elastic.co/downloads/elasticsearch) of Elasticsearch, which is available under the [Free or Gold+ Elastic license](https://www.elastic.co/pricing/faq/licensing#summary).
:::

### Helm chart version matrix

The core Camunda components have a unified fixed release schedule following the [release policy](./release-policy.md). However, some of the applications have their own schedule. The following compatibility matrix gives an overview of the different versions with respect to the Helm chart versions.

| Helm chart | Zeebe, Operate, Tasklist | Optimize | Web Modeler | Connectors |
| ---------- | ------------------------ | -------- | ----------- | ---------- |
| 8.2.x      | 8.2.x                    | 3.10.x   | 8.2.x       | >= 0.18.0  |
| 8.1.x      | 8.1.x                    | 3.9.x    | N/A         | N/A        |
| 8.0.x      | 8.0.x                    | 3.9.x    | N/A         | N/A        |

### Version matrix

This overview shows which Zeebe version works with which Modeler, Operate, Tasklist and Optimize:

| Design                | Automate    |                                             | Improve         |
| --------------------- | ----------- | ------------------------------------------- | --------------- |
| Desktop Modeler 4.7+  | Zeebe 1.0.x | Operate 1.0.x Tasklist 1.0.x                | -               |
| Desktop Modeler 4.9+  | Zeebe 1.1.x | Operate 1.1.x Tasklist 1.1.x                | -               |
| Desktop Modeler 4.11+ | Zeebe 1.2.x | Operate 1.2.x Tasklist 1.2.x IAM 1.2.x      | -               |
| Desktop Modeler 4.12+ | Zeebe 1.3.x | Operate 1.3.x Tasklist 1.3.x IAM 1.3.x      | Optimize 3.7.x  |
| Desktop Modeler 5.0+  | Zeebe 8.0.x | Operate 8.0.x Tasklist 8.0.x Identity 8.0.x | Optimize 3.8.x  |
| Desktop Modeler 5.4+  | Zeebe 8.1.x | Operate 8.1.x Tasklist 8.1.x Identity 8.1.x | Optimize 3.9.x  |
| Desktop Modeler 5.10+ | Zeebe 8.2.x | Operate 8.2.x Tasklist 8.2.x Identity 8.2.x | Optimize 3.10.x |
| Web Modeler 8.2.x     | Zeebe 8.2.x | Operate 8.2.x Tasklist 8.2.x Identity 8.2.x | Optimize 3.10.x |

:::note
You can also use newer versions of Desktop and Web Modeler with older Zeebe versions.
:::

## Camunda 7 & Optimize version matrix
See https://docs.camunda.org/enterprise/download/#camunda-optimize
