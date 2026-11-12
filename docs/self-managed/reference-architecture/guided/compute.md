---
id: compute
title: "Compute"
sidebar_label: "Compute"
description: "Compare Amazon EKS, Amazon ECS with Fargate, and Amazon EC2 for running Camunda 8 Self-Managed, and see which stages of your deployment change with the choice."
---

import { ChoicePanel, GuidedNext, GuidedProgress } from "@site/src/components/GuidedDeployment";

The compute stage decides where the Orchestration Cluster runs. Choose Amazon EKS if you run Kubernetes or need the full platform, Amazon ECS with Fargate if you want containers without operating Kubernetes, and Amazon EC2 if you run the Camunda single application on virtual machines.

<GuidedProgress />

## Compare the options

| Question             | Amazon EKS                                                                                                                                                                                                        | Amazon ECS with Fargate                                                                                                                                                                                                      | Amazon EC2                                                                                                                                                        |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| What you operate     | Nodes, the Helm chart, and the cluster add-ons. AWS runs the Kubernetes control plane.                                                                                                                            | Task definitions and services. AWS runs the orchestrator and the compute.                                                                                                                                                    | Virtual machines, the operating system, and the installation of the Camunda application.                                                                          |
| Skills you need      | Kubernetes and Helm.                                                                                                                                                                                              | Amazon ECS and Terraform. No Kubernetes.                                                                                                                                                                                     | Linux administration, Terraform, and shell scripts.                                                                                                               |
| Deploys              | The [Helm chart](/self-managed/deployment/helm/install/quick-install.md), with the full platform.                                                                                                                 | The Orchestration Cluster and Connectors. In a single region you can add Management Identity and Camunda Hub by switching to OIDC authentication.                                                                            | The Orchestration Cluster. Camunda Hub isn't supported on virtual machines.                                                                                       |
| Broker storage       | Block storage for each broker.                                                                                                                                                                                    | A shared Amazon EFS file system. Cost and performance can differ from block storage.                                                                                                                                         | The disk of each instance.                                                                                                                                        |
| Broker identity      | Fixed by the StatefulSet.                                                                                                                                                                                         | Leased from Amazon S3 by a [node ID provider](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#camundaclusternode-id-provider), because ECS tasks are stateless.                     | One fixed node ID for each instance.                                                                                                                              |
| Scaling              | Start brokers with `kubectl scale`, then join them through the cluster scaling API.                                                                                                                               | Manual. Autoscaling isn't supported: brokers must be joined to or removed from the cluster explicitly through the [cluster scaling API](/self-managed/components/orchestration-cluster/zeebe/operations/cluster-scaling.md). | Manual. Add an instance, then join the broker through the cluster scaling API.                                                                                    |
| Optimize             | Available. It runs as its own deployment.                                                                                                                                                                         | Not available with relational secondary storage, which the ECS reference architecture uses.                                                                                                                                  | Available with the managed OpenSearch domain of the reference architecture.                                                                                       |
| More than one region | [Dual region](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/dual-region.md) and [three or more regions](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/multi-region-rdbms.md). | [Dual region](/self-managed/deployment/containers/cloud-providers/amazon/aws-ecs-dual-region.md), as an experimental reference architecture.                                                                                 | A single region, with three instances in three availability zones. See the [Amazon EC2 guide](/self-managed/deployment/manual/cloud-providers/amazon/aws-ec2.md). |

## Choose a compute option

### Amazon EKS

Choose Amazon EKS if any of these apply:

- You already run Kubernetes and want Camunda to follow the same tooling, observability, and upgrade practices.
- You need Optimize together with relational secondary storage, or components that the other options don't deploy.
- You need block storage for the brokers, or autoscaling around the cluster.
- You plan for three or more regions.

### Amazon ECS with Fargate

Choose Amazon ECS with Fargate if all of these apply:

- You don't operate Kubernetes and don't want to start.
- You need the Orchestration Cluster and Connectors, with relational secondary storage.
- You accept manual scaling and shared file storage.

### Amazon EC2

Choose Amazon EC2 if all of these apply:

- You want to run the Camunda single application directly on virtual machines, without containers.
- You need only the Orchestration Cluster, in a single region.
- Your team already administers virtual machines and their operating system.

If you're unsure, start with the option your team already operates. Each option is a reference architecture: it shows how the components fit together and isn't production-ready as it is.

<ChoicePanel question="compute" />

## See what changes with the choice

The decision only changes some stages. Stages that your choice doesn't affect keep the same inputs and outputs, which is why you can decide them on their own pages.

| Stage                 | Changes with the compute choice? | What differs                                                                                                                                                                  |
| --------------------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Network               | No                               | The same VPC contract serves every option. See [network](./network.md).                                                                                                       |
| Secondary storage     | Partly                           | Aurora PostgreSQL works with Amazon EKS and Amazon ECS. The Amazon EC2 reference architecture uses a managed OpenSearch domain.                                               |
| Object storage        | Partly                           | Every option needs a backup bucket. Only Amazon ECS needs a node ID lease bucket for each zone.                                                                               |
| Compute               | Yes                              | A Kubernetes cluster and node groups, an ECS cluster with a task execution role, or EC2 instances.                                                                            |
| Exposure              | Partly                           | Kubernetes uses an Ingress. Amazon ECS attaches rules to load balancer listeners that the exposure stage creates. Amazon EC2 uses an Application and a Network Load Balancer. |
| Camunda configuration | Yes                              | Helm values, ECS task definitions with the same Camunda properties as environment variables, or the configuration file of the application on each instance.                   |

:::note Current state of the reference repository
The guided Terraform exists for Amazon ECS only. The Amazon EKS and Amazon EC2 reference architectures still create their own VPC and storage, so they don't consume the stages yet.
:::

## Switch later

There is no in-place move between compute options. Plan a change as a new deployment that you restore a [backup](/self-managed/operational-guides/backup-restore/backup-and-restore.md) into, and test the restore before you rely on it.

## Next steps

- [Deploy to Amazon ECS](/self-managed/deployment/containers/cloud-providers/amazon/aws-ecs.md)
- [Deploy to Amazon EKS](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/amazon-eks.md)
- [Deploy to Amazon EC2](/self-managed/deployment/manual/cloud-providers/amazon/aws-ec2.md)
- [Network](./network.md)

<GuidedNext />
