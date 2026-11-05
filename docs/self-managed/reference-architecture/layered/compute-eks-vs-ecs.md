---
id: compute-eks-vs-ecs
title: "Choose between Amazon EKS and Amazon ECS"
sidebar_label: "Compute: EKS or ECS"
description: "Compare Amazon EKS and Amazon ECS with Fargate for running Camunda 8 Self-Managed, and see which layers of your deployment change with the choice."
---

Choose Amazon EKS if you already run Kubernetes or need the full platform, and Amazon ECS with Fargate if you want containers without operating Kubernetes. This page compares the two and shows what else changes when you choose.

## Compare the two options

| Question                    | Amazon EKS                                                                                                                                                                                                        | Amazon ECS with Fargate                                                                                                                                                                                                      |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Who runs the control plane? | AWS runs the Kubernetes control plane. You operate nodes, the Helm chart, and the cluster add-ons.                                                                                                                | AWS runs the orchestrator and the compute. You operate task definitions and services.                                                                                                                                        |
| Skills you need             | Kubernetes and Helm.                                                                                                                                                                                              | Amazon ECS and Terraform. No Kubernetes.                                                                                                                                                                                     |
| Deploys                     | The [Helm chart](/self-managed/deployment/helm/install/quick-install.md), with the full platform.                                                                                                                 | The Orchestration Cluster and Connectors. In a single region you can add Management Identity and Camunda Hub by switching to OIDC authentication.                                                                            |
| Broker storage              | Block storage for each broker.                                                                                                                                                                                    | A shared Amazon EFS file system. Cost and performance can differ from block storage.                                                                                                                                         |
| Broker identity             | Fixed by the StatefulSet.                                                                                                                                                                                         | Leased from Amazon S3 by a [node ID provider](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#camundaclusternode-id-provider), because ECS tasks are stateless.                     |
| Scaling                     | Start brokers with `kubectl scale`, then join them through the cluster scaling API.                                                                                                                               | Manual. Autoscaling isn't supported: brokers must be joined to or removed from the cluster explicitly through the [cluster scaling API](/self-managed/components/orchestration-cluster/zeebe/operations/cluster-scaling.md). |
| Optimize                    | Available. It runs as its own deployment.                                                                                                                                                                         | Not available with relational secondary storage, which the ECS reference architecture uses.                                                                                                                                  |
| More than one region        | [Dual region](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/dual-region.md) and [three or more regions](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/multi-region-rdbms.md). | [Dual region](/self-managed/deployment/containers/cloud-providers/amazon/aws-ecs-dual-region.md), as an experimental reference architecture.                                                                                 |

## Choose a compute option

Choose Amazon EKS if any of these apply:

- You already run Kubernetes and want Camunda to follow the same tooling, observability, and upgrade practices.
- You need Optimize, or components that the ECS reference architecture doesn't deploy.
- You need block storage for the brokers, or autoscaling around the cluster.
- You plan for three or more regions.

Choose Amazon ECS with Fargate if all of these apply:

- You don't operate Kubernetes and don't want to start.
- You need the Orchestration Cluster and Connectors, with relational secondary storage.
- You accept manual scaling and shared file storage.

If you're unsure, start with the option your team already operates. Both are reference architectures: they show how the components fit together and aren't production-ready as they are.

## See what changes with the choice

The decision only changes some layers. Layers that your choice doesn't affect keep the same inputs and outputs, which is why you can decide them on their own pages.

| Layer                 | Changes with the compute choice? | What differs                                                                                            |
| --------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Network               | No                               | The same VPC contract serves both. See [bring your own VPC](./network-bring-your-own-vpc.md).           |
| Secondary storage     | No                               | Aurora PostgreSQL works with both.                                                                      |
| Object storage        | Partly                           | Both need a backup bucket. Only ECS needs a node ID lease bucket for each zone.                         |
| Compute               | Yes                              | A Kubernetes cluster and node groups, or an ECS cluster with a task execution role.                     |
| Exposure              | Partly                           | Kubernetes uses ingress. ECS attaches rules to load balancer listeners that the exposure layer creates. |
| Camunda configuration | Yes                              | Helm values, or ECS task definitions with the same Camunda properties as environment variables.         |

:::note Current state of the reference repository
The layered Terraform exists for Amazon ECS only. The EKS reference architectures still create their own VPC and storage, so they don't consume the layers yet.
:::

## Switch later

There is no in-place move between Amazon ECS and Kubernetes. Plan a change as a new deployment that you restore a [backup](/self-managed/operational-guides/backup-restore/backup-and-restore.md) into, and test the restore before you rely on it.

## Next steps

- [Deploy to Amazon ECS](/self-managed/deployment/containers/cloud-providers/amazon/aws-ecs.md)
- [Deploy to Amazon EKS](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/amazon-eks.md)
- [Bring your own VPC](./network-bring-your-own-vpc.md)
