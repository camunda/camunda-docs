---
id: guided-deployment
title: "Guided deployment on AWS"
sidebar_label: "Guided deployment"
description: "Follow a step-by-step reference architecture for Camunda 8 Self-Managed on AWS: decide the network, compute, storage, exposure, and sign-in one step at a time, and grow from one region to more."
pagination_prev: null
pagination_next: null
---

import { AllOptions, GuidedNext, GuidedProgress } from "@site/src/components/GuidedDeployment";

A guided deployment is a step-by-step reference architecture for Camunda 8 Self-Managed on AWS. Each page covers one decision, in the order you make them, and ends with the Terraform steps that deploy it. You can use every step on its own, skip steps you already have, such as a network, and grow from one region to more without a rebuild.

:::note Amazon ECS first
The Terraform of the [reference repository](https://github.com/camunda/camunda-deployment-references/tree/main/aws/containers/ecs-guided) targets Amazon ECS. The decisions on these pages apply to Amazon EKS and Amazon EC2 as well, but their reference architectures don't use the guided Terraform yet.
:::

Each step page asks for your choice in a panel and keeps it as you move on. A step offers only the options that your earlier choices allow, shows options that they rule out greyed out with the reason, and hides the content that doesn't apply to you. Without choices, every page shows all of its content. [Your architecture](./your-architecture.md) draws the result, and its link reproduces your choices.

<GuidedProgress />

## See how the pieces stack up

<!-- Editable source: ./img/guided-deployment-stack.excalidraw -->

![A stack of bands. At the top, side by side, are the Orchestration Cluster, with Zeebe, Operate, Tasklist, Admin, and Connectors, and the management plane, with Camunda Hub and Management Identity. Below them, side by side, are Identity and Exposure. Below those, side by side, are Secondary storage and Object storage. Below those, full width, are Compute and then Network at the bottom. A note states that each band builds on the bands below it.](./img/guided-deployment-stack.svg)

Each band is a step of the guide. A step uses what the steps below it provide, such as the subnets of the network or the database of the secondary storage, and you can bring your own for any of them. In the Terraform, each step is a stage: a separate root that takes variables as inputs and publishes outputs. A stage never reads another stage's state. The helper script copies the outputs of one stage into the variables of the next.

## Before you start

1. Pick two regions if you plan to grow. Keep the regions that your organization reserves for tests out of your plan.
1. Check the service quotas in each region for VPCs, Elastic IP addresses, NAT gateways, load balancers, and Aurora clusters.
1. Create an S3 bucket and a prefix for the Terraform state of the stages.
1. Sign in with permissions for the services that the stages create: ECS, IAM, EC2 and VPC, Elastic Load Balancing, KMS, CloudWatch Logs, RDS, S3, and Secrets Manager.

## Follow the steps in order

Each decision constrains the next: the cloud limits the network, the network limits the compute, and so on.

| Step                                                          | Decision                                                              |
| ------------------------------------------------------------- | --------------------------------------------------------------------- |
| [Cloud provider](./cloud-provider.md)                         | Which cloud, and how many regions?                                    |
| [Network](./network.md)                                       | Create a VPC or use an existing one? How do regions connect?          |
| [Compute](./compute.md)                                       | Kubernetes, Amazon ECS, or virtual machines?                          |
| [Secondary storage](./secondary-storage.md)                   | Relational database, or Elasticsearch and OpenSearch?                 |
| [Object storage](./object-storage.md)                         | How many buckets do you need, and why?                                |
| [Exposure](./exposure.md)                                     | How do users and clients reach the cluster, and where does TLS end?   |
| [Orchestration Cluster](./orchestration-cluster/overview.md)  | How many brokers and zones does the cluster have?                     |
| [Management plane](./management-plane/overview.md) (optional) | Do you need Camunda Hub and Management Identity for several clusters? |
| [Identity](./identity.md)                                     | How do users and clients sign in: built-in users or OIDC?             |
| [Your architecture](./your-architecture.md)                   | What did you choose, and how does it fit together?                    |

The steps share one model of every option and the rules between them. Open it to see which choice enables or rules out which option:

<AllOptions />

Every step publishes outputs that the next steps take as inputs:

| Step                  | Takes from               | Publishes                                                                      |
| --------------------- | ------------------------ | ------------------------------------------------------------------------------ |
| Network               | Nothing, or your VPC IDs | `vpc_id`, `vpc_cidr`, `private_subnet_ids`, `public_subnet_ids`                |
| Compute               | Network                  | `ecs_cluster_id`, `task_execution_role_arn`, `camunda_ports_security_group_id` |
| Secondary storage     | Network, compute         | `secondary_storage` connection settings, database access policies              |
| Object storage        | Nothing                  | Bucket names, access policies                                                  |
| Exposure              | Network, compute         | Listener ARNs, `public_base_url`                                               |
| Orchestration Cluster | Every step above         | Service Connect names, `cluster_registration`                                  |
| Management plane      | Every step above         | The address of Camunda Hub, the clusters it connects to                        |

## Grow the deployment

After the deployment runs, you can grow it without rebuilding it. These pages describe only what changes.

| Step                         | Page                                                     |
| ---------------------------- | -------------------------------------------------------- |
| One region to two regions    | [Grow to two regions](./grow/single-to-dual-region.md)   |
| Two regions to three regions | [Grow to three regions](./grow/dual-to-three-regions.md) |

Growing relies on two choices that you make on day one: zone-aware brokers, and an internal load balancer for broker traffic. Both are covered in the pages above.

<GuidedNext />
