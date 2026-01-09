---
id: batch-operation-details-overview
title: Batch operation details
description: "An overview of the batch operation details page."
---

A high-level overview of the batch operation details page in Camunda 8 Operate.

## About the batch operation details page

On the batch operation's details page, you'll find:

- A summary of the batch operation.
- A table with details about the items in the batch operation.
- An option to take action on the batch operation. This is only available for some batch operations, depending on the state.

## Summary header

The summary header includes the following details about the batch operation:

| Detail           | Description                                                                          |
| ---------------- | ------------------------------------------------------------------------------------ |
| State            | The current state of the batch operation.                                            |
| Summary of items | The number of successful, failed, and pending items included in the batch operation. |
| Start time       | The operation's start time.                                                          |
| End time         | The operation's end time, if applicable.                                             |
| Actor            | The user or client responsible for triggering the operation.                         |

If batch operation finished with the "failed" state, the header will also include error messages.

## Items table

In the table, you can review these details about each item in the batch operation:

| Column               | Description                                                                             |
| -------------------- | --------------------------------------------------------------------------------------- |
| Process instance key | The key of the process instance. Clicking this opens the process instance details page. |
| Operation state      | The state of the batch operation item.                                                  |
| Time                 | The user or client responsible for triggering the operation.                            |

## Next steps

- [Learn how to monitor batch operations](../userguide/monitor-batch-operations.md).
- [Learn how to manage batch operations](../userguide/monitor-batch-operations.md).
