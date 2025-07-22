---
title: Authorization in Camunda 8 Orchestration Cluster
description: Learn how to control access to applications and APIs in Camunda 8's orchestration cluster using the built-in authorization system.
keywords:
  [
    camunda 8,
    orchestration cluster,
    zeebe,
    operate,
    tasklist,
    authorization,
    access control,
    permissions,
  ]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

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

<Tabs>
  <TabItem value="yaml" label="application.yaml" default>
```yaml
camunda.security.authorizations.enabled: true
```
  </TabItem>
  <TabItem value="env" label="Environment variables">
```yaml
CAMUNDA_SECURITY_AUTHORIZATIONS_ENABLED=true
```
  </TabItem>
  <TabItem value="helm" label="Helm values">
```yaml
global.security.authorizations.enabled=true
```
  </TabItem>
</Tabs>

## Resources and Permissions

### Available Resources

The following table lists all resources that support authorization in Camunda 8 Orchestration Cluster, along with the available permissions per resource. This applies to Camunda 8 Orchestration Cluster (Zeebe, Operate, Tasklist, Orchestration Cluster APIs).

| Resource Type                        | Resource Key Example                                    | Supported Permissions                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ------------------------------------ | ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Application**                      | `Operate`, `Tasklist`, `Identity`, `*`                  | `ACCESS`                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **Authorization**                    | `*`                                                     | `CREATE`, `READ`, `UPDATE`, `DELETE`                                                                                                                                                                                                                                                                                                                                                                                                      |
| **Batch**                            | `*`                                                     | `CREATE`, `CREATE_BATCH_OPERATION_CANCEL_PROCESS_INSTANCE`, `CREATE_BATCH_OPERATION_DELETE_PROCESS_INSTANCE`, `CREATE_BATCH_OPERATION_MIGRATE_PROCESS_INSTANCE`, `CREATE_BATCH_OPERATION_MODIFY_PROCESS_INSTANCE`, `CREATE_BATCH_OPERATION_RESOLVE_INCIDENT`, `CREATE_BATCH_OPERATION_DELETE_DECISION_INSTANCE`, `CREATE_BATCH_OPERATION_DELETE_DECISION_DEFINITION`, `CREATE_BATCH_OPERATION_DELETE_PROCESS_DEFINITION`, `READ` `UPDATE` |
| **Decision Definition**              | `*`, `decisionId: order_decision`                       | `CREATE_DECISION_INSTANCE`, `READ_DECISION_DEFINITION`, `READ_DECISION_INSTANCE`, `DELETE_DECISION_INSTANCE`                                                                                                                                                                                                                                                                                                                              |
| **Decision Requirements Definition** | `*`, `decisionRequirementsDefinitionId: order_decision` | `READ`                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **Group**                            | `*`, `groupId: accounting`                              | `CREATE`, `READ`, `UPDATE`, `DELETE`                                                                                                                                                                                                                                                                                                                                                                                                      |
| **Mapping Rule**                     | `*`                                                     | `CREATE`, `READ`, `UPDATE`, `DELETE`                                                                                                                                                                                                                                                                                                                                                                                                      |
| **Message**                          | `*`                                                     | `CREATE`, `READ`                                                                                                                                                                                                                                                                                                                                                                                                                          |
| **Process Definition**               | `*`, `bpmnProcessId: order_process`                     | `CREATE_PROCESS_INSTANCE`, `READ_PROCESS_DEFINITION`, `READ_PROCESS_INSTANCE`, `READ_USER_TASK`, `UPDATE_PROCESS_INSTANCE`, `UPDATE_USER_TASK`                                                                                                                                                                                                                                                                                            |
| **Resource**                         | `*`,`formId:my_form`, `bpmnProcessId:order_process`     | `CREATE`, `DELETE_DRD`, `DELETE_FORM`, `DELETE_PROCESS`, `DELETE_RESOURCE`                                                                                                                                                                                                                                                                                                                                                                |
| **Role**                             | `*`                                                     | `CREATE`, `READ`, `UPDATE`, `DELETE`                                                                                                                                                                                                                                                                                                                                                                                                      |
| **System**                           | `*`                                                     | `READ`, `UPDATE`                                                                                                                                                                                                                                                                                                                                                                                                                          |
| **Tenant**                           | `*`, `tenantId:tenantA`                                 | `CREATE`, `READ`, `UPDATE`, `DELETE`                                                                                                                                                                                                                                                                                                                                                                                                      |
| **User**                             | `*`, `username: felix.mueller`                          | `CREATE`, `READ`, `UPDATE`, `DELETE`                                                                                                                                                                                                                                                                                                                                                                                                      |

## Default Roles

Camunda provides predefined roles to simplify access management:

| Role ID          | Purpose                                                                         | Typical Authorizations                                                                                                                              |
| ---------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `admin`          | Full control over all orchestration resources and applications.                 | All permissions for all resources: `READ`, `CREATE`, `UPDATE`, `DELETE`, including `ACCESS` to all applications.                                    |
| `readonly-admin` | Audit-focused users who need read-only access across the orchestration cluster. | `READ` for all resources, including `READ_PROCESS_DEFINITION`, `READ_PROCESS_INSTANCE`, `READ_USER_TASK`, etc.                                      |
| `connectors`     | Technical role for executing connector calls.                                   | `READ_PROCESS_DEFINITION` on **Process Definition** (`*`), `UPDATE_PROCESS_INSTANCE` on **Process Definition** (`*`), `CREATE` on **Message** (`*`) |
| `rpa`            | Role for RPA workers.                                                           | `READ` on **Resource** (`*`), `UPDATE_PROCESS_INSTANCE` on **Process Definition** (`*`)                                                             |

### Role Assignment in SaaS

- **admin**: Automatically assigned to Organization Owner and Admin
- **connectors**: Automatically assigned to Connectors Runtime in Cluster deployment
- **readonly-admin**: Automatically assigned to Camunda Support Agents for support cases

## Common Use Cases

### Application Access

Users need specific application permissions to access Orchestration Cluster components::

- **UI Access**: Resource Type `application` and Resource Key is one of the components Operate, Tasklist, Identity.
  - Example: `operate` for Operate access
  - Example: `tasklist` for Tasklist access
- Without these permissions, users cannot log in to the compoennts

### Resource Access

Within applications, users need additional permissions for specific resources, e.g.:

- **Process Related**: Resource Type `processDefinition`
  - `READ_PROCESS_DEFINITION` to view process models
  - `CREATE_PROCESS_INSTANCE` to start new processes
  - `UPDATE_PROCESS_INSTANCE` to modify running instances
- **Decision Related**: Resource Type `decisionDefinition`
  - `READ_DECISION_DEFINITION` to view DMN models
  - `CREATE_DECISION_INSTANCE` to execute decisions

### API Access

When implementing your own integrations by e.g. using a Camunda Client, you should consider the following:

- **Job Workers**: Resource Type `processDefinition`
  - `UPDATE_PROCESS_INSTANCE` to complete jobs for the specific process definitions
