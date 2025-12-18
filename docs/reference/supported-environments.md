---
id: supported-environments
title: "Supported environments"
description: "Find out where to run Camunda 8 components for SaaS and Self-Managed, including Optimize for both Camunda 8 and Camunda 7."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

The following browsers, operating systems, clients, deployment options, and component requirements are tested and supported for compatibility with Camunda 8.

## About supported environments

**If a particular technology is not listed below, Camunda cannot resolve issues caused by its usage.**

You can:

- [Raise a feature request](/reference/contact.md) that will be evaluated by our product teams to provide official support from Camunda.
- [Make a help request](/reference/contact.md) to work with Camunda consulting services.

Recommendations are denoted with [recommended], however, other listed options are also supported.

:::note Minimum versions
The versions listed on this page are the minimum version required if appended with a `+`.

Pay attention to where the `+` falls, as most of our dependencies follow [semantic versioning](https://semver.org/) (semver), where `x.y.z` correspond to MAJOR.MINOR.PATCH. Higher or more recent versions will be compatible with Camunda, with respect to semver.

For example, 1.2+ means support for the minor version 2, and any higher minors (1.3, 1.4, etc.) and patches (1.2.1, 1.2.2, etc.), but not majors, like 2.x.

:::

## Web browsers

- Google Chrome latest [recommended]
- Mozilla Firefox latest
- Microsoft Edge latest

## Desktop Modeler

- Windows 10 / 11
- macOS 13 / 14 / 15 / 26
- Ubuntu LTS (latest)

## Clients

- **Zeebe Java Client**: OpenJDK 8+
- **Connector SDK**: OpenJDK 17+
- **Camunda Spring Boot Starter**: OpenJDK 17+, Spring Boot 3.5.x
- **Helm CLI**: 3.14.x (for the exact version, check the [version matrix](https://helm.camunda.io/camunda-platform/version-matrix/).)

## Camunda 8 Self-Managed

We recommend running Camunda 8 Self-Managed in a Kubernetes environment. We provide officially supported [Helm Charts](/self-managed/setup/overview.md) for this. Please follow the [Installation Guide](/self-managed/setup/overview.md) to learn more about installation possibilities.

### Deployment options

With the correct configuration, Camunda 8 Self-Managed can be deployed on any [Certified Kubernetes](https://www.cncf.io/training/certification/software-conformance/#benefits) distribution (cloud or on-premises). However, we officially test and support a specific list of platforms.

The following are tested and supported deployment options for Kubernetes, Docker, and manual installation:

- [Stock Kubernetes](/self-managed/deployment/helm/install/quick-install.md)
- [Cloud service providers](/self-managed/deployment/helm/install/quick-install.md) [recommended]
  - [Amazon EKS](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/amazon-eks.md)
  - [Microsoft AKS](/self-managed/deployment/helm/cloud-providers/azure/microsoft-aks/microsoft-aks.md)
  - [Google GKE](/self-managed/deployment/helm/cloud-providers/gcp/google-gke.md)
- [Red Hat OpenShift](/self-managed/deployment/helm/cloud-providers/openshift/redhat-openshift.md)
- [Docker](/self-managed/deployment/docker/docker.md) (`linux/amd64`)
- [Manual](/self-managed/deployment/manual/install.md)

:::note Helm chart compatibility
Ensure the Camunda component versions are compatible with the Helm chart version as defined in the [matrix](https://helm.camunda.io/camunda-platform/version-matrix/).
:::

### Sizing

The [sizing of a Camunda 8 installation](/components/best-practices/architecture/sizing-your-environment.md) depends on various influencing factors. Ensure to [determine these factors](../components/best-practices/architecture/sizing-your-environment.md#understanding-influencing-factors), and conduct [benchmarking](../components/best-practices/architecture/sizing-your-environment.md#running-experiments-and-benchmarks) to validate an appropriate environment size for your test, integration, or production environments.

#### Volume performance

As a minimum requirement, the persistent volumes for Zeebe should use volumes with an absolute minimum of 1,000 IOPS. **NFS or other types of network storage volumes are not supported.**

To ensure an appropriate sizing, [determine your influencing factors](../components/best-practices/architecture/sizing-your-environment.md#understanding-influencing-factors) (for example, throughput), and conduct [benchmarking to validate an appropriate environment sizing](../components/best-practices/architecture/sizing-your-environment.md#running-experiments-and-benchmarks).

For details on typical volume type usage, refer to the following examples specific to cloud service providers:

- [Amazon EKS](/self-managed/reference-architecture/kubernetes.md#amazon-eks)
- [Microsoft AKS](/self-managed/reference-architecture/kubernetes.md#microsoft-aks)
- [Google GKE](/self-managed/reference-architecture/kubernetes.md#google-gke)

### Helm charts version matrix

Camunda Helm chart version `13.x.x` works with Camunda version `8.8.x`. Check the [Helm chart version matrix](https://helm.camunda.io/camunda-platform/version-matrix/camunda-8.8/) for more details.

## Component requirements

Requirements for components are as follows:

| Component                                                  | Java version | Other requirements                                                                                                                                                                                                                                                                                                                              |
| :--------------------------------------------------------- | :----------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Orchestration Cluster (Zeebe, Operate, Tasklist, Identity) | OpenJDK 21+  | <ul><li>OpenSearch 2.17+ (requires use of [OpenSearch exporter](/self-managed/components/orchestration-cluster/zeebe/exporters/opensearch-exporter.md))</li><li>Elasticsearch 8.18.6+</li></ul>                                                                                                                                                 |
| Optimize                                                   | OpenJDK 21+  | <ul><li>OpenSearch 2.17+</li><li>Elasticsearch 8.18.6+</li></ul>                                                                                                                                                                                                                                                                                |
| Connectors                                                 | OpenJDK 21+  | -                                                                                                                                                                                                                                                                                                                                               |
| Management Identity                                        | OpenJDK 17+  | <ul><li>Keycloak 25.x, 26.x</li><li>Microsoft SQL Server: 2019</li><li>Oracle 19c</li><li>PostgreSQL 14.x, 15.x, 16.x, 17.x, or Amazon Aurora PostgreSQL 13.x, 14.x, 15.x, 16.x, 17.x (required for [certain features](/self-managed/components/management-identity/miscellaneous/configuration-variables.md#database-configuration))</li></ul> |
| Web Modeler                                                | -            | <ul><li>H2 2.3</li><li>MariaDB 10.11, 11.4, 11.8</li><li>Microsoft SQL Server (MSSQL): 2019, 2022, 2025</li><li>MySQL 8.4</li><li>Oracle 19c, 23ai</li><li>PostgreSQL 14.x, 15.x, 16.x, 17.x, 18.x, or Amazon Aurora PostgreSQL 14.x, 15.x, 16.x, 17.x</li></ul>                                                                                |
| Self-Managed Console                                       | -            | -                                                                                                                                                                                                                                                                                                                                               |

### OpenSearch and Elasticsearch support

- Camunda 8 supports both [Amazon OpenSearch](https://aws.amazon.com/opensearch-service) and the open-source [OpenSearch](https://opensearch.org/) distribution.
- Due to a [limitation](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/or1.html#or1-considerations)
  for the index refresh interval, [OR1 instances](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/or1.html) are not supported with Amazon OpenSearch. See [use Amazon OpenSearch Service with the Helm chart](/self-managed/deployment/helm/configure/database/using-external-opensearch.md).
- When running Elasticsearch, you must have the [appropriate Elasticsearch privileges](/self-managed/concepts/databases/elasticsearch/elasticsearch-privileges.md).
- Camunda 8 works with the Elasticsearch [default distribution](https://www.elastic.co/downloads/elasticsearch) available with the [Free or Gold+ Elastic license](https://www.elastic.co/pricing/faq/licensing#summary).

### Component version matrix

The following matrix shows which component versions work together.

<Tabs
defaultValue="version-8-7-x"
values={[
{label: 'Version <= 8.7.x', value: 'version-8-7-x'},
{label: 'Version 8.8.x+', value: 'version-8-8-x'},
]}>

<TabItem value="version-8-7-x">

From version `8.6.0` forward, Zeebe, Operate, and Tasklist must run on on the exact same `minor` and `patch` level to ensure compatibility.

| Design                                        | Automate                                                                                                | Improve        |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------- | -------------- |
| Desktop Modeler 5.31+ <br/> Web Modeler 8.7.x | (Zeebe, Operate, Tasklist) 8.7.x, Connectors 8.7.x, <br/>Identity 8.7.x, Console 8.7.x, RPA worker 1.0+ | Optimize 8.7.x |
| Desktop Modeler 5.28+ <br/> Web Modeler 8.6.x | (Zeebe, Operate, Tasklist) 8.6.x, Connectors 8.6.x, <br/>Identity 8.6.x, Console 8.6.x                  | Optimize 8.6.x |
| Desktop Modeler 5.22+ <br/> Web Modeler 8.5.x | Zeebe 8.5.x, Operate 8.5.x, Tasklist 8.5.x, <br/>Identity 8.5.x, Connectors 8.5.x, Console 8.5.x        | Optimize 8.5.x |
| Desktop Modeler 5.19+ <br/> Web Modeler 8.4.x | Zeebe 8.4.x, Operate 8.4.x, Tasklist 8.4.x, <br/>Identity 8.4.x, Connectors 8.4.x                       | Optimize 8.4.x |

:::note
You can also use newer versions of Desktop and Web Modeler with older Zeebe versions.
:::

</TabItem>

<TabItem value="version-8-8-x">

From version `8.8.0` forward, Zeebe, Operate, Tasklist and Identity must run on the exact same `minor` and `patch` level to ensure compatibility.

| Design                                     | [Orchestration Cluster](../self-managed/reference-architecture/reference-architecture.md#orchestration-cluster) | [Management](../self-managed/reference-architecture/reference-architecture.md#web-modeler-and-console) |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Web Modeler 8.8.x<br/> Desktop Modeler TBD | (Zeebe, Operate, Tasklist, Identity) 8.8.x, <br/>Connectors 8.8.x, Optimize 8.8.x                               | Management Identity 8.8.x, Self-Managed Console 8.8.x                                                  |

:::note
You can also use newer versions of Desktop and Web Modeler with older versions of the Orchestration Cluster.
:::

</TabItem>

</Tabs>
