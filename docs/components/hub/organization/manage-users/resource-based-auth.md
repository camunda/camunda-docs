---
title: "Manage resource-based authorizations"
description: "Control the level of access a user or group has to perform tasks in the system via user task access restrictions."
---

Resource authorizations control a user's access to specific resources. To create, update, or delete a user's resource authorizations, select the user's row in the users table.

## Self-Managed

In Self-Managed, authorizations for Orchestration Cluster applications (Zeebe, Operate, and Tasklist) are managed as part of the Orchestration Cluster and configured in [Admin](/self-managed/components/orchestration-cluster/admin/overview.md).

## Prerequisites

Before you begin, you need to know the ID of the resource for which you're authorizing the user:

1. Open a BPMN or DMN diagram.
1. On the right side of the modeling interface, in the **Details** panel, open the **General** section.
1. Without selecting an element in the modeling interface, copy the **ID**.

## Create an authorization

Create resource authorizations in Camunda Hub:

1. In the left navigation under **Console**, click **Organization**.
1. On the **Users** tab, select a user.
1. On the **Authorizations** tab, click **Create resource authorization**.
1. Paste the resource ID, and select at least one permission.
1. Click **Create**.

## Update an authorization

1. In the left navigation under **Console**, click **Organization**.
1. On the **Users** tab, select a user.
1. On the **Authorizations** tab, click **Change permissions**.

## Delete an authorization

1. In the left navigation under **Console**, click **Organization**.
1. On the **Users** tab, select a user.
1. On the **Authorizations** tab, click **Delete**.
