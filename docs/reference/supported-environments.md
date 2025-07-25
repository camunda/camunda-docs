---
id: supported-environments
title: "Supported environments"
description: "Find out where to run Camunda 8 components for SaaS and Self-Managed, including Optimize for both Camunda 8 and Camunda 7."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

The supported environments page lists browsers, operating systems, clients, deployment options, and component requirements, which are tested and supported for compatibility with Camunda 8.

**If the particular technology is not listed, we cannot resolve issues caused by the usage of that unlisted technology.**

You may [raise a feature request](/reference/contact.md) that will be evaluated by our product teams to provide official support from Camunda, or you can make a [help request](/reference/contact.md) to work with Consulting services.

Recommendations are denoted with [recommended], however, other listed options are supported as well.

:::note Minimum versions
The versions listed on this page are the minimum version required if appended with a `+`.

Pay attention to where the `+` falls, as most of our dependencies follow [semantic versioning](https://semver.org/) (semver), where `x.y.z` correspond to MAJOR.MINOR.PATCH. Higher or more recent versions will be compatible with Camunda, with respect to semver.

For example, 1.2+ means support for the minor version 2, and any higher minors (1.3, 1.4, etc.) and patches (1.2.1, 1.2.2, etc.), but not majors, like 2.x.

:::

## Web Browser

- Google Chrome latest [recommended]
- Mozilla Firefox latest
- Microsoft Edge latest

## Desktop Modeler

- Windows 10 / 11
- macOS 13 / 14 / 15
- Ubuntu LTS (latest)

## Clients

- **Zeebe Java Client**: OpenJDK 8+
- **Camunda Spring Boot SDK**: OpenJDK 17+
- **Connector SDK**: OpenJDK 17+
- **Camunda Spring Boot SDK**: Spring Boot 3.4.x (for the exact version, check the [version matrix](/apis-tools/spring-zeebe-sdk/getting-started.md#version-compatibility).)
- **Helm CLI**: 3.14.x (for the exact version, check the [version matrix](https://helm.camunda.io/camunda-platform/version-matrix/).)

## Camunda 8 Self-Managed

We recommend running Camunda 8 Self-Managed in a Kubernetes environment. We provide officially supported [Helm Charts](/self-managed/setup/overview.md) for this. Please follow the [Installation Guide](/self-managed/setup/overview.md) to learn more about installation possibilities.

### Deployment options

With the right configuration, Camunda 8 Self-Managed can be deployed on any [Certified Kubernetes](https://www.cncf.io/training/certification/software-conformance/#benefits) distribution (cloud or on-premises). However, we officially test and support a specific list of platforms.

The following are tested and supported deployment options for Kubernetes, Docker, and manual installation:

- [Stock Kubernetes](/self-managed/installation-methods/helm/install.md)
- [Cloud service providers](/self-managed/installation-methods/helm/install.md) [recommended]
  - [Amazon EKS](/self-managed/installation-methods/helm/cloud-providers/amazon/amazon-eks/amazon-eks.md)
  - [Microsoft AKS](/self-managed/installation-methods/helm/cloud-providers/azure/microsoft-aks/microsoft-aks.md)
  - [Google GKE](/self-managed/installation-methods/helm/cloud-providers/gcp/google-gke.md)
- [Red Hat OpenShift](/self-managed/installation-methods/helm/cloud-providers/openshift/redhat-openshift.md)
- [Docker](/self-managed/installation-methods/docker/docker.md) (`linux/amd64`)
- [Manual](/self-managed/installation-methods/manual/install.md)

:::note Helm chart compatibility
Ensure the Camunda component versions are compatible with the Helm chart version as defined in the [matrix](https://helm.camunda.io/camunda-platform/version-matrix/).
:::

### Sizing

The [sizing of a Camunda 8 installation](/components/best-practices/architecture/sizing-your-environment.md) depends on various influencing factors. Ensure to [determine these factors](../components/best-practices/architecture/sizing-your-environment.md#understanding-influencing-factors), and conduct [benchmarking](../components/best-practices/architecture/sizing-your-environment.md#running-experiments-and-benchmarks) to validate an appropriate environment size for your test, integration, or production environments.

#### Volume performance

As a minimum requirement, the persistent volumes for Zeebe should use volumes with an absolute minimum of 1,000 IOPS. **NFS or other types of network storage volumes are not supported.**

To ensure an appropriate sizing, [determine your influencing factors](../components/best-practices/architecture/sizing-your-environment.md#understanding-influencing-factors) (e.g., throughput), and conduct [benchmarking to validate an appropriate environment sizing](../components/best-practices/architecture/sizing-your-environment.md#running-experiments-and-benchmarks).

For details on typical volume type usage, refer to the following examples specific to cloud service providers:

- [Amazon EKS](/self-managed/reference-architecture/kubernetes.md#amazon-eks)
- [Microsoft AKS](/self-managed/reference-architecture/kubernetes.md#microsoft-aks)
- [Google GKE](/self-managed/reference-architecture/kubernetes.md#google-gke)

### Helm charts version matrix

Camunda Helm chart version `13.x.x` works with Camunda version `8.8.x`. Check the [Helm chart version matrix](https://helm.camunda.io/camunda-platform/version-matrix/camunda-8.8/) for more details.

## Component requirements

Requirements for the components can be seen below:

| Component                                                  | Java version | Other requirements                                                                                                                                                                                                   |
| ---------------------------------------------------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Orchestration Cluster (Zeebe, Operate, Tasklist, Identity) | OpenJDK 21+  | Elasticsearch 8.16+<br/>Amazon OpenSearch 2.17+ (requires use of [OpenSearch exporter](../self-managed/zeebe-deployment/exporters/opensearch-exporter.md))                                                           |
| Optimize                                                   | OpenJDK 21+  | Elasticsearch 8.16+<br/>Amazon OpenSearch 2.17+                                                                                                                                                                      |
| Connectors                                                 | OpenJDK 21+  |                                                                                                                                                                                                                      |
| Management Identity                                        | OpenJDK 17+  | Keycloak 25.x, 26.x<br/>PostgreSQL 14.x, 15.x or Amazon Aurora PostgreSQL 13.x, 14.x, 15.x (required for [certain features](/self-managed/identity/miscellaneous/configuration-variables.md#database-configuration)) |
| Web Modeler                                                | -            | PostgreSQL 13.x, 14.x, 15.x, 16.x, 17.x or Amazon Aurora PostgreSQL 13.x, 14.x, 15.x, 16.x                                                                                                                           |
| Self-Managed Console                                       | -            | -                                                                                                                                                                                                                    |

When running Elasticsearch, you must have the [appropriate Elasticsearch privileges](/self-managed/concepts/elasticsearch-privileges.md).

Due to the [limitation](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/or1.html#or1-considerations)
for the index refresh interval, we do not support [OR1 instances](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/or1.html). More information on configuring Amazon OpenSearch can be found [here](/self-managed/installation-methods/helm/configure/database/using-existing-opensearch.md).

:::note Elasticsearch support
Camunda 8 works with the [default distribution](https://www.elastic.co/downloads/elasticsearch) of Elasticsearch, which is available under the [Free or Gold+ Elastic license](https://www.elastic.co/pricing/faq/licensing#summary).
:::

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
