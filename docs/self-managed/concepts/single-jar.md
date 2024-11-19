---
id: single-jar
title: "Single JAR"
description: "Learn about the self-managed single JAR"
---

<!-- Could also be called manual? -->

<!-- Moving target, may be renamed, different focus, etc. -->

<!-- Day 1 vs Day 2 operations? -->
<!-- Installation vs Operations -->

## Preface

The Single JAR deployment option allows you to run Camunda Platform as a standalone Java application. This method is particularly suited for users who prefer manual deployment on bare metal servers or virtual machines (VMs). It provides full control over the environment and configuration, making it ideal for scenarios where custom setups or specific infrastructure requirements are necessary.

With the Single JAR approach, all necessary components are bundled into a single executable JAR file. This simplifies the deployment process, as you only need to manage one artifact. However, it also means that you are responsible for handling all aspects of the deployment, including installation, configuration, scaling, and maintenance.

Other deployment options, such as containerized deployments or managed services, might offer more convenience and automation. However, the Single JAR method gives you the flexibility to tailor the deployment to your exact needs, which can be beneficial for complex or highly customized environments.

We will later go into the details but be aware that not everything is part of this Single JAR. Have a look at the documentation on the orchestration and management cluster separation. <!-- TODO: add a link reference to whenever they add documentation on this  -->

## Before You Start

Before you begin with the self-managed single JAR setup, please consider the complexity and operational overhead involved. Self-managing your deployment requires a good understanding of infrastructure, networking, and application management. If you are looking for a simpler and more managed solution, you might want to explore [our SaaS offerings](https://camunda.com/platform/) first. SaaS can significantly reduce the burden of maintenance and allow you to focus more on your core business needs.

## Limitations

- The focus is on the orchestration cluster, including Connectors, Identity, Operate, Optimize, Tasklist, and Zeebe.

## Target User

<!-- Maybe talk about target users, e.g. facing more mid-size companies for a more sophisticated solution Kubernetes -->

## Architecture

<!--
HA and non HA could be a thing to talk about
see -->

### Components

<!-- Components and how they interact, could be just a subpart of the Architecture -->

## Requirements

### Infrastructure

<!-- Compute, Networking, Storage, Security, Monitoring / Logging? -->
<!-- not sure I would add monitoring here, generally could be referred to how it's done generally Prometheus or within their reference examples -->

### Application

<!-- Java -->

## Deployment Model

<!--
Deployment Topology
Describe whether the architecture is single-region, multi-region, or hybrid.
Configuration Guidelines
Best practices for configuring the environment for optimal performance and reliability.
Automation and CI/CD Pipelines
Suggested tooling and workflows for automated deployments and updates.
-->

## Scalability and Performance Considerations

<!--
Maybe we have some information on this in the docs

Scalability Patterns
Recommended patterns for scaling compute, storage, and networking resources.
Load Balancing and Caching
Best practices for distributing traffic and caching data to enhance performance.
Performance Optimization Tips
Tips for optimizing performance across different components.
-->

## Differentiation to other installation options

## Configuration

## Sizing Guidelines

## Upgrades

<!-- zero-downtime? -->

## Reference implementations

<!-- Designed and tested for standard setups with the x1 sizing in mind -->

- AWS EC2
