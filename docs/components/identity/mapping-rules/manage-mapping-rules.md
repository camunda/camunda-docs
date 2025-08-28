---
id: manage-mapping-rules
title: "Manage mapping rules"
sidebar_label: "Manage mapping rules"
description: "Manage mapping rules within Identity to support the assigning of Camunda entities to your users."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

In this guide, you will learn how to manage mapping rules in Identity and how to control the Camunda entities related to them.

:::tip
To learn more about the concept of mapping rules, see the [mapping rules documentation](../../concepts/access-control/mapping-rules.md).
:::

You can manage mapping rules from the **Mapping rules** tab in Identity.

<Tabs groupId="mappingRuleAction" defaultValue="add" queryString values={[
{label: 'Add', value: 'add'},
{label: 'Update', value: 'update'},
{label: 'Delete', value: 'delete'}
]}>

<TabItem value="add">

## Add a mapping rule

1. By default, Identity doesn't have **mapping rules** created.

![mapping-rule-management-tab](../img/mapping-rule-management-tab.png)

2. Click the **Create a mapping rule** button.

3. Fill in the required fields:

- **Mapping Rule ID**: A unique identifier for the mapping rule.
- **Mapping Rule name**: A user-friendly name.
- **Claim name** and **Claim value**: These define the JWT claim rule to match.

![mapping-rule-add-mapping-rule-modal](../img/mapping-rule-add-mapping-modal.png)

4. Click **Create a mapping rule** to save.

The new mapping rule will appear in the list.

![mapping-rule-refreshed-table](../img/mapping-rule-refreshed-table.png)

</TabItem>

<TabItem value="update">

## Update a mapping rule

1. Click the **Edit** button in the mapping rule row you want to edit.

![mapping-rule-edit-icon](../img/mapping-rule-edit-icon.png)

2. Update the desired fields and click **Update Mapping Rule**.

![mapping-rule-edit-modal](../img/mapping-rule-edit-modal.png)

</TabItem>

<TabItem value="delete">

## Delete a mapping rule

1. Click the **Delete** button on the row of the mapping rule you want to delete.

2. Confirm the deletion in the pop-up.

![mapping-rule-delete-modal](../img/mapping-rule-delete-modal.png)

After confirming, the rule is deleted and disappears from the table.

</TabItem>

</Tabs>
