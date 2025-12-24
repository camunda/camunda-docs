---
id: batch-operations
title: Batch operations
description: Get an overview of batch operations in Camunda 8.
---

Learn about the concept of batch operations.

## About batch operations

For a given process, you might have tens, hundreds, or even thousands of process instances. If an instance encounters an incident, or you need to update the instance for any other reason, you can perform an instance operation. However, if you need to perform the same operation on multiple instances, a batch operation is usually more suitable.

A **batch operation** is an operation on a selection, or batch, of process instances. Instead of manually operating on each instance, you can specify filter criteria and automatically identify and process matching instances across your cluster in parallel. The individual operation in the batch applied to a process instance is called a [**batch item**](../zeebe/technical-concepts/batch-operations.md#batch-operation-components).

Example use cases include:

- Many process instances have encountered a critical bug.
- You need to skip an activity across multiple instances.
- There was in issue when executing a process that corrupted many or all instances of that process.

## Types

There are four types of batch operations:

| Type                      | Description                                                                            |
| ------------------------- | -------------------------------------------------------------------------------------- |
| Resolve incidents         | Resolves the [incidents](./incidents.md) associated with a batch of process instances. |
| Modify process instances  | Moves a batch of process instances from one node to another.                           |
| Migrate process instances | Migrates a batch of process instances to a new process version.                        |
| Cancel process instances  | Cancels a batch of process instances.                                                  |

Furthermore, depending on the status of the batch operation, you may be able to suspend, cancel, or resume the operation.

## States

A batch operation can have one of the following statuses:

| Type                | Description                                                                                                           |
| ------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Created             | The batch operation was created, but hasn't yet been processed.                                                       |
| Active              | The batch operation is actively being processed.                                                                      |
| Completed           | All items in the batch operation were processed, regardless of whether the individual operations succeeded or failed. |
| Partially completed | The batch operation successfully processed at least one partition and failed to process at least one partition.       |
| Suspended           | The batch operation was temporarily stopped. Suspended batch operations can be resumed.                               |
| Canceled            | The batch operation was permanently stopped. Canceled batch operations can't be resumed.                              |
| Failed              | Every item in the batch operation failed.                                                                             |

:::info
Learn more about batch partitions in our [implementation explainer](../zeebe/technical-concepts/batch-operations.md).
:::

## Authorization

To execute a batch operation, you need two sets of permissions:

| Batch operation permissions                                      | Item-level permissions                                                          |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Permission to create the batch operation.                        | Permission to read process instances and incidents from the secondary database. |
| Permission to manage batch operations (suspend, resume, cancel). | Permission to execute the specific operation on each targeted process instance. |

The system stores authorization claims with the batch operation and uses them throughout its lifecycle.

:::info
Read more about [authorizations](/components/concepts/access-control/authorizations.md) and [how to create them in the Identity UI](/components/identity/authorization.md).
:::

## Next steps

- [Learn how batch operations work](../zeebe/technical-concepts/batch-operations.md).
- [Use batch operations in the Camunda 8 web interface](../operate/userguide/selections-operations.md).
- [Use the batch operations API](/apis-tools/orchestration-cluster-api-rest/specifications/get-batch-operation.api.mdx).
