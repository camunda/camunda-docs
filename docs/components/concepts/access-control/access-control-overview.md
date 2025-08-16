---
title: Access control concepts in Camunda 8
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

Access control in Camunda 8 ensures that only authorized users and systems can access your orchestration cluster and perform permitted actions. Two fundamental concepts are involved: **authentication** and **authorization**.

## Identity types in Camunda 8

Camunda 8 distinguishes between two types of Identity:

- **Orchestration Cluster Identity**: Used for authenticating and authorizing users and systems that interact with the Orchestration Cluster (such as Zeebe, Operate, Tasklist, and the Orchestration Cluster REST API). This Identity governs access to process execution, task management, and related runtime resources.
- **Management Identity**: Used for managing the components Web Modeler, Console, and Optimize. This Identity is typically required for platform administrators and developers, and it is separate from the Identities used for process orchestration.

Understanding which Identity is required for a given action helps ensure the correct access control policies are applied.

### Identity providers and integration

The **Orchestration Cluster Identity** provides built-in user management, allowing you to manage users and groups directly within Camunda. It also supports integration with external identity providers (IdPs) via OpenID Connect (OIDC). This allows you to connect Camunda to enterprise IdPs such as Microsoft Entra ID (Azure AD), Okta, or others for centralized authentication and user management.

The **Management Identity** uses Keycloak as the default IdP, but it can also be configured to use an external IdP via OIDC. This flexibility allows organizations to align Camunda's management interfaces with their existing identity and access management strategies.

In a typical production setup, both the Orchestration Cluster Identity and the Management Identity are integrated with an external OIDC IdP (such as Entra ID). This approach enables unified user management, single sign-on (SSO), and consistent security policies across all Camunda components.

## Authentication vs. authorization

### Authentication

Authentication is the process of verifying the Identity of a user or system. It answers the question: **Who are you?**

- Examples: Logging in with a username and password, or using single sign-on (SSO).

### Authorization

Authorization determines what an authenticated user or system is allowed to do. It answers the question: **What are you allowed to do?**

- Examples: Viewing process data, starting a process instance, or accessing the Operate application.
- In the Orchestration Cluster Identity, authorization is managed through a fine-grained permission system that controls access to applications, APIs, and resources.
- In the Management Identity, authorization is managed via role-based access control (RBAC) and can be configured through the Keycloak admin console or an external IdP.

## How they work together

1. **Authentication** comes first: The system checks your Identity.
2. **Authorization** comes next: The system checks your permissions for the requested action or resource.

A user must be both authenticated and authorized to access protected resources in Camunda 8.

## Learn more

- For a detailed explanation of the authorization system and how to configure permissions, see [Authorization in Camunda 8 Orchestration Cluster](./authorizations.md).
