---
id: starting-processes
title: Starting processes
description: "How to start a process from Tasklist."
---

It is possible to start processes by demand using Tasklist. To do this, click **Processes** in the navigation menu. All the processes you have access to start will be listed on the **Processes** page.

![tasklist-processes](img/tasklist-processes.png)

In the **Search** box, it's possible to filter the processes based on their name. Start typing the process name and the list will update.

![tasklist-processes-search](img/tasklist-processes-search.png)

Using **Additional filters** it is possible to filter processes by other attributes:

- All processes: Shows all processes which match the search criteria.
- Requires form input to start: Filters processes to ones which have a [linked or embedded Camunda Form](/components/modeler/web-modeler/advanced-modeling/form-linking.md) on the start event.
- Does not require form input to start: Filter process to ones which do not have a Camunda Form on the start event.

To start a process, click **Start process** on the process you want to start.

![tasklist-processes-start](img/tasklist-processes-start.png)

If the start event of this process contains a [linked or embedded Camunda Form](/components/modeler/web-modeler/advanced-modeling/form-linking.md), a modal window containing that form will automatically open.

![tasklist-processes-start-with-form](img/tasklist-processes-start-with-form.png)

Tasklist will then wait for the process to be executed. If the process generates a task, you will be redirected to the generated task.

:::info

To share a process with users inside your organization, but not with external users, you can click on the share icon ![share icon](img/tasklist-processes-share-button.png) to copy a link to the process. This link will only be accessible to users that already have access to Tasklist.

:::

## Not seeing a process

There could be multiple reasons why you are not seeing any process in the **Processes** tab:

- There is no process deployed to your environment.

- Permissions to start a process are managed in [Identity](/self-managed/identity/user-guide/authorizations/managing-resource-authorizations.md) for Self-Managed, and in [Console](/components/console/manage-organization/manage-users.md) for SaaS. It is likely your user does not yet have privileges to start processes on Tasklist.

For all the above scenarios, contact your administrator to understand why no processes are displayed.

## Publishing your process

As of `8.7`, publishing public processes using a form is no longer supported. Either disable process publishing or use an [alternative method for process publishing](/components/modeler/web-modeler/run-or-publish-your-process.md#publishing-a-process).
