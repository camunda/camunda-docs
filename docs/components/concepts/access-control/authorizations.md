---
title: Authorization in Camunda 8 orchestration cluster
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

Camunda 8's Orchestration Cluster provides a fine-grained authorization system for controlling access to applications and APIs. This system applies to:

- **Zeebe**
- **Operate**
- **Tasklist**
- **Orchestration Cluster APIs** (e.g., V2 API)

:::note
Authorization applies only to these orchestration components. It does not apply to other Camunda services, such as Web Modeler or Optimize.
:::

## Core concepts

### Authorization model

- Based on the **principle of least privilege**
- Can be enabled or disabled in both SaaS and Self-Managed environments
- When disabled: all users and clients have full access
- When enabled: no access is granted by default; explicit authorization is required
- No concept of deny rules—absence of permission means no access
- Enforced across both web applications and API requests

### Key components

1. **Authorizations**

   - Assign permissions to Identities for specific resources
   - Examples:
     - User `jonny` is authorized to create new users
     - Group `marketing` is authorized to delete the group `sales`

2. **Owners**

   - Types include users, groups, roles, and mapping rules
   - Authorizations can be assigned to any type of owner

3. **Permissions**

   - Define allowed interactions with resources
   - Are specific to each resource type

4. **Resources**

   - Entities users interact with
   - Each resource has its own set of permissions

## Configuration

### SaaS configuration

In Camunda 8 SaaS, authorizations can be enabled or disabled per cluster. This setting can be changed by:

- Organization admins
- Organization owners

### Self-Managed configuration

In Self-Managed deployments, enable the authorization system using:

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

## Resources and permissions

### Available resources

The following table lists all resources that support authorization in Camunda 8 **Orchestration Cluster**, along with the available permissions per resource. This applies to Camunda 8 **Orchestration Cluster** (Zeebe, Operate, Tasklist, **Orchestration Cluster** APIs).

| Resource type                        | Resource key Example                                    | Supported permissions                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------ | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Application**                      | `Operate`, `Tasklist`, `Identity`, `*`                  | `ACCESS`                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| **Authorization**                    | `*`                                                     | `CREATE`, `READ`, `UPDATE`, `DELETE`                                                                                                                                                                                                                                                                                                                                                                                                       |
| **Batch**                            | `*`                                                     | `CREATE`, `CREATE_BATCH_OPERATION_CANCEL_PROCESS_INSTANCE`, `CREATE_BATCH_OPERATION_DELETE_PROCESS_INSTANCE`, `CREATE_BATCH_OPERATION_MIGRATE_PROCESS_INSTANCE`, `CREATE_BATCH_OPERATION_MODIFY_PROCESS_INSTANCE`, `CREATE_BATCH_OPERATION_RESOLVE_INCIDENT`, `CREATE_BATCH_OPERATION_DELETE_DECISION_INSTANCE`, `CREATE_BATCH_OPERATION_DELETE_DECISION_DEFINITION`, `CREATE_BATCH_OPERATION_DELETE_PROCESS_DEFINITION`, `READ`, `UPDATE` |
| **Decision Definition**              | `*`, `decisionId: order_decision`                       | `CREATE_DECISION_INSTANCE`, `READ_DECISION_DEFINITION`, `READ_DECISION_INSTANCE`, `DELETE_DECISION_INSTANCE`                                                                                                                                                                                                                                                                                                                               |
| **Decision Requirements Definition** | `*`, `decisionRequirementsDefinitionId: order_decision` | `READ`                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| **Group**                            | `*`, `groupId: accounting`                              | `CREATE`, `READ`, `UPDATE`, `DELETE`                                                                                                                                                                                                                                                                                                                                                                                                       |
| **Mapping Rule**                     | `*`, `mappingRuleId:my_mapping`                         | `CREATE`, `READ`, `UPDATE`, `DELETE`                                                                                                                                                                                                                                                                                                                                                                                                       |
| **Message**                          | `*`                                                     | `CREATE`, `READ`                                                                                                                                                                                                                                                                                                                                                                                                                           |
| **Process Definition**               | `*`, `bpmnProcessId: order_process`                     | `CREATE_PROCESS_INSTANCE`, `READ_PROCESS_DEFINITION`, `READ_PROCESS_INSTANCE`, `READ_USER_TASK`, `UPDATE_PROCESS_INSTANCE`, `UPDATE_USER_TASK`                                                                                                                                                                                                                                                                                             |
| **Resource**                         | `*`, `formId:my_form`, `bpmnProcessId:order_process`    | `CREATE`, `DELETE_DRD`, `DELETE_FORM`, `DELETE_PROCESS`, `DELETE_RESOURCE`                                                                                                                                                                                                                                                                                                                                                                 |
| **Role**                             | `*`, `roleId:myrole`                                    | `CREATE`, `READ`, `UPDATE`, `DELETE`                                                                                                                                                                                                                                                                                                                                                                                                       |
| **System**                           | `*`                                                     | `READ`, `UPDATE`                                                                                                                                                                                                                                                                                                                                                                                                                           |
| **Tenant**                           | `*`, `tenantId:tenantA`                                 | `CREATE`, `READ`, `UPDATE`, `DELETE`                                                                                                                                                                                                                                                                                                                                                                                                       |
| **User**                             | `*`, `username: felix.mueller`                          | `CREATE`, `READ`, `UPDATE`, `DELETE`                                                                                                                                                                                                                                                                                                                                                                                                       |

