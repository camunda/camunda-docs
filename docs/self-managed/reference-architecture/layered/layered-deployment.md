---
id: layered-deployment
title: "Plan a layered deployment on AWS"
sidebar_label: "Layered deployment"
description: "Decide the network, compute, storage, exposure, and identity of a Camunda 8 deployment on AWS one layer at a time, and grow it from one region to two."
---

A layered deployment splits a Camunda 8 Self-Managed installation on AWS into layers that you decide, and build, one at a time. Each layer takes the outputs of the layers before it as input, so you can bring something you already have, such as a VPC, instead of building a copy.

:::note Amazon EKS
The layered Terraform in the [reference repository](https://github.com/camunda/camunda-deployment-references/tree/main/aws/containers/ecs-layered) targets Amazon ECS. The decisions on these pages apply to Amazon EKS as well, but the EKS reference architectures don't consume the layered roots yet.
:::

## How the layers fit together

Every layer is its own Terraform root with variables as inputs and outputs as results. A layer never reads another layer's state. A script, or you, copies the outputs of one layer into the variables of the next.

<!-- Editable source: ./img/layered-deployment-layers.excalidraw -->

![Seven layers of a deployment. Network is at the top and passes its outputs to compute, secondary storage, and exposure. Compute, secondary storage, exposure, object storage, and identity each pass their outputs to the Camunda configuration at the bottom, which runs the Orchestration Cluster and Connectors. A legend explains that an arrow means a layer passes its outputs to the next layer as variables.](./img/layered-deployment-layers.svg)

| Layer             | What it owns                                                           | Takes from               | Produces                                                                       |
| ----------------- | ---------------------------------------------------------------------- | ------------------------ | ------------------------------------------------------------------------------ |
| Network           | The VPC and its subnets, or a VPC that you bring and the layer checks  | Nothing, or your VPC IDs | `vpc_id`, `vpc_cidr`, `private_subnet_ids`, `public_subnet_ids`                |
| Compute           | The ECS cluster, the task execution role, security groups, secrets key | Network                  | `ecs_cluster_id`, `task_execution_role_arn`, `camunda_ports_security_group_id` |
| Secondary storage | Aurora PostgreSQL for the Orchestration Cluster                        | Network, compute         | `secondary_storage` connection settings, database access policies              |
| Object storage    | One backup bucket, and one node ID lease bucket for each zone          | Nothing                  | Bucket names, access policies                                                  |
| Exposure          | Load balancers, optional TLS                                           | Network, compute         | Listener ARNs, `public_base_url`                                               |
| Identity          | Built-in users, or your OIDC provider                                  | Compute, exposure        | An `oidc` object, or `null` for built-in users                                 |
| Camunda           | The Orchestration Cluster and Connectors                               | Every layer above        | Service Connect names, log group                                               |

## Decide in this order

Each decision has its own page. The order follows what constrains what: the cloud limits the network, the network limits the compute, and so on.

| Decision              | Question it answers                                                          | Page                                                              |
| --------------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Cloud provider        | Which cloud, and which reference architectures exist for it?                 | [Choose a cloud provider](./cloud-provider.md)                    |
| Network               | New VPC or an existing one? One region or more? Peering or transit gateway?  | [Bring your own VPC](./network-bring-your-own-vpc.md)             |
| Compute               | Kubernetes or Amazon ECS?                                                    | [Amazon EKS or Amazon ECS](./compute-eks-vs-ecs.md)               |
| Secondary storage     | Relational database, or Elasticsearch and OpenSearch?                        | [Choose and create the secondary storage](./secondary-storage.md) |
| Object storage        | How many buckets do you need, and why?                                       | [Decide how many S3 buckets you need](./object-storage.md)        |
| Exposure              | How do users and clients reach the cluster, and where does TLS end?          | [Expose the cluster](./exposure.md)                               |
| Identity              | Built-in users or an OIDC provider?                                          | [Choose how users and clients sign in](./identity.md)             |
| OIDC provider         | Do you need an OIDC provider on ECS for Management Identity and Camunda Hub? | [Deploy an OIDC provider](./oidc-provider.md)                     |
| Management Identity   | Does your deployment need Management Identity and its database?              | [Deploy Management Identity](./management-identity.md)            |
| Camunda Hub           | One Hub for several Orchestration Clusters, and how it connects to them?     | [Deploy Camunda Hub](./camunda-hub.md)                            |
| Camunda configuration | How many brokers, which zones, which replication factor?                     | [Configure the Orchestration Cluster](./camunda-configuration.md) |

## Grow the deployment

After the deployment runs, you can grow it without rebuilding it. These pages describe only what changes.

| Step                         | Page                                                                |
| ---------------------------- | ------------------------------------------------------------------- |
| One region to two regions    | [Grow from one region to two](./evolve-single-to-dual-region.md)    |
| Two regions to three regions | [Grow from two regions to three](./evolve-dual-to-three-regions.md) |

Growing relies on two choices that you make on day one: zone-aware brokers, and an internal load balancer for broker traffic. Both are covered in the pages above.
