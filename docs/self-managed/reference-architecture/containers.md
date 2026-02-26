---
id: containers
title: "Containers deployment overview"
sidebar_label: "Containers"
description: "Camunda 8 container deployment reference architecture home."
---

This reference architecture provides guidance for deploying Camunda 8 Self-Managed with containers. This deployment method is ideal for users who want a portable, consistent runtime and the benefits of containerization without the overhead of managing Kubernetes.

## Key features

- **Environment isolation:** Each container runs in its own, isolated environment. This helps prevent conflicts between applications and improves security.
- **Scalability:** Containers can be easily scaled up or down to handle varying workloads. This provides flexibility in resource management.

## Reference implementations

This section includes the following reference deployment architectures:

- [Amazon ECS](../deployment/containers/cloud-providers/amazon/aws-ecs.md): A fully-functioning Camunda Orchestration Cluster deployed in a high-availability setup, using Amazon Elastic Container Service (ECS), Fargate, and a managed Aurora PostgreSQL instance.

## Amazon ECS Architecture

The architecture outlined below describes a standard Zeebe three-node deployment, distributed across three [availability zones](https://aws.amazon.com/about-aws/global-infrastructure/regions_az/) within a single AWS region. It includes a managed Aurora PostgreSQL instance deployed under the same conditions. This approach ensures high availability and redundancy in case of a zone failure.

_Infrastructure diagram for the Orchestration Cluster ECS architecture (click the image to view the PDF version)_

[![Architecture Overview](../deployment/containers/cloud-providers/amazon/assets/architecture.jpg)](../deployment/containers/cloud-providers/amazon/assets/architecture.pdf)

Read more about this reference architecture in [Amazon ECS on AWS](../deployment/containers/cloud-providers/amazon/aws-ecs.md#architecture).
