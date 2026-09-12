---
id: containers
title: "Container deployment overview"
sidebar_label: "Containers"
description: "Overview of the Camunda 8 container deployment reference architecture."
---

With container-based deployments, you can run the [Camunda 8 Orchestration Cluster](./reference-architecture.md#orchestration-cluster-vs-web-modeler-and-console) in a portable, consistent runtime with the benefits of containerization, without managing Kubernetes.

The following container deployment options are currently available:

- **[Amazon ECS with Fargate (single region)](/self-managed/deployment/containers/cloud-providers/amazon/aws-ecs.md)**: Deploy to Amazon ECS with Fargate and Aurora PostgreSQL in a single AWS region.
- **[Amazon ECS with Fargate (dual region)](/self-managed/deployment/containers/cloud-providers/amazon/aws-ecs-dual-region.md)**: Active-active across two AWS regions, backed by Aurora Global Database. Experimental reference architecture.
