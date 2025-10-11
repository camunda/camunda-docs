---
id: access-control-overview
title: Identity and access management in Camunda 8
sidebar_label: Identity and access management
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

Use Identity access control to provide secure access for authorized users and systems in Camunda 8.

## Identity types in Camunda 8

There are two types of Identity in Camunda 8.

<table className="table-callout">
<tr>
    <td width="30%">**Orchestration Cluster Identity**</td>
    <td><p>Used for authenticating and authorizing users and systems that interact with the Orchestration Cluster (such as Zeebe, Operate, Tasklist, and the Orchestration Cluster REST API).</p><p>Identity governs access to process execution, task management, and related runtime resources.</p></td>
</tr>
<tr style={{ backgroundColor: 'var(--ifm-table-background)'}}>
    <td width="30%">**Management Identity**</td>
    <td><p>Used for managing the components Web Modeler, Console, and Optimize.</p><p>Management Identity is typically required for platform administrators and developers, and is separate from the Identities used for process orchestration.</p></td>
</tr>
</table>

:::tip
Understanding which Identity is required for a given action helps you apply the correct access control policies.
:::

## Identity provider (IdP) integration

In a typical production setup, both the Orchestration Cluster Identity and the Management Identity are integrated with an external OIDC IdP (such as Entra ID). This approach enables unified user management, single sign-on (SSO), and consistent security policies across all Camunda components.

| Identity type                  | Description                                                                                                                                                                                                                                                                                                                                                                    | Default IdP              | External IdP support                                                       |
| :----------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------- | :------------------------------------------------------------------------- |
| Orchestration Cluster Identity | <p>Provides built-in user management, allowing you to manage users and groups directly within Camunda.</p><p>Supports integration with external identity providers (IdPs) via OpenID Connect (OIDC).</p><p>This allows you to connect Camunda to enterprise IdPs such as Microsoft Entra ID (Azure AD), Okta, and more for centralized authentication and user management.</p> | Built-in user management | OIDC integration with enterprise IdPs (Microsoft Entra ID, Okta, and more) |
| Management Identity            | <p>Uses Keycloak as the default IdP, but can also be configured to use an external IdP via OIDC.</p><p>This flexibility allows your organization to align Camunda's management interfaces with your existing identity and access management strategies.</p>                                                                                                                    | Keycloak                 | OIDC integration with external IdPs                                        |

## Authentication vs. authorization

The two fundamental concepts involved with access control in Camunda 8 are **authentication** and **authorization**.

### Authentication

Authentication is the process of verifying the Identity of a user or system.

It answers the question: **Who are you?**

For example, logging in with a username and password, or using single sign-on (SSO).

### Authorization

Authorization determines what an authenticated user or system is allowed to do.

It answers the question: **What are you allowed to do?**

For example, viewing process data, starting a process instance, or accessing the Operate application.

| Identity type                  | Authorization model              | Description                                                                                                          | Management interface                   |
| :----------------------------- | :------------------------------- | :------------------------------------------------------------------------------------------------------------------- | :------------------------------------- |
| Orchestration Cluster Identity | Fine-grained permission system   | Controls access to applications, APIs, and resources through specific permissions for each resource type and action. | Camunda Identity UI or API             |
| Management Identity            | Role-based access control (RBAC) | Uses predefined roles and permissions that can be assigned to users and groups.                                      | Keycloak admin console or external IdP |

## How authentication and authorization work together

1. **Authentication** is implemented first: The system checks your Identity.
2. **Authorization** comes after: The system checks your permissions for the requested action or resource.

A user must be both authenticated and authorized to access protected resources in Camunda 8.

:::info
To learn more about authorization and how to configure permissions, see [Orchestration Cluster authorization](./authorizations.md).
:::