## Default roles

Camunda provides predefined roles to simplify access management:

| Role ID          | Purpose                                                                             | Typical authorizations                                                                                                                              |
| ---------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `admin`          | Full control over all **Orchestration Cluster** resources and applications.         | All permissions for all resources: `READ`, `CREATE`, `UPDATE`, `DELETE`, including `ACCESS` to all applications.                                    |
| `readonly-admin` | Audit-focused users who need read-only access across the **Orchestration Cluster**. | `READ` for all resources, including `READ_PROCESS_DEFINITION`, `READ_PROCESS_INSTANCE`, `READ_USER_TASK`, etc.                                      |
| `connectors`     | Technical role for executing connector calls.                                       | `READ_PROCESS_DEFINITION` on **Process Definition** (`*`), `UPDATE_PROCESS_INSTANCE` on **Process Definition** (`*`), `CREATE` on **Message** (`*`) |
| `rpa`            | Role for RPA workers.                                                               | `READ` on **Resource** (`*`), `UPDATE_PROCESS_INSTANCE` on **Process Definition** (`*`)                                                             |

### Role assignment in SaaS

- **admin**: Automatically assigned to Organization Owner and Admin
- **connectors**: Automatically assigned to Connectors Runtime in Cluster deployment
- **readonly-admin**: Automatically assigned to Camunda Support Agents for support cases

## Common use cases

### Application access

Users need specific application permissions to access **Orchestration Cluster** components:

- **UI access**: Resource type `application` and Resource Key is one of the components Operate, Tasklist, **Identity**
  - Example: `operate` for Operate access
  - Example: `tasklist` for Tasklist access
- Without these permissions, users cannot log in to the components

### Resource access

Within applications, users need additional permissions for specific resources, e.g.:

- **Process related**: Resource type `processDefinition`
  - `READ_PROCESS_DEFINITION` to view process models
  - `CREATE_PROCESS_INSTANCE` to start new processes
  - `UPDATE_PROCESS_INSTANCE` to modify running instances
- **Decision related**: Resource type `decisionDefinition`
  - `READ_DECISION_DEFINITION` to view DMN models
  - `CREATE_DECISION_INSTANCE` to execute decisions

### API access

When implementing your own integrations (e.g., using a Camunda client), you should consider the following:

- **Job workers**: Resource type `processDefinition`
  - `UPDATE_PROCESS_INSTANCE` to complete jobs for the specific process definitions
