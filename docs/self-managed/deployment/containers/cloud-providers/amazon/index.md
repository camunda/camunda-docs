---
id: index
title: "Amazon ECS"
description: "Run the Camunda 8 Orchestration Cluster and Connectors in Amazon Elastic Container Service."
---

import AoGrid from "@site/docs/components/react-components/\_ao-card.js";
import ConfigIcon from "@site/docs/components/assets/icon-config.png";
import ReferenceIcon from "@site/docs/components/assets/icon-reference-api.png";

Run the Camunda 8 Orchestration Cluster and Connectors in Amazon Elastic Container Service (ECS).

## About

In an environment like Amazon ECS, where brokers can restart anywhere and multiple tasks write to shared volumes, you need to trust that your data is safe and managed properly. Camunda 8 is production-tested to run in Amazon ECS, including Fargate. This includes checks and guidance to prevent silent data corruption and unsafe configurations.

## Get Started

Get started with Amazon ECS and Fargate.

<p><a href="./aws-ecs" class="link-arrow">Deploy the Orchestration Cluster to Amazon ECS</a></p>

## Learn the fundamentals

When you deploy the Camunda 8 Orchestration Cluster, you can be confident in its:

- **Simplicity:** You don't need to adopt Kubernetes via Amazon EKS and its complexities.
- **Safety:** Trust that Camunda 8 on ECS won't corrupt data under supported configurations, so you can meet compliance and SLA requirements.
- **Observability:** You can monitor broker health to ensure cluster stability in ECS's dynamic environment.
- **Cluster membership handling:** This deployment handles broker restarts and ECS task scheduling to ensure your cluster is stable.
- **Resource management:** The Orchestration Cluster includes a dynamic node ID provider based in Amazon S3. This assigns a node ID to the broker on startup and ensures there are no two brokers running with the same ID.

This deployment targets a single AWS Region with multiple Availability Zones, running the Orchestration Cluster and Connectors on Amazon ECS with Fargate.

Other dependencies include:

- Amazon EFS as primary storage.
- Aurora PostgreSQL as secondary storage.
- Amazon S3 for node ID metadata and backups.

For more implementation details, read the [Architecture](./aws-ecs#architecture) section of our deployment guide.

## Amazon ECS vs. Amazon EKS

If you're already invested in Kubernetes tooling and patterns and you want to remain in that environment, Amazon EKS might be a better option for you. More reasons to consider deploying to Amazon EKS over Amazon ECS include:

- **Multi-region support:** When deploying to Amazon ECS, the only supported and tested pattern is a single AWS Region with multiple Availability Zones (multi‑AZ). All core pieces of the Orchestration Cluster are expected to live in one region.
- **Performance:** The Amazon ECS with Fargate deployment uses Amazon EFS as primary storage. This may result in higher costs and lower performance than a Kubernetes setup with block storage.
- **Scalability:** Scaling in the Amazon ECS environment is a manual process that requires invoking the [cluster scaling API](../../../../components/orchestration-cluster/zeebe/operations/cluster-scaling.md).

Check out our [Amazon EKS deployment guide](../../../helm/cloud-providers/amazon/amazon-eks/amazon-eks.md) if a Kubernetes environment better suits your needs.

## Explore further resources

<AoGrid ao={
[
{
link: "../../../../components/orchestration-cluster/core-settings/configuration/properties#camundaclusternode-id-provider",
title: "Configure the Node ID provider",
image: ConfigIcon,
description: "A reference for Node ID provider configurations.",
},
{
link: "https://github.com/camunda/camunda-deployment-references/tree/main/aws/containers/ecs-single-region-fargate",
title: "Reference architecture",
image: ReferenceIcon,
description: "The ECS single-region (Fargate) reference architecture.",
},
]
} columns={3}/>
