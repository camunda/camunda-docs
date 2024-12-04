---
id: reference-architecture
title: "Reference Architecture Overview"
sidebar_label: "Overview"
description: "Learn about the self-managed reference architectures and how they can help you get started."
---

Reference architectures provide a comprehensive blueprint for designing and implementing scalable, robust, and adaptable systems. Our reference architectures are published here, and they offer guidance to help enterprise architects, developers, and IT managers streamline deployments and improve system reliability.

## Target User

- **Enterprise Architects**: To design and plan the overall system structure.
- **Developers**: To understand the components and their interactions.
- **IT Managers**: To ensure the system meets business requirements and is maintainable.

Key Benefits:

- **Accelerated Deployment**: Predefined best practices and guidelines simplify the deployment process, reducing the time and effort required to set up a reliable workflow automation solution.
- **Consistency**: Ensures consistency across deployments by standardizing system components and their configurations, which helps reduce the risk of errors and simplifies maintenance.
- **Enhanced Security**: Reference architectures incorporate best practices for securing Camunda 8 deployments, ensuring that sensitive data and processes are protected through standard security measures like encryption, authentication, and access controls.

## Customization and Flexibility

It's important to note that reference architectures are not a one-size-fits-all solution. Each organization has unique requirements and constraints that may necessitate modifications to the provided blueprints. While these reference architectures offer a solid foundation and best practices, they should be adapted to fit the specific needs of your project. Use them as a starting point to start your Camunda 8 implementation process, but be prepared to make adjustments to ensure they align with your goals and infrastructure.

## Support Considerations

We recognize that deviations from the reference architecture are unavoidable. However, such changes will introduce additional complexity, making troubleshooting more difficult. When modifications are required, ensure they are well-documented to facilitate future maintenance and support more quickly. Camunda publishes [supported environments](/docs/reference/supported-environments/) information to help you navigate supported configurations.

## Architecture

<!-- TODO: include overview, Hamza had good pictures on this topic -->

![Camunda Architecture](./img/placeholder.png)

### Orchestration Cluster vs Web Modeler and Console

When designing a reference architecture, it's essential to understand the differences between an orchestration cluster and Web Modeler and Console self-managed. These components play crucial roles in the deployment and operation of processes, but they serve different purposes and include distinct components.

#### Orchestration Cluster

We refer to the orchestration or automation cluster to the core of Camunda.

The included components are:

