---
id: elasticsearch-support-and-upgrades
sidebar_label: Elasticsearch
title: Elasticsearch support and upgrades
description: Learn who is responsible for Elasticsearch, which versions and distribution Camunda supports, and what to check before an Elasticsearch upgrade.
---

Learn who is responsible for Elasticsearch, which versions Camunda supports, and what to check before you upgrade. This page applies to every Elasticsearch cluster that you use with Camunda 8 Self-Managed, whatever the deployment method.

:::caution Draft: pending product management review
<!-- TODO(PM): Review this page. Open questions are marked below. -->

Product management has not yet approved the policy statements about image patching and vulnerability handling on this page.
:::

## Understand the support scope

Elasticsearch is an external dependency of Camunda 8 Self-Managed. You are responsible for operating, upgrading, patching, and securing Elasticsearch, regardless of how you deploy it. Camunda supports the integration and configuration of Elasticsearch with Camunda 8.

For operational support, contact [Elastic](https://www.elastic.co/) or your Elasticsearch service provider.

Elasticsearch is used as secondary storage by the Orchestration Cluster and as the database of Optimize. For setup, see [use external Elasticsearch for the Orchestration Cluster](/self-managed/deployment/helm/configure/database/elasticsearch/using-external-elasticsearch.md) and [use external Elasticsearch for Optimize](/self-managed/deployment/helm/configure/database/optimize/using-external-elasticsearch.md).

## Check supported versions and distribution

For the Elasticsearch versions that Camunda supports, see [supported environments](/reference/supported-environments.md#component-requirements). Camunda 8.10 does not support Elasticsearch 9.2 and 9.3.

Camunda works with the Elasticsearch [default distribution](https://www.elastic.co/downloads/elasticsearch) under the [Free or Gold+ Elastic license](https://www.elastic.co/pricing/faq/licensing#summary). You must grant the [Elasticsearch privileges](/self-managed/concepts/databases/elasticsearch/elasticsearch-privileges.md) that Camunda needs.

To find the lifecycle of an Elasticsearch version, see the [Elastic product end-of-life dates](https://www.elastic.co/support/eol).

## Choose a deployment method

| Method                                    | Who operates it              | Notes                                                                                                                                                                                               |
| ----------------------------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Elastic Cloud on Kubernetes (ECK)         | You                          | The [reference deployment](/self-managed/deployment/helm/configure/operator-based-infrastructure.md#elasticsearch-deployment) sets the Elasticsearch version in an `Elasticsearch` custom resource. |
| Existing or managed Elasticsearch cluster | You and the service provider | Connect Camunda to the cluster as described in the setup guides.                                                                                                                                    |

:::caution
<!-- TODO(PM): State who patches the Elasticsearch container image, which service-level agreement applies (if any), and how Camunda handles CVE reports about the Elasticsearch image. -->

This page does not state an SLA, an image patching commitment, or a vulnerability handling process for Elasticsearch images. Product management has not defined them yet.
:::

## Prepare an Elasticsearch upgrade

These steps are your responsibility. Camunda does not run or upgrade Elasticsearch for you.

1. Check that [supported environments](/reference/supported-environments.md#component-requirements) lists the target Elasticsearch version for your Camunda version.
1. Read the Elasticsearch upgrade documentation and release notes for each version between your current version and the target version.
1. Create a backup. See [back up Elasticsearch data with Camunda](/self-managed/operational-guides/backup-restore/elasticsearch/backup.md).
1. If you use the ECK operator, follow the [ECK documentation](https://www.elastic.co/guide/en/cloud-on-k8s/current/index.html) to upgrade the operator and the cluster.
1. Test the upgrade in a non-production environment first. After the upgrade, check that the cluster health is green and that the Camunda components can read and write data.
