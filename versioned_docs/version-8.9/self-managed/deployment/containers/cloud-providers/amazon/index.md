---
id: index
title: "Amazon ECS"
description: "Run the Camunda 8 Orchestration Cluster and Connectors in Amazon Elastic Container Service."
---

import AoGrid from "@site/docs/components/react-components/\_ao-card.js";
import ConfigIcon from "@site/docs/components/assets/icon-config.png";
import ReferenceIcon from "@site/docs/components/assets/icon-reference-api.png";

Deploy the Camunda 8 Orchestration Cluster and Connectors to Amazon Elastic Container Service (ECS) to benefit from containerization without having to manage Kubernetes infrastructure.

## Get started

Get started with Amazon ECS and Fargate:

<p><a href="./aws-ecs" class="link-arrow">Deploy the Orchestration Cluster to Amazon ECS</a></p>

## Learn the fundamentals

This deployment targets a single AWS Region with multiple Availability Zones, running the Orchestration Cluster and Connectors on Amazon ECS with Fargate.

Other dependencies include:

- [Amazon EFS](https://aws.amazon.com/efs/) as primary storage
- [Aurora PostgreSQL](https://aws.amazon.com/rds/aurora/) as secondary storage
- [Amazon S3](https://aws.amazon.com/s3/) for node ID metadata and backups

For more implementation details, read the [Architecture](./aws-ecs#architecture) section of our deployment guide.

## Dynamic node ID provider

Camunda 8 is designed for Kubernetes StatefulSet deployments where each broker manages data on dedicated disk storage. Amazon ECS presents a challenge, as tasks are stateless by design and typically rely on external databases for state management.

To deploy Camunda 8 to Amazon ECS, we introduce a dynamic node ID provider service backed by Amazon S3. This service enables each ECS task to assume the role of a Camunda 8 broker and safely manage the corresponding data in a dedicated directory on a shared EFS disk.

The node ID provider operates using a lease mechanism stored in Amazon S3. A task acquires a broker role when it obtains the lease for a specific node ID. If the lease cannot be renewed, the task shuts down immediately to maintain data integrity.

## Amazon ECS vs. Amazon EKS

If you're already invested in Kubernetes tooling and patterns and you want to remain in that environment, Amazon EKS might be a better option for you. More reasons to consider deploying to Amazon EKS over Amazon ECS include:

- **Multi-region support:** When deploying to Amazon ECS, the only supported and tested pattern is a single AWS Region with multiple Availability Zones (multi‑AZ). All core pieces of the Orchestration Cluster are expected to live in one region.
- **Performance:** The Amazon ECS with Fargate deployment uses Amazon EFS as primary storage. This may result in higher costs and lower performance than a Kubernetes setup with block storage.
- **Scaling:** The autoscaling feature of ECS is not currently supported.

Check out our [Amazon EKS deployment guide](../../../helm/cloud-providers/amazon/amazon-eks/amazon-eks.md) if a Kubernetes environment better suits your needs.

## Explore further resources

<AoGrid ao={
[
{
link: "../../../../components/orchestration-cluster/core-settings/configuration/properties#camundaclusternode-id-provider",
title: "Configure the Node ID provider",
image: ConfigIcon,
description: "Configuration reference for the Node ID provider.",
},
{
link: "https://github.com/camunda/camunda-deployment-references/tree/stable/8.9/aws/containers/ecs-single-region-fargate",
title: "Reference architecture",
image: ReferenceIcon,
description: "The ECS single-region (Fargate) reference architecture.",
},
]
} columns={2}/>
