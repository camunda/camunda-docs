---
title: Access Control Concepts in Camunda 8
description: Understand the difference between authentication and authorization in Camunda 8, and how they work together to secure your orchestration cluster.
keywords:
  [
    camunda 8,
    access control,
    authentication,
    authorization,
    security,
    orchestration cluster,
  ]
---

# Access Control Concepts in Camunda 8

Access control in Camunda 8 ensures that only the right users and systems can access your orchestration cluster and perform permitted actions. Two fundamental concepts are involved: **authentication** and **authorization**.

## Identity Types in Camunda 8

Camunda 8 distinguishes between two types of identity:

- **Orchestration Cluster Identity**: Used for authenticating and authorizing users and systems that interact with the orchestration cluster (such as Zeebe, Operate, Tasklist, and the Orchestration Cluster APIs). This identity governs access to process execution, task management, and related runtime resources.
- **Management Identity**: Used for managing the components Web Modeler, Console and Optimize. This identity is typically required for platform administrators and developers and is separate from the identities used for process orchestration.

Understanding which identity is required for a given action helps ensure the correct access control policies are applied.

### Identity Providers and Integration

The **Orchestration Cluster** provides built-in user management, allowing you to manage users and groups directly within Camunda. Additionally, it supports integration with your own external Identity Provider (IdP) via OpenID Connect (OIDC). This means you can connect Camunda to enterprise IdPs such as Microsoft EntraID (Azure AD), Okta, or others for centralized authentication and user management.

The **Management Identity** uses Keycloak as the default IdP, but it can also be configured to use an external IdP via OIDC. This flexibility allows organizations to align Camunda's management interfaces with their existing identity and access management strategies.

In a typical production setup, both the orchestration cluster identity and the management identity are integrated with an external OIDC IdP (such as EntraID). This approach ensures unified user management, single sign-on, and consistent security policies across all Camunda components.

## Authentication vs Authorization

### Authentication

Authentication is the process of verifying the identity of a user or system. It answers the question: **Who are you?**

- Examples: Logging in with a username and password or using Single Sign-On (SSO).

### Authorization

Authorization determines what an authenticated user or system is allowed to do. It answers the question: **What are you allowed to do?**

- Examples: Viewing process data, starting a process instance, or accessing the Operate application.

- In the Orchestration Cluster, authorization is managed through a fine-grained permission system that controls access to applications, APIs, and resources.
- In the Management Identity, authorization is managed via RBAC (Role-Based Access Control) and can be configured through the Keycloak admin console or an external IdP.

## How They Work Together

1. **Authentication** comes first: The system checks your identity.
2. **Authorization** comes next: The system checks your permissions for the requested action or resource.

A user must be both authenticated and authorized to access protected resources in Camunda 8.

## Learn More

- For a detailed explanation of the authorization system and how to configure permissions, see the [Authorization in Camunda 8 Orchestration Cluster](./authorizations.md) page.