- [Zeebe](/components/zeebe/zeebe-overview.md): A workflow engine for orchestrating microservices and managing stateful, long-running business processes.
- [Operate](/components/operate/operate-introduction.md): A monitoring tool for visualizing and troubleshooting workflows running in Zeebe.
- [Tasklist](/components/tasklist/introduction-to-tasklist.md): A user interface for managing and completing human tasks within workflows.
- [Optimize](#TODO): An analytics tool for generating reports and insights based on workflow data.
- [Identity](/self-managed/identity/what-is-identity.md): A service for managing user authentication and authorization.
- [Connectors](/components/connectors/introduction.md): Pre-built integrations for connecting Zeebe with external systems and services.

The orchestration cluster is central to Camunda's workflow automation, which focuses on managing and executing processes through interconnected components. Each component within the orchestration cluster is part of an integrated system that works together to provide end-to-end process orchestration. Zeebe handles workflow execution, while Operate provides monitoring, and other components such as Tasklist and Optimize add functionality like human task management and analytics. These components form a unified cluster that is tightly integrated to ensure seamless communication and data flow. This design ensures that all components are in sync, working collectively to maintain consistent state management, data integrity, and smooth process orchestration across the entire cluster. This architecture ensures reliable process execution with clear boundaries between each workflow engine's operation.

#### Web Modeler and Console

The Web Modeler and Console are designed to oversee and manage multiple orchestration clusters. It offers tools and interfaces for administrators and developers to monitor clusters and create BPMN models. The management cluster operates independently from the orchestration cluster and can function without requiring an orchestration cluster.

- [Console](/components/console/introduction-to-console.md): A central management interface for monitoring and managing multiple orchestration clusters.
- [Web Modeler](/docs/self-managed/modeler/web-modeler/installation.md): A web-based tool for designing and deploying workflow models to any available orchestration cluster.
- [Identity](/self-managed/identity/what-is-identity.md): A service for managing user authentication and authorization.

:::note
The orchestration cluster has its own integrated Identity component, while Web Modeler and Console run separate and dedicated Identity deployment. For production environments, using an external identity provider is recommended.
:::

### Databases

Databases can be deployed as part of the Camunda clusters, but using externally managed database services offers several advantages:

- **Flexibility**: Allows you to choose the database technology that best fits your needs and existing infrastructure while choosing one of the [supported environments](/reference/supported-environments.md#component-requirements).
- **Scalability**: External databases can be scaled independently of the Camunda components, providing better performance and resource management.
- **Maintenance**: Simplifies the maintenance and upgrade processes, as database management can be handled separately.
- **Compliance**: Ensures that you can adhere to specific data governance and compliance requirements.

While some guides go into detail on how to deploy databases together with Camunda, the recommendation is to maintain this outside of Camunda.

By decoupling databases from Camunda, you gain greater control and customization over your data storage and management strategies.

### High Availability (HA)

High availability (HA) ensures that a system remains operational and accessible even in the event of component failures. Generally all components are equipped to be run in a highly available manner. Some components do need extra considerations when run in HA mode.

<!-- TODO Describe Optimize and Connectors limitations or point to resource for more -->

While high availability is one part of the increased fault tolerance and resilience, you should also consider regional or zonal placement of your workloads.

If you run infrastructure on cloud providers, you are often met with different regions and zones. For ideal high availability you should consider a minimum setup of 3 zones within a region as this will guarantee that in case of a zonal failure that the remaining two workloads can still process data. For more information on how Zeebe handles fault tolerance, have a look at the [raft consensus chapter](/components/zeebe/technical-concepts/clustering.md#raft-consensus-and-replication-protocol).

If running a single instance is preferred, make sure to implement [regular backups](/self-managed/operational-guides/backup-restore/backup-and-restore.md) since resilience will be limited.

## Camunda 8 Deployment Reference architectures

### Kubernetes

Kubernetes is a powerful orchestration platform for containerized applications. Using a reference architecture for Kubernetes can help organizations deploy and manage their applications more effectively. It provides guidelines for setting up clusters, managing workloads, and ensuring high availability and scalability. This approach is ideal for organizations looking to leverage the benefits of containerization and self-healing capabilities.

<!-- TODO add link or card for AWS ref arch -->

### Manual (Bare Metal / VMs)

For organizations that prefer traditional infrastructure, reference architectures for bare metal or virtual machines (VMs) offer a structured approach to system deployment. These architectures provide best practices for setting up physical servers or VMs, configuring networks, and managing storage using Infrastructure as Service cloud roviders. They are suitable for environments where containerization or use of Kubernetes services may not be feasible.

<!-- TODO add link or card for AWS EC2 -->

### Local Development

While both options are suitable for trying out Camunda 8 locally, you might also consider exploring [Camunda 8 Run](/self-managed/setup/deploy/local/c8run.md) for a developer focused experience.

## Helping Customers Decide

Choosing the right reference architecture depends on various factors such as the organization's goals, existing infrastructure, and specific requirements. Here are some guidelines to help you decide:

- **Kubernetes**:
  - Ideal for organizations adopting containerization and microservices, see [Cloud Native computing foundation](https://www.cncf.io/).
  - Suitable for dynamic scaling and high availability.
  - Best for teams with experience in managing containerized environments.
  - A steeper learning curve but offers scalable and highly resilient platform.

For more information and guides, have a look at the specific reference for [Kubernetes](#TODO).

- **Manual (Bare Metal / VMs)**:
  - Suitable for organizations requiring use of IaaS, bare metal and other traditional infrastructures.
  - Ideal for traditional setups needing highly customized security, strict data residency, or industry-specific regulatory compliance.
  - Applicable for high availability but requires more detailed planning.
  - Best for teams with expertise in managing physical servers or virtual machines.

For more information and guides, have a look at the specific reference for [Manual](./manual/manual-overview).
