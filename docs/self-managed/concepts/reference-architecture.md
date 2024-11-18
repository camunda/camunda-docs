---
id: reference-architecture
title: "Reference Architecture"
description: "Learn about the self-managed reference architectures and how they can help you get started."
---

## Target User

- **Enterprise Architects**: To design and plan the overall system structure.
- **Developers**: To understand the components and their interactions.
- **IT Managers**: To ensure the system meets business requirements and is maintainable.

Reference architectures help these users by providing:

- **Best Practices**: Proven methods and techniques for system design.
- **Consistency**: Standardized approaches that ensure uniformity across projects.
- **Efficiency**: Accelerated development by reusing established patterns.
- **Risk Reduction**: Mitigation of common pitfalls through well-documented guidelines.

## Preface

Reference architectures provide a blueprint for system design and implementation, offering a standardized approach to solving common problems. They serve as a guide for enterprise architects, developers, and IT professionals to build robust and scalable systems. By following a reference architecture, organizations can ensure consistency, reduce risks, and accelerate the development process.

## Customization and Flexibility

It's important to note that reference architectures are not a one-size-fits-all solution. Each organization has unique requirements and constraints that may necessitate modifications to the provided blueprints. While these reference architectures offer a solid foundation and best practices, they should be adapted to fit the specific needs of your project. Use them as a starting point to start your development process, but be prepared to make adjustments to ensure they align with your goals and infrastructure.

## Support Considerations

We recognize that deviations from the reference architecture are unavoidable. However, such changes will introduce additional complexity, making troubleshooting more difficult. When modifications are required, ensure they are well-documented to facilitate future maintenance and support more quickly.

## Use Cases

### Kubernetes

Kubernetes is a powerful orchestration platform for containerized applications. Using a reference architecture for Kubernetes can help organizations deploy and manage their applications more effectively. It provides guidelines for setting up clusters, managing workloads, and ensuring high availability and scalability. This approach is ideal for organizations looking to leverage the benefits of containerization and self-healing capabilities.

### Manual (Bare Metal / VMs)

For organizations that prefer traditional infrastructure, reference architectures for bare metal or virtual machines (VMs) offer a structured approach to system deployment. These architectures provide best practices for setting up physical servers or VMs, configuring networks, and managing storage. They are suitable for environments where control, and security are critical, and where containerization may not be feasible or necessary.

## Helping Customers Decide

Choosing the right reference architecture depends on various factors such as the organization's goals, existing infrastructure, and specific requirements. Here are some guidelines to help you decide:

- **Kubernetes**:
  - Ideal for organizations adopting containerization and microservices.
  - Suitable for dynamic scaling and high availability.
  - Best for teams with experience in managing containerized environments.
  - A steeper learning curve and continuous platform investment.

For more information and guides, have a look at the specific reference for [Kubernetes](#TODO).

- **Manual (Bare Metal / VMs)**:
  - Suitable for organizations requiring control.
  - Ideal for environments where security and compliance are critical.
  - Best for teams with expertise in managing physical servers or virtual machines.

For more information and guides, have a look at the specific reference for [Manual](#TODO).
