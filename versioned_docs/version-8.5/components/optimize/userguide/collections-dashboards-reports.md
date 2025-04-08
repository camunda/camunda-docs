---
id: collections-dashboards-reports
title: Collections, dashboards, and reports
description: "Let's take a closer look at the structure of Optimize and its permissions."
---

Optimize uses a single visualization for **reports**, and **[dashboards](./creating-dashboards.md)** combine these visualizations, akin to a spreadsheet or a set of comparative charts. **Collections** organize these datasets, acting as project folders. The Optimize **Collections** page displays all dashboards, reports, and collections, and clicking on a collection reveals associated reports and dashboards.

![home page](./img/home.png)

In addition to the name of the dashboard, report, or collection, you can also see modification dates, the number of items they contain, and user/group access. Optimize enables collaborative sharing through the **Share** tab, allowing the creation of shared links for external viewing. Toggle to **Enable sharing**.

:::note
Colleagues without access to Optimize can still view your report with the shared link. Learn more about [user permissions](./user-permissions.md).
:::

Clicking on a report, dashboard, or collection takes you to its corresponding details page. When moving the mouse over one of these entities, you can access a context menu that allows you to edit, copy, or delete the entity. Multiple entities can be selected and deleted at once using the bulk menu which appears after selecting at least one entity. When copying an entity, you also have the option to move that copy into a collection.

![copy sales dashboard](./img/copy.png)

To find a collection, report, or dashboard, use the search field on the top of the page to filter the list by the name of the entity.

To [create a dashboard](./creating-dashboards.md) or [report](./creating-reports.md), use the **Create New** button available in the top right corner of the page.

## User permissions

:::note
Adding user groups to collections is currently only available in Camunda 7.
:::

By default, if you create a collection, only you can access the collection and the contents within. To share a collection with other users, add them to the collection.

![users and user groups](./img/users.png)

You are automatically assigned the manager role when creating a new collection. There can be multiple managers for a collection. However, there must be at least one manager for every collection. Managers can do the following:

- Add, edit, and remove dashboards and reports to the collection.
- Edit the collection name and delete the collection using the context menu in the header.
- Add, edit, and remove other users and user groups to collections via the collection's **Users** tab.

A manager can add a new user or group to the collection using the **Add** button. Use the ID of the user/group to add them. Every user/group has a role assigned to them that specifies their access rights to the collection.

![add user or user group](./img/addUser.png)

An editor may edit, delete, and create new dashboards or reports in the collection. Editors may not edit the name of the collection, delete the collection, or change anything in the **Users** tab.

Those with read-only access to the collection may only view the components contained within, as well as copy them. Viewers cannot create, edit, or delete components in a collection. They are also not allowed to rename or delete the collection itself, or change anything in the **Users** tab.
