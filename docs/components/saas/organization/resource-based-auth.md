---
title: "Manage resource-based authorizations"
description: "Legacy feature for clusters before version 8.8. Control the access of a user to specific resources with resource-based authorizations."
---

:::warning Legacy feature
Resource-based authorizations are a legacy feature, and they apply only to clusters before version 8.8. For clusters on version 8.8 and later, manage the access of users with [authorizations in Admin](/components/admin/authorization.md).
:::

Resource authorizations control a user's access to specific resources. To create, update, or delete a user's resource authorizations, select the user's row in the users table.

## Prerequisites

Before you begin, you need to know the ID of the resource for which you're authorizing the user:

1. Open a BPMN or DMN diagram.
1. On the right side of the modeling interface, in the **Details** panel, open the **General** section.
1. Without selecting an element in the modeling interface, copy the **ID**.

## Create an authorization

Create resource authorizations in Camunda Hub:

1. In the left navigation, click **Organization > Manage organization**.
1. On the **Users** tab, select a user.
1. On the **Authorizations** tab, click **Create resource authorization**.
1. Paste the resource ID, and select at least one permission.
1. Click **Create**.

## Update an authorization

1. In the left navigation, click **Organization > Manage organization**.
1. On the **Users** tab, select a user.
1. On the **Authorizations** tab, click **Change permissions**.

## Delete an authorization

1. In the left navigation, click **Organization > Manage organization**.
1. On the **Users** tab, select a user.
1. On the **Authorizations** tab, click **Delete**.
