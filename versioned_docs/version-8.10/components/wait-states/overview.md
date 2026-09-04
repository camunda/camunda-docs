---
id: overview
title: Wait states
sidebar_label: Wait states
description: A high-level overview of wait states in Camunda 8.
---

A wait state describes what an active process element instance is waiting for before it can continue, so you can tell expected waiting from a stalled instance.

## What wait states show

When you inspect an active element, Camunda surfaces the wait state and its details. For example, the message a receive task expects or the due date of a timer.

Wait states remain a subset of active instances, not a new top-level state. Camunda surfaces this information at the element instance level.

Use wait states to:

- **Distinguish healthy waiting from stalled execution:** Determine whether an instance is waiting as designed or needs intervention.
- **Detect worker availability issues early:** See whether a job is waiting for activation or is already in progress, and for how long.
- **Speed up troubleshooting:** See what an instance is waiting for without digging into logs.

## Supported wait state types

Camunda 8.10 tracks the following wait state types:

| Wait state type | Applies to                                                                                                  | Details surfaced                                                                                                        |
| :-------------- | :---------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------- |
| Timer           | Intermediate timer catch event                                                                              | Due date, repetitions                                                                                                   |
| Message         | Intermediate message catch event, receive task                                                              | Message name, correlation key                                                                                           |
| Signal          | Intermediate signal catch event                                                                             | Signal name                                                                                                             |
| Conditional     | Intermediate conditional catch event                                                                        | Condition expression, condition events (for example, variable create or update)                                         |
| User task       | User task                                                                                                   | Task key, due date                                                                                                      |
| Job             | Service task, send task, script task, business rule task (when job-based), and execution and task listeners | Job key, job type, job kind, retries, and `listenerEventType` (populated only for listener-type jobs, otherwise `null`) |

Boundary events, event-based gateways, and parallel merging gateways are not tracked in 8.10.

## Impact on secondary storage

When wait state tracking is active, Camunda writes a record to [secondary storage](/self-managed/concepts/secondary-storage/index.md) for every applicable element instance.

Wait state tracking does not measurably increase secondary storage usage. You can [configure wait state tracking](/self-managed/concepts/wait-states/configure.md) in Camunda 8 Self-Managed to disable it.

## Access control

To view wait states, you must have the relevant authorization:

| Authorization type                                     | Resource type        | Resource ID                                                 | Permission              |
| :----------------------------------------------------- | :------------------- | :---------------------------------------------------------- | :---------------------- |
| View wait states for instances of a process definition | `PROCESS_DEFINITION` | A process definition ID or `*` for all process definitions. | `READ_PROCESS_INSTANCE` |

Wait state data is isolated by tenant. You can only view wait states for [tenants](/self-managed/concepts/multi-tenancy/index.md) you are authorized to access.

## Get started

- [View wait states in Operate](../operate/userguide/view-wait-states.md)
- [Use the Camunda REST API to search wait states](/apis-tools/orchestration-cluster-api-rest/specifications/search-element-instance-wait-states.api.mdx)
