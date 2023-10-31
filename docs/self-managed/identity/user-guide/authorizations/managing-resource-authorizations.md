---
id: managing-resource-authorizations
title: "Managing resource authorizations"
sidebar_label: "Managing resource authorizations"
description: "Learn about the methods to control resource access within the Identity application."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

In this guide you will learn about the methods to control resource access within the Identity application.

### Creating resource authorizations

Resource authorizations can be configured for an individual user or a group. Below we show you how to create authorizations
for both:

<!-- Why would I choose configuring for an individual user vs. a group? Do we have a recommendation to use groups for larger organizations? Let's offer some opinionated recommendations here. -->

<Tabs groupId="entityType" defaultValue="groups" values={[{label: 'Groups', value: 'groups', }, {label: 'Users', value: 'users', },]} >
<TabItem value="groups">

1. Log in to the Identity UI and navigate to the **Groups** tab. Select the group you would like to create an authorization for from the table, and click on the **Authorizations** tab:

<!-- This needs to be a business-oriented example. Can we name this group something like "business analysts"? What kind of role would have read + delete process definition access? -->

![create-authorization-for-group-tab](../img/create-authorization-for-group-tab.png)

2. Click **Create resource authorization** and a modal will open. Select the type of resource you are creating an authorization for, and click **Next**:

![create-authorization-for-group-modal-1](../img/create-authorization-for-group-modal-1.png)

3. Input the ID of the resource you would like to create an authorization for, select the resource from the list, and click **Next**:

![create-authorization-for-group-modal-2](../img/create-authorization-for-group-modal-2.png)

:::tip
Want to apply an authorization to a wide range of resources? We support a wildcard character `*` to match any resource.

Partial matching, for example `my-resource*`, is not supported.
:::

4. Select the permissions you would like to assign, and click **Create**:

![create-authorization-for-group-modal-3](../img/create-authorization-for-group-modal-3.png)

On confirmation, the modal closes, the table updates, and your authorization is shown:

![create-authorization-for-group-refreshed-modal](../img/create-authorization-for-group-refreshed-table.png)

</TabItem>
<TabItem value="users">

<!-- This is unclear to me based on the screenshots. Where do I select the user? Where do users come from? -->

1. Log in to the Identity UI and navigate to the **Users** tab. Select the user you would like to create an authorization for from the table, and click on the **Authorizations** tab:

![create-authorization-for-user-tab](../img/create-authorization-for-user-tab.png)

2. Click **Create resource authorization** and a modal will open. Select the type of resource you are creating an authorization for, and click **Next**:

![create-authorization-for-user-modal-1](../img/create-authorization-for-user-modal-1.png)

3. Input the ID of the resource you would like to create an authorization for, select the resource from the list, and click **Next**:

![create-authorization-for-user-modal-2](../img/create-authorization-for-user-modal-2.png)

:::tip
Want to apply an authorization to a wide range of resources? We support a wildcard character `*` to match any resource.

Partial matching, for example `my-resource*`, is not supported.
:::

4):. Select the permissions you would like to assign, and click **Create**:

![create-authorization-for-user-modal-3](../img/create-authorization-for-user-modal-3.png)

On confirmation, the modal closes, the table updates, and your authorization is shown:

![create-authorization-for-user-refreshed-modal](../img/create-authorization-for-user-refreshed-table.png)

</TabItem>
</Tabs>
