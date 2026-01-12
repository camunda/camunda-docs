---
id: manage-batch-operations
title: Manage batch operations
description: "Learn how to suspend, resume, or cancel batch operations from the batch operation details page."
---

Learn how to manage [batch operations](../../concepts/batch-operations.md) in Camunda 8 Operate.

## Overview

You can suspend, resume, or cancel batch operations when they're in one of the following [states](../../concepts/batch-operations.md#states):

| State     | Available actions |
| --------- | ----------------- |
| Active    | Suspend, cancel   |
| Suspended | Resume, cancel    |
| Created   | Cancel            |

## Before you begin

To follow the steps in this guide, you must be [authorized to update batch operations](../overview/access-control.md#optional-authorizations).

## Manage a batch operation

To take an action on a batch operation:

1. On the **Processes** page, above the process diagram, click **View batch operations**.
2. From the **Batch Operations** page, click the operation you want to manage.
3. On the batch operation details page, on the right side of the page header, click an action, if available.
