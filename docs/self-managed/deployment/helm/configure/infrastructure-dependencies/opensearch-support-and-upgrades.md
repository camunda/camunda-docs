---
id: opensearch-support-and-upgrades
sidebar_label: OpenSearch
title: OpenSearch support and upgrades
description: Learn who is responsible for OpenSearch, which versions and services Camunda supports, and what to check before an OpenSearch upgrade.
---

Learn who is responsible for OpenSearch, which versions and services Camunda supports, and what to check before you upgrade. This page applies to every OpenSearch cluster that you use with Camunda 8 Self-Managed, whatever the deployment method.

:::caution Draft: pending product management review
<!-- TODO(PM): Review this page. Open questions are marked below. -->

Product management has not yet approved the policy statements about image patching and vulnerability handling on this page.
:::

## Understand the support scope

OpenSearch is an external dependency of Camunda 8 Self-Managed. You are responsible for operating, upgrading, patching, and securing OpenSearch, regardless of how you deploy it. Camunda supports the integration and configuration of OpenSearch with Camunda 8.

For operational support, contact the [OpenSearch](https://opensearch.org/) project or your OpenSearch service provider, for example Amazon Web Services (AWS).

OpenSearch is used as secondary storage by the Orchestration Cluster and as the database of Optimize. For setup, see [use Amazon OpenSearch Service for the Orchestration Cluster](/self-managed/deployment/helm/configure/database/using-external-opensearch.md) and [use external OpenSearch for Optimize](/self-managed/deployment/helm/configure/database/optimize/using-external-opensearch.md).

## Check supported versions and services

For the OpenSearch versions that Camunda supports, see [supported environments](/reference/supported-environments.md#component-requirements). Camunda 8.10 does not support OpenSearch 3.4 and 3.5.

Camunda supports both the open-source [OpenSearch](https://opensearch.org/) distribution and [Amazon OpenSearch Service](https://aws.amazon.com/opensearch-service). Amazon OpenSearch Service [OR1 instances](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/or1.html) are not supported. You must grant the [OpenSearch privileges](/self-managed/concepts/databases/elasticsearch/opensearch-privileges.md) that Camunda needs.

To find the release and maintenance policy of OpenSearch versions, see the [OpenSearch releases page](https://opensearch.org/releases/).

## Choose a deployment method

| Method                          | Who operates it | Notes                                                                                                                                                                                                                                                   |
| ------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Amazon OpenSearch Service       | AWS and you     | The Camunda reference architectures for Amazon EKS create the domain with a Terraform module. For details, see the [Terraform setup guide](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/terraform-setup.md#opensearch-module-setup). |
| Self-managed OpenSearch cluster | You             | The Camunda reference architectures provide no Kubernetes operator deployment for OpenSearch. Connect Camunda to the cluster as described in the setup guides.                                                                                          |

:::caution
<!-- TODO(PM): State who patches OpenSearch container images (self-managed clusters), which service-level agreement applies (if any), and how Camunda handles CVE reports about OpenSearch images. -->

This page does not state an SLA, an image patching commitment, or a vulnerability handling process for OpenSearch images. Product management has not defined them yet.
:::

## Prepare an OpenSearch upgrade

These steps are your responsibility. Camunda does not run or upgrade OpenSearch for you.

1. Check that [supported environments](/reference/supported-environments.md#component-requirements) lists the target OpenSearch version for your Camunda version.
1. Read the OpenSearch upgrade documentation or the upgrade documentation of your service provider for each version between your current version and the target version.
1. Create a backup. See [backup and restore](/self-managed/operational-guides/backup-restore/backup-and-restore.md).
1. Test the upgrade in a non-production environment first. After the upgrade, check that the cluster health is green and that the Camunda components can read and write data.
