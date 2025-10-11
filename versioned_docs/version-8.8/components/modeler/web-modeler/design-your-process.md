---
id: design-your-process
title: Design mode for business users
description: "Design mode is tailored to business users and allows strategic modeling"
---

<span class="badge badge--cloud">Camunda 8 only</span>

In the **Design** mode view, business users have access to a different workspace of Web Modeler with a reduced properties panel. Only the documentation property and comments are shown, which provides a decluttered user interface.

All the technicalities, such as triggers to deploy the diagram or start the instance, are hidden. Linting is disabled, and problem annotations are discarded.

The sidebar on the right-hand side of the screen is collapsed when switching to the design mode, and when expanded, the state is persisted even when switching to another diagram.

As a business user, you can [**link decision models**](/components/modeler/web-modeler/advanced-modeling/business-rule-task-linking.md) and [**process models**](/components/best-practices/modeling/creating-readable-process-models.md) via [call activities](/components/modeler/bpmn/call-activities/call-activities.md), and you can still be a [**project owner**](/components/modeler/web-modeler/collaboration.md#access-rights-and-permissions), even if you don't execute implementation.

![design mode](img/design-mode.png)

With the **Design** mode view, users can model a process without need for a complex development tool that does not speak their language. This provides a clear journey for the user, all while incorporating modeling, sharing, and collaborating in a user-friendly way.
