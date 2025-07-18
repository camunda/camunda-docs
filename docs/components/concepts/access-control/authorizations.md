---
title: Authorization in Camunda 8 Orchestration Cluster
description: Learn how to control access to applications and APIs in Camunda 8's orchestration cluster using the built-in authorization system.
keywords: [camunda 8, orchestration cluster, zeebe, operate, tasklist, authorization, access control, permissions]
---

# Authorization in Camunda 8 Orchestration Cluster

## Overview

Camunda 8 Orchestration Cluster provides a fine-grained authorization system for controlling access to applications and APIs in the **Orchestration Cluster**. The system applies to:

- **Zeebe**
- **Operate**
- **Tasklist**
- **Orchestration Cluster APIs (e.g., V2 API)**

:::note
Authorization applies only to these orchestration components — it does not apply to other Camunda services (e.g., Web Modeler, Optimize).
:::

## Core Concepts

### Authorization Model

- Works with the **principle of least privilege**
- Can be enabled/disabled in both SaaS and Self-Managed environments
- When disabled: all users and clients have full access
- When enabled: no access by default - explicit authorization required
- No concept of deny rules - absence of permission equals no access
- Access is enforced in both web applications and API requests

### Key Components

1. **Authorizations**
   - Assign permissions to identities for specific resources
   - Example: User 'jonny' is authorized to create new users
   - Example: Group 'marketing' is authorized to delete the Group 'sales'

2. **Owners**
   - Types: users, groups, roles, and mapping rules
   - Authorizations can be assigned to any owner type

3. **Permissions**
   - Define allowed interactions with resources
   - Specific to resource types

4. **Resources**
   - Entities users interact with
   - Each has specific available permissions

## Configuration

### SaaS Configuration
Authorizations can be activated/deactivated on a per-cluster level by:
- Organization Admins
- Organization Owners

### Self-Managed Configuration

Enable authorizations in your deployment using:

```yaml
camunda.security.authorizations.enabled: true
```

## Resources and Permissions

### Available Resources

The following table lists all resources that support authorization in Camunda 8 Orchestration Cluster, along with the available permissions per resource. This applies to Camunda 8 Orchestration Cluster (Zeebe, Operate, Tasklist, Orchestration Cluster APIs).

| Resource Type                        | Resource Key Example                                    | Supported Permissions                                                                                                      |
| ------------------------------------ | ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Application**                      | `Operate`, `Tasklist`, `Identity`, `*`                  | `ACCESS`                                                                                                                   |
| **Authorization**                    | `*`                                                     | `CREATE`, `READ`, `UPDATE`, `DELETE`                                                                                       |
| **Batch**                            | `*`                                                     | `CREATE`, `READ`, `DELETE`                                                                                                 |
| **Decision Definition**              | `*`, `decisionId: order_decision`                       | `CREATE_DECISION_INSTANCE`, `READ_DECISION_DEFINITION`, `READ_DECISION_INSTANCE`, `DELETE_DECISION_INSTANCE`               |
| **Decision Requirements Definition** | `*`, `decisionRequirementsDefinitionId: order_decision` | `CREATE`, `READ`, `UPDATE`                                                                                                 |
| **Group**                            | `*`, `groupId: accounting`                              | `CREATE`, `READ`, `UPDATE`, `DELETE`                                                                                       |
| **Mapping Rules**                    | `*`                                                     | `CREATE`, `READ`, `UPDATE`, `DELETE`                                                                                       |
| **Message**                          | `*`                                                     | `CREATE`, `READ`                                                                                                           |
| **Process Definition**               | `*`, `bpmnProcessId: order_process`                     | `CREATE_PROCESS_INSTANCE`, `READ_PROCESS_DEFINITION`, `READ_PROCESS_INSTANCE`, `READ_USER_TASK`, `UPDATE_PROCESS_INSTANCE` |
| **Resource**                         | `*`                                                     | `CREATE`, `DELETE_DRD`, `DELETE_FORM`, `DELETE_PROCESS`                                                                    |
| **Roles**                            | `*`                                                     | `CREATE`, `READ`, `UPDATE`, `DELETE`                                                                                       |
| **System**                           | `*`                                                     | `READ`, `UPDATE`                                                                                                           |
| **Tenants**                          | `*`, `tenantId:tenantA`                                 | `CREATE`, `READ`, `UPDATE`, `DELETE`                                                                                       |
| **Users**                            | `*`, `username: felix.mueller`                          | `CREATE`, `READ`, `UPDATE`, `DELETE`                                                                                       |

## Default Roles

Camunda provides predefined roles to simplify access management:

| Role Name       | Purpose                                                                         | Typical Authorizations                                                                                                                                            |
| --------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `admin`         | Full control over all orchestration resources and applications.                 | All permissions for all resources: `READ`, `CREATE`, `UPDATE`, `DELETE`, including `ACCESS` to all applications.                                                  |
| `readonlyadmin` | Audit-focused users who need read-only access across the orchestration cluster. | `READ` for all resources, including `READ_PROCESS_DEFINITION`, `READ_PROCESS_INSTANCE`, `READ_USER_TASK`, etc.                                                    |
| `connectors`    | Technical role for executing connector calls.                                   | - `READ_PROCESS_DEFINITION` on **Process Definition** (`*`) <br> - `UPDATE_PROCESS_INSTANCE` on **Process Definition** (`*`) <br> - `CREATE` on **Message** (`*`) |
| `rpa`           | Role for RPA workers.                                                           | - `READ` on **Resource** (`*`) <br> - `UPDATE_PROCESS_INSTANCE` on **Process Definition** (`*`)                                                                   |

### Role Assignment in SaaS

- **admin**: Automatically assigned to Organization Owner and Admin
- **connectors**: Automatically assigned to Connectors Runtime in Cluster deployment
- **readonlyadmin**: Automatically assigned to Camunda Support Agents for support cases

## Common Use Cases

### Application Access

Users need specific application permissions to access Orchestration Cluster components::

- **UI Access**: Resource Type `application` and Resource Key is one of the components Operate, Tasklist, Identity.
  - Example: `operate` for Operate access
  - Example: `tasklist` for Tasklist access
- Without these permissions, users cannot log in to the compoennts

### Resource Access

Within applications, users need additional permissions for specific resources, e.g.:

- **Process Related**
  - `READ_PROCESS_DEFINITION` to view process models
  - `CREATE_PROCESS_INSTANCE` to start new processes
  - `UPDATE_PROCESS_INSTANCE` to modify running instances
- **Decision Related**
  - `READ_DECISION_DEFINITION` to view DMN models
  - `CREATE_DECISION_INSTANCE` to execute decisions

### API Access

When implementing your own integrations by e.g. using a Camunda Client, you should consider the following:

- **Job Workers**
  - `UPDATE_PROCESS_INSTANCE` to complete jobs for the specific process definitions

