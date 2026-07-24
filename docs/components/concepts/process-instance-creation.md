---
id: process-instance-creation
title: "Process instance creation"
description: "Depending on the process definition, an instance of it can be created in several ways."
---

Depending on the process definition, an instance of it can be created in several ways.

Camunda 8 supports the following ways to create a process instance:

- [`CreateProcessInstance` commands](#commands)
- [Message event](#message-event)
- [Timer event](#timer-event)

## Commands

A process instance is created by sending a command specifying the BPMN process ID, or the unique key of the process.

There are two commands to create a process instance, outlined in the sections below.

### Create and execute asynchronously

A process that has a [none start event](/components/modeler/bpmn/none-events/none-events.md#none-start-events) is started explicitly using **[CreateProcessInstance](/apis-tools/zeebe-api/gateway-service.md#createprocessinstance-rpc)**.

This command creates a new process instance and immediately responds with the process instance ID. The execution of the process occurs after the response is sent.

![create-process](assets/create-process.png)

<details>
   <summary>Create a process instance via Orchestration Cluster REST API</summary>
   <p>

```
curl -L 'http://localhost:8080/v2/process-instances' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-d '{
  "processDefinitionKey": "2251799813685249”,
  "processDefinitionVersion": 1
}'
```

Response:

```
{
  "processDefinitionId": "order-process",
  "processDefinitionVersion": 1,
  "processDefinitionKey": "2251799813685249",
  "processInstanceKey": "2251799813686019"
}
```

See the [API reference for process instance creation](/apis-tools/orchestration-cluster-api-rest/specifications/create-process-instance.api.mdx) for more information, including additional request fields and code samples.

   </p>
 </details>

### Create and await results

Typically, process creation and execution are decoupled. However, there are use cases that need to collect the results of a process when its execution is complete.

**[CreateProcessInstanceWithResult](/apis-tools/zeebe-api/gateway-service.md#createprocessinstancewithresult-rpc)** allows you to “synchronously” execute processes and receive the results via a set of variables. The response is sent when the process execution is complete.

![create-process](assets/create-process-with-result.png)

This command is typically useful for short-running processes and processes that collect information.

If the process mutates system state, or further operations rely on the process outcome response to the client, consider designing your system for failure states and retries.

:::note
When the client resends the command, it creates a new process instance.
:::

<details>
   <summary>Create a process instance and await results via Orchestration Cluster REST API</summary>
   <p>

```
curl -L 'http://localhost:8080/v2/process-instances' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-d '{
  "processDefinitionId": "order-process”,
  "processDefinitionVersion": 1,
  "awaitCompletion": true,
  "variables": { "orderId": "1234" }
}'
```

Response:

```
{
  "processDefinitionId": "order-process",
  "processDefinitionVersion": 1,
  "variables": { "orderId": "1234" }
  "processDefinitionKey": "2251799813685249",
  "processInstanceKey": "2251799813686019",
}
```

See the [API reference for process instance creation](/apis-tools/orchestration-cluster-api-rest/specifications/create-process-instance.api.mdx) for more information, including additional request fields and code samples.

   </p>
 </details>

Failure scenarios applicable to other commands are applicable to this command as well. Clients may not get a response in the following cases even if the process execution is completed successfully:

- **Connection timeout**: If the gRPC deadlines are not configured for long request timeout, the connection may be closed before the process is completed.
- **Network connection loss**: This can occur at several steps in the communication chain.
- **Failover**: When the node processing this process crashes, another node continues the processing. The other node does not send the response because the request is registered on the first one.
- **Gateway failure**: If the gateway the client is connected to fails, nodes inside the cluster cannot send the response to the client.

### Run process segment

The [`create and execute asynchronously`](#create-and-execute-asynchronously) and [`create and await results`](#create-and-await-results) commands both start the process instance at their default initial element: the single [none start event](/components/modeler/bpmn/none-events/none-events.md#none-start-events). Camunda 8 also provides a way to create a process instance starting or ending at user-defined element(s).

:::info
This is an advanced feature. Camunda recommends to only use this functionality for testing purposes. The none start event is the defined beginning of your process. Most likely the process is modeled with the intent to start all instances from the beginning.
:::

#### Start instructions

To start the process instance at a user-defined element, you need to provide start instructions along with the command. Each instruction describes how and where to start a single element.

By default, the instruction starts before the given element. This means input mappings of that element are applied as usual.

Multiple instructions can be provided to start the process instance at more than one element.
You can activate the same element multiple times inside the created process instance by referring to the same element ID in more than one instruction.

#### Runtime instructions

By default, the process execution continues normally until the end of the process. To change this behavior and end the process instance after a specific element completes or terminates, provide runtime instructions. Each runtime instruction specifies the ID of one element whose completion or termination ends the process instance.

You can provide multiple runtime instructions to terminate the process instance after multiple elements—for example, when a process has multiple parallel flows.

:::note
Start and runtime instructions have the same [limitations as process instance modification](/components/concepts/process-instance-modification.md#limitations), e.g., it is not possible to start or end at a sequence flow.
:::

Start and runtime instructions are supported for both `CreateProcessInstance` commands. Both instruction sets can be used separately or together to achieve different scenarios.

<details>
   <summary>Create a process instance with a start and a runtime instruction</summary>
   <p>

The example below shows how to create a process instance that starts at a user-defined element and terminates after it, so that only the specified segment of the process is executed.

```
curl -L 'http://localhost:8080/v2/process-instances' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-d '{
  "processDefinitionId": "order-process”,
  "processDefinitionVersion": -1,
  "startInstructions": [
    {
      "elementId": "ship_parcel"
    }
  ],
  "runtimeInstructions": [
    {
      "type": "TERMINATE_PROCESS_INSTANCE",
      "afterElementId": "ship_parcel"
    }
  ]
  "variables": { "orderId": "1234" }
}'
```

See the [API reference for process instance creation](/apis-tools/orchestration-cluster-api-rest/specifications/create-process-instance.api.mdx) for more information, including additional request fields and code samples.

   </p>
 </details>

## Events

Process instances are also created implicitly via various start events. Camunda 8 supports message start events and timer start events.

### Message event

A process with a [message start event](/components/modeler/bpmn/message-events/message-events.md#message-start-events) can be started by publishing a message with the name that matches the message name of the start event.

For each new message a new instance is created.

### Timer event

A process can also have one or more [timer start events](/components/modeler/bpmn/timer-events/timer-events.md#timer-start-events). An instance of the process is created when the associated timer is triggered. Timers can also trigger periodically.

## Business ID

### What is a business ID?

A business ID is a domain-specific identifier you can assign to a process instance. Unlike the system-generated process instance key, it represents a domain concept such as an order number, case reference, or customer ticket ID.

A business ID does **not need to be unique** unless uniqueness control is enabled. See [Uniqueness control](#uniqueness-control) for details.

For example, consider a process that ships book orders where each order already has an identifier in your order management system. When you start the process to ship an order, you can use the order ID as the business ID. This lets you easily find all process instances related to a particular order.

You set the business ID at process instance creation time via the `businessId` field in the creation request. The business ID is **immutable**; once set, it cannot be changed or removed for the lifetime of the process instance. The maximum length for a business ID is **256 characters**.

Starting in 8.10, you can also set a business ID when starting a process instance from **Camunda Hub** or **Desktop Modeler**.

<details>
   <summary>Create a process instance with a business ID via Orchestration Cluster REST API</summary>
   <p>

```
curl -L 'http://localhost:8080/v2/process-instances' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-d '{
  "processDefinitionId": "order-process",
  "processDefinitionVersion": 1,
  "businessId": "order-1234"
}'
```

See the [API reference for process instance creation](/apis-tools/orchestration-cluster-api-rest/specifications/create-process-instance.api.mdx) for more information, including additional request fields and code samples.

   </p>
 </details>

### Propagation to child instances

When a process instance with a business ID creates a child process instance via a [call activity](/components/modeler/bpmn/call-activities/call-activities.md), the business ID is automatically propagated to the child by default.

Each child instance inherits the same business ID as its parent, letting you trace an entire process hierarchy using a single domain identifier.

Starting in 8.10, a call activity can override the inherited business ID by setting a literal value or [FEEL expression](/components/concepts/expressions.md) on the call activity. The value is resolved once at child creation and is then immutable. See [Business ID propagation](/components/modeler/bpmn/call-activities/call-activities.md#business-id-propagation) for configuration details.

### Searching and filtering by business ID

Starting in 8.10, `businessId` is available across multiple entity types. Searchability varies by entity:

| Entity                | Searchable | Visible | Notes                                                                               |
| :-------------------- | :--------- | :------ | :---------------------------------------------------------------------------------- |
| Process instances     | Yes        | Yes     | Available since 8.9.                                                                |
| Decision instances    | Yes        | Yes     | Available since 8.10.                                                               |
| User tasks            | Yes        | Yes     | Available since 8.10.                                                               |
| Messages              | Yes        | Yes     | API only. Not shown in the Operate process instance details view.                   |
| Message subscriptions | Yes        | Yes     | API only.                                                                           |
| Jobs                  | No         | Yes     | Visible in job activation response. Not searchable, filterable, or shown in the UI. |

#### Advanced filter operators

The API supports the following operators for `businessId`. Operate and Tasklist expose a subset in their filter UI.

| Operator  | Description                 | Wildcards                           | UI label  |
| :-------- | :-------------------------- | :---------------------------------- | :-------- |
| `$eq`     | Exact match                 | —                                   | Equals    |
| `$neq`    | Does not match              | —                                   | API only  |
| `$exists` | Field is set or absent      | —                                   | API only  |
| `$like`   | Pattern match               | `*` (multi-char), `?` (single-char) | Contains  |
| `$in`     | Matches any value in a list | —                                   | Is one of |

#### API reference

| Entity                | Endpoints                                                                                                                                                                                              |
| :-------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Process instances     | [Get](/apis-tools/orchestration-cluster-api-rest/specifications/get-process-instance.api.mdx) · [Search](/apis-tools/orchestration-cluster-api-rest/specifications/search-process-instances.api.mdx)   |
| Decision instances    | [Get](/apis-tools/orchestration-cluster-api-rest/specifications/get-decision-instance.api.mdx) · [Search](/apis-tools/orchestration-cluster-api-rest/specifications/search-decision-instances.api.mdx) |
| User tasks            | [Get](/apis-tools/orchestration-cluster-api-rest/specifications/get-user-task.api.mdx) · [Search](/apis-tools/orchestration-cluster-api-rest/specifications/search-user-tasks.api.mdx)                 |
| Message subscriptions | [Search](/apis-tools/orchestration-cluster-api-rest/specifications/search-correlated-message-subscriptions.api.mdx)                                                                                    |
| Jobs (visible only)   | [Search](/apis-tools/orchestration-cluster-api-rest/specifications/search-jobs.api.mdx) · [Activate](/apis-tools/orchestration-cluster-api-rest/specifications/activate-jobs.api.mdx)                  |

#### Retroactive visibility

Business IDs assigned to process instances in 8.9 remain traceable because the business ID is stored on the process instance record. However, related artifacts — user tasks, decision instances, jobs, and message subscriptions — snapshot the business ID at their own creation time. Artifacts created before business ID visibility shipped for that entity type are not retroactively enriched and carry no `businessId` value.

### Late Business ID assignment

You can assign a business ID to a running process instance that has none. This is useful when the domain identifier (for example, an order number or case reference) is not available at instance creation time.

:::note
Late assignment requires business ID uniqueness to be **disabled**. See [Uniqueness control](#uniqueness-control) for details.
:::

| Constraint              | Detail                                                                                                                                |
| :---------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| Single and irreversible | Once set, the business ID cannot be changed or removed.                                                                               |
| Root instances only     | Call-activity children are always rejected.                                                                                           |
| No re-assignment        | Any attempt to assign to an instance that already has a business ID — whether the value matches or differs — returns `INVALID_STATE`. |
| Max length              | 256 characters.                                                                                                                       |

**Propagation is forward-only.** Only artifacts created after the assignment carry the business ID: future jobs, user tasks, decision instances, message subscriptions, and call-activity children. Pre-existing artifacts retain an empty `businessId`. An instance in this state shows a mixed view — older artifacts have no business ID, newer ones do.

**API surfaces:**

| Surface        | Details                                                                                                                                 |
| :------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| REST           | `POST /process-instances/{processInstanceKey}/business-id-assignment`                                                                   |
| gRPC           | `AssignProcessInstanceBusinessId`                                                                                                       |
| Job completion | Include `businessId` in the `CompleteJob` request. If assignment fails, the entire complete is rejected — the job is **not** completed. |

**Rejection contract:**

| Failure                                                      | Rejection                    |
| :----------------------------------------------------------- | :--------------------------- |
| Instance not found or wrong tenant                           | `NOT_FOUND`                  |
| Target is a call-activity child                              | `INVALID_STATE`              |
| Business ID uniqueness is enabled                            | `INVALID_STATE`              |
| Instance already has a business ID (same or different value) | `INVALID_STATE`              |
| Value fails validation (for example, exceeds 256 characters) | `INVALID_ARGUMENT`           |
| Not authorized                                               | `UNAUTHORIZED` / `FORBIDDEN` |

Required permission: `UPDATE_PROCESS_INSTANCE` on the process definition.

### Uniqueness control

With uniqueness control, you can ensure that only one active root process instance exists for a given **process definition, tenant, and business ID**. This prevents duplicate processing of the same business case.

Uniqueness is checked against **active root process instances**.

- A **root process instance** is a process instance that was started directly, not created by a call activity. Child process instances created via call activities don't count toward the uniqueness check, even though they inherit the parent's business ID.
- When uniqueness control is enabled, creating a root process instance is rejected if another **root** process instance of the same process definition is already active with the same business ID. The rejection returns an `ALREADY_EXISTS` error (HTTP `409 Conflict`).
- Once a process instance is no longer active (completed or terminated), you can use its business ID to create a new process instance.

:::note Retroactive enforcement
Uniqueness control is **retroactive**. When you enable it, business IDs that were already assigned to active process instances _before_ the feature was turned on are taken into account. This prevents duplicate instances from being created after the feature is enabled, even if duplicates already existed before activation.
:::

Uniqueness control is opt-in. Enable it using the configuration property [`camunda.process-instance-creation.business-id-uniqueness-enabled`](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#process-instance-creation). For SaaS, configure this in the cluster configuration via Camunda Hub. For Self-Managed, set it in the application config (for example, `application.yaml` or as an environment variable).

:::note
When a business ID is specified, the partition for the new process instance is determined deterministically by **hashing the business ID**, rather than using the default round-robin distribution. This ensures that uniqueness checks occur on a single partition.

Be aware that this may result in uneven distribution of instances across partitions if business IDs are not well distributed.
:::

#### Multi-tenancy scope

In a multi-tenant environment, uniqueness is enforced **per tenant and process definition**. Process instances belonging to different tenants can use the same business ID and process definition without conflict. For example, two active root process instances in different tenants may share the same business ID and process definition.

### Process instance migration

When a process instance with a business ID is [migrated](/components/concepts/process-instance-migration.md) to a different process definition, the business ID is preserved and carried over to the **target** process definition. The business ID remains immutable; it cannot be changed or removed as part of the migration. After migration, the **source** process definition is no longer associated with the business ID.

Migration intentionally **bypasses uniqueness control checks**, because migration operates on existing instances rather than creating new ones. It is a deliberate operator action with accountability provided by the audit log. As a result:

- Migration is never rejected due to a business ID conflict at the target process definition. The target definition may end up with more than one active root process instance with the same business ID.
- When uniqueness control is enabled, a new process instance with the same business ID can be created for the **source** process definition, since it is no longer associated with the migrated instance.

### Limitations

- **Jobs** carry the business ID in the job activation response but cannot be searched or filtered by business ID. No UI surface exposes job-level business ID visibility.
- When using [cluster scaling](/self-managed/components/orchestration-cluster/zeebe/operations/cluster-scaling.md) to increase the number of partitions, new process instances created with a business ID are only distributed across the original set of partitions, not to any newly added partitions.

## Tags

Process instance tags are lightweight, immutable labels you can attach when creating a process instance via the API or clients. Tags are inherited by all jobs created from that instance. They help downstream workers and external systems make quick routing or decision choices without inspecting full variable payloads.

### Tag format and constraints

- A tag is a case-sensitive string.
- Format (regex): `^[A-Za-z][A-Za-z0-9_\-:.]{0,99}$`
  - Must start with a letter (A–Z or a–z).
  - Remaining characters may be alphanumeric, underscore (`_`), hyphen (`-`), colon (`:`), or dot (`.`).
- Length: 1–100 characters.
- Maximum of 10 unique tags per process instance (duplicates are ignored).
- Order is not guaranteed; treat the set as unordered.
- Tags cannot be modified after creation

If validation fails during process instance creation (for example, too many tags, invalid pattern, or length), the create request is rejected with a 4xx error.

### Semantics

- Tags are included in process instance search responses and in activated job payloads.
- Tags are immutable after creation - cannot be added, changed, or removed after process instance has been created.
- Search filtering uses AND semantics: an instance must contain all requested tags (it may contain additional tags). Partial or wildcard matching is not supported.
- Tags are exported with the process instance and with job entities starting in 8.8 by the default exporters.
- Tags are not shown in web applications (such as Operate and Tasklist) — they are API/client-only metadata.

### Use cases

- Routing and prioritization (for example, `priority:high`)
- Business or domain identifiers from internal or third-party systems (for example, `reference:1234`, `team:accounting`, `origin:crm`)
- Cross-system correlation keys without exposing full variable payloads (for example, `trace-id:abcd-1234`, `crm-id:3004`)
- Analytics segmentation (for example, `region:emea`, `channel:web`)
- Feature rollout or experiment grouping (for example, `experiment:checkout-v2`)

### Guidelines

- Do not store secrets or PII; tags propagate with jobs and exports.
- Prefer concise `key:value` or `key` patterns for consistency.
- Use variables (not tags) for mutable or large data.
- Establish internal naming conventions (for example, prefixes like `env:` or `dept:`) for governance.

### Examples

Create with tags:

```bash
curl -L 'http://localhost:8080/v2/process-instances' \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "processDefinitionId": "order-process",
    "processDefinitionVersion": 3,
    "tags": ["channel:web", "reference:1234", "region:emea"],
    "variables": { "orderId": "1234" }
  }'
```

## Next steps

- [About Modeler](/components/modeler/about-modeler.md)
- [Automating a process using BPMN](/components/modeler/bpmn/automating-a-process-using-bpmn.md)
