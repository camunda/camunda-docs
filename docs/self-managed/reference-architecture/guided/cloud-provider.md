---
id: cloud-provider
title: "Cloud provider"
sidebar_label: "Cloud provider"
description: "See the cloud providers that Camunda 8 Self-Managed reference architectures support, the compute each one offers, and how many regions you need."
pagination_prev: null
pagination_next: null
---

import { ChoicePanel, GuidedNext, GuidedProgress } from "@site/src/components/GuidedDeployment";

Camunda 8 Self-Managed has reference architectures for the cloud providers below. Choose the provider first, because it decides which compute options exist. The Terraform of the guided deployment exists for AWS.

<GuidedProgress />

## Supported cloud providers

| Cloud provider            | Compute options                                                                                                                                                                                                                                                                  |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Amazon Web Services (AWS) | [Amazon EKS](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/amazon-eks.md), [Amazon ECS with Fargate](/self-managed/deployment/containers/cloud-providers/amazon/index.md), and [Amazon EC2](/self-managed/deployment/manual/cloud-providers/amazon/aws-ec2.md) |
| Red Hat OpenShift on AWS  | [OpenShift](/self-managed/deployment/helm/cloud-providers/amazon/openshift/terraform-setup.md)                                                                                                                                                                                   |
| Microsoft Azure           | [Azure Kubernetes Service](/self-managed/deployment/helm/cloud-providers/azure/microsoft-aks/terraform-setup.md)                                                                                                                                                                 |
| Google Cloud              | [Google Kubernetes Engine](/self-managed/deployment/helm/cloud-providers/gcp/google-gke.md)                                                                                                                                                                                      |

The guided deployment covers AWS. The other providers have their own reference architectures, linked in the table.

<ChoicePanel question="cloud" />

The same Camunda components run on every option. For the families, see the [Kubernetes](/self-managed/reference-architecture/kubernetes.md) and [container](/self-managed/reference-architecture/containers.md) overviews, and [compare the compute options on AWS](./compute.md).

## Decide how many regions you need

The number of regions follows from how much downtime and data loss your business can accept. A single region, spread over three availability zones, fits most deployments: it survives the loss of a zone, and with cross-region backups you can restore after the loss of a whole region, which takes hours. Choose two regions when your business or your regulator can't accept losing data and needs recovery in about 15 minutes after a region loss, and you're willing to run a full second deployment all the time and fail over by hand. Choose three or more regions when processing must continue through the loss of a region without an operator step, for example for processes that run around the clock, and you accept the cost of a third region and a relational secondary storage, which excludes Optimize. See [multi-region resilience](/self-managed/concepts/multi-region/resilience-tiers.md) for the recovery times and the trade-offs of each strategy.

<ChoicePanel question="regions" />

## Next steps

- [Network](./network.md)
- [Compute](./compute.md)

<GuidedNext />
