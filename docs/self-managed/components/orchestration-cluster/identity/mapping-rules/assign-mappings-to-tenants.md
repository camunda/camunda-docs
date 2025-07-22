---
id: assign-mappings-to-tenants
title: "Assigning mappings to tenants"
sidebar_label: "Tenant mapping assignment"
description: "Grant claim-based access to tenants by assigning mappings in the Identity UI."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

This guide explains how to assign, update, or remove mapping rules from a tenant to grant access based on claim values.

:::tip
To learn more about mappings and tenants, see the [mapping rules documentation](../../concepts/mapping-rules.md) and [tenant management documentation](../../identity/managing-tenants.md).
:::

1. Log in to the Identity UI and go to the **Tenants** tab.
2. Click on the desired Tenant ID (e.g., `<default>`).
3. Open the **Mappings** tab.

<Tabs groupId="tenantMappingAssignment" defaultValue="add" queryString
values={[{label: 'Add', value: 'add'}, {label: 'Update', value: 'update'}, {label: 'Delete', value: 'delete'}]}>

<TabItem value="add">

### Add a mapping to a tenant

1. Click **Assign mapping**.
2. In the modal, search by **Mapping ID**.
3. Select the desired mapping.
4. Click **Assign mapping** to complete.

</TabItem>

<TabItem value="update">

### Update a tenant mapping

1. In the **Mappings** tab, locate the mapping to change.
2. Click **Remove** to delete the old mapping.
3. Re-assign the updated mapping using the steps in the **Add** tab.

:::note
Currently, tenant mappings must be updated by removing and re-adding them with the desired values.
:::

</TabItem>

<TabItem value="delete">

### Delete a mapping from a tenant

1. In the **Mappings** tab for the selected tenant, locate the assigned mapping.
2. Click **Remove**.

</TabItem>

</Tabs>
